"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteRSVP } from "@/server/actions/rsvp.actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function RSVPDeleteButton({ id, guestName }: { id: string; guestName: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Delete RSVP record for "${guestName}"?`)) return;

    startTransition(async () => {
      const res = await deleteRSVP(id);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      isLoading={isPending}
      className="h-8 px-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50"
      title="Delete RSVP"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </Button>
  );
}

