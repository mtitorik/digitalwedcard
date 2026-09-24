import React from "react";

interface SvgProps {
  className?: string;
  color?: string;
  marigoldColor?: string;
}

/**
 * Traditional Rangoli & Marigold Floral Medallion
 */
export const RangoliMarigoldMedallion: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  color = "#7E22CE",
  marigoldColor = "#EAB308",
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric marigold petal ring */}
    <circle
      cx="100"
      cy="100"
      r="82"
      stroke={marigoldColor}
      strokeWidth="1.5"
      strokeDasharray="4 3"
      opacity="0.85"
    />
    <circle
      cx="100"
      cy="100"
      r="76"
      stroke={color}
      strokeWidth="1.2"
      opacity="0.6"
    />

    {/* 8-fold radial Rangoli petals */}
    <g transform="translate(100, 100)">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          {/* Marigold outer blossom petal */}
          <path
            d="M0 -76 C8 -58 8 -42 0 -34 C-8 -42 -8 -58 0 -76 Z"
            fill={marigoldColor}
            opacity="0.8"
          />
          {/* Amethyst purple inner droplet */}
          <circle cx="0" cy="-55" r="2.8" fill={color} />
          {/* Small gold sparkle stud */}
          <circle cx="0" cy="-76" r="2" fill={marigoldColor} />
        </g>
      ))}

      {/* Center auspicious core */}
      <circle cx="0" cy="0" r="24" fill={color} />
      <circle cx="0" cy="0" r="19" stroke={marigoldColor} strokeWidth="1.5" />
      <circle cx="0" cy="0" r="6" fill={marigoldColor} />
    </g>
  </svg>
);

/**
 * Traditional Hanging Toran Garland Corner Border
 */
export const ToranCornerBorder: React.FC<SvgProps> = ({
  className = "w-20 h-20",
  color = "#7E22CE",
  marigoldColor = "#EAB308",
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Corner geometric border lines */}
    <path
      d="M4 4 H55 M4 4 V55"
      stroke={marigoldColor}
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M8 8 H40 M8 8 V40"
      stroke={color}
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />

    {/* Hanging marigold toran curves */}
    <path
      d="M12 4 Q20 18 28 4 Q36 18 44 4 Q52 18 60 4"
      stroke={marigoldColor}
      strokeWidth="1.2"
      fill="none"
    />
    <circle cx="20" cy="14" r="2.5" fill={color} />
    <circle cx="36" cy="14" r="2.5" fill={color} />
    <circle cx="52" cy="14" r="2.5" fill={color} />

    {/* Hanging marigold blossom drop in corner */}
    <path
      d="M18 18 C18 18 36 30 32 46"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
    />
    <circle cx="32" cy="46" r="4" fill={marigoldColor} />
    <circle cx="32" cy="46" r="2" fill={color} />
  </svg>
);

/**
 * Marigold & Auspicious Arch Horizontal Divider
 */
export const MarigoldArchDivider: React.FC<SvgProps> = ({
  className = "w-48 h-6",
  color = "#7E22CE",
  marigoldColor = "#EAB308",
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
      stroke={marigoldColor}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Center marigold blossom rosette */}
    <circle cx="120" cy="15" r="6" fill={marigoldColor} opacity="0.25" stroke={marigoldColor} strokeWidth="1.2" />
    <circle cx="120" cy="15" r="3.5" fill={color} />
    <circle cx="120" cy="15" r="1.5" fill={marigoldColor} />

    {/* Arch swags flanking center */}
    <path
      d="M106 15 Q112 8 116 15"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M124 15 Q128 8 134 15"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="92" cy="15" r="2" fill={marigoldColor} opacity="0.8" />
    <circle cx="148" cy="15" r="2" fill={marigoldColor} opacity="0.8" />
  </svg>
);
