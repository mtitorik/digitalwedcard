"use client";

import { useState } from "react";
import Link from "next/link";
import { SessionUser } from "@/types";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/auth/SignOutButton";
import { Heart, Shield, Menu, X } from "lucide-react";
import { useAuthModal } from "@/context/auth-modal-context";

export const STOREFRONT_NAV_LINKS = [
  { label: "Home", href: "/#hero" },
  { label: "Design", href: "/#designs" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Why Us", href: "/#why-us" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

interface NavbarProps {
  session?: SessionUser | null;
}

export function Navbar({ session }: NavbarProps) {
  const { openAuthModal } = useAuthModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/80 backdrop-blur-md shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          title="Digiwedcard Homepage"
          className="flex items-center gap-3 group flex-shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-wider text-stone-900 block group-hover:text-amber-800 transition-colors">
              DIGIWEDCARD
            </span>
            <span className="text-[10px] tracking-widest text-stone-400 uppercase font-medium">
              Digital Event Microsites
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {STOREFRONT_NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100/70 rounded-lg transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions / Slide-Over Auth Triggers */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-600 hidden xl:inline">
                Welcome, <strong>{session.name}</strong>
                {session.role === "ADMIN" && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-100 text-amber-800">
                    ADMIN
                  </span>
                )}
              </span>
              {session.role === "ADMIN" && (
                <Link href="/admin">
                  <Button variant="gold" size="sm">
                    <Shield className="w-3.5 h-3.5 mr-1" />
                    Admin Dashboard
                  </Button>
                </Link>
              )}
              <SignOutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openAuthModal("signin")}
                className="cursor-pointer"
              >
                Sign In
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={() => openAuthModal("signup")}
                className="cursor-pointer"
              >
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200/80 bg-white/95 backdrop-blur-xl px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {STOREFRONT_NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-stone-700 hover:text-amber-900 hover:bg-amber-50/70 rounded-xl transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-stone-200/80 flex flex-col gap-2">
            {session ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-600 px-1">
                  <span>
                    Signed in as: <strong>{session.name}</strong>
                  </span>
                  {session.role === "ADMIN" && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-100 text-amber-800">
                      ADMIN
                    </span>
                  )}
                </div>
                {session.role === "ADMIN" && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="gold" size="sm" className="w-full">
                      <Shield className="w-3.5 h-3.5 mr-1" />
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                <SignOutButton className="w-full" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("signin");
                  }}
                  className="w-full cursor-pointer"
                >
                  Sign In
                </Button>
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("signup");
                  }}
                  className="w-full cursor-pointer"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

