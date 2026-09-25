"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  RangoliMarigoldMedallion,
  ToranCornerBorder,
  MarigoldArchDivider,
} from "./Decorations";
import { WaxSealEnvelope } from "@/components/common/WaxSealEnvelope";
import {
  MapPin,
  Clock,
  Calendar,
  Send,
  Heart,
  Phone,
  Navigation,
} from "lucide-react";

export interface Template09Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template09: React.FC<Template09Props> = ({
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
    title: "Auspicious Wedding Ceremony",
    date: data.weddingDate,
    time: "07:15 PM - 08:30 PM",
    venueName: "Dewan The Grand Palace",
    address: "Dhaka, Bangladesh",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full ${isOpen ? "min-h-screen overflow-y-auto" : "h-full max-h-full overflow-hidden"} bg-[#240838] font-serif antialiased text-[#3B0764] overflow-x-hidden ${className}`}
    >
      {/* Interactive Amethyst Rangoli Wax Seal & 3D Gatefold Unfolding Experience */}
      <WaxSealEnvelope
        isOpenDefault={isEnvelopeOpenDefault}
        onOpenComplete={() => setIsOpen(true)}
        groomName={data.groomName}
        brideName={data.brideName}
        weddingDate={data.weddingDate}
        primaryColor="#7E22CE"
        secondaryColor="#EAB308"
        backgroundColor="#3B0764"
        textColor="#FDE047"
        wreathComponent={
          <RangoliMarigoldMedallion className="w-48 h-48 sm:w-56 sm:h-56 animate-[spin_55s_linear_infinite]" color="#E9D5FF" marigoldColor="#FACC15" />
        }
        cornerDecorations={
          <>
            <div className="absolute top-3 left-3 z-20 pointer-events-none">
              <ToranCornerBorder className="w-20 h-20 sm:w-32 sm:h-32 opacity-80" color="#F3E8FF" marigoldColor="#FDE047" />
            </div>
            <div className="absolute top-3 right-3 z-20 pointer-events-none transform scale-x-[-1]">
              <ToranCornerBorder className="w-20 h-20 sm:w-32 sm:h-32 opacity-80" color="#F3E8FF" marigoldColor="#FDE047" />
            </div>
            <div className="absolute bottom-3 left-3 z-20 pointer-events-none transform scale-y-[-1]">
              <ToranCornerBorder className="w-20 h-20 sm:w-32 sm:h-32 opacity-80" color="#F3E8FF" marigoldColor="#FDE047" />
            </div>
            <div className="absolute bottom-3 right-3 z-20 pointer-events-none transform scale-[-1]">
              <ToranCornerBorder className="w-20 h-20 sm:w-32 sm:h-32 opacity-80" color="#F3E8FF" marigoldColor="#FDE047" />
            </div>
          </>
        }
      >
      {/* Main Invitation Card Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 flex flex-col items-center bg-[#FAF5FF] shadow-2xl sm:rounded-3xl my-0 sm:my-8 min-h-screen">
        {/* Top Toran Corners */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 pointer-events-none z-10">
          <ToranCornerBorder className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#7E22CE" marigoldColor="#EAB308" />
        </div>
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 -scale-x-100 pointer-events-none z-10">
          <ToranCornerBorder className="w-16 h-16 sm:w-24 sm:h-24 opacity-75" color="#7E22CE" marigoldColor="#EAB308" />
        </div>

        {/* Hero Header */}
        <header className="pt-10 sm:pt-14 pb-8 px-4 text-center relative flex flex-col items-center max-w-3xl">
          {/* Center Rangoli Crest */}
          <div className="relative mb-4 flex items-center justify-center">
            <RangoliMarigoldMedallion className="w-28 h-28 sm:w-36 sm:h-36" color="#7E22CE" marigoldColor="#EAB308" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold text-[#7E22CE]">
                {data.groomName[0]}&amp;{data.brideName[0]}
              </span>
            </div>
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#7E22CE] font-semibold">
            Celebration of Love &amp; Happiness
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.2em] text-[#B45309] mt-1 font-bold">
            Wedding Ceremony
          </h1>

          <MarigoldArchDivider className="w-40 sm:w-56 my-4" />

          {/* Parents Honor Wording */}
          <div className="space-y-1.5 max-w-xl text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
            <p className="font-semibold text-[#7E22CE]">
              {data.parentsGroom}
            </p>
            <p className="text-[10px] sm:text-xs text-amber-700 uppercase tracking-widest font-serif font-bold">
              Together With
            </p>
            <p className="font-semibold text-[#7E22CE]">
              {data.parentsBride}
            </p>
            <p className="text-xs sm:text-sm text-stone-600 pt-2 font-serif italic">
              With great pleasure request the presence and blessing of you and your family to the wedding ceremony uniting our children
            </p>
          </div>

          {/* Couple Names */}
          <div className="my-6 sm:my-8 space-y-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#7E22CE] font-bold tracking-wide">
              {data.groomName}
            </h2>
            <div className="flex items-center justify-center gap-3 py-1">
              <span className="w-10 sm:w-16 h-[1px] bg-[#EAB308]" />
              <span className="italic text-lg sm:text-xl text-[#EAB308] font-bold">&amp;</span>
              <span className="w-10 sm:w-16 h-[1px] bg-[#EAB308]" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#7E22CE] font-bold tracking-wide">
              {data.brideName}
            </h2>
          </div>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E9D5FF] shadow-sm text-xs sm:text-sm tracking-wider text-[#7E22CE] font-semibold">
            <Calendar className="w-4 h-4 text-[#EAB308]" />
            <span>{primaryEvent.date}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#7E22CE] mt-2 font-sans font-medium">
            Between {primaryEvent.time}
          </p>
        </header>

        {/* Countdown Section */}
        <section
          aria-label="Wedding Countdown"
          className="w-full max-w-md mx-auto my-4 sm:my-6 px-4"
        >
          <CountdownTimer
            targetDate={data.countdownTarget}
            title="Days To The Auspicious Union"
            accentColor="#7E22CE"
            textColor="#3B0764"
            secondaryTextColor="#7E22CE"
            borderColor="#EAB308"
          />
        </section>

        {/* Program Schedule */}
        <section className="w-full max-w-4xl mx-auto my-6 sm:my-10 px-2">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#EAB308] font-bold">
              Ceremonial Schedule
            </span>
            <h3 className="text-2xl sm:text-3xl text-[#7E22CE] font-bold mt-1">
              Events &amp; Festivities
            </h3>
            <MarigoldArchDivider className="w-36 sm:w-48 mx-auto my-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full box-border">
            {data.events.map((evt, idx) => (
              <div
                key={idx}
                className="w-full box-border p-4 sm:p-5 rounded-2xl bg-white border border-[#E9D5FF] shadow-sm hover:border-[#EAB308] transition-all hover:shadow-md break-words min-w-0"
              >
                <div className="flex items-center justify-between border-b border-[#FAF5FF] pb-2 mb-2">
                  <h4 className="font-bold text-sm sm:text-base text-[#7E22CE] break-words">
                    {evt.title}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F3E8FF] text-[#7E22CE] font-sans font-semibold text-xs shrink-0">
                    0{idx + 1}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#B45309] font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span className="break-words">{evt.time}</span>
                </div>

                <div className="flex items-start gap-1.5 text-xs sm:text-sm text-stone-700">
                  <MapPin className="w-3.5 h-3.5 text-[#7E22CE] shrink-0 mt-0.5" />
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

        {/* Reception Venue & Directions */}
        <section className="w-full max-w-3xl mx-auto my-6 sm:my-8 px-2">
          <div className="bg-gradient-to-br from-[#7E22CE] via-[#6B21A8] to-[#3B0764] text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
            <span className="text-xs uppercase tracking-[0.2em] text-[#FDE047] font-bold">
              Ceremony Venue
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-1 text-white">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EAB308] text-[#3B0764] text-xs sm:text-sm font-bold tracking-wider hover:bg-[#FACC15] transition-colors shadow-md active:scale-95"
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

        {/* Photo Gallery Grid */}
        {data.gallery && data.gallery.length > 0 && (
          <section className="w-full max-w-4xl mx-auto my-6 sm:my-10 px-2">
            <div className="text-center mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-[#EAB308] font-bold">
                Cherished Memories
              </span>
              <h3 className="text-2xl sm:text-3xl text-[#7E22CE] font-bold">
                Wedding Moments
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {data.gallery.slice(0, 4).map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#E9D5FF] group"
                >
                  <Image
                    src={imgUrl}
                    alt={`Amethyst wedding preview ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B0764]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interactive RSVP Form */}
        {data.rsvp.enabled && (
          <section className="w-full max-w-2xl mx-auto my-6 sm:my-10 px-2">
            <div className="bg-white border-2 border-[#EAB308]/40 rounded-3xl p-6 sm:p-8 shadow-md">
              <div className="text-center mb-5">
                <span className="text-xs uppercase tracking-[0.2em] text-[#7E22CE] font-bold">
                  Grace The Occasion
                </span>
                <h3 className="text-2xl sm:text-3xl text-[#7E22CE] font-bold mt-1">
                  RSVP Kindly
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Kindly reply before{" "}
                  <span className="font-bold text-[#7E22CE]">
                    {data.rsvp.deadline}
                  </span>
                </p>
                <MarigoldArchDivider className="w-32 mx-auto my-2" />
              </div>

              {rsvpState.submitted ? (
                <div className="text-center py-6 space-y-2 bg-[#FAF5FF] rounded-2xl p-4 border border-[#E9D5FF]">
                  <div className="w-10 h-10 rounded-full bg-[#7E22CE] text-white flex items-center justify-center mx-auto">
                    <Heart className="w-5 h-5 fill-current" />
                  </div>
                  <h4 className="font-bold text-base sm:text-lg text-[#7E22CE]">
                    Thank You, {rsvpState.name}!
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-700">
                    Your presence will illuminate our celebration. Blessings recorded with joy!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvpSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#7E22CE] mb-1 font-sans">
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7E22CE] focus:border-transparent bg-[#FAF5FF] font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-[#7E22CE] mb-1 font-sans">
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
                            ? "bg-[#7E22CE] text-white border-[#7E22CE]"
                            : "bg-[#FAF5FF] text-stone-700 border-stone-300 hover:bg-purple-50"
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
                            : "bg-[#FAF5FF] text-stone-700 border-stone-300 hover:bg-purple-50"
                        }`}
                      >
                        Regretfully Decline
                      </button>
                    </div>
                  </div>

                  {rsvpState.attending === "yes" && (
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-[#7E22CE] mb-1 font-sans">
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7E22CE] bg-[#FAF5FF] font-sans"
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
                    <label className="block text-xs sm:text-sm font-semibold text-[#7E22CE] mb-1 font-sans">
                      Prayers &amp; Wishes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Share your prayers or wishes for the couple..."
                      value={rsvpState.message}
                      onChange={(e) =>
                        setRsvpState({
                          ...rsvpState,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#7E22CE] bg-[#FAF5FF] font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7E22CE] to-[#9333EA] text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:opacity-95 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
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
          <div className="bg-[#FAF5FF] border border-[#E9D5FF] rounded-2xl p-4 sm:p-5 text-center">
            <span className="text-xs uppercase tracking-wider text-[#7E22CE] font-bold">
              Guest Coordination
            </span>
            <div className="flex items-center justify-center gap-4 mt-2">
              <a
                href={`tel:${data.rsvp.contactNumber}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#EAB308]/50 text-xs sm:text-sm text-[#7E22CE] font-bold shadow-sm hover:border-[#7E22CE] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#EAB308]" />
                <span>Call {data.rsvp.contactNumber}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full max-w-2xl mx-auto mt-8 text-center pb-8 px-4 space-y-2">
          <MarigoldArchDivider className="w-32 sm:w-40 mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-stone-600 italic">
            With affectionate regards, blessings, and boundless joy
          </p>
          <p className="text-sm sm:text-base font-bold tracking-wider text-[#7E22CE]">
            {data.groomName.split(" ")[0]} &amp; {data.brideName.split(" ")[0]}
          </p>
          <p className="text-xs text-stone-400 font-sans pt-2">
            Rangoli Festive Wedding Card
          </p>
        </footer>
      </main>
      </WaxSealEnvelope>

      {/* Floating Audio Player */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          title={data.audio.title || "Festive Shehnai Symphony"}
          artist={data.audio.artist || "Traditional Wedding Troupe"}
          accentColor="#EAB308"
          position="bottom-right"
        />
      )}
    </div>
  );
};
