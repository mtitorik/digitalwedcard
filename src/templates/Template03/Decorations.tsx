import React from "react";

interface SvgProps {
  className?: string;
  color?: string;
  goldColor?: string;
}

/**
 * Traditional Indian/South Asian Wedding Mandap / Pavilion Archway
 */
export const MandapArch: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  color = "#831843",
  goldColor = "#EAB308",
}) => (
  <svg
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer decorative dome outline */}
    <path
      d="M30 150 V90 C30 50 65 20 100 12 C135 20 170 50 170 90 V150"
      stroke={goldColor}
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.9"
    />
    {/* Inner cusped scalloped archway */}
    <path
      d="M45 150 V95 C45 70 65 40 100 28 C135 40 155 70 155 95 V150"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="4 3"
      opacity="0.8"
    />

    {/* Center Finial / Kalash spire at peak */}
    <circle cx="100" cy="12" r="3.5" fill={goldColor} />
    <path d="M100 3 V12" stroke={goldColor} strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="100" cy="2" r="1.8" fill={color} />

    {/* Hanging floral toran swags */}
    <path
      d="M48 95 Q74 110 100 95 Q126 110 152 95"
      stroke={goldColor}
      strokeWidth="1.2"
      fill="none"
    />
    <circle cx="74" cy="103" r="2" fill={color} />
    <circle cx="100" cy="95" r="2.5" fill={goldColor} />
    <circle cx="126" cy="103" r="2" fill={color} />

    {/* Left and Right Arch Pillars */}
    <rect x="26" y="90" width="8" height="60" rx="2" fill={goldColor} opacity="0.25" />
    <rect x="166" y="90" width="8" height="60" rx="2" fill={goldColor} opacity="0.25" />
    <line x1="24" y1="150" x2="36" y2="150" stroke={goldColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="164" y1="150" x2="176" y2="150" stroke={goldColor} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/**
 * Floral Trellis Jaali Corner Border
 */
export const FloralTrellisCorner: React.FC<SvgProps> = ({
  className = "w-24 h-24",
  color = "#831843",
  goldColor = "#EAB308",
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer border lines */}
    <path
      d="M4 4 H65 M4 4 V65"
      stroke={goldColor}
      strokeWidth="1.8"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M10 10 H50 M10 10 V50"
      stroke={color}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Trellis diagonal diamond grid */}
    <path
      d="M16 4 L4 16 M28 4 L4 28 M40 4 L4 40 M52 4 L4 52"
      stroke={goldColor}
      strokeWidth="0.8"
      opacity="0.4"
    />

    {/* Corner Floral Rosette */}
    <circle cx="28" cy="28" r="8" fill={color} fillOpacity="0.15" stroke={goldColor} strokeWidth="1" />
    <circle cx="28" cy="28" r="3" fill={goldColor} />
    <circle cx="28" cy="20" r="1.5" fill={color} />
    <circle cx="28" cy="36" r="1.5" fill={color} />
    <circle cx="20" cy="28" r="1.5" fill={color} />
    <circle cx="36" cy="28" r="1.5" fill={color} />
  </svg>
);

/**
 * Burgundy & Gold Horizontal Flourish Divider
 */
export const BurgundyFlourishDivider: React.FC<SvgProps> = ({
  className = "w-48 h-6",
  color = "#831843",
  goldColor = "#EAB308",
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
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.75"
    />
    {/* Center paisley swirl loop */}
    <path
      d="M95 15 C105 8 112 22 120 15 C128 8 135 22 145 15"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="120" cy="15" r="3" fill={goldColor} />
    <circle cx="88" cy="15" r="2" fill={goldColor} opacity="0.7" />
    <circle cx="152" cy="15" r="2" fill={goldColor} opacity="0.7" />
  </svg>
);
