"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { triggerEnvelopeConfetti } from "./Confetti";

interface EnvelopeCoverProps {
  onOpen: () => void;
  coupleNames?: string;
  monogram?: string;
  weddingDate?: string;
  envelopeGradient?: string;
  stampBg?: string;
  coverImage?: string;
}

// Warm royal wedding chime sound effect on tap
const playTapSoundEffect = () => {
  try {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtxClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Melodic celebration chord: D4, A4, F#5, D6, A6 with warm bell resonance
    const notes = [
      { freq: 293.66, delay: 0.0, dur: 1.8, vol: 0.15 },  // D4
      { freq: 440.0, delay: 0.06, dur: 1.6, vol: 0.13 },  // A4
      { freq: 587.33, delay: 0.12, dur: 1.5, vol: 0.12 }, // D5
      { freq: 739.99, delay: 0.18, dur: 1.4, vol: 0.10 }, // F#5
      { freq: 880.0, delay: 0.24, dur: 1.3, vol: 0.08 },  // A5
      { freq: 1174.66, delay: 0.30, dur: 1.2, vol: 0.07 }, // D6
    ];

    const now = ctx.currentTime;

    notes.forEach(({ freq, delay, dur, vol }) => {
      const startTime = now + delay;

      // Primary tone (warm triangle)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "triangle";
      osc1.frequency.setValueAtTime(freq, startTime);

      // Bell harmonic overtone (subtle sine an octave + fifth above)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freq * 1.5, startTime);

      // Lowpass filter for smooth acoustic tone
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2200, startTime);

      // Envelopes
      gain1.gain.setValueAtTime(0.0001, startTime);
      gain1.gain.linearRampToValueAtTime(vol, startTime + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

      gain2.gain.setValueAtTime(0.0001, startTime);
      gain2.gain.linearRampToValueAtTime(vol * 0.35, startTime + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + dur * 0.6);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(filter);
      gain2.connect(filter);
      filter.connect(ctx.destination);

      osc1.start(startTime);
      osc1.stop(startTime + dur);
      osc2.start(startTime);
      osc2.stop(startTime + dur * 0.6);
    });
  } catch {
    // AudioContext fallback ignored
  }
};

