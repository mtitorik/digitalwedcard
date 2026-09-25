"use client";

import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export interface WaxSealEnvelopeProps {
  /** The full invitation card body to reveal when unfolded */
  children: React.ReactNode;
  /** Whether the envelope should be open immediately (e.g. standalone page or after unsealing) */
  isOpenDefault?: boolean;
  /** Groom's name for seal initials and cover headings */
  groomName: string;
  /** Bride's name for seal initials and cover headings */
  brideName: string;
  /** Formatted wedding date string displayed on the cover */
  weddingDate: string;
  /** Primary accent color (used for typography, seal highlights, borders) */
  primaryColor?: string;
  /** Secondary metallic color (used for gold foil, seal background, particle sparkles) */
  secondaryColor?: string;
  /** Envelope paper background color */
  backgroundColor?: string;
  /** Text color on envelope */
  textColor?: string;
  /** Custom seal monogram (defaults to e.g. "S & D") */
  monogram?: string;
  /** Custom action label on seal (defaults to "OPEN") */
  sealLabel?: string;
  /** Optional custom wreath / crest element centered behind seal */
  wreathComponent?: React.ReactNode;
  /** Optional corner decorative ornaments (anchored to the 4 outer display bounds) */
  cornerDecorations?: React.ReactNode;
  /** Unfolding animation style: "gatefold" (French bifold doors) or "flap" (top envelope flap) */
  variant?: "gatefold" | "flap";
  /** Optional callback fired when the seal is clicked and unsealing begins */
  onOpenStart?: () => void;
  /** Optional callback fired when unfolding animation completes */
  onOpenComplete?: () => void;
  /** Additional container classes */
  className?: string;
}

type AnimationStage = "closed" | "pressed" | "opening" | "opened";

/** Default luxury corner flourish SVG if custom decorations are not provided */
export const DefaultCornerFlourish: React.FC<{
  color?: string;
  className?: string;
}> = ({ color = "#D4AF37", className = "w-14 h-14 sm:w-20 sm:h-20 opacity-75" }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 4 C 30 4, 60 12, 70 30 C 76 39, 72 50, 62 52 C 50 54, 42 42, 48 32 C 54 22, 68 18, 96 18"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M4 4 C 4 30, 12 60, 30 70 C 39 76, 50 72, 52 62 C 54 50, 42 42, 32 48 C 22 54, 18 68, 18 96"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M8 8 L 8 45 M 8 8 L 45 8"
      stroke={color}
      strokeWidth="1"
      strokeDasharray="2 3"
      opacity="0.6"
    />
    <circle cx="8" cy="8" r="3" fill={color} />
    <circle cx="36" cy="36" r="2" fill={color} opacity="0.8" />
  </svg>
);

