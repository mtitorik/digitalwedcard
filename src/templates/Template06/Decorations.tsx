import React from "react";

interface SvgProps {
  className?: string;
  color?: string;
  bronzeColor?: string;
}

/**
 * Hand-painted Eucalyptus Leafy Wreath Monogram Ring
 */
export const EucalyptusWreath: React.FC<SvgProps> = ({
  className = "w-36 h-36",
  color = "#047857",
  bronzeColor = "#E0A96D",
}) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Concentric bronze geometric rings */}
    <circle
      cx="100"
      cy="100"
      r="76"
      stroke={bronzeColor}
      strokeWidth="1.2"
      strokeDasharray="4 4"
      opacity="0.8"
    />
    <circle
      cx="100"
      cy="100"
      r="72"
      stroke={bronzeColor}
      strokeWidth="0.8"
      opacity="0.5"
    />

    {/* Left Eucalyptus Branch with round coin leaves */}
    <path
      d="M100 22 C60 22 28 54 24 94 C20 128 36 160 70 174 C80 178 90 180 100 180"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Round Eucalyptus Leaves Left */}
    <circle cx="34" cy="52" r="6" fill={color} opacity="0.8" />
    <circle cx="22" cy="78" r="7" fill={color} opacity="0.85" />
    <circle cx="20" cy="110" r="7.5" fill={color} opacity="0.8" />
    <circle cx="30" cy="140" r="6.5" fill={color} opacity="0.85" />
    <circle cx="56" cy="166" r="6" fill={color} opacity="0.8" />
    <circle cx="82" cy="178" r="5" fill={color} opacity="0.75" />

    {/* Right Eucalyptus Branch with round coin leaves */}
    <path
      d="M100 22 C140 22 172 54 176 94 C180 128 164 160 130 174 C120 178 110 180 100 180"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Round Eucalyptus Leaves Right */}
    <circle cx="166" cy="52" r="6" fill={color} opacity="0.8" />
    <circle cx="178" cy="78" r="7" fill={color} opacity="0.85" />
    <circle cx="180" cy="110" r="7.5" fill={color} opacity="0.8" />
    <circle cx="170" cy="140" r="6.5" fill={color} opacity="0.85" />
    <circle cx="144" cy="166" r="6" fill={color} opacity="0.8" />
    <circle cx="118" cy="178" r="5" fill={color} opacity="0.75" />

    {/* Bronze berry clusters */}
    <circle cx="100" cy="20" r="3" fill={bronzeColor} />
    <circle cx="100" cy="180" r="3" fill={bronzeColor} />
    <circle cx="28" cy="62" r="2" fill={bronzeColor} />
    <circle cx="172" cy="62" r="2" fill={bronzeColor} />
    <circle cx="40" cy="155" r="2" fill={bronzeColor} />
    <circle cx="160" cy="155" r="2" fill={bronzeColor} />
  </svg>
);

/**
 * Deckle Edge & Leaf Sprig Corner Frame
 */
export const DeckleEdgeCorner: React.FC<SvgProps> = ({
  className = "w-20 h-20",
  color = "#047857",
  bronzeColor = "#E0A96D",
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Subtle Deckle Edge / Double Handcrafted Border */}
    <path
      d="M5 5 H60 M5 5 V60"
      stroke={bronzeColor}
      strokeWidth="1.4"
      strokeLinecap="round"
      opacity="0.85"
    />
    <path
      d="M9 9 H45 M9 9 V45"
      stroke={bronzeColor}
      strokeWidth="0.8"
      strokeLinecap="round"
      opacity="0.5"
    />

    {/* Eucalyptus sprig curving into card */}
    <path
      d="M12 75 C14 45 42 22 75 14"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="24" cy="54" r="4.5" fill={color} opacity="0.8" />
    <circle cx="42" cy="36" r="4.5" fill={color} opacity="0.8" />
    <circle cx="62" cy="22" r="4" fill={color} opacity="0.8" />

    {/* Warm Bronze Stud */}
    <circle cx="5" cy="5" r="2.5" fill={bronzeColor} />
  </svg>
);

/**
 * Botanical Leaf Horizontal Divider
 */
export const BotanicalLeafDivider: React.FC<SvgProps> = ({
  className = "w-48 h-6",
  color = "#047857",
  bronzeColor = "#E0A96D",
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
      stroke={bronzeColor}
      strokeWidth="1"
      strokeLinecap="round"
      opacity="0.75"
    />
    {/* Center pair of eucalyptus leaves */}
    <path
      d="M120 15 C112 10 108 14 110 18 C112 21 118 18 120 15 Z"
      fill={color}
      opacity="0.85"
    />
    <path
      d="M120 15 C128 10 132 14 130 18 C128 21 122 18 120 15 Z"
      fill={color}
      opacity="0.85"
    />
    <circle cx="120" cy="15" r="2.5" fill={bronzeColor} />
    <circle cx="94" cy="15" r="1.8" fill={bronzeColor} opacity="0.7" />
    <circle cx="146" cy="15" r="1.8" fill={bronzeColor} opacity="0.7" />
  </svg>
);
