import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { LogoFull } from "./Logo";
import { scrollToId } from "@/lib/scroll";

const LINKS = [
    { label: "Services", href: "#services" },
    { label: "Experience", href: "#experience" },
    { label: "Estimator", href: "#estimator" },
    { label: "Why Us", href: "#about" },
    { label: "FAQ", href: "#faq" },
];

const Header = () => {
    const [open, setOpen] = useState(false);

    const go = (href) => {
        setOpen(false);
        scrollToId(href);
    };

    return (
        <header
            data-testid="site-header"
            className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
                <button
                    data-testid="nav-logo-button"
                    onClick={() => go("#top")}
                    className="transition-opacity duration-300 hover:opacity-80"
                    aria-label="MZ Tech home"
                >
                    <LogoFull />
                </button>

                <nav className="hidden items-center gap-8 lg:flex" data-testid="nav-links">
                    {LINKS.map((l) => (
                        <button
                            key={l.href}
                            data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                            onClick={() => go(l.href)}
                            className="font-mono-tech text-xs uppercase tracking-[0.15em] text-slate-300 transition-colors duration-300 hover:text-amber-400"
                        >
                            {l.label}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        data-testid="nav-cta-button"
                        onClick={() => go("#contact")}
                        className="group hidden items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors duration-300 hover:bg-amber-400 sm:flex"
                    >
                        Get a Free Quote
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <button
                        data-testid="mobile-menu-toggle"
                        onClick={() => setOpen(!open)}
                        className="rounded-lg border border-white/10 p-2 text-slate-200 lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        data-testid="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl lg:hidden"
                    >
                        <div className="flex flex-col gap-1 px-5 py-4">
                            {LINKS.map((l) => (
                                <button
                                    key={l.href}
                                    data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                                    onClick={() => go(l.href)}
                                    className="rounded-lg px-3 py-3 text-left font-mono-tech text-xs uppercase tracking-[0.15em] text-slate-200 transition-colors duration-300 hover:bg-white/5 hover:text-amber-400"
                                >
                                    {l.label}
                                </button>
                            ))}
                            <button
                                data-testid="mobile-nav-cta-button"
                                onClick={() => go("#contact")}
                                className="mt-2 rounded-full bg-amber-500 px-5 py-3 text-center text-sm font-semibold text-slate-950"
                            >
                                Get a Free Quote
                            </button>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
