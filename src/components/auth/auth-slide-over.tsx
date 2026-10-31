"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthModal, AuthMode } from "@/context/auth-modal-context";
import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { Heart, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

function AuthUrlSync() {
  const searchParams = useSearchParams();
  const { openAuthModal } = useAuthModal();

  useEffect(() => {
    const auth = searchParams.get("auth");
    if (auth === "signin" || auth === "signup") {
      openAuthModal(auth);
    }
  }, [searchParams, openAuthModal]);

  return null;
}

export function AuthSlideOver() {
  const { isOpen, mode, closeAuthModal, setMode } = useAuthModal();
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle ESC key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAuthModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeAuthModal]);

  return (
    <>
      <Suspense fallback={null}>
        <AuthUrlSync />
      </Suspense>

      <div
        className={cn(
          "fixed inset-0 z-50 overflow-hidden transition-all duration-300",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
      {/* Semi-transparent Backdrop Overlay */}
      <div
        onClick={closeAuthModal}
        className={cn(
          "fixed inset-0 bg-stone-900/40 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      {/* Right-Side Slide-Over Sheet Container */}
      <div className="fixed inset-y-0 right-0 flex max-w-full">
        <div
          ref={panelRef}
          className={cn(
            "w-screen max-w-md sm:max-w-[420px] bg-white shadow-2xl border-l border-stone-200/80 flex flex-col justify-between transform transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Top Sheet Header */}
          <div className="px-6 pt-6 pb-4 border-b border-stone-100 flex-shrink-0">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center shadow-xs">
                  <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <span className="font-serif text-sm font-bold tracking-wider text-stone-900 block leading-none">
                    DIGIWEDCARD
                  </span>
                  <span className="text-[9px] tracking-widest text-stone-400 uppercase font-medium">
                    Digital Wedding Suite
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeAuthModal}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors focus:outline-none cursor-pointer"
                aria-label="Close panel"
                title="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Seamless Tab Switcher */}
            <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={cn(
                  "py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center",
                  mode === "signin"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-500 hover:text-stone-800"
                )}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={cn(
                  "py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center",
                  mode === "signup"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-500 hover:text-stone-800"
                )}
              >
                Create Account
              </button>
            </div>

            <div className="mt-4">
              <h2
                id="auth-modal-title"
                className="font-serif text-2xl font-semibold text-stone-900 tracking-tight"
              >
                {mode === "signin" ? "Welcome Back" : "Begin Your Wedding Journey"}
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {mode === "signin"
                  ? "Access your wedding invitation microsites & RSVPs."
                  : "Create an account to design and publish your invitation."}
              </p>
            </div>
          </div>

          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {mode === "signin" ? <SignInForm /> : <SignUpForm />}
          </div>

          {/* Panel Footer / Trust Badges */}
          <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/50 flex-shrink-0">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400 font-light">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted Credentials • Digiwedcard Suite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

