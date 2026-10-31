import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "solid" | "gold" | "outline" | "ghost" | "editorial";
export type ButtonShape = "pill" | "rounded" | "square";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon";
export type ButtonTone = "light" | "dark";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  size?: ButtonSize;
  tone?: ButtonTone;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      shape = "rounded",
      size = "md",
      tone = "dark",
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
    const baseStyles =
      "group relative inline-flex items-center justify-center font-medium select-none cursor-pointer transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    // Shape styling
    const shapeStyles: Record<ButtonShape, string> = {
      pill: "rounded-full",
      rounded: "rounded-xl",
      square: "rounded-none",
    };

    // Size styling
    const sizeStyles: Record<ButtonSize, string> = {
      xs: "h-7 px-2.5 text-[10px] gap-1.5 uppercase tracking-wider font-semibold",
      sm: "h-8 px-3.5 text-xs gap-1.5 uppercase tracking-wider font-semibold",
      md: "h-10 px-5 text-xs sm:text-sm gap-2 uppercase tracking-[0.12em] font-medium",
      lg: "h-12 px-7 text-sm sm:text-base gap-2.5 uppercase tracking-[0.14em] font-medium",
      icon: "h-9 w-9 p-0 rounded-xl",
    };

    // Variant & tone combinations
    const getVariantStyles = () => {
      switch (variant) {
        case "gold":
          return "bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-md shadow-amber-900/10 hover:shadow-lg hover:shadow-amber-900/20 hover:scale-[1.02] border border-amber-500/30";
        case "solid":
          return tone === "light"
            ? "bg-white text-stone-900 hover:bg-stone-100 shadow-sm hover:shadow-md"
            : "bg-stone-900 text-white hover:bg-stone-800 shadow-sm hover:shadow-md";
        case "outline":
          return tone === "light"
            ? "border border-white/40 text-white bg-white/10 hover:bg-white/20 hover:border-white/60 backdrop-blur-sm"
            : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 hover:border-stone-400 shadow-2xs";
        case "ghost":
          return tone === "light"
            ? "text-white/90 hover:text-white hover:bg-white/10"
            : "text-stone-700 hover:text-stone-950 hover:bg-stone-100/80";
        case "editorial":
          return tone === "light"
            ? "border-b border-white text-white hover:border-amber-300 hover:text-amber-200 rounded-none px-0 py-1"
            : "border-b border-stone-800 text-stone-900 hover:border-amber-700 hover:text-amber-800 rounded-none px-0 py-1";
        default:
          return "";
      }
    };

    const combinedClasses = cn(
      baseStyles,
      shapeStyles[shape],
      sizeStyles[size],
      getVariantStyles(),
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

    // If an href is supplied, render a Next.js Link or anchor tag
    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("//");

      if (isExternal) {
        return (
          <a
            href={href}
            target={target || "_blank"}
            rel={rel || "noopener noreferrer"}
            className={combinedClasses}
          >
            {content}
          </a>
        );
      }

      return (
        <Link href={href} className={combinedClasses} target={target}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";
