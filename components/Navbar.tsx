"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Sparkles,
  Menu,
  X,
  User,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Palette,
  ArrowRight,
  Shield,
} from "lucide-react";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setUserDropdownOpen(false);
      setMobileMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const scrollToAnchor = (id: string) => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(`/#${id}`);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-[32px] backdrop-saturate-150 bg-[#041a14]/75 border-b border-amber-400/35 shadow-2xl shadow-black/80"
          : "backdrop-blur-[24px] backdrop-saturate-150 bg-[#041a14]/55 border-b border-amber-400/20 shadow-lg shadow-black/40"
      } text-amber-100`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-b from-[#124b3c] to-[#082820] border border-amber-400/50 flex items-center justify-center p-1.5 shadow-md ring-2 ring-amber-500/20 group-hover:scale-105 transition-transform overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Digitalwedcards Logo"
              width={40}
              height={32}
              className="object-contain w-auto h-auto max-h-7 drop-shadow"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-lg sm:text-xl text-amber-100 leading-tight tracking-wide group-hover:text-amber-300 transition-colors">
              Digitalwedcards
            </span>
            <span className="text-[9px] sm:text-[10px] text-amber-400/70 tracking-widest uppercase font-sans">
              Royal Digital Invitations
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => scrollToAnchor("templates")}
            className="px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium text-amber-200/80 hover:text-amber-100 hover:bg-amber-400/10 transition-colors cursor-pointer"
          >
            Templates
          </button>
          <button
            onClick={() => scrollToAnchor("features")}
            className="px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium text-amber-200/80 hover:text-amber-100 hover:bg-amber-400/10 transition-colors cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={() => scrollToAnchor("pricing")}
            className="px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium text-amber-200/80 hover:text-amber-100 hover:bg-amber-400/10 transition-colors cursor-pointer"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToAnchor("reviews")}
            className="px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium text-amber-200/80 hover:text-amber-100 hover:bg-amber-400/10 transition-colors cursor-pointer"
          >
            Reviews
          </button>
          <Link
            href="/catalog"
            className="px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium text-amber-300 hover:text-amber-100 hover:bg-amber-400/10 transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Catalog</span>
          </Link>
          <button
            onClick={() => scrollToAnchor("explore")}
            className="px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium text-amber-200/80 hover:text-amber-100 hover:bg-amber-400/10 transition-colors cursor-pointer"
          >
            Explore
          </button>
          <Link
            href="/contact"
            className="px-3.5 py-2 rounded-lg text-xs lg:text-sm font-medium text-amber-200/80 hover:text-amber-100 hover:bg-amber-400/10 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-200 hover:bg-amber-400/25 transition-all text-xs font-medium cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-950 font-bold flex items-center justify-center text-[11px]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-amber-400/80" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#082920] border border-amber-400/30 rounded-2xl p-2 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 text-xs">
                  <div className="px-3 py-2 border-b border-amber-400/20">
                    <p className="font-semibold text-amber-100 truncate">{user.name}</p>
                    <p className="text-[11px] text-amber-400/70 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-amber-200 hover:bg-amber-400/15 hover:text-amber-100 transition-colors mt-1"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-400" />
                    <span>My Creator Studio</span>
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-red-200 hover:bg-red-900/30 transition-colors"
                    >
                      <Shield className="w-4 h-4 text-red-400" />
                      <span>Master Admin</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-300 hover:bg-rose-950/40 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-amber-200/90 hover:text-amber-100 hover:bg-amber-400/10 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-xs tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-900/40"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button (Minimum 44x44px touch target) */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#052119]/85 border-b border-amber-400/30 px-5 pt-3 pb-6 space-y-3 backdrop-blur-[32px] backdrop-saturate-150 animate-in slide-in-from-top-3 duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-amber-400/15">
            <button
              onClick={() => scrollToAnchor("templates")}
              className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2.5 rounded-xl bg-amber-400/10 text-amber-200 text-xs font-medium hover:bg-amber-400/20 transition-colors"
            >
              <Palette className="w-4 h-4 text-amber-400" />
              <span>Templates</span>
            </button>
            <Link
              href="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-200 text-xs font-bold hover:bg-amber-400/30 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Catalog (20)</span>
            </Link>
            <button
              onClick={() => scrollToAnchor("features")}
              className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2.5 rounded-xl bg-amber-400/10 text-amber-200 text-xs font-medium hover:bg-amber-400/20 transition-colors"
            >
              <span>Features</span>
            </button>
            <button
              onClick={() => scrollToAnchor("pricing")}
              className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2.5 rounded-xl bg-amber-400/10 text-amber-200 text-xs font-medium hover:bg-amber-400/20 transition-colors"
            >
              <span>Pricing</span>
            </button>
            <button
              onClick={() => scrollToAnchor("explore")}
              className="col-span-2 flex items-center justify-center min-h-[44px] px-3 py-2.5 rounded-xl bg-amber-400/10 text-amber-200 text-xs font-medium hover:bg-amber-400/20 transition-colors cursor-pointer"
            >
              <span>Explore Cards</span>
            </button>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-xl text-amber-200/90 hover:bg-amber-400/10 text-sm font-medium transition-colors"
            >
              <span>Contact Concierge</span>
              <ArrowRight className="w-4 h-4 text-amber-400/60" />
            </Link>

            {user ? (
              <div className="space-y-2 pt-2 border-t border-amber-400/15">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 min-h-[48px] w-full rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-sm tracking-wider uppercase shadow-lg shadow-amber-900/30"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 min-h-[44px] w-full rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-medium"
                  >
                    <Shield className="w-4 h-4 text-red-400" />
                    <span>Master Admin Portal</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 min-h-[44px] w-full rounded-xl bg-[#041a14] border border-rose-500/30 text-rose-300 text-xs font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-amber-400/15">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center min-h-[48px] rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-200 text-xs font-semibold hover:bg-amber-400/25 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center min-h-[48px] rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-xs tracking-wider uppercase shadow-md shadow-amber-900/30"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
