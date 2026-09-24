"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  MinimalistGoldGaneshaCrest,
  BrushedGoldCornerFrame,
  HairlineGoldDivider,
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

export interface Template17Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template17: React.FC<Template17Props> = ({
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
    title: "Solemnization & Wedding Banquet",
    date: data.weddingDate,
    time: "6:00 PM – 10:30 PM",
    venueName: "The Grand Estate Conservatory",
    address: "12 Heritage Oaks Lane",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#FAF7F2] text-[#1C1917] font-sans antialiased overflow-x-hidden box-border transition-colors duration-500 ${className}`}
      style={{
        backgroundImage: `radial-gradient(#CA8A0418 1px, transparent 1px)`,
        backgroundSize: "22px 22px",
      }}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#78350F] text-white hover:bg-[#5E2B0C] shadow-lg border border-[#CA8A04]"
        />
      )}

      {/* ENVELOPE / MINIMAL EMBOSSED CARD COVER */}
      {!isOpen ? (
        <div className="min-h-screen flex flex-col justify-between items-center p-6 sm:p-10 text-center relative z-20 max-w-2xl mx-auto">
          <div className="w-full pt-4 flex justify-between items-center opacity-70">
            <BrushedGoldCornerFrame className="w-12 h-12 sm:w-16 sm:h-16" />
            <BrushedGoldCornerFrame flipX className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>

          <div className="my-auto flex flex-col items-center max-w-sm sm:max-w-md">
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFE6] border border-[#CA8A04]/30 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#78350F]">
              <Sparkles className="w-3 h-3 text-[#CA8A04]" />
              <span>Wedding Invitation</span>
            </div>

            <div className="relative mb-4 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#CA8A04]/15 rounded-full blur-xl animate-pulse" />
              <MinimalistGoldGaneshaCrest className="w-36 h-36 sm:w-48 sm:h-48 drop-shadow-sm" />
            </div>

            <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#CA8A04] font-bold mb-2">
              With Auspicious Blessings
            </p>

            <h1 className="text-3xl sm:text-5xl font-serif font-light text-[#1C1917] mb-2 tracking-tight">
              {data.groomName}
              <span className="block text-xl sm:text-2xl font-normal text-[#CA8A04] my-0.5">&amp;</span>
              {data.brideName}
            </h1>

            <p className="text-xs sm:text-sm text-stone-500 font-medium mb-6">
              {data.weddingDate}
            </p>

            {/* Bronze Gold Seal CTA */}
            <button
              onClick={() => setIsOpen(true)}
              className="group relative flex flex-col items-center focus:outline-none transition transform active:scale-95"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#78350F] via-[#B45309] to-[#CA8A04] p-0.5 shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                <div className="w-full h-full rounded-full border border-[#FAF7F2] bg-[#78350F] flex flex-col items-center justify-center text-[#FAF7F2]">
                  <span className="text-xs sm:text-sm font-serif font-bold tracking-widest leading-none">
                    {data.groomName[0]}&amp;{data.brideName[0]}
                  </span>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold text-[#FEF08A] mt-0.5">
                    Open
                  </span>
                </div>
              </div>
              <span className="mt-3 text-xs sm:text-sm tracking-wider font-semibold uppercase text-[#78350F] group-hover:text-[#B45309] transition flex items-center gap-1.5">
                <span>View Invitation</span>
                <Heart className="w-3 h-3 fill-[#CA8A04] text-[#CA8A04]" />
              </span>
            </button>
          </div>

          <div className="w-full pb-4 flex justify-between items-center opacity-70">
            <BrushedGoldCornerFrame flipY className="w-12 h-12 sm:w-16 sm:h-16" />
            <BrushedGoldCornerFrame flipX flipY className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
        </div>
      ) : (
        /* MAIN OPENED INVITATION CONTENT */
        <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 flex flex-col items-center animate-fadeIn">
          {/* Subtle Corner Accents */}
          <div className="pointer-events-none absolute top-4 left-3 sm:left-8 z-10 opacity-70">
            <BrushedGoldCornerFrame className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
          <div className="pointer-events-none absolute top-4 right-3 sm:right-8 z-10 opacity-70">
            <BrushedGoldCornerFrame flipX className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>

          <div className="w-full text-center flex flex-col items-center">
            {/* Header Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFE6] border border-[#CA8A04]/30 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.25em] text-[#78350F] mb-3">
              <span>Together with their families</span>
            </div>

            {/* Couple Typography */}
            <div className="mb-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-[#1C1917] tracking-tight">
                {data.groomName}
              </h1>
              <div className="flex items-center justify-center gap-3 my-2">
                <span className="w-6 sm:w-12 h-[1px] bg-[#CA8A04]/50" />
                <span className="text-xl sm:text-2xl font-serif italic text-[#CA8A04]">&amp;</span>
                <span className="w-6 sm:w-12 h-[1px] bg-[#CA8A04]/50" />
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light text-[#1C1917] tracking-tight">
                {data.brideName}
              </h2>
            </div>

            <HairlineGoldDivider className="w-48 sm:w-72 mb-6" />

            {/* Parents' Cordial Invitation Card */}
            <div className="w-full max-w-2xl bg-[#FAF7F2] border border-[#CA8A04]/25 rounded-2xl p-6 sm:p-8 shadow-xs mb-8 text-center">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#CA8A04] font-bold mb-2">
                Cordially Invite You
              </p>
              <p className="text-base sm:text-lg font-serif text-[#1C1917] leading-relaxed mb-3">
                <span className="font-semibold text-[#78350F]">{data.parentsGroom}</span>
                <span className="block text-xs font-sans text-stone-500 my-0.5">and</span>
                <span className="font-semibold text-[#78350F]">{data.parentsBride}</span>
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal max-w-xl mx-auto">
                Request the honour of your presence at the celebration of the marriage of their children.
              </p>
            </div>

            {/* Date & Time Badge */}
            <div className="w-full max-w-xl bg-[#FAF7F2] border border-[#CA8A04]/30 rounded-xl p-4 sm:p-5 mb-8 flex items-center justify-around text-center shadow-xs">
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#CA8A04]">
                  Wedding Date
                </span>
                <span className="text-sm sm:text-base font-serif font-semibold text-[#1C1917]">
                  {data.weddingDate}
                </span>
              </div>
              <div className="w-[1px] h-8 bg-[#CA8A04]/30" />
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#CA8A04]">
                  Reception Hour
                </span>
                <span className="text-sm sm:text-base font-serif font-semibold text-[#78350F]">
                  {primaryEvent.time || "6:00 PM"}
                </span>
              </div>
            </div>

            {/* COUNTDOWN TIMER */}
            <div className="w-full max-w-2xl mb-10 bg-[#FAF7F2] border border-[#CA8A04]/25 rounded-2xl p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#78350F] mb-4">
                <Clock className="w-4 h-4 text-[#CA8A04]" />
                <span>Days to Celebrate</span>
              </div>
              <CountdownTimer
                targetDate={data.countdownTarget}
                title="Days to Celebrate"
                accentColor="#78350F"
                className="p-0"
              />
            </div>

            {/* COUPLE PHOTO GALLERY */}
            {data.gallery && data.gallery.length > 0 && (
              <div className="w-full max-w-4xl mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="w-6 sm:w-12 h-[1px] bg-[#CA8A04]/40" />
                  <span className="text-xs sm:text-sm font-serif uppercase tracking-[0.2em] text-[#78350F] font-semibold">
                    Captured Moments
                  </span>
                  <span className="w-6 sm:w-12 h-[1px] bg-[#CA8A04]/40" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {data.gallery.slice(0, 4).map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden border border-[#CA8A04]/30 shadow-xs group"
                    >
                      <Image
                        src={src}
                        alt={`Couple photo ${i + 1}`}
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
            <div className="w-full max-w-4xl mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-6 sm:w-12 h-[1px] bg-[#CA8A04]/40" />
                <h3 className="text-sm sm:text-base font-serif font-bold uppercase tracking-[0.2em] text-[#1C1917]">
                  Ceremony &amp; Banquet
                </h3>
                <span className="w-6 sm:w-12 h-[1px] bg-[#CA8A04]/40" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left w-full box-border">
                {data.events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF7F2] border border-[#CA8A04]/25 rounded-2xl p-4 sm:p-6 shadow-xs hover:border-[#CA8A04]/60 transition flex flex-col justify-between w-full box-border break-words min-w-0"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="min-w-0">
                          <span className="inline-block px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#F5EFE6] text-[#78350F] mb-1">
                            Part 0{idx + 1}
                          </span>
                          <h4 className="text-base sm:text-lg font-serif font-bold text-[#1C1917] break-words">
                            {evt.title}
                          </h4>
                        </div>
                        <div className="p-2 rounded-full bg-[#F5EFE6] text-[#CA8A04] shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="space-y-2 text-xs sm:text-sm text-stone-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#CA8A04] shrink-0" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#CA8A04] shrink-0" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#78350F] mt-0.5 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-semibold text-stone-800 break-words">{evt.venueName}</p>
                            <p className="text-[11px] sm:text-xs text-stone-500 break-words">{evt.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 border-t border-stone-200/60 mt-auto w-full">
                      <a
                        href={evt.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#78350F] text-white text-xs font-semibold hover:bg-[#5E2B0C] transition shadow-xs text-center"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Google Maps</span>
                      </a>
                      <a
                        href={`https://ul.waze.com/ul?q=${encodeURIComponent(evt.venueName + " " + evt.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#FAF7F2] border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition text-center"
                      >
                        <Compass className="w-3.5 h-3.5 text-[#78350F]" />
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
                  className="bg-[#FAF7F2] text-[#78350F] border border-stone-300 shadow-xs hover:bg-[#F5EFE6]"
                />
              </div>
            </div>

            {/* INTERACTIVE RSVP SECTION */}
            {data.rsvp.enabled && (
              <div className="w-full max-w-2xl mb-12 bg-[#FAF7F2] border border-[#CA8A04]/30 rounded-2xl p-6 sm:p-8 shadow-sm text-left">
                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#F5EFE6] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#78350F] mb-2">
                    RSVP
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1C1917]">
                    Will You Grace Us With Your Presence?
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Kindly respond by {data.rsvp.deadline}
                  </p>
                </div>

                {rsvpState.submitted ? (
                  <div className="p-6 rounded-xl bg-amber-50/80 border border-amber-200 text-center text-amber-900">
                    <Heart className="w-8 h-8 mx-auto text-[#78350F] mb-2 fill-[#78350F] animate-pulse" />
                    <p className="text-sm font-bold">Thank You, {rsvpState.name}!</p>
                    <p className="text-xs mt-1">
                      Your presence has been confirmed with warm gratitude.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpState.name}
                        onChange={(e) =>
                          setRsvpState((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="e.g. Robert & Evelyn Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#FAF7F2] text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                        Attendance
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                        {(["yes", "maybe", "no"] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              setRsvpState((prev) => ({ ...prev, attending: opt }))
                            }
                            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold capitalize transition border ${
                              rsvpState.attending === opt
                                ? "bg-[#78350F] text-white border-[#78350F]"
                                : "bg-[#FAF7F2] text-stone-700 border-stone-200 hover:bg-[#F5EFE6]"
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
                        <label className="block text-xs font-semibold text-[#1C1917] mb-1">
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#FAF7F2] text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
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
                      <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                        Warm Wishes
                      </label>
                      <textarea
                        rows={3}
                        value={rsvpState.message}
                        onChange={(e) =>
                          setRsvpState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        placeholder="Leave a heartfelt message..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#FAF7F2] text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:ring-1 focus:ring-[#78350F]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#78350F] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-xs hover:bg-[#5E2B0C] transition flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm RSVP</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* BOTTOM BLESSING */}
            <div className="w-full max-w-xl text-center py-6">
              <HairlineGoldDivider className="w-36 sm:w-48 mx-auto mb-4" />
              <p className="text-xs sm:text-sm font-serif italic text-stone-500">
                &ldquo;United in love, guided by grace.&rdquo;
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-[#78350F] uppercase tracking-widest mt-2">
                # {data.groomName}And{data.brideName}
              </p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
