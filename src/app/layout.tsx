import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthModalProvider } from "@/context/auth-modal-context";
import { AuthSlideOver } from "@/components/auth/auth-slide-over";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digiwedcard | Digital Wedding Invitations & Event Microsites",
  description: "Create and share interactive digital wedding invitation cards and event microsites with Digiwedcard.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthModalProvider>
          {children}
          <AuthSlideOver />
          <Toaster position="top-right" richColors />
        </AuthModalProvider>
      </body>
    </html>
  );
}
