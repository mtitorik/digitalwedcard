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
  title: "Sajedul & Sadia — Wedding Reception Invitation",
  description:
    "Together with their beloved families, Mohammad Sajedul Islam & Sadia cordially invite you to celebrate their Grand Wedding Reception at Phoenix Convention Hall, Tejgaon, Dhaka on Tuesday, December 29, 2026.",
  authors: [{ name: "Mohammad Sajedul Islam & Sadia" }],
  openGraph: {
    title: "Sajedul & Sadia — Wedding Reception Invitation",
    description:
      "Together with their families, Mohammad Sajedul Islam & Sadia invite you to celebrate their wedding reception at Phoenix Convention Hall, Tejgaon, Dhaka on December 29, 2026.",
    url: "https://sajedulandsadia.wedding",
    siteName: "Sajedul & Sadia Wedding Reception",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Sajedul & Sadia Wedding Reception Invitation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajedul & Sadia — Wedding Reception Invitation",
    description: "Join us in celebrating our wedding reception • December 29, 2026 at Phoenix Convention Hall, Dhaka",
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
