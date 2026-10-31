import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. CardFrame Primitive
// ============================================================================

export type CardFrameVariant = "double-line" | "simple" | "elevated";
export type MarginSpacing = "none" | "sm" | "md" | "lg";

export interface CardFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardFrameVariant;
  innerMargin?: MarginSpacing;
  outerMargin?: MarginSpacing;
}

const outerMarginStyles: Record<MarginSpacing, string> = {
  none: "m-0",
  sm: "m-2 sm:m-3",
  md: "m-3 sm:m-5",
  lg: "m-4 sm:m-8",
};

const innerMarginStyles: Record<MarginSpacing, string> = {
  none: "p-0",
  sm: "p-3 sm:p-5",
  md: "p-5 sm:p-8",
  lg: "p-8 sm:p-12",
};

export const CardFrame = React.forwardRef<HTMLDivElement, CardFrameProps>(
  (
    {
      variant = "simple",
      innerMargin = "md",
      outerMargin = "none",
      className,
      children,
      ...props
    },
    ref
  ) => {
    if (variant === "double-line") {
      return (
        <div
          ref={ref}
          className={cn(
            "relative rounded-2xl border border-stone-300/80 bg-white p-2 sm:p-3",
            outerMarginStyles[outerMargin],
            className
          )}
          {...props}
        >
          <div
            className={cn(
              "rounded-xl border border-stone-200/90 h-full w-full",
              innerMarginStyles[innerMargin]
            )}
          >
            {children}
          </div>
        </div>
      );
    }

    if (variant === "elevated") {
      return (
        <div
          ref={ref}
          className={cn(
            "relative rounded-3xl border border-stone-200/80 bg-white shadow-xl shadow-stone-900/5",
            outerMarginStyles[outerMargin],
            innerMarginStyles[innerMargin],
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Default: "simple"
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-2xl border border-stone-200/90 bg-white shadow-xs",
          outerMarginStyles[outerMargin],
          innerMarginStyles[innerMargin],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardFrame.displayName = "CardFrame";

// ============================================================================
// 2. ArchedImage Primitive
// ============================================================================

export type ArchAspectRatio = "3/4" | "4/5" | "2/3" | "1/1" | "auto";

export interface ArchedImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: ArchAspectRatio;
  loading?: "lazy" | "eager";
  priority?: boolean;
}

const aspectClassMap: Record<ArchAspectRatio, string> = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "2/3": "aspect-[2/3]",
  "1/1": "aspect-square",
  auto: "",
};

export const ArchedImage = React.forwardRef<HTMLDivElement, ArchedImageProps>(
  (
    {
      src,
      alt,
      aspectRatio = "3/4",
      loading = "lazy",
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
          "group relative overflow-hidden rounded-t-full border border-stone-200/90 bg-stone-100 shadow-sm",
          aspectClassMap[aspectRatio],
          className
        )}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : loading}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* 1px inner hairline border overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-t-full border border-black/5 z-10"
        />

        {children && <div className="relative z-20 h-full w-full">{children}</div>}
      </div>
    );
  }
);
ArchedImage.displayName = "ArchedImage";
