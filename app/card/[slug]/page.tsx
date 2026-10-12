import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { WeddingCardModel, FallbackWeddingCard } from "@/models/WeddingCard";
import { WeddingCardView, WeddingCardData } from "@/components/WeddingCardView";
import { getTemplateBySlug } from "@/data/sampleTemplates";
import { WeddingCardRenderer } from "@/templates";
import { toWeddingInviteData } from "@/lib/adapters/inviteAdapter";
import type { WeddingInviteData } from "@/types/invite";

export interface PublicCardData extends WeddingCardData {
  templateId?: string;
  inviteData?: WeddingInviteData | null;
}

export function hasUsableInviteData(card: { inviteData?: WeddingInviteData | null }): boolean {
  if (!card.inviteData || typeof card.inviteData !== "object") {
    return false;
  }
  return Boolean(card.inviteData.groomName && card.inviteData.brideName);
}

export function PublicCardRenderer({ card }: { card: PublicCardData }) {
  if (hasUsableInviteData(card)) {
    const modernData = toWeddingInviteData(card);
    const templateId = modernData.templateId || card.templateId || "template-01";
    return <WeddingCardRenderer templateId={templateId} data={modernData} />;
  }

  return <WeddingCardView card={card} />;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function getCardBySlug(slug: string): Promise<PublicCardData | null> {
  const cleanSlug = slug.toLowerCase();

  try {
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const card = await WeddingCardModel.findOne({ slug: cleanSlug }).lean();
      if (card) {
        return {
          slug: card.slug,
          templateThemeId: card.templateThemeId,
          templateId: card.templateId,
          inviteData: card.inviteData,
          groomName: card.groomName,
          brideName: card.brideName,
          namesFormatted: card.namesFormatted,
          monogram: card.monogram,
          eventTitle: card.eventTitle,
          eventSubtitle: card.eventSubtitle,
          eventDate: card.eventDate,
          eventTime: card.eventTime,
          venueName: card.venueName,
          venueAddress: card.venueAddress,
          venueCity: card.venueCity,
          googleMapsUrl: card.googleMapsUrl,
          dressCodeTitle: card.dressCodeTitle,
          dressCodeDetails: card.dressCodeDetails,
          rsvpDeadline: card.rsvpDeadline,
          phoneContact: card.phoneContact,
          tagline: card.tagline,
          hashtag: card.hashtag,
          coverImage:
            !card.coverImage ||
            card.coverImage.length < 200 ||
            card.coverImage.includes("iVBORw0KGgo")
              ? (cleanSlug.includes("sajedul") ? "/images/sajedul-and-sadia.jpg" : "/images/default-couple.jpg")
              : card.coverImage,
        };
      }
    }
  } catch (err) {
    console.warn("MongoDB fetch error in page:", err);
  }

  // In production, do not mix or fall back to mock data
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  // Development-only fallback to sample templates
  const sample = getTemplateBySlug(cleanSlug);
  if (sample) {
    return {
      slug: sample.slug,
      templateThemeId: sample.templateThemeId,
      templateId: "template-01",
      inviteData: null,
      groomName: sample.groomName,
      brideName: sample.brideName,
      namesFormatted: sample.namesFormatted,
      monogram: sample.monogram,
      eventTitle: sample.eventTitle,
      eventSubtitle: sample.eventSubtitle,
      eventDate: sample.eventDate,
      eventTime: sample.eventTime,
      venueName: sample.venueName,
      venueAddress: sample.venueAddress,
      venueCity: sample.venueCity,
      googleMapsUrl: sample.googleMapsUrl,
      dressCodeTitle: sample.dressCodeTitle,
      dressCodeDetails: sample.dressCodeDetails,
      rsvpDeadline: sample.rsvpDeadline,
      phoneContact: sample.phoneContact,
      tagline: sample.tagline,
      hashtag: sample.hashtag,
      coverImage: sample.coverImage,
    };
  }

  // Fallback in-memory
  const fallback = (global.fallbackWeddingCards || []).find((c) => c.slug === cleanSlug);
  if (fallback) {
    return {
      slug: fallback.slug,
      templateThemeId: fallback.templateThemeId,
      templateId: fallback.templateId,
      inviteData: fallback.inviteData,
      groomName: fallback.groomName,
      brideName: fallback.brideName,
      namesFormatted: fallback.namesFormatted,
      monogram: fallback.monogram,
      eventTitle: fallback.eventTitle,
      eventSubtitle: fallback.eventSubtitle,
      eventDate: fallback.eventDate,
      eventTime: fallback.eventTime,
      venueName: fallback.venueName,
      venueAddress: fallback.venueAddress,
      venueCity: fallback.venueCity,
      googleMapsUrl: fallback.googleMapsUrl,
      dressCodeTitle: fallback.dressCodeTitle,
      dressCodeDetails: fallback.dressCodeDetails,
      rsvpDeadline: fallback.rsvpDeadline,
      phoneContact: fallback.phoneContact,
      tagline: fallback.tagline,
      hashtag: fallback.hashtag,
      coverImage:
        !fallback.coverImage ||
        fallback.coverImage.length < 200 ||
        fallback.coverImage.includes("iVBORw0KGgo")
          ? (cleanSlug.includes("sajedul") ? "/images/sajedul-and-sadia.jpg" : "/images/default-couple.jpg")
          : fallback.coverImage,
    };
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const card = await getCardBySlug(slug);

  if (!card) {
    return {
      title: "Wedding Invitation | Digitalwedcards",
    };
  }

  return {
    title: `${card.namesFormatted} — Wedding Invitation | Digitalwedcards`,
    description: `${card.eventTitle} • ${card.namesFormatted}. ${card.tagline}`,
    openGraph: {
      title: `${card.namesFormatted} — Wedding Invitation | Digitalwedcards`,
      description: `${card.eventTitle} • ${card.namesFormatted} cordially invite you to celebrate their union.`,
      siteName: "Digitalwedcards",
    },
  };
}

export default async function DynamicWeddingCardPage({ params }: PageProps) {
  const { slug } = await params;
  const card = await getCardBySlug(slug);

  if (!card) {
    notFound();
  }

  return <PublicCardRenderer card={card} />;
}
