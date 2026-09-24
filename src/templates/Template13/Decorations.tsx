import React from "react";

interface SvgProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Minimalist Single-Stem Botanical Blossom Centerpiece
 */
export const SingleStemBlossomCrest: React.FC<SvgProps> = ({
  className = "w-32 h-32",
  primaryColor = "#D97706",
  secondaryColor = "#84CC16",
}) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Minimalist fine halo circle */}
    <circle
      cx="80"
      cy="80"
      r="68"
      stroke={primaryColor}
      strokeWidth="0.8"
      strokeDasharray="2 3"
      opacity="0.6"
    />
    <circle
      cx="80"
      cy="80"
      r="62"
      stroke={primaryColor}
      strokeWidth="1"
      opacity="0.3"
    />

    {/* Elegant single botanical stem curving up */}
    <path
      d="M80 132 C80 105 84 85 78 50"
      stroke={secondaryColor}
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    {/* Delicate olive leaves branching off stem */}
    {/* Left leaf 1 */}
    <path
      d="M79 108 C68 106 60 98 62 90 C70 94 77 100 79 106 Z"
      fill={secondaryColor}
      opacity="0.8"
    />
    {/* Right leaf 1 */}
    <path
      d="M81 92 C92 90 100 82 98 74 C90 78 83 84 81 90 Z"
      fill={secondaryColor}
      opacity="0.8"
    />
    {/* Left leaf 2 */}
    <path
      d="M78 72 C69 70 63 64 65 58 C72 61 76 66 78 70 Z"
      fill={secondaryColor}
      opacity="0.75"
    />

    {/* Blossom flower at the top */}
    <g transform="translate(78, 48)">
      {/* 5 minimal petals */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <path
            d="M0 -18 C4 -12 4 -6 0 0 C-4 -6 -4 -12 0 -18 Z"
            fill={primaryColor}
            opacity="0.85"
          />
          <circle cx="0" cy="-18" r="1.5" fill={primaryColor} />
        </g>
      ))}
      {/* Center golden pearl */}
      <circle cx="0" cy="0" r="4.5" fill="#FEF3C7" stroke={primaryColor} strokeWidth="1" />
      <circle cx="0" cy="0" r="2" fill={primaryColor} />
    </g>
  </svg>
);

/**
 * Minimalist Crisp Geometric Corner with Leaf Flourish
 */
export const MinimalGoldCorner: React.FC<
  SvgProps & { flipX?: boolean; flipY?: boolean }
> = ({
  className = "w-14 h-14",
  primaryColor = "#D97706",
  secondaryColor = "#84CC16",
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
        {/* Modern clean right-angle corner frame */}
        <path
          d="M4 56 L4 12 C4 7.5 7.5 4 12 4 L56 4"
          stroke={primaryColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M10 56 L10 16 C10 12.5 12.5 10 16 10 L56 10"
          stroke={primaryColor}
          strokeWidth="0.6"
          strokeDasharray="2 2"
          opacity="0.5"
        />

        {/* Small minimalist leaf nodule */}
        <path
          d="M4 4 C10 10 18 10 20 4 C14 2 8 2 4 4 Z"
          fill={secondaryColor}
          opacity="0.75"
        />
        <circle cx="4" cy="4" r="2" fill={primaryColor} />
      </g>
    </svg>
  );
};

/**
 * Subtle Gold Line & Olive Leaf Section Divider
 */
export const SubtleGoldDivider: React.FC<SvgProps> = ({
  className = "w-full max-w-xs h-6",
  primaryColor = "#D97706",
  secondaryColor = "#84CC16",
}) => (
  <svg
    viewBox="0 0 240 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left fine line */}
    <line x1="10" y1="12" x2="95" y2="12" stroke={primaryColor} strokeWidth="0.8" opacity="0.6" />
    <circle cx="10" cy="12" r="1.5" fill={primaryColor} opacity="0.7" />

    {/* Center subtle botanical ring motif */}
    <g transform="translate(120, 12)">
      <circle cx="0" cy="0" r="6" stroke={primaryColor} strokeWidth="0.8" fill="#FFFFFA" />
      {/* Left tiny leaf */}
      <path d="M-6 0 C-11 -3 -15 -1 -14 3 C-10 3 -7 1 -6 0 Z" fill={secondaryColor} opacity="0.8" />
      {/* Right tiny leaf */}
      <path d="M6 0 C11 -3 15 -1 14 3 C10 3 7 1 6 0 Z" fill={secondaryColor} opacity="0.8" />
      <circle cx="0" cy="0" r="2" fill={primaryColor} />
    </g>

    {/* Right fine line */}
    <line x1="145" y1="12" x2="230" y2="12" stroke={primaryColor} strokeWidth="0.8" opacity="0.6" />
    <circle cx="230" cy="12" r="1.5" fill={primaryColor} opacity="0.7" />
  </svg>
);
