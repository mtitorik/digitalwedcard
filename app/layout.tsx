import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#041913",
};

export const metadata: Metadata = {
  title: {
    default: "Digitalwedcards — Luxury Digital Wedding Invitation Platform",
    template: "%s | Digitalwedcards",
  },
  description:
    "Digitalwedcards — Create and experience bespoke digital wedding invitation cards with interactive 3D envelopes, audio melodies, instant RSVP tracking, and guest wishes.",
  authors: [{ name: "Digitalwedcards" }],
  openGraph: {
    title: "Digitalwedcards — Luxury Digital Wedding Invitation Platform",
    description:
      "Digitalwedcards — Create and experience bespoke digital wedding invitation cards with interactive 3D envelopes, audio melodies, instant RSVP tracking, and guest wishes.",
    url: "https://digitalwedcards.com",
    siteName: "Digitalwedcards",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Digitalwedcards Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitalwedcards — Luxury Digital Wedding Invitation Platform",
    description:
      "Create and experience bespoke digital wedding invitation cards with interactive 3D envelopes, audio melodies, and instant RSVP tracking.",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

import { GlobalPullToRefresh } from "@/components/GlobalPullToRefresh";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${plusJakarta.variable}`}
    >
      <body
        suppressHydrationWarning
        className="antialiased bg-[#062c22] text-[#fcfbf7] selection:bg-amber-400/30 selection:text-amber-100 min-h-screen"
      >
        <GlobalPullToRefresh />
        {children}
      </body>
    </html>
  );
}
