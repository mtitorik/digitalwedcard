"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  HydrangeaWreath,
  LaceFiligreeCorner,
  GoldRibbonDivider,
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

export interface Template05Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template05: React.FC<Template05Props> = ({
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
    title: "Reception Dinner & Party",
    date: data.weddingDate,
    time: "07:00 PM",
    venueName: "The Grand Waterfront Ballroom",
    address: "Dhaka, Bangladesh",
    mapsUrl: "https://maps.google.com",
    dressCode: "Black Tie / Formal Regal",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#F0F9FF] text-[#0C4A6E] font-sans antialiased overflow-x-hidden ${className}`}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#0284C7] text-white hover:bg-[#0369A1] shadow-xl border border-[#D4AF37]"
        />
      )}

      {/* Cerulean & Lace Seal Opening Experience Overlay */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#0369A1] via-[#0284C7] to-[#075985] flex flex-col items-center justify-between p-6 sm:p-10 text-center text-white animate-fade-in overflow-y-auto">
          {/* Lace Corners */}
          <div className="absolute top-4 left-4 pointer-events-none">
            <LaceFiligreeCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#BAE6FD" goldColor="#FDE68A" />
          </div>
          <div className="absolute top-4 right-4 -scale-x-100 pointer-events-none">
            <LaceFiligreeCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#BAE6FD" goldColor="#FDE68A" />
          </div>
          <div className="absolute bottom-4 left-4 scale-y-[-1] pointer-events-none">
            <LaceFiligreeCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#BAE6FD" goldColor="#FDE68A" />
          </div>
          <div className="absolute bottom-4 right-4 -scale-100 pointer-events-none">
            <LaceFiligreeCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#BAE6FD" goldColor="#FDE68A" />
          </div>

          <div className="pt-8 sm:pt-12">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#FDE68A] font-semibold">
              Reception Party Invitation
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-serif tracking-wide text-white">
              {data.groomName.split(" ")[0]} &amp; {data.brideName.split(" ")[0]}
            </h2>
          </div>

          {/* Interactive Hydrangea Wreath Opener Button */}
          <div className="my-auto py-8 flex flex-col items-center">
            <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
              <HydrangeaWreath className="w-48 h-48 sm:w-56 sm:h-56 animate-[spin_55s_linear_infinite]" color="#BAE6FD" goldColor="#FDE68A" />

              <button
                onClick={() => setIsOpen(true)}
                aria-label="Open reception invitation"
                className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#0284C7] via-[#38BDF8] to-[#F59E0B] text-white shadow-2xl flex flex-col items-center justify-center border-2 border-[#FDE68A] transform transition-all duration-300 hover:scale-105 active:scale-95 group-hover:shadow-sky-500/40"
              >
                <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-amber-200">
                  {data.groomName[0]}&amp;{data.brideName[0]}
                </span>
                <span className="text-[9px] uppercase tracking-widest font-semibold mt-0.5 text-white/90">
                  Open
                </span>
              </button>
            </div>

            <p className="mt-6 text-xs sm:text-sm text-[#FDE68A]/80 italic tracking-wider animate-pulse">
              Click the floral seal to open invitation
            </p>
          </div>

          <div className="pb-8">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FDE68A]">
              {data.weddingDate}
            </p>
          </div>
        </div>
      )}

      {/* Main Invitation Body */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 flex flex-col items-center bg-[#F0F9FF]">
        {/* Top Lace Corners */}
        <div className="absolute top-2 left-2 pointer-events-none z-10">
          <LaceFiligreeCorner className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#0284C7" goldColor="#D4AF37" />
        </div>
        <div className="absolute top-2 right-2 -scale-x-100 pointer-events-none z-10">
          <LaceFiligreeCorner className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#0284C7" goldColor="#D4AF37" />
        </div>

        {/* Hero Section */}
        <header className="pt-6 sm:pt-10 pb-8 px-4 text-center relative flex flex-col items-center max-w-3xl mx-auto">
          {/* Hydrangea Floral Monogram */}
          <div className="relative mb-3 flex items-center justify-center">
            <HydrangeaWreath className="w-32 h-32 sm:w-40 sm:h-40" color="#0284C7" goldColor="#D4AF37" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#0369A1]">
                {data.groomName[0]} &amp; {data.brideName[0]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#0284C7] font-bold">
              Reception Feast • Joyous Union
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>

          <h1 className="text-sm sm:text-base uppercase tracking-[0.25em] text-[#0369A1] mt-2 font-bold font-serif">
            Wedding Celebration Dinner
          </h1>

          <GoldRibbonDivider className="w-48 sm:w-64 my-4" />

          {/* Parents Request */}
          <div className="space-y-1.5 max-w-md text-xs sm:text-sm text-[#0369A1] leading-relaxed">
            <p className="font-bold text-[#0C4A6E] tracking-wide">
              {data.parentsGroom}
            </p>
            <p className="text-xs text-[#D4AF37] italic font-serif">&amp;</p>
            <p className="font-bold text-[#0C4A6E] tracking-wide">
              {data.parentsBride}
            </p>
            <p className="text-xs sm:text-sm text-[#0284C7] pt-2 italic">
              cordially invite you to celebrate the joyous wedding reception and evening festivities of their beloved children
            </p>
          </div>

          {/* Couple Names */}
          <div className="my-6 sm:my-8 space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0369A1] tracking-wide">
              {data.groomName}
            </h2>
            <div className="flex items-center justify-center gap-3 py-1">
              <span className="w-12 sm:w-16 h-[1.5px] bg-[#D4AF37]" />
              <span className="font-serif italic text-xl sm:text-2xl text-[#D4AF37] font-bold">&amp;</span>
              <span className="w-12 sm:w-16 h-[1.5px] bg-[#D4AF37]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0369A1] tracking-wide">
              {data.brideName}
            </h2>
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E0F2FE] border border-[#7DD3FC] shadow-sm text-xs sm:text-sm tracking-wider text-[#0284C7] font-bold">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
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
            title="Counting Down To Celebration"
            accentColor="#0284C7"
            textColor="#0C4A6E"
            secondaryTextColor="#0284C7"
            borderColor="#D4AF37"
          />
        </section>

        {/* Event Itinerary / Tentative Program */}
        <section className="my-8 sm:my-10 w-full max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
              Evening Program
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0369A1] mt-1">
              Reception Schedule
            </h3>
            <GoldRibbonDivider className="w-40 mx-auto my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full box-border">
            {data.events.map((evt, idx) => (
              <div
                key={idx}
                className="w-full box-border relative flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#BAE6FD] shadow-sm transition-all hover:shadow-md hover:border-[#0284C7] break-words"
              >
                <div className="flex sm:flex-col items-center gap-3 sm:gap-0 shrink-0">
                  <span className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center font-bold text-sm border border-[#7DD3FC] shrink-0">
                    0{idx + 1}
                  </span>
                  {idx < data.events.length - 1 && (
                    <span className="hidden sm:block w-[1px] h-full bg-[#BAE6FD] my-2" />
                  )}
                </div>

                <div className="flex-1 text-left space-y-1.5 min-w-0">
                  <h4 className="font-serif font-bold text-base text-[#0C4A6E] break-words">
                    {evt.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-[#0284C7] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="break-words">{evt.time}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-[#0369A1]">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="break-words">{evt.venueName}</span>
                  </div>

                  {evt.description && (
                    <p className="text-xs text-[#0369A1] pt-1 leading-relaxed border-t border-[#BAE6FD] italic break-words">
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
          <div className="bg-white border border-[#BAE6FD] rounded-3xl p-6 sm:p-8 shadow-md text-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
              Grand Ballroom &amp; Dining
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0C4A6E] mt-1">
              {primaryEvent.venueName}
            </h3>
            <p className="text-xs sm:text-sm text-[#0369A1] mt-1.5 max-w-md mx-auto">
              {primaryEvent.address}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href={primaryEvent.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0284C7] text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#0369A1] transition-colors shadow-sm active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>Get Directions</span>
              </a>

              <AddToCalendar
                event={{
                  title: `Reception: ${data.groomName} & ${data.brideName}`,
                  description: `Join us for the grand wedding reception of ${data.groomName} and ${data.brideName}.`,
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
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                Moments to Remember
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#0369A1]">
                Celebration Gallery
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {data.gallery.slice(0, 4).map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#BAE6FD] group"
                >
                  <Image
                    src={imgUrl}
                    alt={`Reception celebration preview ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 250px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C4A6E]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interactive RSVP Form */}
        {data.rsvp.enabled && (
          <section className="my-8 sm:my-10 w-full max-w-2xl mx-auto px-4">
            <div className="bg-white border border-[#BAE6FD] rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="text-center mb-6">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#0284C7] font-bold">
                  Celebrate With Joy
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#0C4A6E] mt-1">
                  RSVP Registration
                </h3>
                <p className="text-xs sm:text-sm text-[#0369A1] mt-1">
                  Please confirm your attendance by{" "}
                  <span className="font-bold text-[#0284C7]">
                    {data.rsvp.deadline}
                  </span>
                </p>
                <GoldRibbonDivider className="w-32 mx-auto my-3" />
              </div>

              {rsvpState.submitted ? (
                <div className="text-center py-8 space-y-2 bg-[#E0F2FE] rounded-2xl p-6 border border-[#7DD3FC]">
                  <div className="w-12 h-12 rounded-full bg-[#0284C7] text-white flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <h4 className="font-bold text-base text-[#0C4A6E]">
                    Thank You, {rsvpState.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0284C7]">
                    Your RSVP response has been joyfully recorded.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0369A1] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. & Mrs. Siddiqui"
                      value={rsvpState.name}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#BAE6FD] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] bg-[#F0F9FF] text-[#0C4A6E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0369A1] mb-1">
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
                            ? "bg-[#0284C7] text-white border-[#0284C7]"
                            : "bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD] hover:bg-stone-50"
                        }`}
                      >
                        Accept with Delight
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setRsvpState({ ...rsvpState, attending: "no" })
                        }
                        className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          rsvpState.attending === "no"
                            ? "bg-[#0C4A6E] text-white border-[#0C4A6E]"
                            : "bg-[#F0F9FF] text-[#0369A1] border-[#BAE6FD] hover:bg-stone-50"
                        }`}
                      >
                        Decline with Regret
                      </button>
                    </div>
                  </div>

                  {rsvpState.attending === "yes" && (
                    <div>
                      <label className="block text-xs font-semibold text-[#0369A1] mb-1">
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
                        className="w-full px-4 py-2.5 rounded-xl border border-[#BAE6FD] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] bg-[#F0F9FF] text-[#0C4A6E]"
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
                    <label className="block text-xs font-semibold text-[#0369A1] mb-1">
                      Warm Wishes &amp; Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your cordial blessings with the couple..."
                      value={rsvpState.message}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, message: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#BAE6FD] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0284C7] bg-[#F0F9FF] text-[#0C4A6E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0369A1] text-white text-xs sm:text-sm font-semibold tracking-wider hover:brightness-105 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#FDE68A]" />
                    <span>Send Reception RSVP</span>
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* Footer Greetings */}
        <footer className="mt-8 mb-6 text-center space-y-2">
          <GoldRibbonDivider className="w-40 mx-auto opacity-70" />
          <p className="text-xs sm:text-sm italic text-[#0369A1]">
            &ldquo;Celebrating an evening of love, laughter, and lifelong memories together.&rdquo;
          </p>
          {data.hashtag && (
            <p className="text-xs font-mono font-bold tracking-wider text-[#0284C7]">
              {data.hashtag}
            </p>
          )}
        </footer>
      </main>
    </div>
  );
};
