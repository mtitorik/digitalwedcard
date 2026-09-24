"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Sparkles,
  Calendar,
  MapPin,
  Palette,
  Eye,
  PlusCircle,
  Compass,
  ArrowRight,
  Filter,
} from "lucide-react";
import { SAMPLE_TEMPLATES, getTemplateBySlug } from "@/data/sampleTemplates";

export interface PublicCard {
  _id: string;
  slug: string;
  templateThemeId?: string;
  groomName: string;
  brideName: string;
  namesFormatted: string;
  monogram: string;
  eventTitle: string;
  eventSubtitle: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueCity: string;
  tagline: string;
  coverImage: string;
  createdAt?: string;
}

export const ExploreTemplatesSection: React.FC = () => {
  const [cards, setCards] = useState<PublicCard[]>(SAMPLE_TEMPLATES as unknown as PublicCard[]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchCards = () => {
      fetch("/api/cards")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.cards && data.cards.length > 0) {
            setCards(data.cards);
          }
        })
        .catch((err) => console.error("Error fetching cards:", err));
    };

    fetchCards();
    window.addEventListener("app:refresh", fetchCards);
    return () => window.removeEventListener("app:refresh", fetchCards);
  }, []);

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "Royal Heritage", name: "Royal Emerald" },
    { id: "Modern Luxury", name: "Midnight Velvet" },
    { id: "Floral & Romantic", name: "Blush Romance" },
    { id: "Celestial & Regal", name: "Sapphire Starlight" },
    { id: "Boho & Earthy", name: "Terracotta Sunset" },
    { id: "Festive Holud", name: "Marigold Festive" },
  ];

  // Helper to look up template theme details
  const getCardTheme = (card: PublicCard) => {
    const matched = getTemplateBySlug(card.slug);
    if (matched) return matched.theme;

    if (card.templateThemeId) {
      const byThemeId = SAMPLE_TEMPLATES.find((t) => t.templateThemeId === card.templateThemeId);
      if (byThemeId) return byThemeId.theme;
    }

    return {
      id: "royal-emerald",
      name: "Royal Emerald & Gold",
      category: "Royal Heritage",
      badgeClass: "bg-emerald-950/90 text-amber-300 border-amber-400/40",
      gradientBg: "from-[#0d4637] via-[#062c22] to-[#031712]",
      envelopeGradient: "from-[#0d4536] via-[#062c22] to-[#031712]",
      accentText: "text-amber-300",
      borderAccent: "border-amber-400/50",
      stampBg: "bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600",
      description: "Timeless royal Bengali wedding with emerald velvet and warm gold foil.",
    };
  };

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const q = searchTerm.toLowerCase();
      const theme = getCardTheme(card);

      const matchesSearch =
        card.namesFormatted.toLowerCase().includes(q) ||
        card.groomName.toLowerCase().includes(q) ||
        card.brideName.toLowerCase().includes(q) ||
        card.venueName.toLowerCase().includes(q) ||
        card.venueCity.toLowerCase().includes(q) ||
        card.eventTitle.toLowerCase().includes(q) ||
        theme.name.toLowerCase().includes(q) ||
        theme.category.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "all" ||
        theme.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [cards, searchTerm, selectedCategory]);

  return (
    <section id="explore" className="py-20 sm:py-28 relative scroll-mt-20 border-t border-amber-400/15">
      {/* Decorative Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-amber-400/5 via-emerald-700/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Explore All Designer Templates</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 tracking-wide drop-shadow-md leading-tight">
            Curated Sample Templates • Bespoke Aesthetic Themes
          </h2>

          <p className="text-xs sm:text-sm text-amber-200/80 mt-3 leading-relaxed max-w-2xl mx-auto">
            Browse our Digitalwedcards sample templates crafted with bespoke color palettes, royal typography,
            3D interactive envelope opening, melodic celebration chimes, and instant RSVP tracking.
            Click <strong>"Live Preview"</strong> to experience any card or <strong>"Use Template"</strong> to make it your own!
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-amber-400/60 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by couple name, venue, theme, or city..."
              className="w-full bg-[#082920]/90 border border-amber-500/30 rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-xl"
            />
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    active
                      ? "bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-900/30 scale-105"
                      : "bg-[#082920]/80 border border-amber-500/20 text-amber-300/80 hover:text-amber-100 hover:border-amber-400/50"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-amber-200">
            <div className="w-10 h-10 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs font-serif uppercase tracking-widest">Loading Sample Templates...</p>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="bg-[#082920]/80 border border-amber-400/20 rounded-3xl p-12 text-center max-w-md mx-auto text-amber-300/70">
            <p className="font-serif text-lg text-amber-200 mb-2">No matching invitations found</p>
            <p className="text-xs mb-4">Try clearing your search term or select "All Templates".</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 text-xs font-bold cursor-pointer hover:brightness-110 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCards.map((card) => {
              const theme = getCardTheme(card);

              const isBlankPixel =
                !card.coverImage ||
                card.coverImage.length < 200 ||
                card.coverImage.includes("iVBORw0KGgo") ||
                card.coverImage.trim() === "";

              const coverSrc = isBlankPixel
                ? card.slug.includes("sajedul") || card.namesFormatted.toLowerCase().includes("sajedul")
                  ? "/images/sajedul-and-sadia.jpg"
                  : "/images/default-couple.jpg"
                : card.coverImage;

              return (
                <div
                  key={card._id || card.slug}
                  className="bg-[#082920]/95 border border-amber-400/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-1.5"
                >
                  {/* Visual Preview Header with Image */}
                  <div className="relative aspect-[16/10] w-full bg-black/40 overflow-hidden">
                    <Image
                      src={coverSrc}
                      alt={card.namesFormatted}
                      fill
                      unoptimized={coverSrc.startsWith("data:")}
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#082920] via-black/30 to-transparent" />

                    {/* Monogram Badge */}
                    <div className="absolute top-3 left-3 w-11 h-11 rounded-full bg-black/60 border border-amber-400/60 backdrop-blur-md flex items-center justify-center font-serif text-xs font-bold text-amber-200 shadow-lg">
                      {card.monogram}
                    </div>

                    {/* Theme Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border shadow-md ${theme.badgeClass}`}
                      >
                        <Palette className="w-3 h-3" />
                        <span>{theme.name}</span>
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] uppercase tracking-widest text-amber-300/80 font-medium">
                        {card.eventSubtitle || card.eventTitle}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 drop-shadow">
                        {card.namesFormatted}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      {/* Theme Description */}
                      <p className="text-[11px] text-amber-300/70 font-sans italic border-l-2 border-amber-500/40 pl-2.5 py-0.5">
                        {theme.description}
                      </p>

                      <div className="flex items-center gap-2 text-xs text-amber-200/90 pt-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>
                          {new Date(card.eventDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          • {card.eventTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-amber-200/90">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">
                          {card.venueName}, {card.venueCity}
                        </span>
                      </div>

                      <p className="text-xs text-stone-300/80 italic font-serif line-clamp-2 pt-1">
                        "{card.tagline}"
                      </p>
                    </div>

                    {/* Action Buttons: Live Preview + Use This Template */}
                    <div className="pt-4 border-t border-amber-500/20 grid grid-cols-2 gap-2.5">
                      <Link
                        href={`/card/${card.slug}`}
                        target="_blank"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#041a14] border border-amber-500/40 text-amber-200 hover:text-amber-100 hover:bg-amber-500/15 transition-all text-xs font-semibold cursor-pointer shadow-sm text-center"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Live Preview</span>
                      </Link>

                      <Link
                        href={`/dashboard?template=${card.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-xs tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-900/30 text-center"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Use Template</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Explore Customization Callout Card */}
        <div className="mt-16 bg-gradient-to-r from-[#0a382c] to-[#082920] border border-amber-400/30 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-amber-300">
            <Palette className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100 mb-3">
            Want to customize your own wedding invitation?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Pick any design template above or start from scratch in your Creator Studio. Every card includes
            real-time RSVP tracking, wishes wall guestbook, personalized countdown, and ceremony chimes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-bold text-sm tracking-wide uppercase shadow-xl hover:brightness-110 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Go to Creator Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
