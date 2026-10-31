"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ActionItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?: "gold" | "solid" | "outline";
}

export type ActionBarTone = "frosted" | "dark" | "light";

export interface StickyActionBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  primaryAction?: ActionItem;
  secondaryAction?: ActionItem;
  showOnlyOnMobile?: boolean;
  minScrollY?: number;
  tone?: ActionBarTone;
}

export function StickyActionBar({
  primaryAction,
  secondaryAction,
  showOnlyOnMobile = true,
  minScrollY = 120,
  tone = "frosted",
  className,
  children,
  ...props
}: StickyActionBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > minScrollY);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [minScrollY]);

  const toneClasses: Record<ActionBarTone, string> = {
    frosted:
      "bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border-t border-stone-200/80 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.15)]",
    dark:
      "bg-stone-950/95 backdrop-blur-xl border-t border-stone-800 text-white shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.5)]",
    light:
      "bg-white border-t border-stone-200 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]",
  };

  const renderButton = (action: ActionItem, isPrimary: boolean) => {
    const baseBtnStyles = cn(
      "flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full font-medium text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 select-none shadow-sm cursor-pointer",
      action.variant === "gold" || (isPrimary && !action.variant)
        ? "bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-amber-900/15"
        : action.variant === "solid"
        ? "bg-stone-900 text-white hover:bg-stone-800"
        : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-50"
    );

    const innerContent = (
      <>
        {action.icon && <span className="shrink-0">{action.icon}</span>}
        <span>{action.label}</span>
      </>
    );

    if (action.href) {
      const isExternal =
        action.href.startsWith("http") || action.href.startsWith("//");

      if (isExternal) {
        return (
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseBtnStyles}
          >
            {innerContent}
          </a>
        );
      }

      return (
        <Link href={action.href} className={baseBtnStyles}>
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        type="button"
        onClick={action.onClick}
        className={baseBtnStyles}
      >
        {innerContent}
      </button>
    );
  };

  return (
    <aside
      aria-label="Quick Action Toolbar"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-4 py-3 transition-transform duration-300 ease-out",
        "pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]",
        showOnlyOnMobile && "sm:hidden",
        isVisible ? "translate-y-0" : "translate-y-full pointer-events-none",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        {children ? (
          children
        ) : (
          <>
            {secondaryAction && renderButton(secondaryAction, false)}
            {primaryAction && renderButton(primaryAction, true)}
          </>
        )}
      </div>
    </aside>
  );
}

