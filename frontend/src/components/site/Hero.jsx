import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { ArrowRight, Phone, TrendingUp, Search, MousePointerClick } from "lucide-react";
import { scrollToId } from "@/lib/scroll";

const LINES = [
    { text: "We build websites", accent: false },
    { text: "that bring you", accent: false },
    { text: "real customers.", accent: true },
];

const METRICS = [
    { icon: MousePointerClick, label: "Enquiries this month", value: "38", note: "+52% after relaunch" },
    { icon: Search, label: "Google ranking", value: "#1", note: '"temporary fence hire"' },
    { icon: TrendingUp, label: "Ad spend return", value: "6.4x", note: "mortgage lead campaign" },
];

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const glowY = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const gridY = useTransform(scrollYProgress, [0, 1], [0, 90]);

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });

    const onMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <section id="top" ref={ref} data-testid="hero-section" className="relative overflow-hidden">
            <motion.div style={{ y: gridY }} className="bg-grid absolute inset-0" aria-hidden="true" />
            <motion.div
                style={{ y: glowY }}
                aria-hidden="true"
                className="animate-pulse-glow absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-amber-500/15 blur-[140px]"
            />

            <div className="relative mx-auto grid max-w-7xl gap-16 px-5 pb-24 pt-16 sm:pt-24 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-32 lg:pt-28">
                <div className="lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5"
                        data-testid="hero-experience-pill"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        <span className="font-mono-tech text-xs uppercase tracking-[0.18em] text-amber-400">
                            17 years of software experience
                        </span>
                    </motion.div>

                    <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl" data-testid="hero-headline">
                        {LINES.map((line, i) => (
                            <span key={i} className="block overflow-hidden pb-1">
                                <motion.span
                                    className={`block ${line.accent ? "text-amber-400" : ""}`}
                                    initial={{ y: "115%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.9, delay: 0.35 + i * 0.16, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {line.text}
                                </motion.span>
                            </span>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.95 }}
                        className="mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
                        data-testid="hero-subtext"
                    >
                        Simple, honest digital help for construction businesses, fencing
                        contractors and mortgage brokers. We handle your website, Google
                        ranking, ads and follow-ups — you focus on the work you do best.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.1 }}
                        className="mt-10 flex flex-col gap-4 sm:flex-row"
                    >
                        <button
                            data-testid="hero-quote-button"
                            onClick={() => scrollToId("#contact")}
                            className="group flex items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-base font-semibold text-slate-950 transition-colors duration-300 hover:bg-amber-400"
                        >
                            Get a Free Quote
                            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                        <button
                            data-testid="hero-call-button"
                            onClick={() => (window.location.href = "tel:+61400000000")}
                            className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 text-base font-semibold text-white transition-colors duration-300 hover:border-amber-500/60 hover:text-amber-400"
                        >
                            <Phone className="h-5 w-5" />
                            Call Us Directly
                        </button>
                    </motion.div>
                </div>

                <div className="lg:col-span-5" style={{ perspective: 1200 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        onMouseMove={onMouseMove}
                        onMouseLeave={() => { mx.set(0); my.set(0); }}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        className="relative rounded-3xl border border-white/10 bg-[#161E2E]/90 p-6 shadow-[0_0_80px_rgba(245,158,11,0.12)] backdrop-blur"
                        data-testid="hero-proof-card"
                    >
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" aria-hidden="true" />
                        <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-slate-400">
                            Live proof · client results
                        </p>
                        <div className="mt-6 space-y-4" style={{ transform: "translateZ(30px)" }}>
                            {METRICS.map((m, i) => (
                                <motion.div
                                    key={m.label}
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.7, delay: 1 + i * 0.18 }}
                                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-slate-900/70 p-4"
                                    data-testid={`hero-metric-${i}`}
                                >
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                                        <m.icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm text-slate-400">{m.label}</p>
                                        <p className="truncate font-mono-tech text-xs text-amber-400/90">{m.note}</p>
                                    </div>
                                    <span className="font-display text-2xl font-bold text-white">{m.value}</span>
                                </motion.div>
                            ))}
                        </div>
                        <p className="mt-6 text-center text-xs text-slate-500">
                            Example results from trade &amp; broker projects
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
