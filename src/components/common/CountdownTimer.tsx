"use client";

import React, { useState, useEffect } from "react";
import { Clock, Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownTimerProps {
  /** Target wedding date string (ISO or parseable) or Date object */
  targetDate: string | Date;
  /** Optional title heading displayed above countdown */
  title?: string;
  /** Additional CSS class names for outer wrapper */
  className?: string;
  /** Visual presentation style: "luxury" (frosted glass pills) | "floating" (hairline dividers) | "minimal" | "compact" */
  variant?: "luxury" | "floating" | "minimal" | "compact" | "card";
  /** Optional callback fired when countdown reaches zero */
  onComplete?: () => void;
  /** Primary accent color (used for border flourishes, badge, accents) */
  accentColor?: string;
  /** High-contrast text color for numeric digits */
  textColor?: string;
  /** Secondary text color for unit labels (DAYS, HOURS, etc.) */
  secondaryTextColor?: string;
  /** Border color override for outer frame or dividers */
  borderColor?: string;
  /** Background fill override for translucent backdrop */
  bgFill?: string;
  /** Whether to show outer glassmorphic container (default: true for luxury) */
  showEnclosure?: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  title = "Counting Down to Forever",
  className = "",
  variant = "luxury",
  onComplete,
  accentColor,
  textColor,
  secondaryTextColor,
  borderColor,
  bgFill,
  showEnclosure = true,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (isNaN(targetTime)) {
        return;
      }

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsCompleted(true);
        if (onComplete) onComplete();
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  // Format with zero-padding (e.g. 05, 09)
  const pad = (num: number): string => String(num).padStart(2, "0");

  const units: Array<{ label: string; value: number }> = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  // Palette resolution ensuring high contrast
  const effectiveDigitColor = textColor || accentColor || "#1C1917";
  const effectiveAccent = accentColor || textColor || "#B45309";
  const effectiveSecondary = secondaryTextColor || (textColor ? `${textColor}B3` : `${effectiveAccent}CC`);
  const effectiveBorder = borderColor || `${effectiveAccent}26`;
  const effectiveOuterBg = bgFill || "rgba(255, 255, 255, 0.45)";
  const effectiveCellBg = bgFill ? `${bgFill}` : "rgba(255, 255, 255, 0.65)";

  if (!mounted) {
    // Avoid hydration mismatch by rendering identical static skeleton structure
    return (
      <div
        suppressHydrationWarning
        className={`w-full max-w-sm sm:max-w-md mx-auto ${className}`}
      >
        <div
          className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 backdrop-blur-sm border shadow-xs"
          style={{
            backgroundColor: effectiveOuterBg,
            borderColor: effectiveBorder,
          }}
        >
          {title && (
            <div className="flex items-center justify-center gap-2 mb-3.5 sm:mb-4 select-none opacity-40">
              <span className="h-[1px] w-6 sm:w-10 bg-current" />
              <span className="w-1.5 h-1.5 rotate-45 border border-current shrink-0" />
              <p className="text-[9px] sm:text-[11px] font-medium tracking-[0.25em] uppercase font-serif px-1">
                {title}
              </p>
              <span className="w-1.5 h-1.5 rotate-45 border border-current shrink-0" />
              <span className="h-[1px] w-6 sm:w-10 bg-current" />
            </div>
          )}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-3 w-full">
            {["00", "00", "00", "00"].map((val, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center py-2.5 sm:py-3.5 px-0.5 sm:px-1 rounded-xl sm:rounded-2xl border"
                style={{
                  backgroundColor: effectiveCellBg,
                  borderColor: `${effectiveBorder}`,
                }}
              >
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight tabular-nums leading-none mb-1 opacity-20">
                  {val}
                </span>
                <span className="text-[8px] sm:text-[9.5px] font-semibold tracking-[0.2em] uppercase font-sans leading-none opacity-40">
                  {["DAYS", "HOURS", "MINS", "SECS"][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div
        suppressHydrationWarning
        className={`flex flex-col items-center justify-center text-center p-6 rounded-2xl sm:rounded-3xl border backdrop-blur-sm max-w-sm sm:max-w-md mx-auto ${className}`}
        style={{
          backgroundColor: effectiveOuterBg,
          borderColor: effectiveBorder,
        }}
      >
        <Sparkles className="w-6 h-6 mb-2 animate-bounce" style={{ color: effectiveAccent }} />
        <h4
          className="text-base sm:text-lg font-serif font-bold"
          style={{ color: effectiveDigitColor }}
        >
          The Celebration Has Begun!
        </h4>
        <p
          className="text-xs sm:text-sm mt-1"
          style={{ color: effectiveSecondary }}
        >
          Thank you for sharing in our joyous milestone and heartfelt prayers.
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        suppressHydrationWarning
        className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full border backdrop-blur-sm ${className}`}
        style={{
          backgroundColor: effectiveOuterBg,
          borderColor: effectiveBorder,
        }}
      >
        <Clock className="w-3.5 h-3.5" style={{ color: effectiveAccent }} />
        <div
          className="flex items-center gap-1 font-serif text-sm font-semibold tracking-wide"
          style={{ color: effectiveDigitColor }}
        >
          <span>{pad(timeLeft.days)}d</span>
          <span className="opacity-50">:</span>
          <span>{pad(timeLeft.hours)}h</span>
          <span className="opacity-50">:</span>
          <span>{pad(timeLeft.minutes)}m</span>
          <span className="opacity-50">:</span>
          <span>{pad(timeLeft.seconds)}s</span>
        </div>
      </div>
    );
  }

  if (variant === "floating" || variant === "minimal") {
    return (
      <div
        suppressHydrationWarning
        className={`w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center justify-center ${className}`}
      >
        {title && (
          <div className="flex items-center justify-center gap-2.5 mb-3 select-none">
            <span className="h-[1px] w-6 sm:w-10 opacity-30" style={{ backgroundColor: effectiveAccent }} />
            <span className="w-1.5 h-1.5 rotate-45 border shrink-0 opacity-50" style={{ borderColor: effectiveAccent }} />
            <p
              className="text-[10px] sm:text-[11px] font-medium tracking-[0.25em] uppercase font-serif px-1"
              style={{ color: effectiveSecondary }}
            >
              {title}
            </p>
            <span className="w-1.5 h-1.5 rotate-45 border shrink-0 opacity-50" style={{ borderColor: effectiveAccent }} />
            <span className="h-[1px] w-6 sm:w-10 opacity-30" style={{ backgroundColor: effectiveAccent }} />
          </div>
        )}

        <div
          className="flex items-center justify-center divide-x w-full py-2"
          style={{ borderColor: effectiveBorder }}
        >
          {units.map((unit, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center justify-center px-1 sm:px-2">
              <span
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight tabular-nums leading-none mb-1"
                style={{ color: effectiveDigitColor }}
              >
                {pad(unit.value)}
              </span>
              <span
                className="text-[8px] sm:text-[9.5px] font-semibold tracking-[0.2em] uppercase font-sans leading-none"
                style={{ color: effectiveSecondary }}
              >
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default Luxury Variant: Translucent Glassmorphic Presentation with Frosted Ivory Pills
  return (
    <div
      suppressHydrationWarning
      className={`w-full max-w-sm sm:max-w-md mx-auto ${className}`}
    >
      <div
        className={`relative rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 backdrop-blur-sm transition-all duration-300 ${
          showEnclosure ? "border shadow-xs" : ""
        }`}
        style={
          showEnclosure
            ? {
                backgroundColor: effectiveOuterBg,
                borderColor: effectiveBorder,
                boxShadow: "0 4px 20px -4px rgba(0, 0, 0, 0.03)",
              }
            : undefined
        }
      >
        {/* Subtle Top Metallic Highlight Accent */}
        {showEnclosure && (
          <div
            className="absolute inset-x-6 top-0 h-[1px] rounded-t-3xl opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${effectiveAccent}, transparent)`,
            }}
          />
        )}

        {/* Flanked Header Badge */}
        {title && (
          <div className="flex items-center justify-center gap-2 mb-3.5 sm:mb-4 select-none">
            <span
              className="h-[1px] w-6 sm:w-10 opacity-30"
              style={{ backgroundColor: effectiveAccent }}
            />
            <span
              className="w-1.5 h-1.5 rotate-45 border shrink-0 opacity-50"
              style={{ borderColor: effectiveAccent }}
            />
            <p
              className="text-[9.5px] sm:text-[11px] font-medium tracking-[0.25em] uppercase font-serif px-1 text-center"
              style={{ color: effectiveSecondary }}
            >
              {title}
            </p>
            <span
              className="w-1.5 h-1.5 rotate-45 border shrink-0 opacity-50"
              style={{ borderColor: effectiveAccent }}
            />
            <span
              className="h-[1px] w-6 sm:w-10 opacity-30"
              style={{ backgroundColor: effectiveAccent }}
            />
          </div>
        )}

        {/* 4 Fluid Responsive Unit Cells */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 w-full">
          {units.map((unit, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center justify-center py-2.5 sm:py-3.5 px-0.5 sm:px-1 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: effectiveCellBg,
                borderColor: `${effectiveBorder}`,
                borderWidth: "1px",
                borderStyle: "solid",
                boxShadow: "0 2px 8px -2px rgba(0, 0, 0, 0.03)",
              }}
            >
              {/* High-Contrast Numeric Digits */}
              <span
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight tabular-nums leading-none mb-1 sm:mb-1.5"
                style={{ color: effectiveDigitColor }}
              >
                {pad(unit.value)}
              </span>

              {/* Refined Tracking Unit Label */}
              <span
                className="text-[8px] sm:text-[9.5px] font-semibold tracking-[0.2em] uppercase font-sans leading-none"
                style={{ color: effectiveSecondary }}
              >
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
