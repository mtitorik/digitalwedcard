"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Mail,
  Phone,
  Sparkles,
  ArrowUp,
  Compass,
} from "lucide-react";

export const MarketingFooter: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#031510] border-t border-amber-400/20 text-stone-300 pt-16 pb-12 selection:bg-amber-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-amber-400/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#124b3c] to-[#082820] border border-amber-400/50 flex items-center justify-center font-serif text-amber-200 font-bold text-base shadow-md ring-2 ring-amber-500/20 group-hover:scale-105 transition-transform">
                D
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-amber-100 leading-tight block">
                  Digitalwedcards
                </span>
                <span className="text-[10px] text-amber-400/70 tracking-widest uppercase font-sans">
                  Luxury Digital Wedding Invitations
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Replace plain paper cards with unforgettable mobile-first digital wedding invitations.
              Featuring interactive 3D folded envelopes, custom wax seal animations, ambient love melodies,
              real-time RSVP tracking, and Google Maps venue navigation.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 hover:text-amber-100 hover:bg-amber-400/20 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 hover:text-amber-100 hover:bg-amber-400/20 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 hover:text-amber-100 hover:bg-amber-400/20 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Product & Templates */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-200">
              Templates & Themes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/card/sajedul-and-sadia" className="hover:text-amber-200 transition-colors">
                  Royal Emerald & Gold
                </Link>
              </li>
              <li>
                <Link href="/card/aayan-and-zoya" className="hover:text-amber-200 transition-colors">
                  Midnight Velvet & Rose Gold
                </Link>
              </li>
              <li>
                <Link href="/card/farhan-and-anika" className="hover:text-amber-200 transition-colors">
                  Blush Romance & Petal Ivory
                </Link>
              </li>
              <li>
                <Link href="/card/tanvir-and-nusrat" className="hover:text-amber-200 transition-colors">
                  Sapphire Starlight Platinum
                </Link>
              </li>
              <li>
                <Link href="/card/riyad-and-mehnaz" className="hover:text-amber-200 transition-colors">
                  Terracotta Sunset Glow
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1">
                  <Compass className="w-3 h-3" />
                  <span>Explore All Templates</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Features */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-200">
              Features
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/#features" className="hover:text-amber-200 transition-colors">
                  3D Wax Seal Envelope
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-amber-200 transition-colors">
                  Live RSVP Headcount Tracker
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-features transition-colors">
                  Romantic Acoustic Audio
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-amber-200 transition-colors">
                  Google Maps Directions
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-amber-200 transition-colors">
                  Wishes & Blessing Wall
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-amber-200 transition-colors">
                  Transparent Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Concierge */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-sm uppercase tracking-wider text-amber-200">
              Concierge & Legal
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/contact" className="hover:text-amber-200 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Contact Support</span>
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-amber-200 transition-colors">
                  Creator Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-amber-200 transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <span className="text-stone-500 cursor-not-allowed">Privacy Policy</span>
              </li>
              <li>
                <span className="text-stone-500 cursor-not-allowed">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© 2026 Digitalwedcards. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for royal couples worldwide.</span>
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-950/80 border border-amber-400/30 text-amber-300 hover:text-amber-100 hover:border-amber-300 text-xs font-sans tracking-wider uppercase transition-all duration-200 min-h-[44px] cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
