"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { weddingData, GalleryPhoto } from "../data/weddingData";

export const Gallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const photos = weddingData.gallery;

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-8 md:py-12" aria-label="Photo Gallery">
      <div className="px-4 sm:px-6 text-center mb-6 md:mb-10">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-300/80 font-sans font-medium">
          Captured Memories
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-100 font-light mt-1 mb-2">
          Moments of Us
        </h2>
        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
      </div>

      {/* SWIPEABLE CAROUSEL */}
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Scrollable Container */}
        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-6 px-4 sm:px-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {photos.map((photo: GalleryPhoto, index: number) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="relative shrink-0 w-[260px] sm:w-[300px] md:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden snap-center border border-amber-300/30 shadow-xl cursor-pointer group bg-[#062d22]"
            >
              <Image
                src={photo.url}
                alt={photo.caption}
                fill
                sizes="(max-width: 768px) 300px, 320px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-3 left-3 right-3 text-left">
                <p className="text-xs sm:text-sm font-serif text-amber-100 italic line-clamp-1">
                  {photo.caption}
                </p>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 border border-amber-300/30 flex items-center justify-center text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex justify-center gap-3 mt-3">
          <button
            onClick={() => scrollCarousel("left")}
            aria-label="Previous gallery photos"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#041d16] border border-amber-400/30 text-amber-300 flex items-center justify-center hover:bg-emerald-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollCarousel("right")}
            aria-label="Next gallery photos"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#041d16] border border-amber-400/30 text-amber-300 flex items-center justify-center hover:bg-emerald-900 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedPhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo view"
          onClick={() => setSelectedPhotoIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Close Button */}
          <button
            id="lightbox-close-btn"
            onClick={() => setSelectedPhotoIndex(null)}
            aria-label="Close photo lightbox"
            className="absolute top-5 right-5 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-20 min-h-[44px]"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Photo Counter */}
          <div className="absolute top-6 left-6 text-xs sm:text-sm font-sans tracking-widest uppercase text-amber-300/90 z-20">
            {selectedPhotoIndex + 1} / {photos.length}
          </div>

          {/* Image & Frame */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[75dvh] aspect-[4/5] rounded-2xl overflow-hidden border border-amber-300/40 shadow-2xl"
          >
            <Image
              src={photos[selectedPhotoIndex].url}
              alt={photos[selectedPhotoIndex].caption}
              fill
              sizes="(max-width: 1024px) 90vw, 800px"
              className="object-contain"
              priority
            />
          </div>

          {/* Caption */}
          <p className="mt-4 text-center font-serif text-base sm:text-xl text-amber-100 italic max-w-lg px-4">
            {photos[selectedPhotoIndex].caption}
          </p>

          {/* Previous / Next buttons */}
          <button
            onClick={handlePrevPhoto}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 text-amber-200 border border-amber-300/30 flex items-center justify-center hover:bg-black/90 transition-colors z-20"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          <button
            onClick={handleNextPhoto}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 text-amber-200 border border-amber-300/30 flex items-center justify-center hover:bg-black/90 transition-colors z-20"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>
      )}
    </section>
  );
};
