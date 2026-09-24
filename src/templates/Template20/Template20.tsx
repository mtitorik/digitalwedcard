"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  BismillahMihrabCrest,
  ArabesqueDamaskCorner,
  GoldenCrescentFiligreeDivider,
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

export interface Template20Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template20: React.FC<Template20Props> = ({
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
    title: "Auspicious Nikah Ceremony",
    date: data.weddingDate,
    time: "05:00 PM – 07:30 PM",
    venueName: "The Grand Royal Mosque Pavilion",
    address: "88 Imperial Gardens, Silk Way",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#FFF1F2] text-[#3B0B14] font-sans antialiased overflow-x-hidden box-border transition-colors duration-500 ${className}`}
      style={{
        backgroundImage: `radial-gradient(#D4AF3725 1.5px, transparent 1.5px), radial-gradient(#88133715 1px, #FFF1F2 1px)`,
        backgroundSize: "28px 28px, 28px 28px",
        backgroundPosition: "0 0, 14px 14px",
      }}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#881337] text-white hover:bg-[#70102D] shadow-lg border border-[#D4AF37]"
        />
      )}

      {/* Interactive Wax Seal Opener Curtain */}
      {!isOpen ? (
        <div className="min-h-screen flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-b from-[#4C0519] via-[#881337] to-[#3B0B14] text-[#FFF1F2] relative z-20 max-w-2xl mx-auto">
          <ArabesqueDamaskCorner position="top-left" size={90} goldColor="#FDE68A" maroonColor="#FFF1F2" />
          <ArabesqueDamaskCorner position="top-right" size={90} goldColor="#FDE68A" maroonColor="#FFF1F2" />
          <ArabesqueDamaskCorner position="bottom-left" size={90} goldColor="#FDE68A" maroonColor="#FFF1F2" />
          <ArabesqueDamaskCorner position="bottom-right" size={90} goldColor="#FDE68A" maroonColor="#FFF1F2" />

          {/* Top header badge */}
          <div className="text-center pt-6 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/50 text-xs uppercase tracking-widest text-[#FDE68A] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Sacred Nikah & Walima Matrimony
            </span>
            <p className="text-xs text-[#FFE4E6] tracking-widest uppercase font-serif mt-2">
              Wedding E-Invitation
            </p>
          </div>

          {/* Center Bismillah & Mihrab Wax Seal Button */}
          <div className="flex flex-col items-center my-auto cursor-pointer group" onClick={() => setIsOpen(true)}>
            <div className="relative flex items-center justify-center p-2 rounded-full transition-transform duration-500 group-hover:scale-105 active:scale-95">
              {/* Outer pulsing gold glow */}
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/35 blur-xl animate-pulse" />

              {/* Wax Seal Disk */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#881337] via-[#70102D] to-[#4C0519] border-4 border-[#D4AF37] shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center">
                <div className="absolute inset-1 rounded-full border border-[#FDE68A]/40" />
                <BismillahMihrabCrest size={62} primaryColor="#FDE68A" goldColor="#D4AF37" />
                <span className="text-[9px] sm:text-[10px] font-serif uppercase tracking-widest text-[#FDE68A] font-bold mt-1">
                  Open
                </span>
              </div>
            </div>

            <p className="text-sm font-serif text-[#FDE68A] tracking-wider mt-4 animate-bounce">
              Tap Seal to Open Invitation
            </p>
          </div>

          {/* Bottom Names */}
          <div className="text-center pb-6 space-y-1">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
              {data.groomName.split(" ")[0]} & {data.brideName.split(" ")[0]}
            </h2>
            <p className="text-xs sm:text-sm text-[#FDE68A] font-serif tracking-widest">
              {data.weddingDate}
            </p>
          </div>
        </div>
      ) : (
        /* Main Wedding Invitation Card Content */
        <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 flex flex-col items-center animate-fadeIn">
          {/* Four Decorative Corner Borders */}
          <ArabesqueDamaskCorner position="top-left" size={80} goldColor="#D4AF37" maroonColor="#881337" />
          <ArabesqueDamaskCorner position="top-right" size={80} goldColor="#D4AF37" maroonColor="#881337" />
          <ArabesqueDamaskCorner position="bottom-left" size={80} goldColor="#D4AF37" maroonColor="#881337" />
          <ArabesqueDamaskCorner position="bottom-right" size={80} goldColor="#D4AF37" maroonColor="#881337" />

          {/* Sacred Calligraphy Inscription */}
          <div className="text-center space-y-2 max-w-xs mt-3">
            <p className="text-base sm:text-lg font-serif tracking-widest text-[#881337] font-bold">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#881337]/10 border border-[#881337]/30 text-[11px] font-semibold tracking-wider text-[#881337] uppercase">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>In the Name of Allah, Most Gracious, Most Merciful</span>
            </div>
          </div>

          {/* Mihrab Crest */}
          <div className="my-4 flex flex-col items-center">
            <BismillahMihrabCrest size={120} primaryColor="#881337" goldColor="#D4AF37" />
          </div>

          {/* Cordial Invitation Intro */}
          <div className="text-center space-y-1.5 mt-2 max-w-md">
            <p className="text-xs uppercase tracking-widest text-[#881337] font-semibold">
              Together with their families
            </p>
            <p className="text-xs sm:text-sm text-[#500724] italic leading-relaxed">
              request the honor of your presence and warm prayers at the sacred Nikah & Walima of
            </p>
          </div>

          {/* Couple Typography */}
          <div className="text-center my-6 space-y-2">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#881337] tracking-wide leading-tight">
              {data.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              <span className="font-serif italic text-2xl sm:text-3xl text-[#D4AF37] font-bold">&</span>
              <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#881337] tracking-wide leading-tight">
              {data.brideName}
            </h1>
          </div>

          {/* Quranic Verse */}
          <div className="w-full max-w-xl text-center px-6 py-4 rounded-2xl bg-white/75 border border-[#881337]/20 shadow-sm backdrop-blur-sm mb-4">
            <p className="text-xs sm:text-sm italic text-[#500724] leading-relaxed">
              &ldquo;{data.greetingVerse || "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them."}&rdquo;
            </p>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#881337] font-semibold mt-1">
              — Surah Ar-Rum 30:21
            </p>
          </div>

          <GoldenCrescentFiligreeDivider goldColor="#D4AF37" maroonColor="#881337" />

          {/* Countdown Timer */}
          <div className="w-full max-w-2xl my-4">
            <div className="p-5 sm:p-6 rounded-3xl bg-white/80 border border-[#881337]/30 shadow-md backdrop-blur-sm text-center">
              <p className="text-xs uppercase tracking-widest text-[#881337] font-bold mb-3 flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                Countdown to Sacred Nikah
              </p>
              <CountdownTimer
                targetDate={data.countdownTarget}
                accentColor="#881337"
                className="py-1"
              />
            </div>
          </div>

          <GoldenCrescentFiligreeDivider goldColor="#D4AF37" maroonColor="#881337" />

          {/* Wedding Itinerary & Events */}
          <div className="w-full max-w-4xl space-y-4 my-6">
            <div className="text-center space-y-1 mb-6">
              <h3 className="text-sm sm:text-base uppercase tracking-widest text-[#881337] font-bold flex items-center justify-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                Ceremony & Celebration Itinerary
              </h3>
              <p className="text-xs sm:text-sm text-[#500724] italic">Join us for every blessed occasion</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left w-full box-border">
              {data.events.map((evt, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-2xl bg-white/85 border border-[#881337]/25 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col justify-between w-full box-border break-words min-w-0"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#D4AF37] to-[#881337]" />
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#881337] break-words min-w-0">
                        {evt.title}
                      </h4>
                      <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-[#881337]/10 text-[#881337] font-semibold whitespace-nowrap shrink-0">
                        {evt.date.split(",")[0] || "Celebration"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#500724]">
                      <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{evt.time}</span>
                    </div>

                    <div className="flex items-start gap-2 text-xs sm:text-sm text-[#500724]">
                      <MapPin className="w-4 h-4 text-[#881337] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#881337] break-words">{evt.venueName}</p>
                        <p className="text-[11px] sm:text-xs text-[#500724]/90 break-words">{evt.address}</p>
                      </div>
                    </div>

                    {evt.description && (
                      <p className="text-xs italic text-[#500724]/90 pt-1 border-t border-[#881337]/10 break-words">
                        {evt.description}
                      </p>
                    )}
                  </div>

                  {/* Navigation & Directions Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 mt-4 border-t border-[#881337]/15 w-full">
                    <a
                      href={evt.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(evt.venueName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#881337] text-white text-xs font-semibold hover:bg-[#70102D] transition shadow-xs text-center"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#FDE68A]" />
                      <span>Google Maps</span>
                    </a>
                    <a
                      href={`https://waze.com/ul?q=${encodeURIComponent(evt.venueName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-[#881337]/30 text-[#881337] text-xs font-semibold hover:bg-[#FFF1F2] transition text-center"
                    >
                      <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Waze</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Add to Calendar Button */}
            <div className="flex justify-center pt-4">
              <AddToCalendar
                event={{
                  title: `${data.groomName} & ${data.brideName}'s Sacred Nikah`,
                  description: `Nikah solemnization ceremony and celebration feast at ${primaryEvent.venueName}`,
                  location: `${primaryEvent.venueName}, ${primaryEvent.address}`,
                  startDate: data.countdownTarget,
                  endDate: data.countdownTarget,
                }}
                className="bg-[#881337] text-white hover:bg-[#70102D] border border-[#D4AF37] shadow-sm text-xs font-semibold py-2 px-5 rounded-full"
              />
            </div>
          </div>

          <GoldenCrescentFiligreeDivider goldColor="#D4AF37" maroonColor="#881337" />

          {/* Couple Photo Gallery */}
          {data.gallery && data.gallery.length > 0 && (
            <div className="w-full max-w-4xl my-6 space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-sm sm:text-base uppercase tracking-widest text-[#881337] font-bold flex items-center justify-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  Cherished Memories
                </h3>
                <p className="text-xs sm:text-sm text-[#500724] italic">Moments captured in time</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {data.gallery.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#881337]/30 shadow-sm group hover:scale-[1.02] transition-transform duration-300"
                  >
                    <Image
                      src={img}
                      alt={`Couple photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3B0B14]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <GoldenCrescentFiligreeDivider goldColor="#D4AF37" maroonColor="#881337" />

          {/* Interactive RSVP Form */}
          <div className="w-full max-w-2xl my-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#881337]/30 shadow-md backdrop-blur-sm text-left">
              <div className="text-center space-y-1 mb-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#881337]">
                  RSVP & Warm Wishes
                </h3>
                <p className="text-xs sm:text-sm text-[#500724] italic">
                  Please honor us with your kind confirmation and prayers
                </p>
              </div>

              {rsvpState.submitted ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#881337]/10 border border-[#881337]/30 flex items-center justify-center mx-auto text-[#881337]">
                    <Heart className="w-6 h-6 fill-[#881337]" />
                  </div>
                  <h4 className="font-serif font-bold text-[#881337]">
                    JazakAllah Khair, {rsvpState.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#500724]">
                    Your RSVP response has been received with warm gratitude.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#881337] mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpState.name}
                      onChange={(e) =>
                        setRsvpState((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Enter your name"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#FFF1F2] border border-[#881337]/30 text-[#3B0B14] focus:outline-none focus:border-[#881337]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#881337] mb-1">
                      Will You Attend?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                      {(["yes", "no", "maybe"] as const).map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() =>
                            setRsvpState((prev) => ({ ...prev, attending: opt }))
                          }
                          className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border transition ${
                            rsvpState.attending === opt
                              ? "bg-[#881337] text-white border-[#881337] shadow-sm"
                              : "bg-[#FFF1F2] text-[#881337] border-[#881337]/20 hover:border-[#881337]"
                          }`}
                        >
                          {opt === "yes" ? "Attending" : opt === "no" ? "Regret" : "Maybe"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#881337] mb-1">
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
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#FFF1F2] border border-[#881337]/30 text-[#3B0B14] focus:outline-none focus:border-[#881337]"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#881337] mb-1">
                      Warm Duas & Greetings
                    </label>
                    <textarea
                      rows={3}
                      value={rsvpState.message}
                      onChange={(e) =>
                        setRsvpState((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder="Leave a prayer or congratulatory wish..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#FFF1F2] border border-[#881337]/30 text-[#3B0B14] focus:outline-none focus:border-[#881337]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#881337] via-[#70102D] to-[#4C0519] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send RSVP Response</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Footer Note & Dua */}
          <div className="w-full max-w-xl text-center mt-6 mb-4 space-y-1">
            <p className="text-xs sm:text-sm font-serif italic text-[#500724]">
              With Warm Regards & Sincere Prayers
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#881337] tracking-wide">
              {data.parentsGroom} & {data.parentsBride}
            </p>
            {data.hashtag && (
              <p className="text-xs font-mono text-[#881337] font-semibold pt-1">
                {data.hashtag}
              </p>
            )}
          </div>
        </main>
      )}
    </div>
  );
};
