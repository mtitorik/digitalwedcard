"use client";

import React from "react";
import { Heart, Quote } from "lucide-react";
import { Wish } from "../data/weddingData";

interface WishesWallProps {
  wishes: Wish[];
}

export const WishesWall: React.FC<WishesWallProps> = ({ wishes }) => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8 py-8 md:py-12" aria-label="Wishes from Loved Ones">
      <div className="text-center mb-6 md:mb-10">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-300/80 font-sans font-medium">
          Words of Love &amp; Du&apos;a
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-100 font-light mt-1 mb-2">
          Wishes Wall
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/70 max-w-md mx-auto">
          Warm blessings and heartfelt prayers from our cherished family and friends.
        </p>
        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-3" />
      </div>

      {/* Responsive Grid for Wishes Wall: 1 col on mobile, 2 cols on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto max-h-[540px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-amber-400/20">
        {wishes.map((wish) => (
          <div
            key={wish.id}
            className="relative rounded-2xl bg-[#062d22] border border-amber-300/25 p-5 shadow-md transition-all hover:border-amber-300/40 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <Heart className="w-4 h-4 fill-amber-400/40" />
                </div>
                <h4 className="font-serif text-base sm:text-lg text-amber-100 font-medium">
                  {wish.name}
                </h4>
              </div>
              <span className="text-[10px] sm:text-xs font-sans text-stone-400">
                {wish.timestamp}
              </span>
            </div>

            <div className="relative pl-6 sm:pl-7">
              <Quote className="w-4 h-4 text-amber-400/40 absolute left-0 top-0 rotate-180" />
              <p className="font-sans text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                {wish.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
