import React from "react";

interface SvgProps {
  className?: string;
  color?: string;
  goldColor?: string;
}

/**
 * Modern Geometric Diamond & Octagonal Gold Frame
 */
export const GeometricGoldFrame: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  color = "#1E3A8A",
  goldColor = "#F59E0B",
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer gold diamond */}
    <rect
      x="100"
      y="18"
      width="116"
      height="116"
      transform="rotate(45 100 18)"
      stroke={goldColor}
      strokeWidth="1.5"
      opacity="0.85"
    />
    {/* Inner sapphire square */}
    <rect
      x="36"
      y="36"
      width="128"
      height="128"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="4 3"
      opacity="0.6"
    />

    {/* Concentric thin circle */}
    <circle
      cx="100"
      cy="100"
      r="72"
      stroke={goldColor}
      strokeWidth="0.8"
      opacity="0.5"
    />

    {/* 4 Corner Gold Diamond Accent Studs */}
    <rect x="97" y="15" width="6" height="6" transform="rotate(45 97 15)" fill={goldColor} />
    <rect x="97" y="179" width="6" height="6" transform="rotate(45 97 179)" fill={goldColor} />
    <rect x="15" y="97" width="6" height="6" transform="rotate(45 15 97)" fill={goldColor} />
    <rect x="179" y="97" width="6" height="6" transform="rotate(45 179 97)" fill={goldColor} />

    {/* Subtle Starburst sparkles at diagonals */}
    <circle cx="48" cy="48" r="2" fill={goldColor} opacity="0.8" />
    <circle cx="152" cy="48" r="2" fill={goldColor} opacity="0.8" />
    <circle cx="48" cy="152" r="2" fill={goldColor} opacity="0.8" />
    <circle cx="152" cy="152" r="2" fill={goldColor} opacity="0.8" />
  </svg>
);

/**
 * Constellation Starburst Corner Ornament
 */
export const StarburstCorner: React.FC<SvgProps> = ({
  className = "w-20 h-20",
  color = "#1E3A8A",
  goldColor = "#F59E0B",
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Geometric right-angle borders */}
    <path
      d="M6 6 H50 M6 6 V50"
      stroke={goldColor}
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M12 12 H36 M12 12 V36"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Starburst rays */}
    <path
      d="M32 32 L46 32 M32 32 L18 32 M32 32 L32 46 M32 32 L32 18"
      stroke={goldColor}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <path
      d="M32 32 L42 42 M32 32 L22 22 M32 32 L22 42 M32 32 L42 22"
      stroke={goldColor}
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.7"
    />
    <circle cx="32" cy="32" r="2" fill={goldColor} />

    {/* Sparkle micro-dots */}
    <circle cx="56" cy="16" r="1.5" fill={goldColor} opacity="0.7" />
    <circle cx="16" cy="56" r="1.5" fill={goldColor} opacity="0.7" />
  </svg>
);

/**
 * Sapphire & Gold Horizontal Starburst Divider
 */
export const SapphireFlourishDivider: React.FC<SvgProps> = ({
  className = "w-48 h-6",
  color = "#1E3A8A",
  goldColor = "#F59E0B",
}) => (
  <svg
    viewBox="0 0 240 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 15 H90 M150 15 H230"
      stroke={goldColor}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Center 8-point gold starburst */}
    <path
      d="M120 7 V23 M112 15 H128"
      stroke={goldColor}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M114 9 L126 21 M114 21 L126 9"
      stroke={goldColor}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.8"
    />
    <circle cx="120" cy="15" r="2" fill={color} />

    {/* Flanking accent beads */}
    <circle cx="95" cy="15" r="2" fill={goldColor} opacity="0.8" />
    <circle cx="145" cy="15" r="2" fill={goldColor} opacity="0.8" />
  </svg>
);
