"use client";

import React from "react";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Heading, Eyebrow } from "@/components/shared/typography";
import { ArchedImage } from "@/components/shared/card-frame";
import { CountdownTimer } from "@/components/shared/countdown-timer";
import { DecorativeDivider } from "@/components/shared/section-wrapper";

export interface VeronaHeroProps extends React.HTMLAttributes<HTMLElement> {
  brideName: string;
  groomName: string;
  coverImageUrl: string;
  weddingDate?: Date | string | null;
  venueName?: string | null;
  venueCity?: string | null;
  primaryColor?: string;
  accentColor?: string;
  scrollTargetId?: string;
}

export const VeronaHero = React.forwardRef<HTMLElement, VeronaHeroProps>(
  (
    {
      brideName,
      groomName,
      coverImageUrl,
      weddingDate,
      venueName,
      venueCity,
      primaryColor = "#292524",
      accentColor = "#c5a059",
      scrollTargetId = "story",
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const coupleNames = `${brideName} & ${groomName}`;
    const brideInitial = brideName.trim().charAt(0).toUpperCase() || "B";
    const groomInitial = groomName.trim().charAt(0).toUpperCase() || "G";

    // Extract year from wedding date if available
    const weddingYear = weddingDate
      ? new Date(weddingDate).getFullYear()
      : new Date().getFullYear();

    return (
      <header
        ref={ref}
        className={cn(
          "relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 py-12 sm:py-16 text-center overflow-hidden bg-[#faf8f5] text-stone-900 selection:bg-amber-100",
          className
        )}
        style={{
          ...style,
        }}
        {...props}
      >
        {/* Subtle decorative background watermarks & corner ornaments */}
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-30">
          <div className="absolute top-0 left-0 w-48 h-48 bg-radial from-amber-200/40 to-transparent blur-2xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-radial from-amber-100/50 to-transparent blur-3xl" />
        </div>

        {/* Outer classic micro-border */}
        <div className="absolute inset-3 sm:inset-5 pointer-events-none border border-stone-300/40 rounded-3xl" />
        <div className="absolute inset-4 sm:inset-6 pointer-events-none border border-stone-200/60 rounded-2xl" />

        {/* Top Header: Monogram Crest & Eyebrow */}
        <div className="relative z-10 space-y-4 pt-2 sm:pt-4 max-w-xl mx-auto">
          {/* Verona Monogram Crest Badge */}
          <div className="inline-flex flex-col items-center justify-center group select-none">
            <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-stone-300/80 bg-white/80 backdrop-blur-sm shadow-xs transition-transform duration-500 group-hover:scale-105">
              {/* Inner concentric ring */}
              <div className="w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full border border-dashed border-amber-600/40 flex items-center justify-center">
                <span
                  className="font-serif text-lg sm:text-xl font-normal tracking-widest text-stone-800"
                  style={{ color: primaryColor }}
                >
                  {brideInitial}
                  <span
                    className="font-serif italic text-xs mx-0.5"
                    style={{ color: accentColor }}
                  >
                    &
                  </span>
                  {groomInitial}
                </span>
              </div>
              <Sparkles
                className="absolute -top-1 -right-1 w-3.5 h-3.5 animate-pulse"
                style={{ color: accentColor }}
              />
            </div>
            <span className="mt-2 text-[10px] tracking-[0.3em] uppercase text-stone-400 font-sans font-medium">
              EST. {weddingYear}
            </span>
          </div>

          <div>
            <Eyebrow ornament className="text-stone-500">
              The Wedding Celebration Of
            </Eyebrow>
          </div>
        </div>

        {/* Middle Main Content: Editorial Serif Names & Arched Hero Image */}
        <div className="relative z-10 w-full max-w-4xl mx-auto my-auto py-6 sm:py-8 space-y-8 flex flex-col items-center">
          {/* Couple Heading */}
          <div className="space-y-2">
            <Heading
              level="h1"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight text-stone-900"
              style={{ color: primaryColor }}
            >
              <span className="inline-block transition-transform duration-300 hover:scale-[1.02]">
                {brideName}
              </span>
              <span
                className="block text-2xl sm:text-4xl md:text-5xl my-2 sm:my-3 font-serif italic font-light"
                style={{ color: accentColor }}
              >
                &
              </span>
              <span className="inline-block transition-transform duration-300 hover:scale-[1.02]">
                {groomName}
              </span>
            </Heading>
          </div>

          {/* Roman Arched Portrait Mask with Elegant Double Frame */}
          <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm group">
            <div className="relative p-2 sm:p-2.5 rounded-t-full rounded-b-2xl bg-white border border-stone-300/80 shadow-2xl shadow-stone-900/10">
              <div className="rounded-t-full rounded-b-xl border border-stone-200/90 overflow-hidden">
                <ArchedImage
                  src={coverImageUrl}
                  alt={coupleNames}
                  aspectRatio="3/4"
                  priority
                  className="w-full transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Subtle decorative glow beneath the portrait */}
            <div
              className="absolute -inset-2 -z-10 rounded-t-full rounded-b-3xl opacity-20 blur-xl"
              style={{ backgroundColor: accentColor }}
            />
          </div>

          {/* Date & Venue Display */}
          <div className="space-y-3 max-w-lg mx-auto">
            {weddingDate && (
              <div className="flex items-center justify-center gap-3">
                <DecorativeDivider variant="diamond" className="my-0" />
              </div>
            )}

            {weddingDate && (
              <p className="text-base sm:text-lg md:text-xl font-serif tracking-wide text-stone-800">
                {formatDate(weddingDate)}
              </p>
            )}

            {(venueName || venueCity) && (
              <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.2em] text-stone-500 font-light">
                {[venueName, venueCity].filter(Boolean).join(" • ")}
              </p>
            )}

            {/* Hydration-safe Countdown Timer */}
            {weddingDate && (
              <div className="pt-2">
                <CountdownTimer
                  targetDate={weddingDate}
                  orientation="inline-pill"
                  title="Counting down"
                  className="bg-white/90 backdrop-blur-sm border-stone-200/90 shadow-xs"
                />
              </div>
            )}
          </div>

          {children}
        </div>

        {/* Bottom Section: Scroll Cue Indicator */}
        <div className="relative z-10 pt-4 pb-2">
          <Link
            href={`#${scrollTargetId}`}
            className="group inline-flex flex-col items-center gap-1.5 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer select-none"
            aria-label={`Scroll down to ${scrollTargetId}`}
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-medium text-stone-400 group-hover:text-stone-600 transition-colors">
              Scroll To Explore
            </span>
            <div className="w-8 h-8 rounded-full border border-stone-300/80 bg-white/60 flex items-center justify-center group-hover:border-stone-400 transition-all shadow-2xs group-hover:translate-y-0.5">
              <ChevronDown className="w-4 h-4 text-stone-600 animate-bounce" />
            </div>
          </Link>
        </div>
      </header>
    );
  }
);

VeronaHero.displayName = "VeronaHero";

