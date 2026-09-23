import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRsvp extends Document {
  cardSlug: string;
  name: string;
  phone: string;
  attendance: "attending" | "declined";
  guestCount: number;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RsvpSchema: Schema = new Schema(
  {
    cardSlug: { type: String, default: "sajedul-and-sadia", index: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    attendance: {
      type: String,
      enum: ["attending", "declined"],
      required: true,
      default: "attending",
    },
    guestCount: { type: Number, required: true, default: 1, min: 1, max: 20 },
    message: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

// In-memory fallback store if MongoDB server is offline
export interface FallbackRsvp {
  _id: string;
  cardSlug?: string;
  name: string;
  phone: string;
  attendance: "attending" | "declined";
  guestCount: number;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var fallbackRsvps: FallbackRsvp[] | undefined;
}

if (!global.fallbackRsvps) {
  global.fallbackRsvps = [
    {
      _id: "demo-rsvp-1",
      cardSlug: "sajedul-and-sadia",
      name: "Engr. Rafiqul Hasan",
      phone: "+8801711223344",
      attendance: "attending",
      guestCount: 2,
      message: "Heartiest congratulations to Sajedul and Sadia! May Allah bless your union.",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      _id: "demo-rsvp-2",
      cardSlug: "sajedul-and-sadia",
      name: "Dr. Farhana Yasmin",
      phone: "+8801819988776",
      attendance: "attending",
      guestCount: 3,
      message: "Looking forward to celebrating this beautiful evening at Phoenix Convention Hall!",
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    {
      _id: "demo-rsvp-3",
      cardSlug: "sajedul-and-sadia",
      name: "Tanvir Ahmed",
      phone: "+8801912345678",
      attendance: "declined",
      guestCount: 1,
      message: "Regretfully cannot join due to travel, but sending my warmest prayers & love 💔",
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    },
  ];
}

export const RsvpModel: Model<IRsvp> =
  mongoose.models.Rsvp || mongoose.model<IRsvp>("Rsvp", RsvpSchema);
