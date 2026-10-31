import React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// 1. Heading Primitive
// ============================================================================

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
}

const levelStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight leading-[1.1] text-stone-900",
  h2: "text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-[1.18] text-stone-900",
  h3: "text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight leading-[1.25] text-stone-900",
  h4: "text-xl sm:text-2xl font-serif tracking-normal leading-[1.3] text-stone-900",
  h5: "text-lg sm:text-xl font-serif tracking-normal leading-[1.35] text-stone-900",
  h6: "text-base sm:text-lg font-serif font-semibold tracking-wide text-stone-900",
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = "h2", className, children, ...props }, ref) => {
    const Component = level;

    return (
      <Component
        ref={ref}
        className={cn(levelStyles[level], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = "Heading";

// ============================================================================
// 2. Eyebrow Primitive
// ============================================================================

export interface EyebrowProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  ornament?: boolean;
}

export const Eyebrow = React.forwardRef<HTMLParagraphElement, EyebrowProps>(
  ({ ornament = false, className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-stone-500 font-sans font-medium select-none",
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
        <span>{children}</span>
        {ornament && (
          <span
            aria-hidden="true"
            className="w-4 h-px bg-current opacity-60 transition-opacity"
          />
        )}
      </p>
    );
  }
);
Eyebrow.displayName = "Eyebrow";

// ============================================================================
// 3. PullQuote Primitive
// ============================================================================

export interface PullQuoteProps
  extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  glyph?: string | React.ReactNode;
  author?: string;
  source?: string;
}

export const PullQuote = React.forwardRef<HTMLQuoteElement, PullQuoteProps>(
  (
    {
      glyph = "◇",
      author,
      source,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <figure className={cn("relative my-10 text-center mx-auto max-w-2xl px-6", className)}>
        {glyph && (
          <div
            aria-hidden="true"
            className="text-amber-700/60 font-serif text-base select-none mb-3"
          >
            {glyph}
          </div>
        )}

        <blockquote
          ref={ref}
          className="font-serif text-xl sm:text-2xl md:text-3xl italic text-stone-800 leading-relaxed tracking-wide"
          {...props}
        >
          “{children}”
        </blockquote>

        {(author || source) && (
          <figcaption className="mt-4 text-xs uppercase tracking-[0.22em] text-stone-500 font-sans font-medium flex items-center justify-center gap-2">
            <span aria-hidden="true" className="w-6 h-px bg-stone-300" />
            {author && <span>{author}</span>}
            {source && <cite className="not-italic opacity-70">• {source}</cite>}
            <span aria-hidden="true" className="w-6 h-px bg-stone-300" />
          </figcaption>
        )}
      </figure>
    );
  }
);
PullQuote.displayName = "PullQuote";
