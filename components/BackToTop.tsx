"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when user starts scrolling down (> 200px)
      setIsVisible(window.scrollY > 200);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-6 scale-90 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="group relative flex items-center gap-2 pl-3.5 pr-4 py-3 sm:py-3.5 rounded-full bg-gradient-to-b from-[#0f4e3c]/95 via-[#082f24]/95 to-[#041a14]/95 border border-amber-400/60 hover:border-amber-300 backdrop-blur-xl shadow-2xl shadow-black/80 hover:shadow-amber-500/20 text-amber-200 hover:text-amber-100 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ring-2 ring-amber-400/20 hover:ring-amber-400/40"
      >
        {/* Subtle Glow Overlay */}
        <div className="absolute inset-0 rounded-full bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm pointer-events-none" />

        {/* Arrow Icon */}
        <div className="w-6 h-6 rounded-full bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:bg-amber-400 group-hover:text-emerald-950 transition-all duration-300">
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>

        {/* Text Label */}
        <span className="font-serif font-semibold text-xs tracking-wider uppercase text-amber-100 group-hover:text-amber-300 transition-colors">
          Back to Top
        </span>
      </button>
    </div>
  );
};
