"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Clock, Sparkles } from "lucide-react";
import { Wish } from "../data/weddingData";
import { EnvelopeCover } from "./EnvelopeCover";
import { Countdown } from "./Countdown";
import { EventTimeline } from "./EventTimeline";
import { VenueMap } from "./VenueMap";
import { Gallery } from "./Gallery";
import { RsvpForm } from "./RsvpForm";
import { WishesWall } from "./WishesWall";
import { Footer } from "./Footer";
import { MusicPlayer, MusicPlayerHandle } from "./MusicPlayer";
import { getTemplateBySlug, getTemplateById } from "@/data/sampleTemplates";

export interface WeddingCardData {
  slug: string;
  templateThemeId?: string;
  groomName: string;
  brideName: string;
  namesFormatted: string;
  monogram: string;
  eventTitle: string;
  eventSubtitle: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  googleMapsUrl: string;
  dressCodeTitle: string;
  dressCodeDetails: string;
  rsvpDeadline: string;
  phoneContact: string;
  tagline: string;
  hashtag: string;
  coverImage: string;
}

interface WeddingCardViewProps {
  card: WeddingCardData;
}

export const WeddingCardView: React.FC<WeddingCardViewProps> = ({ card }) => {
  const template = getTemplateBySlug(card.slug) || (card.templateThemeId ? getTemplateById(card.templateThemeId) : undefined);
  const theme = template?.theme;
  const gradientBg = theme?.gradientBg || "from-[#0d4637] via-[#062c22] to-[#031712]";
  const envelopeGradient = theme?.envelopeGradient;
  const stampBg = theme?.stampBg;
  const [isOpened, setIsOpened] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const musicPlayerRef = useRef<MusicPlayerHandle | null>(null);

  const isBlankPixel =
    !card.coverImage ||
    card.coverImage.length < 200 ||
    card.coverImage.includes("iVBORw0KGgo") ||
    card.coverImage.trim() === "";

  const resolvedCoverImage = isBlankPixel
    ? (card.slug.includes("sajedul") || card.namesFormatted?.toLowerCase().includes("sajedul")
        ? "/images/sajedul-and-sadia.jpg"
        : (template?.coverImage || "/images/default-couple.jpg"))
    : card.coverImage;

  // Disable automatic scroll restoration
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  // Fetch initial wishes for this specific card
  useEffect(() => {
    fetch(`/api/rsvp?cardSlug=${card.slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.wishes) {
          const mapped: Wish[] = data.wishes.map(
            (w: { _id?: string; name: string; message: string; createdAt?: string }) => ({
              id: w._id || Math.random().toString(),
              name: w.name,
              message: w.message,
              timestamp: w.createdAt
                ? new Date(w.createdAt).toLocaleDateString("en-GB")
                : "Recent",
              attending: true,
            })
          );
          setWishes(mapped);
        }
      })
      .catch(() => {});
  }, [card.slug]);

  // Lock scroll while envelope is closed
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
    musicPlayerRef.current?.startAudio();

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
    <main className={`min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${gradientBg} text-[#fcfbf7] selection:bg-amber-400/30`}>
      {/* 1. CLOSED ENVELOPE ENTRY SCREEN */}
      {!isOpened && (
        <EnvelopeCover
          onOpen={handleEnvelopeOpen}
          coupleNames={card.namesFormatted}
          monogram={card.monogram}
          envelopeGradient={envelopeGradient}
          stampBg={stampBg}
          weddingDate={new Date(card.eventDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          coverImage={resolvedCoverImage}
        />
      )}

      {/* 2. FLOATING MUSIC TOGGLE BUTTON */}
      <MusicPlayer ref={musicPlayerRef} isVisible={isOpened} />

      {/* 3. MAIN UNFOLDED INVITATION CONTENT CONTAINER */}
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
                {card.monogram}
              </div>

              <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-amber-300/80 font-sans font-medium mb-3">
                {card.eventTitle}
              </span>

              {/* Names in elegant serif script */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-amber-100 font-light tracking-wide leading-tight drop-shadow-sm">
                {card.namesFormatted}
              </h1>

              {/* Full names subtitle */}
              <p className="font-serif text-sm sm:text-base text-amber-200/90 italic mt-1.5">
                {card.groomName} & {card.brideName}
              </p>

              {/* Delicate Gold Flourish / Divider */}
              <div className="flex items-center justify-center gap-3 my-4 sm:my-5 w-full">
                <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-r from-transparent to-amber-300/60" />
                <Heart className="w-4 h-4 text-amber-300 fill-amber-300/40" />
                <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-l from-transparent to-amber-300/60" />
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed max-w-md sm:max-w-lg mx-auto">
                {card.tagline}
              </p>

              {/* Date & Venue Headline */}
              <div className="mt-5 py-2 px-5 rounded-full bg-amber-400/10 border border-amber-300/30 text-amber-200 text-xs sm:text-sm font-sans tracking-wider flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {new Date(card.eventDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{card.eventTime}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-300/80 font-sans mt-2 tracking-wide font-medium flex items-center gap-1.5 justify-center">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>
                  {card.venueName}, {card.venueCity}
                </span>
              </p>
            </motion.div>
          </header>

          {/* Hero Couple Photo Card */}
          <section className="w-full px-4 sm:px-6 md:px-8 py-4 max-w-5xl mx-auto" aria-label="Couple Portrait">
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden border-2 border-amber-300/40 shadow-2xl group bg-emerald-950">
              <Image
                src={resolvedCoverImage}
                alt={`${card.namesFormatted} celebrating their blessed union`}
                fill
                priority
                unoptimized={resolvedCoverImage.startsWith("data:")}
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
          <Countdown targetDateISO={card.eventDate} />

          {/* 5. OUR STORY TIMELINE & EVENT SCHEDULE */}
          <EventTimeline />

          {/* 6. VENUE MAP & DIRECTIONS */}
          <VenueMap />

          {/* 7. PHOTO GALLERY */}
          <Gallery />

          {/* 8. INTERACTIVE RSVP FORM */}
          <RsvpForm onWishAdded={handleWishAdded} cardSlug={card.slug} />

          {/* 9. WISHES WALL (GUESTBOOK) */}
          <WishesWall wishes={wishes} />

          {/* 10. FOOTER */}
          <Footer />
        </div>
      </div>
    </main>
  );
};
