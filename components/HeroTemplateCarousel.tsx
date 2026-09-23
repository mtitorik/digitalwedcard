"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Heart,
  Palette,
  MapPin,
  Calendar,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { SAMPLE_TEMPLATES, SampleWeddingTemplate } from "@/data/sampleTemplates";

interface CarouselTemplateItem {
  id: string;
  slug: string;
  templateThemeId: string;
  name: string;
  category: string;
  tag: string;
  groom: string;
  bride: string;
  dateHeadline: string;
  venueHeadline: string;
  coverImage: string;
  gradientBg: string;
  envelopeGradient: string;
  stampBg: string;
  monogram: string;
  accentColor: string;
}

const CAROUSEL_ITEMS: CarouselTemplateItem[] = [
  {
    id: "royal-emerald",
    slug: "sajedul-and-sadia",
    templateThemeId: "royal-emerald",
    name: "Royal Emerald & Gold",
    category: "Royal Heritage",
    tag: "3D Wax Seal Envelope",
    groom: "Sajedul",
    bride: "Sadia",
    dateHeadline: "Tuesday, December 29, 2026",
    venueHeadline: "Phoenix Convention Hall, Dhaka",
    coverImage: "/images/sajedul-and-sadia.jpg",
    gradientBg: "from-[#0d4637] via-[#062c22] to-[#031712]",
    envelopeGradient: "from-[#0d4536] via-[#062c22] to-[#031712]",
    stampBg: "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600",
    monogram: "S & S",
    accentColor: "#f59e0b",
  },
  {
    id: "midnight-velvet",
    slug: "aayan-and-zoya",
    templateThemeId: "midnight-velvet",
    name: "Midnight Velvet & Rose Gold",
    category: "Modern Luxury",
    tag: "Midnight Bi-Fold Card",
    groom: "Aayan",
    bride: "Zoya",
    dateHeadline: "Friday, January 15, 2027",
    venueHeadline: "Radisson Blu Water Garden, Dhaka",
    coverImage: "/images/default-couple.jpg",
    gradientBg: "from-[#0c1527] via-[#070b15] to-[#03050a]",
    envelopeGradient: "from-[#0f1d38] via-[#0a1324] to-[#050912]",
    stampBg: "bg-gradient-to-br from-rose-300 via-rose-500 to-amber-400",
    monogram: "A & Z",
    accentColor: "#fb7185",
  },
  {
    id: "blush-romance",
    slug: "farhan-and-anika",
    templateThemeId: "blush-romance",
    name: "Blush Romance & Petal Ivory",
    category: "Floral & Romantic",
    tag: "Petal Confetti Gatefold",
    groom: "Farhan",
    bride: "Anika",
    dateHeadline: "Saturday, February 14, 2027",
    venueHeadline: "The Westin Grand Ballroom, Dhaka",
    coverImage: "/images/default-couple.jpg",
    gradientBg: "from-[#2e1219] via-[#1b0a0f] to-[#0d0407]",
    envelopeGradient: "from-[#3b1721] via-[#240e15] to-[#12060b]",
    stampBg: "bg-gradient-to-br from-rose-200 via-pink-400 to-amber-300",
    monogram: "F & A",
    accentColor: "#f472b6",
  },
  {
    id: "sapphire-starlight",
    slug: "tanvir-and-nusrat",
    templateThemeId: "sapphire-starlight",
    name: "Sapphire Starlight & Platinum",
    category: "Celestial & Regal",
    tag: "Celestial Star Foil",
    groom: "Tanvir",
    bride: "Nusrat",
    dateHeadline: "Thursday, March 25, 2027",
    venueHeadline: "InterContinental Grand Ballroom, Dhaka",
    coverImage: "/images/default-couple.jpg",
    gradientBg: "from-[#091e36] via-[#051120] to-[#02070d]",
    envelopeGradient: "from-[#0e2c4f] via-[#08182b] to-[#030b14]",
    stampBg: "bg-gradient-to-br from-slate-200 via-cyan-300 to-blue-500",
    monogram: "T & N",
    accentColor: "#38bdf8",
  },
  {
    id: "terracotta-sunset",
    slug: "riyad-and-mehnaz",
    templateThemeId: "terracotta-sunset",
    name: "Terracotta Sunset & Amber Glow",
    category: "Boho & Earthy",
    tag: "Boho Sunset Parchment",
    groom: "Riyad",
    bride: "Mehnaz",
    dateHeadline: "Sunday, April 18, 2027",
    venueHeadline: "Sayeman Beach Resort, Cox's Bazar",
    coverImage: "/images/default-couple.jpg",
    gradientBg: "from-[#33180c] via-[#1d0d06] to-[#0f0602]",
    envelopeGradient: "from-[#452010] via-[#261108] to-[#140803]",
    stampBg: "bg-gradient-to-br from-amber-400 via-orange-500 to-red-600",
    monogram: "R & M",
    accentColor: "#fb923c",
  },
  {
    id: "marigold-festive",
    slug: "imran-and-nafisa",
    templateThemeId: "marigold-festive",
    name: "Marigold Festive & Turmeric Gala",
    category: "Festive Holud",
    tag: "Gaye Holud Celebration",
    groom: "Imran",
    bride: "Nafisa",
    dateHeadline: "Friday, May 7, 2027",
    venueHeadline: "Le Méridien Infinity Ballroom, Dhaka",
    coverImage: "/images/default-couple.jpg",
    gradientBg: "from-[#332205] via-[#1c1302] to-[#0d0901]",
    envelopeGradient: "from-[#452e07] via-[#241803] to-[#120c01]",
    stampBg: "bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500",
    monogram: "I & N",
    accentColor: "#facc15",
  },
];

