"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SessionUser } from "@/types";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Heart, Shield, Menu, X } from "lucide-react";
import { useAuthModal } from "@/context/auth-modal-context";

export const NAV_LINKS = [
  { label: "Home", href: "/#hero" },
  { label: "Design", href: "/#designs" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Why Us", href: "/#why-us" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

interface HeaderProps {
  session?: SessionUser | null;
}

export function Header({ session }: HeaderProps) {
  const { openAuthModal } = useAuthModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFloating = scrolled || mobileMenuOpen;

  return (
    <>
      <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        isFloating ? "px-3 pt-3 sm:px-6 sm:pt-4" : "px-0 pt-0"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl transition-all duration-500 ease-out ${
          isFloating
            ? "bg-stone-950/80 backdrop-blur-md border border-white/15 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.6)] rounded-3xl hover:bg-stone-950/90 hover:border-white/25 hover:shadow-[0_20px_48px_-16px_rgba(0,0,0,0.7)]"
            : "bg-transparent ring-0 border border-transparent shadow-none rounded-none"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 sm:px-8 transition-all duration-500 ease-out ${
            isFloating ? "h-16" : "h-20"
          }`}
        >
          {/* Brand Logo & Website Name (White text retained continuously) */}
          <Link
            href="/"
            title="Digiwedcard Homepage"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 bg-white/10 text-amber-300 border border-white/20 backdrop-blur-sm group-hover:bg-white/20">
              <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider block text-white group-hover:text-amber-200 drop-shadow-sm transition-colors">
                DIGIWEDCARD
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium block text-stone-300/80">
                Digital Event Microsites
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (White text retained continuously) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Primary">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative px-3 py-1.5 text-[11px] xl:text-[12px] uppercase tracking-[0.14em] font-medium transition-all duration-300 rounded-lg whitespace-nowrap text-white/90 hover:text-white hover:bg-white/10 drop-shadow-xs"
              >
                {item.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-amber-400 transition-transform duration-300 origin-center scale-x-0 group-hover:scale-x-100 rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Right Actions / Auth Section (White text retained continuously) */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            {session ? (
              <div className="flex items-center gap-3">
                <SignOutButton className="rounded-full px-4 py-2 border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm text-xs uppercase tracking-wider transition-all" />
              </div>
            ) : (
              <Button
                variant="gold"
                size="sm"
                onClick={() => openAuthModal("signin")}
                className="rounded-full px-5 py-2 text-xs uppercase tracking-wider font-semibold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer ring-1 ring-white/20"
              >
                Sign up / Log in
              </Button>
            )}
          </div>

          {/* Mobile Hamburger Toggle Button (White icon retained continuously) */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu (Contained inside floating pill) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-stone-950/95 backdrop-blur-xl px-6 py-5 space-y-4 rounded-b-3xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-stone-200 hover:text-amber-300 hover:bg-white/10 rounded-xl transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {session ? (
                <div className="space-y-3">
                  <SignOutButton className="w-full rounded-full py-2.5 border-white/40 text-white bg-white/10 hover:bg-white/20 text-xs uppercase tracking-wider" />
                </div>
              ) : (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("signin");
                  }}
                  className="w-full rounded-full py-2.5 text-xs uppercase tracking-wider font-semibold shadow-md cursor-pointer"
                >
                  Sign up / Log in
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>

    {/* Floating Admin Dashboard Button Anchored to the Right Bottom Corner */}
    {session?.role === "ADMIN" && (
      <Link
        href="/admin"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs sm:text-sm font-semibold shadow-[0_12px_28px_-6px_rgba(217,119,6,0.65)] ring-1 ring-white/30 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
        title="Open Admin Dashboard"
      >
        <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
          <Shield className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-12 transition-transform" />
        </div>
        <span className="tracking-wide">Admin Dashboard</span>
      </Link>
    )}
    </>
  );
}

