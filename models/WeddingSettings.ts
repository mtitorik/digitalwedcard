import mongoose, { Schema, Document, Model } from "mongoose";

export interface IWeddingSettings extends Document {
  groomName: string;
  brideName: string;
  eventTitle: string;
  eventSubtitle: string;
  eventDate: string; // ISO string or human date
  eventTime: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  googleMapsUrl: string;
  dressCodeTitle: string;
  dressCodeDetails: string;
  rsvpDeadline: string;
  phoneContact: string;
  updatedAt: Date;
}

const WeddingSettingsSchema: Schema = new Schema(
  {
    groomName: { type: String, default: "Mohammad Sajedul Islam" },
    brideName: { type: String, default: "Sadia" },
    eventTitle: { type: String, default: "Grand Wedding Reception" },
    eventSubtitle: { type: String, default: "Walima Celebration" },
    eventDate: { type: String, default: "2026-12-29T19:00:00+06:00" },
    eventTime: { type: String, default: "7:00 PM BST (Evening)" },
    venueName: { type: String, default: "Phoenix Convention Hall" },
    venueAddress: { type: String, default: "Tejgaon Industrial Area, Shahid Tajuddin Ahmed Sarani" },
    venueCity: { type: String, default: "Dhaka - 1208, Bangladesh" },
    googleMapsUrl: {
      type: String,
      default:
        "https://www.google.com/maps/search/?api=1&query=Phoenix+Convention+Hall+Tejgaon+Dhaka+Bangladesh",
    },
    dressCodeTitle: { type: String, default: "Traditional / Formal" },
    dressCodeDetails: { type: String, default: "Sherwani, Suit, Lehenga, Sharee" },
    rsvpDeadline: { type: String, default: "December 20, 2026" },
    phoneContact: { type: String, default: "+880 1700-000000" },
  },
  { timestamps: true }
);

export interface FallbackSettings {
  groomName: string;
  brideName: string;
  eventTitle: string;
  eventSubtitle: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  venueCity: string;
  googleMapsUrl: string;
  dressCodeTitle: string;
  dressCodeDetails: string;
  rsvpDeadline: string;
  phoneContact: string;
}

declare global {
  // eslint-disable-next-line no-var
  var fallbackSettings: FallbackSettings | undefined;
}

if (!global.fallbackSettings) {
  global.fallbackSettings = {
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
}

export const WeddingSettingsModel: Model<IWeddingSettings> =
  mongoose.models.WeddingSettings ||
  mongoose.model<IWeddingSettings>("WeddingSettings", WeddingSettingsSchema);
