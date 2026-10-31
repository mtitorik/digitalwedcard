import Link from "next/link";
import Image from "next/image";
import db from "@/lib/db";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/public/Header";
import { FaqAccordion } from "@/components/public/FaqAccordion";
import { AuthTriggerButton } from "@/components/auth/AuthTriggerButton";
import { HeroBackgroundVideo } from "@/components/public/HeroBackgroundVideo";
import {
  Sparkles,
  Shield,
  ArrowRight,
  Heart,
  ExternalLink,
  Calendar,
  MapPin,
  Music,
  Check,
  Mail,
  Phone,
  MessageSquare,
  Smartphone,
  Eye,
  Lock,
  Layers,
  Send,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getSession();

  const [templates, sampleInvitations] = await Promise.all([
    db.template.findMany({
      where: { isActive: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    db.invitation.findMany({
      where: { status: "PUBLISHED" },
      take: 3,
      include: {
        template: true,
        _count: { select: { rsvps: true, schedules: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 scroll-smooth">
      {/* Sticky & Slightly Transparent Header Component */}
      <Header session={session} />

      {/* Hero Section with 50% Slower & Upside Down Background Video */}
      <section
        id="hero"
        className="relative isolate overflow-hidden min-h-screen min-h-[100dvh] flex flex-col justify-center items-center pt-28 sm:pt-32 pb-16 sm:pb-20 px-6 border-b border-stone-800 text-stone-100"
      >
        <HeroBackgroundVideo playbackRate={0.5} />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 my-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
            Celebrate Your Love with Interactive Digital Wedding Invitations
          </h1>

          <p className="text-base sm:text-lg text-stone-200 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Craft exquisite event microsites featuring photo galleries, ceremony schedules, turn-by-turn Google Maps navigation, ambient background music, and real-time RSVP tracking.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/i/sarah-alexander" target="_blank">
              <Button variant="gold" size="lg" className="shadow-lg hover:scale-105 transition-transform">
                <ExternalLink className="w-4 h-4 mr-2" />
                Experience Live Invitation Card
              </Button>
            </Link>

            {session ? (
              session.role === "ADMIN" ? (
                <Link href="/admin">
                  <Button variant="outline" size="lg" className="border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                    <Shield className="w-4 h-4 mr-2 text-amber-300" />
                    Open Admin Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="#designs">
                  <Button variant="outline" size="lg" className="border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                    <Sparkles className="w-4 h-4 mr-2 text-amber-300" />
                    Browse Themes
                  </Button>
                </Link>
              )
            ) : (
              <AuthTriggerButton
                mode="signup"
                variant="outline"
                size="lg"
                className="border-white/40 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm cursor-pointer"
              >
                Create Your Invitation
              </AuthTriggerButton>
            )}
          </div>
        </div>
      </section>

      {/* Featured Templates Gallery (Design) */}
      <section
        id="designs"
        className="min-h-screen min-h-[100dvh] flex flex-col justify-center py-20 px-6 max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Aesthetic Collection</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Curated Design Themes
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Handcrafted typography, delicate color palettes, and editorial layouts tailored for contemporary weddings.
            </p>
          </div>

          <Link href="/admin/templates">
            <Button variant="outline" size="sm">
              Manage Templates in Admin
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                <Image
                  src={tpl.thumbnailUrl}
                  alt={tpl.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-white font-mono text-[10px] font-semibold px-2 py-0.5 rounded shadow">
                  {tpl.price > 0 ? `$${tpl.price.toFixed(2)}` : "FREE"}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-semibold text-stone-900 text-sm group-hover:text-amber-800 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                    {tpl.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Sample Cards Showcase */}
      <section
        id="cards"
        className="min-h-screen min-h-[100dvh] flex flex-col justify-center py-20 px-6 bg-stone-100/60 border-t border-b border-stone-200"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-serif font-bold text-stone-900">
              Live Digital Invitations
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Public shareable event cards hosted at custom URL slugs with live RSVP modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleInvitations.map((inv) => (
              <div
                key={inv.id}
                className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
              >
                <div className="relative aspect-[16/9] w-full bg-stone-100">
                  <Image
                    src={inv.coverImageUrl}
                    alt={`${inv.brideName} & ${inv.groomName}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <h3 className="font-serif font-semibold text-base">
                      {inv.brideName} & {inv.groomName}
                    </h3>
                    <p className="text-[11px] text-stone-300">
                      Theme: {inv.template.name}
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{inv._count.schedules} ceremonies</span>
                    <span>•</span>
                    <span>{inv._count.rsvps} guest RSVPs</span>
                    <span>•</span>
                    <span>{inv.viewCount} views</span>
                  </div>

                  <Link href={`/i/${inv.slug}`} target="_blank">
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      View Live Card (/i/{inv.slug})
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="min-h-screen min-h-[100dvh] flex flex-col justify-center py-24 px-6 max-w-7xl mx-auto w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            How Digiwedcard Works
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
            Everything you need to design, customize, and distribute your wedding invitation in under 10 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center justify-center font-serif font-bold text-lg">
              01
            </div>
            <h3 className="text-xl font-serif font-semibold text-stone-900">
              Select Your Theme
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Browse our gallery of timeless stationery designs, from minimalist arches to royal botanical foliage and modern editorial aesthetics.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center justify-center font-serif font-bold text-lg">
              02
            </div>
            <h3 className="text-xl font-serif font-semibold text-stone-900">
              Personalize Details & Music
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Add your ceremony schedules, interactive Google Maps venue pins, photo albums, heartfelt love story, and background acoustic melodies.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-md transition space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200/80 flex items-center justify-center font-serif font-bold text-lg">
              03
            </div>
            <h3 className="text-xl font-serif font-semibold text-stone-900">
              Share Link & Track RSVPs
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Send your private shareable link via WhatsApp, SMS, or email. Watch guest attendances and heartfelt wishes roll into your live dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section
        id="why-us"
        className="min-h-screen min-h-[100dvh] flex flex-col justify-center py-24 px-6 bg-stone-900 text-stone-100"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
              <span>Modern Advantages</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Why Couples Choose Digiwedcard
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Elevate your wedding experience with digital convenience and unmatched elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Turn-by-Turn GPS Directions
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Guests tap once to launch Google Maps or Apple Maps directly to your ceremony or reception venue with zero confusion.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Ambient Romantic Music
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Welcome guests with soft piano melodies or your favorite couple song playing harmoniously in the background.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Live RSVP Management
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Collect headcounts, guest dietary requirements, plus-ones, and well-wishes instantly in your central admin portal.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Flawless On Every Device
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Pixel-perfect mobile experience designed specifically for iPhone, Android, and tablets without requiring app downloads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Passcode Privacy Gate
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Optional secret passcode protection ensures your intimate event details are viewed only by invited friends and family.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Instant Real-Time Edits
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Change timings, venue rooms, or weather contingencies at any moment without reprinting or mailing expensive cards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="min-h-screen min-h-[100dvh] flex flex-col justify-center py-24 px-6 max-w-7xl mx-auto w-full"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
            <span>Simple & Transparent</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Invitation Pricing Packages
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
            One-time payment for lifetime memories. No recurring monthly subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Complimentary */}
          <div className="rounded-3xl bg-white border border-stone-200/80 p-8 shadow-xs hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Complimentary
              </h3>
              <p className="text-xs text-stone-500">
                Ideal for intimate elopements or couples trying our digital platform.
              </p>
              <div className="pt-2">
                <span className="text-3xl font-serif font-bold text-stone-900">$0</span>
                <span className="text-xs text-stone-400 ml-1">/ lifetime</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs text-stone-600 border-t border-stone-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  1 Ceremony Schedule
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Standard RSVP Form
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Classic Minimalist Theme
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Hosted at /i/your-slug
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <AuthTriggerButton
                mode="signup"
                variant="outline"
                size="md"
                className="w-full"
              >
                Get Started Free
              </AuthTriggerButton>
            </div>
          </div>

          {/* Signature Card */}
          <div className="rounded-3xl bg-gradient-to-b from-amber-50/50 to-white border-2 border-amber-400 p-8 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
              Most Popular
            </div>
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Signature Card
              </h3>
              <p className="text-xs text-stone-500">
                Complete wedding event microsite with audio, maps, and couple gallery.
              </p>
              <div className="pt-2">
                <span className="text-3xl font-serif font-bold text-stone-900">$29</span>
                <span className="text-xs text-stone-400 ml-1">/ one-time</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs text-stone-700 border-t border-amber-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  Unlimited Ceremonies & Schedule
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  Interactive Google Maps Navigation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  Background Piano & Romantic Music
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  High-Resolution Photo Gallery
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-600" />
                  Real-Time RSVP Guestbook Analytics
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <AuthTriggerButton
                mode="signup"
                variant="gold"
                size="md"
                className="w-full shadow-sm"
              >
                Create Signature Card
              </AuthTriggerButton>
            </div>
          </div>

          {/* Royal Concierge */}
          <div className="rounded-3xl bg-white border border-stone-200/80 p-8 shadow-xs hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Royal Concierge
              </h3>
              <p className="text-xs text-stone-500">
                White-glove design support and private custom domain branding.
              </p>
              <div className="pt-2">
                <span className="text-3xl font-serif font-bold text-stone-900">$69</span>
                <span className="text-xs text-stone-400 ml-1">/ one-time</span>
              </div>
              <ul className="space-y-2.5 pt-4 text-xs text-stone-600 border-t border-stone-100">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Everything in Signature Card
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Dedicated Stationery Designer
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Passcode Privacy Protection Gate
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Custom Color Palette Matching
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  24/7 Priority Concierge Assistance
                </li>
              </ul>
            </div>
            <div className="pt-8">
              <AuthTriggerButton
                mode="signup"
                variant="outline"
                size="md"
                className="w-full"
              >
                Choose Royal Concierge
              </AuthTriggerButton>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="min-h-screen min-h-[100dvh] flex flex-col justify-center py-24 px-6 bg-stone-100/60 border-t border-b border-stone-200"
      >
        <div className="max-w-4xl mx-auto w-full space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 font-semibold mb-1">
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Find answers to the most common questions about digital wedding invitations and guest management.
            </p>
          </div>

          <FaqAccordion />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen min-h-[100dvh] flex flex-col justify-center py-24 px-6 max-w-7xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-800 font-semibold">
              <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>Our Story & Mission</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 leading-snug">
              Crafting Meaningful Invitations for the Modern Love Story
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              Digiwedcard was born out of a desire to replace costly, static paper envelopes with immersive, living wedding microsites. We believe your guests should feel the warmth, emotion, and elegance of your celebration from the very first moment they tap your link.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed">
              By combining bespoke typography, interactive GPS mapping, romantic background music, and effortless RSVP coordination, we help couples across the globe invite their loved ones in a sustainable, modern, and memorable way.
            </p>
            <div className="pt-2">
              <AuthTriggerButton mode="signup" variant="gold" size="md">
                Join Digiwedcard Today
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </AuthTriggerButton>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-stone-200">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=85"
              alt="Romantic wedding celebration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen min-h-[100dvh] flex flex-col justify-center py-24 px-6 bg-stone-900 text-stone-100"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-300 font-semibold mb-1">
              <span>Here For You</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Connect with Our Concierge
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Have questions about custom theme designs or setting up your digital card? We are always happy to assist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Email */}
            <div className="p-8 rounded-3xl bg-stone-800/80 border border-stone-700/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center justify-center mx-auto">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Email Concierge
              </h3>
              <p className="text-xs text-stone-400">
                Responses within 2 business hours
              </p>
              <p className="font-mono text-xs text-amber-300 pt-2">
                support@digiwedcard.com
              </p>
            </div>

            {/* WhatsApp */}
            <div className="p-8 rounded-3xl bg-stone-800/80 border border-stone-700/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center justify-center mx-auto">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Live WhatsApp
              </h3>
              <p className="text-xs text-stone-400">
                Instant wedding card assistance
              </p>
              <p className="font-mono text-xs text-amber-300 pt-2">
                +1 (555) 789-LOVE
              </p>
            </div>

            {/* Schedule */}
            <div className="p-8 rounded-3xl bg-stone-800/80 border border-stone-700/80 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/30 flex items-center justify-center mx-auto">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Dedicated Support
              </h3>
              <p className="text-xs text-stone-400">
                Mon - Sun • 8:00 AM - 10:00 PM EST
              </p>
              <p className="font-mono text-xs text-amber-300 pt-2">
                Available 7 Days / Week
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-200 bg-white py-12 px-6 text-center text-xs text-stone-400 space-y-3">
        <Link
          href="/"
          title="Digiwedcard Homepage"
          className="inline-block hover:opacity-80 transition-opacity"
        >
          <p className="font-serif text-base text-stone-800 hover:text-amber-800 transition-colors font-semibold">
            DIGIWEDCARD
          </p>
          <p className="text-xs text-stone-500 mt-0.5">
            Digital Wedding Invitations & Event Microsites
          </p>
        </Link>
        <p className="text-[11px] text-stone-400">
          Full-Stack Next.js (App Router), TypeScript, Tailwind CSS, PostgreSQL & Prisma
        </p>
      </footer>
    </div>
  );
}
