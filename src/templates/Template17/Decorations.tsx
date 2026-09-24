import React from "react";

interface SvgProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Minimalist Gold Foil Geometric Ganesha & Diamond Emblem
 */
export const MinimalistGoldGaneshaCrest: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  primaryColor = "#78350F",
  secondaryColor = "#CA8A04",
}) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric ultra-thin diamond frames */}
    <g transform="translate(80, 80) rotate(45)">
      <rect x="-56" y="-56" width="112" height="112" stroke={secondaryColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.75" />
      <rect x="-50" y="-50" width="100" height="100" stroke={primaryColor} strokeWidth="0.8" opacity="0.4" />
      <circle cx="0" cy="0" r="48" stroke={secondaryColor} strokeWidth="1.2" opacity="0.6" />
    </g>

    {/* Minimalist Ganesha Geometric Outline */}
    <g transform="translate(80, 80)">
      {/* Crown Mukut lines */}
      <path d="M-8 -34 L0 -46 L8 -34 Z" stroke={secondaryColor} strokeWidth="1.2" fill="none" />
      <circle cx="0" cy="-40" r="1.5" fill={secondaryColor} />

      {/* Tilak mark */}
      <line x1="0" y1="-26" x2="0" y2="-20" stroke={secondaryColor} strokeWidth="1.5" />
      <line x1="-3" y1="-22" x2="3" y2="-22" stroke={secondaryColor} strokeWidth="1" />

      {/* Head contour */}
      <path
        d="M-10 -24 C-20 -24 -22 -12 -16 -4 C-12 2 -8 -8 -6 -16"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 -24 C20 -24 22 -12 16 -4 C12 2 8 -8 6 -16"
        stroke={primaryColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Graceful Trunk Line */}
      <path
        d="M0 -16 C6 -6 8 8 2 18 C-2 24 -12 26 -14 18 C-16 12 -10 10 -6 14 C-2 18 2 16 0 10 C-2 4 -2 -6 0 -16"
        stroke={primaryColor}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tiny Modak gold dot */}
      <circle cx="-14" cy="16" r="3" fill={secondaryColor} />

      {/* Lotus line base */}
      <path d="M-14 28 Q0 22 14 28" stroke={secondaryColor} strokeWidth="1.2" fill="none" />
      <circle cx="0" cy="25" r="1.5" fill={primaryColor} />
    </g>
  </svg>
);

/**
 * Brushed Gold Geometric Notch Corner
 */
export const BrushedGoldCornerFrame: React.FC<
  SvgProps & { flipX?: boolean; flipY?: boolean }
> = ({
  className = "w-14 h-14",
  primaryColor = "#78350F",
  secondaryColor = "#CA8A04",
  flipX = false,
  flipY = false,
}) => {
  const transform = `${flipX ? "scale(-1, 1)" : ""} ${flipY ? "scale(1, -1)" : ""}`.trim();

  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g transform={transform || undefined} style={transform ? { transformOrigin: "30px 30px" } : undefined}>
        {/* Modern notched corner frame */}
        <path
          d="M4 56 L4 16 L16 4 L56 4"
          stroke={secondaryColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M10 56 L10 20 L20 10 L56 10"
          stroke={primaryColor}
          strokeWidth="0.6"
          strokeDasharray="2 2"
          opacity="0.5"
        />

        {/* Small gold diamond at the notch */}
        <rect
          x="14"
          y="14"
          width="4"
          height="4"
          transform="rotate(45 16 16)"
          fill={secondaryColor}
        />
        <circle cx="4" cy="16" r="1.5" fill={primaryColor} />
        <circle cx="16" cy="4" r="1.5" fill={primaryColor} />
      </g>
    </svg>
  );
};

/**
 * Hairline Gold & Diamond Node Section Divider
 */
export const HairlineGoldDivider: React.FC<SvgProps> = ({
  className = "w-full max-w-xs h-6",
  primaryColor = "#78350F",
  secondaryColor = "#CA8A04",
}) => (
  <svg
    viewBox="0 0 240 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left fine line */}
    <line x1="15" y1="12" x2="105" y2="12" stroke={secondaryColor} strokeWidth="0.8" opacity="0.7" />
    <circle cx="15" cy="12" r="1.5" fill={primaryColor} />

    {/* Center geometric diamond node */}
    <g transform="translate(120, 12)">
      <rect x="-5" y="-5" width="10" height="10" transform="rotate(45)" stroke={secondaryColor} strokeWidth="1" fill="#FAF7F2" />
      <circle cx="0" cy="0" r="2" fill={primaryColor} />
    </g>

    {/* Right fine line */}
    <line x1="135" y1="12" x2="225" y2="12" stroke={secondaryColor} strokeWidth="0.8" opacity="0.7" />
    <circle cx="225" cy="12" r="1.5" fill={primaryColor} />
  </svg>
);
