"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RSVPForm } from "@/components/public/RSVPForm";
import { AudioPlayer } from "@/components/public/AudioPlayer";
import { PasscodeGate } from "@/components/public/PasscodeGate";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Heart,
  Sparkles,
  ChevronDown,
} from "lucide-react";

interface ScheduleItem {
  id: string;
  title: string;
  date: Date | string;
  startTime: string;
  endTime: string | null;
  venueName: string;
  address: string;
  googleMapsUrl: string;
}

interface DigitalInvitationViewProps {
  invitation: {
    id: string;
    slug: string;
    groomName: string;
    brideName: string;
    coupleStory: string | null;
    coverImageUrl: string;
    galleryImages: string[];
    backgroundMusicUrl: string | null;
    fontFamily: string;
    primaryColor: string;
    accentColor: string;
    isPasswordProtected: boolean;
    passcode: string | null;
    schedules: ScheduleItem[];
  };
}

export function DigitalInvitationView({ invitation }: DigitalInvitationViewProps) {
  const [isUnlocked, setIsUnlocked] = useState(!invitation.isPasswordProtected);

  const coupleNames = `${invitation.brideName} & ${invitation.groomName}`;

  if (!isUnlocked && invitation.passcode) {
    return (
      <PasscodeGate
        expectedPasscode={invitation.passcode}
        coupleNames={coupleNames}
        onUnlocked={() => setIsUnlocked(true)}
      />
    );
  }

  // Find primary wedding date from first schedule or fallback
  const firstScheduleDate = invitation.schedules[0]?.date;

  return (
    <div
      className={`min-h-screen text-stone-800 selection:bg-amber-100 ${
        invitation.fontFamily === "sans"
          ? "font-sans"
          : "font-serif"
      }`}
      style={{
        backgroundColor: "#faf8f5",
      }}
    >
      {/* Background Audio Player */}
      {invitation.backgroundMusicUrl && (
        <AudioPlayer
          audioUrl={invitation.backgroundMusicUrl}
          primaryColor={invitation.primaryColor}
        />
      )}

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-between px-6 py-16 text-center overflow-hidden">
        {/* Cover Background with delicate overlays */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={invitation.coverImageUrl}
            alt={coupleNames}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/80 backdrop-blur-[1px]" />
        </div>

        {/* Top Header Monogram */}
        <div className="space-y-2 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>We are getting married</span>
          </div>
        </div>

        {/* Center Couple Names & Date */}
        <div className="max-w-3xl space-y-4 my-auto text-white">
          <p className="text-sm sm:text-base uppercase tracking-[0.3em] font-light text-amber-200/90">
            Together with our families
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tight drop-shadow-md">
            <span>{invitation.brideName}</span>
            <span className="block text-2xl sm:text-4xl my-2 text-amber-300 font-light italic">
              &
            </span>
            <span>{invitation.groomName}</span>
          </h1>

          {firstScheduleDate && (
            <div className="pt-4 flex items-center justify-center gap-3 text-sm sm:text-base font-light tracking-widest uppercase text-stone-200">
              <span className="h-px w-8 bg-amber-300/60" />
              <span>{formatDate(firstScheduleDate)}</span>
              <span className="h-px w-8 bg-amber-300/60" />
            </div>
          )}
        </div>

        {/* Scroll cue */}
        <div className="pt-8 text-white/80 animate-bounce">
          <ChevronDown className="w-6 h-6 mx-auto text-amber-300" />
        </div>
      </section>

      {/* Couple Story Section */}
      {invitation.coupleStory && (
        <section className="py-20 px-6 max-w-3xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center bg-amber-100/80 text-amber-800">
            <Heart className="w-5 h-5 fill-amber-700 text-amber-700" />
          </div>

          <h2
            className="text-3xl sm:text-4xl font-serif font-semibold tracking-tight"
            style={{ color: invitation.primaryColor }}
          >
            Our Story
          </h2>

          <div className="w-16 h-0.5 mx-auto rounded" style={{ backgroundColor: invitation.accentColor }} />

          <p className="text-stone-600 text-base sm:text-lg leading-relaxed sm:leading-loose italic max-w-2xl mx-auto">
            &ldquo;{invitation.coupleStory}&rdquo;
          </p>
        </section>
      )}

      {/* Ceremony Schedules Timeline */}
      {invitation.schedules.length > 0 && (
        <section className="py-20 px-6 bg-stone-100/60 border-y border-stone-200/80">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-stone-400 font-medium">
                Wedding Itinerary
              </p>
              <h2
                className="text-3xl sm:text-4xl font-serif font-semibold"
                style={{ color: invitation.primaryColor }}
              >
                Ceremonies & Celebrations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {invitation.schedules.map((schedule, idx) => (
                <div
                  key={schedule.id}
                  className="rounded-3xl bg-white p-7 shadow-sm border border-stone-200/80 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: invitation.primaryColor }}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-xs font-mono font-medium text-stone-400">
                        Part {idx + 1}
                      </span>
                    </div>

                    <h3 className="font-serif font-semibold text-xl text-stone-900 leading-snug">
                      {schedule.title}
                    </h3>

                    <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>{formatDate(schedule.date)}</span>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>
                          {schedule.startTime}
                          {schedule.endTime ? ` - ${schedule.endTime}` : ""}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 pt-1">
                        <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-stone-900 block">{schedule.venueName}</strong>
                          <span className="text-stone-500">{schedule.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-stone-100">
                    <Link
                      href={schedule.googleMapsUrl}
                      target="_blank"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-medium border border-stone-200 hover:border-stone-400 bg-stone-50 hover:bg-stone-100 text-stone-700 transition"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {invitation.galleryImages && invitation.galleryImages.length > 0 && (
        <section className="py-20 px-6 max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-stone-400 font-medium">
              Moments Captured
            </p>
            <h2
              className="text-3xl sm:text-4xl font-serif font-semibold"
              style={{ color: invitation.primaryColor }}
            >
              Photo Gallery
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {invitation.galleryImages.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-xs hover:shadow-md transition-all group"
              >
                <Image
                  src={imgUrl}
                  alt={`Couple photo ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RSVP Section */}
      <section className="py-20 px-6 relative overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-xl mx-auto">
          <RSVPForm
            invitationId={invitation.id}
            primaryColor={invitation.primaryColor}
            accentColor={invitation.accentColor}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-xs text-stone-400 space-y-2 bg-stone-100/80 border-t border-stone-200">
        <p className="font-serif text-sm text-stone-600">
          {coupleNames} • Wedding Celebration
        </p>
        <div>
          <Link
            href="/"
            title="Digiwedcard Homepage"
            className="inline-flex items-center gap-1.5 text-stone-500 hover:text-amber-800 transition-colors group"
          >
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />
            <p className="text-[11px] font-light">
              Created with Love on{" "}
              <span className="font-medium underline decoration-amber-400/80 underline-offset-2">
                Digiwedcard
              </span>
            </p>
          </Link>
        </div>
      </footer>
    </div>
  );
}

