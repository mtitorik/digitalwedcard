"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Compass, PlusCircle, LayoutDashboard, Shield, LogIn, User } from "lucide-react";

export const TopNavbar: React.FC = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl bg-[#06281e]/65 border border-amber-400/40 backdrop-blur-[28px] backdrop-saturate-150 rounded-full px-4 py-2 shadow-2xl shadow-black/60 flex items-center justify-between text-xs transition-all">
      <Link
        href="/"
        className="flex items-center gap-2 text-amber-200 hover:text-amber-100 font-serif font-bold text-sm tracking-wide group"
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-b from-[#124b3c] to-[#082820] border border-amber-400/50 flex items-center justify-center p-1 shadow group-hover:scale-105 transition-transform overflow-hidden">
          <Image
            src="/images/logo.png"
            alt="Digitalwedcards Logo"
            width={24}
            height={20}
            className="object-contain w-auto h-auto max-h-5"
          />
        </div>
        <span className="inline tracking-tight font-serif text-amber-100">Digitalwedcards</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4 font-medium">
        <Link
          href="/explore"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-amber-200/90 hover:text-amber-100 hover:bg-amber-400/10 transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Explore</span>
        </Link>

        {user ? (
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-200 hover:bg-amber-400/25 transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Dashboard</span>
            <span className="sm:hidden">My Cards</span>
          </Link>
        ) : (
          <Link
            href="/signup"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-semibold shadow hover:brightness-110 active:scale-95 transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Card</span>
          </Link>
        )}

        {user ? (
          user.role === "admin" ? (
            <Link
              href="/admin"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-200 text-[11px]"
              title="Admin Portal"
            >
              <Shield className="w-3 h-3 text-red-400" />
              <span>Admin</span>
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="flex items-center gap-1 text-[11px] text-amber-300/80 hover:text-amber-200"
            >
              <User className="w-3 h-3 text-amber-400" />
              <span className="max-w-[80px] truncate">{user.name.split(" ")[0]}</span>
            </Link>
          )
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-amber-200/80 hover:text-amber-100 transition-colors px-2 py-1"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </nav>
  );
};
