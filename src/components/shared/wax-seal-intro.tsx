"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Sparkles, Heart } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

export interface WaxSealIntroProps {
  coupleNames: string;
  brideInitial?: string;
  groomInitial?: string;
  weddingDate?: Date | string | null;
  slug?: string;
  primaryColor?: string;
  accentColor?: string;
  onOpened?: () => void;
  allowReplay?: boolean;
}

const emptySubscribe = () => () => {};

export function WaxSealIntro({
  coupleNames,
  brideInitial = "S",
  groomInitial = "A",
  weddingDate,
  slug = "wedding",
  primaryColor = "#064e3b",
  accentColor = "#d97706",
  onOpened,
}: WaxSealIntroProps) {
  // Hydration-safe session storage check
  const hasSeenIntro = useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return sessionStorage.getItem(`digiwed_intro_seen_${slug}`) === "true";
      } catch {
        return false;
      }
    },
    () => true // SSR: true
  );

  const [isDismissed, setIsDismissed] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // After animation finishes, mark as completed
    setTimeout(() => {
      setIsDismissed(true);
      try {
        sessionStorage.setItem(`digiwed_intro_seen_${slug}`, "true");
      } catch {
        // Continue
      }
      if (onOpened) onOpened();
    }, 1100);
  };

  const handleSkip = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem(`digiwed_intro_seen_${slug}`, "true");
    } catch {
      // Continue
    }
    if (onOpened) onOpened();
  };

  if (hasSeenIntro || isDismissed) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1c1917]/95 backdrop-blur-xl transition-opacity duration-700 ease-out select-none",
        isOpening ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
      style={{
        transitionDelay: isOpening ? "700ms" : "0ms",
      }}
    >
      {/* Skip button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 text-[11px] font-sans tracking-widest uppercase text-stone-400 hover:text-white px-3 py-1.5 rounded-full border border-stone-700 hover:border-stone-500 transition-colors cursor-pointer"
      >
        Skip Intro
      </button>

      {/* Envelope Container */}
      <div
        onClick={handleOpen}
        className={cn(
          "relative w-full max-w-md sm:max-w-lg aspect-[4/3] rounded-3xl bg-[#f7f4ee] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-2 border-[#e7e1d5] flex flex-col items-center justify-between cursor-pointer transition-transform duration-500 hover:scale-[1.01] active:scale-[0.99] group",
          isOpening && "scale-105"
        )}
      >
        {/* Decorative inner parchment borders */}
        <div className="absolute inset-3 border border-stone-300/60 rounded-2xl pointer-events-none" />
        <div className="absolute inset-4 border border-dashed border-amber-900/20 rounded-xl pointer-events-none" />

        {/* Envelope Top Header */}
        <div className="relative z-10 text-center space-y-1 pt-2">
          <div className="flex items-center justify-center gap-1.5 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-sans font-medium">
            <Heart className="w-3 h-3 text-amber-600 fill-amber-600" />
            <span>Formal Invitation</span>
            <Heart className="w-3 h-3 text-amber-600 fill-amber-600" />
          </div>
          <h2
            className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide"
            style={{ color: primaryColor }}
          >
            {coupleNames}
          </h2>
          {weddingDate && (
            <p className="text-xs text-stone-500 font-serif italic mt-0.5">
              {formatDate(weddingDate)}
            </p>
          )}
        </div>

        {/* 3D Wax Seal Monogram Medallion */}
        <div className="relative z-20 my-auto flex flex-col items-center group-hover:scale-105 transition-transform duration-300">
          <div
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center shadow-[0_12px_24px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.4)] border-2 border-amber-700/60 cursor-pointer"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${accentColor}, #78350f 65%, #451a03)`,
            }}
          >
            {/* Wax texture & rim */}
            <div className="absolute inset-1 rounded-full border border-dashed border-amber-300/40 pointer-events-none" />

            {/* Embossed Couple Initials */}
            <div className="text-center font-serif text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] select-none">
              <span className="text-xl sm:text-2xl font-bold tracking-wider">
                {brideInitial}
              </span>
              <span className="italic text-amber-200 text-sm mx-1">&</span>
              <span className="text-xl sm:text-2xl font-bold tracking-wider">
                {groomInitial}
              </span>
            </div>

            {/* Shimmer sparkle */}
            <Sparkles className="absolute -top-1.5 -right-1.5 w-5 h-5 text-amber-300 animate-pulse drop-shadow" />
          </div>

          {/* Invitation Callout */}
          <div className="mt-3 text-center space-y-0.5">
            <span
              className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase block transition-colors"
              style={{ color: accentColor }}
            >
              Tap Seal to Open
            </span>
            <span className="text-[10px] text-stone-400 font-serif italic">
              Exclusive Digital Wedding Suite
            </span>
          </div>
        </div>

        {/* Envelope Bottom Seal Stamp */}
        <div className="relative z-10 text-center pb-1">
          <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 font-sans font-medium">
            Cordially Invited • Touch to Unfold
          </p>
        </div>
      </div>
    </div>
  );
}

export default WaxSealIntro;
