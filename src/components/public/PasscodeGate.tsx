"use client";

import { useState } from "react";
import { Lock, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PasscodeGateProps {
  expectedPasscode: string;
  coupleNames: string;
  onUnlocked: () => void;
}

export function PasscodeGate({ expectedPasscode, coupleNames, onUnlocked }: PasscodeGateProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toUpperCase() === expectedPasscode.trim().toUpperCase()) {
      onUnlocked();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center p-6 text-stone-100">
      <div className="w-full max-w-md bg-stone-800/90 border border-stone-700/80 rounded-3xl p-8 sm:p-10 text-center shadow-2xl backdrop-blur-md space-y-6">
        <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-300">
          <Lock className="w-6 h-6" />
        </div>

        <div>
          <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest text-amber-300/80 mb-1">
            <Heart className="w-3.5 h-3.5 fill-amber-300" />
            <span>Private Wedding Invitation</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
            {coupleNames}
          </h2>
          <p className="text-xs text-stone-400 mt-2 leading-relaxed">
            This digital invitation card is password-protected. Please enter the passcode provided in your message.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter Invitation Passcode"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              className="w-full h-12 rounded-xl border border-stone-700 bg-stone-900/80 px-4 text-center font-mono text-sm tracking-widest text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-400 uppercase"
            />
            {error && (
              <p className="text-xs text-rose-400 mt-2">
                Incorrect passcode. Please check your invitation message.
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full font-serif text-sm tracking-wider uppercase py-3.5"
          >
            <span>Unlock Invitation</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </div>
  );
}

