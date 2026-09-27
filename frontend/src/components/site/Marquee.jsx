import Marquee from "react-fast-marquee";

const ITEMS = [
    "17+ Years Experience",
    "Web Development",
    "SEO That Ranks",
    "Marketing Automation",
    "Digital Marketing",
    "Trusted by Builders & Brokers",
];

const MarqueeRibbon = () => (
    <div
        data-testid="marquee-ribbon"
        className="relative border-y border-white/10 bg-[#0F172A] py-5"
    >
        <Marquee speed={32} gradient={false} pauseOnHover>
            {ITEMS.map((item, i) => (
                <div key={i} className="flex items-center" data-testid={`marquee-item-${i}`}>
                    <span className="font-display px-8 text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">
                        {item}
                    </span>
                    <span className="h-1.5 w-1.5 rotate-45 bg-amber-500" aria-hidden="true" />
                </div>
            ))}
        </Marquee>
    </div>
);

export default MarqueeRibbon;
