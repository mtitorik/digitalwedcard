import React from "react";

interface SvgProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  leafColor?: string;
}

/**
 * Traditional Brass Urli Floating Flower & Diya Crest
 */
export const BrassUrliCrest: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  primaryColor = "#B45309",
  secondaryColor = "#FACC15",
  leafColor = "#15803D",
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric outer aura / halo */}
    <circle cx="100" cy="100" r="88" stroke={secondaryColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
    <circle cx="100" cy="100" r="82" stroke={primaryColor} strokeWidth="1.2" opacity="0.5" />

    {/* Mango leaves wreath around the Urli */}
    <g transform="translate(100, 100)">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <path
            d="M0 -82 C5 -72 6 -62 0 -54 C-6 -62 -5 -72 0 -82 Z"
            fill={i % 2 === 0 ? leafColor : secondaryColor}
            opacity="0.85"
          />
          <circle cx="0" cy="-82" r="2" fill={secondaryColor} />
        </g>
      ))}

      {/* Brass Urli Rim (Outer rim with carved indentations) */}
      <circle cx="0" cy="0" r="54" fill="url(#brassGradient)" stroke={primaryColor} strokeWidth="2.5" />
      <circle cx="0" cy="0" r="46" fill="#FFFBEB" stroke={secondaryColor} strokeWidth="1.5" />

      {/* Water ripple in Urli */}
      <circle cx="0" cy="0" r="42" fill="url(#waterGradient)" opacity="0.9" />

      {/* Floating Marigold Petals on Water */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={`petal-${i}`} transform={`rotate(${angle}) translate(0, -28)`}>
          <ellipse cx="0" cy="0" rx="4.5" ry="7" fill={secondaryColor} opacity="0.9" />
          <ellipse cx="0" cy="0" rx="2.5" ry="4" fill="#F59E0B" />
        </g>
      ))}

      {/* Central Floating Clay Diya */}
      {/* Diya base */}
      <path
        d="M-14 2 C-14 12 14 12 14 2 C10 8 -10 8 -14 2 Z"
        fill={primaryColor}
        stroke="#78350F"
        strokeWidth="1"
      />
      {/* Diya flame glow */}
      <ellipse cx="0" cy="-2" rx="7" ry="12" fill="url(#flameGlow)" />
      {/* Diya inner golden flame */}
      <path
        d="M0 -14 C3 -8 4 -4 0 0 C-4 -4 -3 -8 0 -14 Z"
        fill="#FEF08A"
      />
      <circle cx="0" cy="-2" r="2" fill="#FFFFFF" />
    </g>

    <defs>
      <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE047" />
        <stop offset="50%" stopColor="#CA8A04" />
        <stop offset="100%" stopColor="#78350F" />
      </linearGradient>
      <radialGradient id="waterGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FEF9C3" />
        <stop offset="100%" stopColor="#FEF08A" />
      </radialGradient>
      <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FACC15" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

/**
 * Traditional Clay Diya & Mango Leaf Garland Corner
 */
export const ClayDiyaCornerBorder: React.FC<
  SvgProps & { flipX?: boolean; flipY?: boolean }
> = ({
  className = "w-16 h-16",
  primaryColor = "#B45309",
  secondaryColor = "#FACC15",
  leafColor = "#15803D",
  flipX = false,
  flipY = false,
}) => {
  const transform = `${flipX ? "scale(-1, 1)" : ""} ${flipY ? "scale(1, -1)" : ""}`.trim();

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g transform={transform || undefined} style={transform ? { transformOrigin: "40px 40px" } : undefined}>
        {/* Border guide lines */}
        <path
          d="M6 74 L6 18 C6 10 10 6 18 6 L74 6"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 74 L12 22 C12 16 16 12 22 12 L74 12"
          stroke={secondaryColor}
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Hanging garland loop with mango leaf & marigold bead */}
        <path
          d="M6 34 Q24 24 34 6"
          stroke={primaryColor}
          strokeWidth="1"
          strokeDasharray="2 2"
          fill="none"
        />
        {/* Mango leaf pointing downward */}
        <path
          d="M20 20 C26 26 28 36 20 44 C12 36 14 26 20 20 Z"
          fill={leafColor}
          opacity="0.8"
        />
        <circle cx="20" cy="20" r="2.5" fill={secondaryColor} />

        {/* Small corner clay diya lamp */}
        <g transform="translate(10, 10)">
          {/* Diya clay bowl */}
          <path
            d="M-5 4 C-5 9 5 9 5 4 Z"
            fill={primaryColor}
          />
          {/* Flame */}
          <path
            d="M0 -3 C1.5 0 2 2 0 4 C-2 2 -1.5 0 0 -3 Z"
            fill={secondaryColor}
          />
          <circle cx="0" cy="1" r="1" fill="#FEF08A" />
        </g>

        {/* Marigold bead studs along border */}
        <circle cx="48" cy="6" r="2.5" fill={secondaryColor} />
        <circle cx="6" cy="48" r="2.5" fill={secondaryColor} />
        <circle cx="64" cy="6" r="2" fill={primaryColor} />
        <circle cx="6" cy="64" r="2" fill={primaryColor} />
      </g>
    </svg>
  );
};

