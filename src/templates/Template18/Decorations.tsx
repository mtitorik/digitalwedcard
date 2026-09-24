import React from "react";

interface SvgProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Sacred Ik Onkar & Radiant Phulkari Crest
 */
export const IkOnkarKhandaCrest: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  primaryColor = "#B45309",
  secondaryColor = "#CA8A04",
}) => (
  <svg
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer Phulkari geometric star rays */}
    <circle cx="90" cy="90" r="76" stroke={secondaryColor} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.8" />
    <circle cx="90" cy="90" r="70" stroke={primaryColor} strokeWidth="1" opacity="0.4" />
    <circle cx="90" cy="90" r="64" stroke={secondaryColor} strokeWidth="1.5" opacity="0.6" />

    {/* Radiant ray aura */}
    <g transform="translate(90, 90)">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <line x1="0" y1="-70" x2="0" y2="-64" stroke={secondaryColor} strokeWidth="1.5" />
          <circle cx="0" cy="-76" r="1.5" fill={primaryColor} />
        </g>
      ))}

      {/* Stylized Ik Onkar (ੴ) Glyph */}
      {/* Number 1 (Ekk) */}
      <path
        d="M-14 -6 C-24 -6 -24 -24 -12 -28 C-2 -32 6 -16 6 -6 C6 14 -12 28 -22 28"
        stroke={primaryColor}
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Onkar curve flourish */}
      <path
        d="M6 -6 C14 -20 28 -20 30 -6 C32 10 18 16 10 26 C4 32 -6 32 -10 28"
        stroke={primaryColor}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Upper arched plume */}
      <path
        d="M20 -18 C26 -34 8 -42 -2 -34 C-6 -30 -2 -24 6 -24 C14 -24 22 -32 28 -28"
        stroke={secondaryColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Golden Bindu dot */}
      <circle cx="2" cy="-4" r="3" fill={secondaryColor} />
      <circle cx="2" cy="-4" r="1.5" fill="#FEF08A" />
    </g>
  </svg>
);

/**
 * Geometric Phulkari Embroidery Corner Border
 */
export const PhulkariCornerBorder: React.FC<
  SvgProps & { flipX?: boolean; flipY?: boolean }
> = ({
  className = "w-16 h-16",
  primaryColor = "#B45309",
  secondaryColor = "#CA8A04",
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
        {/* Outer border track */}
        <path
          d="M6 74 L6 18 C6 10 10 6 18 6 L74 6"
          stroke={primaryColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 74 L12 24 C12 16 16 12 24 12 L74 12"
          stroke={secondaryColor}
          strokeWidth="1"
          strokeDasharray="3 2"
        />

        {/* Phulkari diamond stitch pattern in corner */}
        <polygon
          points="20,12 28,20 20,28 12,20"
          fill={secondaryColor}
          opacity="0.8"
          stroke={primaryColor}
          strokeWidth="0.8"
        />
        <polygon
          points="32,12 40,20 32,28 24,20"
          fill={primaryColor}
          opacity="0.75"
        />
        <polygon
          points="12,32 20,40 12,48 4,40"
          fill={primaryColor}
          opacity="0.75"
        />

        {/* Stud dots */}
        <circle cx="6" cy="6" r="3" fill={primaryColor} />
        <circle cx="20" cy="20" r="2.2" fill="#FEF08A" />
        <circle cx="56" cy="6" r="2" fill={secondaryColor} />
        <circle cx="6" cy="56" r="2" fill={secondaryColor} />
      </g>
    </svg>
  );
};

/**
 * Traditional Anand Karaj & Dhol Drum Section Divider
 */
export const AnandKarajDholDivider: React.FC<SvgProps> = ({
  className = "w-full max-w-xs h-9",
  primaryColor = "#B45309",
  secondaryColor = "#CA8A04",
}) => (
  <svg
    viewBox="0 0 300 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left flourishing line */}
    <line x1="15" y1="18" x2="115" y2="18" stroke={primaryColor} strokeWidth="1.2" />
    <circle cx="15" cy="18" r="2.5" fill={secondaryColor} />
    <path
      d="M45 18 Q60 10 75 18 Q90 26 105 18"
      stroke={secondaryColor}
      strokeWidth="1"
      fill="none"
    />
    <circle cx="60" cy="13" r="1.8" fill={primaryColor} />
    <circle cx="90" cy="23" r="1.8" fill={primaryColor} />

    {/* Right flourishing line */}
    <line x1="185" y1="18" x2="285" y2="18" stroke={primaryColor} strokeWidth="1.2" />
    <circle cx="285" cy="18" r="2.5" fill={secondaryColor} />
    <path
      d="M195 18 Q210 10 225 18 Q240 26 255 18"
      stroke={secondaryColor}
      strokeWidth="1"
      fill="none"
    />
    <circle cx="210" cy="13" r="1.8" fill={primaryColor} />
    <circle cx="240" cy="23" r="1.8" fill={primaryColor} />

    {/* Center Celebratory Dhol Drum Icon */}
    <g transform="translate(150, 18)">
      {/* Dhol Drum barrel */}
      <rect x="-14" y="-8" width="28" height="16" rx="4" fill={primaryColor} stroke={secondaryColor} strokeWidth="1" />
      {/* Drum skin ends */}
      <ellipse cx="-14" cy="0" rx="3" ry="8" fill={secondaryColor} stroke="#78350F" strokeWidth="0.8" />
      <ellipse cx="14" cy="0" rx="3" ry="8" fill={secondaryColor} stroke="#78350F" strokeWidth="0.8" />
      {/* Diagonal tuning cords */}
      <line x1="-11" y1="-8" x2="0" y2="8" stroke="#FEF08A" strokeWidth="0.8" />
      <line x1="0" y1="8" x2="11" y2="-8" stroke="#FEF08A" strokeWidth="0.8" />
      <line x1="-11" y1="8" x2="0" y2="-8" stroke="#FEF08A" strokeWidth="0.8" />
      <line x1="0" y1="-8" x2="11" y2="8" stroke="#FEF08A" strokeWidth="0.8" />
      {/* Center gold ring */}
      <circle cx="0" cy="0" r="2.5" fill={secondaryColor} />
    </g>
  </svg>
);
