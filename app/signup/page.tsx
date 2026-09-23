"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Create Account | Digitalwedcards";
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name || name.trim().length < 2) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match. Please re-enter.");
      return;
    }

    if (!agreeTerms) {
      setErrorMsg("Please agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const redirectParam =
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("redirect")
            : null;

        if (redirectParam) {
          router.push(redirectParam);
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      } else {
        setErrorMsg(data.message || "Failed to create account. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#041a14] bg-radial-[at_top] from-[#0a382c] via-[#041a14] to-[#020d0a] text-amber-100/90 flex flex-col items-center justify-center p-4 selection:bg-amber-500/30">
      {/* Background Decorative Rings */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full border border-amber-500/10 animate-pulse -translate-y-8" />
        <div className="w-[700px] h-[700px] rounded-full border border-amber-500/5 -translate-y-8" />
      </div>

      <div className="w-full max-w-md relative z-10 py-8">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#124b3c] to-[#082820] border-2 border-amber-400/40 shadow-xl shadow-amber-950/40 mx-auto mb-3 flex items-center justify-center ring-4 ring-amber-500/10 group-hover:scale-105 transition-transform">
              <span className="font-serif text-2xl font-bold tracking-widest text-amber-200">
                D
              </span>
            </div>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-amber-100 tracking-wide">
            Digitalwedcards
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70 mt-1">
            Design & Publish Your Luxury Wedding Invitation
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#082920]/95 border border-amber-400/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60 backdrop-blur-xl relative overflow-hidden">
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs text-center flex items-center gap-2 justify-center">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="e.g. Mohammad Sajedul Islam"
                  className="w-full bg-[#041a14]/90 border border-amber-500/30 rounded-xl pl-10 pr-4 py-3 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="name@example.com"
                  className="w-full bg-[#041a14]/90 border border-amber-500/30 rounded-xl pl-10 pr-4 py-3 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                Create Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#041a14]/90 border border-amber-500/30 rounded-xl pl-10 pr-11 py-3 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  placeholder="Repeat your password"
                  className="w-full bg-[#041a14]/90 border border-amber-500/30 rounded-xl pl-10 pr-4 py-3 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                />
              </div>
            </div>

            {/* Terms of Service Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-amber-300/80 hover:text-amber-200">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-amber-400/40 bg-black/40 text-amber-500 accent-amber-500 cursor-pointer shrink-0"
                />
                <span>
                  I agree to the Digitalwedcards{" "}
                  <span className="text-amber-200 underline">Terms of Service</span> and{" "}
                  <span className="text-amber-200 underline">Privacy Policy</span>.
                </span>
              </label>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl font-medium tracking-wide text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2 cursor-pointer font-serif disabled:opacity-50 min-h-[48px]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign Up & Start Creating</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Switch to login */}
          <div className="mt-6 pt-4 border-t border-amber-500/15 text-center text-xs text-amber-300/80">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-200 font-semibold hover:underline">
              Sign In here
            </Link>
          </div>
        </div>

        {/* Home Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-amber-300/70 hover:text-amber-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Return to Marketing Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
