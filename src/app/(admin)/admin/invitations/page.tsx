import Link from "next/link";
import { getInvitationsAdmin } from "@/server/actions/invitation.actions";
import { InvitationStatusBadge } from "@/components/admin/StatusBadge";
import { InvitationTableActions } from "@/components/admin/InvitationTableActions";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, Users, Eye } from "lucide-react";

interface InvitationsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    templateId?: string;
  }>;
}

export default async function InvitationsAdminPage({ searchParams }: InvitationsPageProps) {
  const resolved = await searchParams;
  const search = resolved.search || "";
  const status = resolved.status || "ALL";
  const templateId = resolved.templateId || "ALL";

  const invitations = await getInvitationsAdmin({
    search,
    status,
    templateId,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-stone-900">
            Digital Wedding Invitations
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Monitor all interactive invitation microsites, ceremony schedules, and active guest RSVPs.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs">
        <form method="GET" className="flex-1 flex items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search couple, slug, or email..."
              className="w-full h-9 pl-9 pr-4 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>
          <Button type="submit" variant="secondary" size="sm">
            Filter
          </Button>
        </form>

        <div className="flex items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs">
            <Link
              href="/admin/invitations"
              className={`px-3 py-1 rounded-lg font-medium transition ${
                status === "ALL" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
              }`}
            >
              All ({invitations.length})
            </Link>
            <Link
              href="/admin/invitations?status=PUBLISHED"
              className={`px-3 py-1 rounded-lg font-medium transition ${
                status === "PUBLISHED" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
              }`}
            >
              Published
            </Link>
            <Link
              href="/admin/invitations?status=DRAFT"
              className={`px-3 py-1 rounded-lg font-medium transition ${
                status === "DRAFT" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
              }`}
            >
              Draft
            </Link>
          </div>
        </div>
      </div>

      {/* Invitations Table */}
      {invitations.length === 0 ? (
        <div className="rounded-2xl border border-stone-200/80 bg-white p-12 text-center text-xs text-stone-500 shadow-sm">
          No digital invitations found matching your criteria.
        </div>
      ) : (
        <div className="rounded-2xl border border-stone-200/80 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="bg-stone-50/70 text-[11px] uppercase tracking-wider text-stone-400 font-medium border-b border-stone-100">
                <tr>
                  <th className="py-3.5 px-6">Couple / Invitation</th>
                  <th className="py-3.5 px-6">Template Theme</th>
                  <th className="py-3.5 px-6">Creator Account</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Engagement</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {invitations.map((inv) => (
                  <tr key={inv.id} className="hover:bg-stone-50/50 transition">
                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <Link
                          href={`/admin/invitations/${inv.id}`}
                          className="font-serif font-semibold text-stone-900 hover:text-amber-800 text-sm"
                        >
                          {inv.brideName} & {inv.groomName}
                        </Link>
                        <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
                          <span>/i/{inv.slug}</span>
                          <Link
                            href={`/i/${inv.slug}`}
                            target="_blank"
                            className="text-stone-400 hover:text-stone-800"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-xs text-stone-700">
                      <span className="font-medium text-stone-900 block">
                        {inv.template.name}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        {inv._count.schedules} ceremonies
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <p className="text-xs font-medium text-stone-800">
                        {inv.user.name || "Client User"}
                      </p>
                      <p className="text-[11px] text-stone-400 font-mono">
                        {inv.user.email}
                      </p>
                    </td>

                    <td className="py-4 px-6">
                      <InvitationStatusBadge status={inv.status} />
                    </td>

                    <td className="py-4 px-6 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-stone-700 font-medium">
                          <Users className="w-3.5 h-3.5 text-stone-400" />
                          {inv._count.rsvps}
                        </span>
                        <span className="flex items-center gap-1 text-stone-500">
                          <Eye className="w-3.5 h-3.5 text-stone-400" />
                          {inv.viewCount}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end">
                        <InvitationTableActions
                          id={inv.id}
                          slug={inv.slug}
                          currentStatus={inv.status}
                          coupleNames={`${inv.brideName} & ${inv.groomName}`}
                          passcode={inv.passcode}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

