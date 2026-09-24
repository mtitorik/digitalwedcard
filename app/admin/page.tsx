"use client";

import { useEffect, useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  UserCheck,
  UserX,
  Sparkles,
  LogOut,
  ExternalLink,
  Download,
  Search,
  Trash2,
  RefreshCw,
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  Phone,
  Calendar,
  MapPin,
  Shield,
  UserCog,
  Layers,
  Edit,
  X,
  Compass,
  LayoutDashboard,
  Radio,
  Globe,
  TrendingUp,
  Activity,
  Heart,
} from "lucide-react";

interface RsvpItem {
  _id: string;
  cardSlug?: string;
  name: string;
  phone: string;
  attendance: "attending" | "declined";
  guestCount: number;
  message?: string;
  createdAt: string;
}

interface WeddingSettingsState {
  groomName: string;
  brideName: string;
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
}

interface AdminUserItem {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

interface AdminCardItem {
  _id: string;
  userId: string;
  authorName: string;
  slug: string;
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

const defaultSettings: WeddingSettingsState = {
  groomName: "Mohammad Sajedul Islam",
  brideName: "Sadia",
  eventTitle: "Grand Wedding Reception",
  eventSubtitle: "Walima Celebration",
  eventDate: "2026-12-29T19:00:00+06:00",
  eventTime: "7:00 PM BST (Evening)",
  venueName: "Phoenix Convention Hall",
  venueAddress: "Tejgaon Industrial Area, Shahid Tajuddin Ahmed Sarani",
  venueCity: "Dhaka - 1208, Bangladesh",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Phoenix+Convention+Hall+Tejgaon+Dhaka+Bangladesh",
  dressCodeTitle: "Traditional / Formal",
  dressCodeDetails: "Sherwani, Suit, Lehenga, Sharee",
  rsvpDeadline: "December 20, 2026",
  phoneContact: "+880 1700-000000",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [activeTab, setActiveTab] = useState<
    "overview" | "rsvps" | "cards" | "users" | "settings" | "wishes"
  >("overview");
  const [loading, setLoading] = useState(true);
  const [rsvps, setRsvps] = useState<RsvpItem[]>([]);
  const [usersList, setUsersList] = useState<AdminUserItem[]>([]);
  const [allCards, setAllCards] = useState<AdminCardItem[]>([]);

  const [stats, setStats] = useState({
    totalSubmissions: 0,
    attendingCount: 0,
    declinedCount: 0,
    totalGuests: 0,
    totalWishes: 0,
    usersSignedUp: 0,
    onlineUsersNow: 1,
    hostingCardsNow: 0,
    totalCardsEverCreated: 0,
  });

  const [databaseStatus, setDatabaseStatus] = useState<string>("connected");
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAttendance, setFilterAttendance] = useState<"all" | "attending" | "declined">("all");

  // Settings State
  const [settings, setSettings] = useState<WeddingSettingsState>(defaultSettings);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Edit User Modal State
  const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null);
  const [userFormName, setUserFormName] = useState("");
  const [userFormEmail, setUserFormEmail] = useState("");
  const [userFormRole, setUserFormRole] = useState<"user" | "admin">("user");
  const [userFormNewPass, setUserFormNewPass] = useState("");
  const [savingUser, setSavingUser] = useState(false);

  // Edit Card Modal State
  const [editingCard, setEditingCard] = useState<AdminCardItem | null>(null);
  const [cardFormData, setCardFormData] = useState<Partial<AdminCardItem>>({});
  const [savingCard, setSavingCard] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const dashRes = await fetch("/api/admin/dashboard");
      if (dashRes.status === 401) {
        router.push("/login");
        return;
      }

