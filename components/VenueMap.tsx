"use client";

import React from "react";
import { MapPin, Navigation, Car, ExternalLink } from "lucide-react";
import { weddingData } from "../data/weddingData";

export const VenueMap: React.FC = () => {
  const { venue } = weddingData;

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 py-8 md:py-12" aria-label="Wedding Venue & Location">
      <div className="text-center mb-6 md:mb-10">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-300/80 font-sans font-medium">
          The Destination
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-100 font-light mt-1 mb-2">
          Venue & Directions
        </h2>
        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
      </div>

      <div className="max-w-5xl mx-auto rounded-3xl bg-[#062d22] border border-amber-300/30 overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Venue Information (Left col on desktop) */}
          <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-amber-300/20">
            <div>
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-400/15 border border-amber-400/30 shrink-0 text-amber-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-amber-100 font-light">
                    {venue.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 font-sans leading-relaxed">
                    {venue.address}
                  </p>
                </div>
              </div>

              {/* Parking / Shuttle Note */}
              <div className="mt-5 p-4 rounded-2xl bg-black/25 border border-amber-400/15 flex items-start gap-3 text-xs sm:text-sm font-sans text-amber-200/90">
                <Car className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{venue.note}</p>
              </div>
            </div>

            {/* Direct Action Link */}
            <div className="pt-6 mt-6 border-t border-amber-400/10">
              <a
                id="open-google-maps-btn"
                href={venue.mapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-sans font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-amber-900/20 transition-all duration-200 hover:scale-102 active:scale-98 min-h-[44px]"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-4 h-4 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Embedded Google Maps Frame (Right col on desktop) */}
          <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-full min-h-[280px] sm:min-h-[360px] lg:col-span-7 bg-[#07251d]">
            <iframe
              title="Google Maps Location for Phoenix Convention Hall"
              src={venue.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-105 opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
