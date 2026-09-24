"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  TropicalWaveSunburstCrest,
  PalmFrondCorner,
  CoastalWaveDivider,
} from "./Decorations";
import { WaxSealEnvelope } from "@/components/common/WaxSealEnvelope";
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

export interface Template15Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template15: React.FC<Template15Props> = ({
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
    title: "Sunset Beach Matrimony",
    date: data.weddingDate,
    time: "4:30 PM – 8:30 PM",
    venueName: "Azure Cove Beach Resort & Dunes",
    address: "100 Ocean Shore Boulevard",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#ECFEFF] text-[#164E63] font-sans antialiased overflow-x-hidden transition-colors duration-500 ${className}`}
      style={{
        backgroundImage: `radial-gradient(#0E749015 1.5px, transparent 1.5px), radial-gradient(#D4AF3715 1px, #ECFEFF 1px)`,
        backgroundSize: "24px 24px, 24px 24px",
        backgroundPosition: "0 0, 12px 12px",
      }}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#0E7490] text-white hover:bg-[#155E75] shadow-lg border border-[#D4AF37]"
        />
      )}

      {/* Interactive Coastal Tropical Wax Seal & 3D Gatefold Unfolding Experience */}
      <WaxSealEnvelope
        isOpenDefault={isEnvelopeOpenDefault}
        groomName={data.groomName}
        brideName={data.brideName}
        weddingDate={data.weddingDate}
        primaryColor="#0E7490"
        secondaryColor="#D4AF37"
        backgroundColor="#164E63"
        textColor="#FEF08A"
        wreathComponent={
          <TropicalWaveSunburstCrest className="w-48 h-48 sm:w-56 sm:h-56 animate-[spin_60s_linear_infinite]" />
        }
        cornerDecorations={
          <>
            <div className="absolute top-4 left-3 sm:left-8 pointer-events-none opacity-75">
              <PalmFrondCorner className="w-14 h-14 sm:w-20 sm:h-20" />
            </div>
            <div className="absolute top-4 right-3 sm:right-8 pointer-events-none opacity-75">
              <PalmFrondCorner flipX className="w-14 h-14 sm:w-20 sm:h-20" />
            </div>
          </>
        }
      >
        {/* MAIN OPENED INVITATION CONTENT */}
        <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 flex flex-col items-center animate-fadeIn">
          {/* Subtle Corner Accents */}
          <div className="pointer-events-none absolute top-4 left-3 sm:left-8 z-10 opacity-75">
            <PalmFrondCorner className="w-14 h-14 sm:w-20 sm:h-20" />
          </div>
          <div className="pointer-events-none absolute top-4 right-3 sm:right-8 z-10 opacity-75">
            <PalmFrondCorner flipX className="w-14 h-14 sm:w-20 sm:h-20" />
          </div>

          <div className="w-full text-center flex flex-col items-center">
            {/* Header Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CFFAFE]/80 border border-[#0E7490]/30 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#0E7490] mb-3">
              <span>Under Sun, Sea &amp; Sky</span>
            </div>

            {/* Couple Typography */}
            <div className="mb-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-[#164E63] tracking-tight drop-shadow-xs">
                {data.groomName}
              </h1>
              <div className="flex items-center justify-center gap-3 my-2">
                <span className="w-8 sm:w-16 h-[1px] bg-[#D4AF37]" />
                <span className="text-2xl sm:text-3xl font-serif italic text-[#0E7490]">&amp;</span>
                <span className="w-8 sm:w-16 h-[1px] bg-[#D4AF37]" />
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-[#164E63] tracking-tight drop-shadow-xs">
                {data.brideName}
              </h2>
            </div>

            <CoastalWaveDivider className="mb-6 max-w-md" />

            {/* Parents' Cordial Invitation Card */}
            <div className="w-full max-w-2xl bg-[#F0FDFA] border border-[#0E7490]/25 rounded-2xl p-6 sm:p-8 shadow-xs mb-8 text-center">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#0E7490] font-bold mb-2">
                Cordially Invite You
              </p>
              <p className="text-base sm:text-lg font-serif text-[#164E63] leading-relaxed mb-3">
                <span className="font-bold text-[#0E7490]">{data.parentsGroom}</span>
                <span className="block text-xs font-sans text-stone-500 my-0.5">and</span>
                <span className="font-bold text-[#0E7490]">{data.parentsBride}</span>
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal max-w-xl mx-auto">
                Request the pleasure of your presence to celebrate the coastal wedding union of their beloved children.
              </p>
            </div>

            {/* Date & Time Badge */}
            <div className="w-full max-w-xl bg-gradient-to-r from-[#CFFAFE]/80 via-[#CCFBF1]/70 to-[#CFFAFE]/80 border border-[#0E7490]/30 rounded-xl p-4 sm:p-5 mb-8 flex items-center justify-around text-center shadow-xs">
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#0E7490]">
                  Wedding Day
                </span>
                <span className="text-sm sm:text-base font-serif font-bold text-[#164E63]">
                  {data.weddingDate}
                </span>
              </div>
              <div className="w-[1px] h-10 bg-[#0E7490]/30" />
              <div>
                <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#0E7490]">
                  Sunset Ceremony
                </span>
                <span className="text-sm sm:text-base font-serif font-bold text-[#155E75]">
                  {primaryEvent.time || "4:30 PM"}
                </span>
              </div>
            </div>

            {/* COUNTDOWN TIMER */}
            <div className="w-full max-w-md mb-10">
              <CountdownTimer
                targetDate={data.countdownTarget}
                title="Days Until Sunset Vows"
                accentColor="#0E7490"
                textColor="#164E63"
                secondaryTextColor="#0E7490"
                borderColor="#D4AF37"
              />
            </div>

            {/* COUPLE PHOTO GALLERY */}
            {data.gallery && data.gallery.length > 0 && (
              <div className="w-full max-w-4xl mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="w-8 sm:w-16 h-[1px] bg-[#D4AF37]" />
                  <span className="text-xs sm:text-sm font-serif uppercase tracking-[0.2em] text-[#0E7490] font-bold">
                    Moments in Paradise
                  </span>
                  <span className="w-8 sm:w-16 h-[1px] bg-[#D4AF37]" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {data.gallery.slice(0, 4).map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden border border-[#0E7490]/40 shadow-sm group"
                    >
                      <Image
                        src={src}
                        alt={`Beach wedding moment ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#164E63]/30 to-transparent" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EVENT SCHEDULE */}
            <div className="w-full max-w-4xl mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-8 sm:w-16 h-[1px] bg-[#D4AF37]" />
                <h3 className="text-sm sm:text-base font-serif font-bold uppercase tracking-[0.2em] text-[#164E63]">
                  Wedding Itinerary
                </h3>
                <span className="w-8 sm:w-16 h-[1px] bg-[#D4AF37]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left w-full box-border">
                {data.events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="w-full box-border bg-[#F0FDFA] border border-[#0E7490]/25 rounded-2xl p-4 sm:p-6 shadow-xs hover:border-[#0E7490] transition flex flex-col justify-between break-words min-w-0"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="min-w-0 flex-1">
                          <span className="inline-block px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#CFFAFE] text-[#0E7490] mb-1">
                            {idx === 0 ? "Beach Ceremony" : "Oceanview Dinner"}
                          </span>
                          <h4 className="text-base sm:text-lg font-serif font-bold text-[#164E63] break-words">
                            {evt.title}
                          </h4>
                        </div>
                        <div className="p-2 rounded-full bg-[#CFFAFE] text-[#0E7490] shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="space-y-2 text-xs sm:text-sm text-stone-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span className="break-words">{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span className="break-words">{evt.time}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#0E7490] mt-0.5 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-stone-800 break-words">{evt.venueName}</p>
                            <p className="text-[11px] sm:text-xs text-stone-500 break-words">{evt.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 border-t border-[#0E7490]/15 mt-auto">
                      <a
                        href={evt.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#0E7490] text-white text-xs font-semibold hover:bg-[#155E75] transition shadow-xs text-center"
                      >
                        <Navigation className="w-3.5 h-3.5 shrink-0" />
                        <span>Google Maps</span>
                      </a>
                      <a
                        href={`https://ul.waze.com/ul?q=${encodeURIComponent(evt.venueName + " " + evt.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-white border border-[#0E7490]/30 text-[#164E63] text-xs font-semibold hover:bg-stone-50 transition text-center"
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
                    title: `${data.groomName} & ${data.brideName}'s Beach Wedding`,
                    description: `Coastal Wedding Ceremony of ${data.groomName} and ${data.brideName}.`,
                    location: `${primaryEvent.venueName}, ${primaryEvent.address}`,
                    startDate: data.countdownTarget,
                  }}
                  className="bg-[#F0FDFA] text-[#0E7490] border border-[#0E7490]/30 shadow-xs hover:bg-[#CFFAFE]/50"
                />
              </div>
            </div>

            {/* INTERACTIVE RSVP SECTION */}
            {data.rsvp.enabled && (
              <div className="w-full max-w-2xl mb-12 bg-[#F0FDFA] border-2 border-[#0E7490]/30 rounded-2xl p-6 sm:p-8 shadow-sm text-left">
                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#CFFAFE] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#0E7490] mb-2">
                    RSVP by the Shore
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#164E63]">
                    Join Us in Paradise
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Kindly respond by {data.rsvp.deadline}
                  </p>
                </div>

                {rsvpState.submitted ? (
                  <div className="p-6 rounded-xl bg-cyan-50 border border-cyan-300 text-center text-cyan-900">
                    <Heart className="w-8 h-8 mx-auto text-[#0E7490] mb-2 fill-[#0E7490] animate-bounce" />
                    <p className="text-sm font-bold">Mahalo &amp; Thank You, {rsvpState.name}!</p>
                    <p className="text-xs mt-1">
                      Your presence by the sea has been recorded with delight.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#164E63] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpState.name}
                        onChange={(e) =>
                          setRsvpState((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="e.g. Liam & Maya Thorne"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0E7490]/30 bg-white text-xs sm:text-sm text-[#164E63] focus:outline-none focus:ring-1 focus:ring-[#0E7490]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#164E63] mb-1">
                        Will You Attend?
                      </label>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {(["yes", "maybe", "no"] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              setRsvpState((prev) => ({ ...prev, attending: opt }))
                            }
                            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold capitalize transition border ${
                              rsvpState.attending === opt
                                ? "bg-[#0E7490] text-white border-[#0E7490]"
                                : "bg-white text-stone-700 border-stone-200 hover:bg-[#CFFAFE]/40"
                            }`}
                          >
                            {opt === "yes"
                              ? "Joining"
                              : opt === "maybe"
                              ? "Undecided"
                              : "Regretfully"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {rsvpState.attending !== "no" && (
                      <div>
                        <label className="block text-xs font-semibold text-[#164E63] mb-1">
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#0E7490]/30 bg-white text-xs sm:text-sm text-[#164E63] focus:outline-none focus:ring-1 focus:ring-[#0E7490]"
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
                      <label className="block text-xs font-semibold text-[#164E63] mb-1">
                        Warm Wishes
                      </label>
                      <textarea
                        rows={3}
                        value={rsvpState.message}
                        onChange={(e) =>
                          setRsvpState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        placeholder="Share your warm thoughts with the couple..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#0E7490]/30 bg-white text-xs sm:text-sm text-[#164E63] focus:outline-none focus:ring-1 focus:ring-[#0E7490]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0E7490] to-[#155E75] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-xs hover:from-[#155E75] hover:to-[#164E63] transition flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm Attendance</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* BOTTOM BLESSING */}
            <div className="w-full max-w-xl text-center py-6">
              <CoastalWaveDivider className="mx-auto mb-4 max-w-sm" />
              <p className="text-xs sm:text-sm font-serif italic text-stone-500">
                &ldquo;As boundless as the ocean, as timeless as the tide.&rdquo;
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-[#0E7490] uppercase tracking-widest mt-2">
                # {data.groomName}And{data.brideName}AtSea
              </p>
            </div>
          </div>
        </main>
      </WaxSealEnvelope>
    </div>
  );
};
