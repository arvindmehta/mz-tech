import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HardHat, Landmark, Check } from "lucide-react";
import { Reveal } from "./Reveal";

const TABS = {
    builders: {
        label: "Builders & Fencing",
        icon: HardHat,
        image: "https://images.unsplash.com/photo-1612725118809-0bebfb71a551?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHszfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwYnVpbGRlciUyMGFyY2hpdGVjdHVyYWwlMjBibHVlcHJpbnQlMjB3b3JrZXJ8ZW58MHx8fHwxNzkwNDk2ODAwfDA&ixlib=rb-4.1.0&q=85",
        alt: "Construction builder with safety helmet examining building site",
        heading: "Win more jobs without chasing them",
        points: [
            "A project gallery that shows off your best work",
            "Simple quote-request forms customers actually fill in",
            "Google Maps and reviews that build instant trust",
            "Fast quote pages for fencing hire and site services",
            "Show up first when locals search for a builder",
        ],
    },
    brokers: {
        label: "Mortgage Brokers",
        icon: Landmark,
        image: "https://images.unsplash.com/photo-1783094267427-e97c2a97bb98?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwxfHxtb3J0Z2FnZSUyMGJyb2tlciUyMGZpbmFuY2UlMjBkaXNjdXNzaW9uJTIwbWVldGluZyUyMGhvdXNlJTIwY29udHJhY3R8ZW58MHx8fHwxNzkwNDk2ODA4fDA&ixlib=rb-4.1.0&q=85",
        alt: "Mortgage clients discussing property financing outside modern home",
        heading: "A steady stream of quality loan enquiries",
        points: [
            "Loan calculators that keep visitors on your site",
            "Landing pages built to capture leads, not just look pretty",
            "Automatic follow-up so every enquiry gets a fast reply",
            "Trust badges, reviews and clear next steps",
            "Booking links so clients pick a time that suits them",
        ],
    },
};

const Industries = () => {
    const [active, setActive] = useState("builders");
    const tab = TABS[active];

    return (
        <section id="industries" data-testid="industries-section" className="relative bg-[#0F172A] py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <Reveal>
                    <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-amber-400" data-testid="industries-eyebrow">
                        Who we help
                    </p>
                    <h2 className="font-display mt-4 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl" data-testid="industries-heading">
                        Built for your trade, not a template for everyone
                    </h2>
                </Reveal>

                <Reveal delay={0.1}>
                    <div className="mt-10 inline-flex rounded-full border border-white/10 bg-slate-900/80 p-1.5" data-testid="industry-tabs">
                        {Object.entries(TABS).map(([key, t]) => (
                            <button
                                key={key}
                                data-testid={`industry-tab-${key}`}
                                onClick={() => setActive(key)}
                                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                                    active === key ? "text-slate-950" : "text-slate-300 hover:text-white"
                                }`}
                            >
                                {active === key && (
                                    <motion.span
                                        layoutId="industry-tab-pill"
                                        className="absolute inset-0 rounded-full bg-amber-500"
                                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                                    />
                                )}
                                <t.icon className="relative z-10 h-4 w-4" />
                                <span className="relative z-10">{t.label}</span>
                            </button>
                        ))}
                    </div>
                </Reveal>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-12 grid items-center gap-12 lg:grid-cols-2"
                        data-testid="industry-panel"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-amber-500/10 blur-2xl" aria-hidden="true" />
                            <div className="relative overflow-hidden rounded-3xl border border-white/10">
                                <img
                                    src={tab.image}
                                    alt={tab.alt}
                                    className="aspect-[4/3] w-full object-cover"
                                    loading="lazy"
                                    data-testid="industry-image"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" aria-hidden="true" />
                            </div>
                        </div>
                        <div>
                            <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl" data-testid="industry-panel-heading">
                                {tab.heading}
                            </h3>
                            <ul className="mt-8 space-y-4">
                                {tab.points.map((p, i) => (
                                    <motion.li
                                        key={p}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                                        className="flex items-start gap-3 text-base text-slate-300"
                                    >
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/15">
                                            <Check className="h-3.5 w-3.5 text-amber-400" />
                                        </span>
                                        {p}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Industries;
