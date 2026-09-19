interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { container: 'w-8 h-8', text: 'text-base' },
    md: { container: 'w-10 h-10', text: 'text-lg' },
    lg: { container: 'w-14 h-14', text: 'text-2xl' },
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizes[size].container} rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#C9A546] flex items-center justify-center relative overflow-hidden shadow-md`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7/12 h-7/12"
        >
          <path
            d="M12 20L16 16L20 18L24 14L28 18"
            stroke="#0A3D2E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 24L16 22L20 24L24 20L28 24"
            stroke="#0A3D2E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
      </div>
      {showText && (
        <div>
          <h1 className={`${sizes[size].text} font-light tracking-wide`} style={{ color: '#A8E6CF' }}>
            Charlotte
          </h1>
          <p className="text-xs tracking-wider" style={{ color: '#6B8F7A', letterSpacing: '0.1em' }}>
            RECURSOS HUMANOS
          </p>
        </div>
      )}
    </div>
  );
}
