"use client";

import React, { useState, useMemo } from "react";
import {
  Share2,
  Copy,
  Check,
  X,
  MessageCircle,
  MessageSquare,
  QrCode,
  Sparkles,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QRCodeModal } from "@/components/shared/qr-code-modal";
import { toast } from "sonner";
import { cn, formatDate } from "@/lib/utils";

export interface ShareInviteModalProps {
  coupleNames: string;
  slug: string;
  weddingDate?: Date | string | null;
  venueName?: string | null;
  passcode?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ShareInviteModal({
  coupleNames,
  slug,
  weddingDate,
  venueName,
  passcode,
  isOpen,
  onClose,
}: ShareInviteModalProps) {
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const [isCopiedMessage, setIsCopiedMessage] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Compute invitation URL synchronously without useEffect
  const invitationUrl = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/i/${slug}`;
    }
    return `/i/${slug}`;
  }, [slug]);

  // Formulate elegant personalized WhatsApp / SMS message
  const dateFormatted = weddingDate ? ` on ${formatDate(weddingDate)}` : "";
  const venueFormatted = venueName ? ` at ${venueName}` : "";
  const passcodeFormatted = passcode ? `\n🔑 Passcode: ${passcode}` : "";

  const shareText = `We're getting married! 💕\n\nYou are cordially invited to celebrate the wedding of ${coupleNames}${dateFormatted}${venueFormatted}.\n\nPlease explore our ceremony itinerary, photos, and RSVP online here:\n${invitationUrl}${passcodeFormatted}\n\nWe cannot wait to celebrate with you!`;

  // WhatsApp link
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  // SMS link
  const smsUrl = `sms:?&body=${encodeURIComponent(shareText)}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setIsCopiedLink(true);
      toast.success("Invitation URL copied to clipboard!");
      setTimeout(() => setIsCopiedLink(false), 2500);
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setIsCopiedMessage(true);
      toast.success("Personalized invite message copied!");
      setTimeout(() => setIsCopiedMessage(false), 2500);
    } catch {
      toast.error("Failed to copy message.");
    }
  };

  // Native Web Share API
  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${coupleNames} Wedding Invitation`,
          text: shareText,
          url: invitationUrl,
        });
        toast.success("Shared successfully!");
      } catch {
        // User cancelled share dialog
      }
    } else {
      handleCopyLink();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal Card */}
        <div className="relative z-10 w-full max-w-md rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 text-center shadow-2xl space-y-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-1.5">
            <div className="inline-flex items-center justify-center gap-1 text-[11px] uppercase tracking-widest text-amber-800 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Share Wedding Invitation</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900">
              {coupleNames}
            </h3>
            <p className="text-xs text-stone-500">
              Send your private digital wedding link to guests with one tap.
            </p>
          </div>

          {/* 1-Tap Quick Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* SMS / iMessage */}
            <a
              href={smsUrl}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>SMS</span>
            </a>

            {/* More Apps */}
            <button
              type="button"
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 font-medium text-xs transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-amber-700" />
              <span>More</span>
            </button>
          </div>

          {/* Secondary Actions Row */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="w-full text-xs font-medium cursor-pointer"
            >
              {isCopiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                  Link Copied!
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
              variant="outline"
              size="sm"
              onClick={() => setShowQrModal(true)}
              className="w-full text-xs font-medium cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 mr-1.5 text-amber-700" />
              View QR Code
            </Button>
          </div>

          {/* Message Preview Box */}
          <div className="text-left rounded-2xl bg-[#faf8f5] p-4 border border-stone-200/90 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500">
                Message Preview
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-[10px] text-amber-700 hover:text-amber-900 font-medium flex items-center gap-1 cursor-pointer"
              >
                {isCopiedMessage ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy Text
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-stone-600 whitespace-pre-line line-clamp-4 font-sans leading-relaxed">
              {shareText}
            </p>
          </div>

          {passcode && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-stone-600 bg-stone-100 py-2 px-3 rounded-xl border border-stone-200/80">
              <Lock className="w-3.5 h-3.5 text-stone-500" />
              <span>Passcode protection active: </span>
              <span className="font-mono font-semibold text-stone-900">{passcode}</span>
            </div>
          )}
        </div>
      </div>

      {/* Sub-modal: QR code */}
      <QRCodeModal
        url={invitationUrl}
        coupleNames={coupleNames}
        weddingDate={weddingDate}
        passcode={passcode}
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
      />
    </>
  );
}

export function ShareTriggerButton({
  coupleNames,
  slug,
  weddingDate,
  venueName,
  passcode,
  variant = "outline",
  size = "sm",
  className,
}: {
  coupleNames: string;
  slug: string;
  weddingDate?: Date | string | null;
  venueName?: string | null;
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
        title="Share Invitation"
      >
        <Share2 className="w-3.5 h-3.5" />
        <span>Share</span>
      </Button>

      <ShareInviteModal
        coupleNames={coupleNames}
        slug={slug}
        weddingDate={weddingDate}
        venueName={venueName}
        passcode={passcode}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

export default ShareInviteModal;
