import React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow, Heading } from "./typography";

// ============================================================================
// 1. SectionWrapper Container
// ============================================================================

export type SectionBg = "white" | "stone" | "dark" | "parchment" | "transparent";
export type ContainerSize = "7xl" | "6xl" | "5xl" | "4xl" | "3xl" | "full";
export type SectionPadding = "none" | "compact" | "normal" | "generous";

export interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
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

export const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  (
    {
      id,
      fullScreen = false,
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
          fullScreen && "min-h-screen min-h-[100dvh] flex flex-col justify-center",
          bordered && "border-t border-b border-stone-200/80",
          className
        )}
        {...props}
      >
        <div className={cn("mx-auto w-full", containerStyles[containerSize])}>
          {children}
        </div>
      </section>
    );
  }
);
SectionWrapper.displayName = "SectionWrapper";

// ============================================================================
// 2. SectionHeader (Standardized Title Block)
// ============================================================================

export interface SectionHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left" | "right";
  action?: React.ReactNode;
}

export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      eyebrow,
      title,
      description,
      align = "center",
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
            <Eyebrow ornament={isCenter}>{eyebrow}</Eyebrow>
          </div>
        )}

        <Heading level="h2" className="tracking-tight">
          {title}
        </Heading>

        {description && (
          <p className="text-sm sm:text-base text-stone-500 leading-relaxed font-sans">
            {description}
          </p>
        )}

        {action && <div className="pt-2">{action}</div>}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

// ============================================================================
// 3. DecorativeDivider (Stationery Flourish)
// ============================================================================

export type DividerVariant = "diamond" | "heart" | "sparkle" | "double" | "line";

export interface DecorativeDividerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DividerVariant;
}

export const DecorativeDivider = React.forwardRef<
  HTMLDivElement,
  DecorativeDividerProps
>(({ variant = "diamond", className, ...props }, ref) => {
  if (variant === "double") {
    return (
      <div
        ref={ref}
        role="separator"
        className={cn("my-8 flex flex-col items-center gap-1", className)}
        {...props}
      >
        <div className="h-px w-24 sm:w-36 bg-amber-300/60" />
        <div className="h-px w-16 sm:w-24 bg-amber-300/60" />
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
        <div className="h-px w-24 sm:w-48 bg-stone-300" />
      </div>
    );
  }

  const renderIcon = () => {
    switch (variant) {
      case "heart":
        return <span className="text-amber-700 text-xs">♥</span>;
      case "sparkle":
        return <span className="text-amber-700 text-xs">✦</span>;
      case "diamond":
      default:
        return <span className="text-amber-700 text-[10px]">◇</span>;
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
      <div className="h-px w-16 sm:w-28 bg-amber-300/60" />
      <span className="shrink-0">{renderIcon()}</span>
      <div className="h-px w-16 sm:w-28 bg-amber-300/60" />
    </div>
  );
});
DecorativeDivider.displayName = "DecorativeDivider";
