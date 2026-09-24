import React from "react";

interface SvgProps {
  className?: string;
  color?: string;
  goldColor?: string;
}

/**
 * Hydrangea & Cornflower Botanical Floral Wreath
 */
export const HydrangeaWreath: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  color = "#0284C7",
  goldColor = "#D4AF37",
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Dual delicate gold circular boundaries */}
    <circle
      cx="100"
      cy="100"
      r="78"
      stroke={goldColor}
      strokeWidth="1.2"
      strokeDasharray="5 4"
      opacity="0.85"
    />
    <circle
      cx="100"
      cy="100"
      r="72"
      stroke={goldColor}
      strokeWidth="0.8"
      opacity="0.5"
    />

    {/* Hydrangea 4-Petal Cluster Left */}
    <g transform="translate(30, 90)">
      <circle cx="0" cy="-6" r="4" fill={color} opacity="0.8" />
      <circle cx="6" cy="0" r="4" fill={color} opacity="0.8" />
      <circle cx="0" cy="6" r="4" fill={color} opacity="0.8" />
      <circle cx="-6" cy="0" r="4" fill={color} opacity="0.8" />
      <circle cx="0" cy="0" r="2" fill={goldColor} />
    </g>

    {/* Hydrangea 4-Petal Cluster Right */}
    <g transform="translate(170, 90)">
      <circle cx="0" cy="-6" r="4" fill={color} opacity="0.8" />
      <circle cx="6" cy="0" r="4" fill={color} opacity="0.8" />
      <circle cx="0" cy="6" r="4" fill={color} opacity="0.8" />
      <circle cx="-6" cy="0" r="4" fill={color} opacity="0.8" />
      <circle cx="0" cy="0" r="2" fill={goldColor} />
    </g>

    {/* Cornflower Petals Top */}
    <g transform="translate(100, 24)">
      <circle cx="0" cy="-5" r="3.5" fill={color} opacity="0.85" />
      <circle cx="5" cy="0" r="3.5" fill={color} opacity="0.85" />
      <circle cx="0" cy="5" r="3.5" fill={color} opacity="0.85" />
      <circle cx="-5" cy="0" r="3.5" fill={color} opacity="0.85" />
      <circle cx="0" cy="0" r="2" fill={goldColor} />
    </g>

    {/* Cornflower Petals Bottom */}
    <g transform="translate(100, 176)">
      <circle cx="0" cy="-5" r="3.5" fill={color} opacity="0.85" />
      <circle cx="5" cy="0" r="3.5" fill={color} opacity="0.85" />
      <circle cx="0" cy="5" r="3.5" fill={color} opacity="0.85" />
      <circle cx="-5" cy="0" r="3.5" fill={color} opacity="0.85" />
      <circle cx="0" cy="0" r="2" fill={goldColor} />
    </g>

    {/* Curving leafy twigs */}
    <path
      d="M38 60 C50 35 75 25 100 24"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M162 60 C150 35 125 25 100 24"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M38 140 C50 165 75 175 100 176"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M162 140 C150 165 125 175 100 176"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />

    {/* Gold accent beads */}
    <circle cx="60" cy="40" r="2" fill={goldColor} />
    <circle cx="140" cy="40" r="2" fill={goldColor} />
    <circle cx="60" cy="160" r="2" fill={goldColor} />
    <circle cx="140" cy="160" r="2" fill={goldColor} />
  </svg>
);

/**
 * Lace Filigree Corner Border
 */
export const LaceFiligreeCorner: React.FC<SvgProps> = ({
  className = "w-20 h-20",
  color = "#0284C7",
  goldColor = "#D4AF37",
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
      d="M4 4 H55 M4 4 V55"
      stroke={goldColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.8"
    />
    <path
      d="M8 8 H40 M8 8 V40"
      stroke={color}
      strokeWidth="0.8"
      strokeLinecap="round"
      strokeDasharray="2 2"
      opacity="0.5"
    />

    {/* Scalloped lace arches */}
    <path
      d="M12 4 Q16 10 20 4 Q24 10 28 4 Q32 10 36 4 Q40 10 44 4 Q48 10 52 4"
      stroke={goldColor}
      strokeWidth="0.8"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M4 12 Q10 16 4 20 Q10 24 4 28 Q10 32 4 36 Q10 40 4 44 Q10 48 4 52"
      stroke={goldColor}
      strokeWidth="0.8"
      fill="none"
      opacity="0.7"
    />

    {/* Corner rosette blossom */}
    <circle cx="20" cy="20" r="4" fill={color} opacity="0.2" stroke={goldColor} strokeWidth="1" />
    <circle cx="20" cy="20" r="1.8" fill={goldColor} />
  </svg>
);

/**
 * Gold Ribbon & Cerulean Flourish Divider
 */
export const GoldRibbonDivider: React.FC<SvgProps> = ({
  className = "w-48 h-6",
  color = "#0284C7",
  goldColor = "#D4AF37",
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
    {/* Flowing ribbon curve in center */}
    <path
      d="M90 15 C100 8 110 22 120 15 C130 8 140 22 150 15"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <circle cx="120" cy="15" r="3" fill={goldColor} />
    <circle cx="92" cy="15" r="2" fill={goldColor} opacity="0.8" />
    <circle cx="148" cy="15" r="2" fill={goldColor} opacity="0.8" />
  </svg>
);
