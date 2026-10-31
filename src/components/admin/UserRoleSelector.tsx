"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";
import { toggleUserRole } from "@/server/actions/user.actions";
import { toast } from "sonner";

export function UserRoleSelector({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: Role;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role;
    startTransition(async () => {
      const res = await toggleUserRole(userId, newRole);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    });
  };

  return (
    <select
      value={currentRole}
      onChange={handleRoleChange}
      disabled={isPending}
      className="h-8 rounded-lg border border-stone-200 bg-white px-2 text-xs font-mono font-medium text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer"
    >
      <option value="USER">USER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  );
}

