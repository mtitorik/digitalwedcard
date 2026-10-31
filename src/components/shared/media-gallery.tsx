"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  src: string;
  alt?: string;
  caption?: string;
}

export type GalleryLayout = "grid" | "carousel" | "arched-collage";
export type GalleryAspectRatio = "3/4" | "4/5" | "square" | "16/9";

export interface MediaGalleryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  images: Array<GalleryItem | string>;
  layout?: GalleryLayout;
  columns?: 2 | 3 | 4;
  aspectRatio?: GalleryAspectRatio;
  enableLightbox?: boolean;
}

const aspectClasses: Record<GalleryAspectRatio, string> = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  square: "aspect-square",
  "16/9": "aspect-[16/9]",
};

export function MediaGallery({
  images,
  layout = "grid",
  columns = 3,
  aspectRatio = "3/4",
  enableLightbox = true,
  className,
  ...props
}: MediaGalleryProps) {
  // Normalize items to { src, alt, caption }
  const normalizedImages: GalleryItem[] = images.map((item, idx) => {
    if (typeof item === "string") {
      return { src: item, alt: `Wedding moment ${idx + 1}` };
    }
    return { ...item, alt: item.alt || `Wedding moment ${idx + 1}` };
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    if (enableLightbox) setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % normalizedImages.length : 0
    );
  }, [lightboxIndex, normalizedImages.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + normalizedImages.length) % normalizedImages.length : 0
    );
  }, [lightboxIndex, normalizedImages.length]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  // Carousel scroll controls
  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.75;
    carouselRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  if (normalizedImages.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full space-y-6", className)} {...props}>
      {/* ---------------------------------------------------- */}
      {/* 1. Layout: Arched Collage (Editorial Stationery Look) */}
      {/* ---------------------------------------------------- */}
      {layout === "arched-collage" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-end">
          {normalizedImages.map((img, idx) => {
            const isTall = idx % 2 === 1;

            return (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className={cn(
                  "group relative overflow-hidden rounded-t-[100px] sm:rounded-t-[140px] rounded-b-xl border border-stone-200/90 bg-stone-100 shadow-sm transition-all duration-500 hover:shadow-xl cursor-pointer",
                  isTall ? "aspect-[3/5]" : "aspect-[3/4]"
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt || ""}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Scrim Overlay on Hover */}
                <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-stone-900 flex items-center justify-center shadow-lg">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. Layout: Carousel (Horizontal Scroll-Snap)        */}
      {/* ---------------------------------------------------- */}
      {layout === "carousel" && (
        <div className="relative group">
          <div
            ref={carouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 scroll-smooth"
          >
            {normalizedImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className={cn(
                  "relative shrink-0 w-[260px] sm:w-[320px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-xs hover:shadow-md transition-all snap-start cursor-pointer group/item",
                  aspectClasses[aspectRatio]
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt || ""}
                  fill
                  className="object-cover transition-transform duration-500 group-hover/item:scale-105"
                  sizes="320px"
                />

                {img.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white text-xs">
                    <p className="line-clamp-2">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scrollCarousel("left")}
            aria-label="Scroll left"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-stone-900 border border-stone-200 shadow-md backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scrollCarousel("right")}
            aria-label="Scroll right"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-stone-900 border border-stone-200 shadow-md backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 3. Layout: Standard Grid                            */}
      {/* ---------------------------------------------------- */}
      {layout === "grid" && (
        <div
          className={cn(
            "grid gap-4 sm:gap-6",
            columns === 2 && "grid-cols-1 sm:grid-cols-2",
            columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            columns === 4 && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          )}
        >
          {normalizedImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer",
                aspectClasses[aspectRatio]
              )}
            >
              <Image
                src={img.src}
                alt={img.alt || ""}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-stone-900 flex items-center justify-center shadow-lg">
                  <Eye className="w-4 h-4" />
                </span>
              </div>

              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent p-4 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="font-serif italic text-sm">{img.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* Fullscreen Lightbox Modal                           */}
      {/* ---------------------------------------------------- */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Top Bar: Counter & Close Button */}
          <div
            className="absolute top-4 inset-x-4 sm:top-6 sm:inset-x-8 flex items-center justify-between text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-stone-300">
              {lightboxIndex + 1} / {normalizedImages.length}
            </span>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Previous Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-3 sm:left-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Current Active Image */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-[90vw] h-[80vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={normalizedImages[lightboxIndex].src}
                alt={normalizedImages[lightboxIndex].alt || ""}
                fill
                priority
                className="object-contain"
                sizes="90vw"
              />
            </div>

            {normalizedImages[lightboxIndex].caption && (
              <p className="mt-4 text-center text-stone-300 text-sm font-serif italic max-w-xl">
                {normalizedImages[lightboxIndex].caption}
              </p>
            )}
          </div>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-3 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}

