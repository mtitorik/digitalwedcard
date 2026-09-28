import { WeddingInviteData, WeddingEvent } from "@/types/invite";

/**
 * Interface representing the source wedding card data accepted by the adapter.
 * Compatible with IWeddingCard (Mongoose Document), FallbackWeddingCard,
 * lean Mongoose query results, and legacy flat objects.
 */
export interface WeddingCardSource {
  _id?: string;
  slug?: string;
  userId?: string;
  authorName?: string;
  templateId?: string;
  templateThemeId?: string;
  inviteData?: WeddingInviteData | null;
  groomName?: string;
  brideName?: string;
  namesFormatted?: string;
  monogram?: string;
  eventTitle?: string;
  eventSubtitle?: string;
  eventDate?: string;
  eventTime?: string;
  venueName?: string;
  venueAddress?: string;
  venueCity?: string;
  googleMapsUrl?: string;
  dressCodeTitle?: string;
  dressCodeDetails?: string;
  rsvpDeadline?: string;
  phoneContact?: string;
  tagline?: string;
  hashtag?: string;
  coverImage?: string;
  isPublic?: boolean;
}

/**
 * Pure adapter function that transforms either a modern card or a legacy flat card
 * into a standardized WeddingInviteData structure expected by the 20 wedding templates.
 *
 * This adapter does not connect to or query MongoDB.
 *
 * - Modern card: If card.inviteData exists, it is used as the primary data source
 *   without overwriting existing values.
 * - Legacy card: If card.inviteData is missing/null, constructs a compliant
 *   WeddingInviteData object from the legacy flat fields.
 */
export function toWeddingInviteData(card: WeddingCardSource): WeddingInviteData {
  if (!card) {
    throw new Error("WeddingCardSource must be provided to toWeddingInviteData adapter.");
  }

  // A. MODERN CARD: structured inviteData exists
  if (card.inviteData) {
    const data = card.inviteData;
    const resolvedTemplateId = card.templateId || data.templateId || "template-01";
    const resolvedId = data.id || card.slug;

    return {
      ...data,
      ...(resolvedId ? { id: resolvedId } : {}),
      templateId: resolvedTemplateId,
      groomName: data.groomName ?? card.groomName ?? "",
      brideName: data.brideName ?? card.brideName ?? "",
      parentsGroom: data.parentsGroom ?? "",
      parentsBride: data.parentsBride ?? "",
      weddingDate: data.weddingDate ?? card.eventDate ?? "",
      countdownTarget: data.countdownTarget ?? data.weddingDate ?? card.eventDate ?? "",
      events: Array.isArray(data.events) ? data.events : [],
      gallery: Array.isArray(data.gallery)
        ? data.gallery
        : card.coverImage && card.coverImage.trim().length > 0
          ? [card.coverImage]
          : [],
      rsvp: {
        enabled: data.rsvp?.enabled ?? true,
        deadline: data.rsvp?.deadline ?? card.rsvpDeadline ?? "",
        contactNumber: data.rsvp?.contactNumber ?? card.phoneContact ?? "",
        ...(data.rsvp?.formUrl ? { formUrl: data.rsvp.formUrl } : {}),
        ...(data.rsvp?.contactPerson ? { contactPerson: data.rsvp.contactPerson } : {}),
        ...(data.rsvp?.guestCountOptions ? { guestCountOptions: data.rsvp.guestCountOptions } : {}),
      },
      audio: {
        enabled: data.audio?.enabled ?? false,
        trackUrl: data.audio?.trackUrl ?? "",
        ...(data.audio?.title ? { title: data.audio.title } : {}),
        ...(data.audio?.artist ? { artist: data.audio.artist } : {}),
        ...(data.audio?.autoPlay !== undefined ? { autoPlay: data.audio.autoPlay } : {}),
      },
    };
  }

  // B. LEGACY CARD: construct WeddingInviteData from flat fields
  const primaryEvent: WeddingEvent = {
    title: card.eventTitle || "",
    time: card.eventTime || "",
    date: card.eventDate || "",
    venueName: card.venueName || "",
    address: card.venueAddress || "",
    mapsUrl: card.googleMapsUrl || "",
    ...(card.eventSubtitle ? { description: card.eventSubtitle } : {}),
    ...(card.dressCodeDetails ? { dressCode: card.dressCodeDetails } : {}),
  };

  const gallery: string[] =
    card.coverImage && card.coverImage.trim().length > 0
      ? [card.coverImage]
      : [];

  const legacyInviteData: WeddingInviteData = {
    ...(card.slug ? { id: card.slug } : {}),
    // Do NOT convert legacy templateThemeId (e.g. "royal-emerald") to a modern templateId
    templateId: card.templateId || "template-01",
    groomName: card.groomName || "",
    brideName: card.brideName || "",
    parentsGroom: "",
    parentsBride: "",
    weddingDate: card.eventDate || "",
    countdownTarget: card.eventDate || "",
    events: [primaryEvent],
    gallery,
    rsvp: {
      enabled: true,
      deadline: card.rsvpDeadline || "",
      contactNumber: card.phoneContact || "",
    },
    audio: {
      enabled: false,
      trackUrl: "",
    },
    ...(card.tagline ? { tagline: card.tagline } : {}),
    ...(card.hashtag ? { hashtag: card.hashtag } : {}),
    ...(card.dressCodeDetails ? { dressCodeDetails: card.dressCodeDetails } : {}),
  };

  return legacyInviteData;
}
