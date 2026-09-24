import React from "react";

interface SvgProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Auspicious Lord Vinayakar / Ganesha Centerpiece Crest
 */
export const VinayakarGaneshaCrest: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  primaryColor = "#991B1B",
  secondaryColor = "#D97706",
}) => (
  <svg
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric temple halo rings */}
    <circle cx="90" cy="90" r="78" stroke={secondaryColor} strokeWidth="1.2" strokeDasharray="4 3" opacity="0.75" />
    <circle cx="90" cy="90" r="72" stroke={primaryColor} strokeWidth="1" opacity="0.4" />
    <circle cx="90" cy="90" r="66" stroke={secondaryColor} strokeWidth="1.5" opacity="0.6" />

    {/* Radiant ray aura */}
    <g transform="translate(90, 90)">
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
        <g key={i} transform={`rotate(${angle})`}>
          <line x1="0" y1="-72" x2="0" y2="-66" stroke={secondaryColor} strokeWidth="1.2" />
          <circle cx="0" cy="-78" r="1.5" fill={primaryColor} />
        </g>
      ))}

      {/* Lord Ganesha Stylized Sacred Silhouette */}
      {/* Crown / Mukut */}
      <path
        d="M-10 -40 L0 -56 L10 -40 L6 -34 L-6 -34 Z"
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth="0.8"
      />
      <circle cx="0" cy="-48" r="2" fill="#FEF08A" />

      {/* Head & Ears */}
      {/* Left Ear */}
      <path
        d="M-12 -32 C-28 -32 -32 -16 -24 -6 C-18 2 -12 -12 -10 -20"
        stroke={primaryColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right Ear & Tusks */}
      <path
        d="M12 -32 C28 -32 32 -16 24 -6 C18 2 12 -12 10 -20"
        stroke={primaryColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sacred Tilak / Namam on Forehead */}
      <path d="M-4 -30 L0 -38 L4 -30 Z" fill={secondaryColor} />
      <line x1="-5" y1="-26" x2="5" y2="-26" stroke={secondaryColor} strokeWidth="1.5" />
      <circle cx="0" cy="-22" r="2" fill={primaryColor} />

      {/* Curved Trunk with Auspicious Modak at Tip */}
      <path
        d="M0 -20 C8 -8 10 8 4 20 C0 28 -12 30 -16 22 C-18 16 -12 12 -8 16 C-4 20 4 18 2 10 C0 2 0 -12 0 -20"
        fill={primaryColor}
      />
      {/* Golden Modak Sweet held by trunk */}
      <circle cx="-16" cy="18" r="4.5" fill={secondaryColor} stroke="#FEF08A" strokeWidth="0.8" />

      {/* Auspicious Lotus Base */}
      <g transform="translate(0, 42)">
        <path d="M0 -6 C-14 -6 -24 6 0 10 C24 6 14 -6 0 -6 Z" fill={primaryColor} opacity="0.8" />
        <path d="M0 -4 C-8 -4 -14 4 0 6 C14 4 8 -4 0 -4 Z" fill={secondaryColor} />
      </g>
    </g>
  </svg>
);

/**
 * Traditional Hanging Temple Bells Corner Border
 */
export const TempleBellCornerBorder: React.FC<
  SvgProps & { flipX?: boolean; flipY?: boolean }
> = ({
  className = "w-16 h-16",
  primaryColor = "#991B1B",
  secondaryColor = "#D97706",
  flipX = false,
  flipY = false,
}) => {
  const transform = `${flipX ? "scale(-1, 1)" : ""} ${flipY ? "scale(1, -1)" : ""}`.trim();

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g transform={transform || undefined} style={transform ? { transformOrigin: "40px 40px" } : undefined}>
        {/* Outer border track */}
        <path
          d="M6 74 L6 20 C6 12 12 6 20 6 L74 6"
          stroke={primaryColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 74 L12 24 C12 17 17 12 24 12 L74 12"
          stroke={secondaryColor}
          strokeWidth="1"
          strokeDasharray="3 2"
        />

        {/* Hanging Brass Temple Bell */}
        {/* Hanging chain */}
        <line x1="24" y1="12" x2="24" y2="30" stroke={secondaryColor} strokeWidth="1.2" strokeDasharray="2 1.5" />
        <circle cx="24" cy="30" r="2" fill={primaryColor} />

        {/* Bell Body */}
        <path
          d="M16 46 C16 36 21 32 24 32 C27 32 32 36 32 46 C35 48 35 50 32 50 L16 50 C13 50 13 48 16 46 Z"
          fill={secondaryColor}
          stroke={primaryColor}
          strokeWidth="1"
        />
        <line x1="15" y1="48" x2="33" y2="48" stroke="#FEF08A" strokeWidth="0.8" />
        {/* Bell Clapper */}
        <circle cx="24" cy="54" r="2.5" fill={primaryColor} />

        {/* Auspicious corner flower */}
        <circle cx="6" cy="6" r="3" fill={primaryColor} />
        <circle cx="48" cy="6" r="2" fill={secondaryColor} />
        <circle cx="6" cy="48" r="2" fill={secondaryColor} />
      </g>
    </svg>
  );
};

