import mongoose, { Schema, Document, Model } from "mongoose";
import { SAMPLE_TEMPLATES, SampleWeddingTemplate } from "@/data/sampleTemplates";

export interface IWeddingCard extends Document {
  userId: string;
  authorName: string;
  slug: string;
  templateThemeId?: string;
  groomName: string;
  brideName: string;
  namesFormatted: string;
  monogram: string;
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
  tagline: string;
  hashtag: string;
  coverImage: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const WeddingCardSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    authorName: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    templateThemeId: { type: String, default: "royal-emerald" },
    groomName: { type: String, required: true, trim: true },
    brideName: { type: String, required: true, trim: true },
    namesFormatted: { type: String, required: true },
    monogram: { type: String, required: true },
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
    tagline: {
      type: String,
      default:
        "Together with our loving families, we cordially invite you to celebrate the joyous reception of our wedding.",
    },
    hashtag: { type: String, default: "#SajedulWedsSadia" },
    coverImage: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
    },
    isPublic: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export interface FallbackWeddingCard {
  _id: string;
  userId: string;
  authorName: string;
  slug: string;
  templateThemeId?: string;
  groomName: string;
  brideName: string;
  namesFormatted: string;
  monogram: string;
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
  tagline: string;
  hashtag: string;
  coverImage: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var fallbackWeddingCards: FallbackWeddingCard[] | undefined;
}

if (!global.fallbackWeddingCards) {
  global.fallbackWeddingCards = SAMPLE_TEMPLATES.map((t) => ({
    _id: t._id,
    userId: t.userId,
    authorName: t.authorName,
    slug: t.slug,
    templateThemeId: t.templateThemeId,
    groomName: t.groomName,
    brideName: t.brideName,
    namesFormatted: t.namesFormatted,
    monogram: t.monogram,
    eventTitle: t.eventTitle,
    eventSubtitle: t.eventSubtitle,
    eventDate: t.eventDate,
    eventTime: t.eventTime,
    venueName: t.venueName,
    venueAddress: t.venueAddress,
    venueCity: t.venueCity,
    googleMapsUrl: t.googleMapsUrl,
    dressCodeTitle: t.dressCodeTitle,
    dressCodeDetails: t.dressCodeDetails,
    rsvpDeadline: t.rsvpDeadline,
    phoneContact: t.phoneContact,
    tagline: t.tagline,
    hashtag: t.hashtag,
    coverImage: t.coverImage,
    isPublic: t.isPublic,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  }));
}

export const WeddingCardModel: Model<IWeddingCard> =
  mongoose.models.WeddingCard ||
  mongoose.model<IWeddingCard>("WeddingCard", WeddingCardSchema);

