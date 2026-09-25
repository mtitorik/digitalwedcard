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
  BotanicalWreath,
  CornerFoliage,
  BotanicalDivider,
} from "./Decorations";
import {
  MapPin,
  Clock,
  Calendar,
  Send,
  Heart,
  Navigation,
} from "lucide-react";

export interface Template01Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template01: React.FC<Template01Props> = ({
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
    title: "Wedding Ceremony",
    date: data.weddingDate,
    time: "06:00 PM",
    venueName: "The Grand Banquet Hall",
    address: "Dhaka, Bangladesh",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full ${isOpen ? "min-h-screen overflow-y-auto" : "h-full max-h-full overflow-hidden"} bg-[#FAFAF7] text-[#2D3748] font-sans antialiased overflow-x-hidden ${className}`}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#4A6B53] text-white hover:bg-[#3B5742] shadow-lg border border-[#C5A880]"
        />
      )}

      {/* Interactive Wax Seal & 3D Gatefold Unfolding Experience */}
      <WaxSealEnvelope
        isOpenDefault={isEnvelopeOpenDefault}
        onOpenComplete={() => setIsOpen(true)}
        groomName={data.groomName}
        brideName={data.brideName}
        weddingDate={data.weddingDate}
        primaryColor="#4A6B53"
        secondaryColor="#C5A880"
        backgroundColor="#FAF7F2"
        textColor="#1C2826"
        wreathComponent={
          <BotanicalWreath className="w-48 h-48 sm:w-56 sm:h-56 animate-[spin_40s_linear_infinite]" />
        }
        cornerDecorations={
          <>
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <CornerFoliage className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" />
            </div>
            <div className="absolute top-3 right-3 z-20 pointer-events-none transform scale-x-[-1]">
              <CornerFoliage className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" />
            </div>
            <div className="absolute bottom-3 left-3 z-20 pointer-events-none transform scale-y-[-1]">
              <CornerFoliage className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" />
            </div>
            <div className="absolute bottom-3 right-3 z-20 pointer-events-none transform scale-[-1]">
              <CornerFoliage className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" />
            </div>
          </>
        }
      >
        {/* Main Invitation Body Content */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 flex flex-col items-center">
        {/* Top Corner Botanical Foliage */}
        <div className="absolute top-2 left-2 pointer-events-none z-10">
          <CornerFoliage className="w-16 h-16 sm:w-24 sm:h-24 opacity-80" />
        </div>
        <div className="absolute top-2 right-2 -scale-x-100 pointer-events-none z-10">
          <CornerFoliage className="w-16 h-16 sm:w-24 sm:h-24 opacity-80" />
        </div>

        {/* Hero Section */}
        <header className="pt-6 sm:pt-10 pb-8 px-4 text-center relative flex flex-col items-center max-w-3xl mx-auto">
          {/* Monogram Wreath Crest */}
          <div className="relative mb-4 flex items-center justify-center">
            <BotanicalWreath className="w-32 h-32 sm:w-40 sm:h-40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#2D3748]">
                {data.groomName.split(" ")[0][0]} & {data.brideName.split(" ")[0][0]}
              </span>
            </div>
          </div>

          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#4A6B53] font-serif font-medium">
            Celebration of Love & Happiness
          </span>
          <h1 className="text-sm sm:text-base uppercase tracking-[0.3em] font-serif text-[#C5A880] mt-1 font-semibold">
            Let The Love Grow
          </h1>

          <BotanicalDivider className="w-40 sm:w-56 my-4" />

          {/* Parents Honor Blessing */}
          <div className="space-y-1.5 max-w-md text-xs sm:text-sm font-serif text-[#4A5568] leading-relaxed">
            <p className="font-semibold text-stone-800">
              {data.parentsGroom}
            </p>
            <p className="text-[11px] text-[#A0AEC0] italic">&amp;</p>
            <p className="font-semibold text-stone-800">
              {data.parentsBride}
            </p>
            <p className="text-[11px] sm:text-xs text-[#718096] pt-2">
              cordially request the honor of your presence to celebrate the wedding ceremony of their beloved children
            </p>
          </div>

          {/* Couple Names */}
          <div className="my-6 sm:my-8 space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A202C] tracking-wide font-normal">
              {data.groomName}
            </h2>
            <div className="flex items-center justify-center gap-3 py-1">
              <span className="w-12 sm:w-16 h-[1px] bg-[#C5A880]/60" />
              <span className="font-serif italic text-xl sm:text-2xl text-[#C5A880]">&amp;</span>
              <span className="w-12 sm:w-16 h-[1px] bg-[#C5A880]/60" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A202C] tracking-wide font-normal">
              {data.brideName}
            </h2>
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#F3F4F0] border border-[#E2E8F0] shadow-sm text-xs sm:text-sm font-serif tracking-wider text-[#4A6B53]">
            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
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
            accentColor="#4A6B53"
            textColor="#2D3748"
            secondaryTextColor="#4A6B53"
            borderColor="#C5A880"
          />
        </section>

        {/* Event Itinerary / Tentative Program */}
        <section className="my-8 sm:my-10 w-full max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A880] font-serif font-bold">
              Program Schedule
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#2D3748] mt-1">
              Tentative Timeline
            </h3>
            <BotanicalDivider className="w-40 mx-auto my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full box-border">
            {data.events.map((evt, idx) => (
              <div
                key={idx}
                className="w-full box-border relative flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#EBECE8] shadow-sm transition-all hover:shadow-md hover:border-[#C5A880]/40 break-words"
              >
                <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0 shrink-0">
                  <span className="w-10 h-10 rounded-xl bg-[#F0F4F1] text-[#4A6B53] flex items-center justify-center font-serif font-bold text-sm shrink-0">
                    0{idx + 1}
                  </span>
                  {idx < data.events.length - 1 && (
                    <span className="hidden sm:block w-[1px] h-full bg-[#E2E8F0] my-2" />
                  )}
                </div>

                <div className="flex-1 text-left space-y-1.5 min-w-0">
                  <h4 className="font-serif font-semibold text-base text-[#1A202C] break-words">
                    {evt.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-[#4A6B53] font-medium">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span className="break-words">{evt.time}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-[#718096]">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                    <span className="break-words">{evt.venueName}</span>
                  </div>

                  {evt.description && (
                    <p className="text-xs text-[#718096] pt-1 leading-relaxed border-t border-[#E2E8F0]/60 break-words">
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
          <div className="bg-white border border-[#EBECE8] rounded-3xl p-6 sm:p-8 shadow-sm text-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C5A880] font-serif font-bold">
              Ceremony &amp; Reception Venue
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-[#1A202C] mt-1 font-bold">
              {primaryEvent.venueName}
            </h3>
            <p className="text-xs sm:text-sm text-[#718096] mt-1.5 max-w-md mx-auto">
              {primaryEvent.address}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href={primaryEvent.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4A6B53] text-white text-xs sm:text-sm font-serif font-semibold tracking-wider hover:bg-[#3B5742] transition-colors shadow-sm active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              {/* Add To Calendar Action */}
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
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#C5A880] font-serif font-bold">
                Moments of Joy
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#2D3748]">
                Our Gallery
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {data.gallery.slice(0, 4).map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group"
                >
                  <Image
                    src={imgUrl}
                    alt={`Wedding celebration preview ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 250px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interactive RSVP Form */}
        {data.rsvp.enabled && (
          <section className="my-8 sm:my-10 w-full max-w-2xl mx-auto px-4">
            <div className="bg-[#FFFFFF] border border-[#EBECE8] rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="text-center mb-6">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#4A6B53] font-serif font-bold">
                  Join Our Celebration
                </span>
                <h3 className="text-2xl font-serif text-[#1A202C] mt-1">
                  RSVP Kindly
                </h3>
                <p className="text-xs sm:text-sm text-[#718096] mt-1">
                  The favor of reply is requested by{" "}
                  <span className="font-semibold text-stone-800">
                    {data.rsvp.deadline}
                  </span>
                </p>
                <BotanicalDivider className="w-32 mx-auto my-3" />
              </div>

              {rsvpState.submitted ? (
                <div className="text-center py-8 space-y-2 bg-[#F0F5F2] rounded-2xl p-6 border border-[#C6DCCE]">
                  <div className="w-12 h-12 rounded-full bg-[#4A6B53] text-white flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#1A202C]">
                    Thank You, {rsvpState.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#4A6B53]">
                    Your response has been warmly received. We look forward to celebrating together!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-serif font-semibold text-[#4A5568] mb-1">
                      Full Name(s) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. Tanvir Rahman & Family"
                      value={rsvpState.name}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B53] focus:border-transparent bg-[#FAFAF9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-semibold text-[#4A5568] mb-1">
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
                            ? "bg-[#4A6B53] text-white border-[#4A6B53]"
                            : "bg-[#FAFAF9] text-[#4A5568] border-[#CBD5E1] hover:bg-stone-50"
                        }`}
                      >
                        Joyfully Accept
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setRsvpState({ ...rsvpState, attending: "no" })
                        }
                        className={`py-2.5 px-4 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          rsvpState.attending === "no"
                            ? "bg-rose-700 text-white border-rose-700"
                            : "bg-[#FAFAF9] text-[#4A5568] border-[#CBD5E1] hover:bg-stone-50"
                        }`}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {rsvpState.attending === "yes" && (
                    <div>
                      <label className="block text-xs font-serif font-semibold text-[#4A5568] mb-1">
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
                        className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B53] bg-[#FAFAF9]"
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
                    <label className="block text-xs font-serif font-semibold text-[#4A5568] mb-1">
                      Warm Wishes &amp; Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write your blessings and prayers for the couple..."
                      value={rsvpState.message}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, message: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#4A6B53] bg-[#FAFAF9]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#4A6B53] to-[#3B5742] text-white text-xs sm:text-sm font-serif font-semibold tracking-wider hover:brightness-105 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send RSVP Confirmation</span>
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* Footer Greetings */}
        <footer className="mt-8 mb-6 text-center space-y-2">
          <BotanicalDivider className="w-40 mx-auto opacity-70" />
          <p className="text-xs sm:text-sm font-serif italic text-[#718096]">
            &ldquo;Two lives, two hearts, joined together in friendship, united forever in love.&rdquo;
          </p>
          {data.hashtag && (
            <p className="text-xs font-mono font-bold tracking-wider text-[#4A6B53]">
              {data.hashtag}
            </p>
          )}
        </footer>
      </main>
      </WaxSealEnvelope>
    </div>
  );
};
