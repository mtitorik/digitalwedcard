"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Heart, Wine, Clock, MapPin, Shirt } from "lucide-react";
import { weddingData, StoryEvent, ScheduleEvent } from "../data/weddingData";

export const EventTimeline: React.FC = () => {
  const getEventIcon = (iconName: ScheduleEvent["iconName"]) => {
    switch (iconName) {
      case "Heart":
        return <Heart className="w-4 h-4 text-amber-300" />;
      case "Wine":
        return <Wine className="w-4 h-4 text-amber-300" />;
      case "Sparkles":
      default:
        return <Sparkles className="w-4 h-4 text-amber-300" />;
    }
  };

  return (
    <div className="w-full py-6 space-y-16 sm:space-y-20">
      {/* 1. OUR STORY TIMELINE */}
      <section className="px-4 sm:px-6 md:px-8" aria-label="Our Love Story">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-300/80 font-sans font-medium">
            Chapter by Chapter
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-100 font-light mt-1 mb-2">
            Our Story
          </h2>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
        </div>

        {/* Responsive Grid for Story: 1 col on mobile, 3 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {weddingData.ourStory.map((story: StoryEvent, index: number) => {
            return (
              <article
                key={story.id}
                className="relative flex flex-col items-center text-center group h-full"
              >
                {/* Story Content Card */}
                <div className="w-full h-full flex flex-col rounded-2xl bg-[#062d22] border border-amber-300/25 p-5 sm:p-6 shadow-xl transition-all duration-300 hover:border-amber-300/40">
                  {/* Photo with subtle gold frame */}
                  <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 border border-amber-300/30 shadow-md">
                    <Image
                      src={story.imageUrl}
                      alt={story.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <span className="inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-[10px] sm:text-xs font-sans tracking-widest uppercase text-amber-300 mb-2.5 self-center">
                    {story.date}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl text-amber-100 font-light mb-2">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-300/90 font-sans leading-relaxed mt-auto">
                    {story.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 2. EVENT SCHEDULE & ITINERARY */}
      <section className="px-4 sm:px-6 md:px-8" aria-label="Event Schedule">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-300/80 font-sans font-medium">
            Join the Celebrations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-100 font-light mt-1 mb-2">
            Reception Schedule
          </h2>
          <p className="text-xs sm:text-sm text-amber-200/70 max-w-md mx-auto">
            A joyous evening of togetherness, blessings, and memorable celebrations.
          </p>
          <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-3" />
        </div>

        {/* Responsive Grid for Schedule: 1 col on mobile, 3 cols on tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {weddingData.schedule.map((event: ScheduleEvent) => (
            <div
              key={event.id}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#062d22] border border-amber-300/25 p-5 sm:p-6 shadow-xl transition-all duration-300 hover:border-amber-400/50"
            >
              <div>
                {/* Event Header with Icon */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] sm:text-xs uppercase font-sans tracking-widest text-amber-300/80 block">
                      {event.date}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-amber-100 font-light mt-0.5">
                      {event.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-400/15 border border-amber-400/30 shrink-0">
                    {getEventIcon(event.iconName)}
                  </div>
                </div>

                {/* Time & Venue Pills */}
                <div className="space-y-2 mb-4 text-xs sm:text-sm text-amber-200/90 font-sans">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {/* Dress Code Recommendation */}
                <div className="p-3 rounded-xl bg-black/25 border border-amber-400/15 mb-4 flex items-start gap-2.5">
                  <Shirt className="w-4 h-4 text-amber-300/90 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm font-sans">
                    <span className="text-amber-200 font-medium">Dress Code: </span>
                    <span className="text-stone-300">{event.dressCode}</span>
                    {event.dressCodeNote && (
                      <p className="text-[11px] sm:text-xs text-amber-300/80 mt-0.5 font-sans">
                        ({event.dressCodeNote})
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <p className="text-xs sm:text-sm text-stone-300/80 font-sans leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
