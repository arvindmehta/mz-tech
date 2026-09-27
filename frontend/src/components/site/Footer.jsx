import { Phone, Mail, MessageCircle } from "lucide-react";
import { LogoMark } from "./Logo";
import { scrollToId } from "@/lib/scroll";

const Footer = () => (
    <footer data-testid="site-footer" className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-sm">
                    <div className="flex items-center gap-2.5">
                        <LogoMark size={30} />
                        <span className="font-display text-xl font-bold tracking-tight text-white">
                            MZ <span className="text-amber-400">Tech</span>
                        </span>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-slate-400">
                        Websites, SEO, digital marketing and automation — 17 years of
                        experience across banking, utilities, retail, not-for-profit and
                        local business, explained in simple words.
                    </p>
                </div>

                <div>
                    <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-slate-500">
                        Explore
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                        {[
                            ["Services", "#services"],
                            ["Experience", "#experience"],
                            ["Estimator", "#estimator"],
                            ["Why Us", "#about"],
                        ].map(([label, href]) => (
                            <button
                                key={href}
                                data-testid={`footer-link-${label.toLowerCase().replace(/\s/g, "-")}`}
                                onClick={() => scrollToId(href)}
                                className="text-left text-sm text-slate-300 transition-colors duration-300 hover:text-amber-400"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-slate-500">
                        Contact
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                        <a href="tel:+61400000000" data-testid="footer-phone-link" className="flex items-center gap-2.5 text-sm text-slate-300 transition-colors duration-300 hover:text-amber-400">
                            <Phone className="h-4 w-4 text-amber-400" /> +61 400 000 000
                        </a>
                        <a href="mailto:hello@mztech.com" data-testid="footer-email-link" className="flex items-center gap-2.5 text-sm text-slate-300 transition-colors duration-300 hover:text-amber-400">
                            <Mail className="h-4 w-4 text-amber-400" /> hello@mztech.com
                        </a>
                        <a href="https://wa.me/61400000000" target="_blank" rel="noopener noreferrer" data-testid="footer-whatsapp-link" className="flex items-center gap-2.5 text-sm text-slate-300 transition-colors duration-300 hover:text-amber-400">
                            <MessageCircle className="h-4 w-4 text-amber-400" /> WhatsApp us
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                <p className="text-xs text-slate-500" data-testid="footer-copyright">
                    © {new Date().getFullYear()} MZ Tech. All rights reserved.
                </p>
                <div className="flex items-center gap-5">
                    <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-slate-600">
                        Built with pride for our community
                    </p>
                    <a
                        href={`${process.env.REACT_APP_BACKEND_URL}/api/oauth/sheets/login`}
                        data-testid="connect-sheets-link"
                        className="text-xs text-slate-600 transition-colors duration-300 hover:text-amber-400"
                    >
                        Owner: Connect Google Sheets
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
