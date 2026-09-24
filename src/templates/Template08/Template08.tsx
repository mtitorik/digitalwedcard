"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  ModernDiamondCrest,
  BouquetCorner,
  AntiqueGoldDivider,
} from "./Decorations";
import {
  MapPin,
  Clock,
  Calendar,
  Send,
  Heart,
  Navigation,
  Sparkles,
} from "lucide-react";

export interface Template08Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template08: React.FC<Template08Props> = ({
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
    title: "Solemn Vows & Nuptial Ceremony",
    date: data.weddingDate,
    time: "06:00 PM",
    venueName: "The Grand Antique Linen Pavilion",
    address: "Dhaka, Bangladesh",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#FFF7ED] text-[#3F3F46] font-sans antialiased overflow-x-hidden ${className}`}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#E11D48] text-[#FFF7ED] hover:bg-[#BE123C] shadow-xl border border-[#CA8A04]"
        />
      )}

      {/* Warm Linen & Antique Gold Opener Overlay */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#9F1239] via-[#BE123C] to-[#881337] flex flex-col items-center justify-between p-6 sm:p-10 text-center text-white animate-fade-in overflow-y-auto">
          {/* Bouquet Corners */}
          <div className="absolute top-4 left-4 pointer-events-none">
            <BouquetCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#FECDD3" goldColor="#FDE047" />
          </div>
          <div className="absolute top-4 right-4 -scale-x-100 pointer-events-none">
            <BouquetCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#FECDD3" goldColor="#FDE047" />
          </div>
          <div className="absolute bottom-4 left-4 scale-y-[-1] pointer-events-none">
            <BouquetCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#FECDD3" goldColor="#FDE047" />
          </div>
          <div className="absolute bottom-4 right-4 -scale-100 pointer-events-none">
            <BouquetCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#FECDD3" goldColor="#FDE047" />
          </div>

          <div className="pt-8 sm:pt-12">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#FDE047] font-semibold">
              Wedding Invitation
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-serif tracking-wide text-white">
              {data.groomName.split(" ")[0]} &amp; {data.brideName.split(" ")[0]}
            </h2>
          </div>

          {/* Interactive Diamond Monogram Seal Button */}
          <div className="my-auto py-8 flex flex-col items-center">
            <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
              <ModernDiamondCrest className="w-48 h-48 sm:w-56 sm:h-56 animate-[spin_55s_linear_infinite]" color="#FDA4AF" goldColor="#FDE047" />

              <button
                onClick={() => setIsOpen(true)}
                aria-label="Open wedding invitation"
                className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#E11D48] via-[#F43F5E] to-[#CA8A04] text-white shadow-2xl flex flex-col items-center justify-center border-2 border-[#FDE047] transform transition-all duration-300 hover:scale-105 active:scale-95 group-hover:shadow-rose-500/40"
              >
                <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-amber-200">
                  {data.groomName[0]}&amp;{data.brideName[0]}
                </span>
                <span className="text-[9px] uppercase tracking-widest font-semibold mt-0.5 text-white/90">
                  Open
                </span>
              </button>
            </div>

            <p className="mt-6 text-xs sm:text-sm text-[#FDE047]/80 italic tracking-wider animate-pulse">
              Click the seal to unfold the invitation
            </p>
          </div>

          <div className="pb-8">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FDE047]">
              {data.weddingDate}
            </p>
          </div>
        </div>
      )}

      {/* Main Invitation Body */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 flex flex-col items-center bg-[#FFF7ED]">
        {/* Top Bouquet Corners */}
        <div className="absolute top-2 left-2 pointer-events-none z-10">
          <BouquetCorner className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#E11D48" goldColor="#CA8A04" />
        </div>
        <div className="absolute top-2 right-2 -scale-x-100 pointer-events-none z-10">
          <BouquetCorner className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#E11D48" goldColor="#CA8A04" />
        </div>

        {/* Hero Section */}
        <header className="pt-6 sm:pt-10 pb-8 px-4 text-center relative flex flex-col items-center max-w-3xl mx-auto">
          {/* Diamond Monogram Crest */}
          <div className="relative mb-3 flex items-center justify-center">
            <ModernDiamondCrest className="w-32 h-32 sm:w-40 sm:h-40" color="#E11D48" goldColor="#CA8A04" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#9F1239]">
                {data.groomName[0]} &amp; {data.brideName[0]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#E11D48] font-bold">
              Rose Quartz &amp; Warm Linen
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#CA8A04]" />
          </div>

          <h1 className="text-sm sm:text-base uppercase tracking-[0.25em] text-[#881337] mt-2 font-bold font-serif">
            A Cordial Celebration of Marriage
          </h1>

          <AntiqueGoldDivider className="w-48 sm:w-64 my-4" />

          {/* Parents Request */}
          <div className="space-y-1.5 max-w-md text-xs sm:text-sm text-[#71717A] leading-relaxed">
            <p className="font-bold text-[#18181B] tracking-wide">
              {data.parentsGroom}
            </p>
            <p className="text-xs text-[#CA8A04] italic font-serif">&amp;</p>
            <p className="font-bold text-[#18181B] tracking-wide">
              {data.parentsBride}
            </p>
            <p className="text-xs sm:text-sm text-[#71717A] pt-2 italic">
              request the honor of your presence and warm blessings as their children exchange their wedding vows
            </p>
          </div>

          {/* Couple Names */}
          <div className="my-6 sm:my-8 space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#9F1239] tracking-wide">
              {data.groomName}
            </h2>
            <div className="flex items-center justify-center gap-3 py-1">
              <span className="w-12 sm:w-16 h-[1.5px] bg-[#CA8A04]" />
              <span className="font-serif italic text-xl sm:text-2xl text-[#CA8A04] font-bold">&amp;</span>
              <span className="w-12 sm:w-16 h-[1.5px] bg-[#CA8A04]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#9F1239] tracking-wide">
              {data.brideName}
            </h2>
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FFE4E6] border border-[#FDA4AF] shadow-sm text-xs sm:text-sm tracking-wider text-[#9F1239] font-bold">
            <Calendar className="w-3.5 h-3.5 text-[#CA8A04]" />
            <span>{data.weddingDate}</span>
          </div>
        </header>

        {/* Countdown Timer Section */}
        <section
          aria-label="Wedding Countdown"
          className="my-6 sm:my-8 w-full max-w-md mx-auto px-4"
        >
          <CountdownTimer
            targetDate={data.countdownTarget}
            title="Counting Down To Forever"
            accentColor="#E11D48"
            textColor="#3F3F46"
            secondaryTextColor="#E11D48"
            borderColor="#CA8A04"
          />
        </section>

        {/* Event Itinerary / Tentative Program */}
        <section className="my-8 sm:my-10 w-full max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#CA8A04] font-bold">
              Program Schedule
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#9F1239] mt-1">
              Event Details
            </h3>
            <AntiqueGoldDivider className="w-40 mx-auto my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full box-border">
            {data.events.map((evt, idx) => (
              <div
                key={idx}
                className="w-full box-border relative flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#FED7AA] shadow-sm transition-all hover:shadow-md hover:border-[#E11D48] break-words"
              >
                <div className="flex sm:flex-col items-center gap-3 sm:gap-0 shrink-0">
                  <span className="w-10 h-10 rounded-xl bg-[#FFE4E6] text-[#9F1239] flex items-center justify-center font-bold text-sm border border-[#FDA4AF] shrink-0">
                    0{idx + 1}
                  </span>
                  {idx < data.events.length - 1 && (
                    <span className="hidden sm:block w-[1px] h-full bg-[#FED7AA] my-2" />
                  )}
                </div>

                <div className="flex-1 text-left space-y-1.5 min-w-0">
                  <h4 className="font-serif font-bold text-base text-[#9F1239] break-words">
                    {evt.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-[#E11D48] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#CA8A04] shrink-0" />
                    <span className="break-words">{evt.time}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-[#71717A]">
                    <MapPin className="w-3.5 h-3.5 text-[#CA8A04] shrink-0 mt-0.5" />
                    <span className="break-words">{evt.venueName}</span>
                  </div>

                  {evt.description && (
                    <p className="text-xs text-[#71717A] pt-1 leading-relaxed border-t border-[#FED7AA] italic break-words">
                      {evt.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Venue & Directions Card */}
        <section className="my-6 sm:my-8 w-full max-w-3xl mx-auto px-4">
          <div className="bg-white border border-[#FED7AA] rounded-3xl p-6 sm:p-8 shadow-md text-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#CA8A04] font-bold">
              Ceremony Venue
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#9F1239] mt-1">
              {primaryEvent.venueName}
            </h3>
            <p className="text-xs sm:text-sm text-[#71717A] mt-1.5 max-w-md mx-auto">
              {primaryEvent.address}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href={primaryEvent.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E11D48] text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#BE123C] transition-colors shadow-sm active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FDE047]" />
                <span>Get Directions</span>
              </a>

              <AddToCalendar
                event={{
                  title: `Wedding: ${data.groomName} & ${data.brideName}`,
                  description: `Join us for the wedding ceremony of ${data.groomName} and ${data.brideName}.`,
                  location: `${primaryEvent.venueName}, ${primaryEvent.address}`,
                  startDate: data.countdownTarget,
                }}
                buttonText="Save Date"
                className="text-xs sm:text-sm"
              />
            </div>
          </div>
        </section>

        {/* Photo Gallery Grid */}
        {data.gallery && data.gallery.length > 0 && (
          <section className="my-8 sm:my-10 w-full max-w-4xl mx-auto px-4">
            <div className="text-center mb-6">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#CA8A04] font-bold">
                Moments of Romance
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#9F1239]">
                Captured Moments
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {data.gallery.slice(0, 4).map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#FDA4AF] group"
                >
                  <Image
                    src={imgUrl}
                    alt={`Wedding gallery preview ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 250px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#881337]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interactive RSVP Form */}
        {data.rsvp.enabled && (
          <section className="my-8 sm:my-10 w-full max-w-2xl mx-auto px-4">
            <div className="bg-white border border-[#FED7AA] rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="text-center mb-6">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#E11D48] font-bold">
                  Warm Hospitality
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#9F1239] mt-1">
                  RSVP Registration
                </h3>
                <p className="text-xs sm:text-sm text-[#71717A] mt-1">
                  Your response is requested by{" "}
                  <span className="font-bold text-[#E11D48]">
                    {data.rsvp.deadline}
                  </span>
                </p>
                <AntiqueGoldDivider className="w-32 mx-auto my-3" />
              </div>

              {rsvpState.submitted ? (
                <div className="text-center py-8 space-y-2 bg-[#FFE4E6] rounded-2xl p-6 border border-[#FDA4AF]">
                  <div className="w-12 h-12 rounded-full bg-[#E11D48] text-white flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <h4 className="font-bold text-base text-[#9F1239]">
                    Thank You, {rsvpState.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#E11D48]">
                    Your response has been warmly received.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#52525B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. & Mrs. Rahman"
                      value={rsvpState.name}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FDA4AF] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E11D48] bg-[#FFF7ED] text-[#3F3F46]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#52525B] mb-1">
                      Will You Attend?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setRsvpState({ ...rsvpState, attending: "yes" })
                        }
                        className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          rsvpState.attending === "yes"
                            ? "bg-[#E11D48] text-white border-[#E11D48]"
                            : "bg-[#FFF7ED] text-[#52525B] border-[#FED7AA] hover:bg-stone-50"
                        }`}
                      >
                        Accept with Joy
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setRsvpState({ ...rsvpState, attending: "no" })
                        }
                        className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          rsvpState.attending === "no"
                            ? "bg-[#881337] text-white border-[#881337]"
                            : "bg-[#FFF7ED] text-[#52525B] border-[#FED7AA] hover:bg-stone-50"
                        }`}
                      >
                        Decline with Regret
                      </button>
                    </div>
                  </div>

                  {rsvpState.attending === "yes" && (
                    <div>
                      <label className="block text-xs font-semibold text-[#52525B] mb-1">
                        Number of Attendees
                      </label>
                      <select
                        value={rsvpState.guests}
                        onChange={(e) =>
                          setRsvpState({
                            ...rsvpState,
                            guests: Number(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-[#FED7AA] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E11D48] bg-[#FFF7ED] text-[#3F3F46]"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#52525B] mb-1">
                      Warm Wishes &amp; Blessings
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Convey your cordial greetings to the couple..."
                      value={rsvpState.message}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, message: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FED7AA] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E11D48] bg-[#FFF7ED] text-[#3F3F46]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#BE123C] text-white text-xs sm:text-sm font-semibold tracking-wider hover:brightness-105 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#FDE047]" />
                    <span>Send RSVP</span>
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* Footer Greetings */}
        <footer className="mt-8 mb-6 text-center space-y-2">
          <AntiqueGoldDivider className="w-40 mx-auto opacity-70" />
          <p className="text-xs sm:text-sm italic text-[#71717A]">
            &ldquo;Joined in love, surrounded by blessings, stepping into tomorrow together.&rdquo;
          </p>
          {data.hashtag && (
            <p className="text-xs font-mono font-bold tracking-wider text-[#E11D48]">
              {data.hashtag}
            </p>
          )}
        </footer>
      </main>
    </div>
  );
};
