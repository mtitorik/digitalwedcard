import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getInvitationByIdAdmin } from "@/server/actions/invitation.actions";
import { InvitationStatusBadge, AttendanceBadge } from "@/components/admin/StatusBadge";
import { RSVPDeleteButton } from "@/components/admin/RSVPDeleteButton";
import { ExportGuestsButton } from "@/components/shared/export-guests-button";
import { ShareTriggerButton } from "@/components/shared/share-invite-modal";
import { QRCodeTriggerButton } from "@/components/shared/qr-code-modal";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Clock,
  MapPin,
  Lock,
  Music,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";

interface InvitationDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function InvitationDetailPage({ params }: InvitationDetailPageProps) {
  const { id } = await params;
  const invitation = await getInvitationByIdAdmin(id);

  if (!invitation) {
    notFound();
  }

  const attendingList = invitation.rsvps.filter((r) => r.attendance === "ATTENDING");
  const declinedList = invitation.rsvps.filter((r) => r.attendance === "DECLINED");
  const tentativeList = invitation.rsvps.filter((r) => r.attendance === "TENTATIVE");

  const totalHeadcount = attendingList.reduce(
    (sum, r) => sum + 1 + (r.additionalGuestsCount || 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link href="/admin/invitations">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 text-stone-600" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-semibold text-stone-900">
                {invitation.brideName} & {invitation.groomName}
              </h1>
              <InvitationStatusBadge status={invitation.status} />
              {invitation.isPasswordProtected && (
                <span className="flex items-center gap-1 text-[11px] font-mono bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full border border-stone-200">
                  <Lock className="w-3 h-3 text-stone-500" />
                  Passcode: {invitation.passcode}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Created by {invitation.user.name} ({invitation.user.email}) • {invitation.viewCount} views
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <ShareTriggerButton
            coupleNames={`${invitation.brideName} & ${invitation.groomName}`}
            slug={invitation.slug}
            passcode={invitation.passcode}
            variant="outline"
            size="md"
          />
          <QRCodeTriggerButton
            url={`/i/${invitation.slug}`}
            coupleNames={`${invitation.brideName} & ${invitation.groomName}`}
            passcode={invitation.passcode}
            variant="outline"
            size="md"
          />
          <Link href={`/i/${invitation.slug}`} target="_blank">
            <Button variant="gold" size="md">
              <ExternalLink className="w-4 h-4" />
              Open Live Public Card
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
            Total Responses
          </span>
          <p className="text-2xl font-serif font-semibold text-stone-900 mt-1">
            {invitation.rsvps.length}
          </p>
          <span className="text-[11px] text-stone-500">Submitted guest RSVPs</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/20 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Attending
          </span>
          <p className="text-2xl font-serif font-semibold text-emerald-900 mt-1">
            {attendingList.length}
          </p>
          <span className="text-[11px] text-emerald-700 font-medium">
            {totalHeadcount} total guest headcounts
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-amber-700 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" />
            Tentative
          </span>
          <p className="text-2xl font-serif font-semibold text-stone-900 mt-1">
            {tentativeList.length}
          </p>
          <span className="text-[11px] text-stone-500">Awaiting schedule confirmation</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <span className="text-xs font-medium uppercase tracking-wider text-rose-700 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            Declined
          </span>
          <p className="text-2xl font-serif font-semibold text-stone-900 mt-1">
            {declinedList.length}
          </p>
          <span className="text-[11px] text-stone-500">Sending love from afar</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: RSVPs and Schedules */}
        <div className="lg:col-span-2 space-y-8">
          {/* RSVPs Table */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <CardTitle>Guest RSVP Ledger</CardTitle>
                  <CardDescription>
                    All guest confirmations, meal notes, and congratulatory messages.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <ExportGuestsButton
                    coupleTitle={`${invitation.brideName} & ${invitation.groomName}`}
                    rsvps={invitation.rsvps}
                  />
                  <span className="text-xs font-mono font-medium text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
                    {invitation.rsvps.length} entries
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {invitation.rsvps.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-400">
                  No guest RSVPs received yet for this digital wedding card.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-600">
                    <thead className="bg-stone-50/70 text-[10px] uppercase tracking-wider text-stone-400 font-medium border-b border-stone-100">
                      <tr>
                        <th className="py-3 px-4">Guest</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Attendance</th>
                        <th className="py-3 px-4">Party Size</th>
                        <th className="py-3 px-4">Message</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {invitation.rsvps.map((rsvp) => (
                        <tr key={rsvp.id} className="hover:bg-stone-50/50 transition">
                          <td className="py-3.5 px-4 font-medium text-stone-900">
                            {rsvp.guestName}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-stone-500">
                            {rsvp.guestEmail || rsvp.guestPhone || "—"}
                          </td>
                          <td className="py-3.5 px-4">
                            <AttendanceBadge status={rsvp.attendance} />
                          </td>
                          <td className="py-3.5 px-4 font-mono font-semibold text-stone-800">
                            {1 + (rsvp.additionalGuestsCount || 0)}
                          </td>
                          <td className="py-3.5 px-4 text-stone-600 max-w-xs truncate italic">
                            {rsvp.message ? `"${rsvp.message}"` : "—"}
                          </td>
                          <td className="py-3.5 px-4 text-stone-400 whitespace-nowrap">
                            {formatDate(rsvp.createdAt)}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <RSVPDeleteButton id={rsvp.id} guestName={rsvp.guestName} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ceremony Schedules */}
          <Card>
            <CardHeader>
              <CardTitle>Ceremony & Reception Schedules</CardTitle>
              <CardDescription>
                Events published on the couple&apos;s digital microsite with locations and map links.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {invitation.schedules.length === 0 ? (
                <div className="p-8 text-center text-xs text-stone-400">
                  No event schedules configured for this card.
                </div>
              ) : (
                <div className="space-y-4">
                  {invitation.schedules.map((schedule, idx) => (
                    <div
                      key={schedule.id}
                      className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/40 hover:bg-stone-50 transition flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-stone-900 text-amber-300 text-[10px] font-bold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="font-serif font-semibold text-stone-900 text-sm">
                            {schedule.title}
                          </h4>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-stone-400" />
                            {formatDate(schedule.date)}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <Clock className="w-3.5 h-3.5 text-stone-400" />
                            {schedule.startTime}
                            {schedule.endTime ? ` - ${schedule.endTime}` : ""}
                          </span>
                        </div>

                        <div className="flex items-start gap-1 text-xs text-stone-500 pt-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-stone-800">{schedule.venueName}</strong> —{" "}
                            {schedule.address}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={schedule.googleMapsUrl}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-medium text-amber-800 hover:text-amber-950 transition self-start sm:self-center"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Cover, Story, Theme Config */}
        <div className="space-y-6">
          {/* Cover & Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Cover & Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <Image
                  src={invitation.coverImageUrl}
                  alt={`${invitation.brideName} & ${invitation.groomName}`}
                  fill
                  className="object-cover"
                />
              </div>

              {invitation.coupleStory && (
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-stone-400 mb-1">
                    Couple&apos;s Love Story
                  </label>
                  <p className="text-xs text-stone-600 leading-relaxed italic bg-stone-50 p-3 rounded-xl border border-stone-100">
                    &ldquo;{invitation.coupleStory}&rdquo;
                  </p>
                </div>
              )}

              {invitation.backgroundMusicUrl && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-700">
                  <Music className="w-4 h-4 text-amber-600" />
                  <span className="truncate flex-1">Background Audio Enabled</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Theme & Palette */}
          <Card>
            <CardHeader>
              <CardTitle>Theme Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Design Template:</span>
                <span className="font-serif font-semibold text-stone-900">
                  {invitation.template.name}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Font Family:</span>
                <span className="font-mono text-stone-700">{invitation.fontFamily}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-stone-100">
                <span className="text-stone-500">Primary Color:</span>
                <div className="flex items-center gap-1.5 font-mono">
                  <span
                    className="w-4 h-4 rounded-full border border-stone-300"
                    style={{ backgroundColor: invitation.primaryColor }}
                  />
                  <span>{invitation.primaryColor}</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-stone-500">Accent Color:</span>
                <div className="flex items-center gap-1.5 font-mono">
                  <span
                    className="w-4 h-4 rounded-full border border-stone-300"
                    style={{ backgroundColor: invitation.accentColor }}
                  />
                  <span>{invitation.accentColor}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

