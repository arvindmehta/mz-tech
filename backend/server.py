import React, { useState } from "react";
import { toast } from "sonner";

const GOOGLE_APPS_SCRIPT_URL = process.env.REACT_APP_GOOGLE_APPS_SCRIPT_URL?.trim();

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business_type: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!GOOGLE_APPS_SCRIPT_URL) {
      toast.error("Enquiry form is not configured yet.", {
        description:
          "Please contact us at info@mztech.com.au while we finish configuring the enquiry form.",
      });
      return;
    }

    setLoading(true);
    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams({
          name: form.name,
          email: form.email,
          phone: form.phone,
          business_type: form.business_type,
          service: form.service,
          message: form.message,
        }),
      });
      toast.success("Enquiry sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        business_type: "",
        service: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send enquiry. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form UI unchanged */}
    </form>
  );
}
