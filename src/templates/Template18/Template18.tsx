"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  IkOnkarKhandaCrest,
  PhulkariCornerBorder,
  AnandKarajDholDivider,
} from "./Decorations";
import { WaxSealEnvelope } from "@/components/common/WaxSealEnvelope";
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

export interface Template18Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template18: React.FC<Template18Props> = ({
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
    title: "Sacred Anand Karaj Ceremony",
    date: data.weddingDate,
    time: "10:00 AM – 1:30 PM",
    venueName: "Sri Guru Nanak Gurdwara Sahib",
    address: "77 Heritage Golden Park",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#FFFBEB] text-[#292524] font-sans antialiased overflow-x-hidden box-border transition-colors duration-500 ${className}`}
      style={{
        backgroundImage: `radial-gradient(#CA8A0422 1.5px, transparent 1.5px), radial-gradient(#B4530915 1px, #FFFBEB 1px)`,
        backgroundSize: "26px 26px, 26px 26px",
        backgroundPosition: "0 0, 13px 13px",
      }}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#B45309] text-white hover:bg-[#92400E] shadow-lg border border-[#CA8A04]"
        />
      )}

      {/* Interactive Anand Karaj Amber & Gold Wax Seal & 3D Gatefold Unfolding Experience */}
      <WaxSealEnvelope
        isOpenDefault={isEnvelopeOpenDefault}
        groomName={data.groomName}
        brideName={data.brideName}
        weddingDate={data.weddingDate}
        primaryColor="#B45309"
        secondaryColor="#CA8A04"
        backgroundColor="#78350F"
        textColor="#FEF08A"
        wreathComponent={
          <IkOnkarKhandaCrest className="w-48 h-48 sm:w-56 sm:h-56 animate-[spin_60s_linear_infinite]" />
        }
        cornerDecorations={
          <>
            <div className="absolute top-4 left-3 sm:left-8 pointer-events-none opacity-75">
              <PhulkariCornerBorder className="w-14 h-14 sm:w-20 sm:h-20" />
            </div>
            <div className="absolute top-4 right-3 sm:right-8 pointer-events-none opacity-75">
              <PhulkariCornerBorder flipX className="w-14 h-14 sm:w-20 sm:h-20" />
            </div>
          </>
        }
      >
        {/* MAIN OPENED INVITATION CONTENT */}
        <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 flex flex-col items-center animate-fadeIn">
          {/* Corner Phulkari Borders */}
          <div className="pointer-events-none absolute top-4 left-3 sm:left-8 z-10 opacity-75">
            <PhulkariCornerBorder className="w-14 h-14 sm:w-20 sm:h-20" />
          </div>
          <div className="pointer-events-none absolute top-4 right-3 sm:right-8 z-10 opacity-75">
            <PhulkariCornerBorder flipX className="w-14 h-14 sm:w-20 sm:h-20" />
          </div>

          <div className="w-full text-center flex flex-col items-center">
            {/* Sacred Inscription Header */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF08A]/80 border border-[#B45309]/40 shadow-xs text-xs sm:text-sm font-serif font-bold text-[#78350F] mb-4">
              <span>|| ਲਖ ਖੁਸੀਆ ਪਾਤਿਸਾਹੀਆ ਜੇ ਸਤਿਗੁਰੁ ਨਦਰਿ ਕਰੇਇ ||</span>
            </div>

            <p className="text-xs sm:text-sm uppercase tracking-widest text-[#B45309] font-bold mb-1">
              With the Grace of Waheguru Ji
            </p>

            {/* Couple Typography */}
            <div className="mb-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-[#292524] tracking-tight drop-shadow-sm">
                {data.groomName}
              </h1>
              <div className="flex items-center justify-center gap-3 my-2">
                <span className="w-8 sm:w-16 h-[1px] bg-[#B45309]" />
                <span className="text-2xl sm:text-3xl font-serif italic text-[#B45309]">&amp;</span>
                <span className="w-8 sm:w-16 h-[1px] bg-[#B45309]" />
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold text-[#292524] tracking-tight drop-shadow-sm">
                {data.brideName}
              </h2>
            </div>

            <AnandKarajDholDivider className="mb-6 max-w-md" />

            {/* Parents' Cordial Invitation Card */}
            <div className="w-full max-w-2xl bg-[#FEFCE8] border border-[#B45309]/30 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 text-center">
              <p className="text-xs sm:text-sm uppercase tracking-wider text-[#B45309] font-bold mb-2">
                Cordially Request Your Presence
              </p>
              <p className="text-base sm:text-lg font-serif text-[#292524] leading-relaxed mb-3">
                <span className="font-bold text-[#B45309]">{data.parentsGroom}</span>
                <span className="block text-xs font-sans text-stone-500 my-1">together with</span>
                <span className="font-bold text-[#B45309]">{data.parentsBride}</span>
              </p>
              <p className="text-xs sm:text-sm text-[#292524]/85 leading-relaxed font-normal max-w-xl mx-auto">
                Cordially request your presence and blessings for the Anand Karaj (Wedding Ceremony) uniting our children in holy matrimony.
              </p>
            </div>

            {/* Muhurtham & Date Badge */}
            <div className="w-full max-w-xl bg-gradient-to-r from-[#FEF08A]/70 via-[#FDE047]/60 to-[#FEF08A]/70 border border-[#B45309]/40 rounded-xl p-4 sm:p-5 mb-8 flex items-center justify-around text-center shadow-xs">
              <div>
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-[#B45309]">
                  Auspicious Date
                </span>
                <span className="text-sm sm:text-base font-serif font-bold text-[#292524]">
                  {data.weddingDate}
                </span>
              </div>
              <div className="w-[1px] h-10 bg-[#B45309]/30" />
              <div>
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-[#B45309]">
                  Lavan Ceremony
                </span>
                <span className="text-sm sm:text-base font-serif font-bold text-[#78350F]">
                  {primaryEvent.time || "10:00 AM – 1:30 PM"}
                </span>
              </div>
            </div>

            {/* COUNTDOWN TIMER */}
            <div className="w-full max-w-md mb-10">
              <CountdownTimer
                targetDate={data.countdownTarget}
                title="Days Until Anand Karaj"
                accentColor="#B45309"
                textColor="#292524"
                secondaryTextColor="#B45309"
                borderColor="#CA8A04"
              />
            </div>

            {/* COUPLE PHOTO GALLERY */}
            {data.gallery && data.gallery.length > 0 && (
              <div className="w-full max-w-4xl mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="w-8 sm:w-16 h-[1px] bg-[#B45309]" />
                  <span className="text-xs sm:text-sm font-serif font-bold uppercase tracking-widest text-[#B45309]">
                    Cherished Moments
                  </span>
                  <span className="w-8 sm:w-16 h-[1px] bg-[#B45309]" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {data.gallery.slice(0, 4).map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden border-2 border-[#B45309]/50 shadow-md group"
                    >
                      <Image
                        src={src}
                        alt={`Couple photo ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#292524]/35 to-transparent" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CEREMONIAL ITINERARY */}
            <div className="w-full max-w-4xl mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-8 sm:w-16 h-[1px] bg-[#B45309]" />
                <h3 className="text-sm sm:text-base font-serif font-bold uppercase tracking-widest text-[#292524]">
                  Ceremonial Program
                </h3>
                <span className="w-8 sm:w-16 h-[1px] bg-[#B45309]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left w-full box-border">
                {data.events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FEFCE8] border border-[#B45309]/30 rounded-2xl p-4 sm:p-6 shadow-sm hover:border-[#B45309] transition flex flex-col justify-between w-full box-border break-words min-w-0"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="min-w-0">
                          <span className="inline-block px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-wide bg-[#B45309]/10 text-[#B45309] border border-[#B45309]/20 mb-1">
                            {idx === 0 ? "Anand Karaj" : "Reception Dinner"}
                          </span>
                          <h4 className="text-base sm:text-lg font-serif font-bold text-[#292524] break-words">
                            {evt.title}
                          </h4>
                        </div>
                        <div className="p-2 rounded-full bg-[#FEF08A] text-[#B45309] border border-[#B45309]/30 shrink-0">
                          <Calendar className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="space-y-2 text-xs sm:text-sm text-[#292524]/90 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#CA8A04] shrink-0" />
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#CA8A04] shrink-0" />
                          <span>{evt.time}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#B45309] mt-0.5 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-semibold text-[#292524] break-words">{evt.venueName}</p>
                            <p className="text-[11px] sm:text-xs text-[#292524]/70 break-words">{evt.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 border-t border-[#B45309]/20 mt-auto w-full">
                      <a
                        href={evt.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#B45309] text-white text-xs font-semibold hover:bg-[#92400E] transition shadow-xs text-center"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Google Maps</span>
                      </a>
                      <a
                        href={`https://ul.waze.com/ul?q=${encodeURIComponent(evt.venueName + " " + evt.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#FFFBEB] border border-[#B45309] text-[#78350F] text-xs font-semibold hover:bg-[#FEF08A] transition text-center"
                      >
                        <Compass className="w-3.5 h-3.5 text-[#B45309]" />
                        <span>Waze</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add to Calendar */}
              <div className="mt-6 flex justify-center">
                <AddToCalendar
                  event={{
                    title: `${data.groomName} & ${data.brideName}'s Anand Karaj`,
                    description: `Anand Karaj Wedding Ceremony of ${data.groomName} and ${data.brideName}.`,
                    location: `${primaryEvent.venueName}, ${primaryEvent.address}`,
                    startDate: data.countdownTarget,
                  }}
                  className="bg-[#FEFCE8] text-[#B45309] border border-[#B45309] shadow-xs hover:bg-[#FEF08A]"
                />
              </div>
            </div>

            {/* INTERACTIVE RSVP SECTION */}
            {data.rsvp.enabled && (
              <div className="w-full max-w-2xl mb-12 bg-[#FEFCE8] border-2 border-[#B45309]/40 rounded-2xl p-6 sm:p-8 shadow-md text-left">
                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#B45309]/10 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#B45309] mb-2">
                    RSVP
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#292524]">
                    Confirm Your Presence
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Kindly respond by {data.rsvp.deadline}
                  </p>
                </div>

                {rsvpState.submitted ? (
                  <div className="p-6 rounded-xl bg-amber-50 border border-amber-300 text-center text-amber-900">
                    <Heart className="w-8 h-8 mx-auto text-[#B45309] mb-2 fill-[#B45309] animate-bounce" />
                    <p className="text-sm font-bold">Dhanvaad Ji, {rsvpState.name}!</p>
                    <p className="text-xs mt-1">
                      Your presence and blessings have been warmly noted with heartfelt gratitude.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#292524] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpState.name}
                        onChange={(e) =>
                          setRsvpState((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="e.g. Jaswinder Singh & Family"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#B45309]/40 bg-[#FFFBEB] text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#B45309]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#292524] mb-1">
                        Will You Attend?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                        {(["yes", "maybe", "no"] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              setRsvpState((prev) => ({ ...prev, attending: opt }))
                            }
                            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold capitalize transition border ${
                              rsvpState.attending === opt
                                ? "bg-[#B45309] text-white border-[#B45309] shadow-xs"
                                : "bg-[#FFFBEB] text-[#292524] border-[#B45309]/30 hover:bg-[#FEF08A]"
                            }`}
                          >
                            {opt === "yes"
                              ? "Gladly Yes"
                              : opt === "maybe"
                              ? "Thinking"
                              : "Regretfully"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {rsvpState.attending !== "no" && (
                      <div>
                        <label className="block text-xs font-bold text-[#292524] mb-1">
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#B45309]/40 bg-[#FFFBEB] text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#B45309]"
                        >
                          {[1, 2, 3, 4, 5, 6].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "Person" : "Family Members"}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-[#292524] mb-1">
                        Blessings &amp; Wishes
                      </label>
                      <textarea
                        rows={3}
                        value={rsvpState.message}
                        onChange={(e) =>
                          setRsvpState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        placeholder="Offer your prayers and warm wishes..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#B45309]/40 bg-[#FFFBEB] text-xs sm:text-sm text-[#292524] focus:outline-none focus:ring-2 focus:ring-[#B45309]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B45309] to-[#92400E] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:from-[#92400E] hover:to-[#78350F] transition flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit RSVP</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* BOTTOM BLESSING */}
            <div className="w-full max-w-xl text-center py-6">
              <AnandKarajDholDivider className="mx-auto mb-4 max-w-sm" />
              <p className="text-xs sm:text-sm font-serif italic text-[#78350F]">
                &ldquo;They are not said to be husband and wife, who merely sit together. Rather, they alone are called husband and wife, who have one soul in two bodies.&rdquo;
              </p>
              <p className="text-[11px] sm:text-xs font-bold text-[#B45309] uppercase tracking-wider mt-2">
                # {data.groomName}And{data.brideName}
              </p>
            </div>
          </div>
        </main>
      </WaxSealEnvelope>
    </div>
  );
};
