export const LogoMark = ({ size = 26 }) => (
    <svg
        width={(size * 60) / 42}
        height={size}
        viewBox="0 0 60 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M6 36V8l10 13L26 8v28"
            stroke="#F8FAFC"
            strokeWidth="5"
            strokeLinejoin="miter"
        />
        <path
            d="M34 9h18L37 35h18"
            stroke="#F59E0B"
            strokeWidth="5"
            strokeLinejoin="miter"
        />
    </svg>
);

export const LogoFull = () => (
    <div className="flex items-center gap-2.5" data-testid="brand-logo">
        <LogoMark size={24} />
        <span className="font-display text-xl font-bold tracking-tight text-amber-400">
            Tech
            <span className="sr-only"> — MZ Tech</span>
        </span>
    </div>
);
