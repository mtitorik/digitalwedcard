import React from "react";
import { cn } from "@/lib/utils";

// ==========================================
// 1. Heading Component
// ==========================================

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingSize =
  | "display"
  | "3xl"
  | "2xl"
  | "xl"
  | "lg"
  | "md"
  | "sm"
  | "xs";
export type TextTone = "dark" | "light" | "muted" | "gold" | "stone";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel;
  size?: HeadingSize;
  tone?: TextTone;
  serif?: boolean;
  italic?: boolean;
  tracking?: "tight" | "normal" | "wide" | "widest";
}

const sizeStyles: Record<HeadingSize, string> = {
  display:
    "text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] tracking-tight",
  "3xl": "text-3xl sm:text-5xl lg:text-6xl leading-[1.12] tracking-tight",
  "2xl": "text-2xl sm:text-4xl lg:text-5xl leading-[1.18] tracking-tight",
  xl: "text-xl sm:text-3xl lg:text-4xl leading-[1.25] tracking-tight",
  lg: "text-lg sm:text-2xl lg:text-3xl leading-[1.3] tracking-normal",
  md: "text-base sm:text-xl lg:text-2xl leading-[1.35] tracking-normal",
  sm: "text-sm sm:text-lg leading-[1.4] tracking-normal",
  xs: "text-xs sm:text-sm font-semibold tracking-wide",
};

const toneStyles: Record<TextTone, string> = {
  dark: "text-stone-900",
  light: "text-white",
  muted: "text-stone-500",
  stone: "text-stone-700",
  gold: "text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800",
};

const trackingStyles: Record<"tight" | "normal" | "wide" | "widest", string> = {
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  widest: "tracking-[0.18em]",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as = "h2",
      size = "xl",
      tone = "dark",
      serif = true,
      italic = false,
      tracking = "tight",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = as;

    return (
      <Component
        ref={ref}
        className={cn(
          serif && "font-serif",
          italic && "italic",
          sizeStyles[size],
          toneStyles[tone],
          trackingStyles[tracking],
          "transition-colors duration-200",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = "Heading";

// ==========================================
// 2. Eyebrow / Tracking-Spaced Overline Label
// ==========================================

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: TextTone;
  icon?: React.ReactNode;
  ornament?: boolean;
}

export const Eyebrow = React.forwardRef<HTMLSpanElement, EyebrowProps>(
  (
    {
      tone = "gold",
      icon,
      ornament = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const eyebrowTones: Record<TextTone, string> = {
      gold: "text-amber-800 dark:text-amber-300",
      dark: "text-stone-900",
      light: "text-white/90",
      muted: "text-stone-500",
      stone: "text-stone-600",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase font-medium tracking-[0.22em] select-none",
          eyebrowTones[tone],
          className
        )}
        {...props}
      >
        {ornament && (
          <span
            aria-hidden="true"
            className="w-4 h-px bg-current opacity-60 transition-opacity"
          />
        )}
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        <span>{children}</span>
        {ornament && (
          <span
            aria-hidden="true"
            className="w-4 h-px bg-current opacity-60 transition-opacity"
          />
        )}
      </span>
    );
  }
);
Eyebrow.displayName = "Eyebrow";

// ==========================================
// 3. Body Text / Paragraph
// ==========================================

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  tone?: TextTone;
  serif?: boolean;
  leading?: "normal" | "relaxed" | "loose";
}

const paragraphSizes = {
  xs: "text-xs",
  sm: "text-xs sm:text-sm",
  base: "text-sm sm:text-base",
  lg: "text-base sm:text-lg",
  xl: "text-lg sm:text-xl",
};

const paragraphTones: Record<TextTone, string> = {
  dark: "text-stone-900",
  light: "text-stone-200",
  muted: "text-stone-400",
  stone: "text-stone-600",
  gold: "text-amber-800 dark:text-amber-300",
};

const leadingStyles = {
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
};

export const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  ParagraphProps
>(
  (
    {
      size = "base",
      tone = "stone",
      serif = false,
      leading = "relaxed",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <p
        ref={ref}
        className={cn(
          serif && "font-serif",
          paragraphSizes[size],
          paragraphTones[tone],
          leadingStyles[leading],
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);
Paragraph.displayName = "Paragraph";

// ==========================================
// 4. PullQuote / Romantic Editorial Blockquote
// ==========================================

export interface PullQuoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  author?: string;
  source?: string;
  tone?: "dark" | "light" | "gold";
  centered?: boolean;
}

export const PullQuote = React.forwardRef<HTMLQuoteElement, PullQuoteProps>(
  (
    {
      author,
      source,
      tone = "dark",
      centered = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const quoteTones = {
      dark: {
        text: "text-stone-800",
        quote: "text-amber-700/40",
        author: "text-stone-500",
        border: "border-stone-200",
      },
      light: {
        text: "text-stone-100",
        quote: "text-amber-300/40",
        author: "text-stone-300",
        border: "border-white/20",
      },
      gold: {
        text: "text-amber-900 dark:text-amber-100",
        quote: "text-amber-500/50",
        author: "text-amber-700 dark:text-amber-300",
        border: "border-amber-200 dark:border-amber-800",
      },
    };

    const currentTone = quoteTones[tone];

    return (
      <figure
        className={cn(
          "relative my-8 px-6 sm:px-10 py-6",
          centered && "text-center mx-auto max-w-2xl",
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "font-serif text-5xl sm:text-6xl select-none block leading-none mb-1",
            currentTone.quote
          )}
        >
          “
        </span>
        <blockquote
          ref={ref}
          className={cn(
            "font-serif text-lg sm:text-2xl italic leading-relaxed",
            currentTone.text
          )}
          {...props}
        >
          {children}
        </blockquote>
        {(author || source) && (
          <figcaption
            className={cn(
              "mt-4 text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2",
              centered ? "justify-center" : "justify-start",
              currentTone.author
            )}
          >
            <span
              aria-hidden="true"
              className={cn("w-6 h-px", currentTone.border)}
            />
            {author && <span>{author}</span>}
            {source && (
              <cite className="not-italic opacity-75">• {source}</cite>
            )}
            <span
              aria-hidden="true"
              className={cn("w-6 h-px", currentTone.border)}
            />
          </figcaption>
        )}
      </figure>
    );
  }
);
PullQuote.displayName = "PullQuote";

// ==========================================
// 5. Monogram / Couple Title
// ==========================================

export interface MonogramProps extends React.HTMLAttributes<HTMLDivElement> {
  first: string;
  second: string;
  separator?: string;
  tone?: "dark" | "light" | "gold";
}

export const Monogram = React.forwardRef<HTMLDivElement, MonogramProps>(
  (
    {
      first,
      second,
      separator = "&",
      tone = "dark",
      className,
      ...props
    },
    ref
  ) => {
    const toneMap = {
      dark: "text-stone-900",
      light: "text-white",
      gold: "text-amber-800 dark:text-amber-300",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 sm:gap-3 font-serif select-none",
          toneMap[tone],
          className
        )}
        {...props}
      >
        <span className="text-2xl sm:text-4xl tracking-wider font-light">
          {first}
        </span>
        <span className="text-xl sm:text-3xl text-amber-600 dark:text-amber-400 font-serif italic">
          {separator}
        </span>
        <span className="text-2xl sm:text-4xl tracking-wider font-light">
          {second}
        </span>
      </div>
    );
  }
);
Monogram.displayName = "Monogram";
