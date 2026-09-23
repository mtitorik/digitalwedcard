"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Sign In | Digitalwedcards";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMsg("Please enter a valid email address (e.g., name@example.com).");
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Check for redirect query parameter
        const redirectParam =
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("redirect")
            : null;

        if (redirectParam) {
          router.push(redirectParam);
        } else if (data.redirectTo) {
          router.push(data.redirectTo);
        } else if (data.user?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      } else {
        setErrorMsg(data.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail("torikul0598@gmail.com");
    setPassword("password");
    setErrorMsg("");
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
            Sign In to Manage Your Digital Invitations
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#082920]/95 border border-amber-400/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60 backdrop-blur-xl relative overflow-hidden">
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs text-center flex items-center gap-2 justify-center">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                Password
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
                  placeholder="••••••••"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-amber-300/80 hover:text-amber-200">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-amber-400/40 bg-black/40 text-amber-500 accent-amber-500 cursor-pointer"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-amber-400 hover:text-amber-200 hover:underline transition-colors cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
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
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick fills / demo credentials */}
          <div className="mt-6 pt-4 border-t border-amber-500/15 flex flex-col gap-2.5 text-center text-xs">
            <button
              type="button"
              onClick={fillDemoAdmin}
              className="py-1.5 px-3 rounded-lg bg-black/30 border border-amber-400/20 text-amber-300 hover:bg-black/50 transition-colors text-[11px] font-mono cursor-pointer"
            >
              ⚡ Quick Fill Admin: <span className="underline">torikul0598@gmail.com</span> / password
            </button>

            <p className="text-amber-300/80">
              Don't have an account yet?{" "}
              <Link href="/signup" className="text-amber-200 font-semibold hover:underline">
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
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

      {/* Forgot Password Modal Dialog */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#082920] border border-amber-400/40 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-amber-400/60 hover:text-amber-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl font-bold text-amber-100">
              Reset Your Password
            </h3>

            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              To reset your password or update your login credentials, please message our
              wedding concierge directly on WhatsApp or email <strong className="text-amber-200">support@digitalwedcards.com</strong>.
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow transition-all block"
              >
                WhatsApp Assistance (+880 1700-000000)
              </a>
              <button
                onClick={() => setShowForgotModal(false)}
                className="py-2 px-4 rounded-xl bg-black/30 border border-amber-400/20 text-amber-300 text-xs hover:bg-black/50 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
