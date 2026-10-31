"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// ==========================================
// 1. useCountdown Hook
// ==========================================

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
  isMounted: boolean;
}

export function useCountdown(targetDate: Date | string | number): CountdownValues {
  const calculateTimeLeft = useCallback(() => {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const difference = target - now;

    if (isNaN(target) || difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isCompleted: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isCompleted: false,
    };
  }, [targetDate]);

  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return {
    ...timeLeft,
    isMounted,
  };
}

// ==========================================
// 2. CountdownTimer Component
// ==========================================

export type CountdownVariant = "cards" | "editorial" | "minimal";
export type CountdownTone = "gold" | "dark" | "light";

export interface CountdownTimerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  targetDate: Date | string | number;
  title?: string;
  variant?: CountdownVariant;
  tone?: CountdownTone;
  completedMessage?: React.ReactNode;
}

export const CountdownTimer = React.forwardRef<
  HTMLDivElement,
  CountdownTimerProps
>(
  (
    {
      targetDate,
      title,
      variant = "cards",
      tone = "gold",
      completedMessage,
      className,
      ...props
    },
    ref
  ) => {
    const { days, hours, minutes, seconds, isCompleted, isMounted } =
      useCountdown(targetDate);

    // Color palettes by tone
    const palettes = {
      gold: {
        card: "bg-white/95 border-amber-300/60 text-stone-900 shadow-md",
        number:
          "text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800",
        label: "text-amber-800/80 dark:text-amber-300",
        separator: "text-amber-400",
      },
      dark: {
        card: "bg-white border-stone-200 text-stone-900 shadow-sm",
        number: "text-stone-900",
        label: "text-stone-500",
        separator: "text-stone-300",
      },
      light: {
        card: "bg-stone-950/60 backdrop-blur-md border-white/20 text-white shadow-xl",
        number: "text-white",
        label: "text-stone-300",
        separator: "text-white/40",
      },
    };

    const currentPalette = palettes[tone];

    // Pad single digits with leading zero for aesthetic typography alignment
    const formatNumber = (val: number) =>
      val.toString().padStart(2, "0");

    if (isCompleted && isMounted) {
      return (
        <div
          ref={ref}
          className={cn(
            "text-center py-6 px-8 rounded-3xl font-serif text-xl sm:text-2xl",
            currentPalette.card,
            className
          )}
          {...props}
        >
          {completedMessage || "The celebration has begun! ❤️"}
        </div>
      );
    }

    const units = [
      { label: "DAYS", value: days },
      { label: "HOURS", value: hours },
      { label: "MINS", value: minutes },
      { label: "SECS", value: seconds },
    ];

    // Variant: Editorial (Clean numbers separated by delicate colons)
    if (variant === "editorial") {
      return (
        <div
          ref={ref}
          className={cn("text-center space-y-3", className)}
          {...props}
        >
          {title && (
            <p
              className={cn(
                "text-[10px] sm:text-xs uppercase tracking-[0.25em] font-medium",
                currentPalette.label
              )}
            >
              {title}
            </p>
          )}

          <div className="flex items-center justify-center gap-3 sm:gap-6">
            {units.map((unit, index) => (
              <React.Fragment key={unit.label}>
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight tabular-nums",
                      currentPalette.number
                    )}
                  >
                    {!isMounted ? "--" : formatNumber(unit.value)}
                  </span>
                  <span
                    className={cn(
                      "text-[9px] sm:text-[10px] tracking-[0.2em] font-medium mt-1",
                      currentPalette.label
                    )}
                  >
                    {unit.label}
                  </span>
                </div>

                {index < units.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-serif text-2xl sm:text-4xl -translate-y-2 opacity-60",
                      currentPalette.separator
                    )}
                  >
                    :
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    }

    // Variant: Minimal (Pill banner)
    if (variant === "minimal") {
      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center gap-3 px-5 py-2.5 rounded-full border text-xs sm:text-sm font-medium",
            currentPalette.card,
            className
          )}
          {...props}
        >
          {title && (
            <span
              className={cn(
                "font-serif italic border-r border-current/20 pr-3",
                currentPalette.label
              )}
            >
              {title}
            </span>
          )}
          <span className="tabular-nums font-mono">
            {!isMounted
              ? "--d --h --m --s"
              : `${days}d : ${formatNumber(hours)}h : ${formatNumber(minutes)}m : ${formatNumber(seconds)}s`}
          </span>
        </div>
      );
    }

    // Default Variant: Cards (Luxury stationery boxes)
    return (
      <div
        ref={ref}
        className={cn("text-center space-y-4", className)}
        {...props}
      >
        {title && (
          <h4
            className={cn(
              "text-[10px] sm:text-xs uppercase tracking-[0.24em] font-semibold",
              currentPalette.label
            )}
          >
            {title}
          </h4>
        )}

        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto">
          {units.map((unit) => (
            <div
              key={unit.label}
              className={cn(
                "flex flex-col items-center justify-center py-3.5 sm:py-5 px-2 rounded-2xl border transition-all duration-300",
                currentPalette.card
              )}
            >
              <span
                className={cn(
                  "font-serif text-2xl sm:text-4xl font-bold tracking-tight tabular-nums",
                  currentPalette.number
                )}
              >
                {!isMounted ? "--" : formatNumber(unit.value)}
              </span>
              <span
                className={cn(
                  "text-[8px] sm:text-[10px] tracking-[0.2em] font-medium uppercase mt-1",
                  currentPalette.label
                )}
              >
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
CountdownTimer.displayName = "CountdownTimer";
