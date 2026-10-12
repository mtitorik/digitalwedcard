"use client";

import { useState } from "react";

export interface ModernRsvpState {
  name: string;
  phone: string;
  attending: "yes" | "no" | "maybe";
  guests: number;
  message: string;
  submitted: boolean;
  loading: boolean;
  error: string | null;
}

export interface UseModernRsvpOptions {
  cardSlug?: string;
  dataId?: string;
}

export function useModernRsvp(options?: UseModernRsvpOptions) {
  const [rsvpState, setRsvpState] = useState<ModernRsvpState>({
    name: "",
    phone: "",
    attending: "yes",
    guests: 2,
    message: "",
    submitted: false,
    loading: false,
    error: null,
  });

  const getResolvedSlug = (): string => {
    if (options?.cardSlug && options.cardSlug.trim()) {
      return options.cardSlug.trim().toLowerCase();
    }
    if (options?.dataId && options.dataId.trim()) {
      return options.dataId.trim().toLowerCase();
    }
    if (typeof window !== "undefined") {
      const parts = window.location.pathname.split("/").filter(Boolean);
      if (parts.length >= 2 && ["card", "invite", "preview"].includes(parts[0])) {
        return parts[1].toLowerCase();
      }
      if (parts.length === 1 && parts[0]) {
        return parts[0].toLowerCase();
      }
    }
    return "";
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpState.loading || rsvpState.submitted) return;

    if (!rsvpState.name.trim()) {
      setRsvpState((prev) => ({ ...prev, error: "Please enter your full name." }));
      return;
    }

    if (!rsvpState.phone.trim()) {
      setRsvpState((prev) => ({ ...prev, error: "Please enter your phone number." }));
      return;
    }

    const activeSlug = getResolvedSlug();
    if (!activeSlug) {
      setRsvpState((prev) => ({
        ...prev,
        error: "Wedding card slug could not be identified. Please refresh the page.",
      }));
      return;
    }

    // For "no" (declined), guest count must be 0. For "yes" / "maybe", must be 1 to 20.
    const guestCount =
      rsvpState.attending === "no"
        ? 0
        : Math.min(20, Math.max(1, Number(rsvpState.guests) || 1));

    setRsvpState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardSlug: activeSlug,
          fullName: rsvpState.name.trim(),
          phone: rsvpState.phone.trim(),
          attendance: rsvpState.attending,
          guestCount,
          message: rsvpState.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit RSVP. Please try again.");
      }

      setRsvpState((prev) => ({
        ...prev,
        loading: false,
        submitted: true,
        error: null,
      }));
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to submit RSVP. Please try again.";
      setRsvpState((prev) => ({
        ...prev,
        loading: false,
        error: msg,
      }));
    }
  };

  return {
    rsvpState,
    setRsvpState,
    handleRsvpSubmit,
  };
}
