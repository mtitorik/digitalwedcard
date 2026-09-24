import React from "react";

interface SvgProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Seashell & Ocean Wave Crest Emblem
 */
export const SeashellStarfishCrest: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  primaryColor = "#0369A1",
  secondaryColor = "#38BDF8",
}) => (
  <svg
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Ocean bubble halo */}
    <circle cx="90" cy="90" r="76" stroke={secondaryColor} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.8" />
    <circle cx="90" cy="90" r="70" stroke={primaryColor} strokeWidth="1" opacity="0.4" />

    {/* Bubble dots around perimeter */}
    <g transform="translate(90, 90)">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <circle key={i} cx={73 * Math.cos((angle * Math.PI) / 180)} cy={73 * Math.sin((angle * Math.PI) / 180)} r={i % 2 === 0 ? 2 : 1.2} fill={secondaryColor} />
      ))}

      {/* Scallop Seashell Silhouette */}
      <g transform="translate(0, -6)">
        {/* Fan flutes of the shell */}
        <path d="M0 32 L-28 -8 C-24 -24 -12 -34 0 -36 C12 -34 24 -24 28 -8 Z" fill={secondaryColor} opacity="0.3" stroke={primaryColor} strokeWidth="1.5" />
        <line x1="0" y1="32" x2="0" y2="-36" stroke={primaryColor} strokeWidth="1.2" />
        <line x1="0" y1="32" x2="-14" y2="-32" stroke={primaryColor} strokeWidth="1" />
        <line x1="0" y1="32" x2="14" y2="-32" stroke={primaryColor} strokeWidth="1" />
        <line x1="0" y1="32" x2="-22" y2="-20" stroke={primaryColor} strokeWidth="0.8" />
        <line x1="0" y1="32" x2="22" y2="-20" stroke={primaryColor} strokeWidth="0.8" />
        {/* Shell base hinge */}
        <path d="M-10 32 L10 32 L8 38 L-8 38 Z" fill={primaryColor} />
        {/* Central Luminous Pearl */}
        <circle cx="0" cy="24" r="5" fill="#FFFFFF" stroke={secondaryColor} strokeWidth="1.2" />
        <circle cx="-1.5" cy="22.5" r="1.5" fill="#BAE6FD" />
      </g>

      {/* Small Dancing Starfish to lower right */}
      <g transform="translate(26, 26) scale(0.65)">
        <polygon
          points="0,-16 4,-4 16,-4 7,4 10,16 0,8 -10,16 -7,4 -16,-4 -4,-4"
          fill={secondaryColor}
          stroke={primaryColor}
          strokeWidth="1.2"
        />
        <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
      </g>
    </g>
  </svg>
);

/**
 * Curved Ocean Tide Surf Corner
 */
export const SeasideWaveCorner: React.FC<
  SvgProps & { flipX?: boolean; flipY?: boolean }
> = ({
  className = "w-16 h-16",
  primaryColor = "#0369A1",
  secondaryColor = "#38BDF8",
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
        {/* Outer corner frame */}
        <path
          d="M6 74 L6 18 C6 10 10 6 18 6 L74 6"
          stroke={primaryColor}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 74 L12 24 C12 16 16 12 24 12 L74 12"
          stroke={secondaryColor}
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />

        {/* Ocean swirling surf wave */}
        <path
          d="M6 34 Q20 34 26 26 Q32 18 32 6"
          stroke={primaryColor}
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M12 44 Q28 44 38 32 Q44 24 44 12"
          stroke={secondaryColor}
          strokeWidth="1.2"
          fill="none"
        />

        {/* Sea foam bubbles */}
        <circle cx="18" cy="18" r="3" fill={secondaryColor} />
        <circle cx="6" cy="6" r="3" fill={primaryColor} />
        <circle cx="48" cy="6" r="2" fill={secondaryColor} />
        <circle cx="6" cy="48" r="2" fill={secondaryColor} />
      </g>
    </svg>
  );
};

/**
 * Ocean Surf & Pearl Section Divider
 */
export const OceanSurfDivider: React.FC<SvgProps> = ({
  className = "w-full max-w-xs h-7",
  primaryColor = "#0369A1",
  secondaryColor = "#38BDF8",
}) => (
  <svg
    viewBox="0 0 260 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left flowing tide */}
    <path
      d="M10 14 C30 6 50 22 75 14 C90 9 105 15 115 14"
      stroke={primaryColor}
      strokeWidth="1.2"
      fill="none"
    />
    <circle cx="10" cy="14" r="2" fill={secondaryColor} />

    {/* Center pearl ring */}
    <g transform="translate(130, 14)">
      <circle cx="0" cy="0" r="7" stroke={secondaryColor} strokeWidth="1" fill="#F0F9FF" />
      <circle cx="0" cy="0" r="3.5" fill={primaryColor} />
      <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
    </g>

    {/* Right flowing tide */}
    <path
      d="M145 14 C155 15 170 9 185 14 C210 22 230 6 250 14"
      stroke={primaryColor}
      strokeWidth="1.2"
      fill="none"
    />
    <circle cx="250" cy="14" r="2" fill={secondaryColor} />
  </svg>
);
