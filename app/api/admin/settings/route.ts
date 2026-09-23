import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { WeddingSettingsModel, FallbackSettings } from "@/models/WeddingSettings";

export async function GET() {
  try {
    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      let settings = await WeddingSettingsModel.findOne();
      if (!settings) {
        settings = await WeddingSettingsModel.create({
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
        });
      }
      return NextResponse.json({ success: true, settings });
    } else {
      const settings: FallbackSettings = global.fallbackSettings || {
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
      return NextResponse.json({ success: true, settings });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error fetching settings";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      let settings = await WeddingSettingsModel.findOne();
      if (!settings) {
        settings = new WeddingSettingsModel(body);
      } else {
        Object.assign(settings, body);
      }
      await settings.save();
      return NextResponse.json({
        success: true,
        message: "Wedding settings updated successfully.",
        settings,
      });
    } else {
      if (!global.fallbackSettings) {
        global.fallbackSettings = {} as FallbackSettings;
      }
      global.fallbackSettings = {
        ...global.fallbackSettings,
        ...body,
      };
      return NextResponse.json({
        success: true,
        message: "Wedding settings updated successfully (in-memory).",
        settings: global.fallbackSettings,
      });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error saving settings";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
