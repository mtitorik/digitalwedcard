"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export type AudioPlayerPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export type AudioPlayerTone = "dark" | "light" | "gold";

export interface AmbientAudioPlayerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  audioUrl: string;
  title?: string;
  artist?: string;
  autoPlay?: boolean;
  position?: AudioPlayerPosition;
  tone?: AudioPlayerTone;
  primaryColor?: string;
}

const positionClasses: Record<AudioPlayerPosition, string> = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "top-6 right-6",
  "top-left": "top-6 left-6",
};

export function AmbientAudioPlayer({
  audioUrl,
  title = "Ambient Melody",
  artist,
  autoPlay = false,
  position = "bottom-right",
  tone = "dark",
  primaryColor,
  className,
  style,
  ...props
}: AmbientAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio safely
  const playAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        // Autoplay policy prevented playback until user interaction
        console.warn("Autoplay deferred until user interaction:", err);
      });
  }, []);

  // Pause audio
  const pauseAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  }, []);

  // Toggle playback
  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Autoplay Guard: attempt autoplay, and if rejected, trigger on first user gesture
  useEffect(() => {
    if (!autoPlay || !audioRef.current) return;

    let interactionOccurred = false;

    const onUserInteraction = () => {
      if (!interactionOccurred && audioRef.current && audioRef.current.paused) {
        interactionOccurred = true;
        playAudio();
      }
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("scroll", onUserInteraction);
    };

    // Try playing immediately
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Add one-time user interaction listeners
        window.addEventListener("click", onUserInteraction, { once: true, passive: true });
        window.addEventListener("touchstart", onUserInteraction, { once: true, passive: true });
        window.addEventListener("scroll", onUserInteraction, { once: true, passive: true });
      });

    return () => {
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("scroll", onUserInteraction);
    };
  }, [autoPlay, playAudio]);

  const toneStyles = {
    dark: "bg-stone-900/90 text-white border-stone-700/60 shadow-2xl backdrop-blur-md hover:bg-stone-900",
    light: "bg-white/90 text-stone-900 border-stone-200/80 shadow-xl backdrop-blur-md hover:bg-white",
    gold: "bg-gradient-to-r from-amber-600 to-amber-700 text-white border-white/20 shadow-xl shadow-amber-900/20 hover:from-amber-700 hover:to-amber-800",
  };

  return (
    <div
      className={cn("fixed z-50", positionClasses[position], className)}
      style={style}
      {...props}
    >
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onCanPlay={() => setIsLoaded(true)}
      />

      <button
        type="button"
        onClick={togglePlay}
        disabled={!isLoaded && !audioUrl}
        aria-label={isPlaying ? `Pause background audio: ${title}` : `Play background audio: ${title}`}
        aria-pressed={isPlaying}
        className={cn(
          "group flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 select-none cursor-pointer hover:scale-105 active:scale-95",
          toneStyles[tone]
        )}
      >
        {/* Animated Vinyl Disc Icon */}
        <span
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-full text-white shrink-0 shadow-xs transition-transform duration-500",
            isPlaying && "animate-spin"
          )}
          style={{ backgroundColor: primaryColor || (tone === "gold" ? "#78350f" : "#d97706") }}
        >
          <Music className="w-3.5 h-3.5" />
        </span>

        {/* Title and Animated Audio Wave Equalizer */}
        <div className="flex flex-col text-left">
          <span className="text-xs font-serif font-medium tracking-wide leading-tight line-clamp-1 max-w-[120px] sm:max-w-[160px]">
            {isPlaying ? title : "Play Music"}
          </span>
          {artist && (
            <span className="text-[10px] opacity-75 font-sans leading-none mt-0.5">
              {artist}
            </span>
          )}
        </div>

        {/* Sound Wave Equalizer Bars */}
        {isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5 px-1 shrink-0" aria-hidden="true">
            <span className="w-0.5 bg-current rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3" />
            <span className="w-0.5 bg-current rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s] h-2" />
            <span className="w-0.5 bg-current rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-3.5" />
            <span className="w-0.5 bg-current rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.1s] h-2.5" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 opacity-60 shrink-0" />
        )}
      </button>
    </div>
  );
}
