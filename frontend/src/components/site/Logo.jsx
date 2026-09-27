export const LogoMark = ({ size = 40 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <rect width="64" height="64" rx="14" fill="#0B0F17" />
        <rect
            x="1.5"
            y="1.5"
            width="61"
            height="61"
            rx="12.5"
            fill="none"
            stroke="#F59E0B"
            strokeOpacity="0.5"
            strokeWidth="2"
        />
        <path
            d="M13 46V18h6.2l7.4 14.6L34 18h6.2v28h-6V29.8l-6.3 12.4h-2.6L19 29.8V46h-6z"
            fill="#F8FAFC"
        />
        <path
            d="M40 24.5h11.5L42 40h10v5.5H39.5L49 29h-9v-4.5z"
            fill="#F59E0B"
        />
    </svg>
);

export const LogoFull = () => (
    <div className="flex items-center gap-3" data-testid="brand-logo">
        <LogoMark size={38} />
        <div className="leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-white">
                MZ Tech
            </span>
            <span className="block font-mono-tech text-[10px] uppercase tracking-[0.2em] text-amber-400">
                Web · SEO · Growth
            </span>
        </div>
    </div>
);
