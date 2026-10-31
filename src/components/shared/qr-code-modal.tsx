"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { QrCode, Download, Copy, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn, formatDate } from "@/lib/utils";

export interface QRCodeModalProps {
  url: string;
  coupleNames: string;
  weddingDate?: Date | string | null;
  passcode?: string | null;
  isOpen: boolean;
  onClose: () => void;
  accentColor?: string;
}

export function QRCodeModal({
  url,
  coupleNames,
  weddingDate,
  passcode,
  isOpen,
  onClose,
  accentColor = "#d97706",
}: QRCodeModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  // Compute absolute URL safely without effect setState
  const fullUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
      }
      return `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
    }
    return url;
  }, [url]);

  // Generate QR code Data URL asynchronously
  useEffect(() => {
    if (!isOpen || !fullUrl) return;

    QRCode.toDataURL(fullUrl, {
      width: 480,
      margin: 2,
      color: {
        dark: "#1c1917", // warm stone-900
        light: "#ffffff",
      },
      errorCorrectionLevel: "H",
    })
      .then((dataUri) => {
        setQrDataUrl(dataUri);
      })
      .catch((err) => {
        console.error("QR Code generation error:", err);
      });
  }, [isOpen, fullUrl]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(true);
      toast.success("Invitation link copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  const handleDownloadPNG = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `${coupleNames.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code downloaded as high-res PNG!");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Semi-transparent Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 text-center shadow-2xl space-y-5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Monogram Crest Header */}
        <div className="space-y-1.5">
          <div
            className="inline-flex items-center justify-center gap-1 text-[11px] uppercase tracking-widest font-medium"
            style={{ color: accentColor }}
          >
            <Sparkles className="w-3 h-3" />
            <span>Digital Wedding QR Code</span>
          </div>
          <h3 className="font-serif text-2xl font-semibold text-stone-900">
            {coupleNames}
          </h3>
          {weddingDate && (
            <p className="text-xs text-stone-500 font-serif italic">
              {formatDate(weddingDate)}
            </p>
          )}
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Scan to instantly access the celebration schedule, photo gallery, and RSVP online.
          </p>
        </div>

        {/* QR Code Container with Double Editorial Border */}
        <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-[#faf8f5] p-3 border-2 border-stone-200 shadow-inner flex items-center justify-center">
          {qrDataUrl ? (
            <Image
              src={qrDataUrl}
              alt={`QR Code for ${coupleNames}'s Wedding`}
              width={256}
              height={256}
              unoptimized
              className="w-full h-full object-contain rounded-xl shadow-xs"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-stone-400 gap-2">
              <QrCode className="w-8 h-8 animate-pulse text-amber-600" />
              <span className="text-xs">Generating QR Code...</span>
            </div>
          )}

          {/* Passcode Badge Overlay if Protected */}
          {passcode && (
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-stone-900 text-amber-300 font-mono text-[10px] font-semibold px-3 py-1 rounded-full border border-amber-400/40 shadow-md">
              Passcode: {passcode}
            </div>
          )}
        </div>

        {/* Link preview */}
        <div className="pt-1">
          <p className="text-[11px] font-mono text-stone-500 truncate max-w-xs mx-auto bg-stone-50 py-1 px-3 rounded-lg border border-stone-200">
            {fullUrl}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={handleCopyLink}
            className="w-full text-xs font-medium cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                Copy Link
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="gold"
            size="md"
            onClick={handleDownloadPNG}
            className="w-full text-xs font-medium shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download PNG
          </Button>
        </div>

        {/* Helper Footer */}
        <p className="text-[10px] text-stone-400 italic">
          Perfect for printing on physical Save-the-Date cards or reception welcome signs.
        </p>
      </div>
    </div>
  );
}

export function QRCodeTriggerButton({
  url,
  coupleNames,
  weddingDate,
  passcode,
  variant = "outline",
  size = "sm",
  className,
}: {
  url: string;
  coupleNames: string;
  weddingDate?: Date | string | null;
  passcode?: string | null;
  variant?: "outline" | "gold" | "secondary" | "ghost";
  size?: "sm" | "md";
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={() => setIsOpen(true)}
        className={cn("gap-1.5 cursor-pointer", className)}
        title="View & Download QR Code"
      >
        <QrCode className="w-3.5 h-3.5" />
        <span>QR Code</span>
      </Button>

      <QRCodeModal
        url={url}
        coupleNames={coupleNames}
        weddingDate={weddingDate}
        passcode={passcode}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

export default QRCodeModal;
