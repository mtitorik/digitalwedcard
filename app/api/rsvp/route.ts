import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, formatSafeErrorMessage } from "@/lib/mongodb";
import { RsvpModel, FallbackRsvp, IRsvp } from "@/models/Rsvp";
import { WeddingCardModel } from "@/models/WeddingCard";

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
      if (!body || typeof body !== "object" || Array.isArray(body)) {
        return NextResponse.json(
          { success: false, message: "Invalid request payload. Expected a JSON object." },
          { status: 400 }
        );
      }
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    // 1. Require a non-empty cardSlug
    const rawCardSlug = body.cardSlug;
    if (typeof rawCardSlug !== "string" || !rawCardSlug.trim()) {
      return NextResponse.json(
        { success: false, message: "cardSlug is required." },
        { status: 400 }
      );
    }
    const cardSlug = rawCardSlug.trim().toLowerCase();

    // 2. Require a non-empty guest name
    const rawName = body.fullName !== undefined ? body.fullName : body.name;
    if (typeof rawName !== "string" || !rawName.trim()) {
      return NextResponse.json(
        { success: false, message: "Guest name is required." },
        { status: 400 }
      );
    }
    const name = rawName.trim();

    // 3. Require a non-empty phone number
    const rawPhone = body.phone;
    if (typeof rawPhone !== "string" || !rawPhone.trim()) {
      return NextResponse.json(
        { success: false, message: "Phone number is required." },
        { status: 400 }
      );
    }
    const phone = rawPhone.trim();

    // 4. Normalize & validate attendance
    const rawAttendance = body.attendance !== undefined ? body.attendance : body.attending;
    let attendance: "attending" | "declined" | "maybe";

    if (rawAttendance === undefined || rawAttendance === null) {
      attendance = "attending";
    } else if (typeof rawAttendance === "string") {
      const norm = rawAttendance.trim().toLowerCase();
      if (norm === "attending" || norm === "yes") {
        attendance = "attending";
      } else if (norm === "declined" || norm === "no") {
        attendance = "declined";
      } else if (norm === "maybe") {
        attendance = "maybe";
      } else {
        return NextResponse.json(
          {
            success: false,
            message: 'Invalid attendance value. Must be one of: "attending", "declined", "yes", "no", or "maybe".',
          },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid attendance value. Must be a string." },
        { status: 400 }
      );
    }

    // 5. Validate guest count
    const rawGuestCount = body.guestCount !== undefined ? body.guestCount : body.guestsCount;
    let guestCount: number;

    if (attendance === "declined") {
      if (rawGuestCount === undefined || rawGuestCount === null) {
        guestCount = 0;
      } else {
        if (typeof rawGuestCount === "boolean" || typeof rawGuestCount === "object") {
          return NextResponse.json(
            { success: false, message: "Invalid guest count." },
            { status: 400 }
          );
        }
        const num = Number(rawGuestCount);
        if (!Number.isInteger(num) || num !== 0) {
          return NextResponse.json(
            { success: false, message: "For declined attendance, guest count must be 0." },
            { status: 400 }
          );
        }
        guestCount = 0;
      }
    } else {
      // attendance is "attending" or "maybe"
      if (rawGuestCount === undefined || rawGuestCount === null) {
        guestCount = 1;
      } else {
        if (typeof rawGuestCount === "boolean" || typeof rawGuestCount === "object") {
          return NextResponse.json(
            { success: false, message: "Invalid guest count." },
            { status: 400 }
          );
        }
        const num = Number(rawGuestCount);
        if (!Number.isInteger(num) || num < 1 || num > 20) {
          return NextResponse.json(
            { success: false, message: "Guest count must be an integer between 1 and 20." },
            { status: 400 }
          );
        }
        guestCount = num;
      }
    }

    // 6. Validate optional message
    const rawMessage = body.message !== undefined ? body.message : body.wishMessage;
    let message = "";
    if (rawMessage !== undefined && rawMessage !== null) {
      if (typeof rawMessage !== "string") {
        return NextResponse.json(
          { success: false, message: "Message must be a string." },
          { status: 400 }
        );
      }
      message = rawMessage.trim();
    }

    // 7. Connect to database / check availability
    const mongooseConn = await connectToDatabase();

    if (!mongooseConn) {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            success: false,
            message: "RSVP service is temporarily unavailable. Please try submitting your RSVP again shortly.",
          },
          { status: 503 }
        );
      }

      // Development-only fallback card verification
      const fallbackCard = (global.fallbackWeddingCards || []).find(
        (c) => c.slug.toLowerCase() === cardSlug
      );
      if (!fallbackCard || !fallbackCard.isPublic) {
        return NextResponse.json(
          { success: false, message: "Wedding card not found." },
          { status: 404 }
        );
      }
    } else {
      // MongoDB active: verify card existence and public status
      const card = await WeddingCardModel.findOne({ slug: cardSlug }).select("slug isPublic").lean();
      if (!card || !card.isPublic) {
        return NextResponse.json(
          { success: false, message: "Wedding card not found." },
          { status: 404 }
        );
      }
    }

    // 8. Persist RSVP
    let savedData: IRsvp | FallbackRsvp;

    if (mongooseConn) {
      const newRsvp = await RsvpModel.create({
        cardSlug,
        name,
        phone,
        attendance,
        guestCount,
        message,
      });
      savedData = newRsvp;
    } else {
      // In-memory fallback (development only)
      const fallbackEntry: FallbackRsvp = {
        _id: "rsvp-" + Date.now(),
        cardSlug,
        name,
        phone,
        attendance,
        guestCount,
        message,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!global.fallbackRsvps) global.fallbackRsvps = [];
      global.fallbackRsvps.unshift(fallbackEntry);
      savedData = fallbackEntry;
    }

    const wishObj =
      message && message.length > 0
        ? {
            id: savedData._id ? String(savedData._id) : Date.now().toString(),
            name,
            message,
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
    const msg = formatSafeErrorMessage(error, "Error saving RSVP. Please try again.");
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cardSlug = searchParams.get("cardSlug");
    if (!cardSlug || !cardSlug.trim()) {
      return NextResponse.json(
        { success: false, message: "cardSlug query parameter is required." },
        { status: 400 }
      );
    }
    const cleanSlug = cardSlug.trim().toLowerCase();

    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const wishes = await RsvpModel.find({
        cardSlug: cleanSlug,
        message: { $ne: "" },
      })
        .sort({ createdAt: -1 })
        .limit(20)
        .select("name message attendance createdAt");
      return NextResponse.json({ success: true, wishes });
    } else {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ success: true, wishes: [] });
      }

      const wishes = (global.fallbackRsvps || [])
        .filter((r) => r.cardSlug?.toLowerCase() === cleanSlug && r.message && r.message.trim().length > 0)
        .slice(0, 20);
      return NextResponse.json({ success: true, wishes });
    }
  } catch (error: unknown) {
    const msg = formatSafeErrorMessage(error, "Error fetching wishes.");
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
