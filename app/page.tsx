"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { weddingData, Wish } from "../data/weddingData";
import { EnvelopeCover } from "../components/EnvelopeCover";
import { Countdown } from "../components/Countdown";
import { EventTimeline } from "../components/EventTimeline";
import { VenueMap } from "../components/VenueMap";
import { Gallery } from "../components/Gallery";
import { RsvpForm } from "../components/RsvpForm";
import { WishesWall } from "../components/WishesWall";
import { Footer } from "../components/Footer";
import { MusicPlayer, MusicPlayerHandle } from "../components/MusicPlayer";
import { TopNavbar } from "../components/TopNavbar";

export default function WeddingCardPage() {
  const [isOpened, setIsOpened] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>(weddingData.initialWishes);
  const musicPlayerRef = useRef<MusicPlayerHandle | null>(null);

  // Disable automatic scroll restoration so page always starts from the top
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      document.title = "Digitalwedcards — Luxury Digital Wedding Invitation Platform";
    }
  }, []);

  // Prevent background scrolling while envelope is closed
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    } else {
      document.body.style.overflow = "auto";
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpened]);

  const handleEnvelopeOpen = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    setIsOpened(true);
    // Start background acoustic music safely on user interaction
    musicPlayerRef.current?.startAudio();

    // Ensure scroll is at the very top after animation
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }, 100);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }, 400);
  };

  const handleWishAdded = (newWish: Wish) => {
    setWishes((prev) => [newWish, ...prev]);
  };

  return (
    <main className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0d4637] via-[#062c22] to-[#031712] text-[#fcfbf7] selection:bg-amber-400/30">
      {/* Sleek Floating Top Navigation */}
      <TopNavbar />

      {/* 1. CLOSED ENVELOPE ENTRY SCREEN */}
      {!isOpened && (
        <EnvelopeCover
          onOpen={handleEnvelopeOpen}
          coupleNames={weddingData.couple.namesFormatted}
          monogram={weddingData.couple.monogram}
          weddingDate={weddingData.couple.dateHeadline}
          coverImage={weddingData.couple.coverImage || "/images/sajedul-and-sadia.jpg"}
        />
      )}

      {/* 2. FLOATING MUSIC TOGGLE BUTTON */}
      <MusicPlayer ref={musicPlayerRef} isVisible={isOpened} />

      {/* 3. MAIN UNFOLDED INVITATION CONTENT CONTAINER - Seamless full screen layout */}
      <div
        className={`w-full transition-opacity duration-700 ${
          isOpened ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-5xl mx-auto min-h-screen relative overflow-hidden pb-16">
          {/* Subtle gold foil top accent */}
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

          {/* Luxury decorative top emblem */}
          <header className="pt-10 sm:pt-16 md:pt-20 pb-6 px-4 sm:px-10 text-center relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isOpened ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col items-center justify-center max-w-3xl mx-auto"
            >
              {/* Couple Monogram Stamp */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-amber-300/40 bg-emerald-950 flex items-center justify-center shadow-lg mb-4 text-amber-200 font-serif font-light text-xl sm:text-2xl tracking-widest relative">
                <span className="absolute -inset-1 rounded-full border border-amber-400/20" />
                {weddingData.couple.monogram}
              </div>

              <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-amber-300/80 font-sans font-medium mb-3">
                Wedding Reception
              </span>

              {/* Names in elegant serif script */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-amber-100 font-light tracking-wide leading-tight drop-shadow-sm">
                {weddingData.couple.namesFormatted}
              </h1>

              {/* Full names subtitle */}
              <p className="font-serif text-sm sm:text-base text-amber-200/90 italic mt-1.5">
                {weddingData.couple.fullNameHeadline}
              </p>

              {/* Delicate Gold Flourish / Divider */}
              <div className="flex items-center justify-center gap-3 my-4 sm:my-5 w-full">
                <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-r from-transparent to-amber-300/60" />
                <Heart className="w-4 h-4 text-amber-300 fill-amber-300/40" />
                <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-l from-transparent to-amber-300/60" />
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-md sm:max-w-lg mx-auto">
                {weddingData.couple.tagline}
              </p>

              {/* Date & Venue Headline */}
              <div className="mt-5 py-2 px-5 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-200 text-xs sm:text-sm font-sans tracking-wider">
                {weddingData.couple.dateHeadline} • {weddingData.couple.timeHeadline}
              </div>
              <p className="text-[11px] sm:text-xs text-amber-300/80 font-sans mt-2 tracking-wide font-medium">
                {weddingData.couple.venueHeadline}
              </p>
            </motion.div>
          </header>

          {/* Hero Couple Photo Card */}
          <section className="w-full px-4 sm:px-6 md:px-8 py-4 max-w-5xl mx-auto" aria-label="Couple Portrait">
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden border-2 border-amber-300/40 shadow-2xl group bg-emerald-950">
              <Image
                src="/images/sajedul-and-sadia.jpg"
                alt="Sajedul and Sadia celebrating their blessed union"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041913]/90 via-transparent to-black/20" />

              <div className="absolute bottom-4 sm:bottom-6 left-4 right-4 text-center">
                <p className="font-serif italic text-lg sm:text-2xl text-amber-100 drop-shadow">
                  “Two souls, one heart, a lifetime of blessed togetherness.”
                </p>
              </div>
            </div>
          </section>

          {/* 4. COUNTDOWN SECTION */}
          <Countdown />

          {/* 5. OUR STORY TIMELINE & EVENT SCHEDULE */}
          <EventTimeline />

          {/* 6. VENUE MAP & DIRECTIONS */}
          <VenueMap />

          {/* 7. PHOTO GALLERY */}
          <Gallery />

          {/* 8. INTERACTIVE RSVP FORM */}
          <RsvpForm onWishAdded={handleWishAdded} />

          {/* 9. WISHES WALL (GUESTBOOK) */}
          <WishesWall wishes={wishes} />

          {/* 10. FOOTER */}
          <Footer />
        </div>
      </div>
    </main>
  );
}