export const HeroTemplateCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-advance carousel every 5.5s unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  const activeItem = CAROUSEL_ITEMS[currentIndex];

  return (
    <div
      className="relative w-full max-w-5xl mx-auto py-8 sm:py-12 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Ambient Glow matching current theme */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[450px] rounded-full blur-[100px] pointer-events-none opacity-40 transition-colors duration-700"
        style={{ backgroundColor: activeItem.accentColor }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Template Information & Actions */}
        <div className="lg:col-span-6 text-center lg:text-left space-y-5 px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeItem.category}</span>
            <span className="text-amber-400/40">•</span>
            <span className="text-amber-200/90">{activeItem.tag}</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-100 leading-tight">
            {activeItem.name}
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-md mx-auto lg:mx-0">
            Crafted with deep jewel-toned gradients, simulated 3D wax seal animations, custom gold monogram foil,
            harp music playback, and one-tap guest RSVP tracking.
          </p>

          {/* Quick Template Specs */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 pt-2 text-left">
            <div className="p-3 rounded-xl bg-black/40 border border-amber-400/20">
              <p className="text-[10px] text-amber-400/70 uppercase tracking-widest font-sans font-semibold">
                Event Format
              </p>
              <p className="text-xs font-serif text-amber-200 font-medium mt-0.5 truncate">
                Grand Wedding & Reception
              </p>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-amber-400/20">
              <p className="text-[10px] text-amber-400/70 uppercase tracking-widest font-sans font-semibold">
                Animation Style
              </p>
              <p className="text-xs font-serif text-amber-200 font-medium mt-0.5 truncate">
                3D Folded Wax Seal
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
            <Link
              href={`/card/${activeItem.slug}`}
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-sm tracking-wider uppercase shadow-xl shadow-amber-900/40 hover:brightness-110 active:scale-95 transition-all min-h-[48px]"
            >
              <Eye className="w-4 h-4" />
              <span>Live Preview</span>
            </Link>

            <Link
              href={`/dashboard?template=${activeItem.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950/80 border border-amber-400/40 text-amber-200 font-serif font-semibold text-sm hover:bg-amber-400/15 hover:text-amber-100 transition-all min-h-[48px]"
            >
              <Palette className="w-4 h-4 text-amber-400" />
              <span>Use This Template</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Realistic Smartphone Mockup Preview */}
        <div className="lg:col-span-6 flex items-center justify-center px-4">
          <div className="relative w-[280px] sm:w-[320px] aspect-[9/18.5] bg-neutral-900 rounded-[44px] p-3 shadow-2xl shadow-black/90 ring-1 ring-white/20 border-4 border-stone-800">
            {/* Phone Speaker Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center gap-2 pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-900" />
              <div className="w-8 h-1 rounded-full bg-stone-800" />
            </div>

            {/* Inner Phone Screen */}
            <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-black flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className={`w-full h-full bg-gradient-to-b ${activeItem.gradientBg} flex flex-col justify-between p-4 pt-10 text-center relative overflow-hidden`}
                >
                  {/* Subtle Gold Frame Lines */}
                  <div className="absolute inset-2 border border-amber-400/30 rounded-2xl pointer-events-none" />

                  {/* Header Monogram & Subtitle */}
                  <div className="space-y-1 relative z-10">
                    <div className="w-10 h-10 rounded-full border border-amber-300/40 bg-black/30 flex items-center justify-center mx-auto text-amber-300 font-serif text-xs font-bold shadow-md">
                      {activeItem.monogram}
                    </div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-amber-300/80 font-sans font-semibold">
                      Wedding Invitation
                    </p>
                  </div>

                  {/* Middle: 3D Envelope Wax Seal Medallion Graphic */}
                  <div className="my-auto relative z-10 py-3">
                    <div className="relative w-44 h-32 mx-auto rounded-xl bg-gradient-to-b from-black/40 via-black/20 to-black/50 border border-amber-400/40 shadow-inner flex flex-col items-center justify-center p-3 overflow-hidden group">
                      <div className="absolute inset-0 bg-radial-[at_center] from-amber-400/10 via-transparent to-transparent" />
                      {/* Wax Seal */}
                      <div
                        className={`w-14 h-14 rounded-full ${activeItem.stampBg} shadow-lg shadow-black/80 flex items-center justify-center border-2 border-amber-200/50 relative z-20`}
                      >
                        <Heart className="w-6 h-6 text-white/95 fill-white/80" />
                      </div>
                      <p className="text-[10px] text-amber-200 font-serif italic mt-2.5">
                        Touch to Open Envelope
                      </p>
                    </div>

                    <h4 className="font-serif text-2xl font-bold text-amber-100 tracking-wide mt-3">
                      {activeItem.groom} & {activeItem.bride}
                    </h4>
                  </div>

                  {/* Footer Phone Info */}
                  <div className="space-y-1.5 relative z-10 pb-2">
                    <div className="py-1 px-2.5 rounded-full bg-black/40 border border-amber-400/25 inline-flex items-center gap-1.5 text-[10px] text-amber-200/90 font-sans">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      <span className="truncate max-w-[190px]">{activeItem.dateHeadline}</span>
                    </div>
                    <p className="text-[9px] text-amber-400/70 font-sans flex items-center justify-center gap-1 truncate">
                      <MapPin className="w-2.5 h-2.5 text-amber-400" />
                      <span>{activeItem.venueHeadline}</span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls: Arrows & Indicators */}
      <div className="flex items-center justify-between max-w-sm mx-auto mt-8 px-4">
        {/* Previous Button (Min 44x44px touch target) */}
        <button
          onClick={handlePrev}
          aria-label="Previous template"
          className="w-11 h-11 rounded-full bg-emerald-950/80 border border-amber-400/40 text-amber-300 hover:text-amber-100 hover:bg-amber-400/20 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Pagination Indicator Dots */}
        <div className="flex items-center gap-2">
          {CAROUSEL_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Jump to ${item.name}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-8 bg-gradient-to-r from-amber-400 to-amber-500 shadow-md shadow-amber-400/40"
                  : "w-2.5 bg-amber-400/30 hover:bg-amber-400/50"
              }`}
            />
          ))}
        </div>

        {/* Next Button (Min 44x44px touch target) */}
        <button
          onClick={handleNext}
          aria-label="Next template"
          className="w-11 h-11 rounded-full bg-emerald-950/80 border border-amber-400/40 text-amber-300 hover:text-amber-100 hover:bg-amber-400/20 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-lg"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
