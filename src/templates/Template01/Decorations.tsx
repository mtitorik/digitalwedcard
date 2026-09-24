import React from "react";

interface SvgProps {
  className?: string;
  color?: string;
  accentColor?: string;
  size?: number;
}

/**
 * Botanical Floral Wreath Monogram Ring
 */
export const BotanicalWreath: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  color = "#4A6B53",
  accentColor = "#C5A880",
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Inner delicate gold rings */}
    <circle
      cx="100"
      cy="100"
      r="74"
      stroke={accentColor}
      strokeWidth="1.2"
      strokeDasharray="4 3"
      opacity="0.8"
    />
    <circle
      cx="100"
      cy="100"
      r="78"
      stroke={accentColor}
      strokeWidth="0.8"
      opacity="0.5"
    />

    {/* Left botanical sprig branch */}
    <path
      d="M100 24C65 24 34 50 26 84C20 110 28 138 48 156C60 167 76 174 92 176"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Left leaves */}
    <path
      d="M38 48C42 42 48 44 49 52C50 60 42 62 38 48Z"
      fill={color}
      opacity="0.85"
    />
    <path
      d="M26 70C22 66 26 58 34 59C42 60 41 68 26 70Z"
      fill={color}
      opacity="0.75"
    />
    <path
      d="M22 96C18 90 22 82 30 84C38 86 36 94 22 96Z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M26 122C24 114 30 108 38 112C46 116 42 124 26 122Z"
      fill={color}
      opacity="0.8"
    />
    <path
      d="M40 148C36 142 44 136 50 142C56 148 50 156 40 148Z"
      fill={color}
      opacity="0.85"
    />
    <path
      d="M66 168C64 160 74 156 78 164C82 172 74 178 66 168Z"
      fill={color}
      opacity="0.75"
    />

    {/* Right botanical sprig branch */}
    <path
      d="M100 24C135 24 166 50 174 84C180 110 172 138 152 156C140 167 124 174 108 176"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Right leaves */}
    <path
      d="M162 48C158 42 152 44 151 52C150 60 158 62 162 48Z"
      fill={color}
      opacity="0.85"
    />
    <path
      d="M174 70C178 66 174 58 166 59C158 60 159 68 174 70Z"
      fill={color}
      opacity="0.75"
    />
    <path
      d="M178 96C182 90 178 82 170 84C162 86 164 94 178 96Z"
      fill={color}
      opacity="0.9"
    />
    <path
      d="M174 122C176 114 170 108 162 112C154 116 158 124 174 122Z"
      fill={color}
      opacity="0.8"
    />
    <path
      d="M160 148C164 142 156 136 150 142C144 148 150 156 160 148Z"
      fill={color}
      opacity="0.85"
    />
    <path
      d="M134 168C136 160 126 156 122 164C118 172 126 178 134 168Z"
      fill={color}
      opacity="0.75"
    />

    {/* Top & Bottom Champagne Gold Floral Berries */}
    <circle cx="100" cy="24" r="3.5" fill={accentColor} />
    <circle cx="108" cy="28" r="2.2" fill={accentColor} opacity="0.8" />
    <circle cx="92" cy="28" r="2.2" fill={accentColor} opacity="0.8" />
    <circle cx="100" cy="176" r="3.5" fill={accentColor} />
    <circle cx="108" cy="172" r="2.2" fill={accentColor} opacity="0.8" />
    <circle cx="92" cy="172" r="2.2" fill={accentColor} opacity="0.8" />
  </svg>
);

/**
 * Botanical Corner Foliage Vine (mirrored as needed via CSS classes)
 */
export const CornerFoliage: React.FC<SvgProps> = ({
  className = "w-20 h-20",
  color = "#4A6B53",
  accentColor = "#C5A880",
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Corner geometric border accent */}
    <path
      d="M4 4H45M4 4V45"
      stroke={accentColor}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path
      d="M8 8H35M8 8V35"
      stroke={accentColor}
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.4"
    />
    {/* Curved leafy vine */}
    <path
      d="M10 90C12 55 45 20 85 12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M24 66C22 58 30 52 36 56C42 60 38 68 24 66Z"
      fill={color}
      opacity="0.8"
    />
    <path
      d="M42 46C46 38 56 40 56 48C56 56 46 56 42 46Z"
      fill={color}
      opacity="0.8"
    />
    <path
      d="M62 30C66 22 76 26 74 34C72 42 64 40 62 30Z"
      fill={color}
      opacity="0.8"
    />
    {/* Gold accent berry */}
    <circle cx="34" cy="52" r="2" fill={accentColor} />
    <circle cx="54" cy="36" r="2" fill={accentColor} />
  </svg>
);

/**
 * Botanical Floral Horizontal Divider
 */
export const BotanicalDivider: React.FC<SvgProps> = ({
  className = "w-48 h-6",
  color = "#4A6B53",
  accentColor = "#C5A880",
}) => (
  <svg
    viewBox="0 0 240 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 15H90M150 15H230"
      stroke={accentColor}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* Center flower bloom */}
    <circle cx="120" cy="15" r="3.5" fill={accentColor} />
    {/* Leaves spreading from center */}
    <path
      d="M114 15C108 12 104 15 106 18C108 21 114 18 114 15Z"
      fill={color}
    />
    <path
      d="M126 15C132 12 136 15 134 18C132 21 126 18 126 15Z"
      fill={color}
    />
    <path
      d="M120 9C117 4 123 4 120 9Z"
      fill={color}
      opacity="0.9"
    />
    <circle cx="95" cy="15" r="1.8" fill={accentColor} opacity="0.6" />
    <circle cx="145" cy="15" r="1.8" fill={accentColor} opacity="0.6" />
  </svg>
);
