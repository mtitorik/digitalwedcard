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
  /** Optional corner decorative ornaments */
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
        particleCount: 40,
        spread: 70,
        origin: { y: 0.5, x: 0.5 },
        colors: [secondaryColor, "#D4AF37", "#F59E0B", "#FEF08A", "#FFFFFF"],
        ticks: 120,
        gravity: 0.75,
        scalar: 0.8,
        disableForReducedMotion: true,
      });
    } catch {
      // Graceful fallback if confetti unavailable
    }
  }, [secondaryColor]);

  const handleOpen = useCallback(() => {
    if (stage !== "closed") return;

    onOpenStart?.();

    // Trigger audio autoplay via custom event
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

    // Stage 1: The Seal Press & Sparkle Break (0ms - 250ms)
    setStage("pressed");
    triggerSparkles();

    // Stage 2 & 3: Flap / Gatefold Unfolding & Card Slide (250ms - 1100ms)
    setTimeout(() => {
      setStage("opening");
    }, 250);

    // Stage 4: Animation Complete & Scroll Hand-Off (1100ms)
    setTimeout(() => {
      setStage("opened");
      onOpenComplete?.();
    }, 1150);
  }, [stage, prefersReducedMotion, onOpenStart, onOpenComplete, triggerSparkles]);

  // If permanently opened, render clean scrollable children directly
  if (stage === "opened") {
    return (
      <div className={`w-full min-h-screen relative overflow-x-hidden ${className}`}>
        {children}
      </div>
    );
  }

  const isPressed = stage === "pressed";
  const isOpening = stage === "opening";

  return (
    <div
      className={`relative w-full h-screen max-h-screen overflow-hidden select-none ${className}`}
      style={{ perspective: "1400px" }}
    >
      {/* ========================================================
          BOTTOM LAYER (Z-10): Underneath Wedding Card Body
          Slide & Depth Elevation (Translates upward as flaps open)
         ======================================================== */}
      <div
        className="relative z-10 w-full h-full overflow-hidden transition-all duration-700 ease-out"
        style={{
          transform: isOpening ? "translateY(0)" : "translateY(24px) scale(0.98)",
          opacity: isOpening ? 1 : 0.05,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDuration: "850ms",
        }}
      >
        {children}
      </div>

      {/* ========================================================
          MIDDLE LAYER (Z-20): Unfolding Envelope Panels / Flaps
         ======================================================== */}
      {variant === "gatefold" ? (
        <>
          {/* Left Door / Panel */}
          <div
            className="absolute top-0 left-0 w-1/2 h-full z-20 transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor,
              transformOrigin: "left center",
              transform: isOpening
                ? "rotateY(-105deg)"
                : "rotateY(0deg)",
              opacity: isOpening ? 0 : 1,
              transitionDuration: isOpening ? "850ms" : "400ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              borderRight: `1px solid ${secondaryColor}33`,
              boxShadow: isOpening
                ? "none"
                : "inset -15px 0 35px -10px rgba(0,0,0,0.06)",
            }}
          >
            {/* Left Door Decorative Overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {cornerDecorations}
              {/* Subtle vertical hairline foil seam */}
              <div
                className="absolute right-0 top-0 bottom-0 w-[1px] opacity-40"
                style={{
                  background: `linear-gradient(180deg, transparent, ${secondaryColor}, transparent)`,
                }}
              />
            </div>
          </div>

          {/* Right Door / Panel */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full z-20 transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor,
              transformOrigin: "right center",
              transform: isOpening
                ? "rotateY(105deg)"
                : "rotateY(0deg)",
              opacity: isOpening ? 0 : 1,
              transitionDuration: isOpening ? "850ms" : "400ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              borderLeft: `1px solid ${secondaryColor}33`,
              boxShadow: isOpening
                ? "none"
                : "inset 15px 0 35px -10px rgba(0,0,0,0.06)",
            }}
          >
            {/* Right Door Decorative Overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Subtle vertical hairline foil seam */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[1px] opacity-40"
                style={{
                  background: `linear-gradient(180deg, transparent, ${secondaryColor}, transparent)`,
                }}
              />
            </div>
          </div>
        </>
      ) : (
        /* Top Envelope Flap Opening Style */
        <div
          className="absolute inset-0 z-20 transition-all duration-700 pointer-events-none"
          style={{
            backgroundColor,
            transformOrigin: "top center",
            transform: isOpening ? "rotateX(180deg)" : "rotateX(0deg)",
            opacity: isOpening ? 0 : 1,
            transitionDuration: "800ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {cornerDecorations}
        </div>
      )}

      {/* ========================================================
          TOP LAYER (Z-30): Wax Seal Monogram & Header Accents
         ======================================================== */}
      <div
        className={`absolute inset-0 z-30 flex flex-col items-center justify-between p-6 sm:p-10 text-center pointer-events-none transition-all duration-500 ${
          isOpening ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
        }`}
      >
        {/* Cover Header Typography */}
        <div
          className="pt-8 sm:pt-12 transition-all duration-400"
          style={{
            transform: isPressed ? "scale(0.98)" : "scale(1)",
            opacity: isOpening ? 0 : 1,
          }}
        >
          <span
            className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-serif font-semibold"
            style={{ color: primaryColor }}
          >
            Wedding Invitation
          </span>
          <h2
            className="mt-2 text-2xl sm:text-4xl font-serif italic tracking-wide"
            style={{ color: textColor }}
          >
            {coupleHeading}
          </h2>
        </div>

        {/* Central Wax Seal Monogram Button */}
        <div className="my-auto py-6 flex flex-col items-center pointer-events-auto">
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
                className="transition-transform duration-700 ease-out"
                style={{
                  transform: isPressed
                    ? "scale(1.1) rotate(15deg)"
                    : isOpening
                    ? "scale(1.25) rotate(35deg)"
                    : "scale(1) rotate(0deg)",
                  opacity: isOpening ? 0 : 0.85,
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
              className={`absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full blur-xl transition-all duration-300 pointer-events-none ${
                isPressed
                  ? "opacity-90 scale-125"
                  : "opacity-40 group-hover:opacity-75 group-hover:scale-110"
              }`}
              style={{
                background: `radial-gradient(circle, ${secondaryColor} 0%, transparent 70%)`,
              }}
            />

            {/* Physical Wax Seal Medallion Button */}
            <div
              className={`absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full shadow-2xl flex flex-col items-center justify-center border-2 border-white/60 transform transition-all duration-300 ${
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
            className={`mt-6 text-xs sm:text-sm font-serif italic tracking-wide transition-opacity duration-300 ${
              isPressed || isOpening ? "opacity-0" : "opacity-80 animate-pulse"
            }`}
            style={{ color: primaryColor }}
          >
            Click the seal to unfold the invitation
          </p>
        </div>

        {/* Cover Bottom Date */}
        <div
          className="pb-8 transition-opacity duration-300"
          style={{ opacity: isOpening ? 0 : 1 }}
        >
          <p
            className="text-xs sm:text-sm font-serif tracking-[0.2em] uppercase font-medium"
            style={{ color: primaryColor }}
          >
            {weddingDate}
          </p>
        </div>
      </div>
    </div>
  );
};
