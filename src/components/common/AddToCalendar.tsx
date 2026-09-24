"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  CalendarPlus,
  ChevronDown,
  Download,
  ExternalLink,
  Check,
} from "lucide-react";

export interface CalendarEventDetails {
  title: string;
  description?: string;
  location?: string;
  /** ISO string or standard date time parseable string */
  startDate: string | Date;
  /** ISO string or standard date time parseable string (defaults to +4 hours if omitted) */
  endDate?: string | Date;
}

export interface AddToCalendarProps {
  event: CalendarEventDetails;
  className?: string;
  buttonText?: string;
  variant?: "dropdown" | "button-group" | "compact";
}

/**
 * Format a Date object into UTC iCalendar format: YYYYMMDDTHHmmssZ
 */
function formatDateToUtcString(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    "T" +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    "Z"
  );
}

export const AddToCalendar: React.FC<AddToCalendarProps> = ({
  event,
  className = "",
  buttonText = "Add to Calendar",
  variant = "dropdown",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const start = new Date(event.startDate);
  // Default to start + 4 hours if no end date provided
  const end = event.endDate
    ? new Date(event.endDate)
    : new Date(start.getTime() + 4 * 60 * 60 * 1000);

  const startUtc = !isNaN(start.getTime())
    ? formatDateToUtcString(start)
    : "";
  const endUtc = !isNaN(end.getTime()) ? formatDateToUtcString(end) : "";

  // 1. Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${startUtc}/${endUtc}&details=${encodeURIComponent(
    event.description || ""
  )}&location=${encodeURIComponent(event.location || "")}`;

  // 2. Outlook Web URL
  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(
    event.title
  )}&startdt=${start.toISOString()}&enddt=${end.toISOString()}&body=${encodeURIComponent(
    event.description || ""
  )}&location=${encodeURIComponent(event.location || "")}`;

  // 3. Downloadable .ics File Generator
  const handleDownloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//DigitalWedCards//Wedding Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:wedding-${Date.now()}@digitalwedcards.com`,
      `DTSTAMP:${formatDateToUtcString(new Date())}`,
      `DTSTART:${startUtc}`,
      `DTEND:${endUtc}`,
      `SUMMARY:${event.title.replace(/\n/g, "\\n")}`,
      `DESCRIPTION:${(event.description || "").replace(/\n/g, "\\n")}`,
      `LOCATION:${(event.location || "").replace(/\n/g, "\\n")}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setIsOpen(false);
    }, 1500);
  };

  if (variant === "button-group") {
    return (
      <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
        <a
          href={googleCalendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:border-amber-400 hover:text-amber-600 transition-all shadow-sm"
        >
          <Calendar className="w-4 h-4 text-blue-500" />
          <span>Google Calendar</span>
          <ExternalLink className="w-3 h-3 text-stone-400" />
        </a>

        <button
          onClick={handleDownloadIcs}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:border-amber-400 hover:text-amber-600 transition-all shadow-sm"
        >
          {downloadSuccess ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Download className="w-4 h-4 text-amber-500" />
          )}
          <span>Apple / iCal (.ics)</span>
        </button>

        <a
          href={outlookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:border-amber-400 hover:text-amber-600 transition-all shadow-sm"
        >
          <CalendarPlus className="w-4 h-4 text-cyan-600" />
          <span>Outlook</span>
          <ExternalLink className="w-3 h-3 text-stone-400" />
        </a>
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-950 font-serif text-sm font-semibold tracking-wide shadow-md hover:bg-stone-800 dark:hover:bg-amber-300 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
      >
        <CalendarPlus className="w-4 h-4" />
        <span>{buttonText}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-64 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border border-stone-200 dark:border-stone-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-100 dark:border-stone-800 mb-1">
            Select Calendar
          </div>

          {/* Google Calendar */}
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Google Calendar</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>

          {/* Apple Calendar / iCal (.ics) */}
          <button
            onClick={handleDownloadIcs}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              {downloadSuccess ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Download className="w-4 h-4 text-amber-500" />
              )}
              <span>Apple Calendar (.ics)</span>
            </div>
            <span className="text-[10px] text-stone-400">Download</span>
          </button>

          {/* Outlook Online */}
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-stone-700 dark:text-stone-200 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <CalendarPlus className="w-4 h-4 text-cyan-500" />
              <span>Outlook Calendar</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>
      )}
    </div>
  );
};
