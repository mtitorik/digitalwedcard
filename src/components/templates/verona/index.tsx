"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SectionWrapper,
  SectionHeader,
  DecorativeDivider,
} from "@/components/shared/section-wrapper";
import { PullQuote } from "@/components/shared/typography";
import { CardFrame } from "@/components/shared/card-frame";
import { EventItineraryCard } from "@/components/shared/event-itinerary-card";
import { MediaGallery } from "@/components/shared/media-gallery";
import { RsvpForm } from "@/components/shared/rsvp-form";
import { AmbientAudioPlayer } from "@/components/shared/ambient-audio-player";
import { StickyActionBar } from "@/components/shared/sticky-action-bar";
import { PasscodeGate } from "@/components/public/PasscodeGate";
import { VeronaHero } from "./verona-hero";

export * from "./verona-hero";

export interface ScheduleItemData {
  id: string;
  title: string;
  date: Date | string;
  startTime: string;
  endTime?: string | null;
  venueName: string;
  address: string;
  googleMapsUrl: string;
  latitude?: number | null;
  longitude?: number | null;
  order?: number;
}

export interface VeronaInvitationData {
  id: string;
  slug: string;
  groomName: string;
  brideName: string;
  coupleStory?: string | null;
  coverImageUrl: string;
  galleryImages: string[];
  backgroundMusicUrl?: string | null;
  fontFamily: string;
  primaryColor: string;
  accentColor: string;
  isPasswordProtected: boolean;
  passcode?: string | null;
  schedules: ScheduleItemData[];
}

export interface VeronaTemplateProps
  extends React.HTMLAttributes<HTMLDivElement> {
  invitation: VeronaInvitationData;
}

