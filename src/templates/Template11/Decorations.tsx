import React from "react";

interface SvgProps {
  className?: string;
  color?: string;
  secondaryColor?: string;
}

/**
 * Gilded Mandala & Cascading Orchid Centerpiece
 */
export const CascadingOrchidMedallion: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  color = "#9333EA",
  secondaryColor = "#F59E0B",
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric ornate rings */}
    <circle
      cx="100"
      cy="100"
      r="84"
      stroke={secondaryColor}
      strokeWidth="1.2"
      strokeDasharray="4 3"
      opacity="0.8"
    />
    <circle
      cx="100"
      cy="100"
      r="78"
      stroke={color}
      strokeWidth="1"
      opacity="0.5"
    />
    <circle
      cx="100"
      cy="100"
      r="70"
      stroke={secondaryColor}
      strokeWidth="1.5"
      opacity="0.7"
    />

    {/* 8-fold radial Orchid & Marigold blossom petals */}
    <g transform="translate(100, 100)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          {/* Orchid outer petal */}
          <path
            d="M0 -78 C9 -60 12 -44 0 -34 C-12 -44 -9 -60 0 -78 Z"
            fill={color}
            opacity="0.85"
          />
          {/* Inner amber feather */}
          <path
            d="M0 -68 C5 -54 6 -42 0 -34 C-6 -42 -5 -54 0 -68 Z"
            fill={secondaryColor}
            opacity="0.9"
          />
          {/* Tip golden pearl */}
          <circle cx="0" cy="-78" r="2.2" fill={secondaryColor} />
          {/* Side blossom dots */}
          <circle cx="-6" cy="-56" r="1.5" fill={color} />
          <circle cx="6" cy="-56" r="1.5" fill={color} />
        </g>
      ))}

      {/* Middle radial petals */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <g key={`sub-${i}`} transform={`rotate(${angle})`}>
          <path
            d="M0 -55 C6 -42 6 -32 0 -24 C-6 -32 -6 -42 0 -55 Z"
            fill={secondaryColor}
            opacity="0.75"
          />
          <circle cx="0" cy="-55" r="1.8" fill={color} />
        </g>
      ))}

      {/* Center radiant lotus core */}
      <circle cx="0" cy="0" r="22" fill={color} opacity="0.15" />
      <circle cx="0" cy="0" r="18" fill="url(#orchidCenterGrad)" stroke={secondaryColor} strokeWidth="1.5" />
      <circle cx="0" cy="0" r="11" fill={color} />
      <circle cx="0" cy="0" r="4.5" fill={secondaryColor} />
    </g>

    <defs>
      <radialGradient id="orchidCenterGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FEF9C3" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
    </defs>
  </svg>
);

/**
 * Hanging Marigold & Orchid Toran Top Garland
 */
export const OrchidToranGarland: React.FC<SvgProps> = ({
  className = "w-full h-12",
  color = "#9333EA",
  secondaryColor = "#F59E0B",
}) => (
  <svg
    viewBox="0 0 400 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    {/* Top golden anchor thread */}
    <line x1="0" y1="4" x2="400" y2="4" stroke={secondaryColor} strokeWidth="2" strokeDasharray="6 3" />
    <line x1="0" y1="8" x2="400" y2="8" stroke={color} strokeWidth="0.8" opacity="0.6" />

    {/* Festoon hanging curved garlands */}
    {[0, 80, 160, 240, 320].map((xOffset, i) => (
      <g key={i}>
        {/* Curved hanging garland arc */}
        <path
          d={`M${xOffset} 8 Q${xOffset + 40} 32 ${xOffset + 80} 8`}
          stroke={secondaryColor}
          strokeWidth="1.5"
          fill="none"
        />
        {/* Draped marigold beads along arc */}
        <circle cx={xOffset + 15} cy="16" r="3" fill={secondaryColor} />
        <circle cx={xOffset + 28} cy="22" r="3.2" fill={color} />
        <circle cx={xOffset + 40} cy="25" r="4" fill={secondaryColor} />
        <circle cx={xOffset + 52} cy="22" r="3.2" fill={color} />
        <circle cx={xOffset + 65} cy="16" r="3" fill={secondaryColor} />

        {/* Central hanging pendant tassel */}
        <line x1={xOffset + 40} y1="25" x2={xOffset + 40} y2="42" stroke={secondaryColor} strokeWidth="1.2" />
        <circle cx={xOffset + 40} cy="34" r="2.5" fill={color} />
        {/* Orchid flower drop at bottom */}
        <path
          d={`M${xOffset + 40} 46 C${xOffset + 36} 41 ${xOffset + 44} 41 ${xOffset + 40} 46 Z`}
          fill={color}
        />
        <circle cx={xOffset + 40} cy="44" r="1.5" fill={secondaryColor} />
      </g>
    ))}
  </svg>
);

