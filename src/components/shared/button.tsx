import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "default" | "outline" | "champagne" | "pill" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  // Charcoal background, white/cream text, uppercase tracking-widest text
  default:
    "bg-stone-900 text-stone-50 hover:bg-stone-800 uppercase tracking-[0.2em] shadow-sm active:bg-stone-950",

  // 1px micro-border (border-current hover:bg-black/5)
  outline:
    "border border-current bg-transparent text-stone-800 hover:bg-black/5 uppercase tracking-[0.16em] active:bg-black/10",

  // Warm gold fill or accent border
  champagne:
    "bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white uppercase tracking-[0.16em] shadow-md shadow-amber-900/15 border border-amber-500/40 active:scale-[0.98]",

  // Fully rounded interactive buttons for actions like RSVP and Map links
  pill:
    "rounded-full bg-stone-900 text-stone-50 hover:bg-stone-800 uppercase tracking-[0.18em] shadow-md hover:scale-105 active:scale-95 border border-white/10",

  // Ghost borderless minimal variant
  ghost:
    "bg-transparent text-stone-700 hover:bg-stone-100 hover:text-stone-950 uppercase tracking-[0.14em]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-[11px] gap-1.5",
  md: "h-10 px-5 text-xs gap-2",
  lg: "h-12 px-7 text-xs sm:text-sm gap-2.5",
  icon: "h-9 w-9 p-0 rounded-xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      href,
      target,
      rel,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isPill = variant === "pill";

    const baseStyles = cn(
      "group relative inline-flex items-center justify-center font-medium select-none cursor-pointer transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:pointer-events-none disabled:opacity-50",
      isPill ? "rounded-full" : size === "icon" ? "rounded-xl" : "rounded-xl",
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    const content = (
      <>
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 mr-2 h-3.5 w-3.5 text-current shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0 transition-transform group-hover:-translate-x-0.5">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0 transition-transform group-hover:translate-x-0.5">
            {rightIcon}
          </span>
        )}
      </>
    );

    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("//");

      if (isExternal) {
        return (
          <a
            href={href}
            target={target || "_blank"}
            rel={rel || "noopener noreferrer"}
            className={baseStyles}
          >
            {content}
          </a>
        );
      }

      return (
        <Link href={href} className={baseStyles} target={target}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={baseStyles}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";
