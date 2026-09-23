"use client";

import React, { useState } from "react";
import { CheckCircle2, Heart, HeartCrack, Loader2, Sparkles, User, Phone, Users, MessageSquare, X } from "lucide-react";
import { triggerRsvpConfetti } from "./Confetti";
import { Wish } from "../data/weddingData";

interface RsvpFormProps {
  onWishAdded?: (wish: Wish) => void;
  cardSlug?: string;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ onWishAdded, cardSlug = "sajedul-and-sadia" }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<"attending" | "declined">("attending");
  const [guestsCount, setGuestsCount] = useState(1);
  const [wishMessage, setWishMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successModalData, setSuccessModalData] = useState<{
    fullName: string;
    attending: "attending" | "declined";
    guestsCount: number;
    refCode: string;
  } | null>(null);

  const handleGuestsCountChange = (delta: number) => {
    setGuestsCount((prev) => Math.min(10, Math.max(1, prev + delta)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validation
    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardSlug,
          fullName: fullName.trim(),
          phone: phone.trim(),
          attending,
          guestsCount: attending === "attending" ? guestsCount : 1,
          wishMessage: wishMessage.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit RSVP");
      }

      // Success!
      triggerRsvpConfetti();
      const generatedRef = `WEDD-${Math.floor(100000 + Math.random() * 900000)}`;
      setSuccessModalData({
        fullName: fullName.trim(),
        attending,
        guestsCount: attending === "attending" ? guestsCount : 1,
        refCode: generatedRef,
      });

      if (data.wish && onWishAdded) {
        onWishAdded(data.wish);
      }

      // Reset form
      setFullName("");
      setPhone("");
      setWishMessage("");
      setGuestsCount(1);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 md:px-8 py-8 md:py-12" id="rsvp-section" aria-label="Wedding RSVP Form">
      <div className="text-center mb-6 md:mb-10">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-300/80 font-sans font-medium">
          Respond by December 15, 2026
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-100 font-light mt-1 mb-2">
          R.S.V.P
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/70 max-w-md mx-auto">
          Kindly reply to assist us in finalizing seating and reception arrangements.
        </p>
        <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-3" />
      </div>

      <div className="max-w-2xl sm:max-w-3xl md:max-w-4xl mx-auto rounded-3xl bg-[#062d22] border border-amber-300/30 p-6 sm:p-8 md:p-10 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Name & Phone in 2-column grid on tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="rsvp-fullname" className="block text-xs sm:text-sm font-sans text-amber-200/90 mb-1.5 font-medium">
                Full Name <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400/60">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="rsvp-fullname"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl bg-black/30 border border-amber-300/30 text-amber-100 placeholder-stone-400 text-sm font-sans focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all min-h-[44px]"
                />
              </div>
            </div>

            {/* Bangladesh Phone / WhatsApp (+880) */}
            <div>
              <label htmlFor="rsvp-phone" className="block text-xs sm:text-sm font-sans text-amber-200/90 mb-1.5 font-medium">
                Phone / WhatsApp (Bangladesh)
              </label>
              <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400/60">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  id="rsvp-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1712-345678"
                  className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl bg-black/30 border border-amber-300/30 text-amber-100 placeholder-stone-400 text-sm font-sans focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all min-h-[44px]"
                />
              </div>
            </div>
          </div>

          {/* Attending Status Radio Toggle */}
          <div>
            <span className="block text-xs sm:text-sm font-sans text-amber-200/90 mb-2 font-medium">
              Will you be attending? <span className="text-amber-400">*</span>
            </span>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                id="rsvp-accept-btn"
                onClick={() => setAttending("attending")}
                className={`group flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs sm:text-sm font-sans font-medium transition-all duration-300 min-h-[44px] cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${attending === "attending"
                    ? "bg-amber-400/25 border-amber-400 text-amber-100 shadow-lg shadow-amber-950/40 ring-2 ring-amber-400/60 scale-[1.02]"
                    : "bg-black/20 border-amber-300/20 text-stone-300 hover:border-amber-300/50 hover:bg-black/30"
                  }`}
              >
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${attending === "attending" ? "text-amber-400 fill-amber-400 scale-110" : "text-stone-400 group-hover:text-amber-300/70"}`} />
                <span>Joyfully Accept</span>
              </button>

              <button
                type="button"
                id="rsvp-decline-btn"
                onClick={() => setAttending("declined")}
                className={`group flex items-center justify-center gap-2 p-3.5 rounded-xl border text-xs sm:text-sm font-sans font-medium transition-all duration-300 min-h-[44px] cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${attending === "declined"
                    ? "bg-rose-950/40 border-rose-400/70 text-rose-100 shadow-lg shadow-rose-950/40 ring-2 ring-rose-400/50 scale-[1.02]"
                    : "bg-black/20 border-amber-300/20 text-stone-300 hover:border-rose-400/40 hover:bg-black/30"
                  }`}
              >
                <HeartCrack className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${attending === "declined" ? "text-rose-400 fill-rose-400/30 scale-110" : "text-stone-400 group-hover:text-rose-300/70"}`} />
                <span>Regretfully Decline</span>
              </button>
            </div>
          </div>

          {/* Polite message when declining */}
          {attending === "declined" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300 p-3.5 rounded-2xl bg-black/30 border border-rose-400/25 flex items-center gap-3 text-xs sm:text-sm text-stone-300">
              <HeartCrack className="w-4 h-4 text-rose-400 shrink-0" />
              <span>You will be dearly missed in spirit! Please feel free to leave a heartfelt blessing below.</span>
            </div>
          )}

          {/* Number of Guests (Only if attending) */}
          {attending === "attending" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label htmlFor="rsvp-guests" className="block text-xs sm:text-sm font-sans text-amber-200/90 mb-1.5 font-medium">
                Number of Guests Attending
              </label>
              <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-black/30 border border-amber-300/30">
                <div className="flex items-center gap-2 pl-2 text-xs sm:text-sm text-stone-300">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Party Size:</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    aria-label="Decrease guest count"
                    onClick={() => handleGuestsCountChange(-1)}
                    disabled={guestsCount <= 1}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#041a13] text-amber-200 border border-amber-400/30 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-900 transition-colors text-lg"
                  >
                    -
                  </button>
                  <span className="font-serif text-xl sm:text-2xl text-amber-200 w-8 text-center font-medium">
                    {guestsCount}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase guest count"
                    onClick={() => handleGuestsCountChange(1)}
                    disabled={guestsCount >= 10}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#041a13] text-amber-200 border border-amber-400/30 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-900 transition-colors text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Heartfelt Wish / Message */}
          <div>
            <label htmlFor="rsvp-wish" className="block text-xs sm:text-sm font-sans text-amber-200/90 mb-1.5 font-medium">
              Message / Warm Wish for the Couple
            </label>
            <div className="relative">
              <div className="absolute top-3.5 left-3.5 pointer-events-none text-amber-400/60">
                <MessageSquare className="w-4 h-4" />
              </div>
              <textarea
                id="rsvp-wish"
                rows={3}
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                placeholder="Leave a sweet blessing or du'a for Sajedul & Sadia to cherish..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-black/30 border border-amber-300/30 text-amber-100 placeholder-stone-400 text-sm font-sans focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none"
              />
            </div>
          </div>

          {/* Error Message Feedback */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs sm:text-sm font-sans">
              {errorMessage}
            </div>
          )}

          {/* Submit Button with Loading Spinner */}
          <button
            type="submit"
            id="rsvp-submit-btn"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-emerald-950 font-sans font-semibold text-xs sm:text-sm tracking-widest uppercase shadow-lg shadow-amber-900/30 transition-all duration-200 hover:scale-102 active:scale-98 disabled:opacity-75 disabled:cursor-not-allowed min-h-[44px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-950" />
                <span>Sending RSVP...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Confirm RSVP</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* SUCCESS THANK YOU MODAL */}
      {successModalData && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="thank-you-title"
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-sm sm:max-w-md rounded-3xl bg-gradient-to-b from-[#083327] to-[#041913] border-2 border-amber-300/50 p-6 sm:p-8 shadow-2xl text-center">
            <button
              onClick={() => setSuccessModalData(null)}
              aria-label="Close confirmation dialog"
              className="absolute top-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 text-amber-200 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-400/20 border border-amber-300/50 flex items-center justify-center mx-auto mb-4 text-amber-300">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <h3 id="thank-you-title" className="font-serif text-2xl sm:text-3xl text-amber-100 font-light mb-2">
              Thank You, {successModalData.fullName}!
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed mb-4">
              {successModalData.attending === "attending"
                ? `Your RSVP for ${successModalData.guestsCount} ${successModalData.guestsCount === 1 ? "guest" : "guests"} has been joyfully confirmed. We look forward to celebrating with you!`
                : "Thank you for letting us know. You will be dearly missed in spirit!"}
            </p>

            <div className="p-3 sm:p-3.5 rounded-xl bg-black/30 border border-amber-300/20 text-xs sm:text-sm font-sans text-amber-200/90 mb-5">
              <span>Confirmation Ref: </span>
              <span className="font-mono text-amber-300">{successModalData.refCode}</span>
            </div>

            <button
              onClick={() => setSuccessModalData(null)}
              className="w-full py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-emerald-950 text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase transition-colors"
            >
              Back to Invitation
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
