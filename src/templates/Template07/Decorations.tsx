import React from "react";

interface SvgProps {
  className?: string;
  color?: string;
  goldColor?: string;
}

/**
 * Interlocking Wedding Rings Monogram Crest
 */
export const InterlockingRingsCrest: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  color = "#BE185D",
  goldColor = "#FDE047",
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer delicate ring border */}
    <circle
      cx="100"
      cy="100"
      r="84"
      stroke={goldColor}
      strokeWidth="1.2"
      strokeDasharray="4 3"
      opacity="0.8"
    />
    <circle
      cx="100"
      cy="100"
      r="80"
      stroke={color}
      strokeWidth="0.8"
      opacity="0.5"
    />

    {/* Left Wedding Band */}
    <circle
      cx="86"
      cy="100"
      r="28"
      stroke={goldColor}
      strokeWidth="3.5"
      fill="none"
    />
    {/* Solitaire diamond gem on left band */}
    <polygon
      points="86,66 92,72 86,78 80,72"
      fill="#FFFFFF"
      stroke={goldColor}
      strokeWidth="1.2"
    />

    {/* Right Wedding Band interlocking */}
    <circle
      cx="114"
      cy="100"
      r="28"
      stroke={goldColor}
      strokeWidth="3.5"
      fill="none"
    />
    {/* Top diamond facet sparkle */}
    <circle cx="86" cy="72" r="1.5" fill={color} />

    {/* Curving Rose Garland sprigs at bottom */}
    <path
      d="M50 145 Q100 170 150 145"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="100" cy="158" r="4.5" fill={color} />
    <circle cx="82" cy="154" r="3.5" fill={color} opacity="0.8" />
    <circle cx="118" cy="154" r="3.5" fill={color} opacity="0.8" />
    <circle cx="68" cy="148" r="2.5" fill={goldColor} />
    <circle cx="132" cy="148" r="2.5" fill={goldColor} />

    {/* Top sparkle star */}
    <path
      d="M100 32 V44 M94 38 H106"
      stroke={goldColor}
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Blooming English Rose Corner Vine
 */
export const RoseCornerVine: React.FC<SvgProps> = ({
  className = "w-20 h-20",
  color = "#BE185D",
  goldColor = "#FDE047",
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Dual gold pinstripe border */}
    <path
      d="M4 4 H55 M4 4 V55"
      stroke={goldColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M8 8 H40 M8 8 V40"
      stroke={goldColor}
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />

    {/* Rose bloom center */}
    <circle cx="28" cy="28" r="7" fill={color} opacity="0.2" stroke={color} strokeWidth="1.2" />
    <circle cx="28" cy="28" r="4" fill={color} />
    <circle cx="28" cy="28" r="1.8" fill={goldColor} />

    {/* Curving leafy vine */}
    <path
      d="M10 80 C15 50 35 30 75 12"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      opacity="0.75"
    />
    {/* Rosebuds & leaf petals */}
    <ellipse cx="20" cy="58" rx="4" ry="2.5" transform="rotate(-30 20 58)" fill={color} opacity="0.7" />
    <ellipse cx="48" cy="24" rx="4" ry="2.5" transform="rotate(30 48 24)" fill={color} opacity="0.7" />
    <circle cx="34" cy="46" r="2" fill={goldColor} />
    <circle cx="62" cy="18" r="2" fill={goldColor} />
  </svg>
);

/**
 * Blush Rose Horizontal Divider
 */
export const BlushRoseDivider: React.FC<SvgProps> = ({
  className = "w-48 h-6",
  color = "#BE185D",
  goldColor = "#FDE047",
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
      opacity="0.8"
    />
    {/* Center rose flower petals */}
    <circle cx="120" cy="15" r="5" fill={color} opacity="0.25" stroke={color} strokeWidth="1.2" />
    <circle cx="120" cy="15" r="2.8" fill={color} />
    <circle cx="120" cy="15" r="1.2" fill={goldColor} />

    {/* Petal side wings */}
    <path
      d="M110 15 Q104 10 102 15 Q104 20 110 15 Z"
      fill={color}
      opacity="0.8"
    />
    <path
      d="M130 15 Q136 10 138 15 Q136 20 130 15 Z"
      fill={color}
      opacity="0.8"
    />
    <circle cx="92" cy="15" r="2" fill={goldColor} opacity="0.8" />
    <circle cx="148" cy="15" r="2" fill={goldColor} opacity="0.8" />
  </svg>
);
