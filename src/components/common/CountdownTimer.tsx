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
  /** Additional CSS class names */
  className?: string;
  /** Visual presentation style */
  variant?: "luxury" | "card" | "compact" | "minimal";
  /** Optional callback fired when countdown reaches zero */
  onComplete?: () => void;
  /** Custom primary accent color (hex/rgb/css variable) */
  accentColor?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  title = "Counting Down to Forever",
  className = "",
  variant = "luxury",
  onComplete,
  accentColor,
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

  // Format 2 digits
  const pad = (num: number): string => String(num).padStart(2, "0");

  const units: Array<{ label: string; value: number }> = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.minutes },
    { label: "SECS", value: timeLeft.seconds },
  ];

  if (!mounted) {
    // Avoid hydration mismatch by rendering stable static skeleton
    return (
      <div suppressHydrationWarning className={`flex flex-col items-center justify-center p-6 ${className}`}>
        {title && (
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-stone-500 mb-4 font-serif">
            {title}
          </p>
        )}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg w-full">
          {["00", "00", "00", "00"].map((val, idx) => (
            <div
              key={idx}
              className="bg-white/70 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 rounded-2xl p-3 sm:p-4 text-center animate-pulse"
            >
              <div className="h-8 bg-stone-200 dark:bg-stone-800 rounded mb-2"></div>
              <div className="h-3 bg-stone-100 dark:bg-stone-800/60 rounded w-1/2 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div
        suppressHydrationWarning
        className={`flex flex-col items-center justify-center text-center p-6 bg-amber-500/10 border border-amber-500/30 rounded-3xl backdrop-blur-md ${className}`}
      >
        <Sparkles className="w-8 h-8 text-amber-500 mb-2 animate-bounce" />
        <h4 className="text-lg md:text-xl font-serif font-bold text-stone-900 dark:text-amber-200">
          The Celebration Has Begun!
        </h4>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Thank you for sharing in our joyous milestone and heartfelt prayers.
        </p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div
        suppressHydrationWarning
        className={`inline-flex items-center gap-3 px-4 py-2 rounded-full bg-stone-100 dark:bg-stone-900/90 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 ${className}`}
      >
        <Clock className="w-4 h-4 text-amber-500" />
        <div className="flex items-center gap-1.5 font-mono text-sm font-semibold">
          <span>{pad(timeLeft.days)}d</span>
          <span>:</span>
          <span>{pad(timeLeft.hours)}h</span>
          <span>:</span>
          <span>{pad(timeLeft.minutes)}m</span>
          <span>:</span>
          <span>{pad(timeLeft.seconds)}s</span>
        </div>
      </div>
    );
  }

  return (
    <div suppressHydrationWarning className={`flex flex-col items-center justify-center p-4 sm:p-6 ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-400" />
          <p className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-stone-600 dark:text-stone-300 font-serif">
            {title}
          </p>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-400" />
        </div>
      )}

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 w-full max-w-xl">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200/80 dark:border-stone-800/80 shadow-lg shadow-stone-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-amber-400/50"
            style={
              accentColor
                ? { borderColor: `${accentColor}33` }
                : undefined
            }
          >
            {/* Top subtle highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent rounded-t-3xl" />

            <div
              className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-stone-900 dark:text-amber-100 tabular-nums"
              style={accentColor ? { color: accentColor } : undefined}
            >
              {pad(unit.value)}
            </div>

            <div className="mt-1 text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
