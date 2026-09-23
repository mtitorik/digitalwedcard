import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin, getAuthenticatedUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { RsvpModel, FallbackRsvp } from "@/models/Rsvp";
import { WeddingSettingsModel, FallbackSettings } from "@/models/WeddingSettings";
import { UserModel } from "@/models/User";
import { WeddingCardModel, FallbackWeddingCard } from "@/models/WeddingCard";
import { getOnlineUsersCount, recordUserActivity } from "@/lib/presence";

export async function GET(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const currentUser = await getAuthenticatedUser(req);
  if (currentUser) {
    recordUserActivity(currentUser.email || currentUser.id);
  }

  try {
    const mongooseConn = await connectToDatabase();
    const onlineUsersNow = getOnlineUsersCount();

    if (mongooseConn) {
      const [rsvps, settingsDoc, usersDocs, cardsDocs] = await Promise.all([
        RsvpModel.find().sort({ createdAt: -1 }),
        WeddingSettingsModel.findOne(),
        UserModel.find({}, { password: 0 }).sort({ createdAt: -1 }),
        WeddingCardModel.find().sort({ createdAt: -1 }),
      ]);

      // RSVPs stats
      const totalSubmissions = rsvps.length;
      const attendingList = rsvps.filter((r) => r.attendance === "attending");
      const declinedList = rsvps.filter((r) => r.attendance === "declined");
      const totalAttendingGuests = attendingList.reduce(
        (acc, curr) => acc + (curr.guestCount || 1),
        0
      );
      const totalWishes = rsvps.filter((r) => r.message && r.message.trim().length > 0).length;

      // Card Hosting stats
      const usersSignedUp = usersDocs.length;
      const hostingCardsNow = cardsDocs.filter((c) => c.isPublic !== false).length;
      const totalCardsEverCreated = cardsDocs.length;

      return NextResponse.json({
        success: true,
        stats: {
          totalSubmissions,
          attendingCount: attendingList.length,
          declinedCount: declinedList.length,
          totalGuests: totalAttendingGuests,
          totalWishes,
          usersSignedUp,
          onlineUsersNow,
          hostingCardsNow,
          totalCardsEverCreated,
        },
        databaseStatus: "connected",
        serverTimestamp: new Date().toISOString(),
        rsvps,
        settings: settingsDoc || null,
        users: usersDocs,
        cards: cardsDocs,
      });
    } else {
      // In-Memory Fallback
      const rsvps: FallbackRsvp[] = global.fallbackRsvps || [];
      const totalSubmissions = rsvps.length;
      const attendingList = rsvps.filter((r) => r.attendance === "attending");
      const declinedList = rsvps.filter((r) => r.attendance === "declined");
      const totalAttendingGuests = attendingList.reduce(
        (acc, curr) => acc + (curr.guestCount || 1),
        0
      );
      const totalWishes = rsvps.filter((r) => r.message && r.message.trim().length > 0).length;

      const settings: FallbackSettings =
        global.fallbackSettings || {
          groomName: "Mohammad Sajedul Islam",
          brideName: "Sadia",
          eventTitle: "Grand Wedding Reception",
          eventSubtitle: "Walima Celebration",
          eventDate: "2026-12-29T19:00:00+06:00",
          eventTime: "7:00 PM BST (Evening)",
          venueName: "Phoenix Convention Hall",
          venueAddress: "Tejgaon Industrial Area, Shahid Tajuddin Ahmed Sarani",
          venueCity: "Dhaka - 1208, Bangladesh",
          googleMapsUrl:
            "https://www.google.com/maps/search/?api=1&query=Phoenix+Convention+Hall+Tejgaon+Dhaka+Bangladesh",
          dressCodeTitle: "Traditional / Formal",
          dressCodeDetails: "Sherwani, Suit, Lehenga, Sharee",
          rsvpDeadline: "December 20, 2026",
          phoneContact: "+880 1700-000000",
        };

      const users = (global.fallbackUsers || []).map((u) => ({
        _id: u._id,
        name: u.name,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt,
      }));

      const cards: FallbackWeddingCard[] = global.fallbackWeddingCards || [];
      const usersSignedUp = users.length;
      const hostingCardsNow = cards.filter((c) => c.isPublic !== false).length;
      const totalCardsEverCreated = cards.length;

      return NextResponse.json({
        success: true,
        stats: {
          totalSubmissions,
          attendingCount: attendingList.length,
          declinedCount: declinedList.length,
          totalGuests: totalAttendingGuests,
          totalWishes,
          usersSignedUp,
          onlineUsersNow,
          hostingCardsNow,
          totalCardsEverCreated,
        },
        databaseStatus: "fallback_memory",
        serverTimestamp: new Date().toISOString(),
        rsvps,
        settings,
        users,
        cards,
      });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error loading dashboard data";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
