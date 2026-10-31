"use client";

import React, { useState, useRef, useEffect } from "react";
import { Calendar, Download, ExternalLink, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export interface CalendarEvent {
  title: string;
  description?: string;
  location?: string;
  startDate: Date | string;
  endDate?: Date | string;
}

export interface AddToCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  event: CalendarEvent;
  variant?: "dropdown" | "outline" | "gold" | "minimal";
  size?: "sm" | "md" | "lg";
  buttonText?: string;
}

// Convert Date to UTC string format YYYYMMDDTHHMMSSZ
function formatUtcDate(dateInput: Date | string): string {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";
  return d
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, "");
}

// Format date for Outlook (ISO)
function formatIsoDate(dateInput: Date | string): string {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";
  return d.toISOString();
}

export function AddToCalendar({
  event,
  variant = "dropdown",
  size = "sm",
  buttonText = "Add to Calendar",
  className,
  ...props
}: AddToCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const startDate = new Date(event.startDate);
  // Default end date to start date + 3 hours if not provided
  const endDate = event.endDate
    ? new Date(event.endDate)
    : new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

  const startUtc = formatUtcDate(startDate);
  const endUtc = formatUtcDate(endDate);

  const title = event.title || "Wedding Celebration";
  const description = event.description || "";
  const location = event.location || "";

  // 1. Google Calendar URL
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startUtc}/${endUtc}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(location)}`;

  // 2. Outlook.com Web Calendar URL
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    title
  )}&startdt=${encodeURIComponent(formatIsoDate(startDate))}&enddt=${encodeURIComponent(
    formatIsoDate(endDate)
  )}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

  // 3. Yahoo Calendar URL
  const yahooUrl = `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(
    title
  )}&st=${startUtc}&et=${endUtc}&desc=${encodeURIComponent(
    description
  )}&in_loc=${encodeURIComponent(location)}`;

  // 4. Apple Calendar / Universal .ICS file generator
  const downloadIcs = () => {
    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Digiwedcard//Wedding Invitation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@digiwedcard.com`,
      `DTSTAMP:${formatUtcDate(new Date())}`,
      `DTSTART:${startUtc}`,
      `DTEND:${endUtc}`,
      `SUMMARY:${title.replace(/,/g, "\\,")}`,
      `DESCRIPTION:${description.replace(/\n/g, "\\n").replace(/,/g, "\\,")}`,
      `LOCATION:${location.replace(/,/g, "\\,")}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    const blob = new Blob([icsLines.join("\r\n")], {
      type: "text/calendar;charset=utf-8",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setIsOpen(false);
    toast.success("Calendar invite downloaded (.ics)!");
  };

  const sizeClasses = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-9 px-4 text-xs sm:text-sm gap-2",
    lg: "h-11 px-5 text-sm gap-2",
  };

  const variantButtonClasses = {
    dropdown:
      "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900 shadow-2xs font-medium",
    outline:
      "bg-transparent border border-stone-300 text-stone-700 hover:bg-stone-100 hover:text-stone-900",
    gold:
      "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-xs",
    minimal:
      "bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100/80 p-1.5",
  };

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left", className)} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-all select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/40",
          sizeClasses[size],
          variantButtonClasses[variant]
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Calendar className="w-3.5 h-3.5 shrink-0" />
        <span>{buttonText}</span>
        <ChevronDown
          className={cn("w-3.5 h-3.5 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:left-0 z-50 mt-2 w-56 rounded-2xl bg-white border border-stone-200/90 shadow-xl py-2 text-xs text-stone-700 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md">
          <div className="px-3.5 py-1.5 border-b border-stone-100 mb-1">
            <span className="font-serif font-semibold text-stone-900 block">
              Save the Date
            </span>
            <span className="text-[10px] text-stone-400">
              Select your preferred calendar
            </span>
          </div>

          {/* Google Calendar */}
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3.5 py-2 hover:bg-stone-50 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="font-medium group-hover:text-stone-900">Google Calendar</span>
            </div>
            <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-stone-700" />
          </a>

          {/* Apple / iCal (.ics) */}
          <button
            type="button"
            onClick={downloadIcs}
            className="w-full flex items-center justify-between px-3.5 py-2 hover:bg-stone-50 transition-colors group text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-stone-800" />
              <span className="font-medium group-hover:text-stone-900">Apple Calendar (.ics)</span>
            </div>
            <Download className="w-3 h-3 text-stone-400 group-hover:text-stone-700" />
          </button>

          {/* Outlook Web */}
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3.5 py-2 hover:bg-stone-50 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-sky-600" />
              <span className="font-medium group-hover:text-stone-900">Outlook Calendar</span>
            </div>
            <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-stone-700" />
          </a>

          {/* Yahoo Calendar */}
          <a
            href={yahooUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3.5 py-2 hover:bg-stone-50 transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              <span className="font-medium group-hover:text-stone-900">Yahoo Calendar</span>
            </div>
            <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-stone-700" />
          </a>
        </div>
      )}
    </div>
  );
}
export default AddToCalendar;
