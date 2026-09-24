import React from "react";

/**
 * Royal palanquin (doli) crest symbolizing traditional Punjabi wedding send-off
 */
export const RoyalPalanquinDoliCrest: React.FC<{
  className?: string;
  size?: number;
  primaryColor?: string;
  goldColor?: string;
}> = ({
  className = "",
  size = 110,
  primaryColor = "#BE185D",
  goldColor = "#F59E0B",
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
      <linearGradient id="t19GoldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="50%" stopColor={goldColor} />
        <stop offset="100%" stopColor="#B45309" />
      </linearGradient>
      <linearGradient id="t19PinkGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="50%" stopColor={primaryColor} />
        <stop offset="100%" stopColor="#831843" />
      </linearGradient>
    </defs>

    {/* Radiant decorative ring */}
    <circle
      cx="80"
      cy="80"
      r="74"
      stroke="url(#t19GoldGlow)"
      strokeWidth="1.5"
      strokeDasharray="4 3"
      opacity="0.85"
    />
    <circle
      cx="80"
      cy="80"
      r="70"
      stroke="url(#t19PinkGlow)"
      strokeWidth="1"
      opacity="0.6"
    />

    {/* Floral beads around outer border */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
      <circle
        key={deg}
        cx={80 + 74 * Math.cos((deg * Math.PI) / 180)}
        cy={80 + 74 * Math.sin((deg * Math.PI) / 180)}
        r="2"
        fill="url(#t19GoldGlow)"
      />
    ))}

    {/* Palanquin carrying poles (horizontal) */}
    <line
      x1="18"
      y1="96"
      x2="142"
      y2="96"
      stroke="url(#t19GoldGlow)"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Pole end finials */}
    <circle cx="18" cy="96" r="3.5" fill="url(#t19GoldGlow)" />
    <circle cx="142" cy="96" r="3.5" fill="url(#t19GoldGlow)" />

    {/* Palanquin Top Dome (Curved Chhatri) */}
    <path
      d="M48 76 C48 50, 80 42, 80 42 C80 42, 112 50, 112 76 Z"
      fill="url(#t19PinkGlow)"
      stroke="url(#t19GoldGlow)"
      strokeWidth="2"
    />
    {/* Dome Kalash / Spire Finial */}
    <path
      d="M77 42 C77 36, 80 30, 80 30 C80 30, 83 36, 83 42 Z"
      fill="url(#t19GoldGlow)"
    />
    <circle cx="80" cy="28" r="2.5" fill="url(#t19GoldGlow)" />

    {/* Dome scalloped arch detail */}
    <path
      d="M52 74 C60 68, 70 72, 80 68 C90 72, 100 68, 108 74"
      stroke="url(#t19GoldGlow)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />

    {/* Palanquin Body / Cabin */}
    <rect
      x="50"
      y="76"
      width="60"
      height="32"
      rx="3"
      fill="url(#t19PinkGlow)"
      stroke="url(#t19GoldGlow)"
      strokeWidth="2"
    />

    {/* Jaali Window cutout in Doli */}
    <rect
      x="64"
      y="82"
      width="32"
      height="20"
      rx="3"
      fill="#FDF2F8"
      stroke="url(#t19GoldGlow)"
      strokeWidth="1.5"
    />
    {/* Window arched top */}
    <path
      d="M64 88 C72 82, 88 82, 96 88"
      stroke={primaryColor}
      strokeWidth="1"
      fill="none"
    />
    {/* Curtains draped inside window */}
    <path
      d="M66 84 Q72 90 70 98"
      stroke={primaryColor}
      strokeWidth="1.2"
      fill="none"
    />
    <path
      d="M94 84 Q88 90 90 98"
      stroke={primaryColor}
      strokeWidth="1.2"
      fill="none"
    />

    {/* Palanquin lower decorative valance / tassels */}
    <path
      d="M52 108 C56 114, 62 114, 66 108 C70 114, 76 114, 80 108 C84 114, 90 114, 94 108 C98 114, 104 114, 108 108"
      stroke="url(#t19GoldGlow)"
      strokeWidth="1.5"
      fill="none"
    />
    {[59, 73, 87, 101].map((cx) => (
      <circle key={cx} cx={cx} cy="113" r="1.5" fill="url(#t19GoldGlow)" />
    ))}

    {/* Delicate base feet */}
    <rect x="54" y="108" width="5" height="6" rx="1" fill="url(#t19GoldGlow)" />
    <rect x="101" y="108" width="5" height="6" rx="1" fill="url(#t19GoldGlow)" />
  </svg>
);

