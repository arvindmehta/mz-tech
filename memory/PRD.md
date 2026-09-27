# MZ Tech — PRD

## Original Problem Statement
User wants a website for a new company (name: **MZ Tech**). Founder has 17 years of software development experience (websites, digital marketing, SEO, marketing automation). Target audience: construction businessmen (builders, temporary fencing) and mortgage brokers, primarily Indian and Asian communities. Content must be simple and easy for everyone to understand.

## Architecture
- **Frontend**: React (CRA/craco), Tailwind CSS, framer-motion (kinetic hero reveal, scroll reveals, 3D tilt card), lenis (smooth momentum scroll), react-fast-marquee (editorial ribbon), sonner (toasts), shadcn/ui accordion. Custom MZ monogram SVG logo + favicon.
- **Backend**: FastAPI, MongoDB via motor. `POST /api/enquiries` (lead capture, validated), `GET /api/enquiries` (list), `GET /api/` health. Pydantic BaseDocument pattern for ObjectId handling.
- **Design**: Swiss high-contrast industrial dark slate (#0B0F17) + amber gold (#F59E0B); Outfit/Inter/JetBrains Mono fonts.

## User Personas
- Construction builder / fencing contractor: wants more quote requests, not tech-savvy.
- Mortgage broker: wants steady quality loan enquiries and automated follow-up.
- Both: value plain English, honest pricing, community trust.

## Core Requirements (static)
1. Single-page lead-generation marketing site for MZ Tech.
2. Highlight all 4 services: Web Development, SEO, Digital Marketing, Marketing Automation.
3. Industry-specific messaging for Builders/Fencing vs Mortgage Brokers.
4. Simple, jargon-free, trust-focused English.
5. Contact/enquiry form capturing leads to database with toast confirmation.

## Implemented (27 Sep 2026)
- Kinetic hero: masked line-by-line headline reveal, 17-year proof pill, parallax glow, 3D-tilting live-proof metrics card.
- Editorial marquee ribbon.
- Services bento grid (4 services, tetris layout).
- Industries tabbed showcase (Builders & Fencing / Mortgage Brokers) with curated imagery.
- Interactive growth/lead estimator with sliders + toast.
- Founder story + trust pillars + stats.
- Enquiry form -> MongoDB via POST /api/enquiries, sonner success/error toasts.
- FAQ accordion (5 plain-English Q&As).
- Footer with contact links, WhatsApp quick-connect.
- Custom MZ logo SVG used in header, footer, favicon.
- data-testids on all interactive elements.

## Placeholders to update before go-live
- Phone (+61 400 000 000), email (hello@mztech.com), WhatsApp number are PLACEHOLDERS (user confirmed 27 Sep 2026: keep placeholders for now, decide before go-live; WhatsApp intentionally mirrors the phone number so one change updates both).
- Hero "live proof" metrics are illustrative examples.
- Company registration details / ABN not yet added.

## Updates (27 Sep 2026 — iteration 2)
- Rebranded logo: clean geometric MZ stroke monogram (white M, amber Z), removed "WEB · SEO · GROWTH" tagline; favicon updated to match. Header cleaned up with mono uppercase nav links.
- Removed niche-specific claims (construction/fencing/mortgage): Industries tabs section replaced by "Experience" section covering Banking & Finance, Utilities, Retail & Manufacturing, Not-for-Profit, Trades & Construction, Property & Lending — no brand names (work done as employee/contractor, stated honestly on-page).
- Hero, marquee, about, FAQ, footer, meta description, and enquiry form business-type options generalized accordingly.

- Added ongoing website care messaging (user request: "we will take care of your websites after building it, will manage it"): care banner in Services ("We don't disappear after launch"), new FAQ on post-launch management, About section line on ongoing management.
- Fixed mobile hero overflow: grid columns lacked min-w-0, causing hero text to clip 22px past the right edge at 375px.

- Logo v3: amber diamond badge with dark diagonal Z-slash (construction-signage nod); favicon matched.
- Copy voice switched from first-person "I" to "we" throughout (hero, about, experience section).

- Estimator simplified (user feedback): removed "potential monthly value" dollar figure and value-per-customer slider; now estimates monthly enquiries only.
- Care banner expanded (user feedback): "We build it / We maintain it" twin points, no pricing — user does not want costs on site.

- Google Sheets enquiry feature added (27 Sep 2026): owner connects their own Google account via footer link "Owner: Connect Google Sheets" (OAuth, restricted to OWNER_EMAIL = mehtazoeytech@gmail.com — other accounts are rejected and revoked). On first connect, a "MZ Tech Enquiries" sheet is auto-created with header row (Timestamp, Name, Email, Phone, Business Type, Service, Message). Every enquiry is saved to MongoDB (silent backup) AND appended to the sheet (best-effort — form never fails if Sheets is down). Token auto-refresh + disconnect/revoke endpoint included. Credentials are DUMMY placeholders in backend/.env (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET) — user will replace them after creating OAuth credentials in Google Cloud Console. GOOGLE_REDIRECT_URI must be updated (and added in Google Console) when the live domain mztech.com.au is connected.

## Backlog (prioritized)
- **P0**: Real contact details (phone/email/WhatsApp); connect form to email notification (e.g. Resend) so leads hit the owner's inbox.
- **P1**: Portfolio/case-studies section with real projects; Google Maps + business address; actual testimonials.
- **P2**: Multi-language support (Hindi/Punjabi toggle); blog for SEO; admin page to view enquiries in-browser; Google Analytics/Search Console wiring; pricing packages page.

## Next Tasks
1. Swap placeholder phone/email/WhatsApp with real details.
2. Add email notification on new enquiry (Resend managed integration).
3. Portfolio section once real client work is available.
