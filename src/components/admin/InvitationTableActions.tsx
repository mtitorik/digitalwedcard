"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { InvitationStatus } from "@prisma/client";
import { toggleInvitationStatus, deleteInvitation } from "@/server/actions/invitation.actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";

interface InvitationTableActionsProps {
  id: string;
  slug: string;
  currentStatus: InvitationStatus;
}

export function InvitationTableActions({
  id,
  slug,
  currentStatus,
}: InvitationTableActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as InvitationStatus;
    startTransition(async () => {
      const res = await toggleInvitationStatus(id, newStatus);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    });
  };

  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete invitation "/i/${slug}" and all associated RSVP responses?`)) {
      return;
    }

    startTransition(async () => {
      const res = await deleteInvitation(id);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.error);
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Quick Status Select */}
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={isPending}
        className="h-8 rounded-lg border border-stone-200 bg-white px-2 text-[11px] font-medium text-stone-700 focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer"
      >
        <option value="PUBLISHED">Published</option>
        <option value="DRAFT">Draft</option>
        <option value="ARCHIVED">Archived</option>
      </select>

      <Link
        href={`/i/${slug}`}
        target="_blank"
        className="p-1.5 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition"
        title="Open Live Public Card"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>

      <Link href={`/admin/invitations/${id}`}>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-2 text-xs"
          title="View card details and RSVPs"
        >
          <Eye className="w-3.5 h-3.5 mr-1" />
          Details
        </Button>
      </Link>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        isLoading={isPending}
        className="h-8 px-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50"
        title="Delete invitation"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

