import React from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, ExternalLink, Sparkles } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

export type ItineraryCardVariant = "card" | "timeline" | "minimal";

export interface EventItineraryCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  date?: Date | string;
  startTime: string;
  endTime?: string;
  venueName: string;
  address: string;
  googleMapsUrl: string;
  appleMapsUrl?: string;
  stepNumber?: number | string;
  dressCode?: string;
  description?: string;
  accentColor?: string;
  variant?: ItineraryCardVariant;
}

export const EventItineraryCard = React.forwardRef<
  HTMLDivElement,
  EventItineraryCardProps
>(
  (
    {
      title,
      date,
      startTime,
      endTime,
      venueName,
      address,
      googleMapsUrl,
      appleMapsUrl,
      stepNumber,
      dressCode,
      description,
      accentColor = "#d97706",
      variant = "card",
      className,
      ...props
    },
    ref
  ) => {
    // Variant: "minimal"
    if (variant === "minimal") {
      return (
        <div
          ref={ref}
          className={cn(
            "p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3",
            className
          )}
          {...props}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              {title}
            </h3>
            <span className="font-mono text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60 font-medium">
              {startTime}
              {endTime ? ` - ${endTime}` : ""}
            </span>
          </div>

          <p className="text-xs text-stone-500 font-sans">{venueName}</p>

          <Link
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-800 font-medium"
          >
            <span>Open in Maps</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      );
    }

    // Variant: "timeline"
    if (variant === "timeline") {
      return (
        <div
          ref={ref}
          className={cn("relative pl-8 pb-10 border-l border-amber-200/80 last:pb-0", className)}
          {...props}
        >
          {/* Timeline node marker */}
          <span
            aria-hidden="true"
            className="absolute -left-2.5 top-0 flex items-center justify-center w-5 h-5 rounded-full bg-white border-2 shadow-xs"
            style={{ borderColor: accentColor }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
          </span>

          <div className="space-y-3">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-mono text-xs font-semibold text-amber-800">
                {startTime}
                {endTime ? ` - ${endTime}` : ""}
              </span>
              {date && (
                <span className="text-xs text-stone-400">• {formatDate(date)}</span>
              )}
            </div>

            <h3 className="font-serif text-xl font-semibold text-stone-900">
              {title}
            </h3>

            <div className="space-y-1 text-xs text-stone-600">
              <p className="font-medium text-stone-900">{venueName}</p>
              <p className="text-stone-500">{address}</p>
            </div>

            {dressCode && (
              <div className="inline-flex items-center gap-1.5 text-[11px] font-sans text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Dress Code: {dressCode}</span>
              </div>
            )}

            <div className="pt-2">
              <Link
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-800"
              >
                <span>Navigate with Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // Default Variant: "card" (Editorial framed wedding ceremony card)
    return (
      <div
        ref={ref}
        className={cn(
          "group relative rounded-3xl bg-white border border-stone-200/90 p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between",
          className
        )}
        {...props}
      >
        <div className="space-y-5">
          {/* Header row with step badge */}
          <div className="flex items-center justify-between">
            {stepNumber !== undefined ? (
              <span
                className="w-8 h-8 rounded-full text-white text-xs font-serif font-bold flex items-center justify-center shadow-xs"
                style={{ backgroundColor: accentColor }}
              >
                {stepNumber}
              </span>
            ) : (
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            )}

            {dressCode && (
              <span className="text-[10px] uppercase tracking-widest font-mono text-stone-500 bg-stone-100/80 px-2.5 py-1 rounded-full border border-stone-200/60">
                {dressCode}
              </span>
            )}
          </div>

          <div>
            <h3 className="font-serif text-2xl font-semibold text-stone-900 leading-snug group-hover:text-amber-800 transition-colors">
              {title}
            </h3>

            {description && (
              <p className="text-xs text-stone-500 mt-1.5 leading-relaxed font-sans">
                {description}
              </p>
            )}
          </div>

          {/* Schedule & Venue Details */}
          <div className="space-y-2.5 text-xs text-stone-600 pt-3 border-t border-stone-100">
            {date && (
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{formatDate(date)}</span>
              </div>
            )}

            <div className="flex items-center gap-2.5 font-mono text-[11px] text-stone-700">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {startTime}
                {endTime ? ` - ${endTime}` : ""}
              </span>
            </div>

            <div className="flex items-start gap-2.5 pt-1">
              <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block font-serif text-sm">
                  {venueName}
                </strong>
                <span className="text-stone-500 text-[11px] leading-tight block mt-0.5">
                  {address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button: One-Tap Google Maps Navigation */}
        <div className="pt-6 mt-5 border-t border-stone-100 flex flex-col gap-2">
          <Link
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider border border-stone-200 hover:border-amber-300 bg-stone-50 hover:bg-amber-50/50 text-stone-800 hover:text-amber-900 transition-all shadow-2xs"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>

          {appleMapsUrl && (
            <Link
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-[11px] text-stone-400 hover:text-stone-700 py-1"
            >
              <span>Or Apple Maps</span>
            </Link>
          )}
        </div>
      </div>
    );
  }
);
EventItineraryCard.displayName = "EventItineraryCard";

