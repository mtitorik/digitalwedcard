"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.redirectTo) {
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
      setErrorMsg("Network error. Please try again.");
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
          <Link href="/" className="inline-block">
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#124b3c] to-[#082820] border-2 border-amber-400/40 shadow-xl shadow-amber-950/40 mx-auto mb-3 flex items-center justify-center ring-4 ring-amber-500/10">
              <span className="font-serif text-2xl font-bold tracking-widest text-amber-200">
                W
              </span>
            </div>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-amber-100 tracking-wide">
            Welcome Back
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70 mt-1">
            Sign In to Manage Your Digital Wedding Cards
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#082920]/95 border border-amber-400/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60 backdrop-blur-xl relative overflow-hidden">
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs text-center">
              {errorMsg}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#041a14]/90 border border-amber-500/30 rounded-xl pl-10 pr-11 py-3 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl font-medium tracking-wide text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2 cursor-pointer font-serif disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick fills / info */}
          <div className="mt-6 pt-4 border-t border-amber-500/15 flex flex-col gap-2 text-center text-xs">
            <p className="text-amber-300/80">
              Don't have an account yet?{" "}
              <Link href="/signup" className="text-amber-200 font-semibold hover:underline">
                Create one now
              </Link>
            </p>
            <p className="text-[11px] text-amber-400/60">
              Super Admin? Log in with <code className="bg-black/30 px-1 py-0.5 rounded text-amber-300">torikul0598@gmail.com</code>
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
            <span>Return to Public Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
