"use client";

import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export interface MusicPlayerHandle {
  startAudio: () => Promise<void>;
  toggleMute: () => void;
  isPlaying: boolean;
}

interface MusicPlayerProps {
  isVisible?: boolean;
}

// Royalty-free acoustic instrumental audio source (warm acoustic guitar / strings)
const AUDIO_SOURCE_URL =
  "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-guitar-loop-f-91bpm-112191.mp3";

// Backup fallback audio source
const BACKUP_AUDIO_SOURCE =
  "https://actions.google.com/sounds/v1/ambiences/outdoor_garden_evening.ogg";

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(({ isVisible = true }, ref) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Soft Web Audio API romantic harp/guitar arpeggiator (guaranteed zero-latency offline fallback)
  const playWebAudioArpeggio = useCallback(() => {
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Romantic chord progression: D - A - Bm - G (Warm Pentatonic Harp frequencies)
      const notes = [
        [293.66, 369.99, 440.0, 587.33], // D maj (D4, F#4, A4, D5)
        [220.0, 277.18, 329.63, 440.0],  // A maj (A3, C#4, E4, A4)
        [246.94, 293.66, 369.99, 493.88], // B min (B3, D4, F#4, B4)
        [196.0, 246.94, 293.66, 392.0],  // G maj (G3, B3, D4, G4)
      ];

      let chordIdx = 0;
      let noteIdx = 0;

      const triggerPluck = () => {
        if (!audioCtxRef.current || isMuted) return;
        const currentChord = notes[chordIdx];
        const freq = currentChord[noteIdx];

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm triangle wave filtered to sound like a gentle acoustic nylon guitar / harp
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Lowpass filter for warm acoustic timbre
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1400, ctx.currentTime);

        // Gentle acoustic pluck envelope
        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.5);

        noteIdx++;
        if (noteIdx >= currentChord.length) {
          noteIdx = 0;
          chordIdx = (chordIdx + 1) % notes.length;
        }
      };

      triggerPluck();
      synthIntervalRef.current = setInterval(triggerPluck, 550);
    } catch {
      // AudioContext unavailable or restricted
    }
  }, [isMuted]);

  const startAudio = useCallback(async () => {
    try {
      if (audioRef.current) {
        audioRef.current.volume = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
          setIsMuted(false);

          // Smooth fade-in from volume 0 to 0.65 over 2.5 seconds
          let vol = 0;
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = setInterval(() => {
            if (audioRef.current && vol < 0.65) {
              vol = Math.min(0.65, vol + 0.05);
              audioRef.current.volume = vol;
            } else {
              if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            }
          }, 150);
          return;
        }
      }
    } catch {
      // If network audio fails, fall back to Web Audio acoustic harp synth
      playWebAudioArpeggio();
      setIsPlaying(true);
      setIsMuted(false);
    }
  }, [playWebAudioArpeggio]);

  const toggleMute = useCallback(() => {
    if (!isPlaying) {
      startAudio();
      return;
    }

    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.65;
        setIsMuted(false);
      } else {
        audioRef.current.muted = true;
        setIsMuted(true);
      }
    } else {
      setIsMuted((prev) => !prev);
    }

    if (audioCtxRef.current) {
      if (audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      } else if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    }
  }, [isPlaying, isMuted, startAudio]);

  useImperativeHandle(
    ref,
    () => ({
      startAudio,
      toggleMute,
      isPlaying,
    }),
    [startAudio, toggleMute, isPlaying]
  );

  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Background Music Control"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 print:hidden"
    >
      {/* Visual pulse ring when audio is playing */}
      {isPlaying && !isMuted && (
        <span
          className="absolute -inset-1 rounded-full bg-amber-400/25 animate-ping pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Floating Toggle Button */}
      <button
        id="audio-toggle-btn"
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
        className="relative flex items-center justify-center w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-emerald-950/90 text-amber-300 border border-amber-400/50 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-emerald-950"
      >
        {isPlaying && !isMuted ? (
          <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" />
        ) : isPlaying && isMuted ? (
          <VolumeX className="w-5 h-5 text-amber-200/70" />
        ) : (
          <Music className="w-5 h-5 text-amber-300/80" />
        )}

        {/* Small floating soundwave indicator dots */}
        {isPlaying && !isMuted && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-amber-300" />
          </span>
        )}
      </button>

      {/* HTML5 Audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src={AUDIO_SOURCE_URL}
        onError={() => {
          if (audioRef.current && audioRef.current.src !== BACKUP_AUDIO_SOURCE) {
            audioRef.current.src = BACKUP_AUDIO_SOURCE;
          }
        }}
      />
    </aside>
  );
});

MusicPlayer.displayName = "MusicPlayer";