      const d = await dashRes.json();
      if (d.success) {
        if (d.rsvps) setRsvps(d.rsvps);
        if (d.stats) setStats(d.stats);
        if (d.users) setUsersList(d.users);
        if (d.cards) setAllCards(d.cards);
        if (d.databaseStatus) setDatabaseStatus(d.databaseStatus);
        setLastRefreshedAt(new Date());
        if (d.settings) {
          setSettings({
            groomName: d.settings.groomName || defaultSettings.groomName,
            brideName: d.settings.brideName || defaultSettings.brideName,
            eventTitle: d.settings.eventTitle || defaultSettings.eventTitle,
            eventSubtitle: d.settings.eventSubtitle || defaultSettings.eventSubtitle,
            eventDate: d.settings.eventDate || defaultSettings.eventDate,
            eventTime: d.settings.eventTime || defaultSettings.eventTime,
            venueName: d.settings.venueName || defaultSettings.venueName,
            venueAddress: d.settings.venueAddress || defaultSettings.venueAddress,
            venueCity: d.settings.venueCity || defaultSettings.venueCity,
            googleMapsUrl: d.settings.googleMapsUrl || defaultSettings.googleMapsUrl,
            dressCodeTitle: d.settings.dressCodeTitle || defaultSettings.dressCodeTitle,
            dressCodeDetails: d.settings.dressCodeDetails || defaultSettings.dressCodeDetails,
            rsvpDeadline: d.settings.rsvpDeadline || defaultSettings.rsvpDeadline,
            phoneContact: d.settings.phoneContact || defaultSettings.phoneContact,
          });
        }
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const triggerPullRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await fetchData();
    } catch (err) {
      console.error("Failed to refresh:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    document.title = "Master Admin Portal | Digitalwedcards";
    fetchData();
    const handleGlobalRefresh = () => {
      fetchData();
    };
    window.addEventListener("app:refresh", handleGlobalRefresh);
    return () => window.removeEventListener("app:refresh", handleGlobalRefresh);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    startTransition(() => {
      router.push("/login");
    });
  };

  const handleDeleteRsvp = async (id: string) => {
    if (!confirm("Are you sure you want to remove this RSVP entry?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/rsvps?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setRsvps((prev) => prev.filter((item) => item._id !== id));
        fetchData();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaving(true);
    setSettingsSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSettingsSuccess(true);
        setTimeout(() => setSettingsSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Error saving settings:", err);
    } finally {
      setSettingsSaving(false);
    }
  };

  // CSV Export
  const exportToCSV = () => {
    if (rsvps.length === 0) return;

    const headers = [
      "Name",
      "Phone",
      "Attendance",
      "Guests Count",
      "Card Slug",
      "Submitted Date",
      "Wishes / Message",
    ];
    const rows = rsvps.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      r.attendance.toUpperCase(),
      r.attendance === "attending" ? r.guestCount : 0,
      `"${r.cardSlug || "default"}"`,
      `"${new Date(r.createdAt).toLocaleDateString("en-GB")}"`,
      `"${(r.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `wedding_rsvp_list_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // User Actions
  const handleOpenEditUser = (user: AdminUserItem) => {
    setEditingUser(user);
    setUserFormName(user.name);
    setUserFormEmail(user.email);
    setUserFormRole(user.role);
    setUserFormNewPass("");
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setSavingUser(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser._id,
          name: userFormName,
          email: userFormEmail,
          role: userFormRole,
          newPassword: userFormNewPass || undefined,
        }),
      });
      if (res.ok) {
        setEditingUser(null);
        fetchData();
      }
    } catch (err) {
      console.error("Failed to update user:", err);
    } finally {
      setSavingUser(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user and all their created wedding cards?"))
      return;
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsersList((prev) => prev.filter((u) => u._id !== id));
        fetchData();
      }
    } catch (err) {
      console.error("Delete user error:", err);
    }
  };

  // Card Actions
  const handleOpenEditCard = (card: AdminCardItem) => {
    setEditingCard(card);
    setCardFormData({ ...card });
  };