/**
 * Sacred Kalash & Temple Brocade Section Divider
 */
export const SacredKalashDivider: React.FC<SvgProps> = ({
  className = "w-full max-w-xs h-9",
  primaryColor = "#991B1B",
  secondaryColor = "#D97706",
}) => (
  <svg
    viewBox="0 0 300 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Left gold ribbon line */}
    <line x1="15" y1="18" x2="115" y2="18" stroke={primaryColor} strokeWidth="1.2" />
    <circle cx="15" cy="18" r="2.5" fill={secondaryColor} />
    <path
      d="M45 18 Q60 10 75 18 Q90 26 105 18"
      stroke={secondaryColor}
      strokeWidth="1"
      fill="none"
    />
    <circle cx="60" cy="13" r="1.8" fill={primaryColor} />
    <circle cx="90" cy="23" r="1.8" fill={primaryColor} />

    {/* Right gold ribbon line */}
    <line x1="185" y1="18" x2="285" y2="18" stroke={primaryColor} strokeWidth="1.2" />
    <circle cx="285" cy="18" r="2.5" fill={secondaryColor} />
    <path
      d="M195 18 Q210 10 225 18 Q240 26 255 18"
      stroke={secondaryColor}
      strokeWidth="1"
      fill="none"
    />
    <circle cx="210" cy="13" r="1.8" fill={primaryColor} />
    <circle cx="240" cy="23" r="1.8" fill={primaryColor} />

    {/* Center Sacred Kalash Icon */}
    <g transform="translate(150, 18)">
      {/* Coconut on top of Kalash */}
      <path d="M0 -15 C-5 -15 -7 -7 0 -2 C7 -7 5 -15 0 -15 Z" fill={secondaryColor} />
      {/* Mango Leaves spreading out */}
      <path d="M-10 -7 C-6 -8 0 -4 0 -2 C0 -4 6 -8 10 -7 C6 -5 0 -2 0 -2" fill="#15803D" opacity="0.9" />

      {/* Kalash Pot Neck & Body */}
      <ellipse cx="0" cy="-1" rx="8" ry="2.5" fill="#FEF08A" stroke={primaryColor} strokeWidth="0.8" />
      <path
        d="M-8 -1 C-12 5 -10 13 0 14 C10 13 12 5 8 -1 Z"
        fill={primaryColor}
        stroke={secondaryColor}
        strokeWidth="1"
      />
      {/* Swastik / Tilak dot on Kalash */}
      <circle cx="0" cy="6" r="2" fill={secondaryColor} />
      {/* Kalash Base */}
      <line x1="-5" y1="14" x2="5" y2="14" stroke={secondaryColor} strokeWidth="1.5" />
    </g>
  </svg>
);

/**
 * Traditional Temple Arch Brocade Header with Hanging Bells
 */
export const TempleArchBrocadeHeader: React.FC<SvgProps> = ({
  className = "w-full h-12",
  primaryColor = "#991B1B",
  secondaryColor = "#D97706",
}) => (
  <svg
    viewBox="0 0 400 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    {/* Top brocade crimson bands */}
    <rect x="0" y="0" width="400" height="6" fill={primaryColor} />
    <line x1="0" y1="7" x2="400" y2="7" stroke={secondaryColor} strokeWidth="1.5" />
    <line x1="0" y1="9" x2="400" y2="9" stroke={primaryColor} strokeWidth="0.8" strokeDasharray="3 2" />

    {/* Repeating scalloped temple arches */}
    {[0, 50, 100, 150, 200, 250, 300, 350].map((xOffset, i) => (
      <g key={i}>
        <path
          d={`M${xOffset} 9 Q${xOffset + 25} 24 ${xOffset + 50} 9`}
          stroke={secondaryColor}
          strokeWidth="1.5"
          fill="none"
        />
        {/* Little hanging brass bell at the cusp */}
        <line x1={xOffset + 25} y1="20" x2={xOffset + 25} y2="32" stroke={primaryColor} strokeWidth="1" />
        <path
          d={`M${xOffset + 21} 40 C${xOffset + 21} 34 ${xOffset + 29} 34 ${xOffset + 29} 40 Z`}
          fill={secondaryColor}
          stroke={primaryColor}
          strokeWidth="0.8"
        />
        <circle cx={xOffset + 25} cy="42" r="1.5" fill={primaryColor} />
      </g>
    ))}
  </svg>
);
