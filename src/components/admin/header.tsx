"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/server/actions/auth.actions";
import { SessionUser } from "@/types";
import { Button } from "@/components/ui/button";
import { RoleBadge } from "@/components/admin/StatusBadge";
import { LogOut, User as UserIcon, Bell, Sparkles, Home, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface HeaderProps {
  user: SessionUser;
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const getPageTitle = () => {
    if (pathname === "/admin") return "Analytics & Studio Overview";
    if (pathname.startsWith("/admin/templates/new")) return "Create Design Template";
    if (pathname.startsWith("/admin/templates")) return "Template Gallery";
    if (pathname.startsWith("/admin/invitations")) return "Digital Invitations";
    if (pathname.startsWith("/admin/users")) return "User Account Management";
    return "Administrative Suite";
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  const handleNotificationClick = () => {
    toast.info("No unread alerts. All digital invitation micro-sites are active and healthy.");
  };

  return (
    <header className="h-16 border-b border-stone-200/80 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Dynamic Title / Breadcrumb */}
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-serif font-semibold text-stone-900 tracking-wide">
          {getPageTitle()}
        </h2>
        <span className="text-stone-300">/</span>
        <RoleBadge role={user.role} />
      </div>

      <div className="flex items-center gap-3">
        {/* Link back to public homepage */}
        <Link href="/" title="Go to Digiwedcard Public Homepage">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-700 hover:text-stone-900 border-stone-200"
          >
            <Home className="w-3.5 h-3.5 text-amber-600" />
            <span>Public Site</span>
          </Button>
        </Link>

        {/* Notifications Placeholder */}
        <button
          type="button"
          onClick={handleNotificationClick}
          className="relative p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white" />
        </button>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 pl-3 border-l border-stone-200">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover border border-stone-200"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 border border-stone-200">
              <UserIcon className="w-4 h-4" />
            </div>
          )}

          <div className="hidden sm:block text-left">
            <p className="text-xs font-medium text-stone-900 leading-tight">
              {user.name}
            </p>
            <p className="text-[11px] text-stone-400 leading-tight">
              {user.email}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          isLoading={isPending}
          className="text-stone-600 hover:text-rose-600 hover:border-rose-200 ml-2"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}

// Named alias
export { Header as AdminHeader };
