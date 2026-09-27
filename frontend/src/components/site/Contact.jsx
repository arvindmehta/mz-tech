import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, Loader2, Phone, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const BUSINESS_TYPES = ["Trades & Construction", "Finance & Property", "Retail & Manufacturing", "Not-for-Profit", "Other Business"];
const SERVICES = ["Website Development", "SEO", "Digital Marketing", "Marketing Automation", "Not sure yet"];

const inputCls =
    "w-full rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3.5 text-sm text-white placeholder-slate-500 outline-none transition-colors duration-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/40";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        business_type: BUSINESS_TYPES[0],
        service: SERVICES[0],
        message: "",
    });
    const [sending, setSending] = useState(false);

    const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            await axios.post(`${API}/enquiries`, form);
            toast.success("Thank you! Your enquiry is on its way.", {
                description: "We will get back to you within one business day.",
            });
            setForm({ name: "", email: "", phone: "", business_type: BUSINESS_TYPES[0], service: SERVICES[0], message: "" });
        } catch (err) {
            toast.error("Something went wrong.", {
                description: "Please check your details and try again, or call us directly.",
            });
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="contact" data-testid="contact-section" className="relative overflow-hidden py-24 lg:py-32">
            <div className="absolute -bottom-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[140px]" aria-hidden="true" />
            <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-5">
                    <Reveal className="lg:col-span-2">
                        <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-amber-400" data-testid="contact-eyebrow">
                            Let's talk
                        </p>
                        <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl" data-testid="contact-heading">
                            Tell us about your business
                        </h2>
                        <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
                            Fill in the form and we'll come back with honest advice and a
                            clear quote — no pressure, no sales tricks.
                        </p>
                        <div className="mt-10 space-y-5">
                            <a
                                href="tel:+61400000000"
                                data-testid="contact-phone-link"
                                className="flex items-center gap-4 text-slate-300 transition-colors duration-300 hover:text-amber-400"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#161E2E]">
                                    <Phone className="h-5 w-5 text-amber-400" />
                                </span>
                                <span className="text-base font-medium">+61 400 000 000</span>
                            </a>
                            <a
                                href="mailto:hello@mztech.com"
                                data-testid="contact-email-link"
                                className="flex items-center gap-4 text-slate-300 transition-colors duration-300 hover:text-amber-400"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#161E2E]">
                                    <Mail className="h-5 w-5 text-amber-400" />
                                </span>
                                <span className="text-base font-medium">hello@mztech.com</span>
                            </a>
                            <a
                                href="https://wa.me/61400000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="contact-whatsapp-link"
                                className="flex items-center gap-4 text-slate-300 transition-colors duration-300 hover:text-amber-400"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#161E2E]">
                                    <MessageCircle className="h-5 w-5 text-amber-400" />
                                </span>
                                <span className="text-base font-medium">Chat on WhatsApp</span>
                            </a>
                        </div>
                    </Reveal>

                    <Reveal delay={0.15} className="lg:col-span-3">
                        <form
                            onSubmit={submit}
                            data-testid="enquiry-form"
                            className="rounded-3xl border border-white/10 bg-[#161E2E] p-8 lg:p-10"
                        >
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="enquiry-name">Your name</label>
                                    <input id="enquiry-name" data-testid="enquiry-name-input" required minLength={2} className={inputCls} placeholder="e.g. Raj Sharma" value={form.name} onChange={set("name")} />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="enquiry-phone">Phone</label>
                                    <input id="enquiry-phone" data-testid="enquiry-phone-input" required minLength={6} className={inputCls} placeholder="e.g. 0400 123 456" value={form.phone} onChange={set("phone")} />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="enquiry-email">Email</label>
                                    <input id="enquiry-email" data-testid="enquiry-email-input" type="email" required className={inputCls} placeholder="you@business.com" value={form.email} onChange={set("email")} />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="enquiry-business">Your business</label>
                                    <select id="enquiry-business" data-testid="enquiry-business-select" className={inputCls} value={form.business_type} onChange={set("business_type")}>
                                        {BUSINESS_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="enquiry-service">What do you need?</label>
                                    <select id="enquiry-service" data-testid="enquiry-service-select" className={inputCls} value={form.service} onChange={set("service")}>
                                        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="enquiry-message">Message</label>
                                    <textarea id="enquiry-message" data-testid="enquiry-message-input" required minLength={5} rows={4} className={`${inputCls} resize-none`} placeholder="Tell us a little about what you need..." value={form.message} onChange={set("message")} />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={sending}
                                data-testid="enquiry-submit-button"
                                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-base font-semibold text-slate-950 transition-colors duration-300 hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {sending ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send My Enquiry
                                        <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                                    </>
                                )}
                            </button>
                            <p className="mt-4 text-center text-xs text-slate-500">
                                We reply within one business day. Your details stay private.
                            </p>
                        </form>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Contact;
