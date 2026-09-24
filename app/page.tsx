"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  ArrowRight,
  ShieldCheck,
  Music,
  MapPin,
  Clock,
  QrCode,
  Smartphone,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  Compass,
  Star,
  Layers,
  Users,
  Flame,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { HeroTemplateCarousel } from "@/components/HeroTemplateCarousel";
import { ExploreTemplatesSection } from "@/components/ExploreTemplatesSection";
import { MarketingFooter } from "@/components/MarketingFooter";
import { BackToTop } from "@/components/BackToTop";

export default function MarketingHomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#041a14] bg-radial-[at_top] from-[#0a382c] via-[#041a14] to-[#020d0a] text-amber-100/90 selection:bg-amber-500/30 font-sans">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        {/* Subtle decorative background circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-400/10 via-emerald-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-wide mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>The #1 Luxury Digital Wedding Invitation Platform</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-amber-100 tracking-tight leading-[1.1] max-w-4xl mx-auto drop-shadow-md">
            Modern, Interactive Digital Wedding Invitations{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 italic">
              Your Guests Will Adore
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base lg:text-lg text-amber-200/80 mt-5 max-w-2xl mx-auto leading-relaxed font-sans font-light">
            Replace plain paper cards with immersive 3D animated envelopes, instant RSVP tracking,
            romantic music, and interactive maps — crafted for smartphones and unforgettable impressions.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-base tracking-wider uppercase shadow-xl shadow-amber-900/40 hover:brightness-110 active:scale-95 transition-all min-h-[52px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Your Invitation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-950/80 border border-amber-400/40 text-amber-200 font-serif font-semibold text-base hover:bg-amber-400/15 hover:text-amber-100 transition-all min-h-[52px]"
            >
              <span>Explore Live Demos</span>
              <ChevronDown className="w-4 h-4 text-amber-400" />
            </a>
          </div>

          {/* Live Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mt-12 pt-8 border-t border-amber-400/15 text-center">
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">10,000+</p>
              <p className="text-[11px] text-amber-400/70 uppercase tracking-wider mt-0.5">Couples Delighted</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">99.8%</p>
              <p className="text-[11px] text-amber-400/70 uppercase tracking-wider mt-0.5">RSVP Response Rate</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">6 Themes</p>
              <p className="text-[11px] text-amber-400/70 uppercase tracking-wider mt-0.5">Luxury Templates</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">100%</p>
              <p className="text-[11px] text-amber-400/70 uppercase tracking-wider mt-0.5">Mobile Optimized</p>
            </div>
          </div>
        </div>

        {/* Multi-Template Interactive Showcase Carousel */}
        <div id="templates" className="mt-12 sm:mt-16 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-6 px-4">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400/80">
              Interactive Template Showcase
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-amber-100 mt-1">
              Select Your Wedding Style
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-2">
              Preview our handcrafted themes below or test drive the live card on any smartphone!
            </p>
          </div>

          <HeroTemplateCarousel />
        </div>
      </section>

      {/* 3. Section: Explore All Designer Templates Gallery */}
      <ExploreTemplatesSection />

      {/* 4. Section B: Features & Mobile Experience Highlight */}
      <section id="features" className="py-20 bg-black/30 border-y border-amber-400/15 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Built for Modern Celebrations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 leading-tight">
              Crafted for Smartphones. Cherished by Guests.
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed">
              Every detail is designed to make your wedding invitation as magical as your big day.
              Say goodbye to postal delays, unreadable paper RSVPs, and missing directions.
            </p>
          </div>

          {/* 6 Grid Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#082920]/80 border border-amber-400/30 hover:border-amber-400/60 shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center mb-5 shadow-md shadow-amber-900/30">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100 mb-2">
                Touch-to-Open 3D Animation
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Guests tap the golden wax seal to unseal the realistic 3D envelope, revealing your
                custom couple card with celebratory gold confetti.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#082920]/80 border border-amber-400/30 hover:border-amber-400/60 shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center mb-5 shadow-md shadow-amber-900/30">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100 mb-2">
                Smart RSVPs to MongoDB
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Live attendance headcount, party guest counts, and personal du&apos;a/wishes sync immediately
                to your dashboard with instant CSV export.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#082920]/80 border border-amber-400/30 hover:border-amber-400/60 shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center mb-5 shadow-md shadow-amber-900/30">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100 mb-2">
                One-Tap Google Maps Navigation
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Guests never get lost. One tap launches turnkey Google Maps GPS directions straight
                to your reception hall or banquet venue.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#082920]/80 border border-amber-400/30 hover:border-amber-400/60 shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center mb-5 shadow-md shadow-amber-900/30">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100 mb-2">
                Background Romance Music
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Set an enchanting mood. Romantic acoustic melodies play upon opening, complete with
                a floating toggle button and Web Audio synthesizer fallback.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#082920]/80 border border-amber-400/30 hover:border-amber-400/60 shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center mb-5 shadow-md shadow-amber-900/30">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100 mb-2">
                Photo Story & Love Timeline
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Tell your journey from the first meeting to the proposal. Showcase touch-swipeable
                portrait galleries with high-resolution modal viewers.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#082920]/80 border border-amber-400/30 hover:border-amber-400/60 shadow-xl transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-emerald-950 flex items-center justify-center mb-5 shadow-md shadow-amber-900/30">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-100 mb-2">
                WhatsApp & QR Code Ready
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                Share in 1 click across WhatsApp, Telegram, and Messenger with rich link previews,
                or print sharp QR codes on your physical wedding favor cards.
              </p>
            </div>
          </div>

          {/* Paper vs Digital Comparison Table */}
          <div className="mt-20 pt-12 border-t border-amber-400/20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                Why Couples Choose Digital Over Paper
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-1">
                More elegant. Zero postal delays. Fraction of the cost.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-amber-400/30 shadow-2xl bg-[#051c14]/90">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-amber-400/20 bg-emerald-950/60 font-serif text-amber-200">
                    <th className="py-4 px-5">Features</th>
                    <th className="py-4 px-5 text-amber-300 font-bold">✨ Digitalwedcards</th>
                    <th className="py-4 px-5 text-stone-400">Traditional Paper</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-400/10 text-stone-300">
                  <tr>
                    <td className="py-3.5 px-5 font-medium text-amber-100">Average Cost</td>
                    <td className="py-3.5 px-5 text-emerald-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>From ৳0 – ৳1,999 flat fee</span>
                    </td>
                    <td className="py-3.5 px-5 text-stone-400">৳30,000 – ৳80,000+ ($400-$1000)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 font-medium text-amber-100">RSVP Headcount Sync</td>
                    <td className="py-3.5 px-5 text-emerald-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Instant real-time database updates</span>
                    </td>
                    <td className="py-3.5 px-5 text-stone-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-400/80" />
                      <span>Manual calling and guessing</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 font-medium text-amber-100">Live GPS Navigation</td>
                    <td className="py-3.5 px-5 text-emerald-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>1-Tap Google Maps directions</span>
                    </td>
                    <td className="py-3.5 px-5 text-stone-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-400/80" />
                      <span>Tiny static printed sketch</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 font-medium text-amber-100">Music & 3D Envelope</td>
                    <td className="py-3.5 px-5 text-emerald-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Interactive wax seal + romantic harp audio</span>
                    </td>
                    <td className="py-3.5 px-5 text-stone-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-400/80" />
                      <span>Silent stationary</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-5 font-medium text-amber-100">Last-Minute Updates</td>
                    <td className="py-3.5 px-5 text-emerald-300 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Instant edit anytime from Dashboard</span>
                    </td>
                    <td className="py-3.5 px-5 text-stone-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-400/80" />
                      <span>Cannot edit after printing</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section C: Transparent Pricing Section */}
      <section id="pricing" className="py-20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparent & Simple</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 leading-tight">
              One Small Investment for Your Lifetime Milestone
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed">
              No recurring subscription fees. One-time payment keeps your invitation live throughout your wedding.
            </p>
          </div>

          {/* 3-Tier Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Tier 1: Starter */}
            <div className="rounded-3xl bg-[#082920]/80 border border-amber-400/30 p-7 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400/80 font-semibold">
                  Starter Plan
                </span>
                <h3 className="font-serif text-2xl font-bold text-amber-100 mt-1">Free Trial</h3>
                <p className="text-xs text-stone-300 mt-2">
                  Perfect for experiencing the platform and testing your card preview.
                </p>

                <div className="my-6">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-200">৳0</span>
                  <span className="text-xs text-stone-400 ml-2">/ free forever</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>1 Active Digital Wedding Card</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Standard Envelope Opening Animation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Up to 50 RSVPs & Wishes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Standard Web URL Link</span>
                  </li>
                  <li className="flex items-center gap-2 text-stone-500">
                    <XCircle className="w-4 h-4 text-stone-600 shrink-0" />
                    <span>Background Romance Music</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/signup"
                className="mt-8 w-full py-3.5 px-4 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-200 hover:bg-amber-400/25 font-serif font-bold text-center text-sm tracking-wider uppercase transition-all block min-h-[48px]"
              >
                Start Free
              </Link>
            </div>

            {/* Tier 2: Premium (Most Popular) */}
            <div className="rounded-3xl bg-gradient-to-b from-[#0e4436] to-[#062920] border-2 border-amber-400 p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative shadow-amber-950/60 ring-4 ring-amber-400/20 md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 text-[10px] font-bold uppercase tracking-widest shadow-md">
                👑 Most Popular
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                  Royal Experience
                </span>
                <h3 className="font-serif text-2xl font-bold text-amber-100 mt-1">Premium Invitation</h3>
                <p className="text-xs text-amber-200/80 mt-2">
                  The complete luxury package with all animation styles, music, and unlimited RSVPs.
                </p>

                <div className="my-6">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-100">৳1,999</span>
                  <span className="text-xs text-amber-300/80 ml-2">($19) one-time</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-amber-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span><strong>All 6 Themes</strong> & 3D Wax Seal Animation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span><strong>Unlimited RSVPs</strong> & Wishes Wall</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span><strong>Excel / CSV Guest Headcount Export</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Acoustic Harp Music & Photo Gallery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>Custom URL Slug & High-Res Printable QR Code</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>1-Year Cloud Hosting & Full Edits Anytime</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/signup"
                className="mt-8 w-full py-4 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-center text-sm tracking-wider uppercase shadow-xl shadow-amber-900/40 hover:brightness-110 active:scale-95 transition-all block min-h-[48px]"
              >
                Get Premium Invitation
              </Link>
            </div>

            {/* Tier 3: Bespoke Concierge */}
            <div className="rounded-3xl bg-[#082920]/80 border border-amber-400/30 p-7 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400/80 font-semibold">
                  Custom & Concierge
                </span>
                <h3 className="font-serif text-2xl font-bold text-amber-100 mt-1">Bespoke Suite</h3>
                <p className="text-xs text-stone-300 mt-2">
                  White-glove concierge design with custom domain and priority WhatsApp coordination.
                </p>

                <div className="my-6">
                  <span className="font-serif text-4xl sm:text-5xl font-bold text-amber-200">৳4,999</span>
                  <span className="text-xs text-stone-400 ml-2">($49) one-time</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Everything in Premium</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Custom Domain Linking (<code>yourname.com</code>)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Dedicated Wedding Concierge Designer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Priority WhatsApp Assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Lifetime Digital Archival</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/contact"
                className="mt-8 w-full py-3.5 px-4 rounded-xl bg-amber-400/15 border border-amber-400/40 text-amber-200 hover:bg-amber-400/25 font-serif font-bold text-center text-sm tracking-wider uppercase transition-all block min-h-[48px]"
              >
                Contact Concierge
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section D: Social Proof & Testimonials */}
      <section id="reviews" className="py-20 bg-black/40 border-t border-amber-400/15 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Real Couples, Real Love</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 leading-tight">
              Loved by Over 10,000+ Couples & Their Guests
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed">
              Read how couples elevated their wedding announcements with Digitalwedcards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Review 1 */}
            <div className="p-7 rounded-2xl bg-[#082920]/80 border border-amber-400/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-amber-100/90 italic leading-relaxed font-serif">
                  &ldquo;Our guests were totally mesmerized when they tapped the wax seal and the envelope opened with
                  the harp melody! We received over 85% of our RSVPs in just 48 hours without calling anyone.&rdquo;
                </p>
              </div>
              <div className="pt-6 border-t border-amber-400/15 mt-6">
                <p className="font-serif font-bold text-amber-200">Sadia & Mohammad Sajedul</p>
                <p className="text-[11px] text-amber-400/60 uppercase tracking-widest">
                  Grand Reception • Dhaka
                </p>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-7 rounded-2xl bg-[#082920]/80 border border-amber-400/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-amber-100/90 italic leading-relaxed font-serif">
                  &ldquo;With family spread across London, Dubai, and Chittagong, shipping physical cards was a nightmare.
                  Digitalwedcards let us send royal invitations in seconds via WhatsApp with gorgeous link previews!&rdquo;
                </p>
              </div>
              <div className="pt-6 border-t border-amber-400/15 mt-6">
                <p className="font-serif font-bold text-amber-200">Zoya & Aayan</p>
                <p className="text-[11px] text-amber-400/60 uppercase tracking-widest">
                  Modern Luxury • London / Chittagong
                </p>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-7 rounded-2xl bg-[#082920]/80 border border-amber-400/30 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-amber-100/90 italic leading-relaxed font-serif">
                  &ldquo;The Google Maps navigation was a lifesaver for our guests from out of town. The live wishes wall
                  became our favorite digital guestbook to reread during our honeymoon.&rdquo;
                </p>
              </div>
              <div className="pt-6 border-t border-amber-400/15 mt-6">
                <p className="font-serif font-bold text-amber-200">Anika & Farhan</p>
                <p className="text-[11px] text-amber-400/60 uppercase tracking-widest">
                  Floral Romance • Sylhet / Toronto
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section E: Interactive FAQ Accordion */}
      <section id="faq" className="py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-amber-100">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How do guests open the digital invitation on their phone?",
                a: "When guests click your unique link, they see an elegant folded 3D envelope with your monogram and royal wax seal stamp. Tapping the wax seal triggers an opening animation, chimes and confetti, and smoothly unfolds your invitation.",
              },
              {
                q: "Can I customize the colors, photos, and wedding schedule?",
                a: "Yes! You can choose from 6 bespoke designer themes (Royal Emerald, Midnight Velvet, Blush Romance, Sapphire Starlight, Terracotta Sunset, and Marigold Festive). You can upload couple photos, customize dress codes, event dates, map locations, and hashtags directly in your Creator Studio.",
              },
              {
                q: "How do I track and export guest RSVPs?",
                a: "Every RSVP submitted by your guests appears instantly in your Creator Studio dashboard. You can see confirmed guest counts, dietary notes, and heartfelt wishes, and export the entire list to Excel/CSV with one click.",
              },
              {
                q: "Can I print a QR code on physical paper cards?",
                a: "Absolutely! Digitalwedcards automatically generates a high-resolution QR code for your invitation URL. You can download and print this QR code on physical cards or wedding favors so guests can scan and experience the digital card.",
              },
              {
                q: "Can I make changes after sharing the invitation link?",
                a: "Yes! Unlike traditional paper cards, you can update dates, event timings, venue directions, or photos at any time from your Creator Studio. All updates reflect instantly on the same link.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-amber-400/25 bg-[#082920]/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between text-sm sm:text-base font-serif font-bold text-amber-100 hover:text-amber-200 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-stone-300 font-sans leading-relaxed border-t border-amber-400/10 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Section F: Call to Action Banner */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#0d4637] via-[#125845] to-[#0d4637] border-2 border-amber-400/50 p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden ring-4 ring-amber-400/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 leading-tight">
              Ready to Wow Your Wedding Guests?
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-amber-200/90 max-w-xl mx-auto font-sans leading-relaxed">
              Create your royal interactive invitation card in less than 2 minutes.
              Delight family and friends across the globe with a royal digital keepsake.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-base tracking-wider uppercase shadow-xl shadow-amber-900/40 hover:brightness-110 active:scale-95 transition-all min-h-[52px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Begin Creating Your Invitation</span>
              </Link>
              <a
                href="#explore"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-950/90 border border-amber-400/40 text-amber-200 font-serif font-semibold text-base hover:bg-amber-400/15 transition-all min-h-[52px]"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Explore All Templates</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Global SaaS Marketing Footer */}
      <MarketingFooter />

      {/* 9. Floating Sticky Back to Top Button */}
      <BackToTop />
    </div>
  );
}
