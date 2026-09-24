import React from "react";

interface SvgProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Tropical Wave & Sunburst Gold Centerpiece Crest
 */
export const TropicalWaveSunburstCrest: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  primaryColor = "#0E7490",
  secondaryColor = "#D4AF37",
}) => (
  <svg
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Sunburst gold ray rings */}
    <circle cx="90" cy="90" r="76" stroke={secondaryColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
    <circle cx="90" cy="90" r="70" stroke={primaryColor} strokeWidth="1.2" opacity="0.4" />

    {/* Radiant sunbeams */}
    <g transform="translate(90, 90)">
      {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <line x1="0" y1="-70" x2="0" y2="-62" stroke={secondaryColor} strokeWidth="1.5" />
          <circle cx="0" cy="-76" r="1.5" fill={primaryColor} />
        </g>
      ))}

      {/* Tropical Palm Frond Silhouette */}
      <path
        d="M-4 36 C-2 10 14 -16 38 -32 C26 -20 18 -8 16 8 C26 -2 36 -10 48 -14 C36 -4 28 6 22 18 C32 10 42 6 52 4 C38 14 30 24 24 36"
        stroke={primaryColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M-2 36 C-6 12 -22 -14 -44 -28 C-32 -18 -24 -6 -20 8 C-30 -2 -40 -8 -50 -12 C-38 -2 -30 8 -24 20 C-34 12 -44 8 -52 6 C-38 16 -30 26 -24 36"
        stroke={primaryColor}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* Center Ocean Wave Crest */}
      <path
        d="M-40 20 Q-20 4 0 20 Q20 36 40 20 C30 38 -30 38 -40 20 Z"
        fill={primaryColor}
        opacity="0.85"
      />
      <path
        d="M-30 24 Q-15 12 0 24 Q15 36 30 24"
        stroke={secondaryColor}
        strokeWidth="1.5"
        fill="none"
      />

      {/* Rising Sun Core */}
      <circle cx="0" cy="-6" r="14" fill={secondaryColor} opacity="0.9" />
      <circle cx="0" cy="-6" r="8" fill="#FEF08A" />
    </g>
  </svg>
);

/**
 * Tropical Palm Frond & Gold Accent Corner
 */
export const PalmFrondCorner: React.FC<
  SvgProps & { flipX?: boolean; flipY?: boolean }
> = ({
  className = "w-16 h-16",
  primaryColor = "#0E7490",
  secondaryColor = "#D4AF37",
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
        {/* Geometric Corner Lines */}
        <path
          d="M6 74 L6 18 C6 11 11 6 18 6 L74 6"
          stroke={secondaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 74 L12 24 C12 17 17 12 24 12 L74 12"
          stroke={primaryColor}
          strokeWidth="0.8"
          strokeDasharray="3 2"
          opacity="0.6"
        />

        {/* Tropical palm leaves spreading inward */}
        <path
          d="M6 6 Q30 30 48 20 C36 28 26 34 16 38"
          stroke={primaryColor}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M6 6 Q30 30 20 48 C28 36 34 26 38 16"
          stroke={primaryColor}
          strokeWidth="1.5"
          fill="none"
        />
        {/* Sun gold pearl dot */}
        <circle cx="20" cy="20" r="3" fill={secondaryColor} />
        <circle cx="6" cy="6" r="3" fill={primaryColor} />
      </g>
    </svg>
  );
};

/**
 * Coastal Wave & Sunburst Section Divider
 */
export const CoastalWaveDivider: React.FC<SvgProps> = ({
  className = "w-full max-w-xs h-7",
  primaryColor = "#0E7490",
  secondaryColor = "#D4AF37",
}) => (
  <svg
    viewBox="0 0 260 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left flowing wave line */}
    <path
      d="M10 14 Q35 6 60 14 Q85 22 110 14"
      stroke={primaryColor}
      strokeWidth="1.2"
      fill="none"
    />
    <circle cx="10" cy="14" r="2" fill={secondaryColor} />

    {/* Center sunburst wave knot */}
    <g transform="translate(130, 14)">
      <circle cx="0" cy="0" r="8" stroke={secondaryColor} strokeWidth="1" fill="#ECFEFF" />
      <path d="M-6 2 Q0 -4 6 2" stroke={primaryColor} strokeWidth="1.2" fill="none" />
      <circle cx="0" cy="0" r="2.5" fill={secondaryColor} />
    </g>

    {/* Right flowing wave line */}
    <path
      d="M150 14 Q175 6 200 14 Q225 22 250 14"
      stroke={primaryColor}
      strokeWidth="1.2"
      fill="none"
    />
    <circle cx="250" cy="14" r="2" fill={secondaryColor} />
  </svg>
);
