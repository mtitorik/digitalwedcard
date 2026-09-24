import React from "react";

/**
 * Mihrab archway silhouette with calligraphic Bismillah emblem and hanging fanous lantern
 */
export const BismillahMihrabCrest: React.FC<{
  className?: string;
  size?: number;
  primaryColor?: string;
  goldColor?: string;
}> = ({
  className = "",
  size = 110,
  primaryColor = "#881337",
  goldColor = "#D4AF37",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-md ${className}`}
  >
    <defs>
      <linearGradient id="t20GoldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="45%" stopColor={goldColor} />
        <stop offset="100%" stopColor="#92400E" />
      </linearGradient>
      <linearGradient id="t20MaroonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BE123C" />
        <stop offset="50%" stopColor={primaryColor} />
        <stop offset="100%" stopColor="#4C0519" />
      </linearGradient>
    </defs>

    {/* Radiant circular halo */}
    <circle
      cx="80"
      cy="80"
      r="74"
      stroke="url(#t20GoldGlow)"
      strokeWidth="1.5"
      strokeDasharray="4 3"
      opacity="0.85"
    />
    <circle
      cx="80"
      cy="80"
      r="70"
      stroke="url(#t20MaroonGlow)"
      strokeWidth="1"
      opacity="0.6"
    />

    {/* Gold stars along circumference */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <circle
        key={deg}
        cx={80 + 74 * Math.cos((deg * Math.PI) / 180)}
        cy={80 + 74 * Math.sin((deg * Math.PI) / 180)}
        r="2"
        fill="url(#t20GoldGlow)"
      />
    ))}

    {/* Islamic Mihrab Archway Silhouette */}
    <path
      d="M44 126 L44 76 C44 54, 80 40, 80 40 C80 40, 116 54, 116 76 L116 126 Z"
      fill="url(#t20MaroonGlow)"
      stroke="url(#t20GoldGlow)"
      strokeWidth="2"
    />

    {/* Inner cusped scalloped archway */}
    <path
      d="M52 126 L52 82 C52 66, 80 52, 80 52 C80 52, 108 66, 108 82 L108 126 Z"
      fill="#FFF1F2"
      stroke="url(#t20GoldGlow)"
      strokeWidth="1.5"
    />

    {/* Hanging Fanous / Moroccan Lantern in Arch */}
    <line
      x1="80"
      y1="52"
      x2="80"
      y2="66"
      stroke="url(#t20GoldGlow)"
      strokeWidth="1.5"
    />
    <path
      d="M74 66 L86 66 L83 76 L77 76 Z"
      fill="url(#t20GoldGlow)"
    />
    <path
      d="M76 76 L84 76 L80 84 Z"
      fill="url(#t20GoldGlow)"
    />
    <circle cx="80" cy="85" r="1.5" fill="url(#t20GoldGlow)" />

    {/* Calligraphic Bismillah / Crescent & Star motif inside Mihrab */}
    {/* Crescent Moon */}
    <path
      d="M86 98 A12 12 0 1 1 76 87 A9 9 0 0 0 86 98 Z"
      fill="url(#t20GoldGlow)"
    />
    {/* Star inside crescent */}
    <polygon
      points="85,91 86.5,95 91,95 87.5,97.5 89,102 85,99 81,102 82.5,97.5 79,95 83.5,95"
      fill="url(#t20GoldGlow)"
      transform="scale(0.8) translate(22, 16)"
    />

    {/* Base step decoration */}
    <line
      x1="38"
      y1="126"
      x2="122"
      y2="126"
      stroke="url(#t20GoldGlow)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Arabesque damask filigree corner ornament
 */
export const ArabesqueDamaskCorner: React.FC<{
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
  goldColor?: string;
  maroonColor?: string;
}> = ({
  position = "top-left",
  className = "",
  size = 78,
  goldColor = "#D4AF37",
  maroonColor = "#881337",
}) => {
  const getTransform = () => {
    switch (position) {
      case "top-right":
        return "scale(-1, 1)";
      case "bottom-left":
        return "scale(1, -1)";
      case "bottom-right":
        return "scale(-1, -1)";
      default:
        return "none";
    }
  };

  return (
    <div
      className={`absolute pointer-events-none select-none z-10 ${className}`}
      style={{
        transform: getTransform(),
        top: position.includes("top") ? 0 : "auto",
        bottom: position.includes("bottom") ? 0 : "auto",
        left: position.includes("left") ? 0 : "auto",
        right: position.includes("right") ? 0 : "auto",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="arabesqueGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="60%" stopColor={goldColor} />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>

        {/* Outer framing lines */}
        <path
          d="M 6 94 L 6 20 C 6 12.27 12.27 6 20 6 L 94 6"
          stroke="url(#arabesqueGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 14 94 L 14 26 C 14 19.37 19.37 14 26 14 L 94 14"
          stroke={maroonColor}
          strokeWidth="1.2"
          opacity="0.8"
        />

        {/* Arabesque filigree scroll loops */}
        <path
          d="M 14 42 C 24 38, 38 24, 42 14"
          stroke="url(#arabesqueGold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 14 62 C 34 56, 56 34, 62 14"
          stroke="url(#arabesqueGold)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Small Crescent inside corner */}
        <path
          d="M 28 20 A 7 7 0 1 1 21 13 A 5 5 0 0 0 28 20 Z"
          fill="url(#arabesqueGold)"
        />

        {/* Floral palmette at junction */}
        <path
          d="M 36 36 C 42 32, 46 36, 42 42 C 36 46, 32 42, 36 36 Z"
          fill={maroonColor}
          stroke="url(#arabesqueGold)"
          strokeWidth="1"
        />
        <circle cx="39" cy="39" r="2.5" fill="url(#arabesqueGold)" />

        {/* Finial corner star */}
        <circle cx="20" cy="20" r="2" fill="url(#arabesqueGold)" />
      </svg>
    </div>
  );
};

/**
 * Golden filigree divider with central crescent moon and star touch
 */
export const GoldenCrescentFiligreeDivider: React.FC<{
  className?: string;
  goldColor?: string;
  maroonColor?: string;
}> = ({
  className = "",
  goldColor = "#D4AF37",
  maroonColor = "#881337",
}) => (
  <div className={`w-full flex items-center justify-center my-6 ${className}`}>
    <svg
      width="320"
      height="30"
      viewBox="0 0 320 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="max-w-full drop-shadow-sm"
    >
      <defs>
        <linearGradient id="crescentDividerGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="35%" stopColor={goldColor} />
          <stop offset="50%" stopColor="#FDE68A" />
          <stop offset="65%" stopColor={goldColor} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Hairline flourish line */}
      <line
        x1="15"
        y1="15"
        x2="135"
        y2="15"
        stroke="url(#crescentDividerGold)"
        strokeWidth="1.5"
      />
      <line
        x1="185"
        y1="15"
        x2="305"
        y2="15"
        stroke="url(#crescentDividerGold)"
        strokeWidth="1.5"
      />

      {/* Flanking arabesque curlicues */}
      <path
        d="M 115 15 C 125 10, 130 20, 135 15"
        stroke={goldColor}
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M 205 15 C 195 10, 190 20, 185 15"
        stroke={goldColor}
        strokeWidth="1.2"
        fill="none"
      />

      {/* Flanking gold beads */}
      <circle cx="80" cy="15" r="2" fill={goldColor} />
      <circle cx="240" cy="15" r="2" fill={goldColor} />

      {/* Center Crescent Moon & Star */}
      <g transform="translate(160, 15)">
        {/* Crescent */}
        <path
          d="M 5 -10 A 10 10 0 1 1 -5 5 A 8 8 0 0 0 5 -10 Z"
          fill={goldColor}
        />
        {/* Star */}
        <polygon
          points="5,-2 6.5,2 11,2 7.5,4.5 9,9 5,6 1,9 2.5,4.5 -1,2 3.5,2"
          fill={goldColor}
          transform="scale(0.6) translate(3, -4)"
        />
        {/* Delicate maroon center pip */}
        <circle cx="-1" cy="-1" r="1.5" fill={maroonColor} />
      </g>
    </svg>
  </div>
);
