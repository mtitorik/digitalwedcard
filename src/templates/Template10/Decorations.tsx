import React from "react";

interface SvgProps {
  className?: string;
  color?: string;
  saffronColor?: string;
}

/**
 * Modern Geometric Archway & Monogram Crest
 */
export const GeometricCurveCrest: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  color = "#6D28D9",
  saffronColor = "#FBBF24",
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Modern continuous arch shape */}
    <path
      d="M35 160 V85 C35 45 64 18 100 18 C136 18 165 45 165 85 V160"
      stroke={saffronColor}
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M45 160 V88 C45 54 70 30 100 30 C130 30 155 54 155 88 V160"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="4 3"
      opacity="0.6"
    />

    {/* Center subtle monogram circle */}
    <circle
      cx="100"
      cy="100"
      r="44"
      stroke={saffronColor}
      strokeWidth="1.2"
      opacity="0.75"
    />

    {/* Top starburst sparkle */}
    <path
      d="M100 8 V28 M90 18 H110"
      stroke={saffronColor}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="100" cy="18" r="2" fill={color} />

    {/* Arch base dots */}
    <circle cx="35" cy="160" r="3" fill={saffronColor} />
    <circle cx="165" cy="160" r="3" fill={saffronColor} />
    <circle cx="45" cy="160" r="2" fill={color} />
    <circle cx="155" cy="160" r="2" fill={color} />
  </svg>
);

/**
 * Golden Fairy Lights & Garland Corner
 */
export const FairyLightsCorner: React.FC<SvgProps> = ({
  className = "w-20 h-20",
  color = "#6D28D9",
  saffronColor = "#FBBF24",
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Corner wire curves */}
    <path
      d="M4 25 Q35 30 45 4 Q65 35 96 15"
      stroke={saffronColor}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M4 55 Q25 45 15 95"
      stroke={saffronColor}
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />

    {/* Glowing fairy light bulbs */}
    <circle cx="20" cy="28" r="3" fill={saffronColor} />
    <circle cx="20" cy="28" r="5" fill={saffronColor} opacity="0.25" />
    <circle cx="45" cy="12" r="2.8" fill={saffronColor} />
    <circle cx="45" cy="12" r="4.5" fill={saffronColor} opacity="0.25" />
    <circle cx="68" cy="28" r="3" fill={saffronColor} />
    <circle cx="68" cy="28" r="5" fill={saffronColor} opacity="0.25" />
    <circle cx="20" cy="52" r="2.5" fill={saffronColor} />
    <circle cx="20" cy="52" r="4" fill={saffronColor} opacity="0.25" />

    {/* Celebratory confetti sparks */}
    <rect x="36" y="38" width="4" height="4" transform="rotate(45 36 38)" fill={color} opacity="0.7" />
    <rect x="58" y="48" width="3" height="3" transform="rotate(20 58 48)" fill={saffronColor} opacity="0.8" />
    <circle cx="10" cy="75" r="1.5" fill={color} />
  </svg>
);

/**
 * Saffron Wave Horizontal Divider
 */
export const SaffronWaveDivider: React.FC<SvgProps> = ({
  className = "w-48 h-6",
  color = "#6D28D9",
  saffronColor = "#FBBF24",
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
      stroke={saffronColor}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Flowing modern geometric wave in center */}
    <path
      d="M95 15 Q107 6 120 15 Q133 24 145 15"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="120" cy="15" r="3" fill={saffronColor} />
    <circle cx="95" cy="15" r="1.8" fill={saffronColor} opacity="0.75" />
    <circle cx="145" cy="15" r="1.8" fill={saffronColor} opacity="0.75" />
  </svg>
);
