import React from "react";

interface SvgProps {
  className?: string;
  color?: string;
  goldColor?: string;
}

/**
 * Modern Diamond Geometric & Floral Monogram Crest
 */
export const ModernDiamondCrest: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  color = "#E11D48",
  goldColor = "#CA8A04",
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric diamond frame */}
    <rect
      x="100"
      y="24"
      width="108"
      height="108"
      transform="rotate(45 100 24)"
      stroke={goldColor}
      strokeWidth="1.5"
      opacity="0.85"
    />
    <rect
      x="100"
      y="30"
      width="100"
      height="100"
      transform="rotate(45 100 30)"
      stroke={color}
      strokeWidth="0.8"
      strokeDasharray="4 3"
      opacity="0.6"
    />

    {/* Center thin circle */}
    <circle
      cx="100"
      cy="100"
      r="68"
      stroke={goldColor}
      strokeWidth="0.8"
      opacity="0.5"
    />

    {/* Floral bouquet touches at cardinal corners */}
    <circle cx="100" cy="24" r="3.5" fill={color} />
    <circle cx="100" cy="176" r="3.5" fill={color} />
    <circle cx="24" cy="100" r="3.5" fill={color} />
    <circle cx="176" cy="100" r="3.5" fill={color} />

    {/* Gold studs */}
    <circle cx="94" cy="28" r="1.8" fill={goldColor} />
    <circle cx="106" cy="28" r="1.8" fill={goldColor} />
    <circle cx="94" cy="172" r="1.8" fill={goldColor} />
    <circle cx="106" cy="172" r="1.8" fill={goldColor} />
  </svg>
);

/**
 * Corner Floral Bouquet
 */
export const BouquetCorner: React.FC<SvgProps> = ({
  className = "w-20 h-20",
  color = "#E11D48",
  goldColor = "#CA8A04",
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Corner L-frame */}
    <path
      d="M5 5 H50 M5 5 V50"
      stroke={goldColor}
      strokeWidth="1.4"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M9 9 H35 M9 9 V35"
      stroke={color}
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />

    {/* Floral Bouquet Petals */}
    <circle cx="25" cy="25" r="6" fill={color} opacity="0.25" stroke={color} strokeWidth="1" />
    <circle cx="25" cy="25" r="3" fill={color} />
    <circle cx="25" cy="25" r="1.2" fill={goldColor} />

    {/* Bud 1 */}
    <ellipse cx="36" cy="18" rx="3.5" ry="2" transform="rotate(25 36 18)" fill={color} opacity="0.75" />
    {/* Bud 2 */}
    <ellipse cx="18" cy="36" rx="3.5" ry="2" transform="rotate(-65 18 36)" fill={color} opacity="0.75" />

    {/* Gold beads */}
    <circle cx="42" cy="28" r="2" fill={goldColor} />
    <circle cx="28" cy="42" r="2" fill={goldColor} />
  </svg>
);

/**
 * Antique Gold & Crimson Horizontal Divider
 */
export const AntiqueGoldDivider: React.FC<SvgProps> = ({
  className = "w-48 h-6",
  color = "#E11D48",
  goldColor = "#CA8A04",
}) => (
  <svg
    viewBox="0 0 240 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 15 H85 M155 15 H230"
      stroke={goldColor}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.75"
    />
    {/* Center geometric diamond */}
    <rect
      x="116"
      y="11"
      width="8"
      height="8"
      transform="rotate(45 120 15)"
      fill={color}
    />
    <circle cx="120" cy="15" r="1.8" fill={goldColor} />

    {/* Side flourishes */}
    <path
      d="M104 15 C108 11 112 19 116 15"
      stroke={goldColor}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M124 15 C128 11 132 19 136 15"
      stroke={goldColor}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="92" cy="15" r="2" fill={goldColor} opacity="0.75" />
    <circle cx="148" cy="15" r="2" fill={goldColor} opacity="0.75" />
  </svg>
);
