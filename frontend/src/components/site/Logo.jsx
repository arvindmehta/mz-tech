export const LogoMark = ({ size = 28 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <rect
            x="11"
            y="11"
            width="42"
            height="42"
            rx="9"
            transform="rotate(45 32 32)"
            fill="#F59E0B"
        />
        <path d="M40 22h6L24 42h-6z" fill="#0B0F17" />
    </svg>
);

export const LogoFull = () => (
    <div className="flex items-center gap-2.5" data-testid="brand-logo">
        <LogoMark size={28} />
        <span className="font-display text-xl font-bold tracking-tight text-white">
            MZ <span className="text-amber-400">Tech</span>
        </span>
    </div>
);
