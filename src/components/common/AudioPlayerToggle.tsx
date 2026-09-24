"use client";

import React, { useState, useRef, useEffect } from "react";
import { Music } from "lucide-react";

export interface AudioPlayerToggleProps {
  /** Direct audio file stream or URL (e.g. mp3/aac) */
  trackUrl?: string;
  /** Whether audio should attempt to autoplay on initial user gesture */
  autoPlay?: boolean;
  /** Optional song or melody title */
  title?: string;
  /** Optional artist or orchestra name */
  artist?: string;
  /** Fixed screen corner positioning */
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  /** Optional extra styling classes */
  className?: string;
  /** Accent color for active state */
  accentColor?: string;
}

export const AudioPlayerToggle: React.FC<AudioPlayerToggleProps> = ({
  trackUrl = "https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-harp-1191.mp3",
  autoPlay = false,
  title = "Wedding Melody",
  artist = "Harmonic Chamber",
  position = "bottom-right",
  className = "",
  accentColor = "#D4AF37",
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState<boolean>(false);

  // Position classes
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-24 right-6",
    "top-left": "top-24 left-6",
  }[position];

  useEffect(() => {
    if (!audioRef.current || !trackUrl) return;

    if (autoPlay) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {
            // Autoplay blocked by browser policy until user gesture
            setIsPlaying(false);
            setAutoplayBlocked(true);
          });
      }
    }

    const handleEnvelopeOpened = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("wedding-envelope-opened", handleEnvelopeOpened);
    return () => {
      window.removeEventListener("wedding-envelope-opened", handleEnvelopeOpened);
    };
  }, [trackUrl, autoPlay]);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    setAutoplayBlocked(false);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  return (
    <aside
      aria-label="Wedding background audio controller"
      className={`fixed ${positionClasses} z-50 flex items-center gap-3 ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <audio
        ref={audioRef}
        src={trackUrl}
        loop
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating Track Info / Hint Pill */}
      {(showTooltip || autoplayBlocked) && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 dark:bg-stone-950/90 text-white text-xs backdrop-blur-md border border-amber-500/30 shadow-lg animate-fade-in transition-all">
          <Music className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
          <div className="flex flex-col text-left leading-tight max-w-[140px] truncate">
            <span className="font-semibold truncate">{title}</span>
            <span className="text-[10px] text-stone-400 truncate">
              {autoplayBlocked ? "Click to play music" : artist}
            </span>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={togglePlayback}
        aria-label={isPlaying ? "Mute wedding music" : "Play wedding music"}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-amber-300 border border-amber-400/50 shadow-xl shadow-amber-950/10 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
      >
        {/* Glow Ring when playing */}
        {isPlaying && (
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-30 pointer-events-none"
            style={{ backgroundColor: accentColor }}
          />
        )}

        {/* Dynamic sound waves */}
        {isPlaying ? (
          <div className="flex items-end justify-center gap-0.5 h-5 w-5">
            <span className="w-1 bg-amber-500 rounded-full animate-[bounce_0.8s_ease-in-out_infinite] h-3" />
            <span className="w-1 bg-amber-500 rounded-full animate-[bounce_0.6s_ease-in-out_infinite_0.2s] h-5" />
            <span className="w-1 bg-amber-500 rounded-full animate-[bounce_0.9s_ease-in-out_infinite_0.4s] h-2.5" />
            <span className="w-1 bg-amber-500 rounded-full animate-[bounce_0.7s_ease-in-out_infinite_0.1s] h-4" />
          </div>
        ) : (
          <div className="relative">
            <Music className="w-5 h-5 text-stone-600 dark:text-stone-300 group-hover:text-amber-500 transition-colors" />
            {autoplayBlocked && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
            )}
          </div>
        )}
      </button>
    </aside>
  );
};
