import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectToDatabase, formatSafeErrorMessage } from "@/lib/mongodb";
import { WeddingCardModel } from "@/models/WeddingCard";
import { RsvpModel, FallbackRsvp } from "@/models/Rsvp";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await params;
    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Card slug is required." },
        { status: 400 }
      );
    }
    const cleanSlug = slug.toLowerCase().trim();

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const card = await WeddingCardModel.findOne({ slug: cleanSlug });
      if (!card) {
        return NextResponse.json(
          { success: false, message: "Card not found" },
          { status: 404 }
        );
      }

      // Authorization: Admin or Card Owner
      if (card.userId !== user.id && user.role !== "admin") {
        return NextResponse.json(
          { success: false, message: "You do not have permission to view RSVPs for this card." },
          { status: 403 }
        );
      }

      const rsvps = await RsvpModel.find({ cardSlug: cleanSlug }).sort({ createdAt: -1 });

      const totalSubmissions = rsvps.length;
      const attendingCount = rsvps.filter((r) => r.attendance === "attending").length;
      const declinedCount = rsvps.filter((r) => r.attendance === "declined").length;
      const maybeCount = rsvps.filter((r) => r.attendance === "maybe").length;
      const totalGuests = rsvps
        .filter((r) => r.attendance === "attending")
        .reduce((acc, curr) => acc + (typeof curr.guestCount === "number" ? curr.guestCount : 1), 0);

      return NextResponse.json({
        success: true,
        cardSlug: cleanSlug,
        stats: {
          totalSubmissions,
          attendingCount,
          declinedCount,
          maybeCount,
          totalGuests,
        },
        rsvps,
      });
    } else {
      // Database connection unavailable
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { success: false, message: "Database service temporarily unavailable." },
          { status: 503 }
        );
      }

      // Development fallback mode
      const card = (global.fallbackWeddingCards || []).find((c) => c.slug === cleanSlug);
      if (!card) {
        return NextResponse.json(
          { success: false, message: "Card not found" },
          { status: 404 }
        );
      }

      if (card.userId !== user.id && user.role !== "admin") {
        return NextResponse.json(
          { success: false, message: "You do not have permission to view RSVPs for this card." },
          { status: 403 }
        );
      }

      const allFallbackRsvps: FallbackRsvp[] = global.fallbackRsvps || [];
      const cardRsvps = allFallbackRsvps
        .filter((r) => (r.cardSlug || "").toLowerCase() === cleanSlug)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      const totalSubmissions = cardRsvps.length;
      const attendingCount = cardRsvps.filter((r) => r.attendance === "attending").length;
      const declinedCount = cardRsvps.filter((r) => r.attendance === "declined").length;
      const maybeCount = cardRsvps.filter((r) => r.attendance === "maybe").length;
      const totalGuests = cardRsvps
        .filter((r) => r.attendance === "attending")
        .reduce((acc, curr) => acc + (typeof curr.guestCount === "number" ? curr.guestCount : 1), 0);

      return NextResponse.json({
        success: true,
        cardSlug: cleanSlug,
        stats: {
          totalSubmissions,
          attendingCount,
          declinedCount,
          maybeCount,
          totalGuests,
        },
        rsvps: cardRsvps,
      });
    }
  } catch (error: unknown) {
    const msg = formatSafeErrorMessage(error, "Error loading RSVPs.");
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