export const WaxSealEnvelope: React.FC<WaxSealEnvelopeProps> = ({
  children,
  isOpenDefault = false,
  groomName,
  brideName,
  weddingDate,
  primaryColor = "#4A6B53",
  secondaryColor = "#C5A880",
  backgroundColor = "#FAF7F2",
  textColor = "#2D3748",
  monogram,
  sealLabel = "OPEN",
  wreathComponent,
  cornerDecorations,
  variant = "gatefold",
  onOpenStart,
  onOpenComplete,
  className = "",
}) => {
  const [stage, setStage] = useState<AnimationStage>(
    isOpenDefault ? "opened" : "closed"
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  // Compute initials if not provided
  const computedMonogram =
    monogram ||
    `${groomName?.[0] || "G"}&${brideName?.[0] || "B"}`;

  const coupleHeading = `${groomName?.split(" ")?.[0] || "Groom"} & ${
    brideName?.split(" ")?.[0] || "Bride"
  }`;

  const triggerSparkles = useCallback(() => {
    try {
      // Luxury ambient gold & champagne particle burst
      confetti({
        particleCount: 45,
        spread: 75,
        origin: { y: 0.5, x: 0.5 },
        colors: [secondaryColor, "#D4AF37", "#F59E0B", "#FEF08A", "#FFFFFF"],
        ticks: 150,
        gravity: 0.65,
        scalar: 0.85,
        disableForReducedMotion: true,
      });
    } catch {
      // Graceful fallback if canvas-confetti is not loaded
    }
  }, [secondaryColor]);

  const handleOpen = useCallback(() => {
    if (stage !== "closed") return;

    onOpenStart?.();

    // Trigger audio autoplay via custom event synchronously in user click gesture callstack
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wedding-envelope-opened"));
    }

    if (prefersReducedMotion) {
      setStage("opening");
      setTimeout(() => {
        setStage("opened");
        onOpenComplete?.();
      }, 400);
      return;
    }

    // Stage 1: The Seal Press & Sparkle Break (0ms - 350ms)
    setStage("pressed");
    triggerSparkles();

    // Stage 2: Flaps / Gatefold Panels Begin Unfolding (at 350ms)
    setTimeout(() => {
      setStage("opening");
    }, 350);

    // Stage 3 & 4: Staggered Card Body Elevation & Final Unlock (at 2050ms)
    // Slower, cinematic pacing (flaps: 1.6s unfold, card: 0.5s delay + 1.2s glide)
    setTimeout(() => {
      setStage("opened");
      onOpenComplete?.();
    }, 2050);
  }, [stage, prefersReducedMotion, onOpenStart, onOpenComplete, triggerSparkles]);

  // If permanently opened, render clean scrollable children directly
  if (stage === "opened") {
    return (
      <div className={`w-full h-full min-h-full overflow-y-auto overflow-x-hidden relative ${className}`}>
        {children}
      </div>
    );
  }

  const isPressed = stage === "pressed";
  const isOpening = stage === "opening";

  return (
    <div
      className={`relative w-full h-full min-h-screen sm:min-h-full flex-1 flex flex-col justify-between items-center overflow-hidden select-none ${className}`}
      style={{
        perspective: "1400px",
        backgroundColor: backgroundColor || "#FAF7F2",
      }}
    >
      {/* ========================================================
          BOTTOM LAYER (Z-10): Underneath Wedding Card Body
          Staggered 500ms delay & 1.2s smooth upward elevation glide
          CRITICAL: Kept in absolute inset-0 so it NEVER expands parent scrollHeight!
         ======================================================== */}
      <div
        className="absolute inset-0 z-10 w-full h-full overflow-hidden pointer-events-none transition-all ease-out"
        style={{
          transform: isOpening ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
          opacity: isOpening ? 1 : 0,
          transitionDuration: "1200ms",
          transitionDelay: isOpening ? "500ms" : "0ms",
          transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {children}
      </div>

      {/* ========================================================
          MIDDLE LAYER (Z-15): Unfolding Envelope Panels / Flaps
          Slower luxury duration (1.6s) with cubic-bezier deceleration
         ======================================================== */}
      {variant === "gatefold" ? (
        <>
          {/* Left Door / Panel (Spans strictly 0% to 50%) */}
          <div
            className="absolute top-0 left-0 w-1/2 h-full z-15 pointer-events-none"
            style={{
              backgroundColor,
              transformOrigin: "left center",
              transform: isOpening ? "rotateY(-105deg)" : "rotateY(0deg)",
              opacity: isOpening ? 0 : 1,
              transitionDuration: isOpening ? "1600ms" : "400ms",
              transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
              borderRight: `1px solid ${secondaryColor}33`,
              boxShadow: isOpening
                ? "none"
                : "inset -15px 0 35px -10px rgba(0,0,0,0.06)",
            }}
          />

          {/* Right Door / Panel (Spans strictly 50% to 100%) */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full z-15 pointer-events-none"
            style={{
              backgroundColor,
              transformOrigin: "right center",
              transform: isOpening ? "rotateY(105deg)" : "rotateY(0deg)",
              opacity: isOpening ? 0 : 1,
              transitionDuration: isOpening ? "1600ms" : "400ms",
              transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
              borderLeft: `1px solid ${secondaryColor}33`,
              boxShadow: isOpening
                ? "none"
                : "inset 15px 0 35px -10px rgba(0,0,0,0.06)",
            }}
          />

          {/* Central Vertical Seam Rule (Strictly centered at 50% across true display) */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-full z-20 pointer-events-none transition-opacity duration-700"
            style={{
              background: `linear-gradient(180deg, transparent 0%, ${secondaryColor}66 15%, ${secondaryColor} 50%, ${secondaryColor}66 85%, transparent 100%)`,
              opacity: isOpening ? 0 : 0.7,
            }}
          />
        </>
      ) : (
        /* Top Envelope Flap Opening Style */
        <div
          className="absolute inset-0 z-15 pointer-events-none"
          style={{
            backgroundColor,
            transformOrigin: "top center",
            transform: isOpening ? "rotateX(180deg)" : "rotateX(0deg)",
            opacity: isOpening ? 0 : 1,
            transitionDuration: isOpening ? "1500ms" : "400ms",
            transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />
      )}

      {/* ========================================================
          CORNER ORNAMENTS LAYER (Z-20):
          Spans full width & height of the outer card wrapper so all
          4 corners (top-left, top-right, bottom-left, bottom-right)
          are anchored to the true display perimeter without cramping.
         ======================================================== */}
      <div
        className="absolute inset-0 w-full h-full z-20 pointer-events-none overflow-hidden transition-all duration-700 ease-out"
        style={{
          opacity: isOpening ? 0 : 1,
          transform: isOpening ? "scale(1.03)" : "scale(1)",
        }}
      >
        {cornerDecorations ? (
          cornerDecorations
        ) : (
          <>
            {/* Top-Left Ornament */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
              <DefaultCornerFlourish color={secondaryColor} />
            </div>
            {/* Top-Right Ornament */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none transform scale-x-[-1]">
              <DefaultCornerFlourish color={secondaryColor} />
            </div>
            {/* Bottom-Left Ornament */}
            <div className="absolute bottom-6 left-4 z-20 pointer-events-none transform scale-y-[-1]">
              <DefaultCornerFlourish color={secondaryColor} />
            </div>
            {/* Bottom-Right Ornament */}
            <div className="absolute bottom-6 right-4 z-20 pointer-events-none transform scale-[-1]">
              <DefaultCornerFlourish color={secondaryColor} />
            </div>
          </>
        )}
      </div>

      {/* ========================================================
          TOP LAYER (Z-30): Wax Seal Monogram & Centered Accents
          Nested inside a full-width container to guarantee absolute
          horizontal and vertical symmetry.
         ======================================================== */}
      <div
        className="absolute inset-0 z-30 w-full h-full flex flex-col justify-between items-center px-4 sm:px-6 pt-8 pb-4 sm:pt-10 sm:pb-6 text-center pointer-events-none transition-all duration-700 ease-out select-none"
        style={{
          opacity: isOpening ? 0 : 1,
          transform: isOpening ? "scale(1.02)" : "scale(1)",
        }}
      >
        {/* Cover Header Typography */}
        <div
          className="w-full flex flex-col items-center justify-center pt-2 sm:pt-4 z-10 transition-all duration-700"
          style={{
            transform: isPressed ? "scale(0.98)" : "scale(1)",
          }}
        >
          <span
            className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-serif font-semibold"
            style={{ color: primaryColor }}
          >
            Wedding Invitation
          </span>
          <h2
            className="mt-1 text-2xl sm:text-4xl font-serif italic tracking-wide"
            style={{ color: textColor }}
          >
            {coupleHeading}
          </h2>
        </div>

        {/* Central Wax Seal Monogram Button */}
        <div className="my-auto z-20 flex flex-col items-center justify-center pointer-events-auto py-2">
          <div
            tabIndex={0}
            role="button"
            aria-label="Open wedding invitation"
            onClick={handleOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen();
              }
            }}
            className="relative group cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400/40 rounded-full select-none"
          >
            {/* Optional Botanical Wreath / Medallion */}
            {wreathComponent ? (
              <div
                className="transition-transform ease-out"
                style={{
                  transform: isPressed
                    ? "scale(1.08) rotate(10deg)"
                    : isOpening
                    ? "scale(1.22) rotate(25deg)"
                    : "scale(1) rotate(0deg)",
                  opacity: isOpening ? 0 : 0.88,
                  transitionDuration: isOpening ? "700ms" : "300ms",
                  transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                {wreathComponent}
              </div>
            ) : (
              <div
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-dashed animate-[spin_60s_linear_infinite]"
                style={{ borderColor: `${secondaryColor}60` }}
              />
            )}

            {/* Radiant Ambient Glow Behind Seal */}
            <div
              className={`absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full blur-xl transition-all pointer-events-none ${
                isPressed
                  ? "opacity-90 scale-125"
                  : "opacity-40 group-hover:opacity-75 group-hover:scale-110"
              }`}
              style={{
                background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
                transitionDuration: isOpening ? "700ms" : "300ms",
              }}
            />

            {/* Physical Wax Seal Medallion Button */}
            <div
              className={`absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-2xl flex flex-col items-center justify-center border-2 border-white/60 transform transition-all ${
                isPressed
                  ? "scale-110 shadow-amber-900/50 brightness-110"
                  : isOpening
                  ? "scale-135 opacity-0 blur-xs"
                  : "hover:scale-105 active:scale-95 group-hover:shadow-amber-900/30"
              }`}
              style={{
                background: `linear-gradient(135deg, ${secondaryColor}, #E2C299 60%, ${secondaryColor})`,
                color: textColor || "#2C2416",
                boxShadow: isPressed
                  ? `0 0 35px ${secondaryColor}80, 0 15px 30px rgba(0,0,0,0.3)`
                  : "0 10px 25px -5px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.4)",
                transitionDuration: isOpening ? "700ms" : "300ms",
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              {/* Concentric Pressed Ridge Rim */}
              <div
                className="absolute inset-1.5 rounded-full border border-black/15 pointer-events-none"
                style={{
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
                }}
              />

              {/* Monogram Initials */}
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider relative z-10 drop-shadow-xs">
                {computedMonogram}
              </span>

              {/* Action Pill Badge */}
              <span
                className="text-[9px] uppercase tracking-[0.2em] font-semibold mt-0.5 opacity-90 relative z-10 px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.25)",
                }}
              >
                {sealLabel}
              </span>
            </div>
          </div>

          {/* Instructional Pulse Prompt */}
          <p
            className={`mt-4 text-xs sm:text-sm font-serif italic tracking-wide transition-opacity duration-500 ${
              isPressed || isOpening ? "opacity-0" : "opacity-80 animate-pulse"
            }`}
            style={{ color: primaryColor }}
          >
            Click the seal to unfold the invitation
          </p>
        </div>

        {/* Cover Bottom Date */}
        <div className="w-full flex flex-col items-center justify-center pb-4 z-10">
          <p
            className="text-xs sm:text-sm font-serif tracking-[0.25em] uppercase font-semibold"
            style={{ color: primaryColor }}
          >
            {weddingDate}
          </p>
        </div>
      </div>
    </div>
  );
};
