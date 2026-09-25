"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TEMPLATE_MANIFEST } from "@/data";
import { MOCK_INVITE_DATA } from "@/data/mockInviteData";
import { WeddingCardRenderer } from "@/templates";
import {
  Search,
  Sparkles,
  Smartphone,
  X,
  ChevronLeft,
  ChevronRight,
  Palette,
  ExternalLink,
  RotateCcw,
  Compass,
  ArrowRight,
} from "lucide-react";

export default function TemplateCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [modalResetKey, setModalResetKey] = useState<number>(0);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Set document title
  useEffect(() => {
    document.title = "Wedding Invitation Template Catalog | Digitalwedcards";
  }, []);

  // Keyboard navigation for modal (Esc to close, Left/Right arrows to cycle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeModalId) return;

      if (e.key === "Escape") {
        setActiveModalId(null);
      } else if (e.key === "ArrowLeft") {
        cycleTemplate(-1);
      } else if (e.key === "ArrowRight") {
        cycleTemplate(1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalId]);

  const categories = useMemo(() => {
    const counts: Record<string, number> = { All: TEMPLATE_MANIFEST.length };
    TEMPLATE_MANIFEST.forEach((t) => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });

    const order = ["All", "Traditional", "Floral", "Modern", "Minimal", "Nikah"];
    return order.map((cat) => ({
      id: cat,
      name: cat,
      count: counts[cat] || 0,
    }));
  }, []);

  const filteredTemplates = useMemo(() => {
    return TEMPLATE_MANIFEST.filter((t) => {
      const matchesCategory =
        selectedCategory === "All" ||
        t.category.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        t.title.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.keyMotifs.some((m) => m.toLowerCase().includes(q)) ||
        Object.values(t.palette).some((c) => c.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const cycleTemplate = (direction: number) => {
    if (!activeModalId) return;
    const currentIndex = TEMPLATE_MANIFEST.findIndex((t) => t.id === activeModalId);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = TEMPLATE_MANIFEST.length - 1;
    if (nextIndex >= TEMPLATE_MANIFEST.length) nextIndex = 0;

    setActiveModalId(TEMPLATE_MANIFEST[nextIndex].id);
    setModalResetKey(0);
  };

  const currentModalTemplate = useMemo(() => {
    return TEMPLATE_MANIFEST.find((t) => t.id === activeModalId) || null;
  }, [activeModalId]);

  return (
    <div className="min-h-screen bg-[#041a14] bg-radial-[at_top] from-[#0a382c] via-[#041a14] to-[#020d0a] text-amber-100/90 selection:bg-amber-500/30 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#082920]/80 border-b border-amber-400/30 backdrop-blur-xl shadow-xl shadow-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#124b3c] to-[#082820] border border-amber-400/50 flex items-center justify-center p-1.5 shadow-md ring-2 ring-amber-500/20 group-hover:scale-105 transition-transform overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Digitalwedcards Logo"
                  width={36}
                  height={28}
                  className="object-contain w-auto h-auto max-h-7 drop-shadow"
                  priority
                />
              </div>
              <div>
                <span className="font-serif font-bold text-base sm:text-lg text-amber-100 leading-tight block">
                  Digitalwedcards
                </span>
                <span className="text-[10px] sm:text-xs text-amber-400/70 tracking-widest uppercase block">
                  Designer Template Showcase
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-200 hover:bg-amber-400/20 transition-all font-medium"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Explore Cards</span>
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-xs tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-900/30"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Invitation</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-24 flex-1">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>20 Complete Wedding E-Invitation Templates</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 tracking-wide drop-shadow-md leading-tight">
            Curated Designer Invitation Suite
          </h1>

          <p className="text-xs sm:text-sm text-amber-300/80 mt-3 leading-relaxed max-w-2xl mx-auto">
            Discover all 20 meticulously engineered digital wedding invitation themes. Fully responsive
            across desktop, tablet, and mobile devices with cultural motifs, countdown timers, calendar sync,
            and interactive envelope unsealing.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-amber-400/60 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by theme, motif, category, or hex..."
              className="w-full bg-[#082920]/90 border border-amber-500/30 rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {categories.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.id.toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? "bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-900/30 scale-105"
                      : "bg-[#082920]/80 border border-amber-500/20 text-amber-300/80 hover:text-amber-100 hover:border-amber-400/50"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active
                        ? "bg-emerald-950/20 text-emerald-950"
                        : "bg-amber-400/10 text-amber-300/60"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results count label */}
          <div className="mt-4 text-[11px] text-amber-300/60 font-mono tracking-wider">
            SHOWING {filteredTemplates.length} OF {TEMPLATE_MANIFEST.length} TEMPLATES
          </div>
        </div>

        {/* Template Cards Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="bg-[#082920]/80 border border-amber-400/20 rounded-3xl p-12 text-center max-w-md mx-auto text-amber-300/70">
            <p className="font-serif text-lg text-amber-200 mb-2">No matching templates found</p>
            <p className="text-xs mb-4">Try clearing your search term or select another category filter.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 text-xs font-bold cursor-pointer hover:bg-amber-300 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            {filteredTemplates.map((template) => {
              const num = template.id.replace("template-", "");
              const p = template.palette;

              return (
                <div
                  key={template.id}
                  className="bg-[#082920]/90 border border-amber-400/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Top Preview Frame (CSS Mockup of Card) */}
                  <div
                    className="relative aspect-[4/3] w-full p-4 flex flex-col justify-between overflow-hidden border-b border-amber-500/20 cursor-pointer"
                    onClick={() => {
                      if (typeof window !== "undefined" && window.innerWidth < 768) {
                        window.open(`/templates/${template.id}`, "_blank");
                      } else {
                        setActiveModalId(template.id);
                      }
                    }}
                    style={{
                      backgroundColor: p.background,
                      color: p.text,
                    }}
                  >
                    {/* Background motif accent */}
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(${p.primary} 1.5px, transparent 1.5px)`,
                        backgroundSize: "16px 16px",
                      }}
                    />

                    {/* Frame Header */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-xs border"
                        style={{
                          backgroundColor: `${p.primary}18`,
                          color: p.primary,
                          borderColor: `${p.primary}40`,
                        }}
                      >
                        {template.category}
                      </span>
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${p.secondary}25`,
                          color: p.primary,
                        }}
                      >
                        #{num}
                      </span>
                    </div>

                    {/* Center Typography Preview */}
                    <div className="relative z-10 text-center my-auto space-y-1">
                      <div
                        className="w-9 h-9 mx-auto rounded-full flex items-center justify-center font-serif text-xs font-bold border shadow-xs"
                        style={{
                          backgroundColor: p.background,
                          color: p.primary,
                          borderColor: p.secondary,
                        }}
                      >
                        R&T
                      </div>
                      <h4
                        className="font-serif text-lg font-bold leading-tight drop-shadow-xs"
                        style={{ color: p.primary }}
                      >
                        Rayhan & Tahmina
                      </h4>
                      <p
                        className="text-[10px] font-mono tracking-widest uppercase opacity-80"
                        style={{ color: p.text }}
                      >
                        Nov 28, 2026
                      </p>
                    </div>

                    {/* Hover Overlay with Preview Prompt */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white z-20">
                      <div className="w-12 h-12 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                        <Smartphone className="w-6 h-6 hidden md:block" />
                        <ExternalLink className="w-6 h-6 md:hidden" />
                      </div>
                      <span className="text-xs font-bold tracking-wider uppercase text-amber-300">
                        <span className="hidden md:inline">Mobile View Mockup</span>
                        <span className="md:hidden">View Full Template</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      {/* Title & E-Weds reference */}
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-base font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                            {template.title}
                          </h3>
                        </div>
                        <p className="text-[11px] text-amber-300/60 font-mono">
                          ID: {template.id}
                        </p>
                      </div>

                      {/* Color Palette Swatches */}
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-amber-300/80 mb-1.5 font-medium">
                          <span className="flex items-center gap-1">
                            <Palette className="w-3 h-3 text-amber-400" />
                            <span>Color Palette</span>
                          </span>
                          {copiedHex && (
                            <span className="text-[10px] text-emerald-400 font-mono">
                              Copied {copiedHex}!
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { label: "Primary", hex: p.primary },
                            { label: "Secondary", hex: p.secondary },
                            { label: "Background", hex: p.background },
                            { label: "Text", hex: p.text },
                          ].map((swatch) => (
                            <button
                              type="button"
                              key={swatch.label}
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(swatch.hex);
                              }}
                              title={`${swatch.label}: ${swatch.hex} (Click to copy)`}
                              className="group/swatch relative flex flex-col items-center p-1 rounded-xl bg-black/40 border border-amber-500/20 hover:border-amber-400 transition"
                            >
                              <div
                                className="w-full h-5 rounded-lg border border-black/30 shadow-inner"
                                style={{ backgroundColor: swatch.hex }}
                              />
                              <span className="text-[9px] font-mono text-amber-200/80 uppercase mt-1 truncate max-w-full">
                                {swatch.hex}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Key Motifs Tags */}
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-amber-400/70 font-semibold block mb-1">
                          Signature Motifs
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {template.keyMotifs.slice(0, 3).map((motif, mi) => (
                            <span
                              key={mi}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-200/90 border border-amber-400/20 line-clamp-1"
                            >
                              {motif}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: "Mobile View" on Desktop, "Full Page" on both */}
                    <div className="pt-3 border-t border-amber-500/20 flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalId(template.id)}
                        className="hidden md:inline-flex flex-1 items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#041a14] border border-amber-500/40 text-amber-200 hover:text-amber-100 hover:bg-amber-500/20 transition-all text-xs font-semibold cursor-pointer shadow-xs text-center"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Mobile View</span>
                      </button>

                      <Link
                        href={`/templates/${template.id}`}
                        target="_blank"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-xs tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-900/30 text-center"
                      >
                        <span>Full Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#0a382c] to-[#082920] border border-amber-400/30 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-amber-300">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mb-3">
            Ready to Create Your Own Digital Wedding Card?
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto mb-6 leading-relaxed">
            All 20 templates come fully responsive with real-time RSVP management, personalized countdown clocks,
            interactive calendar invitations, and Google Maps directions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-semibold text-sm shadow-xl hover:brightness-110 transition-all font-serif font-bold tracking-wide"
            >
              <span>Open Creator Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Interactive Mobile Screen Mockup Modal */}
      {activeModalId && currentModalTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          {/* Outer Click Backdrop */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setActiveModalId(null)}
          />

          {/* DESKTOP SIMULATED SMARTPHONE MODAL (>= md only) */}
          <div className="hidden md:flex relative z-10 flex-col items-center max-h-[96vh] w-full max-w-lg p-4">
            {/* Top Control Header Toolbar */}
            <div className="w-full flex items-center justify-between bg-stone-900/90 border border-stone-800 rounded-2xl px-4 py-2.5 mb-3 text-white shadow-xl backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {currentModalTemplate.id.toUpperCase()}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-serif font-semibold text-stone-200 truncate max-w-[140px] sm:max-w-[200px]">
                  {currentModalTemplate.title}
                </span>
              </div>

              {/* Prev / Next / Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => cycleTemplate(-1)}
                  title="Previous template (Arrow Left)"
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => cycleTemplate(1)}
                  title="Next template (Arrow Right)"
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setModalResetKey((k) => k + 1)}
                  title="Re-seal envelope animation"
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <Link
                  href={`/templates/${currentModalTemplate.id}`}
                  target="_blank"
                  title="Open in full standalone page"
                  className="p-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 transition cursor-pointer border border-amber-400/30"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setActiveModalId(null)}
                  title="Close preview (Esc)"
                  className="p-1.5 rounded-lg bg-stone-800 hover:bg-red-900/60 hover:text-red-300 text-stone-300 transition cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Realistic Apple iPhone Pro Hardware Frame (Desktop Viewport) */}
            <div className="relative my-auto">
              {/* Hardware Button Accents - Left Edge */}
              {/* Action Button */}
              <div className="w-1 h-7 bg-neutral-700 absolute -left-[5px] top-28 rounded-l-sm" />
              {/* Volume Up */}
              <div className="w-1 h-12 bg-neutral-700 absolute -left-[5px] top-40 rounded-l-sm" />
              {/* Volume Down */}
              <div className="w-1 h-12 bg-neutral-700 absolute -left-[5px] top-56 rounded-l-sm" />

              {/* Hardware Button Accents - Right Edge */}
              {/* Power / Lock Button */}
              <div className="w-1 h-16 bg-neutral-700 absolute -right-[5px] top-36 rounded-r-sm" />
              {/* Camera Control capacitive indent */}
              <div className="w-1 h-14 bg-neutral-800 absolute -right-[5px] bottom-36 rounded-r-sm" />

              {/* Main Titanium Chassis Shell */}
              <div className="relative w-[390px] sm:w-[402px] h-[830px] max-h-[88vh] aspect-[9/19.5] p-[10px] rounded-[56px] bg-neutral-900 ring-1 ring-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden">
                {/* Top Speaker Micro-Slit */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-neutral-800 rounded-full z-40 pointer-events-none" />

                {/* Inner Display Viewport */}
                <div
                  className="rounded-[46px] border-[3px] border-black overflow-hidden relative w-full h-full flex flex-col shadow-inner"
                  style={{ backgroundColor: currentModalTemplate.palette.background }}
                >
                  {/* Floating Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-[110px] h-[30px] bg-black rounded-full flex items-center justify-between px-3 shadow-md">
                    {/* Left camera circle */}
                    <div className="w-3 h-3 rounded-full bg-[#0a0a0a] ring-1 ring-[#1a1a1a]" />
                    {/* Right sensor dot */}
                    <div className="w-2 h-2 rounded-full bg-[#0d0d0d]" />
                  </div>

                  {/* iOS Status Bar Header (Dedicated non-scrollable header area) */}
                  <div
                    className="h-12 w-full shrink-0 flex items-center justify-between px-7 text-xs font-semibold select-none z-40 pointer-events-none transition-colors duration-300"
                    style={{
                      backgroundColor: currentModalTemplate.palette.background,
                      color: currentModalTemplate.palette.text,
                    }}
                  >
                    <span className="font-semibold text-xs tracking-tight">9:41</span>
                    <div className="flex items-center gap-1.5 opacity-85">
                      {/* Cellular signal */}
                      <svg className="w-4 h-3" viewBox="0 0 17 12" fill="currentColor">
                        <rect x="0" y="9" width="3" height="3" rx="0.5" />
                        <rect x="4.5" y="6" width="3" height="6" rx="0.5" />
                        <rect x="9" y="3" width="3" height="9" rx="0.5" />
                        <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
                      </svg>
                      {/* Wi-Fi */}
                      <svg className="w-3.5 h-3" viewBox="0 0 16 12" fill="currentColor">
                        <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM2.8 6.2a7.3 7.3 0 0110.4 0 .8.8 0 001.1-1.1 8.9 8.9 0 00-12.6 0 .8.8 0 001.1 1.1zm2.4 2.4a3.9 3.9 0 015.6 0 .8.8 0 001.1-1.1 5.5 5.5 0 00-7.8 0 .8.8 0 001.1 1.1z" />
                      </svg>
                      {/* Battery */}
                      <div className="flex items-center gap-0.5">
                        <div className="w-5 h-2.5 rounded-[4px] border border-current p-0.5 flex items-center">
                          <div className="h-full w-full bg-current rounded-[2px]" />
                        </div>
                        <div className="w-0.5 h-1 bg-current rounded-r-xs" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content Container */}
                  <div
                    className="flex-1 w-full h-full overflow-hidden relative"
                    style={{ backgroundColor: currentModalTemplate.palette.background }}
                  >
                    <iframe
                      key={`${activeModalId}-${modalResetKey}`}
                      src={`/templates/${currentModalTemplate.id}?mockup=true&t=${modalResetKey}`}
                      className="w-full h-full border-0 bg-transparent scrollbar-none"
                      title={`${currentModalTemplate.title} Mobile Preview`}
                    />
                  </div>

                  {/* Home Indicator Bar */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-[4.5px] bg-black/40 dark:bg-white/40 rounded-full pointer-events-none z-50" />
                </div>
              </div>
            </div>
          </div>

          {/* NATIVE MOBILE VIEWPORT MODAL (< md) — Zero simulated phone bezel, native full screen */}
          <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-stone-950 text-white w-full h-full overflow-hidden">
            {/* Mobile Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-stone-900/95 border-b border-stone-800 z-40 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {currentModalTemplate.id.toUpperCase()}
                </span>
                <span className="text-xs font-serif font-semibold text-stone-200 truncate max-w-[150px]">
                  {currentModalTemplate.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalResetKey((k) => k + 1)}
                  title="Re-seal envelope animation"
                  className="p-1.5 rounded-lg bg-stone-800 text-stone-300"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <Link
                  href={`/templates/${currentModalTemplate.id}`}
                  target="_blank"
                  className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setActiveModalId(null)}
                  className="p-1.5 rounded-lg bg-stone-800 text-stone-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Native Full-Screen Viewport without simulated notch or bezel */}
            <div className="flex-1 w-full h-full overflow-hidden relative">
              <WeddingCardRenderer
                key={`mob-${activeModalId}-${modalResetKey}`}
                templateId={activeModalId}
                data={MOCK_INVITE_DATA}
                className="w-full h-full flex-1"
                isEnvelopeOpenDefault={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
