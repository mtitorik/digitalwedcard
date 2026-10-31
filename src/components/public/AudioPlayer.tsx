"use client";

import { useState, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  primaryColor?: string;
}

export function AudioPlayer({ audioUrl, primaryColor = "#064e3b" }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay was blocked or audio failed:", err);
        });
    }
  };

  return (
    <>
      <audio ref={audioRef} src={audioUrl} loop preload="auto" />
      <button
        type="button"
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-stone-900/90 text-white backdrop-blur-md shadow-2xl border border-stone-700/60 hover:bg-stone-900 transition-all select-none"
        title={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        <span
          className={`flex items-center justify-center w-6 h-6 rounded-full text-white ${
            isPlaying ? "animate-spin" : ""
          }`}
          style={{ backgroundColor: primaryColor }}
        >
          <Music className="w-3.5 h-3.5" />
        </span>
        <span className="text-xs font-serif font-medium tracking-wide">
          {isPlaying ? "Music Playing" : "Play Music"}
        </span>
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-amber-400" />
        ) : (
          <VolumeX className="w-4 h-4 text-stone-400" />
        )}
      </button>
    </>
  );
}

