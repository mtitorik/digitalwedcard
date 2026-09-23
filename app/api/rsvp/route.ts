import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { RsvpModel, FallbackRsvp } from "@/models/Rsvp";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = body.fullName || body.name;
    const phone = body.phone;
    const attendance = body.attendance || body.attending || "attending";
    const guestCount = body.guestCount || body.guestsCount || 1;
    const message = body.message || body.wishMessage || "";
    const cardSlug = body.cardSlug || "sajedul-and-sadia";

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Full name and phone number are required." },
        { status: 400 }
      );
    }

    const mongooseConn = await connectToDatabase();
    const finalGuestCount = attendance === "declined" ? 0 : Number(guestCount) || 1;

    let savedData;

    if (mongooseConn) {
      const newRsvp = await RsvpModel.create({
        cardSlug,
        name: name.trim(),
        phone: phone.trim(),
        attendance,
        guestCount: finalGuestCount,
        message: message ? message.trim() : "",
      });

      savedData = newRsvp;
    } else {
      // In-memory fallback
      const fallbackEntry: FallbackRsvp = {
        _id: "rsvp-" + Date.now(),
        cardSlug,
        name: name.trim(),
        phone: phone.trim(),
        attendance: attendance as "attending" | "declined",
        guestCount: finalGuestCount,
        message: message ? message.trim() : "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!global.fallbackRsvps) global.fallbackRsvps = [];
      global.fallbackRsvps.unshift(fallbackEntry);
      savedData = fallbackEntry;
    }

    const wishObj =
      message && message.trim().length > 0
        ? {
            id: savedData._id?.toString() || Date.now().toString(),
            name: name.trim(),
            message: message.trim(),
            timestamp: "Just now",
            attending: attendance === "attending",
          }
        : null;

    return NextResponse.json({
      success: true,
      message: "Thank you! Your RSVP has been confirmed and saved.",
      data: savedData,
      wish: wishObj,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error saving RSVP";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cardSlug = searchParams.get("cardSlug") || "sajedul-and-sadia";

    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const wishes = await RsvpModel.find({
        cardSlug,
        message: { $ne: "" },
      })
        .sort({ createdAt: -1 })
        .limit(20)
        .select("name message attendance createdAt");
      return NextResponse.json({ success: true, wishes });
    } else {
      const wishes = (global.fallbackRsvps || [])
        .filter((r) => (!r.cardSlug || r.cardSlug === cardSlug) && r.message && r.message.trim().length > 0)
        .slice(0, 20);
      return NextResponse.json({ success: true, wishes });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error fetching wishes";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
