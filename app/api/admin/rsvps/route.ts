import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { RsvpModel, FallbackRsvp } from "@/models/Rsvp";

export async function GET(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const rsvps = await RsvpModel.find().sort({ createdAt: -1 });

      const totalSubmissions = rsvps.length;
      const attendingList = rsvps.filter((r) => r.attendance === "attending");
      const declinedList = rsvps.filter((r) => r.attendance === "declined");
      const totalAttendingGuests = attendingList.reduce((acc, curr) => acc + (curr.guestCount || 1), 0);

      return NextResponse.json({
        success: true,
        stats: {
          totalSubmissions,
          attendingCount: attendingList.length,
          declinedCount: declinedList.length,
          totalGuests: totalAttendingGuests,
        },
        rsvps,
      });
    } else {
      const rsvps: FallbackRsvp[] = global.fallbackRsvps || [];
      const totalSubmissions = rsvps.length;
      const attendingList = rsvps.filter((r) => r.attendance === "attending");
      const declinedList = rsvps.filter((r) => r.attendance === "declined");
      const totalAttendingGuests = attendingList.reduce((acc, curr) => acc + (curr.guestCount || 1), 0);

      return NextResponse.json({
        success: true,
        stats: {
          totalSubmissions,
          attendingCount: attendingList.length,
          declinedCount: declinedList.length,
          totalGuests: totalAttendingGuests,
        },
        rsvps,
      });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error loading RSVPs";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing RSVP ID" }, { status: 400 });
    }

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      await RsvpModel.findByIdAndDelete(id);
    } else {
      if (global.fallbackRsvps) {
        global.fallbackRsvps = global.fallbackRsvps.filter((r) => r._id !== id);
      }
    }

    return NextResponse.json({ success: true, message: "RSVP removed successfully." });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error deleting RSVP";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
