from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import warnings
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, BeforeValidator
from typing import List, Optional, Annotated
from datetime import datetime, timezone

import requests as http_requests
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request as GoogleRequest
from google.oauth2.credentials import Credentials

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.environ.get("GOOGLE_REDIRECT_URI")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "")

SHEETS_SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]
SHEET_TITLE = "MZ Tech Enquiries"
SHEET_HEADER = ["Timestamp", "Name", "Email", "Phone", "Business Type", "Service", "Message"]

app = FastAPI()
api_router = APIRouter(prefix="/api")

PyObjectId = Annotated[str, BeforeValidator(str)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        doc = self.model_dump(by_alias=True, exclude_none=True)
        doc.pop("_id", None)
        return doc

    @classmethod
    def from_mongo(cls, doc: dict):
        if doc is None:
            return None
        if "_id" in doc:
            doc["_id"] = str(doc["_id"])
        return cls(**doc)


class EnquiryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=25)
    business_type: str = Field(min_length=2, max_length=60)
    service: str = Field(min_length=2, max_length=60)
    message: str = Field(min_length=5, max_length=2000)


class Enquiry(BaseDocument):
    name: str
    email: EmailStr
    phone: str
    business_type: str
    service: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


def _sheets_flow() -> Flow:
    return Flow.from_client_config(
        {
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        },
        scopes=SHEETS_SCOPES,
        redirect_uri=GOOGLE_REDIRECT_URI,
    )


def _create_enquiry_sheet(creds):
    service = build("sheets", "v4", credentials=creds)
    sheet = service.spreadsheets().create(body={"properties": {"title": SHEET_TITLE}}).execute()
    service.spreadsheets().values().update(
        spreadsheetId=sheet["spreadsheetId"],
        range="A1:G1",
        valueInputOption="RAW",
        body={"values": [SHEET_HEADER]},
    ).execute()
    return sheet["spreadsheetId"], sheet["spreadsheetUrl"]


def _append_enquiry_row(creds, spreadsheet_id, row):
    service = build("sheets", "v4", credentials=creds)
    service.spreadsheets().values().append(
        spreadsheetId=spreadsheet_id,
        range="A1",
        valueInputOption="RAW",
        insertDataOption="INSERT_ROWS",
        body={"values": [row]},
    ).execute()


def _get_account_email(creds):
    service = build("oauth2", "v2", credentials=creds)
    return service.userinfo().get().execute().get("email", "")


async def _sheets_creds():
    token = await db.oauth_tokens.find_one({})
    if not token:
        return None, None
    creds = Credentials(
        token=token["access_token"],
        refresh_token=token.get("refresh_token"),
        token_uri=token["token_uri"],
        client_id=token["client_id"],
        client_secret=token["client_secret"],
    )
    expires_at = token.get("expires_at")
    if expires_at:
        exp = datetime.fromisoformat(expires_at)
        if exp.tzinfo is None:
            exp = exp.replace(tzinfo=timezone.utc)
        if datetime.now(timezone.utc) >= exp and creds.refresh_token:
            await asyncio.to_thread(creds.refresh, GoogleRequest())
            await db.oauth_tokens.update_one(
                {"_id": token["_id"]},
                {"$set": {
                    "access_token": creds.token,
                    "expires_at": creds.expiry.isoformat() if creds.expiry else None,
                }},
            )
    return creds, token.get("spreadsheet_id")


@api_router.get("/")
async def root():
    return {"message": "MZ Tech API"}


@api_router.post("/enquiries")
async def create_enquiry(input: EnquiryCreate):
    enquiry = Enquiry(**input.model_dump())
    doc = enquiry.to_mongo()
    doc["created_at"] = doc["created_at"].isoformat()
    result = await db.enquiries.insert_one(doc)

    sheets_saved = False
    creds, spreadsheet_id = await _sheets_creds()
    if creds and spreadsheet_id:
        row = [doc["created_at"], enquiry.name, enquiry.email, enquiry.phone,
               enquiry.business_type, enquiry.service, enquiry.message]
        try:
            await asyncio.to_thread(_append_enquiry_row, creds, spreadsheet_id, row)
            sheets_saved = True
        except Exception as e:
            logger.error(f"Google Sheets append failed (enquiry kept in database): {e}")

    return {"success": True, "id": str(result.inserted_id), "sheets_saved": sheets_saved}


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries():
    docs = await db.enquiries.find().sort("created_at", -1).to_list(200)
    return [Enquiry.from_mongo(d) for d in docs]


@api_router.get("/oauth/sheets/login")
async def sheets_login():
    flow = _sheets_flow()
    url, state = flow.authorization_url(access_type="offline", prompt="consent")
    await db.oauth_states.insert_one({
        "state": state,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return RedirectResponse(url)


@api_router.get("/oauth/sheets/callback")
async def sheets_callback(code: str, state: str):
    saved = await db.oauth_states.find_one({"state": state})
    if not saved:
        raise HTTPException(status_code=400, detail="Invalid or expired login state")
    await db.oauth_states.delete_one({"state": state})
    created = datetime.fromisoformat(saved["created_at"])
    if created.tzinfo is None:
        created = created.replace(tzinfo=timezone.utc)
    if (datetime.now(timezone.utc) - created).total_seconds() > 600:
        raise HTTPException(status_code=400, detail="Login state expired, please try again")

    flow = _sheets_flow()
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        await asyncio.to_thread(flow.fetch_token, code=code)
    creds = flow.credentials

    required_scopes = {"https://www.googleapis.com/auth/spreadsheets"}
    granted_scopes = set(creds.scopes or [])
    if not required_scopes.issubset(granted_scopes):
        logger.error(f"Missing required sheets scopes: {required_scopes - granted_scopes}")
        return RedirectResponse("/?sheets=error")

    email = await asyncio.to_thread(_get_account_email, creds)
    if not email or email.lower() != OWNER_EMAIL.lower():
        logger.warning(f"Non-owner Google connect attempt rejected: {email}")
        try:
            await asyncio.to_thread(
                http_requests.post,
                "https://oauth2.googleapis.com/revoke",
                params={"token": creds.token},
            )
        except Exception:
            pass
        return RedirectResponse("/?sheets=error")

    spreadsheet_id, spreadsheet_url = await asyncio.to_thread(_create_enquiry_sheet, creds)

    await db.oauth_tokens.delete_many({})
    await db.oauth_tokens.insert_one({
        "access_token": creds.token,
        "refresh_token": creds.refresh_token,
        "expires_at": creds.expiry.isoformat() if creds.expiry else None,
        "token_uri": "https://oauth2.googleapis.com/token",
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "email": email,
        "spreadsheet_id": spreadsheet_id,
        "spreadsheet_url": spreadsheet_url,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    })
    return RedirectResponse("/?sheets=connected")


@api_router.get("/sheets/status")
async def sheets_status():
    token = await db.oauth_tokens.find_one({})
    if not token:
        return {"connected": False}
    return {
        "connected": True,
        "email": token.get("email"),
        "spreadsheet_url": token.get("spreadsheet_url"),
    }


@api_router.post("/sheets/disconnect")
async def sheets_disconnect():
    token = await db.oauth_tokens.find_one({})
    if token:
        try:
            await asyncio.to_thread(
                http_requests.post,
                "https://oauth2.googleapis.com/revoke",
                params={"token": token["access_token"]},
            )
        except Exception as e:
            logger.error(f"Token revocation failed: {e}")
        await db.oauth_tokens.delete_many({})
    return {"connected": False}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