/**
 * Traditional Jaali latticework corner ornament
 */
export const JaaliLatticeCornerBorder: React.FC<{
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
  goldColor?: string;
  pinkColor?: string;
}> = ({
  position = "top-left",
  className = "",
  size = 76,
  goldColor = "#F59E0B",
  pinkColor = "#BE185D",
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
          <linearGradient id="jaaliGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="60%" stopColor={goldColor} />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Outer framing lines */}
        <path
          d="M 6 94 L 6 18 C 6 11.37 11.37 6 18 6 L 94 6"
          stroke="url(#jaaliGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 14 94 L 14 24 C 14 18.48 18.48 14 24 14 L 94 14"
          stroke={pinkColor}
          strokeWidth="1.2"
          opacity="0.8"
        />

        {/* Interlocking Jaali Diamond Mesh in Corner */}
        <path
          d="M 18 36 L 36 18 M 18 54 L 54 18 M 18 72 L 72 18 M 36 72 L 72 36"
          stroke="url(#jaaliGold)"
          strokeWidth="1"
          opacity="0.75"
        />
        <path
          d="M 36 18 L 18 36 M 54 18 L 18 54 M 72 18 L 18 72 M 72 36 L 36 72"
          stroke="url(#jaaliGold)"
          strokeWidth="1"
          opacity="0.75"
        />

        {/* Rosette motif at junction */}
        <circle cx="36" cy="36" r="4.5" fill="url(#jaaliGold)" />
        <circle cx="36" cy="36" r="2.5" fill={pinkColor} />

        {/* Delicate floral scroll corner tip */}
        <path
          d="M 8 8 C 18 16 16 18 24 24"
          stroke="url(#jaaliGold)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="2.5" fill="url(#jaaliGold)" />
      </svg>
    </div>
  );
};

/**
 * Pink rose garland swag divider with gold beads
 */
export const PinkRoseGarlandDivider: React.FC<{
  className?: string;
  pinkColor?: string;
  goldColor?: string;
}> = ({
  className = "",
  pinkColor = "#BE185D",
  goldColor = "#F59E0B",
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
        <linearGradient id="roseSwagGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="30%" stopColor={goldColor} />
          <stop offset="50%" stopColor="#FDE68A" />
          <stop offset="70%" stopColor={goldColor} />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>

      {/* Swaying vine garland */}
      <path
        d="M 10 15 Q 80 25 150 15 T 310 15"
        stroke="url(#roseSwagGold)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Hanging gold droplets / pearls */}
      {[50, 90, 130, 190, 230, 270].map((cx) => (
        <g key={cx}>
          <line
            x1={cx}
            y1="17"
            x2={cx}
            y2="23"
            stroke={goldColor}
            strokeWidth="1"
            opacity="0.8"
          />
          <circle cx={cx} cy="24" r="2" fill={goldColor} />
        </g>
      ))}

      {/* Center Blooming Rose */}
      <g transform="translate(160, 15)">
        {/* Outer rose petals */}
        <circle cx="0" cy="0" r="10" fill={pinkColor} opacity="0.9" />
        <path
          d="M -7 -2 C -5 -8, 5 -8, 7 -2 C 8 5, -8 5, -7 -2 Z"
          fill="#DB2777"
        />
        <path
          d="M -4 2 C -3 6, 3 6, 4 2 C 5 -3, -5 -3, -4 2 Z"
          fill="#F472B6"
        />
        <circle cx="0" cy="0" r="3.5" fill="#FDF2F8" />
        <circle cx="0" cy="0" r="2" fill={goldColor} />

        {/* Flanking leaf sprays */}
        <path
          d="M -11 0 C -16 -4, -18 3, -12 4 Z"
          fill="#15803D"
          opacity="0.85"
        />
        <path
          d="M 11 0 C 16 -4, 18 3, 12 4 Z"
          fill="#15803D"
          opacity="0.85"
        />
      </g>

      {/* Flanking small roses */}
      {[-80, 80].map((offset) => (
        <g key={offset} transform={`translate(${160 + offset}, 15)`}>
          <circle cx="0" cy="0" r="6" fill={pinkColor} opacity="0.85" />
          <circle cx="0" cy="0" r="3" fill="#F472B6" />
          <circle cx="0" cy="0" r="1.5" fill={goldColor} />
        </g>
      ))}
    </svg>
  </div>
);
