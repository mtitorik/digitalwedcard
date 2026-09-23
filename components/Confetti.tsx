"use client";

import confetti from "canvas-confetti";

export const triggerEnvelopeConfetti = () => {
  // Wedding-inspired luxury color palette: Gold, Champagne, Rose Gold, Ivory, Emerald shimmer
  const colors = ["#d4af37", "#f3e5ab", "#e0bfb8", "#fcfbf7", "#1b4d3e", "#c5a059"];

  // Burst 1: Center-up cannon
  confetti({
    particleCount: 70,
    spread: 80,
    origin: { y: 0.65, x: 0.5 },
    colors,
    ticks: 250,
    gravity: 0.85,
    scalar: 1.1,
    shapes: ["circle", "square"],
    disableForReducedMotion: true,
  });

  // Burst 2: Left corner fountain
  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 60,
      origin: { x: 0.1, y: 0.75 },
      colors,
      ticks: 220,
      gravity: 0.9,
      scalar: 1,
      disableForReducedMotion: true,
    });
  }, 200);

  // Burst 3: Right corner fountain
  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 60,
      origin: { x: 0.9, y: 0.75 },
      colors,
      ticks: 220,
      gravity: 0.9,
      scalar: 1,
      disableForReducedMotion: true,
    });
  }, 350);
};

export const triggerRsvpConfetti = () => {
  const colors = ["#d4af37", "#f43f5e", "#fb7185", "#fde047", "#ffffff"];
  confetti({
    particleCount: 90,
    spread: 100,
    origin: { y: 0.55, x: 0.5 },
    colors,
    ticks: 260,
    gravity: 0.8,
    scalar: 1.2,
    disableForReducedMotion: true,
  });
};
