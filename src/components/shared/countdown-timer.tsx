"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. useCountdown Hook (Hydration-Safe)
// ============================================================================

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
  isMounted: boolean;
}

const emptySubscribe = () => () => {};

export function useCountdown(targetDate: string | Date): CountdownValues {
  const isMounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const calculateTimeLeft = useCallback(() => {
    const target = new Date(targetDate).getTime();
    const now = Date.now();
    const diff = target - now;

    if (isNaN(target) || diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isCompleted: true,
      };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isCompleted: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
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

// ============================================================================
// 2. CountdownTimer Component
// ============================================================================

export type CountdownOrientation = "inline-pill" | "cards";

export interface CountdownTimerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  targetDate: string | Date;
  orientation?: CountdownOrientation;
  title?: string;
  completedMessage?: React.ReactNode;
}

export const CountdownTimer = React.forwardRef<
  HTMLDivElement,
  CountdownTimerProps
>(
  (
    {
      targetDate,
      orientation = "cards",
      title,
      completedMessage,
      className,
      ...props
    },
    ref
  ) => {
    const { days, hours, minutes, seconds, isCompleted, isMounted } =
      useCountdown(targetDate);

    // Format single-digit numbers with leading zero
    const formatNumber = (num: number) => num.toString().padStart(2, "0");

    if (isCompleted && isMounted) {
      return (
        <div
          ref={ref}
          className={cn(
            "text-center py-5 px-6 rounded-3xl bg-white border border-stone-200 font-serif text-lg text-stone-900 shadow-sm",
            className
          )}
          {...props}
        >
          {completedMessage || "The celebration has begun! ❤️"}
        </div>
      );
    }

    // Orientation: "inline-pill"
    if (orientation === "inline-pill") {
      return (
        <div
          ref={ref}
          className={cn(
            "inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-stone-300/80 bg-white shadow-xs text-xs sm:text-sm font-medium text-stone-800",
            className
          )}
          {...props}
        >
          {title && (
            <span className="font-serif italic text-stone-500 border-r border-stone-200 pr-3">
              {title}
            </span>
          )}
          <span className="tabular-nums font-mono">
            {!isMounted
              ? "--d : --h : --m : --s"
              : `${days}d : ${formatNumber(hours)}h : ${formatNumber(minutes)}m : ${formatNumber(seconds)}s`}
          </span>
        </div>
      );
    }

    // Orientation: "cards" (4-box vertical card)
    const timeBoxes = [
      { label: "DAYS", value: days },
      { label: "HOURS", value: hours },
      { label: "MINUTES", value: minutes },
      { label: "SECONDS", value: seconds },
    ];

    return (
      <div
        ref={ref}
        className={cn("text-center space-y-4", className)}
        {...props}
      >
        {title && (
          <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-medium">
            {title}
          </p>
        )}

        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto">
          {timeBoxes.map((box) => (
            <div
              key={box.label}
              className="flex flex-col items-center justify-center py-4 px-2 sm:px-3 rounded-2xl bg-white border border-stone-200/90 shadow-sm"
            >
              <span className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-stone-900 tabular-nums">
                {!isMounted ? "--" : formatNumber(box.value)}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.2em] font-medium text-stone-500 uppercase mt-1">
                {box.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
CountdownTimer.displayName = "CountdownTimer";
