"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  RoyalPalanquinDoliCrest,
  JaaliLatticeCornerBorder,
  PinkRoseGarlandDivider,
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

export interface Template19Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template19: React.FC<Template19Props> = ({
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
    title: "Sacred Wedding Ceremony & Doli",
    date: data.weddingDate,
    time: "11:00 AM – 3:30 PM",
    venueName: "The Grand Royal Palace & Lawns",
    address: "74 Heritage Avenue, Grand Pavilion",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#FDF2F8] text-[#500724] font-sans antialiased overflow-x-hidden box-border transition-colors duration-500 ${className}`}
      style={{
        backgroundImage: `radial-gradient(#F59E0B22 1.5px, transparent 1.5px), radial-gradient(#BE185D12 1px, #FDF2F8 1px)`,
        backgroundSize: "26px 26px, 26px 26px",
        backgroundPosition: "0 0, 13px 13px",
      }}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#BE185D] text-white hover:bg-[#9D174D] shadow-lg border border-[#F59E0B]"
        />
      )}

      {/* Interactive Wax Seal Opener Curtain */}
      {!isOpen ? (
        <div className="min-h-screen flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-b from-[#831843] via-[#BE185D] to-[#500724] text-[#FFF1F2] relative z-20 max-w-2xl mx-auto">
          <JaaliLatticeCornerBorder position="top-left" size={90} goldColor="#FDE68A" pinkColor="#FFF1F2" />
          <JaaliLatticeCornerBorder position="top-right" size={90} goldColor="#FDE68A" pinkColor="#FFF1F2" />
          <JaaliLatticeCornerBorder position="bottom-left" size={90} goldColor="#FDE68A" pinkColor="#FFF1F2" />
          <JaaliLatticeCornerBorder position="bottom-right" size={90} goldColor="#FDE68A" pinkColor="#FFF1F2" />

          {/* Top header badge */}
          <div className="text-center pt-6 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#F59E0B]/50 text-xs uppercase tracking-widest text-[#FDE68A] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              Shubh Vivah & Doli Matrimony
            </span>
            <p className="text-xs text-[#FCE7F3] tracking-widest uppercase font-serif mt-2">
              Wedding Invitation
            </p>
          </div>

          {/* Center Palanquin Doli Wax Seal Button */}
          <div className="flex flex-col items-center my-auto cursor-pointer group" onClick={() => setIsOpen(true)}>
            <div className="relative flex items-center justify-center p-2 rounded-full transition-transform duration-500 group-hover:scale-105 active:scale-95">
              {/* Outer pulsing gold glow */}
              <div className="absolute inset-0 rounded-full bg-[#F59E0B]/30 blur-xl animate-pulse" />

              {/* Wax Seal Disk */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#BE185D] via-[#9D174D] to-[#700A34] border-4 border-[#F59E0B] shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center">
                <div className="absolute inset-1 rounded-full border border-[#FDE68A]/40" />
                <RoyalPalanquinDoliCrest size={62} primaryColor="#FDE68A" goldColor="#F59E0B" />
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
          <JaaliLatticeCornerBorder position="top-left" size={80} goldColor="#F59E0B" pinkColor="#BE185D" />
          <JaaliLatticeCornerBorder position="top-right" size={80} goldColor="#F59E0B" pinkColor="#BE185D" />
          <JaaliLatticeCornerBorder position="bottom-left" size={80} goldColor="#F59E0B" pinkColor="#BE185D" />
          <JaaliLatticeCornerBorder position="bottom-right" size={80} goldColor="#F59E0B" pinkColor="#BE185D" />

          {/* Auspicious Inscription & Shlok */}
          <div className="text-center space-y-2 max-w-xs mt-3">
            <p className="text-sm font-serif tracking-widest text-[#BE185D] font-bold">
              || ੴ ਸਤਿਗੁਰ ਪ੍ਰਸਾਦਿ ||
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#BE185D]/10 border border-[#BE185D]/30 text-[11px] font-semibold tracking-wider text-[#BE185D] uppercase">
              <Sparkles className="w-3 h-3 text-[#F59E0B]" />
              <span>Royal Punjabi Vivah & Doli</span>
            </div>
          </div>

          {/* Palanquin Doli Crest */}
          <div className="my-4 flex flex-col items-center">
            <RoyalPalanquinDoliCrest size={120} primaryColor="#BE185D" goldColor="#F59E0B" />
          </div>

          {/* Cordial Invitation Intro */}
          <div className="text-center space-y-1.5 mt-2 max-w-md">
            <p className="text-xs uppercase tracking-widest text-[#BE185D] font-semibold">
              Together with their families
            </p>
            <p className="text-xs sm:text-sm text-[#701A75] italic leading-relaxed">
              cordially invite you to celebrate the joyous wedding celebration & doli of
            </p>
          </div>

          {/* Couple Typography */}
          <div className="text-center my-6 space-y-2">
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#831843] tracking-wide leading-tight">
              {data.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
              <span className="font-serif italic text-2xl sm:text-3xl text-[#F59E0B] font-bold">&</span>
              <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#831843] tracking-wide leading-tight">
              {data.brideName}
            </h1>
          </div>

          {/* Tagline / Blessings Verse */}
          <div className="w-full max-w-xl text-center px-6 py-4 rounded-2xl bg-white/70 border border-[#BE185D]/20 shadow-sm backdrop-blur-sm mb-4">
            <p className="text-xs sm:text-sm italic text-[#701A75] leading-relaxed">
              &ldquo;{data.tagline || "Two hearts joined in love and sacred bonds, stepping into eternity together."}&rdquo;
            </p>
          </div>

          <PinkRoseGarlandDivider pinkColor="#BE185D" goldColor="#F59E0B" />

          {/* Countdown Timer */}
          <div className="w-full max-w-2xl my-4">
            <div className="p-5 sm:p-6 rounded-3xl bg-white/80 border border-[#BE185D]/30 shadow-md backdrop-blur-sm text-center">
              <p className="text-xs uppercase tracking-widest text-[#BE185D] font-bold mb-3 flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4 text-[#F59E0B]" />
                Countdown to Grand Doli
              </p>
              <CountdownTimer
                targetDate={data.countdownTarget}
                accentColor="#BE185D"
                className="py-1"
              />
            </div>
          </div>

          <PinkRoseGarlandDivider pinkColor="#BE185D" goldColor="#F59E0B" />

          {/* Wedding Itinerary & Events */}
          <div className="w-full max-w-4xl space-y-4 my-6">
            <div className="text-center space-y-1 mb-6">
              <h3 className="text-sm sm:text-base uppercase tracking-widest text-[#BE185D] font-bold flex items-center justify-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#F59E0B]" />
                Wedding Festivities Itinerary
              </h3>
              <p className="text-xs sm:text-sm text-[#701A75] italic">Join us for every auspicious milestone</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left w-full box-border">
              {data.events.map((evt, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-2xl bg-white/85 border border-[#BE185D]/25 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col justify-between w-full box-border break-words min-w-0"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#F59E0B] to-[#BE185D]" />
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#831843] break-words min-w-0">
                        {evt.title}
                      </h4>
                      <span className="text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full bg-[#BE185D]/10 text-[#BE185D] font-semibold whitespace-nowrap shrink-0">
                        {evt.date.split(",")[0] || "Celebration"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#701A75]">
                      <Clock className="w-4 h-4 text-[#F59E0B] shrink-0" />
                      <span>{evt.time}</span>
                    </div>

                    <div className="flex items-start gap-2 text-xs sm:text-sm text-[#701A75]">
                      <MapPin className="w-4 h-4 text-[#BE185D] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <p className="font-semibold text-[#831843] break-words">{evt.venueName}</p>
                        <p className="text-[11px] sm:text-xs text-[#701A75]/90 break-words">{evt.address}</p>
                      </div>
                    </div>

                    {evt.description && (
                      <p className="text-xs italic text-[#701A75]/90 pt-1 border-t border-[#BE185D]/10 break-words">
                        {evt.description}
                      </p>
                    )}
                  </div>

                  {/* Navigation & Directions Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 mt-4 border-t border-[#BE185D]/15 w-full">
                    <a
                      href={evt.mapsUrl || `https://maps.google.com/?q=${encodeURIComponent(evt.venueName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#BE185D] text-white text-xs font-semibold hover:bg-[#9D174D] transition shadow-xs text-center"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#FDE68A]" />
                      <span>Google Maps</span>
                    </a>
                    <a
                      href={`https://waze.com/ul?q=${encodeURIComponent(evt.venueName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-[#BE185D]/30 text-[#831843] text-xs font-semibold hover:bg-[#FDF2F8] transition text-center"
                    >
                      <Compass className="w-3.5 h-3.5 text-[#F59E0B]" />
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
                  title: `${data.groomName} & ${data.brideName}'s Wedding & Doli`,
                  description: `Wedding celebration and Doli matrimony ceremony at ${primaryEvent.venueName}`,
                  location: `${primaryEvent.venueName}, ${primaryEvent.address}`,
                  startDate: data.countdownTarget,
                  endDate: data.countdownTarget,
                }}
                className="bg-[#BE185D] text-white hover:bg-[#9D174D] border border-[#F59E0B] shadow-sm text-xs font-semibold py-2 px-5 rounded-full"
              />
            </div>
          </div>

          <PinkRoseGarlandDivider pinkColor="#BE185D" goldColor="#F59E0B" />

          {/* Couple Photo Gallery */}
          {data.gallery && data.gallery.length > 0 && (
            <div className="w-full max-w-4xl my-6 space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-sm sm:text-base uppercase tracking-widest text-[#BE185D] font-bold flex items-center justify-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  Treasured Moments
                </h3>
                <p className="text-xs sm:text-sm text-[#701A75] italic">Snapshots of our journey</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {data.gallery.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#BE185D]/30 shadow-sm group hover:scale-[1.02] transition-transform duration-300"
                  >
                    <Image
                      src={img}
                      alt={`Couple photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#500724]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <PinkRoseGarlandDivider pinkColor="#BE185D" goldColor="#F59E0B" />

          {/* Interactive RSVP Form */}
          <div className="w-full max-w-2xl my-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#BE185D]/30 shadow-md backdrop-blur-sm text-left">
              <div className="text-center space-y-1 mb-6">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#831843]">
                  Confirm Your Presence
                </h3>
                <p className="text-xs sm:text-sm text-[#701A75] italic">
                  Please grace us with your presence and warm blessings
                </p>
              </div>

              {rsvpState.submitted ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-[#BE185D]/10 border border-[#BE185D]/30 flex items-center justify-center mx-auto text-[#BE185D]">
                    <Heart className="w-6 h-6 fill-[#BE185D]" />
                  </div>
                  <h4 className="font-serif font-bold text-[#831843]">
                    Thank You, {rsvpState.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#701A75]">
                    Your RSVP response has been received with heartfelt gratitude.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#831843] mb-1">
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
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#FDF2F8] border border-[#BE185D]/30 text-[#500724] focus:outline-none focus:border-[#BE185D]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#831843] mb-1">
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
                              ? "bg-[#BE185D] text-white border-[#BE185D] shadow-sm"
                              : "bg-[#FDF2F8] text-[#831843] border-[#BE185D]/20 hover:border-[#BE185D]"
                          }`}
                        >
                          {opt === "yes" ? "Attending" : opt === "no" ? "Regret" : "Maybe"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#831843] mb-1">
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
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#FDF2F8] border border-[#BE185D]/30 text-[#500724] focus:outline-none focus:border-[#BE185D]"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#831843] mb-1">
                      Blessings & Warm Message
                    </label>
                    <textarea
                      rows={3}
                      value={rsvpState.message}
                      onChange={(e) =>
                        setRsvpState((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder="Leave a heartfelt wish for the couple..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl bg-[#FDF2F8] border border-[#BE185D]/30 text-[#500724] focus:outline-none focus:border-[#BE185D]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#BE185D] via-[#9D174D] to-[#831843] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-98 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send RSVP Response</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Footer Note & Blessing */}
          <div className="w-full max-w-xl text-center mt-6 mb-4 space-y-1">
            <p className="text-xs sm:text-sm font-serif italic text-[#701A75]">
              With Warm Regards & Best Compliments
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#831843] tracking-wide">
              {data.parentsGroom} & {data.parentsBride}
            </p>
            {data.hashtag && (
              <p className="text-xs font-mono text-[#BE185D] font-semibold pt-1">
                {data.hashtag}
              </p>
            )}
          </div>
        </main>
      )}
    </div>
  );
};
