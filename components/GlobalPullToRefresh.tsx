"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, RefreshCw, Check } from "lucide-react";

export function GlobalPullToRefresh() {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const [pullDistance, setPullDistance] = useState<number>(0);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const touchStartY = useRef<number | null>(null);
  const mouseStartY = useRef<number | null>(null);
  const isMouseDown = useRef<boolean>(false);
  const wheelAccumulator = useRef<number>(0);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);
  const hasVibrated = useRef<boolean>(false);

  // Doubled pull range threshold (from 70px to 140px)
  const THRESHOLD = 140;

  const executeRefresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setPullDistance(THRESHOLD);

    try {
      // 1. Dispatch global custom event for active client pages (Admin, Dashboard, Explore, etc.)
      window.dispatchEvent(new CustomEvent("app:refresh"));

      // 2. Revalidate server components via Next.js router
      router.refresh();

      // Satisfying spinner duration like YouTube / Instagram
      await new Promise((resolve) => setTimeout(resolve, 750));

      setIsSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 350));
    } catch {
      // Graceful fallback
    } finally {
      setIsSuccess(false);
      setIsRefreshing(false);
      setPullDistance(0);
      hasVibrated.current = false;
    }
  }, [isRefreshing, router]);

  // Touch Event Listeners (Mobile / Tablets)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollY <= 1) {
        touchStartY.current = e.touches[0].clientY;
        setIsPulling(true);
        hasVibrated.current = false;
      } else {
        touchStartY.current = null;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null || isRefreshing) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;

      if (scrollY <= 1) {
        const deltaY = e.touches[0].clientY - touchStartY.current;
        if (deltaY > 0) {
          // Instagram/iOS logarithmic curve scaled for doubled 140px threshold range
          const resistance = Math.min(Math.pow(deltaY, 0.85) * 2.2, 220);
          setPullDistance(resistance);

          // Haptic feedback when passing the doubled refresh threshold
          if (resistance >= THRESHOLD && !hasVibrated.current) {
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              try {
                navigator.vibrate(15);
              } catch {
                // Ignore
              }
            }
            hasVibrated.current = true;
          } else if (resistance < THRESHOLD) {
            hasVibrated.current = false;
          }

          // Prevent native browser overscroll pull
          if (deltaY > 10 && e.cancelable) {
            e.preventDefault();
          }
        } else {
          setPullDistance(0);
        }
      } else {
        touchStartY.current = null;
        setPullDistance(0);
      }
    };

    const handleTouchEnd = () => {
      if (touchStartY.current === null) return;
      touchStartY.current = null;
      setIsPulling(false);

      if (pullDistance >= THRESHOLD && !isRefreshing) {
        executeRefresh();
      } else {
        setPullDistance(0);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [pullDistance, isRefreshing, executeRefresh]);

  // Desktop Mouse Drag & Trackpad Overscroll Listeners
  useEffect(() => {
    const isInteractiveElement = (el: HTMLElement | null): boolean => {
      if (!el) return false;
      return Boolean(
        el.closest("button, a, input, textarea, select, [role='button'], [tabindex='0'], form")
      );
    };

    const handleMouseDown = (e: MouseEvent) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollY <= 2 && e.clientY < 400 && e.button === 0) {
        if (!isInteractiveElement(e.target as HTMLElement)) {
          mouseStartY.current = e.clientY;
          isMouseDown.current = true;
          setIsPulling(true);
          hasVibrated.current = false;
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseDown.current || mouseStartY.current === null || isRefreshing) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;

      if (scrollY <= 2) {
        const deltaY = e.clientY - mouseStartY.current;
        if (deltaY > 0) {
          const resistance = Math.min(Math.pow(deltaY, 0.85) * 2.2, 210);
          setPullDistance(resistance);

          if (resistance >= THRESHOLD && !hasVibrated.current) {
            hasVibrated.current = true;
          } else if (resistance < THRESHOLD) {
            hasVibrated.current = false;
          }
        } else {
          setPullDistance(0);
        }
      }
    };

    const handleMouseUp = () => {
      if (!isMouseDown.current) return;
      isMouseDown.current = false;
      mouseStartY.current = null;
      setIsPulling(false);

      if (pullDistance >= THRESHOLD && !isRefreshing) {
        executeRefresh();
      } else {
        setPullDistance(0);
      }
    };

    // Trackpad upward two-finger overscroll at top of page (scaled for doubled range)
    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollY <= 0 && e.deltaY < 0 && !isRefreshing) {
        wheelAccumulator.current += Math.abs(e.deltaY) * 0.45;
        const current = Math.min(wheelAccumulator.current, 190);
        setPullDistance(current);

        if (wheelTimeout.current) clearTimeout(wheelTimeout.current);

        if (current >= THRESHOLD) {
          wheelAccumulator.current = 0;
          executeRefresh();
        } else {
          wheelTimeout.current = setTimeout(() => {
            wheelAccumulator.current = 0;
            setPullDistance(0);
          }, 280);
        }
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [pullDistance, isRefreshing, executeRefresh]);

  // Geometry calculations matching Instagram / YouTube pull-to-refresh
  const progressRatio = Math.min(pullDistance / THRESHOLD, 1);
  const isPastThreshold = pullDistance >= THRESHOLD;
  const isVisible = pullDistance > 0 || isRefreshing || isSuccess;

  // Offscreen: -65px. Resting position: +26px.
  // When pulling down across doubled range, smoothly translates down from -54px to +52px.
  const translateY = isRefreshing || isSuccess
    ? 26
    : isVisible
    ? Math.min(-54 + (pullDistance / THRESHOLD) * 106, 60)
    : -65;

  // Rotates 0° to 180° smoothly over the doubled pull range
  const arrowRotation = isPastThreshold ? 180 : Math.min((pullDistance / THRESHOLD) * 180, 180);

  // SVG Circular progress ring calculations
  const radius = 12;
  const circumference = 2 * Math.PI * radius; // ~75.4
  const strokeDashoffset = circumference * (1 - progressRatio);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[99999] flex justify-center pointer-events-none select-none"
      style={{
        transform: `translate3d(0, ${translateY}px, 0)`,
        transition: isPulling ? "none" : "transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-2xl relative backdrop-blur-md ${
          isSuccess
            ? "bg-emerald-900/95 border-2 border-emerald-400 text-emerald-300 scale-105 shadow-emerald-500/30"
            : isRefreshing
            ? "bg-[#06241b]/95 border-2 border-amber-400 text-amber-300 scale-100 shadow-amber-500/30 ring-2 ring-amber-400/20"
            : isPastThreshold
            ? "bg-[#06241b]/95 border-2 border-amber-400 text-amber-300 scale-105 shadow-amber-500/25"
            : "bg-[#06241b]/90 border border-amber-400/50 text-amber-300/80 shadow-black/70"
        }`}
        style={{
          opacity: isVisible ? Math.max(progressRatio, 0.45) : 0,
        }}
      >
        {isSuccess ? (
          <Check className="w-5 h-5 stroke-[2.5] text-emerald-400 animate-in zoom-in-50 duration-200" />
        ) : isRefreshing ? (
          <RefreshCw className="w-5 h-5 animate-spin text-amber-300 stroke-[2.2]" />
        ) : (
          <div className="relative w-7 h-7 flex items-center justify-center">
            {/* YouTube/Instagram-style circular progress ring */}
            <svg className="w-7 h-7 -rotate-90 transform" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r={radius}
                stroke="rgba(251, 191, 36, 0.2)"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="16"
                cy="16"
                r={radius}
                stroke="rgba(251, 191, 36, 0.95)"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                style={{
                  transition: isPulling ? "none" : "stroke-dashoffset 0.15s ease-out",
                }}
              />
            </svg>

            {/* Centered directional arrow indicating pull progress & release trigger */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-transform duration-200"
              style={{
                transform: `rotate(${arrowRotation}deg)`,
                transformOrigin: "center center",
              }}
            >
              <ArrowDown
                className={`w-3.5 h-3.5 ${
                  isPastThreshold ? "text-amber-200 stroke-[2.5]" : "text-amber-300/80 stroke-[2]"
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
