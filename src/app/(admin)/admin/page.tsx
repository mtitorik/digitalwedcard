import Link from "next/link";
import { getDashboardMetrics } from "@/server/actions/dashboard.actions";
import { MetricCard } from "@/components/admin/MetricCard";
import { InvitationStatusBadge, AttendanceBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import {
  Heart,
  Users,
  Eye,
  Sparkles,
  ArrowRight,
  ExternalLink,
  PlusCircle,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const {
    totalInvitations,
    publishedInvitations,
    totalRsvps,
    attendingGuestsTotal,
    totalViews,
    activeTemplates,
    recentInvitations,
    recentRsvps,
  } = await getDashboardMetrics();

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-100 text-amber-800 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-amber-800">
              Digital Wedding Platform
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900 mt-1">
            Executive Analytics & Activity
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Real-time invitation event microsites, guest RSVP engagement, and template telemetry.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/templates/new">
            <Button variant="gold" size="md">
              <PlusCircle className="w-4 h-4" />
              New Design Template
            </Button>
          </Link>
          <Link href="/admin/invitations">
            <Button variant="outline" size="md">
              View All Cards
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Core KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Total Invitations"
          value={totalInvitations}
          description={`${publishedInvitations} live microsites, ${totalInvitations - publishedInvitations} in draft`}
          icon={Heart}
          trend={{ value: "+24% this week", isPositive: true }}
        />
        <MetricCard
          title="Active RSVPs"
          value={totalRsvps}
          description={`${attendingGuestsTotal} confirmed attending guests`}
          icon={Users}
        />
        <MetricCard
          title="Total Card Views"
          value={totalViews.toLocaleString()}
          description="Direct guest visits across all microsites"
          icon={Eye}
        />
        <MetricCard
          title="Active Templates"
          value={activeTemplates}
          description="Ready-to-use digital invitation styles"
          icon={Sparkles}
        />
      </div>

      {/* Grid: Recent Invitations & Recent RSVPs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Digital Invitations */}
        <div className="rounded-2xl border border-stone-200/80 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-serif font-semibold text-stone-900">
                Recent Digital Invitations
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Bespoke couple event microsites created on the platform.
              </p>
            </div>
            <Link
              href="/admin/invitations"
              className="text-xs font-medium text-stone-700 hover:text-stone-900 flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 divide-y divide-stone-100">
            {recentInvitations.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-400">
                No digital invitation cards created yet.
              </div>
            ) : (
              recentInvitations.map((inv) => (
                <div
                  key={inv.id}
                  className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-stone-50/60 transition"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/invitations/${inv.id}`}
                        className="font-serif font-semibold text-sm text-stone-900 hover:text-amber-800 truncate"
                      >
                        {inv.brideName} & {inv.groomName}
                      </Link>
                      <InvitationStatusBadge status={inv.status} />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span>{inv.template.name}</span>
                      <span>•</span>
                      <span className="font-mono text-[11px] text-stone-400">
                        {inv._count.rsvps} RSVPs
                      </span>
                      <span>•</span>
                      <span className="font-mono text-[11px] text-stone-400">
                        {inv.viewCount} views
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/i/${inv.slug}`}
                      target="_blank"
                      className="p-2 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition"
                      title="Open Live Public Card"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <Link href={`/admin/invitations/${inv.id}`}>
                      <Button variant="outline" size="sm" className="text-xs">
                        Manage
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Guest RSVPs */}
        <div className="rounded-2xl border border-stone-200/80 bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-serif font-semibold text-stone-900">
                Recent Guest RSVPs
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Real-time responses submitted by guests on public invitation pages.
              </p>
            </div>
          </div>

          <div className="flex-1 divide-y divide-stone-100">
            {recentRsvps.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-400">
                No guest RSVPs received yet.
              </div>
            ) : (
              recentRsvps.map((rsvp) => (
                <div
                  key={rsvp.id}
                  className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-stone-50/60 transition"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-xs sm:text-sm text-stone-900 truncate">
                        {rsvp.guestName}
                      </span>
                      <AttendanceBadge status={rsvp.attendance} />
                    </div>

                    <p className="text-xs text-stone-500">
                      for{" "}
                      <Link
                        href={`/admin/invitations/${rsvp.invitation.id}`}
                        className="font-medium text-stone-700 hover:underline"
                      >
                        {rsvp.invitation.brideName} & {rsvp.invitation.groomName}
                      </Link>
                      {rsvp.additionalGuestsCount > 0 && (
                        <span className="text-stone-400 ml-1.5 font-mono text-[11px]">
                          (+{rsvp.additionalGuestsCount} guests)
                        </span>
                      )}
                    </p>

                    {rsvp.message && (
                      <p className="text-xs italic text-stone-500 pt-0.5 line-clamp-1">
                        &ldquo;{rsvp.message}&rdquo;
                      </p>
                    )}
                  </div>

                  <span className="text-[11px] text-stone-400 whitespace-nowrap pt-1">
                    {formatDate(rsvp.createdAt)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
