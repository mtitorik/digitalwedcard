"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, Sparkles, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("torikul0598@gmail.com");
  const [password, setPassword] = useState("password");
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
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg(data.message || "Invalid credentials. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#041a14] bg-radial-[at_top] from-[#0a382c] via-[#041a14] to-[#020d0a] text-amber-100/90 flex flex-col items-center justify-center p-4 selection:bg-amber-500/30">
      {/* Background Decorative Rings */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full border border-amber-500/10 animate-pulse -translate-y-12" />
        <div className="w-[700px] h-[700px] rounded-full border border-amber-500/5 -translate-y-12" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Monogram Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-b from-[#124b3c] to-[#082820] border-2 border-amber-400/40 shadow-xl shadow-amber-950/40 mb-4 ring-4 ring-amber-500/10">
            <span className="font-serif text-2xl font-bold tracking-widest text-amber-200">
              S & S
            </span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-amber-200 tracking-wide">
            Admin Portal
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/70 mt-1">
            Sajedul & Sadia • Wedding Management
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#082920]/95 border border-amber-400/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-amber-500/20 text-amber-300 text-sm font-medium">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>Secure Administrator Access</span>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-xs text-center animate-shake">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@wedding.com"
                  className="w-full bg-[#041a14]/90 border border-amber-500/30 rounded-xl pl-10 pr-4 py-3 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
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
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl font-medium tracking-wide text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2 cursor-pointer font-serif disabled:opacity-50"
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
          </form>

          {/* Preset hint */}
          <div className="mt-6 pt-4 border-t border-amber-500/10 text-center">
            <p className="text-[11px] text-amber-400/60">
              Super Admin: <code className="text-amber-300 bg-black/40 px-1.5 py-0.5 rounded">torikul0598@gmail.com</code> / <code className="text-amber-300 bg-black/40 px-1.5 py-0.5 rounded">password</code>
            </p>
          </div>
        </div>

        {/* Back to Public Card */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-amber-300/70 hover:text-amber-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Return to Public Wedding Invitation</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
