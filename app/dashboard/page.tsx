"use client";

import React, { useEffect, useState, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  ExternalLink,
  Edit,
  Trash2,
  Users,
  Copy,
  Check,
  LogOut,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Heart,
  Save,
  X,
  Compass,
  Eye,
  CheckCircle2,
  Lock,
  KeyRound,
  ShieldCheck,
  User,
  Settings,
  UploadCloud,
  Palette,
} from "lucide-react";
import { SAMPLE_TEMPLATES, getTemplateBySlug } from "@/data/sampleTemplates";

interface CardItem {
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
  venueAddress: string;
  venueCity: string;
  googleMapsUrl: string;
  dressCodeTitle: string;
  dressCodeDetails: string;
  rsvpDeadline: string;
  phoneContact: string;
  tagline: string;
  hashtag: string;
  coverImage: string;
  isPublic: boolean;
  createdAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface RsvpItem {
  _id: string;
  cardSlug: string;
  name: string;
  phone: string;
  attendance: "attending" | "declined";
  guestCount: number;
  message?: string;
  createdAt: string;
}

const emptyForm = {
  templateThemeId: "royal-emerald",
  groomName: "",
  brideName: "",
  eventTitle: "Grand Wedding Reception",
  eventSubtitle: "Walima Celebration",
  eventDate: "2026-12-29T19:00:00+06:00",
  eventTime: "7:00 PM BST (Evening)",
  venueName: "Phoenix Convention Hall",
  venueAddress: "Tejgaon Industrial Area",
  venueCity: "Dhaka, Bangladesh",
  googleMapsUrl: "",
  dressCodeTitle: "Traditional / Formal",
  dressCodeDetails: "Sherwani, Suit, Lehenga, Sharee",
  rsvpDeadline: "December 20, 2026",
  phoneContact: "+880 1712-345678",
  tagline: "Together with our families, we joyfully invite you to celebrate our wedding.",
  hashtag: "#OurRoyalWedding",
  coverImage: "",
  isPublic: true,
  customSlug: "",
};

export default function UserDashboardPage() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Editor Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [modalError, setModalError] = useState("");

  // RSVPs viewer for selected card
  const [activeCardSlug, setActiveCardSlug] = useState<string | null>(null);
  const [cardRsvps, setCardRsvps] = useState<RsvpItem[]>([]);
  const [loadingRsvps, setLoadingRsvps] = useState(false);

  // Copy URL feedback
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Modal Date, Time & Cover Upload states
  const [selectedDate, setSelectedDate] = useState("2026-12-29");
  const [selectedTime, setSelectedTime] = useState("19:00");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");

