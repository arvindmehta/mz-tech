import { Landmark, Zap, Paintbrush, HeartHandshake, HardHat, Home } from "lucide-react";
import { Reveal } from "./Reveal";

const SECTORS = [
    {
        icon: Landmark,
        title: "Banking & Finance",
        desc: "Built and managed websites for a major bank — secure, fast and always online.",
    },
    {
        icon: Zap,
        title: "Utilities & Energy",
        desc: "Digital platforms for a large utility provider serving thousands of customers every day.",
    },
    {
        icon: Paintbrush,
        title: "Retail & Manufacturing",
        desc: "Websites and digital campaigns for a national paint company and retail brands.",
    },
    {
        icon: HeartHandshake,
        title: "Not-for-Profit",
        desc: "Warm, accessible websites that help community organisations do more good.",
    },
    {
        icon: HardHat,
        title: "Trades & Construction",
        desc: "Quote-winning websites for builders, contractors and local trade businesses.",
    },
    {
        icon: Home,
        title: "Property & Lending",
        desc: "Lead-generating websites and funnels for brokers and property professionals.",
    },
];

const Industries = () => (
    <section id="experience" data-testid="experience-section" className="relative bg-[#0F172A] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
                <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-amber-400" data-testid="experience-eyebrow">
                    Experience
                </p>
                <h2 className="font-display mt-4 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl" data-testid="experience-heading">
                    Big-brand experience. Small-business care.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
                    Over 17 years I have built, managed and grown websites and digital
                    campaigns for organisations of every size. The same care and quality
                    now goes into every business I work with — including yours.
                </p>
            </Reveal>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SECTORS.map((s, i) => (
                    <Reveal key={s.title} delay={i * 0.08}>
                        <div
                            className="group h-full rounded-3xl border border-white/10 bg-[#161E2E] p-7 transition-colors duration-300 hover:border-amber-500/40"
                            data-testid={`experience-card-${i}`}
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 transition-transform duration-300 group-hover:scale-110">
                                <s.icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-display mt-5 text-lg font-semibold text-white">
                                {s.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                {s.desc}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>

            <Reveal delay={0.2}>
                <div
                    className="mt-10 rounded-3xl border border-amber-500/25 bg-amber-500/5 px-8 py-6"
                    data-testid="experience-note"
                >
                    <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                        <span className="font-semibold text-amber-400">An honest note:</span>{" "}
                        much of this past work was delivered as an employee or contractor,
                        so brand names stay private. The experience behind MZ Tech,
                        however, is completely real — and it works for you now.
                    </p>
                </div>
            </Reveal>
        </div>
    </section>
);

export default Industries;
