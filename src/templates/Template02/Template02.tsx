"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import { WaxSealEnvelope } from "@/components/common/WaxSealEnvelope";
import {
  PaisleyCorner,
  RoyalMandala,
  RoyalFiligreeDivider,
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

export interface Template02Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template02: React.FC<Template02Props> = ({
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
    title: "Grand Royal Ceremony",
    date: data.weddingDate,
    time: "07:00 PM",
    venueName: "The Royal Crystal Palace",
    address: "Dhaka, Bangladesh",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#FFFBEB] text-[#1C1917] font-serif antialiased overflow-x-hidden ${className}`}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#991B1B] text-[#FEF3C7] hover:bg-[#7F1D1D] shadow-xl border border-[#F59E0B]"
        />
      )}

      {/* Interactive Royal Wax Seal & 3D Gatefold Unfolding Experience */}
      <WaxSealEnvelope
        isOpenDefault={isEnvelopeOpenDefault}
        groomName={data.groomName}
        brideName={data.brideName}
        weddingDate={data.weddingDate}
        primaryColor="#991B1B"
        secondaryColor="#D97706"
        backgroundColor="#7F1D1D"
        textColor="#FEF3C7"
        wreathComponent={
          <RoyalMandala
            className="w-52 h-52 sm:w-60 sm:h-60 animate-[spin_50s_linear_infinite]"
            color="#FDE68A"
            goldColor="#F59E0B"
          />
        }
        cornerDecorations={
          <>
            <div className="absolute top-4 left-4 pointer-events-none">
              <PaisleyCorner className="w-20 h-20 sm:w-28 sm:h-28 opacity-80" color="#FEF3C7" goldColor="#F59E0B" />
            </div>
            <div className="absolute top-4 right-4 -scale-x-100 pointer-events-none">
              <PaisleyCorner className="w-20 h-20 sm:w-28 sm:h-28 opacity-80" color="#FEF3C7" goldColor="#F59E0B" />
            </div>
            <div className="absolute bottom-4 left-4 scale-y-[-1] pointer-events-none">
              <PaisleyCorner className="w-20 h-20 sm:w-28 sm:h-28 opacity-80" color="#FEF3C7" goldColor="#F59E0B" />
            </div>
            <div className="absolute bottom-4 right-4 -scale-100 pointer-events-none">
              <PaisleyCorner className="w-20 h-20 sm:w-28 sm:h-28 opacity-80" color="#FEF3C7" goldColor="#F59E0B" />
            </div>
          </>
        }
      >
        {/* Main Royal Invitation Body */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 flex flex-col items-center bg-[#FFFBEB]">
        {/* Top Paisley Corners */}
        <div className="absolute top-2 left-2 pointer-events-none z-10">
          <PaisleyCorner className="w-20 h-20 sm:w-28 sm:h-28 opacity-90" color="#7F1D1D" goldColor="#D97706" />
        </div>
        <div className="absolute top-2 right-2 -scale-x-100 pointer-events-none z-10">
          <PaisleyCorner className="w-20 h-20 sm:w-28 sm:h-28 opacity-90" color="#7F1D1D" goldColor="#D97706" />
        </div>

        {/* Hero Section */}
        <header className="pt-6 sm:pt-10 pb-8 px-4 text-center relative flex flex-col items-center max-w-3xl mx-auto">
          {/* Sacred Royal Mandala Monogram */}
          <div className="relative mb-4 flex items-center justify-center">
            <RoyalMandala className="w-36 h-36 sm:w-44 sm:h-44" color="#7F1D1D" goldColor="#D97706" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold tracking-widest text-[#991B1B]">
                {data.groomName[0]} &amp; {data.brideName[0]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#991B1B] font-bold">
              Subho Bibaho • Auspicious Union
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
          </div>

          <h1 className="text-sm sm:text-base uppercase tracking-[0.25em] text-[#B45309] mt-2 font-bold">
            Royal Wedding Celebration
          </h1>

          <RoyalFiligreeDivider className="w-48 sm:w-64 my-4" />

          {/* Parents Request */}
          <div className="space-y-1.5 max-w-md text-xs sm:text-sm text-[#44403C] leading-relaxed">
            <p className="font-bold text-[#1C1917] tracking-wide">
              {data.parentsGroom}
            </p>
            <p className="text-xs text-[#D97706] italic">&amp;</p>
            <p className="font-bold text-[#1C1917] tracking-wide">
              {data.parentsBride}
            </p>
            <p className="text-xs sm:text-sm text-[#57534E] pt-2 italic">
              solicit the honour of your benign presence and blessings on the joyous occasion of the marriage of their children
            </p>
          </div>

          {/* Couple Names in Royal Crimson & Gold */}
          <div className="my-6 sm:my-8 space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#7F1D1D] tracking-wide">
              {data.groomName}
            </h2>
            <div className="flex items-center justify-center gap-3 py-1">
              <span className="w-12 sm:w-16 h-[1.5px] bg-[#D97706]" />
              <span className="italic text-xl sm:text-2xl text-[#D97706] font-bold">&amp;</span>
              <span className="w-12 sm:w-16 h-[1.5px] bg-[#D97706]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#7F1D1D] tracking-wide">
              {data.brideName}
            </h2>
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B] shadow-sm text-xs sm:text-sm tracking-wider text-[#991B1B] font-bold">
            <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
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
            title="Auspicious Muhurtham In"
            accentColor="#991B1B"
            textColor="#991B1B"
            secondaryTextColor="#D97706"
            borderColor="#F59E0B"
          />
        </section>

        {/* Event Itinerary / Tentative Program */}
        <section className="my-8 sm:my-10 w-full max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D97706] font-bold">
              Celebration Schedule
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#7F1D1D] mt-1">
              Wedding Itinerary
            </h3>
            <RoyalFiligreeDivider className="w-40 mx-auto my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full box-border">
            {data.events.map((evt, idx) => (
              <div
                key={idx}
                className="w-full box-border relative flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-2xl bg-[#FFFDF5] border border-[#FDE68A] shadow-sm transition-all hover:shadow-md hover:border-[#D97706] break-words"
              >
                <div className="flex sm:flex-col items-center gap-3 sm:gap-0 shrink-0">
                  <span className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#991B1B] flex items-center justify-center font-bold text-sm border border-[#F59E0B]/40 shrink-0">
                    0{idx + 1}
                  </span>
                  {idx < data.events.length - 1 && (
                    <span className="hidden sm:block w-[1px] h-full bg-[#FDE68A] my-2" />
                  )}
                </div>

                <div className="flex-1 text-left space-y-1.5 min-w-0">
                  <h4 className="font-bold text-base text-[#7F1D1D] break-words">
                    {evt.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-[#991B1B] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                    <span className="break-words">{evt.time}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-[#57534E]">
                    <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0 mt-0.5" />
                    <span className="break-words">{evt.venueName}</span>
                  </div>

                  {evt.description && (
                    <p className="text-xs text-[#78716C] pt-1 leading-relaxed border-t border-[#FDE68A]/60 italic break-words">
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
          <div className="bg-[#FFFDF5] border border-[#FDE68A] rounded-3xl p-6 sm:p-8 shadow-md text-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#D97706] font-bold">
              Ceremony &amp; Feast Pavilion
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#7F1D1D] mt-1">
              {primaryEvent.venueName}
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] mt-1.5 max-w-md mx-auto">
              {primaryEvent.address}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href={primaryEvent.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#991B1B] text-[#FEF3C7] text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#7F1D1D] transition-colors shadow-sm active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>Get Directions</span>
              </a>

              <AddToCalendar
                event={{
                  title: `Wedding: ${data.groomName} & ${data.brideName}`,
                  description: `Join us for the royal wedding ceremony of ${data.groomName} and ${data.brideName}.`,
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
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#D97706] font-bold">
                Royal Moments
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#7F1D1D]">
                Pre-Wedding Gallery
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {data.gallery.slice(0, 4).map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#FDE68A] group"
                >
                  <Image
                    src={imgUrl}
                    alt={`Royal wedding preview ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 250px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#450A0A]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interactive RSVP Form */}
        {data.rsvp.enabled && (
          <section className="my-8 sm:my-10 w-full max-w-2xl mx-auto px-4">
            <div className="bg-[#FFFDF5] border border-[#FDE68A] rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="text-center mb-6">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#991B1B] font-bold">
                  Grace Us With Your Presence
                </span>
                <h3 className="text-2xl font-bold text-[#7F1D1D] mt-1">
                  RSVP Cordially
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] mt-1">
                  Kindly respond by{" "}
                  <span className="font-bold text-[#7F1D1D]">
                    {data.rsvp.deadline}
                  </span>
                </p>
                <RoyalFiligreeDivider className="w-32 mx-auto my-3" />
              </div>

              {rsvpState.submitted ? (
                <div className="text-center py-8 space-y-2 bg-[#FEF3C7] rounded-2xl p-6 border border-[#F59E0B]">
                  <div className="w-12 h-12 rounded-full bg-[#991B1B] text-[#FEF3C7] flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <h4 className="font-bold text-base text-[#7F1D1D]">
                    Heartfelt Thanks, {rsvpState.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#991B1B]">
                    Your blessings and acceptance have been gratefully noted.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. & Mrs. Chowdhury"
                      value={rsvpState.name}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FDE68A] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#991B1B] bg-white text-[#1C1917]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
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
                            ? "bg-[#991B1B] text-[#FEF3C7] border-[#991B1B]"
                            : "bg-white text-[#44403C] border-[#FDE68A] hover:bg-[#FEF3C7]/40"
                        }`}
                      >
                        Accept with Pleasure
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setRsvpState({ ...rsvpState, attending: "no" })
                        }
                        className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          rsvpState.attending === "no"
                            ? "bg-[#450A0A] text-white border-[#450A0A]"
                            : "bg-white text-[#44403C] border-[#FDE68A] hover:bg-[#FEF3C7]/40"
                        }`}
                      >
                        Decline with Regret
                      </button>
                    </div>
                  </div>

                  {rsvpState.attending === "yes" && (
                    <div>
                      <label className="block text-xs font-semibold text-[#44403C] mb-1">
                        Number of Guests
                      </label>
                      <select
                        value={rsvpState.guests}
                        onChange={(e) =>
                          setRsvpState({
                            ...rsvpState,
                            guests: Number(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl border border-[#FDE68A] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#991B1B] bg-white text-[#1C1917]"
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
                    <label className="block text-xs font-semibold text-[#44403C] mb-1">
                      Warm Wishes &amp; Blessings
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Convey your cordial wishes to the bride & groom..."
                      value={rsvpState.message}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, message: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#FDE68A] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#991B1B] bg-white text-[#1C1917]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-[#FEF3C7] text-xs sm:text-sm font-semibold tracking-wider hover:brightness-105 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#FBBF24]" />
                    <span>Send Royal RSVP</span>
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* Footer Greetings */}
        <footer className="mt-8 mb-6 text-center space-y-2">
          <RoyalFiligreeDivider className="w-40 mx-auto opacity-70" />
          <p className="text-xs sm:text-sm italic text-[#57534E]">
            &ldquo;May the divine grace always shower their path with love, joy, and prosperity.&rdquo;
          </p>
          {data.hashtag && (
            <p className="text-xs font-mono font-bold tracking-wider text-[#991B1B]">
              {data.hashtag}
            </p>
          )}
        </footer>
      </main>
      </WaxSealEnvelope>
    </div>
  );
};