  const formatDisplayTime = (timeStr: string): string => {
    if (!timeStr) return "7:00 PM BST (Evening)";
    const [hoursStr, minutesStr] = timeStr.split(":");
    let hours = parseInt(hoursStr, 10);
    const minutes = minutesStr || "00";
    if (isNaN(hours)) return timeStr;

    const ampm = hours >= 12 ? "PM" : "AM";
    let period = "Morning";
    if (hours >= 12 && hours < 17) period = "Afternoon";
    else if (hours >= 17) period = "Evening";

    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm} (${period})`;
  };

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    const combined = `${newDate}T${selectedTime || "19:00"}:00+06:00`;
    setFormData((prev) => ({ ...prev, eventDate: combined }));
  };

  const handleTimeChange = (newTime: string) => {
    setSelectedTime(newTime);
    const display = formatDisplayTime(newTime);
    const combined = `${selectedDate || "2026-12-29"}T${newTime}:00+06:00`;
    setFormData((prev) => ({ ...prev, eventTime: display, eventDate: combined }));
  };

  const processImageFile = (file: File) => {
    setImageUploadError("");
    const validExtensions = ["jpg", "jpeg", "png"];
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const isValid =
      validExtensions.includes(ext) || file.type === "image/jpeg" || file.type === "image/png";

    if (!isValid) {
      setImageUploadError("Unsupported format. Please upload a JPG, JPEG, or PNG image.");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setImageUploadError("Image size exceeds 15MB limit. Please upload a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) return;

      // Optimize image dimensions on canvas to ensure fast load and smooth rendering
      const img = new (window as unknown as { Image: new () => HTMLImageElement }).Image();
      img.onload = () => {
        const maxDim = 1600;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const mime = ext === "png" || file.type === "image/png" ? "image/png" : "image/jpeg";
          const optimized = canvas.toDataURL(mime, 0.88);
          setFormData((prev) => ({ ...prev, coverImage: optimized }));
        } else {
          setFormData((prev) => ({ ...prev, coverImage: rawDataUrl }));
        }
      };
      img.onerror = () => {
        setFormData((prev) => ({ ...prev, coverImage: rawDataUrl }));
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Tab State: "cards" | "settings"
  const [dashboardTab, setDashboardTab] = useState<"cards" | "settings">("cards");

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    setPasswordUpdating(true);

    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPasswordSuccess(data.message || "Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => setPasswordSuccess(""), 5000);
      } else {
        setPasswordError(data.message || "Failed to update password. Please check your current password.");
      }
    } catch {
      setPasswordError("Network error. Please try again.");
    } finally {
      setPasswordUpdating(false);
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [meRes, cardsRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/cards?mine=true"),
      ]);

      if (!meRes.ok) {
        router.push("/login");
        return;
      }

      const meData = await meRes.json();
      if (!meData.authenticated || !meData.user) {
        router.push("/login");
        return;
      }
      setUser(meData.user);

      if (cardsRes.ok) {
        const cData = await cardsRes.json();
        setCards(cData.cards || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const handleGlobalRefresh = () => {
      fetchDashboardData();
    };
    window.addEventListener("app:refresh", handleGlobalRefresh);
    return () => window.removeEventListener("app:refresh", handleGlobalRefresh);
  }, []);

  // Check if directed from Explore page with ?template=[slug]
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const templateSlug = params.get("template");
      if (templateSlug) {
        const found = getTemplateBySlug(templateSlug);
        if (found) {
          setEditingCardId(null);
          setFormData({
            templateThemeId: found.templateThemeId,
            groomName: "",
            brideName: "",
            eventTitle: found.eventTitle,
            eventSubtitle: found.eventSubtitle,
            eventDate: found.eventDate,
            eventTime: found.eventTime,
            venueName: found.venueName,
            venueAddress: found.venueAddress,
            venueCity: found.venueCity,
            googleMapsUrl: found.googleMapsUrl,
            dressCodeTitle: found.dressCodeTitle,
            dressCodeDetails: found.dressCodeDetails,
            rsvpDeadline: found.rsvpDeadline,
            phoneContact: found.phoneContact,
            tagline: found.tagline,
            hashtag: found.hashtag,
            coverImage: found.coverImage,
            isPublic: true,
            customSlug: "",
          });
          const rawDate = found.eventDate ? found.eventDate.slice(0, 10) : "2026-12-29";
          setSelectedDate(rawDate);
          setIsModalOpen(true);
        }
      }
    }
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    startTransition(() => {
      router.push("/login");
    });
  };

  const handleOpenCreateModal = () => {
    setEditingCardId(null);
    setFormData(emptyForm);
    setSelectedDate("2026-12-29");
    setSelectedTime("19:00");
    setImageUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setModalError("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (card: CardItem) => {
    setEditingCardId(card._id);
    const rawDate = card.eventDate ? card.eventDate.slice(0, 10) : "2026-12-29";
    let rawTime = "19:00";
    if (card.eventDate && card.eventDate.includes("T")) {
      rawTime = card.eventDate.split("T")[1].slice(0, 5);
    }
    setSelectedDate(rawDate);
    setSelectedTime(rawTime);
    setImageUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFormData({
      templateThemeId: card.templateThemeId || "royal-emerald",
      groomName: card.groomName,
      brideName: card.brideName,
      eventTitle: card.eventTitle,
      eventSubtitle: card.eventSubtitle,
      eventDate: card.eventDate,
      eventTime: card.eventTime,
      venueName: card.venueName,
      venueAddress: card.venueAddress,
      venueCity: card.venueCity,
      googleMapsUrl: card.googleMapsUrl,
      dressCodeTitle: card.dressCodeTitle || "Traditional / Formal",
      dressCodeDetails: card.dressCodeDetails || "Sherwani, Suit, Lehenga, Sharee",
      rsvpDeadline: card.rsvpDeadline || "December 20, 2026",
      phoneContact: card.phoneContact || "+880 1712-345678",
      tagline: card.tagline,
      hashtag: card.hashtag,
      coverImage: card.coverImage,
      isPublic: card.isPublic,
      customSlug: card.slug,
    });
    setModalError("");
    setIsModalOpen(true);
  };

  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setModalError("");

    try {
      if (editingCardId) {
        // Find card slug
        const target = cards.find((c) => c._id === editingCardId);
        if (!target) return;

        const res = await fetch(`/api/cards/${target.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setIsModalOpen(false);
          fetchDashboardData();
        } else {
          setModalError(data.message || "Failed to update invitation card.");
        }
      } else {
        // Create new
        const res = await fetch("/api/cards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setIsModalOpen(false);
          fetchDashboardData();
        } else {
          setModalError(data.message || "Failed to create invitation card.");
        }
      }
    } catch {
      setModalError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCard = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this wedding invitation card?")) return;

    try {
      const res = await fetch(`/api/cards/${slug}`, { method: "DELETE" });
      if (res.ok) {
        fetchDashboardData();
        if (activeCardSlug === slug) {
          setActiveCardSlug(null);
        }
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/card/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const handleViewRsvps = async (slug: string) => {
    if (activeCardSlug === slug) {
      setActiveCardSlug(null);
      return;
    }
    setActiveCardSlug(slug);
    setLoadingRsvps(true);
    try {
      const res = await fetch(`/api/admin/rsvps?cardSlug=${slug}`);
      if (res.ok) {
        const data = await res.json();
        setCardRsvps(data.rsvps || []);
      }
    } catch {
      // Fallback
    } finally {
      setLoadingRsvps(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#041a14] flex flex-col items-center justify-center text-amber-200">
        <div className="w-12 h-12 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif tracking-widest text-sm uppercase">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#041a14] bg-radial-[at_top] from-[#0a382c] via-[#041a14] to-[#020d0a] text-amber-100/90 selection:bg-amber-500/30 pb-24">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#082920]/95 border-b border-amber-400/20 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#124b3c] to-[#082820] border border-amber-400/50 flex items-center justify-center font-serif text-amber-200 font-bold text-sm shadow-md ring-2 ring-amber-500/20">
                W
              </div>
            </Link>
            <div>
              <h1 className="font-serif font-bold text-base sm:text-lg text-amber-100 leading-tight">
                {user?.name}'s Studio
              </h1>
              <p className="text-[10px] sm:text-xs text-amber-400/70 tracking-widest uppercase">
                Creator Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs hover:bg-amber-500/25 transition-all font-medium shadow-sm"
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Explore Templates</span>
              <span className="sm:hidden">Templates</span>
            </Link>

            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-200 text-xs hover:bg-red-900/60 transition-colors"
              >
                <span>Admin Panel</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-200 text-xs hover:bg-red-900/60 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-amber-500/20 pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setDashboardTab("cards")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              dashboardTab === "cards"
                ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-semibold shadow-md shadow-amber-900/30"
                : "text-amber-200/70 hover:text-amber-100 hover:bg-amber-500/10"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>My Wedding Cards</span>
            <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-black/20 font-mono">
              {cards.length}
            </span>
          </button>

          <button
            onClick={() => setDashboardTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              dashboardTab === "settings"
                ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-semibold shadow-md shadow-amber-900/30"
                : "text-amber-200/70 hover:text-amber-100 hover:bg-amber-500/10"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Account & Password Settings</span>
          </button>
        </div>

        {dashboardTab === "cards" && (
          <>
            {/* Hero Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-500/20 mb-8">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                  Your Digital Wedding Invitations
                </h2>
                <p className="text-xs sm:text-sm text-amber-300/70 mt-1">
                  Create, design, customize, and share royal mobile-first digital wedding invitation cards.
                </p>
              </div>

              <button
                onClick={handleOpenCreateModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-900/30 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Card</span>
              </button>
            </div>

            {/* Cards Grid */}
            {cards.length === 0 ? (
              <div className="bg-[#082920]/80 border border-amber-400/20 rounded-3xl p-10 sm:p-16 text-center max-w-2xl mx-auto shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-4 text-amber-300">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-amber-100 mb-2">No Wedding Cards Created Yet</h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mb-6 leading-relaxed">
                  Design a royal wedding card complete with 3D envelope fold, acoustic music, live countdown, and instant RSVP tracking.
                </p>
                <button
                  onClick={handleOpenCreateModal}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 font-semibold text-sm shadow-xl hover:brightness-110 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Design Your First Card</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => {
              const isBlankPixel =
                !card.coverImage ||
                card.coverImage.length < 200 ||
                card.coverImage.includes("iVBORw0KGgo") ||
                card.coverImage.trim() === "";

              const coverSrc = isBlankPixel
                ? (card.slug.includes("sajedul") || card.namesFormatted.toLowerCase().includes("sajedul")
                    ? "/images/sajedul-and-sadia.jpg"
                    : "/images/default-couple.jpg")
                : card.coverImage;

              return (
              <div
                key={card._id}
                className="bg-[#082920]/95 border border-amber-400/30 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-amber-400/60 transition-all"
              >
                {/* Image Cover */}
                <div className="relative aspect-[16/9] w-full bg-black/40 overflow-hidden">
                  <Image
                    src={coverSrc}
                    alt={card.namesFormatted}
                    fill
                    unoptimized={coverSrc.startsWith("data:")}
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082920] via-black/30 to-transparent" />

                  {/* Monogram Badge */}
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-emerald-950/80 border border-amber-400/50 backdrop-blur-sm flex items-center justify-center font-serif text-xs font-bold text-amber-200">
                    {card.monogram}
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md ${
                        card.isPublic
                          ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                          : "bg-black/60 text-stone-300 border border-white/20"
                      }`}
                    >
                      {card.isPublic ? "Public in Explore" : "Private Link"}
                    </span>
                    {card.templateThemeId && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold backdrop-blur-md bg-black/75 text-amber-300 border border-amber-400/40 shadow-sm">
                        {SAMPLE_TEMPLATES.find((t) => t.templateThemeId === card.templateThemeId)?.theme.name || "Custom Theme"}
                      </span>
                    )}
                  </div>

                  {/* Title over image */}
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-serif text-xl font-bold text-amber-100 drop-shadow">
                      {card.namesFormatted}
                    </h3>
                    <p className="text-xs text-amber-300/80 font-serif italic">
                      {card.groomName} & {card.brideName}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3 flex-1">
                  <div className="flex items-center gap-2 text-xs text-amber-200/90">
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

                  <div className="p-2.5 rounded-xl bg-black/30 border border-amber-500/20 flex items-center justify-between text-xs">
                    <span className="text-amber-400/70 font-mono text-[11px] truncate max-w-[200px]">
                      /card/{card.slug}
                    </span>
                    <button
                      onClick={() => handleCopyLink(card.slug)}
                      className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-100 text-[11px] font-medium"
                      title="Copy Shareable Link"
                    >
                      {copiedSlug === card.slug ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-4 bg-[#041a14]/90 border-t border-amber-500/20 flex items-center justify-between gap-2">
                  <Link
                    href={`/card/${card.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 hover:bg-amber-500/20 text-xs font-medium transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Card</span>
                  </Link>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleViewRsvps(card.slug)}
                      className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60 transition-colors"
                      title="View RSVPs for this card"
                    >
                      <Users className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleOpenEditModal(card)}
                      className="p-2 rounded-xl bg-[#082920] border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 transition-colors"
                      title="Edit Card Details"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteCard(card.slug)}
                      className="p-2 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300 hover:bg-red-900/60 transition-colors"
                      title="Delete Card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expanded RSVPs section for this card */}
                {activeCardSlug === card.slug && (
                  <div className="p-4 bg-[#020d0a] border-t border-amber-500/30 text-xs space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between pb-2 border-b border-amber-500/10">
                      <span className="font-semibold text-amber-200">
                        RSVP Responses ({cardRsvps.length})
                      </span>
                      <button
                        onClick={() => setActiveCardSlug(null)}
                        className="text-amber-400/60 hover:text-amber-200"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {loadingRsvps ? (
                      <p className="text-amber-400/60 text-center py-4">Loading RSVPs...</p>
                    ) : cardRsvps.length === 0 ? (
                      <p className="text-amber-400/60 text-center py-3 italic">
                        No RSVPs submitted for this card yet.
                      </p>
                    ) : (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {cardRsvps.map((rsvp) => (
                          <div
                            key={rsvp._id}
                            className="p-2.5 rounded-lg bg-black/40 border border-amber-500/20 flex items-center justify-between"
                          >
                            <div>
                              <p className="font-semibold text-amber-100">{rsvp.name}</p>
                              <p className="text-[10px] text-amber-400/70">{rsvp.phone}</p>
                            </div>
                            <div className="text-right">
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                  rsvp.attendance === "attending"
                                    ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                                    : "bg-red-950 text-red-300 border border-red-500/30"
                                }`}
                              >
                                {rsvp.attendance === "attending"
                                  ? `${rsvp.guestCount} Attending`
                                  : "Declined"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          </div>
        )}
      </>
    )}

    {/* SETTINGS TAB */}
    {dashboardTab === "settings" && (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
        {/* Account Details Card */}
        <div className="bg-[#082920]/95 border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-3 pb-4 mb-6 border-b border-amber-500/20">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border border-amber-400/40 flex items-center justify-center text-amber-300 font-serif font-bold text-lg shadow">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-amber-100">{user?.name}</h3>
              <p className="text-xs text-amber-400/70 font-mono">{user?.email}</p>
            </div>
            <div className="ml-auto">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  user?.role === "admin"
                    ? "bg-red-950 text-red-300 border border-red-500/40"
                    : "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                }`}
              >
                {user?.role.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#041a14] border border-amber-500/20">
              <span className="text-amber-400/60 block mb-1">Created Cards</span>
              <span className="font-serif text-xl font-bold text-amber-200">{cards.length}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#041a14] border border-amber-500/20">
              <span className="text-amber-400/60 block mb-1">Studio Status</span>
              <span className="font-semibold text-emerald-300 flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active Creator
              </span>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-[#082920]/95 border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-amber-500/20 text-amber-200">
            <KeyRound className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif text-xl font-bold">Change Password</h3>
          </div>

          {passwordSuccess && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{passwordSuccess}</span>
            </div>
          )}

          {passwordError && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs animate-shake">
              {passwordError}
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                Current Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl pl-10 pr-4 py-2.5 text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={passwordUpdating}
                className="w-full py-3 px-6 rounded-xl font-medium tracking-wide text-xs bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-semibold hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {passwordUpdating ? (
                  <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </main>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#082920] border-2 border-amber-400/40 rounded-3xl shadow-2xl p-6 sm:p-8 my-8 text-amber-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-amber-300/70 hover:text-amber-100 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 pb-4 border-b border-amber-500/20">
              <h3 className="font-serif text-2xl font-bold text-amber-200">
                {editingCardId ? "Edit Digital Wedding Card" : "Create New Digital Wedding Card"}
              </h3>
              <p className="text-xs text-amber-400/70 mt-1">
                Customize every detail of your royal digital invitation.
              </p>
            </div>

            {modalError && (
              <div className="mb-6 p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSaveCard} className="space-y-4">
              {/* Template Style Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                    <span>Choose Card Design Template</span>
                  </span>
                  <span className="text-[10px] text-amber-400/70 font-normal">
                    6 Bespoke Themes
                  </span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SAMPLE_TEMPLATES.map((tmpl) => {
                    const isSelected =
                      (formData.templateThemeId || "royal-emerald") === tmpl.templateThemeId;
                    return (
                      <button
                        key={tmpl.templateThemeId}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            templateThemeId: tmpl.templateThemeId,
                            coverImage: prev.coverImage || tmpl.coverImage,
                          }));
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? "bg-amber-400/20 border-amber-400 shadow-md ring-1 ring-amber-400/80"
                            : "bg-[#041a14]/80 border-amber-500/20 hover:border-amber-400/50 hover:bg-amber-500/10"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold border ${tmpl.theme.badgeClass}`}
                          >
                            {tmpl.theme.category}
                          </span>
                          {isSelected && <Check className="w-3 h-3 text-amber-400 shrink-0" />}
                        </div>
                        <p className="text-xs font-medium text-amber-100 font-serif leading-tight">
                          {tmpl.theme.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Couple Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                    Groom's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.groomName}
                    onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                    placeholder="e.g. Mohammad Sajedul Islam"
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                    Bride's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brideName}
                    onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                    placeholder="e.g. Sadia"
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Event Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={formData.eventTitle}
                    onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                    placeholder="Grand Wedding Reception"
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                    Event Subtitle / Occasion
                  </label>
                  <input
                    type="text"
                    value={formData.eventSubtitle}
                    onChange={(e) => setFormData({ ...formData, eventSubtitle: e.target.value })}
                    placeholder="Walima Celebration"
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Date & Time Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Wedding Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-400 [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Reception Time *</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={selectedTime}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-400 [color-scheme:dark]"
                  />
                  <p className="text-[11px] text-amber-400/60 mt-1 truncate">
                    Display: {formData.eventTime}
                  </p>
                </div>
              </div>

              {/* Venue Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={formData.venueName}
                    onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
                    placeholder="Phoenix Convention Hall"
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                    City / Location
                  </label>
                  <input
                    type="text"
                    value={formData.venueCity}
                    onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
                    placeholder="Dhaka - 1208, Bangladesh"
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Venue Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                  Detailed Address
                </label>
                <input
                  type="text"
                  value={formData.venueAddress}
                  onChange={(e) => setFormData({ ...formData, venueAddress: e.target.value })}
                  placeholder="Tejgaon Industrial Area, Shahid Tajuddin Ahmed Sarani"
                  className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Cover Photo Upload Box (JPG, JPEG, PNG) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5 flex items-center justify-between">
                  <span>Cover Photo (Picture Upload)</span>
                  <span className="text-[10px] text-amber-400/70 font-normal lowercase">
                    Supported: .jpg, .jpeg, .png
                  </span>
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  onChange={(e) => {
                    if (e.target.files?.[0]) processImageFile(e.target.files[0]);
                  }}
                  className="hidden"
                />

                {/* Upload Dropzone Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files?.[0]) processImageFile(e.dataTransfer.files[0]);
                  }}
                  className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-amber-400 bg-amber-500/10 scale-[1.01]"
                      : "border-amber-500/30 hover:border-amber-400/70 bg-[#041a14]/60"
                  }`}
                >
                  {formData.coverImage ? (
                    <div className="space-y-3">
                      <div className="relative aspect-[16/9] max-h-48 w-full mx-auto rounded-xl overflow-hidden border border-amber-400/40 shadow-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={formData.coverImage}
                          alt="Cover preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/25 hover:bg-black/10 transition-colors" />
                      </div>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-xs text-amber-200 bg-amber-500/20 border border-amber-400/30 px-3 py-1 rounded-full font-medium">
                          Photo Selected
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            fileInputRef.current?.click();
                          }}
                          className="text-xs text-amber-300 hover:text-amber-100 underline px-2 py-1 cursor-pointer"
                        >
                          Change Photo
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData((prev) => ({ ...prev, coverImage: "" }));
                            if (fileInputRef.current) fileInputRef.current.value = "";
                          }}
                          className="text-xs text-red-300 hover:text-red-100 underline px-2 py-1 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 space-y-2">
                      <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-300">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-200">
                          Click to upload or drag & drop photo
                        </p>
                        <p className="text-xs text-amber-400/60 mt-0.5">
                          Supported file formats: <strong>JPG, JPEG, PNG</strong>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {imageUploadError && (
                  <p className="text-xs text-red-300 mt-1.5 animate-shake">{imageUploadError}</p>
                )}
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                  Invitation Tagline / Message
                </label>
                <textarea
                  rows={2}
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Together with our loving families, we cordially invite you..."
                  className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Contact Phone & RSVP Deadline (Dress Code removed as requested) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                    Contact Phone (+880)
                  </label>
                  <input
                    type="text"
                    value={formData.phoneContact}
                    onChange={(e) => setFormData({ ...formData, phoneContact: e.target.value })}
                    placeholder="+880 1712-345678"
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 font-mono text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-1.5">
                    RSVP Deadline
                  </label>
                  <input
                    type="text"
                    value={formData.rsvpDeadline}
                    onChange={(e) => setFormData({ ...formData, rsvpDeadline: e.target.value })}
                    placeholder="December 20, 2026"
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-2.5 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Public Showcase Switch */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isPublicCheck"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="w-4 h-4 rounded border-amber-400 text-amber-500 focus:ring-amber-400"
                />
                <label htmlFor="isPublicCheck" className="text-xs text-amber-200 cursor-pointer">
                  Feature this invitation card in the public <strong>Explore Showcase</strong> gallery
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-amber-500/30 text-xs text-amber-300 hover:bg-amber-500/10 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-serif font-semibold text-xs tracking-wide hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingCardId ? "Update Invitation Card" : "Publish Digital Card"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
