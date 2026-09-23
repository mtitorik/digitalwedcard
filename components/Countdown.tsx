"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Calendar, CalendarPlus, Download, ExternalLink } from "lucide-react";
import { weddingData } from "../data/weddingData";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

interface CountdownProps {
  targetDateISO?: string;
}

export const Countdown: React.FC<CountdownProps> = ({
  targetDateISO = weddingData.couple.targetDateISO,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  useEffect(() => {
    const targetTime = new Date(targetDateISO).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateISO]);

  // Google Calendar URL
  const googleCalendarUrl = useMemo(() => {
    const { title, description, location, start, end } = weddingData.calendar;
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      details: description,
      location: location,
      dates: `${start}/${end}`,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }, []);

  // Download .ics file
  const downloadIcsFile = () => {
    const { title, description, location, start, end } = weddingData.calendar;
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Sajedul and Sadia//Wedding Reception//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `UID:wedding-sajedul-sadia-${Date.now()}@celebration`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Sajedul_and_Sadia_Wedding_Reception.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowCalendarMenu(false);
  };

  const padZero = (n: number) => n.toString().padStart(2, "0");

  return (
    <section className="relative w-full py-8 md:py-12 px-4 sm:px-6 flex flex-col items-center justify-center text-center">
      {/* Decorative floral/accent divider */}
      <div className="flex items-center gap-3 mb-6 opacity-70">
        <span className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-amber-400" />
        <span className="font-serif italic text-amber-300 text-xs sm:text-sm tracking-widest uppercase">
          Countdown to the Celebration
        </span>
        <span className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-amber-400" />
      </div>

      {/* Countdown Badges */}
      {timeLeft.isPast ? (
        <div className="p-4 sm:p-6 rounded-2xl bg-amber-400/15 border border-amber-300/40 text-amber-100 font-serif text-xl sm:text-2xl">
          Today We Celebrate Our Forever! ✨
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 w-full max-w-[360px] sm:max-w-md md:max-w-lg">
          {[
            { label: "Days", value: padZero(timeLeft.days) },
            { label: "Hours", value: padZero(timeLeft.hours) },
            { label: "Mins", value: padZero(timeLeft.minutes) },
            { label: "Secs", value: padZero(timeLeft.seconds) },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-5 rounded-2xl bg-[#062d22] border border-amber-300/25 shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-light text-amber-200 tracking-tight drop-shadow-sm">
                {item.value}
              </span>
              <span className="text-[9px] sm:text-xs uppercase font-sans tracking-widest text-amber-300/80 mt-1 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* "Add to Calendar" Interaction */}
      <div className="relative mt-6 sm:mt-8">
        <button
          id="add-to-calendar-btn"
          onClick={() => setShowCalendarMenu((prev) => !prev)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/40 text-amber-200 text-xs sm:text-sm font-sans font-medium tracking-wider uppercase transition-all duration-200 hover:scale-102 active:scale-98 min-h-[44px]"
          aria-expanded={showCalendarMenu}
        >
          <CalendarPlus className="w-4 h-4 text-amber-300" />
          <span>Add to Calendar</span>
        </button>

        {/* Dropdown options for Google Calendar vs iCal */}
        {showCalendarMenu && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-60 p-2 rounded-2xl bg-[#07241c] border border-amber-400/30 shadow-2xl z-30 flex flex-col gap-1 text-left animate-in fade-in zoom-in-95">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowCalendarMenu(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-amber-400/15 text-amber-100 text-xs sm:text-sm font-sans transition-colors min-h-[44px]"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>Google Calendar</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-amber-300/60" />
            </a>

            <button
              onClick={downloadIcsFile}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-amber-400/15 text-amber-100 text-xs sm:text-sm font-sans transition-colors text-left min-h-[44px]"
            >
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-amber-300" />
                <span>Apple / Outlook (.ics)</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