export function VeronaTemplate({
  invitation,
  className,
  style,
  ...props
}: VeronaTemplateProps) {
  const [isUnlocked, setIsUnlocked] = useState(!invitation.isPasswordProtected);

  const coupleNames = `${invitation.brideName} & ${invitation.groomName}`;
  const firstSchedule = invitation.schedules[0];
  const primaryDate = firstSchedule?.date;
  const primaryVenue = firstSchedule?.venueName;

  // Passcode gate protection check
  if (!isUnlocked && invitation.passcode) {
    return (
      <PasscodeGate
        expectedPasscode={invitation.passcode}
        coupleNames={coupleNames}
        onUnlocked={() => setIsUnlocked(true)}
      />
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen text-stone-900 selection:bg-amber-100 antialiased",
        invitation.fontFamily === "sans" ? "font-sans" : "font-serif",
        className
      )}
      style={{
        backgroundColor: "#faf8f5",
        ...style,
      }}
      {...props}
    >
      {/* 1. Verona Hero Section */}
      <VeronaHero
        brideName={invitation.brideName}
        groomName={invitation.groomName}
        coverImageUrl={invitation.coverImageUrl}
        weddingDate={primaryDate}
        venueName={primaryVenue}
        primaryColor={invitation.primaryColor}
        accentColor={invitation.accentColor}
        scrollTargetId={invitation.coupleStory ? "story" : "ceremonies"}
      />

      {/* 2. Couple Love Story Section */}
      {invitation.coupleStory && (
        <SectionWrapper
          id="story"
          bg="parchment"
          padding="generous"
          containerSize="3xl"
        >
          <SectionHeader
            eyebrow="Our Journey"
            title="The Story of Us"
            align="center"
          />

          <DecorativeDivider variant="heart" className="my-6" />

          <div className="max-w-2xl mx-auto">
            <PullQuote
              glyph="heart"
              author={`${invitation.brideName} & ${invitation.groomName}`}
              className="text-stone-700 leading-relaxed sm:leading-loose text-base sm:text-lg"
            >
              {invitation.coupleStory}
            </PullQuote>
          </div>
        </SectionWrapper>
      )}

      {/* 3. Event Itinerary & Ceremonies Section */}
      {invitation.schedules && invitation.schedules.length > 0 && (
        <SectionWrapper
          id="ceremonies"
          bg="stone"
          padding="generous"
          bordered
          containerSize="6xl"
        >
          <SectionHeader
            eyebrow="Celebration Timeline"
            title="Ceremonies & Itinerary"
            description="We would be delighted to have you celebrate each part of our wedding celebration with us."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {invitation.schedules.map((schedule, idx) => (
              <EventItineraryCard
                key={schedule.id}
                stepNumber={idx + 1}
                title={schedule.title}
                date={schedule.date}
                startTime={schedule.startTime}
                endTime={schedule.endTime || undefined}
                venueName={schedule.venueName}
                address={schedule.address}
                googleMapsUrl={schedule.googleMapsUrl}
                accentColor={invitation.accentColor}
                variant="card"
                className="h-full"
              />
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* 4. Photo Gallery Section */}
      {invitation.galleryImages && invitation.galleryImages.length > 0 && (
        <SectionWrapper
          id="gallery"
          bg="white"
          padding="generous"
          containerSize="6xl"
        >
          <SectionHeader
            eyebrow="Captured Memories"
            title="Our Photo Gallery"
            description="Moments, travels, and quiet memories from our favorite chapters together."
            align="center"
          />

          <MediaGallery
            images={invitation.galleryImages}
            layout="arched-collage"
            enableLightbox={true}
          />
        </SectionWrapper>
      )}

      {/* 5. RSVP Submission Section */}
      <SectionWrapper
        id="rsvp"
        bg="parchment"
        padding="generous"
        containerSize="3xl"
      >
        <SectionHeader
          eyebrow="Be Our Guest"
          title="Kindly Respond"
          description="Your presence would mean the world to us. Please RSVP using the form below."
          align="center"
        />

        <CardFrame
          variant="double-line"
          innerMargin="lg"
          className="bg-white shadow-xl shadow-stone-900/5"
        >
          <RsvpForm
            invitationId={invitation.id}
            coupleNames={coupleNames}
            title="RSVP for the Celebration"
            subtitle="Please confirm your attendance so we may prepare for your arrival."
            primaryColor={invitation.primaryColor}
            accentColor={invitation.accentColor}
            tone="porcelain"
          />
        </CardFrame>
      </SectionWrapper>

      {/* 6. Background Ambient Audio Player */}
      {invitation.backgroundMusicUrl && (
        <AmbientAudioPlayer
          audioUrl={invitation.backgroundMusicUrl}
          title={`${coupleNames}'s Wedding Melody`}
          artist="Digiwedcard Ambient"
          autoPlay={false}
          position="bottom-right"
          tone="gold"
          primaryColor={invitation.primaryColor}
        />
      )}

      {/* 7. Mobile Sticky Action Bar */}
      <StickyActionBar
        primaryAction={{
          label: "RSVP Now",
          href: "#rsvp",
          variant: "gold",
        }}
        secondaryAction={
          firstSchedule?.googleMapsUrl
            ? {
                label: "Venue Directions",
                href: firstSchedule.googleMapsUrl,
                variant: "outline",
              }
            : {
                label: "Itinerary",
                href: "#ceremonies",
                variant: "outline",
              }
        }
        showOnlyOnMobile={true}
        tone="frosted"
      />

      {/* 8. Luxury Editorial Footer */}
      <footer className="py-16 px-6 text-center text-xs text-stone-500 space-y-4 bg-[#f5f1eb] border-t border-stone-200/80">
        <div className="flex items-center justify-center gap-2 text-stone-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-600/70" />
          <span className="font-serif italic text-sm text-stone-700">
            {coupleNames}
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-600/70" />
        </div>

        <p className="font-sans text-xs tracking-widest uppercase text-stone-400 font-light">
          Celebrating Love • Forever & Always
        </p>

        <div className="pt-4 border-t border-stone-200/50 max-w-xs mx-auto">
          <Link
            href="/"
            title="Digiwedcard Wedding Stationery"
            className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-800 transition-colors group"
          >
            <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600 group-hover:scale-110 transition-transform" />
            <p className="text-[11px] font-sans font-light">
              Crafted with elegance on{" "}
              <span className="font-medium underline decoration-amber-500/80 underline-offset-2">
                Digiwedcard
              </span>
            </p>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default VeronaTemplate;