/**
 * Sacred Sanskrit Shloka & Haldi Floral Divider
 */
export const SanskritShlokaDivider: React.FC<
  SvgProps & { shlokaText?: string }
> = ({
  className = "w-full max-w-xs h-9",
  primaryColor = "#B45309",
  secondaryColor = "#FACC15",
  shlokaText = "|| शुभ विवाह ||",
}) => (
  <div className={`flex items-center justify-center gap-2 select-none ${className}`}>
    {/* Left Flourish Wing */}
    <svg viewBox="0 0 100 24" fill="none" className="w-24 h-6 shrink-0" aria-hidden="true">
      <line x1="5" y1="12" x2="88" y2="12" stroke={primaryColor} strokeWidth="1.2" />
      <circle cx="5" cy="12" r="2.5" fill={secondaryColor} />
      <path
        d="M25 12 Q45 2 65 12 Q80 20 90 12"
        stroke={secondaryColor}
        strokeWidth="1"
        fill="none"
      />
      <circle cx="45" cy="6" r="1.8" fill={primaryColor} />
      <circle cx="80" cy="17" r="1.8" fill={secondaryColor} />
    </svg>

    {/* Center Sacred Glyph Badge */}
    <div className="px-2.5 py-0.5 rounded-full bg-[#FFFBEB] border border-[#B45309]/50 shadow-xs flex items-center gap-1.5 shrink-0">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]" />
      <span className="text-xs font-serif font-bold text-[#B45309] tracking-wider whitespace-nowrap">
        {shlokaText}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]" />
    </div>

    {/* Right Flourish Wing */}
    <svg viewBox="0 0 100 24" fill="none" className="w-24 h-6 shrink-0" aria-hidden="true">
      <g transform="scale(-1, 1)" style={{ transformOrigin: "50px 12px" }}>
        <line x1="5" y1="12" x2="88" y2="12" stroke={primaryColor} strokeWidth="1.2" />
        <circle cx="5" cy="12" r="2.5" fill={secondaryColor} />
        <path
          d="M25 12 Q45 2 65 12 Q80 20 90 12"
          stroke={secondaryColor}
          strokeWidth="1"
          fill="none"
        />
        <circle cx="45" cy="6" r="1.8" fill={primaryColor} />
        <circle cx="80" cy="17" r="1.8" fill={secondaryColor} />
      </g>
    </svg>
  </div>
);

/**
 * Haldi Festive Bandarwal / Toran Top Hanging Garland
 */
export const HaldiBandarwalGarland: React.FC<SvgProps> = ({
  className = "w-full h-12",
  primaryColor = "#B45309",
  secondaryColor = "#FACC15",
  leafColor = "#15803D",
}) => (
  <svg
    viewBox="0 0 400 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    {/* Main golden twine line */}
    <line x1="0" y1="4" x2="400" y2="4" stroke={primaryColor} strokeWidth="2" strokeDasharray="5 3" />
    <line x1="0" y1="7" x2="400" y2="7" stroke={secondaryColor} strokeWidth="1" />

    {/* Alternating Mango leaves and Marigold tassels across */}
    {[0, 50, 100, 150, 200, 250, 300, 350].map((xOffset, i) => (
      <g key={i}>
        {/* Inverted triangular mango leaf */}
        <path
          d={`M${xOffset + 15} 7 C${xOffset + 18} 20 ${xOffset + 24} 30 ${xOffset + 25} 36 C${xOffset + 26} 30 ${xOffset + 32} 20 ${xOffset + 35} 7 Z`}
          fill={leafColor}
          opacity="0.85"
        />
        <line x1={xOffset + 25} y1="7" x2={xOffset + 25} y2="34" stroke="#166534" strokeWidth="0.8" />

        {/* Marigold blossom ball */}
        <circle cx={xOffset + 25} cy="40" r="4" fill={secondaryColor} />
        <circle cx={xOffset + 25} cy="40" r="2" fill="#F59E0B" />

        {/* Hanging marigold bead chain between leaves */}
        <circle cx={xOffset + 48} cy="14" r="2.8" fill={secondaryColor} />
        <circle cx={xOffset + 48} cy="22" r="2.4" fill={primaryColor} />
        <circle cx={xOffset + 48} cy="30" r="3.2" fill={secondaryColor} />
      </g>
    ))}
  </svg>
);
