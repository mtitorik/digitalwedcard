"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { MarketingFooter } from "@/components/MarketingFooter";
import { BackToTop } from "@/components/BackToTop";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Wedding Card Design Assistance",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(
          data.message ||
            "Thank you! Your message has been sent. Our wedding concierge will reply within 24 hours."
        );
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "Wedding Card Design Assistance",
          message: "",
        });
      } else {
        setErrorMsg(data.message || "Failed to send your message. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#041a14] bg-radial-[at_top] from-[#0a382c] via-[#041a14] to-[#020d0a] text-amber-100/90 selection:bg-amber-500/30 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Wedding Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 leading-tight">
            We Are Here to Make Your Celebration Magical
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed max-w-xl mx-auto font-light">
            Have questions about custom wedding card designs, domain linking, music integration,
            or enterprise guest coordination? Our concierge team is at your service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Concierge Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#082920]/90 border border-emerald-500/40 shadow-xl relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-4 shadow">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-xl font-bold text-amber-100">
                Direct WhatsApp Concierge
              </h2>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                Chat directly with our design specialists for quick assistance, custom templates, or urgent wedding updates.
              </p>
              <div className="mt-4">
                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition-all min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp (+880 1700-000000)</span>
                </a>
              </div>
            </div>

            {/* Email Support Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#082920]/80 border border-amber-400/30 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-4 shadow">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-xl font-bold text-amber-100">
                Email Support
              </h2>
              <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                For detailed questions, invoice queries, or bespoke design files:
              </p>
              <p className="text-sm font-mono text-amber-300 mt-2 font-semibold">
                support@digitalwedcards.com
              </p>
            </div>

            {/* Studio Hours Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#082920]/80 border border-amber-400/30 shadow-xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mb-2 shadow">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-xl font-bold text-amber-100">
                Studio Concierge Hours
              </h2>
              <div className="space-y-1.5 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>Saturday – Thursday:</span>
                  <span className="font-medium text-amber-200">10:00 AM – 9:00 PM BST</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday (Urgent RSVPs):</span>
                  <span className="font-medium text-amber-200">3:00 PM – 9:00 PM BST</span>
                </div>
                <div className="flex justify-between border-t border-amber-400/15 pt-2 mt-2">
                  <span>Average Response Time:</span>
                  <span className="text-emerald-300 font-semibold">&lt; 2 Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-3xl bg-[#082920]/95 border border-amber-400/30 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 mb-6">
                Fill in your details below and our wedding design team will get in touch promptly.
              </p>

              {/* Status Banners */}
              {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Inquiry Received Successfully!</p>
                    <p className="text-emerald-300/90 mt-0.5">{successMsg}</p>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/90 border border-red-500/50 text-red-200 text-xs sm:text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Submission Failed</p>
                    <p className="text-red-300/90 mt-0.5">{errorMsg}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Mohammad Sajedul Islam"
                      className="w-full bg-[#041a14]/90 border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-[#041a14]/90 border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+880 1700-000000"
                      className="w-full bg-[#041a14]/90 border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#041a14]/90 border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-amber-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all cursor-pointer"
                    >
                      <option value="Wedding Card Design Assistance">Design Assistance</option>
                      <option value="Bespoke Concierge & Custom Domain">Bespoke Concierge & Domain</option>
                      <option value="RSVP Tracking & Headcount Support">RSVP & Headcount Question</option>
                      <option value="Billing & Pricing Inquiry">Billing & Pricing Inquiry</option>
                      <option value="Other Questions">Other Inquiries</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                    How Can We Help You? *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your wedding date, chosen theme, or any questions..."
                    className="w-full bg-[#041a14]/90 border border-amber-500/30 rounded-xl p-4 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-sm tracking-wider uppercase shadow-xl shadow-amber-900/40 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[50px]"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Concierge</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />

      {/* Floating Sticky Back to Top Button */}
      <BackToTop />
    </div>
  );
}
