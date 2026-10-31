"use server";

import db from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { InvitationStatus, AttendanceStatus } from "@prisma/client";

export interface DashboardMetricsResult {
  totalInvitations: number;
  publishedInvitations: number;
  totalRsvps: number;
  attendingGuestsTotal: number;
  totalViews: number;
  activeTemplates: number;
  totalUsers: number;
  recentInvitations: Array<{
    id: string;
    slug: string;
    status: InvitationStatus;
    brideName: string;
    groomName: string;
    viewCount: number;
    user: { name: string | null; email: string };
    template: { name: string };
    _count: { rsvps: number };
  }>;
  recentRsvps: Array<{
    id: string;
    guestName: string;
    attendance: AttendanceStatus;
    additionalGuestsCount: number;
    message: string | null;
    createdAt: Date;
    invitation: {
      id: string;
      slug: string;
      groomName: string;
      brideName: string;
    };
  }>;
}

export async function getDashboardMetrics(): Promise<DashboardMetricsResult> {
  await requireAdmin();

  const [
    totalInvitations,
    publishedInvitations,
    totalRsvps,
    attendingRsvps,
    viewsAggregate,
    activeTemplates,
    totalUsers,
    recentInvitations,
    recentRsvps,
  ] = await Promise.all([
    // Total Invitations
    db.invitation.count(),

    // Published Invitations
    db.invitation.count({
      where: { status: InvitationStatus.PUBLISHED },
    }),

    // Total RSVPs received
    db.rsvpResponse.count(),

    // Attending RSVPs
    db.rsvpResponse.findMany({
      where: { attendance: AttendanceStatus.ATTENDING },
      select: { additionalGuestsCount: true },
    }),

    // Total microsite views across all invitations
    db.invitation.aggregate({
      _sum: { viewCount: true },
    }),

    // Active design templates
    db.template.count({
      where: { isActive: true },
    }),

    // Total registered accounts
    db.user.count(),

    // Recent 5 invitations
    db.invitation.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        status: true,
        brideName: true,
        groomName: true,
        viewCount: true,
        user: {
          select: { name: true, email: true },
        },
        template: {
          select: { name: true },
        },
        _count: {
          select: { rsvps: true },
        },
      },
    }),

    // Recent 5 RSVPs
    db.rsvpResponse.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        guestName: true,
        attendance: true,
        additionalGuestsCount: true,
        message: true,
        createdAt: true,
        invitation: {
          select: {
            id: true,
            slug: true,
            groomName: true,
            brideName: true,
          },
        },
      },
    }),
  ]);

  const attendingGuestsTotal = attendingRsvps.reduce(
    (sum, r) => sum + 1 + (r.additionalGuestsCount || 0),
    0
  );

  return {
    totalInvitations,
    publishedInvitations,
    totalRsvps,
    attendingGuestsTotal,
    totalViews: viewsAggregate._sum.viewCount || 0,
    activeTemplates,
    totalUsers,
    recentInvitations,
    recentRsvps,
  };
}
