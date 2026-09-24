"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  EucalyptusWreath,
  DeckleEdgeCorner,
  BotanicalLeafDivider,
} from "./Decorations";
import { WaxSealEnvelope } from "@/components/common/WaxSealEnvelope";
import {
  MapPin,
  Clock,
  Calendar,
  Send,
  Heart,
  Navigation,
  Sparkles,
} from "lucide-react";

export interface Template06Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template06: React.FC<Template06Props> = ({
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
    title: "Solemnization & Wedding Feast",
    date: data.weddingDate,
    time: "06:00 PM",
    venueName: "The Botanical Garden Pavilion",
    address: "Dhaka, Bangladesh",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#F7FDF9] text-[#134E4A] font-serif antialiased overflow-x-hidden ${className}`}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#047857] text-[#FEF3C7] hover:bg-[#064E3B] shadow-xl border border-[#E0A96D]"
        />
      )}

      {/* Interactive Eucalyptus Wax Seal & 3D Gatefold Unfolding Experience */}
      <WaxSealEnvelope
        isOpenDefault={isEnvelopeOpenDefault}
        groomName={data.groomName}
        brideName={data.brideName}
        weddingDate={data.weddingDate}
        primaryColor="#047857"
        secondaryColor="#E0A96D"
        backgroundColor="#064E3B"
        textColor="#FDE68A"
        wreathComponent={
          <EucalyptusWreath className="w-48 h-48 sm:w-56 sm:h-56 animate-[spin_55s_linear_infinite]" color="#A7F3D0" bronzeColor="#FDE68A" />
        }
        cornerDecorations={
          <>
            <div className="absolute top-4 left-4 pointer-events-none">
              <DeckleEdgeCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#A7F3D0" bronzeColor="#FDE68A" />
            </div>
            <div className="absolute top-4 right-4 -scale-x-100 pointer-events-none">
              <DeckleEdgeCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#A7F3D0" bronzeColor="#FDE68A" />
            </div>
            <div className="absolute bottom-4 left-4 scale-y-[-1] pointer-events-none">
              <DeckleEdgeCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#A7F3D0" bronzeColor="#FDE68A" />
            </div>
            <div className="absolute bottom-4 right-4 -scale-100 pointer-events-none">
              <DeckleEdgeCorner className="w-18 h-18 sm:w-28 sm:h-28 opacity-80" color="#A7F3D0" bronzeColor="#FDE68A" />
            </div>
          </>
        }
      >
      {/* Main Invitation Body */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 flex flex-col items-center bg-[#F7FDF9]">
        {/* Top Deckle Corners */}
        <div className="absolute top-2 left-2 pointer-events-none z-10">
          <DeckleEdgeCorner className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#047857" bronzeColor="#E0A96D" />
        </div>
        <div className="absolute top-2 right-2 -scale-x-100 pointer-events-none z-10">
          <DeckleEdgeCorner className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#047857" bronzeColor="#E0A96D" />
        </div>

        {/* Hero Section */}
        <header className="pt-6 sm:pt-10 pb-8 px-4 text-center relative flex flex-col items-center max-w-3xl mx-auto">
          {/* Eucalyptus Monogram Wreath */}
          <div className="relative mb-3 flex items-center justify-center">
            <EucalyptusWreath className="w-32 h-32 sm:w-40 sm:h-40" color="#047857" bronzeColor="#E0A96D" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold tracking-widest text-[#064E3B]">
                {data.groomName[0]} &amp; {data.brideName[0]}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E0A96D]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#047857] font-bold">
              Pure Harmony • Divine Blessings
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#E0A96D]" />
          </div>

          <h1 className="text-sm sm:text-base uppercase tracking-[0.25em] text-[#065F46] mt-2 font-bold font-serif">
            Eucalyptus Garden Matrimony
          </h1>

          <BotanicalLeafDivider className="w-48 sm:w-64 my-4" />

          {/* Parents Request */}
          <div className="space-y-1.5 max-w-md text-xs sm:text-sm text-[#065F46] leading-relaxed">
            <p className="font-bold text-[#134E4A] tracking-wide">
              {data.parentsGroom}
            </p>
            <p className="text-xs text-[#E0A96D] italic font-serif">&amp;</p>
            <p className="font-bold text-[#134E4A] tracking-wide">
              {data.parentsBride}
            </p>
            <p className="text-xs sm:text-sm text-[#047857] pt-2 italic">
              cordially request the pleasure of your company to celebrate the wedding ceremony of their cherished children
            </p>
          </div>

          {/* Couple Names in Emerald & Bronze */}
          <div className="my-6 sm:my-8 space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#064E3B] tracking-wide">
              {data.groomName}
            </h2>
            <div className="flex items-center justify-center gap-3 py-1">
              <span className="w-12 sm:w-16 h-[1.5px] bg-[#E0A96D]" />
              <span className="italic text-xl sm:text-2xl text-[#E0A96D] font-bold">&amp;</span>
              <span className="w-12 sm:w-16 h-[1.5px] bg-[#E0A96D]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#064E3B] tracking-wide">
              {data.brideName}
            </h2>
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ECFDF5] border border-[#6EE7B7] shadow-sm text-xs sm:text-sm tracking-wider text-[#065F46] font-bold">
            <Calendar className="w-3.5 h-3.5 text-[#E0A96D]" />
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
            title="Anticipating The Big Day In"
            accentColor="#047857"
            textColor="#134E4A"
            secondaryTextColor="#047857"
            borderColor="#E0A96D"
          />
        </section>

        {/* Event Itinerary / Tentative Program */}
        <section className="my-8 sm:my-10 w-full max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#E0A96D] font-bold">
              Celebration Program
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#064E3B] mt-1">
              Ceremonial Flow
            </h3>
            <BotanicalLeafDivider className="w-40 mx-auto my-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full box-border">
            {data.events.map((evt, idx) => (
              <div
                key={idx}
                className="w-full box-border relative flex flex-col sm:flex-row gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#D1FAE5] shadow-sm transition-all hover:shadow-md hover:border-[#047857] break-words"
              >
                <div className="flex sm:flex-col items-center gap-3 sm:gap-0 shrink-0">
                  <span className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#047857] flex items-center justify-center font-bold text-sm border border-[#A7F3D0] shrink-0">
                    0{idx + 1}
                  </span>
                  {idx < data.events.length - 1 && (
                    <span className="hidden sm:block w-[1px] h-full bg-[#D1FAE5] my-2" />
                  )}
                </div>

                <div className="flex-1 text-left space-y-1.5 min-w-0">
                  <h4 className="font-bold text-base text-[#064E3B] break-words">
                    {evt.title}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-[#047857] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
                    <span className="break-words">{evt.time}</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-[#065F46]">
                    <MapPin className="w-3.5 h-3.5 text-[#E0A96D] shrink-0 mt-0.5" />
                    <span className="break-words">{evt.venueName}</span>
                  </div>

                  {evt.description && (
                    <p className="text-xs text-[#047857] pt-1 leading-relaxed border-t border-[#D1FAE5] italic break-words">
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
          <div className="bg-white border border-[#D1FAE5] rounded-3xl p-6 sm:p-8 shadow-md text-center">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#E0A96D] font-bold">
              Garden Pavilion &amp; Lawn
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#064E3B] mt-1">
              {primaryEvent.venueName}
            </h3>
            <p className="text-xs sm:text-sm text-[#065F46] mt-1.5 max-w-md mx-auto">
              {primaryEvent.address}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href={primaryEvent.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#047857] text-white text-xs sm:text-sm font-semibold tracking-wider hover:bg-[#064E3B] transition-colors shadow-sm active:scale-95"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>Get Directions</span>
              </a>

              <AddToCalendar
                event={{
                  title: `Wedding: ${data.groomName} & ${data.brideName}`,
                  description: `Join us for the garden wedding ceremony of ${data.groomName} and ${data.brideName}.`,
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
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#E0A96D] font-bold">
                Moments of Romance
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#064E3B]">
                Botanical Gallery
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {data.gallery.slice(0, 4).map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#A7F3D0] group"
                >
                  <Image
                    src={imgUrl}
                    alt={`Garden wedding celebration preview ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 250px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#022C22]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interactive RSVP Form */}
        {data.rsvp.enabled && (
          <section className="my-8 sm:my-10 w-full max-w-2xl mx-auto px-4">
            <div className="bg-white border border-[#D1FAE5] rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="text-center mb-6">
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#047857] font-bold">
                  Celebrate In Nature
                </span>
                <h3 className="text-2xl font-bold text-[#064E3B] mt-1">
                  RSVP Registration
                </h3>
                <p className="text-xs sm:text-sm text-[#065F46] mt-1">
                  Kindly let us know by{" "}
                  <span className="font-bold text-[#047857]">
                    {data.rsvp.deadline}
                  </span>
                </p>
                <BotanicalLeafDivider className="w-32 mx-auto my-3" />
              </div>

              {rsvpState.submitted ? (
                <div className="text-center py-8 space-y-2 bg-[#ECFDF5] rounded-2xl p-6 border border-[#6EE7B7]">
                  <div className="w-12 h-12 rounded-full bg-[#047857] text-white flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6 fill-current" />
                  </div>
                  <h4 className="font-bold text-base text-[#064E3B]">
                    Thank You, {rsvpState.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#047857]">
                    Your response has been registered with heartfelt warmth.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#065F46] mb-1">
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
                      className="w-full px-4 py-2.5 rounded-xl border border-[#A7F3D0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#047857] bg-[#F7FDF9] text-[#134E4A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#065F46] mb-1">
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
                            ? "bg-[#047857] text-white border-[#047857]"
                            : "bg-[#F7FDF9] text-[#065F46] border-[#A7F3D0] hover:bg-stone-50"
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
                            ? "bg-[#134E4A] text-white border-[#134E4A]"
                            : "bg-[#F7FDF9] text-[#065F46] border-[#A7F3D0] hover:bg-stone-50"
                        }`}
                      >
                        Decline with Regret
                      </button>
                    </div>
                  </div>

                  {rsvpState.attending === "yes" && (
                    <div>
                      <label className="block text-xs font-semibold text-[#065F46] mb-1">
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
                        className="w-full px-4 py-2.5 rounded-xl border border-[#A7F3D0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#047857] bg-[#F7FDF9] text-[#134E4A]"
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
                    <label className="block text-xs font-semibold text-[#065F46] mb-1">
                      Warm Wishes &amp; Blessings
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Convey your cordial greetings to the couple..."
                      value={rsvpState.message}
                      onChange={(e) =>
                        setRsvpState({ ...rsvpState, message: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-[#A7F3D0] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#047857] bg-[#F7FDF9] text-[#134E4A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#047857] to-[#065F46] text-white text-xs sm:text-sm font-semibold tracking-wider hover:brightness-105 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#FDE68A]" />
                    <span>Send RSVP</span>
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* Footer Greetings */}
        <footer className="mt-8 mb-6 text-center space-y-2">
          <BotanicalLeafDivider className="w-40 mx-auto opacity-70" />
          <p className="text-xs sm:text-sm italic text-[#065F46]">
            &ldquo;Like branches of an evergreen tree, may our love grow stronger with each passing day.&rdquo;
          </p>
          {data.hashtag && (
            <p className="text-xs font-mono font-bold tracking-wider text-[#047857]">
              {data.hashtag}
            </p>
          )}
        </footer>
      </main>
      </WaxSealEnvelope>
    </div>
  );
};
