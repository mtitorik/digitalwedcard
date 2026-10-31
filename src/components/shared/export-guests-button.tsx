"use client";

import React, { useState } from "react";
import { FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface RsvpExportRecord {
  id: string;
  guestName: string;
  guestEmail?: string | null;
  guestPhone?: string | null;
  attendance: string;
  additionalGuestsCount: number;
  message?: string | null;
  createdAt: Date | string;
}

export interface ExportGuestsButtonProps {
  coupleTitle: string;
  rsvps: RsvpExportRecord[];
  variant?: "outline" | "gold" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  buttonText?: string;
}

// Safely escape CSV field following RFC 4180
function escapeCsvValue(val: unknown): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export function ExportGuestsButton({
  coupleTitle,
  rsvps,
  variant = "outline",
  size = "sm",
  className,
  buttonText = "Export to CSV",
}: ExportGuestsButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    if (!rsvps || rsvps.length === 0) {
      toast.info("No RSVP records available to export yet.");
      return;
    }

    setIsExporting(true);

    try {
      // 1. Headers
      const headers = [
        "Guest Name",
        "Attendance Status",
        "Party Headcount (Total)",
        "Additional Guests (+1s)",
        "Email Address",
        "Phone Number",
        "Dietary & Heartfelt Message",
        "Response Date",
      ];

      // 2. Rows
      const rows = rsvps.map((r) => {
        const isAttending = r.attendance === "ATTENDING";
        const headcount = isAttending ? 1 + (r.additionalGuestsCount || 0) : 0;
        const statusLabel =
          r.attendance === "ATTENDING"
            ? "Attending"
            : r.attendance === "DECLINED"
            ? "Declined"
            : "Tentative";

        const formattedDate = new Date(r.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return [
          escapeCsvValue(r.guestName),
          escapeCsvValue(statusLabel),
          escapeCsvValue(headcount),
          escapeCsvValue(r.additionalGuestsCount || 0),
          escapeCsvValue(r.guestEmail || ""),
          escapeCsvValue(r.guestPhone || ""),
          escapeCsvValue(r.message || ""),
          escapeCsvValue(formattedDate),
        ].join(",");
      });

      // 3. Assemble CSV with UTF-8 BOM (\uFEFF) for Excel compatibility
      const csvContent = "\uFEFF" + [headers.map(escapeCsvValue).join(","), ...rows].join("\r\n");

      // 4. Trigger client-side file download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const cleanName = coupleTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const dateStamp = new Date().toISOString().split("T")[0];

      link.href = url;
      link.setAttribute("download", `${cleanName}-rsvps-${dateStamp}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      const attendingCount = rsvps
        .filter((r) => r.attendance === "ATTENDING")
        .reduce((sum, r) => sum + 1 + (r.additionalGuestsCount || 0), 0);

      toast.success(
        `Exported ${rsvps.length} RSVP records (${attendingCount} attending guests) to CSV!`
      );
    } catch (err) {
      console.error("CSV Export error:", err);
      toast.error("Failed to generate CSV export. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleExport}
      isLoading={isExporting}
      className={cn("gap-1.5 cursor-pointer", className)}
      title="Download guest list as CSV for caterers & coordinators"
    >
      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
      <span>{buttonText}</span>
    </Button>
  );
}

export default ExportGuestsButton;
