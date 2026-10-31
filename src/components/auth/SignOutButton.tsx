"use client";

import { useTransition } from "react";
import { logoutAction } from "@/server/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface SignOutButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SignOutButton({ className, size = "sm" }: SignOutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleSignOut}
      disabled={isPending}
      className={className}
      title="Sign Out of Your Account"
    >
      <LogOut className="w-3.5 h-3.5 mr-1.5" />
      {isPending ? "Signing out..." : "Sign Out"}
    </Button>
  );
}