  const handleSaveCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;
    setSavingCard(true);
    try {
      const res = await fetch("/api/admin/cards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingCard._id, ...cardFormData }),
      });
      if (res.ok) {
        setEditingCard(null);
        fetchData();
      }
    } catch (err) {
      console.error("Failed to update card:", err);
    } finally {
      setSavingCard(false);
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this digital wedding card?")) return;
    try {
      const res = await fetch(`/api/admin/cards?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setAllCards((prev) => prev.filter((c) => c._id !== id));
        fetchData();
      }
    } catch (err) {
      console.error("Delete card error:", err);
    }
  };

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm) ||
      (item.cardSlug || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAttendance =
      filterAttendance === "all" ? true : item.attendance === filterAttendance;
    return matchesSearch && matchesAttendance;
  });

  const wishesList = rsvps.filter((r) => r.message && r.message.trim().length > 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#041a14] flex flex-col items-center justify-center text-amber-200">
        <div className="w-12 h-12 border-3 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-serif tracking-widest text-sm uppercase">Loading Digitalwedcards Admin Portal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#041a14] bg-radial-[at_top] from-[#0a382c] via-[#041a14] to-[#020d0a] text-amber-100/90 selection:bg-amber-500/30 pb-20">

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#082920]/65 border-b border-amber-400/30 backdrop-blur-[28px] backdrop-saturate-150 shadow-xl shadow-black/50 transition-all">
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
            </Link>
            <div>
              <h1 className="font-serif font-bold text-base sm:text-lg text-amber-100 leading-tight">
                Digitalwedcards Master Admin
              </h1>
              <p className="text-[10px] sm:text-xs text-amber-400/70 tracking-widest uppercase">
                Digitalwedcards Control & Database Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/explore"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs hover:bg-amber-500/20 transition-all font-medium"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Explore Cards</span>
              <span className="sm:hidden">Explore</span>
            </Link>

            <button
              onClick={triggerPullRefresh}
              title="Refresh Data"
              className="p-2 rounded-lg bg-[#041a14] border border-amber-500/30 text-amber-400/80 hover:text-amber-200 hover:border-amber-400 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-200 text-xs hover:bg-red-900/60 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>



      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-amber-500/20 pb-4 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-semibold shadow-md shadow-amber-900/30"
                : "text-amber-200/70 hover:text-amber-100 hover:bg-amber-500/10"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Activity</span>
          </button>
          <button
            onClick={() => setActiveTab("cards")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "cards"
                ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-semibold shadow-md shadow-amber-900/30"
                : "text-amber-200/70 hover:text-amber-100 hover:bg-amber-500/10"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All Wedding Cards</span>
            <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-black/20">
              {allCards.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "users"
                ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-semibold shadow-md shadow-amber-900/30"
                : "text-amber-200/70 hover:text-amber-100 hover:bg-amber-500/10"
            }`}
          >
            <UserCog className="w-4 h-4" />
            <span>Manage Users</span>
            <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-black/20">
              {usersList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "settings"
                ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 font-semibold shadow-md shadow-amber-900/30"
                : "text-amber-200/70 hover:text-amber-100 hover:bg-amber-500/10"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Default Card Details</span>
          </button>
        </div>

        {/* TAB 0: EXECUTIVE OVERVIEW & USER ACTIVITY (Requested First Page) */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Real-time Hero Banner */}
            <div className="bg-gradient-to-r from-[#0b3b2e] via-[#082920] to-[#041a14] border border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-medium mb-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>Live Monitoring & Real-Time Intelligence</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-100 leading-tight">
                    Digitalwedcards Executive Overview
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-300/70 mt-1 max-w-2xl leading-relaxed font-sans">
                    Real-time telemetry, creator engagement, active hosted digital wedding invitations, and guest RSVP activities across Digitalwedcards.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-2xl bg-[#041a14]/80 border border-amber-500/30 text-right">
                    <p className="text-[10px] text-amber-400/60 uppercase tracking-wider font-sans font-semibold">
                      System Status
                    </p>
                    <p className="text-xs font-medium text-emerald-300 flex items-center gap-1.5 justify-end">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {databaseStatus === "connected" ? "MongoDB Live" : "High-Speed In-Memory"}
                    </p>
                  </div>
                  <button
                    onClick={triggerPullRefresh}
                    disabled={isRefreshing}
                    className="p-3 rounded-2xl bg-amber-400 text-emerald-950 hover:bg-amber-300 font-bold transition-all shadow-lg active:scale-95 cursor-pointer disabled:opacity-50"
                    title="Click to refresh all analytics"
                  >
                    <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* TOP 4 PRIMARY METRIC CARDS (Requested by User) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* 1. USERS SIGNED UP */}
              <div
                onClick={() => setActiveTab("users")}
                className="group cursor-pointer bg-[#082920]/95 border border-amber-400/30 hover:border-amber-400/70 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/70 font-sans">
                    Users Signed Up
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 tracking-tight">
                  {stats.usersSignedUp}
                </div>
                <p className="text-xs text-amber-300/70 mt-1 font-sans">
                  Total registered creator accounts
                </p>
                <div className="mt-4 pt-3 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-amber-400/60 font-sans">
                  <span>{usersList.filter((u) => u.role === "admin").length} Admins • {usersList.filter((u) => u.role === "user").length} Creators</span>
                  <span className="text-amber-300 group-hover:translate-x-0.5 transition-transform">View →</span>
                </div>
              </div>

              {/* 2. ONLINE RIGHT NOW */}
              <div className="bg-[#082920]/95 border border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden bg-gradient-to-br from-[#093528] via-[#082920] to-[#041a14]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400/90 font-sans flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>Online Right Now</span>
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-300 tracking-tight">
                  {stats.onlineUsersNow}
                </div>
                <p className="text-xs text-emerald-200/70 mt-1 font-sans">
                  Active live sessions in the last 5 min
                </p>
                <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-emerald-400/80 font-sans">
                  <span>Real-time visitor heartbeat</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                    LIVE
                  </span>
                </div>
              </div>

              {/* 3. HOSTING RIGHT NOW */}
              <div
                onClick={() => setActiveTab("cards")}
                className="group cursor-pointer bg-[#082920]/95 border border-amber-400/30 hover:border-amber-400/70 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/70 font-sans">
                    Hosting Right Now
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 tracking-tight">
                  {stats.hostingCardsNow}
                </div>
                <p className="text-xs text-amber-300/70 mt-1 font-sans">
                  Active live digital invitations online
                </p>
                <div className="mt-4 pt-3 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-amber-400/60 font-sans">
                  <span>Public & ready for guests</span>
                  <span className="text-amber-300 group-hover:translate-x-0.5 transition-transform">Manage →</span>
                </div>
              </div>

              {/* 4. TOTAL CARDS EVER CREATED */}
              <div
                onClick={() => setActiveTab("cards")}
                className="group cursor-pointer bg-[#082920]/95 border border-amber-400/30 hover:border-amber-400/70 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400/70 font-sans">
                    Total Cards Created
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-100 tracking-tight">
                  {stats.totalCardsEverCreated}
                </div>
                <p className="text-xs text-amber-300/70 mt-1 font-sans">
                  Lifetime invitations created on platform
                </p>
                <div className="mt-4 pt-3 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-amber-400/60 font-sans">
                  <span>All-time creations</span>
                  <span className="text-amber-300 group-hover:translate-x-0.5 transition-transform">Inspect →</span>
                </div>
              </div>
            </div>



            {/* TWO COLUMN RECENT ACTIVITY SECTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Recent Registered Creators */}
              <div className="bg-[#082920]/95 border border-amber-400/30 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-500/20">
                    <div className="flex items-center gap-2">
                      <UserCog className="w-4 h-4 text-amber-400" />
                      <h3 className="font-serif text-lg font-bold text-amber-100">
                        Recent User Registrations
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("users")}
                      className="text-xs text-amber-300 hover:text-amber-100 underline font-medium cursor-pointer"
                    >
                      Manage all ({usersList.length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {usersList.slice(0, 5).map((usr) => (
                      <div
                        key={usr._id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-[#041a14]/60 border border-amber-500/15 hover:border-amber-500/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center font-serif text-amber-200 font-bold text-xs">
                            {usr.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-amber-100">
                              {usr.name}
                            </p>
                            <p className="text-[11px] text-amber-300/70 font-mono">
                              {usr.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              usr.role === "admin"
                                ? "bg-red-950 text-red-300 border border-red-500/30"
                                : "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                            }`}
                          >
                            {usr.role.toUpperCase()}
                          </span>
                          <p className="text-[10px] text-amber-400/50 mt-1">
                            {new Date(usr.createdAt).toLocaleDateString("en-GB")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-amber-500/15">
                  <button
                    onClick={() => setActiveTab("users")}
                    className="w-full py-2.5 rounded-xl bg-[#041a14] border border-amber-500/30 text-xs text-amber-300 hover:bg-amber-500/10 transition-all font-medium flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Inspect & Reset Passwords in Manage Users</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Currently Hosted Wedding Cards */}
              <div className="bg-[#082920]/95 border border-amber-400/30 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-500/20">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <h3 className="font-serif text-lg font-bold text-amber-100">
                        Active Hosted Wedding Cards
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveTab("cards")}
                      className="text-xs text-amber-300 hover:text-amber-100 underline font-medium cursor-pointer"
                    >
                      All cards ({allCards.length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {allCards.slice(0, 5).map((card) => (
                      <div
                        key={card._id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-[#041a14]/60 border border-amber-500/15 hover:border-amber-500/40 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-emerald-950 border border-amber-400/40 flex items-center justify-center font-serif text-amber-200 font-bold text-xs">
                            {card.monogram}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-amber-100">
                              {card.namesFormatted}
                            </p>
                            <p className="text-[11px] text-amber-300/70">
                              {card.venueName} • {card.venueCity}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              card.isPublic
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                                : "bg-stone-900 text-stone-400 border border-stone-600"
                            }`}
                          >
                            {card.isPublic ? "LIVE" : "PRIVATE"}
                          </span>

                          <Link
                            href={`/card/${card.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 transition-colors"
                            title="Preview live wedding card"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-amber-500/15">
                  <button
                    onClick={() => setActiveTab("cards")}
                    className="w-full py-2.5 rounded-xl bg-[#041a14] border border-amber-500/30 text-xs text-amber-300 hover:bg-amber-500/10 transition-all font-medium flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Rewrite & Customize Cards in All Wedding Cards</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="bg-[#082920]/95 border border-amber-400/30 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-base font-bold text-amber-100">
                  Super Admin Management Shortcuts
                </h4>
                <p className="text-xs text-amber-400/70 font-sans">
                  Quickly navigate to any platform section to manage data or update configurations.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setActiveTab("cards")}
                  className="px-4 py-2 rounded-xl bg-[#041a14] border border-amber-500/30 text-xs text-amber-300 hover:bg-amber-500/15 transition-all font-medium cursor-pointer"
                >
                  All Wedding Cards
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className="px-4 py-2 rounded-xl bg-[#041a14] border border-amber-500/30 text-xs text-amber-300 hover:bg-amber-500/15 transition-all font-medium cursor-pointer"
                >
                  Manage Users
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-emerald-950 font-bold text-xs hover:bg-amber-300 transition-all shadow-md cursor-pointer"
                >
                  Edit Home Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: RSVPS TRACKER */}
        {activeTab === "rsvps" && (
          <div className="space-y-8 animate-fadeIn">
            {/* 4 Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#082920]/90 border border-amber-400/30 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
                <div className="text-amber-400/60 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Total Responses</span>
                  <Users className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                  {stats.totalSubmissions}
                </div>
                <p className="text-[11px] text-amber-400/60 mt-1">Submitted RSVPs</p>
              </div>

              <div className="bg-[#082920]/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
                <div className="text-emerald-400/70 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Attending Parties</span>
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-300">
                  {stats.attendingCount}
                </div>
                <p className="text-[11px] text-emerald-400/60 mt-1">Confirmed YES</p>
              </div>

              <div className="bg-[#082920]/90 border border-amber-400/40 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden bg-gradient-to-br from-[#0b3b2e] to-[#082920]">
                <div className="text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Total Guests Headcount</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-200">
                  {stats.totalGuests}
                </div>
                <p className="text-[11px] text-amber-300/70 mt-1">Attending head count</p>
              </div>

              <div className="bg-[#082920]/90 border border-red-500/30 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
                <div className="text-red-400/70 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Declined</span>
                  <UserX className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-red-300">
                  {stats.declinedCount}
                </div>
                <p className="text-[11px] text-red-400/60 mt-1">Regretfully decline</p>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-[#082920]/95 border border-amber-400/30 rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-amber-400/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search guest name, phone, or card slug..."
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-amber-100 placeholder-emerald-700/70 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <select
                  value={filterAttendance}
                  onChange={(e) => setFilterAttendance(e.target.value as "all" | "attending" | "declined")}
                  className="bg-[#041a14] border border-amber-500/30 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-amber-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="all">All Responses ({stats.totalSubmissions})</option>
                  <option value="attending">Attending Only ({stats.attendingCount})</option>
                  <option value="declined">Declined Only ({stats.declinedCount})</option>
                </select>
              </div>

              <button
                onClick={exportToCSV}
                disabled={rsvps.length === 0}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 hover:bg-amber-500/30 transition-all text-xs sm:text-sm font-medium cursor-pointer disabled:opacity-50"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export Guest List (CSV)</span>
              </button>
            </div>

            {/* Table */}
            <div className="bg-[#082920]/95 border border-amber-400/30 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#041a14] border-b border-amber-500/20 text-amber-400/80 font-serif uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Guest Name</th>
                      <th className="py-3.5 px-4">Contact Phone</th>
                      <th className="py-3.5 px-4">Card Slug</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Guests</th>
                      <th className="py-3.5 px-4">Message</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-500/10">
                    {filteredRsvps.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-amber-400/60 font-serif">
                          No matching RSVPs found.
                        </td>
                      </tr>
                    ) : (
                      filteredRsvps.map((rsvp) => (
                        <tr key={rsvp._id} className="hover:bg-amber-500/5 transition-colors">
                          <td className="py-4 px-4 sm:px-6 font-semibold text-amber-100">
                            {rsvp.name}
                          </td>
                          <td className="py-4 px-4 text-amber-300 font-mono text-xs">
                            {rsvp.phone}
                          </td>
                          <td className="py-4 px-4 text-amber-400/70 font-mono text-xs">
                            {rsvp.cardSlug || "default"}
                          </td>
                          <td className="py-4 px-4">
                            {rsvp.attendance === "attending" ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950 border border-emerald-500/40 text-emerald-300">
                                <CheckCircle2 className="w-3 h-3" /> Attending
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-950 border border-red-500/40 text-red-300">
                                💔 Declined
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4">
                            {rsvp.attendance === "attending" ? (
                              <span className="inline-block px-2 py-0.5 rounded bg-amber-400/10 text-amber-200 font-medium">
                                {rsvp.guestCount}
                              </span>
                            ) : (
                              <span className="text-stone-500">—</span>
                            )}
                          </td>
                          <td className="py-4 px-4 max-w-xs text-amber-200/80 italic truncate" title={rsvp.message}>
                            {rsvp.message ? `"${rsvp.message}"` : "—"}
                          </td>
                          <td className="py-4 px-4 text-amber-400/60 text-[11px] whitespace-nowrap">
                            {new Date(rsvp.createdAt).toLocaleDateString("en-GB")}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => handleDeleteRsvp(rsvp._id)}
                              disabled={deletingId === rsvp._id}
                              className="p-1.5 rounded-lg bg-red-950/40 border border-red-500/20 text-red-400 hover:bg-red-900/60 hover:text-red-200 transition-colors cursor-pointer disabled:opacity-50"
                              title="Delete RSVP"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ALL WEDDING CARDS (SUPER ADMIN EDIT / REWRITE / DELETE) */}
        {activeTab === "cards" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
              <div>
                <h2 className="font-serif text-2xl font-bold text-amber-100">
                  All Digital Wedding Cards ({allCards.length})
                </h2>
                <p className="text-xs text-amber-300/70 mt-1">
                  Super Admin control: Rewrite any card information, manage public visibility, or delete cards.
                </p>
              </div>
            </div>

            <div className="bg-[#082920]/95 border border-amber-400/30 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#041a14] border-b border-amber-500/20 text-amber-400/80 font-serif uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Couple / Title</th>
                      <th className="py-3.5 px-4">Author</th>
                      <th className="py-3.5 px-4">Slug</th>
                      <th className="py-3.5 px-4">Date & Venue</th>
                      <th className="py-3.5 px-4">Visibility</th>
                      <th className="py-3.5 px-4 text-right">Super Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-500/10">
                    {allCards.map((card) => (
                      <tr key={card._id} className="hover:bg-amber-500/5 transition-colors">
                        <td className="py-4 px-4 sm:px-6">
                          <p className="font-semibold text-amber-100 text-sm">{card.namesFormatted}</p>
                          <p className="text-[11px] text-amber-300/70 font-serif italic">
                            {card.groomName} & {card.brideName}
                          </p>
                        </td>
                        <td className="py-4 px-4 text-amber-200">{card.authorName || "User"}</td>
                        <td className="py-4 px-4 font-mono text-xs text-amber-400/80">/card/{card.slug}</td>
                        <td className="py-4 px-4 text-xs text-amber-200/90">
                          <p>
                            {new Date(card.eventDate).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-[11px] text-amber-400/60 truncate max-w-[180px]">
                            {card.venueName}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              card.isPublic
                                ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                                : "bg-black/50 text-stone-300 border border-white/20"
                            }`}
                          >
                            {card.isPublic ? "Public in Explore" : "Private Link"}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/card/${card.slug}`}
                              target="_blank"
                              className="p-2 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-200 hover:bg-amber-500/20"
                              title="Open Live Card"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>

                            <button
                              onClick={() => handleOpenEditCard(card)}
                              className="p-2 rounded-lg bg-[#041a14] border border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                              title="Rewrite/Edit Card Information"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteCard(card._id)}
                              className="p-2 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 hover:bg-red-900/60"
                              title="Delete Card Permanently"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MANAGE USERS (SUPER ADMIN EDIT / REWRITE / DELETE) */}
        {activeTab === "users" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
              <div>
                <h2 className="font-serif text-2xl font-bold text-amber-100">
                  Registered Users & Creators ({usersList.length})
                </h2>
                <p className="text-xs text-amber-300/70 mt-1">
                  Super Admin control: Edit user credentials, assign roles, reset passwords, or delete users.
                </p>
              </div>
            </div>

            <div className="bg-[#082920]/95 border border-amber-400/30 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#041a14] border-b border-amber-500/20 text-amber-400/80 font-serif uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Full Name</th>
                      <th className="py-3.5 px-4">Email Address</th>
                      <th className="py-3.5 px-4">System Role</th>
                      <th className="py-3.5 px-4">Joined Date</th>
                      <th className="py-3.5 px-4 text-right">Super Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-500/10">
                    {usersList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-amber-400/60 font-serif">
                          No users registered yet.
                        </td>
                      </tr>
                    ) : (
                      usersList.map((usr) => (
                        <tr key={usr._id} className="hover:bg-amber-500/5 transition-colors">
                          <td className="py-4 px-4 sm:px-6 font-semibold text-amber-100">
                            {usr.name}
                          </td>
                          <td className="py-4 px-4 text-amber-300 font-mono text-xs">{usr.email}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                usr.role === "admin"
                                  ? "bg-red-950 text-red-300 border border-red-500/40"
                                  : "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                              }`}
                            >
                              {usr.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-amber-400/60 text-[11px]">
                            {new Date(usr.createdAt).toLocaleDateString("en-GB")}
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditUser(usr)}
                                className="p-2 rounded-lg bg-[#041a14] border border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                                title="Edit User Details / Reset Password"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleDeleteUser(usr._id)}
                                className="p-2 rounded-lg bg-red-950/60 border border-red-500/30 text-red-300 hover:bg-red-900/60"
                                title="Delete User"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DEFAULT SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            <div className="bg-[#082920]/95 border border-amber-400/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-500/20">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
                    Live Home Card Information Editor
                  </h2>
                  <p className="text-xs text-amber-400/70 mt-1">
                    Update names, reception venue, schedule times, and dress code for the default card.
                  </p>
                </div>
                <Settings className="w-6 h-6 text-amber-400/60" />
              </div>

              {settingsSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-sm flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Wedding details successfully saved!</span>
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                      Groom's Name
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.groomName}
                      onChange={(e) => setSettings({ ...settings, groomName: e.target.value })}
                      className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                      Bride's Name
                    </label>
                    <input
                      type="text"
                      required
                      value={settings.brideName}
                      onChange={(e) => setSettings({ ...settings, brideName: e.target.value })}
                      className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                      Venue Name
                    </label>
                    <input
                      type="text"
                      value={settings.venueName}
                      onChange={(e) => setSettings({ ...settings, venueName: e.target.value })}
                      className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-amber-300/80 mb-2">
                      City / Country
                    </label>
                    <input
                      type="text"
                      value={settings.venueCity}
                      onChange={(e) => setSettings({ ...settings, venueCity: e.target.value })}
                      className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-amber-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={settingsSaving}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium tracking-wide text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-emerald-950 hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2 cursor-pointer font-serif disabled:opacity-50"
                  >
                    {settingsSaving ? (
                      <div className="w-5 h-5 border-2 border-emerald-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Wedding Details</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 5: WISHES WALL */}
        {activeTab === "wishes" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
                  Guest Wishes & Blessings
                </h2>
                <p className="text-xs text-amber-400/70 mt-1">
                  Messages submitted alongside RSVP confirmations across all cards.
                </p>
              </div>
            </div>

            {wishesList.length === 0 ? (
              <div className="bg-[#082920]/90 border border-amber-400/20 rounded-2xl p-12 text-center text-amber-400/60">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="font-serif text-base">No guest wishes submitted yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {wishesList.map((rsvp) => (
                  <div
                    key={rsvp._id}
                    className="bg-[#082920]/90 border border-amber-400/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between relative group hover:border-amber-400/60 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-serif font-bold text-amber-200 text-base">
                          {rsvp.name}
                        </span>
                        <span className="text-[10px] text-amber-400/60 font-mono">
                          {new Date(rsvp.createdAt).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                      <p className="text-sm text-amber-100/90 italic font-serif leading-relaxed">
                        "{rsvp.message}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-amber-500/10 flex items-center justify-between text-xs">
                      <span className="text-amber-400/70 font-mono text-[11px]">{rsvp.phone}</span>
                      <span className="text-emerald-300 text-[11px] font-medium">
                        Card: {rsvp.cardSlug || "default"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* SUPER ADMIN: EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#082920] border-2 border-amber-400/40 rounded-3xl p-6 shadow-2xl text-amber-100">
            <button
              onClick={() => setEditingUser(null)}
              className="absolute top-4 right-4 p-2 text-amber-300/70 hover:text-amber-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-amber-200 mb-1">
              Super Admin: Rewrite User Info
            </h3>
            <p className="text-xs text-amber-400/60 mb-5">
              Edit user credentials, role, or reset password.
            </p>

            <form onSubmit={handleSaveUser} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={userFormName}
                  onChange={(e) => setUserFormName(e.target.value)}
                  className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-amber-100"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={userFormEmail}
                  onChange={(e) => setUserFormEmail(e.target.value)}
                  className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-amber-100"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                  Role
                </label>
                <select
                  value={userFormRole}
                  onChange={(e) => setUserFormRole(e.target.value as "user" | "admin")}
                  className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-amber-100"
                >
                  <option value="user">User (Standard Creator)</option>
                  <option value="admin">Admin (Full System Access)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                  Reset Password (Leave blank to keep current)
                </label>
                <input
                  type="password"
                  placeholder="New password (min 6 chars)"
                  value={userFormNewPass}
                  onChange={(e) => setUserFormNewPass(e.target.value)}
                  className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-amber-100"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl border border-amber-500/30 text-xs text-amber-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingUser}
                  className="px-5 py-2 rounded-xl bg-amber-400 text-emerald-950 font-semibold text-xs hover:bg-amber-300"
                >
                  {savingUser ? "Saving..." : "Save User Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUPER ADMIN: EDIT CARD MODAL */}
      {editingCard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#082920] border-2 border-amber-400/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-amber-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingCard(null)}
              className="absolute top-4 right-4 p-2 text-amber-300/70 hover:text-amber-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-amber-200 mb-1">
              Super Admin: Rewrite Card Information
            </h3>
            <p className="text-xs text-amber-400/60 mb-5">
              Edit any fields for invitation card: <code className="text-amber-300">/card/{editingCard.slug}</code>
            </p>

            <form onSubmit={handleSaveCard} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                    Groom's Name
                  </label>
                  <input
                    type="text"
                    value={cardFormData.groomName || ""}
                    onChange={(e) => setCardFormData({ ...cardFormData, groomName: e.target.value })}
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-amber-100"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                    Bride's Name
                  </label>
                  <input
                    type="text"
                    value={cardFormData.brideName || ""}
                    onChange={(e) => setCardFormData({ ...cardFormData, brideName: e.target.value })}
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-amber-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                    Venue Name
                  </label>
                  <input
                    type="text"
                    value={cardFormData.venueName || ""}
                    onChange={(e) => setCardFormData({ ...cardFormData, venueName: e.target.value })}
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-amber-100"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                    City / Country
                  </label>
                  <input
                    type="text"
                    value={cardFormData.venueCity || ""}
                    onChange={(e) => setCardFormData({ ...cardFormData, venueCity: e.target.value })}
                    className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-amber-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-300/80 mb-1">
                  Tagline / Message
                </label>
                <textarea
                  rows={2}
                  value={cardFormData.tagline || ""}
                  onChange={(e) => setCardFormData({ ...cardFormData, tagline: e.target.value })}
                  className="w-full bg-[#041a14] border border-amber-500/30 rounded-xl px-3.5 py-2.5 text-sm text-amber-100 resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="adminIsPublic"
                  checked={cardFormData.isPublic || false}
                  onChange={(e) => setCardFormData({ ...cardFormData, isPublic: e.target.checked })}
                  className="w-4 h-4 rounded border-amber-400 text-amber-500"
                />
                <label htmlFor="adminIsPublic" className="text-xs text-amber-200 cursor-pointer">
                  Public in Explore Showcase
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="px-4 py-2 rounded-xl border border-amber-500/30 text-xs text-amber-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingCard}
                  className="px-5 py-2 rounded-xl bg-amber-400 text-emerald-950 font-semibold text-xs hover:bg-amber-300"
                >
                  {savingCard ? "Saving..." : "Save Card Overrides"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