/**
 * Handcrafted Scrollwork Floral Corner
 */
export const HandcraftedScrollworkCorner: React.FC<
  SvgProps & { flipX?: boolean; flipY?: boolean }
> = ({
  className = "w-16 h-16",
  color = "#9333EA",
  secondaryColor = "#F59E0B",
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
        {/* Corner outer border track */}
        <path
          d="M6 74 L6 20 C6 12 12 6 20 6 L74 6"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 74 L14 24 C14 18 18 14 24 14 L74 14"
          stroke={color}
          strokeWidth="0.8"
          strokeDasharray="3 2"
          opacity="0.7"
        />

        {/* Corner scrollwork flourish */}
        <path
          d="M6 6 Q20 20 32 10 Q40 4 48 10 Q56 16 52 26 Q46 36 34 32 Q26 28 28 20 Q30 14 36 16"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
        />
        {/* Counter scroll */}
        <path
          d="M10 32 Q16 40 10 48 Q4 56 14 62 Q24 68 28 58 Q32 48 24 40"
          stroke={secondaryColor}
          strokeWidth="1.2"
          fill="none"
        />

        {/* Decorative blossom studs */}
        <circle cx="20" cy="20" r="3.5" fill={secondaryColor} />
        <circle cx="20" cy="20" r="1.8" fill={color} />
        <circle cx="38" cy="11" r="2" fill={secondaryColor} />
        <circle cx="11" cy="38" r="2" fill={secondaryColor} />
        <circle cx="6" cy="6" r="3" fill={color} />
      </g>
    </svg>
  );
};

/**
 * Floral Mandala & Auspicious Divider
 */
export const FloralMandalaDivider: React.FC<SvgProps> = ({
  className = "w-full max-w-xs h-8",
  color = "#9333EA",
  secondaryColor = "#F59E0B",
}) => (
  <svg
    viewBox="0 0 300 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left horizontal flourishing stem */}
    <line x1="20" y1="16" x2="115" y2="16" stroke={secondaryColor} strokeWidth="1.2" />
    <circle cx="20" cy="16" r="2.5" fill={color} />
    <path
      d="M50 16 Q65 8 80 16 Q95 24 110 16"
      stroke={color}
      strokeWidth="0.9"
      opacity="0.7"
      fill="none"
    />
    <circle cx="65" cy="11" r="1.5" fill={secondaryColor} />
    <circle cx="95" cy="21" r="1.5" fill={secondaryColor} />

    {/* Right horizontal flourishing stem */}
    <line x1="185" y1="16" x2="280" y2="16" stroke={secondaryColor} strokeWidth="1.2" />
    <circle cx="280" cy="16" r="2.5" fill={color} />
    <path
      d="M190 16 Q205 8 220 16 Q235 24 250 16"
      stroke={color}
      strokeWidth="0.9"
      opacity="0.7"
      fill="none"
    />
    <circle cx="205" cy="11" r="1.5" fill={secondaryColor} />
    <circle cx="235" cy="21" r="1.5" fill={secondaryColor} />

    {/* Center auspicious floral medallion */}
    <g transform="translate(150, 16)">
      <circle cx="0" cy="0" r="14" stroke={secondaryColor} strokeWidth="1" strokeDasharray="2 2" />
      {/* 4 cardinal petals */}
      <path d="M0 -12 C3 -8 3 -4 0 0 C-3 -4 -3 -8 0 -12 Z" fill={color} />
      <path d="M0 12 C3 8 3 4 0 0 C-3 4 -3 8 0 12 Z" fill={color} />
      <path d="M-12 0 C-8 3 -4 3 0 0 C-4 -3 -8 -3 -12 0 Z" fill={color} />
      <path d="M12 0 C8 3 4 3 0 0 C4 -3 8 -3 12 0 Z" fill={color} />
      {/* 4 diagonal golden pearls */}
      <circle cx="-6" cy="-6" r="1.5" fill={secondaryColor} />
      <circle cx="6" cy="-6" r="1.5" fill={secondaryColor} />
      <circle cx="-6" cy="6" r="1.5" fill={secondaryColor} />
      <circle cx="6" cy="6" r="1.5" fill={secondaryColor} />
      {/* Central golden core */}
      <circle cx="0" cy="0" r="3.2" fill={secondaryColor} />
      <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
    </g>
  </svg>
);