export const EnvelopeCover: React.FC<EnvelopeCoverProps> = ({
  onOpen,
  coupleNames = "Sajedul & Sadia",
  monogram = "S & S",
  weddingDate = "December 29, 2026",
  envelopeGradient,
  stampBg,
  coverImage,
}) => {
  const [isOpenStage, setIsOpenStage] = useState<"closed" | "opening" | "opened">("closed");

  const handleOpenInvitation = () => {
    if (isOpenStage !== "closed") return;

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    // Play tap sparkle sound effect immediately
    playTapSoundEffect();

    setIsOpenStage("opening");

    // 1. Trigger celebratory confetti burst
    triggerEnvelopeConfetti();

    // 2. Trigger audio playback & state transition in parent
    onOpen();

    // 3. Complete opening transition after 3D flap & card slide
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      setIsOpenStage("opened");
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpenStage !== "opened" && (
        <motion.div
          key="envelope-hero"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center min-h-[100dvh] h-[100dvh] w-full px-4 select-none overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${envelopeGradient || "from-[#0d4536] via-[#062c22] to-[#031712]"}`}
          style={{ perspective: "1400px" }}
        >
          {/* Subtle luxury background ornament & glow */}
          <div className="absolute inset-0 pointer-events-none opacity-35 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(212,175,55,0.18),transparent)]" />

          {/* Elegant header caption */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-center mb-6 z-10"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200/80 font-sans mb-1.5">
              The Wedding Reception of
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-100 font-light tracking-wide drop-shadow-sm">
              {coupleNames}
            </h1>
            <p className="text-xs sm:text-sm tracking-widest text-amber-300/70 font-sans mt-1">
              {weddingDate}
            </p>
          </motion.div>

          {/* Interactive 3D Envelope Container */}
          <motion.div
            role="button"
            tabIndex={0}
            aria-label="Tap to open wedding invitation envelope"
            id="open-envelope-trigger"
            onClick={handleOpenInvitation}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenInvitation();
              }
            }}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[460px] aspect-[1.42/1] cursor-pointer group focus:outline-none"
          >
            {/* Ambient gold glow behind the envelope */}
            <div className="absolute -inset-2 rounded-2xl bg-amber-400/20 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Outer Envelope Body / Pocket */}
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#0c3e30] via-[#082a20] to-[#041913] border border-amber-300/50 shadow-2xl overflow-hidden p-1 flex flex-col justify-end">
              {/* Fine gold border inset */}
              <div className="absolute inset-1.5 rounded-xl border border-amber-400/25 pointer-events-none" />

              {/* Corner decorative gold flourishes */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-300/50 pointer-events-none" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-300/50 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-300/50 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-300/50 pointer-events-none" />

              {/* Envelope lower folded triangular fold lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 380 268"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left diagonal fold */}
                <path
                  d="M0 268 L190 148 L0 0"
                  fill="rgba(5, 34, 26, 0.4)"
                  stroke="rgba(212, 175, 55, 0.25)"
                  strokeWidth="1"
                />
                {/* Right diagonal fold */}
                <path
                  d="M380 268 L190 148 L380 0"
                  fill="rgba(4, 25, 19, 0.5)"
                  stroke="rgba(212, 175, 55, 0.25)"
                  strokeWidth="1"
                />
                {/* Bottom triangular pocket flap */}
                <path
                  d="M0 268 L190 145 L380 268 Z"
                  fill="url(#pocketGradient)"
                  stroke="rgba(212, 175, 55, 0.35)"
                  strokeWidth="1.2"
                />
                <defs>
                  <linearGradient id="pocketGradient" x1="190" y1="145" x2="190" y2="268" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#083327" />
                    <stop offset="1" stopColor="#031610" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Emerging Invitation Card (Rises up during opening) */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={
                  isOpenStage === "opening"
                    ? { y: -120, opacity: 1, scale: 1.05 }
                    : { y: 15, opacity: 0.95 }
                }
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-4 right-4 top-4 bottom-4 rounded-xl bg-gradient-to-b from-[#fcfbf7] to-[#f4eee1] text-[#1c2c24] p-3 sm:p-4 shadow-xl border border-amber-300/40 flex flex-col items-center justify-center text-center z-10"
              >
                <div className="w-full h-full border border-amber-600/20 rounded-lg p-2 flex flex-col items-center justify-center">
                  {coverImage && (
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-md mb-1.5 shrink-0 bg-stone-200">
                      <Image
                        src={coverImage}
                        alt={coupleNames}
                        fill
                        priority
                        className="object-cover"
                        unoptimized={coverImage.startsWith("data:")}
                      />
                    </div>
                  )}
                  <div className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-800 font-sans font-medium">
                    You Are Cordially Invited
                  </div>
                  <div className="font-serif text-xl sm:text-2xl text-[#1a382c] font-light my-0.5">
                    {coupleNames}
                  </div>
                  <div className="w-10 h-px bg-amber-600/30 my-0.5" />
                  <div className="text-[9px] sm:text-[10px] text-amber-900/70 tracking-widest uppercase font-sans">
                    {weddingDate}
                  </div>
                </div>
              </motion.div>

              {/* 3D Top Flap with realistic fold */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isOpenStage === "opening" ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                }}
                className="absolute top-0 left-0 right-0 h-1/2 z-20 pointer-events-none"
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 380 134"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0 L190 134 L380 0 Z"
                    fill="url(#topFlapGradient)"
                    stroke="rgba(212, 175, 55, 0.45)"
                    strokeWidth="1.2"
                  />
                  <defs>
                    <linearGradient id="topFlapGradient" x1="190" y1="0" x2="190" y2="134" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0d4637" />
                      <stop offset="1" stopColor="#082b21" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Central Wax Seal with breathing pulse animation */}
              <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <motion.div
                  animate={
                    isOpenStage === "closed"
                      ? {
                          scale: [1, 1.06, 1],
                          rotate: [0, 1, -1, 0],
                        }
                      : {
                          scale: 0.5,
                          opacity: 0,
                        }
                  }
                  transition={
                    isOpenStage === "closed"
                      ? {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : {
                          duration: 0.4,
                        }
                  }
                  className={`pointer-events-auto flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full ${
                    stampBg || "bg-gradient-to-br from-[#c9933b] via-[#a16f24] to-[#6a440e]"
                  } border-2 border-amber-300/80 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] transition-shadow duration-300 relative`}
                >
                  {/* Wax seal realistic rim */}
                  <div className="absolute inset-1 rounded-full border border-amber-200/40 opacity-70 pointer-events-none" />
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="font-serif font-bold text-amber-100 text-sm sm:text-lg tracking-widest drop-shadow">
                      {monogram}
                    </span>
                    <span className="w-4 sm:w-6 h-px bg-amber-200/50 mt-0.5" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* "Tap to Open" Callout Action without left side logo */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-col items-center z-10"
          >
            <button
              onClick={handleOpenInvitation}
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-amber-400/20 via-amber-300/30 to-amber-400/20 hover:from-amber-400/30 hover:to-amber-400/30 border border-amber-300/50 text-amber-200 text-xs sm:text-sm font-medium tracking-widest uppercase shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 min-h-[44px]"
            >
              <span>Tap to Open</span>
            </button>
            <p className="text-[11px] sm:text-xs text-amber-300/60 font-sans mt-2 tracking-wider">
              Music & Celebration inside
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
