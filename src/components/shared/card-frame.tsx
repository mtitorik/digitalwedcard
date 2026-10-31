import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ==========================================
// 1. CardFrame (Multi-Border & Paper Finishes)
// ==========================================

export type PaperFinish = "porcelain" | "parchment" | "champagne" | "dark-glass" | "transparent";
export type FrameShadow = "none" | "sm" | "md" | "lg" | "luxury";

export interface CardFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  paper?: PaperFinish;
  shadow?: FrameShadow;
  doubleBorder?: boolean;
  cornerAccents?: boolean;
  padded?: boolean;
}

const paperStyles: Record<PaperFinish, string> = {
  porcelain: "bg-white border border-stone-200/90 text-stone-900",
  parchment: "bg-stone-50/95 border border-amber-900/10 text-stone-900",
  champagne:
    "bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 border border-amber-300/60 text-stone-900",
  "dark-glass":
    "bg-stone-950/80 backdrop-blur-md border border-white/15 text-white",
  transparent: "bg-transparent border border-transparent",
};

const shadowStyles: Record<FrameShadow, string> = {
  none: "shadow-none",
  sm: "shadow-xs",
  md: "shadow-md shadow-stone-900/5",
  lg: "shadow-xl shadow-stone-900/8",
  luxury:
    "shadow-[0_20px_50px_-20px_rgba(40,30,20,0.15)] ring-1 ring-black/[0.04]",
};

export const CardFrame = React.forwardRef<HTMLDivElement, CardFrameProps>(
  (
    {
      paper = "porcelain",
      shadow = "luxury",
      doubleBorder = false,
      cornerAccents = false,
      padded = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-3xl transition-all duration-300 overflow-hidden",
          paperStyles[paper],
          shadowStyles[shadow],
          padded && "p-6 sm:p-8 lg:p-10",
          className
        )}
        {...props}
      >
        {/* Double-border hairline inlay */}
        {doubleBorder && (
          <div
            aria-hidden="true"
            className="absolute inset-2 sm:inset-3 rounded-2xl border border-current opacity-15 pointer-events-none"
          />
        )}

        {/* Delicate decorative corner accents */}
        {cornerAccents && (
          <>
            <span
              aria-hidden="true"
              className="absolute top-3 left-3 w-2.5 h-2.5 border-t border-l border-current opacity-40 pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute top-3 right-3 w-2.5 h-2.5 border-t border-r border-current opacity-40 pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b border-l border-current opacity-40 pointer-events-none"
            />
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b border-r border-current opacity-40 pointer-events-none"
            />
          </>
        )}

        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
CardFrame.displayName = "CardFrame";

// ==========================================
// 2. ArchedFrame (Roman/Mediterranean Arch)
// ==========================================

export type ArchAspectRatio = "3/4" | "4/5" | "2/3" | "1/1" | "auto";

export interface ArchedFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: ArchAspectRatio;
  doubleBorder?: boolean;
  src?: string;
  alt?: string;
  priority?: boolean;
}

const aspectStyles: Record<ArchAspectRatio, string> = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "2/3": "aspect-[2/3]",
  "1/1": "aspect-square",
  auto: "",
};

export const ArchedFrame = React.forwardRef<HTMLDivElement, ArchedFrameProps>(
  (
    {
      aspectRatio = "3/4",
      doubleBorder = true,
      src,
      alt = "Wedding ceremony couple",
      priority = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-t-[140px] sm:rounded-t-[180px] rounded-b-2xl border border-stone-200/90 bg-stone-100 shadow-md",
          aspectStyles[aspectRatio],
          className
        )}
        {...props}
      >
        {/* Image background if src is provided */}
        {src && (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        {/* Double-hairline inset arch border */}
        {doubleBorder && (
          <div
            aria-hidden="true"
            className="absolute inset-2 sm:inset-3 rounded-t-[130px] sm:rounded-t-[170px] rounded-b-xl border border-white/60 pointer-events-none z-10 transition-opacity"
          />
        )}

        {/* Content slot */}
        <div className="relative z-20 h-full w-full">{children}</div>
      </div>
    );
  }
);
ArchedFrame.displayName = "ArchedFrame";

// ==========================================
// 3. DoubleLineFrame (Stationery Border)
// ==========================================

export interface DoubleLineFrameProps
  extends React.HTMLAttributes<HTMLDivElement> {
  inset?: "sm" | "md" | "lg";
  tone?: "stone" | "gold" | "white";
}

const insetPadding = {
  sm: "p-2 sm:p-3",
  md: "p-3 sm:p-5",
  lg: "p-5 sm:p-8",
};

const toneBorders = {
  stone: "border-stone-300/80 bg-white",
  gold: "border-amber-300/70 bg-white",
  white: "border-white/30 bg-transparent",
};

export const DoubleLineFrame = React.forwardRef<
  HTMLDivElement,
  DoubleLineFrameProps
>(
  (
    {
      inset = "md",
      tone = "stone",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative border rounded-2xl",
          toneBorders[tone],
          insetPadding[inset],
          className
        )}
        {...props}
      >
        <div className="border border-current opacity-30 rounded-xl p-4 sm:p-6 h-full w-full">
          {children}
        </div>
      </div>
    );
  }
);
DoubleLineFrame.displayName = "DoubleLineFrame";

// ==========================================
// 4. EmbossedCard (Letterpress Tactile Paper)
// ==========================================

export interface EmbossedCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  depth?: "subtle" | "prominent";
}

export const EmbossedCard = React.forwardRef<
  HTMLDivElement,
  EmbossedCardProps
>(({ depth = "subtle", className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl bg-stone-50 border border-stone-200/80 transition-shadow",
        depth === "subtle"
          ? "shadow-[inset_0_1px_2px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.02)]"
          : "shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_10px_24px_rgba(0,0,0,0.04)]",
        "p-6 sm:p-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
EmbossedCard.displayName = "EmbossedCard";
