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
  GeometricGoldFrame,
  StarburstCorner,
  SapphireFlourishDivider,
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

export interface Template04Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template04: React.FC<Template04Props> = ({
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
    title: "Royal Sapphire Wedding Reception",
    date: data.weddingDate,
    time: "07:30 PM",
    venueName: "The Grand Sapphire Pavilion",
    address: "Dhaka, Bangladesh",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full ${isOpen ? "min-h-screen overflow-y-auto" : "h-full max-h-full overflow-hidden"} bg-[#F8FAFC] text-[#0F172A] font-sans antialiased overflow-x-hidden ${className}`}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#1E3A8A] text-[#FDE68A] hover:bg-[#172554] shadow-xl border border-[#F59E0B]"
        />
      )}

      {/* Interactive Sapphire Seal & 3D Gatefold Unfolding Experience */}
      <WaxSealEnvelope
        isOpenDefault={isEnvelopeOpenDefault}
        onOpenComplete={() => setIsOpen(true)}
        groomName={data.groomName}
        brideName={data.brideName}
        weddingDate={data.weddingDate}
        primaryColor="#1E3A8A"
        secondaryColor="#F59E0B"
        backgroundColor="#0F2042"
        textColor="#FDE68A"
        wreathComponent={
          <GeometricGoldFrame className="w-48 h-48 sm:w-56 sm:h-56 animate-[spin_60s_linear_infinite]" color="#60A5FA" goldColor="#F59E0B" />
        }
        cornerDecorations={
          <>
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <StarburstCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#93C5FD" goldColor="#F59E0B" />
            </div>
            <div className="absolute top-3 right-3 z-20 pointer-events-none transform scale-x-[-1]">
              <StarburstCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#93C5FD" goldColor="#F59E0B" />
            </div>
            <div className="absolute bottom-3 left-3 z-20 pointer-events-none transform scale-y-[-1]">
              <StarburstCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#93C5FD" goldColor="#F59E0B" />
            </div>
            <div className="absolute bottom-3 right-3 z-20 pointer-events-none transform scale-[-1]">
              <StarburstCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#93C5FD" goldColor="#F59E0B" />
            </div>
          </>
        }
      >
        {/* Main Invitation Body */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 flex flex-col items-center bg-[#F8FAFC]">
        {/* Top Starburst Corners */}
        <div className="absolute top-2 left-2 pointer-events-none z-10">
          <StarburstCorner className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#1E3A8A" goldColor="#F59E0B" />
        </div>
        <div className="absolute top-2 right-2 -scale-x-100 pointer-events-none z-10">
          <StarburstCorner className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#1E3A8A" goldColor="#F59E0B" />
        </div>

        {/* Hero Section */}
        <header className="pt-6 sm:pt-10 pb-8 px-4 text-center relative flex flex-col items-center max-w-3xl mx-auto">
          {/* Geometric Monogram Header */}
          <div className="relative mb-3 flex items-center justify-center">
            <GeometricGoldFrame className="w-32 h-32 sm:w-40 sm:h-40" color="#1E3A8A" goldColor="#F59E0B" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#1E3A8A]">
                {data.groomName[0]} &amp; {data.brideName[0]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#1E3A8A] font-bold">
              Royal Sapphire Union
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          </div>

          <h1 className="text-sm sm:text-base uppercase tracking-[0.25em] text-[#D97706] mt-2 font-bold font-serif">
            A Union of Two Families
          </h1>

          <SapphireFlourishDivider className="w-48 sm:w-64 my-4" />

          {/* Parents Request */}
          <div className="space-y-1.5 max-w-md text-xs sm:text-sm text-[#475569] leading-relaxed">
            <p className="font-bold text-[#0F172A] tracking-wide">
              {data.parentsGroom}
            </p>
            <p className="text-xs text-[#F59E0B] italic font-serif">&amp;</p>
            <p className="font-bold text-[#0F172A] tracking-wide">
              {data.parentsBride}
            </p>
            <p className="text-xs sm:text-sm text-[#64748B] pt-2 italic">
              cordially invite you to celebrate the joyous matrimony and new beginnings of their children
            </p>
          </div>

          {/* Couple Names */}
          <div className="my-6 sm:my-8 space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1E3A8A] tracking-wide">
              {data.groomName}
            </h2>
            <div className="flex items-center justify-center gap-3 py-1">
              <span className="w-12 sm:w-16 h-[1.5px] bg-[#F59E0B]" />
              <span className="font-serif italic text-xl sm:text-2xl text-[#F59E0B] font-bold">&amp;</span>
              <span className="w-12 sm:w-16 h-[1.5px] bg-[#F59E0B]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1E3A8A] tracking-wide">
              {data.brideName}
            </h2>
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] shadow-sm text-xs sm:text-sm tracking-wider text-[#1E3A8A] font-bold">
            <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
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
            title="Counting Down To The Royal Day"
            accentColor="#1E3A8A"
            textColor="#1E3A8A"
            secondaryTextColor="#F59E0B"
            borderColor="#F59E0B"
          />
        </section>

        {/* Event Itinerary / Tentative Program */}
        <section className="my-8 sm:my-10 w-full max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#F59E0B] font-bold">
              Celebration Program
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3A8A] mt-1">
              Schedule of Events
            </h3>
            <SapphireFlourishDivider className="w-40 mx-auto my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full box-border">
            {data.events.map((evt, idx) => (
              <div
                key={idx}
                className="w-full box-border relative flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm transition-all hover:shadow-md hover:border-[#1E3A8A] break-words"
              >
                <div className="flex sm:flex-col items-center gap-3 sm:gap-0 shrink-0">
                  <span className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#1E3A8A] flex items-center justify-center font-bold text-sm border border-[#BFDBFE] shrink-0">
                    0{idx + 1}
                  </span>
                  {idx < data.events.length - 1 && (
                    <span className="hidden sm:block w-[1px] h-full bg-[#E2E8F0] my-2" />
                  )}
                </div>

                <div className="flex-1 text-left space-y-1.5 min-w-0">
                  <h4 className="font-serif font-bold text-base text-[#1E3A8A] break-words">
                    {evt.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-[#2563EB] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                    <span className="break-words">{evt.time}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-[#64748B]">
                    <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <span className="break-words">{evt.venueName}</span>
                  </div>

                  {evt.description && (
                    <p className="text-xs text-[#64748B] pt-1 leading-relaxed border-t border-[#E2E8F0] italic break-words">
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
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-md text-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#F59E0B] font-bold">
              Reception Grand Pavilion
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1E3A8A] mt-1">
              {primaryEvent.venueName}
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-md mx-auto">
              {primaryEvent.address}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href={primaryEvent.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1E3A8A] text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#172554] transition-colors shadow-sm active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>Get Directions</span>
              </a>

              <AddToCalendar
                event={{
                  title: `Wedding: ${data.groomName} & ${data.brideName}`,
                  description: `Join us for the royal sapphire wedding celebration of ${data.groomName} and ${data.brideName}.`,
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
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#F59E0B] font-bold">
                Captured Moments
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1E3A8A]">
                Royal Memories
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {data.gallery.slice(0, 4).map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#BFDBFE] group"
                >
                  <Image
                    src={imgUrl}
                    alt={`Sapphire wedding preview ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 250px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interactive RSVP Form */}
        {data.rsvp.enabled && (
          <section className="my-8 sm:my-10 w-full max-w-2xl mx-auto px-4">
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="text-center mb-6">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#1E3A8A] font-bold">
                  Celebrate Together
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1E3A8A] mt-1">
                  RSVP Registration
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1">
                  Please confirm by{" "}
                  <span className="font-bold text-[#1E3A8A]">
                    {data.rsvp.deadline}
                  </span>
                </p>
                <SapphireFlourishDivider className="w-32 mx-auto my-3" />
              </div>

              {rsvpState.submitted ? (
                <div className="text-center py-8 space-y-2 bg-[#EFF6FF] rounded-2xl p-6 border border-[#BFDBFE]">
                  <div className="w-12 h-12 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <h4 className="font-bold text-base text-[#1E3A8A]">
                    Thank You, {rsvpState.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#2563EB]">
                    Your confirmation has been successfully received.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. & Mrs. Faruque"
                      value={rsvpState.name}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-[#F8FAFC] text-[#0F172A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
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
                            ? "bg-[#1E3A8A] text-white border-[#1E3A8A]"
                            : "bg-[#F8FAFC] text-[#334155] border-[#CBD5E1] hover:bg-stone-50"
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
                            ? "bg-[#0F172A] text-white border-[#0F172A]"
                            : "bg-[#F8FAFC] text-[#334155] border-[#CBD5E1] hover:bg-stone-50"
                        }`}
                      >
                        Decline with Regret
                      </button>
                    </div>
                  </div>

                  {rsvpState.attending === "yes" && (
                    <div>
                      <label className="block text-xs font-semibold text-[#334155] mb-1">
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
                        className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-[#F8FAFC] text-[#0F172A]"
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
                    <label className="block text-xs font-semibold text-[#334155] mb-1">
                      Warm Wishes &amp; Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Convey your cordial greetings and prayers..."
                      value={rsvpState.message}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, message: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#CBD5E1] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-[#F8FAFC] text-[#0F172A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#1D4ED8] text-white text-xs sm:text-sm font-semibold tracking-wider hover:brightness-105 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#FDE68A]" />
                    <span>Submit RSVP Response</span>
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* Footer Greetings */}
        <footer className="mt-8 mb-6 text-center space-y-2">
          <SapphireFlourishDivider className="w-40 mx-auto opacity-70" />
          <p className="text-xs sm:text-sm italic text-[#64748B]">
            &ldquo;Two distinct paths uniting under the sapphire starlight, forever in grace.&rdquo;
          </p>
          {data.hashtag && (
            <p className="text-xs font-mono font-bold tracking-wider text-[#1E3A8A]">
              {data.hashtag}
            </p>
          )}
        </footer>
      </main>
      </WaxSealEnvelope>
    </div>
  );
};
