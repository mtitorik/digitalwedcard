"use client";

import { useEffect, useRef } from "react";

interface HeroBackgroundVideoProps {
  playbackRate?: number;
  className?: string;
}

export function HeroBackgroundVideo({
  playbackRate = 0.5,
  className = "",
}: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce muted attributes and properties for browser autoplay compliance
    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = playbackRate;

    const enforceSpeedAndPlay = () => {
      if (video) {
        video.muted = true;
        video.playbackRate = playbackRate;
        if (video.paused) {
          video.play().catch(() => {});
        }
      }
    };

    video.addEventListener("play", enforceSpeedAndPlay);
    video.addEventListener("loadedmetadata", enforceSpeedAndPlay);
    video.addEventListener("canplay", enforceSpeedAndPlay);
    video.addEventListener("ratechange", () => {
      if (video && video.playbackRate !== playbackRate) {
        video.playbackRate = playbackRate;
      }
    });

    // Initial play trigger
    video.play().catch(() => {});

    return () => {
      video.removeEventListener("play", enforceSpeedAndPlay);
      video.removeEventListener("loadedmetadata", enforceSpeedAndPlay);
      video.removeEventListener("canplay", enforceSpeedAndPlay);
    };
  }, [playbackRate]);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 
        Hero Background Video:
        - 50% slower (playbackRate = 0.5 enforced via JS)
        - Upside down (rotate-180 and transform: rotate(180deg))
      */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover rotate-180"
        style={{ transform: "rotate(180deg)" }}
      >
        <source src="/homepage_hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Balanced scrim overlay ensuring video is clearly visible while typography is sharp */}
      <div className="absolute inset-0 bg-stone-950/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/50" />
    </div>
  );
}

