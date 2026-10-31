"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Heart,
  Users,
  ExternalLink,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "Design Templates",
    href: "/admin/templates",
    icon: Sparkles,
    exact: false,
  },
  {
    name: "Digital Invitations",
    href: "/admin/invitations",
    icon: Heart,
    exact: false,
  },
  {
    name: "User Accounts",
    href: "/admin/users",
    icon: Users,
    exact: false,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-stone-200/80 bg-white flex flex-col min-h-screen">
      {/* Brand Header with link to Homepage */}
      <Link
        href="/"
        title="Go to Homepage"
        className="h-16 flex items-center px-6 border-b border-stone-100 gap-3 hover:bg-stone-50/80 transition-colors group"
      >
        <div className="w-8 h-8 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
          <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />
        </div>
        <div>
          <h1 className="font-serif font-semibold text-stone-900 text-sm tracking-wide group-hover:text-amber-800 transition-colors">
            DIGIWEDCARD
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-medium flex items-center gap-1">
            <span>Admin Shell</span>
            <span>•</span>
            <span className="text-amber-600 font-normal">Home ↗</span>
          </p>
        </div>
      </Link>

      {/* Nav Section */}
      <div className="flex-1 px-3 py-6 space-y-1">
        <p className="px-3 text-[11px] font-medium uppercase tracking-wider text-stone-400 mb-2">
          Platform Management
        </p>

        {navigationItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all select-none",
                isActive
                  ? "bg-stone-900 text-white shadow-sm"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-amber-300" : "text-stone-400"
                )}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Live Sample Card Preview */}
      <div className="p-4 border-t border-stone-100 space-y-2">
        <div className="text-[11px] font-medium text-stone-400 uppercase tracking-wider px-1">
          Public Microsite Preview
        </div>
        <Link
          href="/i/sarah-alexander"
          target="_blank"
          className="flex items-center justify-between p-3 rounded-xl border border-amber-200/80 bg-amber-50/50 hover:bg-amber-100/70 text-amber-950 text-xs font-medium transition shadow-xs"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-amber-700" />
            <span>Sarah & Alexander</span>
          </span>
          <span className="text-[10px] bg-amber-200/80 px-1.5 py-0.5 rounded text-amber-900 font-mono">
            /i/sarah
          </span>
        </Link>
      </div>
    </aside>
  );
}

// Named alias
export { Sidebar as AdminSidebar };
