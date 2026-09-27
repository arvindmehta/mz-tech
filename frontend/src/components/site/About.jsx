import { ShieldCheck, MessageCircle, BadgeDollarSign, Users } from "lucide-react";
import { Reveal } from "./Reveal";

const PILLARS = [
    {
        icon: ShieldCheck,
        title: "17 years, zero fluff",
        desc: "Nearly two decades building websites and growth systems. We know what works and skip what doesn't.",
    },
    {
        icon: MessageCircle,
        title: "Plain English, always",
        desc: "We explain everything in simple words. You will always know what you're paying for and why.",
    },
    {
        icon: BadgeDollarSign,
        title: "Honest pricing",
        desc: "Clear quotes up front. No hidden fees, no lock-in tricks, no surprise invoices.",
    },
    {
        icon: Users,
        title: "Community first",
        desc: "We proudly serve Indian and Asian business families. Your success is our reputation.",
    },
];

const STATS = [
    { value: "17+", label: "Years of experience" },
    { value: "4", label: "Core services" },
    { value: "1", label: "Simple promise — results" },
];

const About = () => (
    <section id="about" data-testid="about-section" className="relative bg-[#0F172A] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid items-start gap-16 lg:grid-cols-2">
                <Reveal>
                    <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-amber-400" data-testid="about-eyebrow">
                        Why MZ Tech
                    </p>
                    <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl" data-testid="about-heading">
                        A tech partner who speaks your language
                    </h2>
                    <p className="mt-6 max-w-lg text-base leading-relaxed text-slate-300">
                        After 17 years of building websites and running digital marketing,
                        we started MZ Tech with one simple idea: give hard-working business
                        owners the same quality the big companies get — explained simply,
                        priced fairly, delivered properly.
                    </p>
                    <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
                        From a big bank and a major utility provider to local shops and
                        community groups — every project taught us something. Whatever
                        your business, it deserves to be found online.
                    </p>

                    <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-400">
                        And once your website is live, we don't walk away — we manage it
                        for you, keeping it updated, secure and working hard every day.
                    </p>

                    <div className="mt-12 grid grid-cols-3 gap-6" data-testid="about-stats">
                        {STATS.map((s) => (
                            <div key={s.label} className="border-l-2 border-amber-500/50 pl-4">
                                <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                                    {s.value}
                                </p>
                                <p className="mt-1 text-xs leading-snug text-slate-400 sm:text-sm">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </Reveal>

                <div className="grid gap-6 sm:grid-cols-2">
                    {PILLARS.map((p, i) => (
                        <Reveal key={p.title} delay={i * 0.1}>
                            <div
                                className="h-full rounded-3xl border border-white/10 bg-[#161E2E] p-7 transition-colors duration-300 hover:border-amber-500/40"
                                data-testid={`about-pillar-${i}`}
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                                    <p.icon className="h-5 w-5" />
                                </div>
                                <h3 className="font-display mt-5 text-lg font-semibold text-white">
                                    {p.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                    {p.desc}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default About;
