"use client";

import React, { useState } from "react";
import {
  Gift,
  Plane,
  ExternalLink,
  Copy,
  Check,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface RegistryItem {
  id: string;
  type: "honeymoon" | "store" | "cash";
  title: string;
  subtitle?: string;
  url?: string;
  badge?: string;
  accountDetails?: {
    bankOrPlatform: string;
    accountName: string;
    accountNumberOrHandle: string;
  };
}

export interface GiftRegistrySectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showHeader?: boolean;
  title?: string;
  eyebrow?: string;
  description?: string;
  items?: RegistryItem[];
  primaryColor?: string;
  accentColor?: string;
}

const defaultRegistries: RegistryItem[] = [
  {
    id: "honeymoon",
    type: "honeymoon",
    title: "Amalfi Coast Honeymoon Fund",
    subtitle:
      "Contributions toward our sunset sailing excursion in Positano and quiet dinners overlooking the Mediterranean cliffs.",
    badge: "Honeymoon Fund",
    accountDetails: {
      bankOrPlatform: "Zelle / Venmo",
      accountName: "Sarah & Alexander Vance",
      accountNumberOrHandle: "sarah.alex@example.com",
    },
  },
  {
    id: "crate-barrel",
    type: "store",
    title: "Crate & Barrel Home Collection",
    subtitle: "Ceramics, kitchenware, and heirloom dining pieces for our new home together in Brooklyn.",
    badge: "Home Registry",
    url: "https://www.crateandbarrel.com",
  },
  {
    id: "amazon-registry",
    type: "store",
    title: "Amazon Curated Wedding Registry",
    subtitle: "Everyday essentials, travel luggage, and books for our shared library.",
    badge: "Amazon Registry",
    url: "https://www.amazon.com/wedding",
  },
];

export function GiftRegistrySection({
  showHeader = false,
  title = "Wedding Registry & Wishing Well",
  eyebrow = "Gifts & Blessings",
  description = "Your love, laughter, and presence at our wedding are the greatest gifts we could ever ask for. However, should you wish to honor us with a gift, we have prepared the registries below.",
  items = defaultRegistries,
  primaryColor = "#064e3b",
  accentColor = "#d97706",
  className,
  ...props
}: GiftRegistrySectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Account details copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className={cn("w-full space-y-8", className)} {...props}>
      {showHeader && (
        <div className="text-center max-w-2xl mx-auto space-y-2">
          {eyebrow && (
            <span
              className="text-xs uppercase tracking-widest font-semibold block"
              style={{ color: accentColor }}
            >
              {eyebrow}
            </span>
          )}
          <h3 className="font-serif text-3xl font-semibold text-stone-900">
            {title}
          </h3>
          {description && (
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => {
          const isHoneymoon = item.type === "honeymoon";

          return (
            <div
              key={item.id}
              className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
                    style={{
                      backgroundColor: `${primaryColor}15`,
                      color: primaryColor,
                    }}
                  >
                    {isHoneymoon ? (
                      <Plane className="w-5 h-5" />
                    ) : (
                      <Gift className="w-5 h-5" />
                    )}
                  </div>

                  {item.badge && (
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                      style={{
                        backgroundColor: `${accentColor}12`,
                        borderColor: `${accentColor}30`,
                        color: accentColor,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Title & Description */}
                <div>
                  <h4 className="font-serif text-lg font-semibold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                      {item.subtitle}
                    </p>
                  )}
                </div>

                {/* Account Details for Cash / Honeymoon Funds */}
                {item.accountDetails && (
                  <div className="p-3.5 rounded-2xl bg-[#faf8f5] border border-stone-200/80 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-stone-400 text-[10px] uppercase tracking-wider font-semibold">
                      <span>{item.accountDetails.bankOrPlatform}</span>
                      <CreditCard className="w-3.5 h-3.5" />
                    </div>
                    <p className="font-medium text-stone-800">
                      {item.accountDetails.accountName}
                    </p>
                    <p className="font-mono text-[11px] text-stone-600 break-all">
                      {item.accountDetails.accountNumberOrHandle}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Action */}
              <div className="pt-6">
                {item.accountDetails ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleCopy(
                        item.id,
                        `${item.accountDetails?.accountName} - ${item.accountDetails?.accountNumberOrHandle}`
                      )
                    }
                    className="w-full text-xs font-medium cursor-pointer"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                        Copied to Clipboard
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-1.5" />
                        Copy Account Details
                      </>
                    )}
                  </Button>
                ) : item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full"
                  >
                    <Button
                      type="button"
                      variant="gold"
                      size="sm"
                      className="w-full text-xs font-medium shadow-xs cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <span>View Registry Online</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </a>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GiftRegistrySection;
