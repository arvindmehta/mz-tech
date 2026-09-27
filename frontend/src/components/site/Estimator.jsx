import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";
import { scrollToId } from "@/lib/scroll";

const Slider = ({ label, value, min, max, step, format, onChange, testid }) => (
    <div>
        <div className="flex items-baseline justify-between">
            <label className="text-sm font-medium text-slate-300">{label}</label>
            <span className="font-mono-tech text-lg font-semibold text-amber-400" data-testid={`${testid}-value`}>
                {format(value)}
            </span>
        </div>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            data-testid={testid}
            className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-amber-500"
        />
    </div>
);

const Estimator = () => {
    const [visitors, setVisitors] = useState(800);
    const [conversion, setConversion] = useState(3);
    const [jobValue, setJobValue] = useState(5000);

    const leads = Math.round((visitors * conversion) / 100);
    const revenue = leads * jobValue;

    const fmtMoney = (n) => "$" + n.toLocaleString();

    return (
        <section id="estimator" data-testid="estimator-section" className="relative py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="grid items-center gap-14 lg:grid-cols-2">
                    <Reveal>
                        <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-amber-400" data-testid="estimator-eyebrow">
                            Growth estimator
                        </p>
                        <h2 className="font-display mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl" data-testid="estimator-heading">
                            What could a better website be worth to you?
                        </h2>
                        <p className="mt-4 max-w-md text-base text-slate-400">
                            Move the sliders. See how even a small lift in enquiries turns
                            into real money for your business each month.
                        </p>

                        <div className="mt-10 space-y-8 rounded-3xl border border-white/10 bg-[#161E2E] p-8">
                            <Slider
                                label="Monthly website visitors"
                                value={visitors}
                                min={100}
                                max={10000}
                                step={100}
                                format={(v) => v.toLocaleString()}
                                onChange={setVisitors}
                                testid="estimator-visitors-slider"
                            />
                            <Slider
                                label="Visitors who enquire"
                                value={conversion}
                                min={1}
                                max={10}
                                step={0.5}
                                format={(v) => `${v}%`}
                                onChange={setConversion}
                                testid="estimator-conversion-slider"
                            />
                            <Slider
                                label="Value of one customer"
                                value={jobValue}
                                min={500}
                                max={50000}
                                step={500}
                                format={fmtMoney}
                                onChange={setJobValue}
                                testid="estimator-value-slider"
                            />
                        </div>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <div className="relative rounded-3xl border border-amber-500/25 bg-gradient-to-b from-[#161E2E] to-[#0F172A] p-10 text-center" data-testid="estimator-result-card">
                            <div className="absolute -top-5 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-2xl bg-amber-500 text-slate-950">
                                <Calculator className="h-5 w-5" />
                            </div>
                            <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-slate-400">
                                Estimated monthly enquiries
                            </p>
                            <motion.p
                                key={leads}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-display mt-3 text-5xl font-extrabold text-white sm:text-6xl"
                                data-testid="estimator-leads-result"
                            >
                                {leads}
                            </motion.p>
                            <div className="mx-auto my-8 h-px w-2/3 bg-white/10" aria-hidden="true" />
                            <p className="font-mono-tech text-xs uppercase tracking-[0.25em] text-slate-400">
                                Potential monthly value
                            </p>
                            <motion.p
                                key={revenue}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-display mt-3 text-5xl font-extrabold text-amber-400 sm:text-6xl"
                                data-testid="estimator-revenue-result"
                            >
                                {fmtMoney(revenue)}
                            </motion.p>
                            <p className="mt-6 text-xs text-slate-500">
                                A guide only — real results depend on your market and offer.
                            </p>
                            <button
                                data-testid="estimator-cta-button"
                                onClick={() => {
                                    toast.success("Let's make these numbers real.", {
                                        description: "Tell us about your business below.",
                                    });
                                    scrollToId("#contact");
                                }}
                                className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-amber-500 px-8 py-4 text-base font-semibold text-slate-950 transition-colors duration-300 hover:bg-amber-400"
                            >
                                Get My Growth Plan
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Estimator;
