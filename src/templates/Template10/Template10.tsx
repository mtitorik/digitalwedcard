"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  GeometricCurveCrest,
  FairyLightsCorner,
  SaffronWaveDivider,
} from "./Decorations";
import {
  MapPin,
  Clock,
  Calendar,
  Send,
  Heart,
  Phone,
  Navigation,
  Hash,
} from "lucide-react";

export interface Template10Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template10: React.FC<Template10Props> = ({
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
    title: "Wedding Ceremony & Sangeet",
    date: data.weddingDate,
    time: "06:00 PM to 08:00 PM",
    venueName: "The Royal Orchid Banquet Hall",
    address: "Dhaka, Bangladesh",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#1F0833] font-sans antialiased text-[#2E1065] overflow-x-hidden ${className}`}
    >
      {/* Royal Purple & Saffron Seal Opener Overlay */}
      {!isOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-[#581C87] via-[#6D28D9] to-[#3B0764] flex flex-col items-center justify-between p-6 sm:p-10 text-center text-white animate-fade-in overflow-y-auto">
          {/* Fairy Lights Corners */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
            <FairyLightsCorner className="w-20 h-20 sm:w-32 sm:h-32 opacity-80" color="#E9D5FF" saffronColor="#FDE047" />
          </div>
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 -scale-x-100">
            <FairyLightsCorner className="w-20 h-20 sm:w-32 sm:h-32 opacity-80" color="#E9D5FF" saffronColor="#FDE047" />
          </div>

          <div className="pt-12 sm:pt-16">
            <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FDE047] font-semibold">
              Celebration Invitation
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-serif tracking-wide text-white">
              {data.groomName.split(" ")[0]} &amp; {data.brideName.split(" ")[0]}
            </h2>
          </div>

          {/* Interactive Arch Opener Button */}
          <div className="my-auto py-8 flex flex-col items-center">
            <div className="relative group cursor-pointer" onClick={() => setIsOpen(true)}>
              <GeometricCurveCrest className="w-48 h-48 sm:w-56 sm:h-56 animate-[spin_60s_linear_infinite]" color="#C084FC" saffronColor="#FBBF24" />

              <button
                onClick={() => setIsOpen(true)}
                aria-label="Open wedding invitation"
                className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#6D28D9] via-[#8B5CF6] to-[#FBBF24] text-white shadow-2xl flex flex-col items-center justify-center border-2 border-[#FDE047] transform transition-all duration-300 hover:scale-105 active:scale-95 group-hover:shadow-purple-500/40"
              >
                <span className="font-serif font-bold text-lg sm:text-xl tracking-wider text-amber-200">
                  {data.groomName[0]}&amp;{data.brideName[0]}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold mt-0.5 text-white/90">
                  Open
                </span>
              </button>
            </div>

            <p className="mt-8 text-xs sm:text-sm text-[#FDE047]/80 italic tracking-wider animate-pulse">
              Tap the seal to reveal the celebration
            </p>
          </div>

          <div className="pb-8">
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#FBBF24]">
              {data.weddingDate}
            </p>
          </div>
        </div>
      )}

      {/* Main Invitation Card Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 flex flex-col items-center bg-[#FDF4FF] shadow-2xl sm:rounded-3xl my-0 sm:my-8 min-h-screen">
        {/* Top Fairy Lights Corners */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 pointer-events-none z-10">
          <FairyLightsCorner className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#6D28D9" saffronColor="#FBBF24" />
        </div>
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 -scale-x-100 pointer-events-none z-10">
          <FairyLightsCorner className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#6D28D9" saffronColor="#FBBF24" />
        </div>

        {/* Hero Header */}
        <header className="pt-10 sm:pt-14 pb-8 px-4 text-center relative flex flex-col items-center max-w-3xl">
          {/* Center Curve Crest */}
          <div className="relative mb-4 flex items-center justify-center">
            <GeometricCurveCrest className="w-28 h-28 sm:w-36 sm:h-36" color="#6D28D9" saffronColor="#FBBF24" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#6D28D9]">
                {data.groomName[0]}&amp;{data.brideName[0]}
              </span>
            </div>
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#6D28D9] font-semibold">
            Celebration of Love &amp; Joy
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.2em] text-[#B45309] mt-1 font-bold font-serif">
            Wedding Ceremony
          </h1>

          <SaffronWaveDivider className="w-40 sm:w-56 my-4" />

          {/* Parents Honor Wording */}
          <div className="space-y-1.5 max-w-xl text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            <p className="font-semibold text-[#6D28D9]">
              {data.parentsGroom}
            </p>
            <p className="text-[10px] sm:text-xs text-amber-600 uppercase tracking-widest font-semibold">
              Together With
            </p>
            <p className="font-semibold text-[#6D28D9]">
              {data.parentsBride}
            </p>
            <p className="text-xs sm:text-sm text-stone-500 pt-2 font-serif italic">
              With much love and pleasure, we request your kind presence to witness and bless the wedding ceremony of our beloved children
            </p>
          </div>

          {/* Couple Names */}
          <div className="my-6 sm:my-8 space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#6D28D9] font-bold tracking-wide">
              {data.groomName}
            </h2>
            <div className="flex items-center justify-center gap-3 py-1">
              <span className="w-10 sm:w-16 h-[1px] bg-[#FBBF24]" />
              <span className="font-serif italic text-lg sm:text-xl text-[#FBBF24] font-bold">&amp;</span>
              <span className="w-10 sm:w-16 h-[1px] bg-[#FBBF24]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#6D28D9] font-bold tracking-wide">
              {data.brideName}
            </h2>
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-purple-200 shadow-sm text-xs sm:text-sm tracking-wider text-[#6D28D9] font-semibold">
            <Calendar className="w-4 h-4 text-[#FBBF24]" />
            <span>{primaryEvent.date}</span>
          </div>
          <p className="text-xs sm:text-sm text-purple-700 mt-2 font-medium">
            Between {primaryEvent.time}
          </p>

          {/* Hashtag Pill */}
          {data.hashtag && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-[#6D28D9] text-xs sm:text-sm font-semibold">
              <Hash className="w-3.5 h-3.5 text-[#FBBF24]" />
              <span>{data.hashtag.replace("#", "")}</span>
            </div>
          )}
        </header>

        {/* Photo Gallery Grid */}
        {data.gallery && data.gallery.length > 0 && (
          <section className="w-full max-w-4xl mx-auto my-6 sm:my-10 px-2">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#FBBF24] font-bold">
                Precious Memories
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#6D28D9] font-bold">
                Our Gallery
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {data.gallery.slice(0, 4).map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-purple-100 group"
                >
                  <Image
                    src={imgUrl}
                    alt={`Purple celebration gallery ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Countdown Section */}
        <section
          aria-label="Celebration Countdown"
          className="w-full max-w-2xl mx-auto my-4 sm:my-6 px-2"
        >
          <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-200/80 rounded-3xl p-5 sm:p-6 shadow-sm">
            <CountdownTimer
              targetDate={data.countdownTarget}
              title="Days To The Celebration"
              accentColor="#6D28D9"
              className="p-0"
            />
          </div>
        </section>

        {/* Program Schedule */}
        <section className="w-full max-w-4xl mx-auto my-6 sm:my-10 px-2">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#FBBF24] font-bold">
              Wedding Schedule
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#6D28D9] font-bold mt-1">
              Ceremonial Itinerary
            </h3>
            <SaffronWaveDivider className="w-36 sm:w-48 mx-auto my-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full box-border">
            {data.events.map((evt, idx) => (
              <div
                key={idx}
                className="w-full box-border p-4 sm:p-5 rounded-2xl bg-white border border-purple-100 shadow-sm hover:border-[#6D28D9] transition-all hover:shadow-md break-words min-w-0"
              >
                <div className="flex items-center justify-between border-b border-purple-50 pb-2 mb-2">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#6D28D9] break-words">
                    {evt.title}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#6D28D9] font-semibold text-xs shrink-0">
                    0{idx + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#B45309] font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span className="break-words">{evt.time}</span>
                </div>

                <div className="flex items-start gap-1.5 text-xs sm:text-sm text-stone-700">
                  <MapPin className="w-3.5 h-3.5 text-[#6D28D9] shrink-0 mt-0.5" />
                  <span className="break-words">{evt.venueName}</span>
                </div>

                {evt.description && (
                  <p className="text-xs text-stone-500 font-sans mt-2 pt-2 border-t border-purple-50 break-words">
                    {evt.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Venue & Directions */}
        <section className="w-full max-w-3xl mx-auto my-6 sm:my-8 px-2">
          <div className="bg-gradient-to-br from-[#6D28D9] via-[#5B21B6] to-[#3B0764] text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FDE047] font-bold">
              Ceremony &amp; Festivities Venue
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold mt-1 text-white">
              {primaryEvent.venueName}
            </h3>
            <p className="text-xs sm:text-sm text-purple-100 mt-1 max-w-md mx-auto">
              {primaryEvent.address}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href={primaryEvent.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FBBF24] text-[#3B0764] text-xs sm:text-sm font-bold tracking-wider hover:bg-[#FCD34D] transition-colors shadow-md active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <AddToCalendar
                event={{
                  title: `Wedding: ${data.groomName} & ${data.brideName}`,
                  description: `Wedding Ceremony of ${data.groomName} and ${data.brideName}.`,
                  location: `${primaryEvent.venueName}, ${primaryEvent.address}`,
                  startDate: data.countdownTarget,
                }}
                buttonText="Save Date"
                className="text-xs sm:text-sm"
              />
            </div>
          </div>
        </section>

        {/* Interactive RSVP Form */}
        {data.rsvp.enabled && (
          <section className="w-full max-w-2xl mx-auto my-6 sm:my-10 px-2">
            <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="text-center mb-5">
                <span className="text-xs uppercase tracking-[0.2em] text-[#6D28D9] font-bold">
                  Grace The Celebration
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#6D28D9] font-bold mt-1">
                  RSVP Kindly
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Kindly reply before{" "}
                  <span className="font-bold text-[#6D28D9]">
                    {data.rsvp.deadline}
                  </span>
                </p>
                <SaffronWaveDivider className="w-32 mx-auto my-2" />
              </div>

              {rsvpState.submitted ? (
                <div className="text-center py-6 space-y-2 bg-purple-50 rounded-2xl p-4 border border-purple-200">
                  <div className="w-10 h-10 rounded-full bg-[#6D28D9] text-white flex items-center justify-center mx-auto">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#6D28D9]">
                    Thank You, {rsvpState.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700">
                    We are overjoyed to celebrate our special day with you!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#6D28D9] mb-1">
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9] focus:border-transparent bg-[#FDF4FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#6D28D9] mb-1">
                      Will You Attend?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setRsvpState({ ...rsvpState, attending: "yes" })
                        }
                        className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          rsvpState.attending === "yes"
                            ? "bg-[#6D28D9] text-white border-[#6D28D9]"
                            : "bg-[#FDF4FF] text-stone-700 border-stone-300 hover:bg-purple-50"
                        }`}
                      >
                        Joyfully Attend
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setRsvpState({ ...rsvpState, attending: "no" })
                        }
                        className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          rsvpState.attending === "no"
                            ? "bg-stone-800 text-white border-stone-800"
                            : "bg-[#FDF4FF] text-stone-700 border-stone-300 hover:bg-purple-50"
                        }`}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {rsvpState.attending === "yes" && (
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#6D28D9] mb-1">
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9] bg-[#FDF4FF]"
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
                    <label className="block text-xs sm:text-sm font-semibold text-[#6D28D9] mb-1">
                      Warm Wishes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Write your prayers or words of love..."
                      value={rsvpState.message}
                      onChange={(e) =>
                        setRsvpState({
                          ...rsvpState,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9] bg-[#FDF4FF]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:opacity-95 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send RSVP</span>
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* Contact Person Card */}
        <section className="w-full max-w-xl mx-auto my-4 px-2">
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-5 text-center">
            <span className="text-xs uppercase tracking-wider text-[#6D28D9] font-bold">
              Guest Assistance
            </span>
            <div className="flex items-center justify-center gap-4 mt-2">
              <a
                href={`tel:${data.rsvp.contactNumber}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#FBBF24]/50 text-xs sm:text-sm text-[#6D28D9] font-bold shadow-sm hover:border-[#6D28D9] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>Call {data.rsvp.contactNumber}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-2xl mx-auto mt-8 text-center pb-8 px-4 space-y-2">
          <SaffronWaveDivider className="w-32 sm:w-40 mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-stone-500 italic">
            Sharing our joyous beginnings with gratitude, blessings, and love
          </p>
          <p className="text-sm sm:text-base font-serif font-bold tracking-wider text-[#6D28D9]">
            {data.groomName.split(" ")[0]} &amp; {data.brideName.split(" ")[0]}
          </p>
          <p className="text-xs text-stone-400 pt-2">
            Royal Purple Celebration Card
          </p>
        </footer>
      </main>

      {/* Floating Audio Player */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          title={data.audio.title || "Celebratory Harmonies"}
          artist={data.audio.artist || "Acoustic Wedding Troupe"}
          accentColor="#FBBF24"
          position="bottom-right"
        />
      )}
    </div>
  );
};
