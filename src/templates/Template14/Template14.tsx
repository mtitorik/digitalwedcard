"use client";

import React, { useState } from "react";
import Image from "next/image";
import { WeddingInviteData } from "@/types/invite";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { AudioPlayerToggle } from "@/components/common/AudioPlayerToggle";
import { AddToCalendar } from "@/components/common/AddToCalendar";
import {
  VinayakarGaneshaCrest,
  TempleBellCornerBorder,
  SacredKalashDivider,
  TempleArchBrocadeHeader,
} from "./Decorations";
import {
  MapPin,
  Clock,
  Calendar,
  Send,
  Heart,
  Phone,
  Sparkles,
  Navigation,
  Compass,
} from "lucide-react";

export interface Template14Props {
  data?: WeddingInviteData;
  className?: string;
  isEnvelopeOpenDefault?: boolean;
}

export const Template14: React.FC<Template14Props> = ({
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
    title: "Sacred Wedding Ceremony",
    date: data.weddingDate,
    time: "9:00 AM – 12:30 PM",
    venueName: "Sri Meenakshi Sundareswarar Temple Hall",
    address: "50 Temple Sanctuary Road",
    mapsUrl: "https://maps.google.com",
  };

  return (
    <div
      className={`relative w-full min-h-screen bg-[#FFFBEB] text-[#450A0A] font-sans antialiased overflow-x-hidden transition-colors duration-500 ${className}`}
      style={{
        backgroundImage: `radial-gradient(#D9770622 1.5px, transparent 1.5px), radial-gradient(#991B1B15 1px, #FFFBEB 1px)`,
        backgroundSize: "26px 26px, 26px 26px",
        backgroundPosition: "0 0, 13px 13px",
      }}
    >
      {/* Audio Player Toggle */}
      {data.audio.enabled && (
        <AudioPlayerToggle
          trackUrl={data.audio.trackUrl}
          className="fixed bottom-5 right-5 z-40 bg-[#991B1B] text-white hover:bg-[#7F1D1D] shadow-lg border border-[#F59E0B]"
        />
      )}

      {/* ENVELOPE / TRADITIONAL TEMPLE SEAL COVER */}
      {!isOpen ? (
        <div className="min-h-screen flex flex-col justify-between items-center p-6 sm:p-10 text-center relative z-20 max-w-2xl mx-auto">
          {/* Top Hanging Temple Arch Header */}
          <div className="w-full pt-2">
            <TempleArchBrocadeHeader />
          </div>

          <div className="my-auto py-8 flex flex-col items-center max-w-md">
            {/* Sacred Inscription Badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF08A]/70 border border-[#991B1B]/40 text-xs sm:text-sm font-serif font-bold text-[#991B1B]">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>|| ॐ श्री गणेशाय नमः ||</span>
            </div>

            {/* Vinayakar Centerpiece */}
            <div className="relative mb-5 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#F59E0B]/25 rounded-full blur-xl animate-pulse" />
              <VinayakarGaneshaCrest className="w-40 h-40 sm:w-52 sm:h-52 drop-shadow-md" />
            </div>

            <p className="text-xs sm:text-sm uppercase tracking-widest font-serif text-[#D97706] font-bold mb-1">
              Auspicious Wedding Invitation
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#450A0A] mb-2 tracking-tight">
              {data.groomName}
              <span className="block text-xl sm:text-2xl font-normal text-[#991B1B] my-0.5">&amp;</span>
              {data.brideName}
            </h1>

            <p className="text-xs sm:text-sm text-[#78350F] font-medium mb-6">
              {data.weddingDate}
            </p>

            {/* Interactive Crimson Om Seal CTA */}
            <button
              onClick={() => setIsOpen(true)}
              className="group relative flex flex-col items-center focus:outline-none transition transform active:scale-95"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#991B1B] via-[#DC2626] to-[#F59E0B] p-1 shadow-xl hover:shadow-[#F59E0B]/50 hover:scale-105 transition duration-300">
                <div className="w-full h-full rounded-full border-2 border-[#FEF08A]/80 bg-[#7F1D1D] flex flex-col items-center justify-center text-[#FEF08A]">
                  <span className="text-xl sm:text-2xl font-serif font-bold tracking-widest leading-none">
                    ॐ
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-[#FEF08A] mt-1">
                    Open
                  </span>
                </div>
              </div>
              <span className="mt-3 text-xs sm:text-sm tracking-wider font-semibold uppercase text-[#991B1B] group-hover:text-[#7F1D1D] transition flex items-center gap-1.5">
                <span>Tap to Open Invitation</span>
                <Heart className="w-3.5 h-3.5 fill-[#991B1B] text-[#991B1B]" />
              </span>
            </button>
          </div>

          <div className="w-full pb-2">
            <SacredKalashDivider className="mx-auto" />
          </div>
        </div>
      ) : (
        /* MAIN OPENED INVITATION CONTENT */
        <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-14 flex flex-col items-center animate-fadeIn">
          {/* Top Sticky Brocade Header */}
          <div className="w-full max-w-4xl mx-auto mb-6">
            <TempleArchBrocadeHeader />
          </div>

          {/* Corner Temple Bells */}
          <div className="pointer-events-none absolute top-4 left-4 z-10 opacity-75">
            <TempleBellCornerBorder className="w-16 h-16 sm:w-24 sm:h-24" />
          </div>
          <div className="pointer-events-none absolute top-4 right-4 z-10 opacity-75">
            <TempleBellCornerBorder flipX className="w-16 h-16 sm:w-24 sm:h-24" />
          </div>

          <div className="w-full text-center flex flex-col items-center">
            {/* Sacred Invocations */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEF08A]/80 border border-[#991B1B]/40 shadow-xs text-xs sm:text-sm font-serif font-bold text-[#991B1B] mb-4">
              <span>|| ॐ श्री गणेशाय नमः ||</span>
            </div>

            <p className="text-xs sm:text-sm uppercase tracking-widest text-[#D97706] font-bold mb-1">
              With the Sacred Grace of the Divine
            </p>

            {/* Couple Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-[#450A0A] tracking-tight mb-2 drop-shadow-sm">
              {data.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-1">
              <span className="w-10 sm:w-16 h-[1px] bg-[#991B1B]" />
              <span className="text-2xl sm:text-3xl font-serif italic text-[#991B1B]">&amp;</span>
              <span className="w-10 sm:w-16 h-[1px] bg-[#991B1B]" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-[#450A0A] tracking-tight mb-4 drop-shadow-sm">
              {data.brideName}
            </h2>

            <SacredKalashDivider className="mb-6" />

            {/* Parents & Family Cordial Invitation Card */}
            <div className="bg-[#FEFCE8] border border-[#991B1B]/30 rounded-2xl p-6 sm:p-8 shadow-sm w-full max-w-2xl mb-6 text-center">
              <p className="text-xs sm:text-sm uppercase tracking-wider text-[#991B1B] font-bold mb-2">
                Cordially Invite You
              </p>
              <p className="text-base sm:text-lg font-serif text-[#450A0A] leading-relaxed mb-3">
                <span className="font-bold text-[#991B1B]">{data.parentsGroom}</span>
                <span className="block text-xs sm:text-sm font-sans text-stone-500 my-1">together with</span>
                <span className="font-bold text-[#991B1B]">{data.parentsBride}</span>
              </p>
              <p className="text-xs sm:text-sm text-[#450A0A]/85 leading-relaxed font-normal max-w-lg mx-auto">
                Request the honour of your presence and warm blessings at the sacred wedding ceremony of their children.
              </p>
            </div>

            {/* Muhurtham & Date Badge */}
            <div className="w-full max-w-xl bg-gradient-to-r from-[#FEF08A]/70 via-[#FDE047]/60 to-[#FEF08A]/70 border border-[#991B1B]/40 rounded-2xl p-4 sm:p-5 mb-8 flex items-center justify-around text-center shadow-xs">
              <div>
                <span className="block text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[#991B1B]">
                  Auspicious Date
                </span>
                <span className="text-xs sm:text-base font-serif font-bold text-[#450A0A]">
                  {data.weddingDate}
                </span>
              </div>
              <div className="w-[1px] h-10 bg-[#991B1B]/30" />
              <div>
                <span className="block text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[#991B1B]">
                  Subha Muhurtham
                </span>
                <span className="text-xs sm:text-base font-serif font-bold text-[#7F1D1D]">
                  {primaryEvent.time || "9:00 AM – 12:30 PM"}
                </span>
              </div>
            </div>

            {/* COUNTDOWN TIMER */}
            <div className="w-full max-w-2xl mb-8 bg-[#FEFCE8] border border-[#991B1B]/30 rounded-3xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#991B1B] mb-3">
                <Clock className="w-4 h-4 text-[#D97706]" />
                <span>Days to The Sacred Union</span>
              </div>
              <CountdownTimer
                targetDate={data.countdownTarget}
                title="Days to The Wedding"
                accentColor="#991B1B"
                className="p-0"
              />
            </div>

            {/* COUPLE PHOTO GALLERY */}
            {data.gallery && data.gallery.length > 0 && (
              <div className="w-full max-w-4xl mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="w-8 sm:w-12 h-[1px] bg-[#991B1B]" />
                  <span className="text-xs sm:text-sm font-serif font-bold uppercase tracking-widest text-[#991B1B]">
                    Precious Memories
                  </span>
                  <span className="w-8 sm:w-12 h-[1px] bg-[#991B1B]" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  {data.gallery.slice(0, 4).map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#991B1B]/50 shadow-md group"
                    >
                      <Image
                        src={src}
                        alt={`Couple photo ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#450A0A]/35 to-transparent" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CEREMONIAL ITINERARY */}
            <div className="w-full max-w-4xl mb-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <span className="w-8 sm:w-12 h-[1px] bg-[#991B1B]" />
                <h3 className="text-sm sm:text-base font-serif font-bold uppercase tracking-widest text-[#450A0A]">
                  Wedding Itinerary
                </h3>
                <span className="w-8 sm:w-12 h-[1px] bg-[#991B1B]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left w-full box-border">
                {data.events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="w-full box-border bg-[#FEFCE8] border border-[#991B1B]/30 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-[#991B1B] transition break-words min-w-0"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0 flex-1">
                        <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-[#991B1B]/10 text-[#991B1B] border border-[#991B1B]/20 mb-1">
                          {idx === 0 ? "Sacred Muhurtham" : "Reception Feast"}
                        </span>
                        <h4 className="text-base sm:text-lg font-serif font-bold text-[#450A0A] break-words">
                          {evt.title}
                        </h4>
                      </div>
                      <div className="p-2 rounded-full bg-[#FEF08A] text-[#991B1B] border border-[#991B1B]/30 shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs sm:text-sm text-[#450A0A]/90 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                        <span className="break-words">{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                        <span className="break-words">{evt.time}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#991B1B] mt-0.5 shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-[#450A0A] break-words">{evt.venueName}</p>
                          <p className="text-xs text-[#450A0A]/70 break-words">{evt.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 border-t border-[#991B1B]/20">
                      <a
                        href={evt.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#991B1B] text-white text-xs font-semibold hover:bg-[#7F1D1D] transition shadow-xs text-center"
                      >
                        <Navigation className="w-3.5 h-3.5 shrink-0" />
                        <span>Google Maps</span>
                      </a>
                      <a
                        href={`https://ul.waze.com/ul?q=${encodeURIComponent(evt.venueName + " " + evt.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 py-2.5 px-3 rounded-xl bg-[#FFFBEB] border border-[#991B1B] text-[#991B1B] text-xs font-semibold hover:bg-[#FEF08A] transition text-center"
                      >
                        <Compass className="w-3.5 h-3.5 shrink-0" />
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
                    title: `${data.groomName} & ${data.brideName}'s Wedding`,
                    description: `Wedding Ceremony of ${data.groomName} and ${data.brideName}.`,
                    location: `${primaryEvent.venueName}, ${primaryEvent.address}`,
                    startDate: data.countdownTarget,
                  }}
                  className="bg-[#FEFCE8] text-[#991B1B] border border-[#991B1B] shadow-xs hover:bg-[#FEF08A]"
                />
              </div>
            </div>

            {/* FAMILY CONTACT PERSONS */}
            <div className="w-full max-w-2xl mb-8 bg-[#FEFCE8] border border-[#991B1B]/30 rounded-2xl p-5 sm:p-6 shadow-sm text-left">
              <h4 className="text-xs sm:text-sm font-serif font-bold uppercase tracking-wider text-[#991B1B] mb-4 text-center">
                For More Info / Contact Persons
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full box-border">
                <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#991B1B]/20">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block mb-0.5">
                    Groom Side
                  </span>
                  <p className="text-xs sm:text-sm font-serif font-bold text-[#450A0A] mb-2">
                    Mr. Khisyo
                  </p>
                  <a
                    href="tel:+601155589068"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#991B1B] hover:text-[#7F1D1D]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Call Family</span>
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#991B1B]/20">
                  <span className="text-[10px] uppercase font-bold text-stone-500 block mb-0.5">
                    Bride Side
                  </span>
                  <p className="text-xs sm:text-sm font-serif font-bold text-[#450A0A] mb-2">
                    Mr. Palaniandy
                  </p>
                  <a
                    href="tel:+601155589068"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#991B1B] hover:text-[#7F1D1D]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Call Family</span>
                  </a>
                </div>
              </div>
            </div>

            {/* INTERACTIVE RSVP SECTION */}
            {data.rsvp.enabled && (
              <div className="w-full max-w-2xl mb-8 bg-[#FEFCE8] border-2 border-[#991B1B]/40 rounded-3xl p-6 sm:p-8 shadow-md text-left">
                <div className="text-center mb-5">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-[#991B1B]/10 text-xs font-bold uppercase tracking-wider text-[#991B1B] mb-1">
                    RSVP
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#450A0A]">
                    Confirm Your Auspicious Presence
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 mt-1">
                    Kindly respond by {data.rsvp.deadline}
                  </p>
                </div>

                {rsvpState.submitted ? (
                  <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 text-center text-amber-900">
                    <Heart className="w-10 h-10 mx-auto text-[#991B1B] mb-2 fill-[#991B1B] animate-bounce" />
                    <p className="text-base font-bold">Dhanyavaad, {rsvpState.name}!</p>
                    <p className="text-xs sm:text-sm mt-1">
                      Your presence and prayers have been registered with immense joy and gratitude.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#450A0A] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpState.name}
                        onChange={(e) =>
                          setRsvpState((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="e.g. Dr. K. Nathan & Family"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#991B1B]/40 bg-[#FFFBEB] text-xs sm:text-sm text-[#450A0A] focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-[#450A0A] mb-1">
                        Will You Attend?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {(["yes", "maybe", "no"] as const).map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              setRsvpState((prev) => ({ ...prev, attending: opt }))
                            }
                            className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold capitalize transition border ${
                              rsvpState.attending === opt
                                ? "bg-[#991B1B] text-white border-[#991B1B] shadow-xs"
                                : "bg-[#FFFBEB] text-[#450A0A] border-[#991B1B]/30 hover:bg-[#FEF08A]"
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
                        <label className="block text-xs sm:text-sm font-bold text-[#450A0A] mb-1">
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
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#991B1B]/40 bg-[#FFFBEB] text-xs sm:text-sm text-[#450A0A] focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
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
                      <label className="block text-xs sm:text-sm font-bold text-[#450A0A] mb-1">
                        Auspicious Blessing
                      </label>
                      <textarea
                        rows={2}
                        value={rsvpState.message}
                        onChange={(e) =>
                          setRsvpState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        placeholder="Offer your prayers and blessings to the couple..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#991B1B]/40 bg-[#FFFBEB] text-xs sm:text-sm text-[#450A0A] focus:outline-none focus:ring-2 focus:ring-[#991B1B]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#991B1B] to-[#7F1D1D] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:from-[#7F1D1D] hover:to-[#450A0A] transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit RSVP</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* BOTTOM BLESSING */}
            <div className="w-full max-w-2xl text-center py-6">
              <SacredKalashDivider className="mx-auto mb-3" />
              <p className="text-xs sm:text-sm font-serif italic text-[#78350F] max-w-md mx-auto">
                &ldquo;May your love bloom like a lotus in the sacred temple of life.&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#991B1B] uppercase tracking-wider mt-2">
                # {data.groomName}And{data.brideName}
              </p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};
