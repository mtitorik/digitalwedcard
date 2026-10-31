import React from "react";
import { cn } from "@/lib/utils";
import { Heart, Sparkles } from "lucide-react";
import { Heading, Eyebrow, Paragraph } from "./typography";

// ==========================================
// 1. SectionWrapper Container
// ==========================================

export type SectionBg =
  | "white"
  | "stone"
  | "dark"
  | "parchment"
  | "gold-tint"
  | "transparent";

export type ContainerSize = "7xl" | "6xl" | "5xl" | "4xl" | "3xl" | "full";
export type SectionPadding = "none" | "compact" | "normal" | "generous";

export interface SectionWrapperProps
  extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  fullScreen?: boolean;
  bg?: SectionBg;
  containerSize?: ContainerSize;
  padding?: SectionPadding;
  bordered?: boolean;
}

const bgStyles: Record<SectionBg, string> = {
  white: "bg-white text-stone-900",
  stone: "bg-stone-100/60 text-stone-900",
  dark: "bg-stone-900 text-stone-100",
  parchment: "bg-stone-50 text-stone-900",
  "gold-tint":
    "bg-gradient-to-b from-amber-50/50 via-white to-stone-50 text-stone-900",
  transparent: "bg-transparent",
};

const containerStyles: Record<ContainerSize, string> = {
  "7xl": "max-w-7xl",
  "6xl": "max-w-6xl",
  "5xl": "max-w-5xl",
  "4xl": "max-w-4xl",
  "3xl": "max-w-3xl",
  full: "max-w-full",
};

const paddingStyles: Record<SectionPadding, string> = {
  none: "py-0",
  compact: "py-12 sm:py-16 px-6",
  normal: "py-20 sm:py-24 px-6",
  generous: "py-28 sm:py-36 px-6",
};

export const SectionWrapper = React.forwardRef<
  HTMLElement,
  SectionWrapperProps
>(
  (
    {
      id,
      fullScreen = true,
      bg = "white",
      containerSize = "7xl",
      padding = "normal",
      bordered = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative w-full scroll-mt-24",
          bgStyles[bg],
          paddingStyles[padding],
          fullScreen &&
            "min-h-screen min-h-[100dvh] flex flex-col justify-center",
          bordered && "border-t border-b border-stone-200/80",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "mx-auto w-full",
            containerStyles[containerSize]
          )}
        >
          {children}
        </div>
      </section>
    );
  }
);
SectionWrapper.displayName = "SectionWrapper";

// ==========================================
// 2. SectionHeader (Standardized Title Block)
// ==========================================

export interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: React.ReactNode;
  eyebrowIcon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left" | "right";
  tone?: "dark" | "light";
  action?: React.ReactNode;
}

export const SectionHeader = React.forwardRef<
  HTMLDivElement,
  SectionHeaderProps
>(
  (
    {
      eyebrow,
      eyebrowIcon,
      title,
      description,
      align = "center",
      tone = "dark",
      action,
      className,
      ...props
    },
    ref
  ) => {
    const isCenter = align === "center";
    const isRight = align === "right";

    return (
      <div
        ref={ref}
        className={cn(
          "mb-12 sm:mb-16 space-y-3",
          isCenter && "text-center mx-auto max-w-2xl",
          isRight && "text-right ml-auto max-w-2xl",
          !isCenter && !isRight && "text-left max-w-2xl",
          className
        )}
        {...props}
      >
        {eyebrow && (
          <div>
            <Eyebrow
              tone={tone === "light" ? "light" : "gold"}
              icon={eyebrowIcon}
              ornament={isCenter}
            >
              {eyebrow}
            </Eyebrow>
          </div>
        )}

        <Heading
          as="h2"
          size="2xl"
          tone={tone === "light" ? "light" : "dark"}
          className="tracking-tight"
        >
          {title}
        </Heading>

        {description && (
          <Paragraph
            size="base"
            tone={tone === "light" ? "muted" : "stone"}
            className="leading-relaxed"
          >
            {description}
          </Paragraph>
        )}

        {action && <div className="pt-2">{action}</div>}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

// ==========================================
// 3. DecorativeDivider (Stationery Flourish)
// ==========================================

export type DividerVariant =
  | "diamond"
  | "heart"
  | "sparkle"
  | "double"
  | "line"
  | "monogram";

export interface DecorativeDividerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DividerVariant;
  tone?: "gold" | "stone" | "white" | "muted";
  monogramInitials?: string;
}

export const DecorativeDivider = React.forwardRef<
  HTMLDivElement,
  DecorativeDividerProps
>(
  (
    {
      variant = "diamond",
      tone = "gold",
      monogramInitials,
      className,
      ...props
    },
    ref
  ) => {
    const toneMap = {
      gold: {
        line: "bg-amber-300/60 dark:bg-amber-700/60",
        icon: "text-amber-600 dark:text-amber-400",
      },
      stone: {
        line: "bg-stone-300",
        icon: "text-stone-700",
      },
      white: {
        line: "bg-white/30",
        icon: "text-white",
      },
      muted: {
        line: "bg-stone-200",
        icon: "text-stone-400",
      },
    };

    const currentTone = toneMap[tone];

    if (variant === "double") {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn("my-8 flex flex-col items-center gap-1", className)}
          {...props}
        >
          <div className={cn("h-px w-24 sm:w-36", currentTone.line)} />
          <div className={cn("h-px w-16 sm:w-24", currentTone.line)} />
        </div>
      );
    }

    if (variant === "line") {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn("my-8 flex items-center justify-center", className)}
          {...props}
        >
          <div className={cn("h-px w-24 sm:w-48", currentTone.line)} />
        </div>
      );
    }

    const renderIcon = () => {
      switch (variant) {
        case "heart":
          return <Heart className={cn("w-3.5 h-3.5 fill-current", currentTone.icon)} />;
        case "sparkle":
          return <Sparkles className={cn("w-3.5 h-3.5", currentTone.icon)} />;
        case "monogram":
          return (
            <span
              className={cn(
                "font-serif text-xs uppercase tracking-widest px-2 font-medium",
                currentTone.icon
              )}
            >
              {monogramInitials || "✦"}
            </span>
          );
        case "diamond":
        default:
          return (
            <span
              aria-hidden="true"
              className={cn("text-[9px] select-none", currentTone.icon)}
            >
              ♦
            </span>
          );
      }
    };

    return (
      <div
        ref={ref}
        role="separator"
        className={cn(
          "my-8 flex items-center justify-center gap-3 select-none",
          className
        )}
        {...props}
      >
        <div className={cn("h-px w-16 sm:w-28", currentTone.line)} />
        <span className="shrink-0">{renderIcon()}</span>
        <div className={cn("h-px w-16 sm:w-28", currentTone.line)} />
      </div>
    );
  }
);
DecorativeDivider.displayName = "DecorativeDivider";
