"use client";

import { useAuthModal, AuthMode } from "@/context/auth-modal-context";
import { Button, ButtonProps } from "@/components/ui/button";

interface AuthTriggerButtonProps extends Omit<ButtonProps, "onClick"> {
  mode?: AuthMode;
  children: React.ReactNode;
}

export function AuthTriggerButton({
  mode = "signup",
  children,
  ...props
}: AuthTriggerButtonProps) {
  const { openAuthModal } = useAuthModal();

  return (
    <Button
      {...props}
      type="button"
      onClick={() => openAuthModal(mode)}
      className={`cursor-pointer ${props.className || ""}`}
    >
      {children}
    </Button>
  );
}

