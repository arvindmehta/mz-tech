import { motion } from "framer-motion";
import { Globe, Search, Megaphone, Workflow, Check, LifeBuoy, Hammer, Wrench } from "lucide-react";
import { Reveal } from "./Reveal";

const SERVICES = [
    {
        icon: Globe,
        title: "Website Development",
        desc: "A fast, mobile-friendly website that turns visitors into phone calls and quote requests.",
        points: ["Ready in weeks, not months", "Easy for you to update", "Built to win enquiries"],
        span: "lg:col-span-4",
        big: true,
    },
    {
        icon: Search,
        title: "SEO",
        desc: "Show up on Google when local customers search for your services.",
        points: ["Local search focus", "Monthly plain-English reports"],
        span: "lg:col-span-2",
        big: false,
    },
    {
        icon: Megaphone,
        title: "Digital Marketing",
        desc: "Google and Facebook ads that bring the right people to your business.",
        points: ["Targeted local campaigns", "You control the budget"],
        span: "lg:col-span-2",
        big: false,
    },
    {
        icon: Workflow,
        title: "Marketing Automation",
        desc: "Automatic follow-ups by email and SMS, so no enquiry is ever forgotten.",
        points: ["Instant replies to new leads", "Review requests on autopilot"],
        span: "lg:col-span-4",
        big: true,
    },
];

const Services = () => (
    <section id="services" data-testid="services-section" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
                <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-amber-400" data-testid="services-eyebrow">
                    What we do
                </p>
                <h2 className="font-display mt-4 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl" data-testid="services-heading">
                    Four services. One goal — more customers for you.
                </h2>
                <p className="mt-4 max-w-xl text-base text-slate-400">
                    No jargon, no confusing packages. Pick what you need, or let us suggest
                    the right mix for your business.
                </p>
            </Reveal>

            <div className="mt-14 grid gap-6 lg:grid-cols-6">
                {SERVICES.map((s, i) => (
                    <Reveal key={s.title} delay={i * 0.1} className={s.span}>
                        <motion.div
                            whileHover={{ y: -6 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className={`group relative h-full rounded-3xl border border-white/10 bg-[#161E2E] p-8 transition-colors duration-300 hover:border-amber-500/50 ${s.big ? "lg:p-10" : ""}`}
                            data-testid={`service-card-${i}`}
                        >
                            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/0 to-transparent transition-all duration-500 group-hover:via-amber-400/60" aria-hidden="true" />
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
                                <s.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-display mt-6 text-xl font-semibold text-white sm:text-2xl">
                                {s.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                                {s.desc}
                            </p>
                            <ul className="mt-6 space-y-2.5">
                                {s.points.map((p) => (
                                    <li key={p} className="flex items-center gap-2.5 text-sm text-slate-300">
                                        <Check className="h-4 w-4 shrink-0 text-amber-400" />
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </Reveal>
                ))}
            </div>

            <Reveal delay={0.15}>
                <div
                    className="mt-6 flex flex-col items-start gap-6 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-[#161E2E] to-[#161E2E] p-8 sm:flex-row sm:items-center lg:p-10"
                    data-testid="service-care-banner"
                >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-slate-950">
                        <LifeBuoy className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                            We don't disappear after launch
                        </h3>
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                            One team for the whole journey — no handovers, no chasing
                            different people. We build your website, and then we keep
                            looking after it.
                        </p>
                        <div className="mt-6 grid max-w-2xl gap-4 sm:grid-cols-2">
                            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4" data-testid="care-build-item">
                                <Hammer className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                                <div>
                                    <p className="text-sm font-semibold text-white">We build it</p>
                                    <p className="mt-1 text-sm leading-relaxed text-slate-400">
                                        Fast, modern websites made to win you enquiries.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4" data-testid="care-maintain-item">
                                <Wrench className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                                <div>
                                    <p className="text-sm font-semibold text-white">We maintain it</p>
                                    <p className="mt-1 text-sm leading-relaxed text-slate-400">
                                        Updates, backups, security and small changes — handled for you.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
);

export default Services;
