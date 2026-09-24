import React from "react";

interface SvgProps {
  className?: string;
  color?: string;
  goldColor?: string;
}

/**
 * Royal Traditional Mandala Medallion
 */
export const RoyalMandala: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  color = "#991B1B",
  goldColor = "#D97706",
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric radial rings */}
    <circle
      cx="100"
      cy="100"
      r="92"
      stroke={goldColor}
      strokeWidth="1.2"
      strokeDasharray="4 3"
      opacity="0.85"
    />
    <circle
      cx="100"
      cy="100"
      r="86"
      stroke={color}
      strokeWidth="1.5"
      opacity="0.7"
    />
    <circle
      cx="100"
      cy="100"
      r="72"
      stroke={goldColor}
      strokeWidth="1"
      opacity="0.6"
    />

    {/* 8-Petal Mandala Star */}
    <g transform="translate(100, 100)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          {/* Outer pointed petal */}
          <path
            d="M0 -86 C12 -65 12 -45 0 -35 C-12 -45 -12 -65 0 -86 Z"
            fill={goldColor}
            opacity="0.8"
          />
          {/* Inner crimson drop */}
          <circle cx="0" cy="-60" r="3" fill={color} />
          {/* Inner teardrop ornament */}
          <path
            d="M0 -34 C6 -24 6 -15 0 -8 C-6 -15 -6 -24 0 -34 Z"
            fill={color}
            opacity="0.9"
          />
        </g>
      ))}

      {/* Center Sacred Core */}
      <circle cx="0" cy="0" r="24" fill={color} />
      <circle cx="0" cy="0" r="20" stroke={goldColor} strokeWidth="1.5" />
      <circle cx="0" cy="0" r="14" fill="#FAF5FF" opacity="0.1" />
      <circle cx="0" cy="0" r="6" fill={goldColor} />
    </g>
  </svg>
);

/**
 * Traditional Paisley Corner Border
 */
export const PaisleyCorner: React.FC<SvgProps> = ({
  className = "w-24 h-24",
  color = "#991B1B",
  goldColor = "#D97706",
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Ornate corner L-frames */}
    <path
      d="M6 6H70M6 6V70"
      stroke={goldColor}
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M12 12H55M12 12V55"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.75"
    />
    <path
      d="M16 16H42M16 16V42"
      stroke={goldColor}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeDasharray="2 2"
      opacity="0.6"
    />

    {/* Classic Paisley (Kalka / Mango) body */}
    <path
      d="M28 28C28 28 58 20 62 46C65 64 45 74 38 72C26 69 22 55 28 44C32 38 42 35 44 42C45 46 40 50 35 48"
      stroke={goldColor}
      strokeWidth="1.6"
      strokeLinecap="round"
      fill={color}
      fillOpacity="0.15"
    />
    {/* Paisley internal filigree flourish */}
    <circle cx="40" cy="54" r="3.5" fill={goldColor} />
    <circle cx="48" cy="46" r="2" fill={color} />
    <circle cx="34" cy="42" r="1.8" fill={goldColor} />

    {/* Gold corner star dot */}
    <circle cx="6" cy="6" r="3" fill={goldColor} />
    <circle cx="70" cy="6" r="2.5" fill={goldColor} />
    <circle cx="6" cy="70" r="2.5" fill={goldColor} />
  </svg>
);

/**
 * Royal Filigree Horizontal Divider
 */
export const RoyalFiligreeDivider: React.FC<SvgProps> = ({
  className = "w-52 h-6",
  color = "#991B1B",
  goldColor = "#D97706",
}) => (
  <svg
    viewBox="0 0 260 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 15H95M165 15H250"
      stroke={goldColor}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.75"
    />
    {/* Decorative swirls around center */}
    <path
      d="M105 15C115 8 120 22 130 15C140 8 145 22 155 15"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Center Diamond Gem */}
    <rect
      x="126"
      y="11"
      width="8"
      height="8"
      transform="rotate(45 130 15)"
      fill={goldColor}
    />
    <circle cx="130" cy="15" r="2" fill={color} />

    {/* Side accents */}
    <circle cx="98" cy="15" r="2.5" fill={goldColor} />
    <circle cx="162" cy="15" r="2.5" fill={goldColor} />
  </svg>
);
