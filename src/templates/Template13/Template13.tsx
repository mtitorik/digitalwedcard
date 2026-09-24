"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  SingleStemBlossomCrest,
  MinimalGoldCorner,
  SubtleGoldDivider,
} from "./Decorations";
import {
  MapPin,
  Clock,
  Calendar,
  Send,
  Heart,
  Sparkles,
  Navigation,
  Compass,
} from "lucide-react";

export interface Template13Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template13: React.FC<Template13Props> = ({
  data = MOCK_INVITE_DATA,
  className = "",
  isEnvelopeOpenDefault = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isEnvelopeOpenDefault);
  const [rsvpState, setRsvpState] = useState<{
    name: string;
    attending: "yes" | "no" | "maybe";
    guests: number;
    message: string;
    submitted: boolean;
  }>({
    name: "",
    attending: "yes",
    guests: 2,
    message: "",
    submitted: false,
  });

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpState.name.trim()) return;
    setRsvpState((prev) => ({ ...prev, submitted: true }));
  };

  const primaryEvent = data.events[0] || {
    title: "The Wedding Celebration",
    date: data.weddingDate,
    time: "11:00 AM – 3:00 PM",
    venueName: "The Glass Pavilion & Botanical Estate",
    address: "88 Orchid Valley Way",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#FFFFFA] text-[#1C1917] font-sans antialiased overflow-x-hidden transition-colors duration-500 ${className}`}
      style={{
        backgroundImage: `radial-gradient(#D9770615 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
      }}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#D97706] text-white hover:bg-[#B45309] shadow-lg border border-[#FEF3C7]"
        />
      )}

      {/* ENVELOPE / MINIMALIST SEAL COVER */}
      {!isOpen ? (
        <div className="min-h-screen flex flex-col justify-between items-center p-6 sm:p-10 text-center relative z-20 max-w-2xl mx-auto">
          <div className="w-full pt-4 flex justify-between items-center opacity-60">
            <MinimalGoldCorner className="w-10 h-10 sm:w-16 sm:h-16" />
            <MinimalGoldCorner flipX className="w-10 h-10 sm:w-16 sm:h-16" />
          </div>

          <div className="my-auto py-8 flex flex-col items-center max-w-md">
            {/* Minimal Badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7]/60 border border-[#D97706]/30 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#D97706]">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Wedding Invitation</span>
            </div>

            {/* Single Stem Botanical Artwork */}
            <div className="relative mb-4 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#FEF3C7] rounded-full blur-xl opacity-60" />
              <SingleStemBlossomCrest className="w-36 h-36 sm:w-48 sm:h-48 drop-shadow-sm" />
            </div>

            <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#D97706] font-bold mb-2">
              Save The Date
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#1C1917] mb-2 tracking-tight">
              {data.groomName}
              <span className="block text-xl sm:text-2xl font-normal text-[#D97706] my-0.5">&amp;</span>
              {data.brideName}
            </h1>

            <p className="text-xs sm:text-sm text-stone-500 font-medium mb-6">
              {data.weddingDate}
            </p>

            {/* Minimal Gold Seal CTA */}
            <button
              onClick={() => setIsOpen(true)}
              className="group relative flex flex-col items-center focus:outline-none transition transform active:scale-95"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#D97706] to-[#F59E0B] p-0.5 shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                <div className="w-full h-full rounded-full border border-[#FFFFFA] bg-[#D97706] flex flex-col items-center justify-center text-[#FFFFFA]">
                  <span className="text-xs sm:text-sm font-serif font-bold tracking-widest leading-none">
                    {data.groomName[0]}&amp;{data.brideName[0]}
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-[#FEF3C7] mt-0.5">
                    Open
                  </span>
                </div>
              </div>
              <span className="mt-3 text-xs sm:text-sm tracking-wider font-semibold uppercase text-[#D97706] group-hover:text-[#B45309] transition flex items-center gap-1.5">
                <span>View Invitation</span>
                <Heart className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
              </span>
            </button>
          </div>

          <div className="w-full pb-4 flex justify-between items-center opacity-60">
            <MinimalGoldCorner flipY className="w-10 h-10 sm:w-16 sm:h-16" />
            <MinimalGoldCorner flipX flipY className="w-10 h-10 sm:w-16 sm:h-16" />
          </div>
        </div>
      ) : (
        /* MAIN OPENED INVITATION CONTENT */
        <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 flex flex-col items-center animate-fadeIn">
          {/* Subtle Corner Accents */}
          <div className="pointer-events-none absolute top-4 left-4 z-10 opacity-70">
            <MinimalGoldCorner className="w-14 h-14 sm:w-20 sm:h-20" />
          </div>
          <div className="pointer-events-none absolute top-4 right-4 z-10 opacity-70">
            <MinimalGoldCorner flipX className="w-14 h-14 sm:w-20 sm:h-20" />
          </div>

          <div className="w-full text-center flex flex-col items-center">
            {/* Header Tag */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FEF3C7]/40 border border-[#D97706]/30 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#D97706] mb-3">
              <span>Together with their families</span>
            </div>

            {/* Couple Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#1C1917] tracking-tight mb-2">
              {data.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-1">
              <span className="w-8 sm:w-12 h-[1px] bg-[#D97706]/50" />
              <span className="text-xl sm:text-2xl font-serif italic text-[#D97706]">&amp;</span>
              <span className="w-8 sm:w-12 h-[1px] bg-[#D97706]/50" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#1C1917] tracking-tight mb-4">
              {data.brideName}
            </h2>

            <SubtleGoldDivider className="w-48 sm:w-64 mb-6" />

            {/* Parents & Family Cordial Invitation Card */}
            <div className="bg-[#FAFDF7] border border-stone-200/80 rounded-2xl p-6 sm:p-8 shadow-xs w-full max-w-2xl mb-6 text-center">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#84CC16] font-bold mb-2">
                Cordially Invite You
              </p>
              <p className="text-base sm:text-lg font-serif text-[#1C1917] leading-relaxed mb-3">
                <span className="font-semibold text-stone-800">{data.parentsGroom}</span>
                <span className="block text-xs sm:text-sm font-sans text-stone-500 my-1">and</span>
                <span className="font-semibold text-stone-800">{data.parentsBride}</span>
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal max-w-lg mx-auto">
                Request the pleasure of your company as their children celebrate their love and exchange wedding vows.
              </p>
            </div>

            {/* Date & Time Badge */}
            <div className="w-full max-w-xl bg-[#FAFDF7] border border-[#D97706]/30 rounded-2xl p-4 sm:p-5 mb-8 flex items-center justify-around text-center shadow-xs">
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#D97706]">
                  Wedding Date
                </span>
                <span className="text-xs sm:text-base font-serif font-semibold text-[#1C1917]">
                  {data.weddingDate}
                </span>
              </div>
              <div className="w-[1px] h-8 sm:h-10 bg-[#D97706]/30" />
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#D97706]">
                  Ceremony Time
                </span>
                <span className="text-xs sm:text-base font-serif font-semibold text-[#1C1917]">
                  {primaryEvent.time || "11:00 AM"}
                </span>
              </div>
            </div>

            {/* COUNTDOWN TIMER */}
            <div className="w-full max-w-md mb-8">
              <CountdownTimer
                targetDate={data.countdownTarget}
                title="Countdown to Forever"
                accentColor="#D97706"
                textColor="#1C1917"
                secondaryTextColor="#D97706"
                borderColor="#D97706"
              />
            </div>

            {/* COUPLE PHOTO GALLERY */}
            {data.gallery && data.gallery.length > 0 && (
              <div className="w-full max-w-4xl mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="w-8 sm:w-12 h-[1px] bg-[#D97706]/40" />
                  <span className="text-xs sm:text-sm font-serif uppercase tracking-[0.2em] text-[#D97706]">
                    Cherished Memories
                  </span>
                  <span className="w-8 sm:w-12 h-[1px] bg-[#D97706]/40" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {data.gallery.slice(0, 4).map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm group"
                    >
                      <Image
                        src={src}
                        alt={`Couple moment ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EVENT SCHEDULE */}
            <div className="w-full max-w-4xl mb-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-8 sm:w-12 h-[1px] bg-[#D97706]/40" />
                <h3 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-[0.2em] text-[#1C1917]">
                  Celebration Schedule
                </h3>
                <span className="w-8 sm:w-12 h-[1px] bg-[#D97706]/40" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left w-full box-border">
                {data.events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="w-full box-border bg-[#FAFDF7] border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-xs hover:border-[#D97706]/60 transition break-words min-w-0"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0 flex-1">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FEF3C7] text-[#D97706] mb-1">
                          Part 0{idx + 1}
                        </span>
                        <h4 className="text-base sm:text-lg font-serif font-bold text-[#1C1917] break-words">
                          {evt.title}
                        </h4>
                      </div>
                      <div className="p-2 rounded-full bg-[#FEF3C7]/60 text-[#D97706] shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs sm:text-sm text-stone-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                        <span className="break-words">{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                        <span className="break-words">{evt.time}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#D97706] mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-stone-800 break-words">{evt.venueName}</p>
                          <p className="text-xs text-stone-500 break-words">{evt.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 border-t border-stone-200/60">
                      <a
                        href={evt.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#D97706] text-white text-xs font-semibold hover:bg-[#B45309] transition shadow-xs text-center"
                      >
                        <Navigation className="w-3.5 h-3.5 shrink-0" />
                        <span>Google Maps</span>
                      </a>
                      <a
                        href={`https://ul.waze.com/ul?q=${encodeURIComponent(evt.venueName + " " + evt.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#FFFFFA] border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition text-center"
                      >
                        <Compass className="w-3.5 h-3.5 shrink-0" />
                        <span>Waze</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add to Calendar */}
              <div className="mt-6 flex justify-center">
                <AddToCalendar
                  event={{
                    title: `${data.groomName} & ${data.brideName}'s Wedding`,
                    description: `Wedding Ceremony of ${data.groomName} and ${data.brideName}.`,
                    location: `${primaryEvent.venueName}, ${primaryEvent.address}`,
                    startDate: data.countdownTarget,
                  }}
                  className="bg-[#FAFDF7] text-[#D97706] border border-stone-300 shadow-xs hover:bg-[#FEF3C7]/40"
                />
              </div>
            </div>

            {/* INTERACTIVE RSVP SECTION */}
            {data.rsvp.enabled && (
              <div className="w-full max-w-2xl mb-8 bg-[#FAFDF7] border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
                <div className="text-center mb-5">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-[#FEF3C7] text-[10px] font-bold uppercase tracking-wider text-[#D97706] mb-1">
                    RSVP
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1C1917]">
                    Will You Celebrate With Us?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Kindly respond by {data.rsvp.deadline}
                  </p>
                </div>

                {rsvpState.submitted ? (
                  <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-center text-amber-900">
                    <Heart className="w-8 h-8 mx-auto text-[#D97706] mb-2 fill-[#D97706] animate-pulse" />
                    <p className="text-sm font-bold">Thank You, {rsvpState.name}!</p>
                    <p className="text-xs sm:text-sm mt-1">
                      Your RSVP response has been recorded with warmth.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#1C1917] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpState.name}
                        onChange={(e) =>
                          setRsvpState((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="e.g. David & Sarah Miller"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#FFFFFA] text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#D97706]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#1C1917] mb-1">
                        Attendance
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {(["yes", "maybe", "no"] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              setRsvpState((prev) => ({ ...prev, attending: opt }))
                            }
                            className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-semibold capitalize transition border ${
                              rsvpState.attending === opt
                                ? "bg-[#D97706] text-white border-[#D97706]"
                                : "bg-[#FFFFFA] text-stone-700 border-stone-200 hover:bg-[#FEF3C7]/40"
                            }`}
                          >
                            {opt === "yes"
                              ? "Attending"
                              : opt === "maybe"
                              ? "Tentative"
                              : "Decline"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {rsvpState.attending !== "no" && (
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-[#1C1917] mb-1">
                          Number of Guests
                        </label>
                        <select
                          value={rsvpState.guests}
                          onChange={(e) =>
                            setRsvpState((prev) => ({
                              ...prev,
                              guests: parseInt(e.target.value, 10),
                            }))
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#FFFFFA] text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#D97706]"
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#1C1917] mb-1">
                        Warm Wishes
                      </label>
                      <textarea
                        rows={2}
                        value={rsvpState.message}
                        onChange={(e) =>
                          setRsvpState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        placeholder="Leave a message for the couple..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#FFFFFA] text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#D97706]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#D97706] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-xs hover:bg-[#B45309] transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send RSVP</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* BOTTOM BLESSING */}
            <div className="w-full max-w-2xl text-center py-6">
              <SubtleGoldDivider className="w-36 sm:w-48 mx-auto mb-3" />
              <p className="text-xs sm:text-sm font-serif italic text-stone-500">
                &ldquo;Where there is love, there is life.&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#D97706] uppercase tracking-widest mt-2">
                # {data.groomName}And{data.brideName}
              </p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
