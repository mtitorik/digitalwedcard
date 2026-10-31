import { InvitationStatus, AttendanceStatus, Role } from "@prisma/client";
import { cn } from "@/lib/utils";

export function InvitationStatusBadge({ status }: { status: InvitationStatus }) {
  const styles: Record<InvitationStatus, string> = {
    PUBLISHED: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    DRAFT: "bg-amber-50 text-amber-700 border-amber-200/80",
    ARCHIVED: "bg-stone-100 text-stone-600 border-stone-200",
  };

  const labels: Record<InvitationStatus, string> = {
    PUBLISHED: "Live / Published",
    DRAFT: "Draft",
    ARCHIVED: "Archived",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border tracking-wide uppercase",
        styles[status] || styles.DRAFT
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "PUBLISHED"
            ? "bg-emerald-500 animate-pulse"
            : status === "DRAFT"
            ? "bg-amber-500"
            : "bg-stone-400"
        )}
      />
      {labels[status] || status}
    </span>
  );
}

export function AttendanceBadge({ status }: { status: AttendanceStatus }) {
  const styles: Record<AttendanceStatus, string> = {
    ATTENDING: "bg-emerald-50 text-emerald-700 border-emerald-200",
    DECLINED: "bg-rose-50 text-rose-700 border-rose-200",
    TENTATIVE: "bg-amber-50 text-amber-700 border-amber-200",
  };

  const labels: Record<AttendanceStatus, string> = {
    ATTENDING: "Attending",
    DECLINED: "Declined",
    TENTATIVE: "Tentative",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border tracking-wide",
        styles[status]
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          status === "ATTENDING"
            ? "bg-emerald-500"
            : status === "DECLINED"
            ? "bg-rose-500"
            : "bg-amber-500"
        )}
      />
      {labels[status]}
    </span>
  );
}

export function RoleBadge({ role }: { role: Role }) {
  const isAdmin = role === Role.ADMIN;
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider border",
        isAdmin
          ? "bg-amber-50 text-amber-800 border-amber-300"
          : "bg-stone-100 text-stone-600 border-stone-200"
      )}
    >
      {role}
    </span>
  );
}
