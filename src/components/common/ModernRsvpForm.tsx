"use client";

import React from "react";
import { Send, Heart, Loader2 } from "lucide-react";
import { useModernRsvp } from "./useModernRsvp";

export interface ModernRsvpFormProps {
  cardSlug?: string;
  dataId?: string;
  deadline?: string;
  className?: string;
  accentColor?: string; // e.g. "#4A6B53"
  eyebrow?: string;
  title?: string;
  divider?: React.ReactNode;
}

export const ModernRsvpForm: React.FC<ModernRsvpFormProps> = ({
  cardSlug,
  dataId,
  deadline = "10 days before event",
  className = "",
  accentColor = "#4A6B53",
  eyebrow = "Join Our Celebration",
  title = "RSVP Kindly",
  divider,
}) => {
  const { rsvpState, setRsvpState, handleRsvpSubmit } = useModernRsvp({
    cardSlug,
    dataId,
  });

  return (
    <div className={`w-full max-w-xl mx-auto rounded-3xl p-6 sm:p-8 bg-white/95 border border-stone-200 shadow-sm ${className}`}>
      <div className="text-center mb-6">
        <span
          className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-serif font-bold"
          style={{ color: accentColor }}
        >
          {eyebrow}
        </span>
        <h3 className="text-2xl font-serif text-stone-900 mt-1">{title}</h3>
        {deadline && (
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            The favor of reply is requested by{" "}
            <span className="font-semibold text-stone-800">{deadline}</span>
          </p>
        )}
        {divider}
      </div>

      {rsvpState.submitted ? (
        <div className="text-center py-8 space-y-2 bg-stone-50 rounded-2xl p-6 border border-stone-200">
          <div
            className="w-12 h-12 rounded-full text-white flex items-center justify-center mx-auto shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h4 className="font-serif font-bold text-base text-stone-900">
            Thank You, {rsvpState.name}!
          </h4>
          <p className="text-xs sm:text-sm text-stone-600">
            Your response has been warmly received. We look forward to celebrating together!
          </p>
        </div>
      ) : (
        <form onSubmit={handleRsvpSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-serif font-semibold text-stone-700 mb-1">
              Full Name(s) *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mr. Tanvir Rahman & Family"
              value={rsvpState.name}
              onChange={(e) =>
                setRsvpState((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 bg-stone-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-semibold text-stone-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              placeholder="e.g. +880 1700-000000"
              value={rsvpState.phone}
              onChange={(e) =>
                setRsvpState((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 bg-stone-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-semibold text-stone-700 mb-1">
              Will You Attend?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {(["yes", "no", "maybe"] as const).map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() =>
                    setRsvpState((prev) => ({ ...prev, attending: opt }))
                  }
                  className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl border transition ${
                    rsvpState.attending === opt
                      ? "text-white shadow-sm"
                      : "bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100"
                  }`}
                  style={
                    rsvpState.attending === opt
                      ? { backgroundColor: accentColor, borderColor: accentColor }
                      : {}
                  }
                >
                  {opt === "yes"
                    ? "Joyfully Accept"
                    : opt === "no"
                    ? "Regretfully Decline"
                    : "Tentative / Maybe"}
                </button>
              ))}
            </div>
          </div>

          {rsvpState.attending !== "no" && (
            <div>
              <label className="block text-xs font-serif font-semibold text-stone-700 mb-1">
                Number of Attendees
              </label>
              <select
                value={rsvpState.guests}
                onChange={(e) =>
                  setRsvpState((prev) => ({
                    ...prev,
                    guests: Number(e.target.value),
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 bg-stone-50/50"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-serif font-semibold text-stone-700 mb-1">
              Warm Wishes &amp; Notes
            </label>
            <textarea
              rows={3}
              placeholder="Write your blessings and prayers for the couple..."
              value={rsvpState.message}
              onChange={(e) =>
                setRsvpState((prev) => ({ ...prev, message: e.target.value }))
              }
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 bg-stone-50/50"
            />
          </div>

          {rsvpState.error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center">
              {rsvpState.error}
            </div>
          )}

          <button
            type="submit"
            disabled={rsvpState.loading}
            className="w-full py-3 px-6 rounded-xl text-white text-xs sm:text-sm font-serif font-semibold tracking-wider hover:brightness-105 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: accentColor }}
          >
            {rsvpState.loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting RSVP...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send RSVP Confirmation</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
