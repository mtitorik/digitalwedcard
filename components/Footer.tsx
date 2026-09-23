"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { weddingData } from "../data/weddingData";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full pt-8 pb-14 px-4 text-center border-t border-amber-300/20 mt-12 bg-black/20">
      {/* Monogram Initials */}
      <div className="w-12 h-12 rounded-full border border-amber-400/40 bg-emerald-950/60 flex items-center justify-center mx-auto mb-4 text-amber-300 font-serif font-light text-base tracking-widest">
        {weddingData.couple.monogram}
      </div>

      <p className="font-serif text-xl sm:text-2xl text-amber-100 font-light mb-1">
        With all our love,
      </p>
      <p className="text-sm font-serif text-amber-200/90 italic mb-2">
        {weddingData.couple.bride} & {weddingData.couple.groom}
      </p>
      <p className="text-[11px] font-sans text-amber-300/60 uppercase tracking-widest">
        & their families
      </p>

      {/* Back to top button */}
      <div className="mt-8">
        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-950/80 border border-amber-400/30 text-amber-300 hover:text-amber-100 hover:border-amber-300 text-xs font-sans tracking-wider uppercase transition-all duration-200 min-h-[44px]"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <p className="text-[10px] text-stone-300 font-sans tracking-wider">
          {weddingData.couple.hashtag} • {weddingData.couple.dateHeadline}
        </p>
      </div>
    </footer>
  );
};
