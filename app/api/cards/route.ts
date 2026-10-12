import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectToDatabase, formatSafeErrorMessage } from "@/lib/mongodb";
import { WeddingCardModel, FallbackWeddingCard } from "@/models/WeddingCard";
import { SAMPLE_TEMPLATES } from "@/data/sampleTemplates";
import type { WeddingInviteData } from "@/types/invite";

const VALID_TEMPLATE_IDS = new Set(
  Array.from({ length: 20 }, (_, i) => `template-${String(i + 1).padStart(2, "0")}`)
);

export function isValidTemplateId(id: unknown): id is string {
  return typeof id === "string" && VALID_TEMPLATE_IDS.has(id);
}

export function resolveTemplateId(
  topLevelId?: unknown,
  nestedId?: unknown,
  existingCardId?: string
): { valid: true; templateId: string } | { valid: false; message: string } {
  if (topLevelId !== undefined && topLevelId !== null && topLevelId !== "") {
    if (!isValidTemplateId(topLevelId)) {
      return {
        valid: false,
        message: `Invalid templateId: "${topLevelId}". Must be one of template-01 through template-20.`,
      };
    }
  }

  if (nestedId !== undefined && nestedId !== null && nestedId !== "") {
    if (!isValidTemplateId(nestedId)) {
      return {
        valid: false,
        message: `Invalid inviteData.templateId: "${nestedId}". Must be one of template-01 through template-20.`,
      };
    }
  }

  let finalId: string;
  if (isValidTemplateId(topLevelId)) {
    finalId = topLevelId;
  } else if (isValidTemplateId(nestedId)) {
    finalId = nestedId;
  } else if (existingCardId && isValidTemplateId(existingCardId)) {
    finalId = existingCardId;
  } else {
    finalId = "template-01";
  }

  return { valid: true, templateId: finalId };
}

export function validateModernInviteData(
  data: unknown
): { valid: true; inviteData: WeddingInviteData } | { valid: false; message: string } {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { valid: false, message: "inviteData must be a valid object." };
  }

  const raw = data as Record<string, unknown>;

  if (!raw.groomName || typeof raw.groomName !== "string" || !raw.groomName.trim()) {
    return { valid: false, message: "inviteData.groomName is required." };
  }
  if (!raw.brideName || typeof raw.brideName !== "string" || !raw.brideName.trim()) {
    return { valid: false, message: "inviteData.brideName is required." };
  }
  if (typeof raw.parentsGroom !== "string") {
    return { valid: false, message: "inviteData.parentsGroom must be a string." };
  }
  if (typeof raw.parentsBride !== "string") {
    return { valid: false, message: "inviteData.parentsBride must be a string." };
  }
  if (!raw.weddingDate || typeof raw.weddingDate !== "string" || !raw.weddingDate.trim()) {
    return { valid: false, message: "inviteData.weddingDate is required." };
  }
  if (!raw.countdownTarget || typeof raw.countdownTarget !== "string" || !raw.countdownTarget.trim()) {
    return { valid: false, message: "inviteData.countdownTarget is required." };
  }
  if (!Array.isArray(raw.events)) {
    return { valid: false, message: "inviteData.events must be an array." };
  }
  if (!Array.isArray(raw.gallery)) {
    return { valid: false, message: "inviteData.gallery must be an array." };
  }
  if (!raw.rsvp || typeof raw.rsvp !== "object" || Array.isArray(raw.rsvp)) {
    return { valid: false, message: "inviteData.rsvp must be an object." };
  }
  if (!raw.audio || typeof raw.audio !== "object" || Array.isArray(raw.audio)) {
    return { valid: false, message: "inviteData.audio must be an object." };
  }

  return { valid: true, inviteData: raw as unknown as WeddingInviteData };
}

function generateSlug(groom: string, bride: string): string {
  const base = `${groom}-and-${bride}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return `${base}-${Math.floor(1000 + Math.random() * 9000)}`;
}

function sanitizeCardCover<T extends { slug?: string; namesFormatted?: string; coverImage?: string }>(card: T): T {
  const isBlank =
    !card.coverImage ||
    card.coverImage.length < 200 ||
    card.coverImage.includes("iVBORw0KGgo") ||
    card.coverImage.trim() === "";

  if (isBlank) {
    const isSajedul =
      card.slug?.includes("sajedul") ||
      card.namesFormatted?.toLowerCase().includes("sajedul");
    return {
      ...card,
      coverImage: isSajedul ? "/images/sajedul-and-sadia.jpg" : "/images/default-couple.jpg",
    };
  }
  return card;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mineOnly = searchParams.get("mine") === "true";

    const user = await getAuthenticatedUser(req);

    if (mineOnly && !user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      let query: Record<string, unknown> = { isPublic: true };
      if (mineOnly && user) {
        query = { userId: user.id };
      }

      const cards = await WeddingCardModel.find(query).sort({ createdAt: -1 }).lean();

      return NextResponse.json({ success: true, cards: cards.map(sanitizeCardCover) });
    } else {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { success: false, message: "Database service temporarily unavailable." },
          { status: 503 }
        );
      }

      // Local development fallback only
      let cards = (global.fallbackWeddingCards || SAMPLE_TEMPLATES) as FallbackWeddingCard[];
      if (global.fallbackWeddingCards) {
        global.fallbackWeddingCards = global.fallbackWeddingCards.map(sanitizeCardCover);
        cards = global.fallbackWeddingCards;
      }
      if (mineOnly && user) {
        cards = cards.filter((c) => c.userId === user.id);
      } else {
        const existingSlugs = new Set(cards.map((c) => c.slug));
        const missingTemplates = SAMPLE_TEMPLATES.filter((t) => !existingSlugs.has(t.slug));
        cards = [...cards.filter((c) => c.isPublic), ...missingTemplates];
      }
      return NextResponse.json({ success: true, cards: cards.map(sanitizeCardCover) });
    }
  } catch (error: unknown) {
    const msg = formatSafeErrorMessage(error, "Failed to retrieve cards.");
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to create a wedding invitation card." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const hasInviteData = body.inviteData !== undefined && body.inviteData !== null;

    let cardPayload: {
      userId: string;
      authorName: string;
      slug: string;
      templateThemeId?: string;
      templateId?: string;
      inviteData?: WeddingInviteData | null;
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
    };

    if (hasInviteData) {
      // --------------------------------------------------
      // MODE B — MODERN PAYLOAD
      // --------------------------------------------------
      const validation = validateModernInviteData(body.inviteData);
      if (!validation.valid) {
        return NextResponse.json({ success: false, message: validation.message }, { status: 400 });
      }

      const templateRes = resolveTemplateId(body.templateId, validation.inviteData.templateId);
      if (!templateRes.valid) {
        return NextResponse.json({ success: false, message: templateRes.message }, { status: 400 });
      }

      const groom = validation.inviteData.groomName.trim();
      const bride = validation.inviteData.brideName.trim();

      let slug = body.customSlug
        ? String(body.customSlug).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
        : generateSlug(groom, bride);

      if (!slug) {
        slug = generateSlug(groom, bride);
      }

      const normalizedInviteData: WeddingInviteData = {
        ...validation.inviteData,
        id: slug,
        templateId: templateRes.templateId,
      };

      const namesFormatted = `${groom.split(" ")[0]} & ${bride.split(" ")[0]}`;
      const groomInitial = groom.charAt(0).toUpperCase();
      const brideInitial = bride.charAt(0).toUpperCase();
      const monogram = `${groomInitial} & ${brideInitial}`;

      const firstEvent = normalizedInviteData.events[0];
      const coverImage =
        (typeof body.coverImage === "string" && body.coverImage.trim()) ||
        (normalizedInviteData.gallery[0] && typeof normalizedInviteData.gallery[0] === "string" && normalizedInviteData.gallery[0].trim()) ||
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85";

      const venueName = firstEvent?.venueName?.trim() || "Phoenix Convention Hall";

      cardPayload = {
        userId: user.id,
        authorName: user.name,
        slug,
        templateThemeId: typeof body.templateThemeId === "string" && body.templateThemeId.trim()
          ? body.templateThemeId.trim()
          : "royal-emerald",
        templateId: templateRes.templateId,
        inviteData: normalizedInviteData,
        groomName: groom,
        brideName: bride,
        namesFormatted,
        monogram,
        eventTitle: firstEvent?.title?.trim() || "Grand Wedding Reception",
        eventSubtitle: firstEvent?.description?.trim() || "Walima Celebration",
        eventDate: normalizedInviteData.weddingDate || normalizedInviteData.countdownTarget || "2026-12-29T19:00:00+06:00",
        eventTime: firstEvent?.time?.trim() || "7:00 PM BST (Evening)",
        venueName,
        venueAddress: firstEvent?.address?.trim() || "Tejgaon Industrial Area",
        venueCity: "Dhaka, Bangladesh",
        googleMapsUrl:
          firstEvent?.mapsUrl?.trim() ||
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName)}`,
        dressCodeTitle: "Traditional / Formal",
        dressCodeDetails:
          firstEvent?.dressCode?.trim() ||
          normalizedInviteData.dressCodeDetails?.trim() ||
          "Sherwani, Suit, Lehenga, Sharee",
        rsvpDeadline: normalizedInviteData.rsvp?.deadline?.trim() || "10 Days before event",
        phoneContact: normalizedInviteData.rsvp?.contactNumber?.trim() || "+880 1700-000000",
        tagline:
          normalizedInviteData.tagline?.trim() ||
          (typeof body.tagline === "string" && body.tagline.trim()) ||
          "Together with our families, we cordially invite you to celebrate this joyous occasion.",
        hashtag:
          normalizedInviteData.hashtag?.trim() ||
          (typeof body.hashtag === "string" && body.hashtag.trim()) ||
          `#${groom.split(" ")[0]}${bride.split(" ")[0]}Wedding`,
        coverImage,
        isPublic: body.isPublic !== undefined ? !!body.isPublic : true,
      };
    } else {
      // --------------------------------------------------
      // MODE A — LEGACY PAYLOAD
      // --------------------------------------------------
      const {
        groomName,
        brideName,
        templateThemeId,
        eventTitle,
        eventSubtitle,
        eventDate,
        eventTime,
        venueName,
        venueAddress,
        venueCity,
        googleMapsUrl,
        dressCodeTitle,
        dressCodeDetails,
        rsvpDeadline,
        phoneContact,
        tagline,
        hashtag,
        coverImage,
        isPublic,
        customSlug,
        templateId,
      } = body;

      if (!groomName || !brideName) {
        return NextResponse.json(
          { success: false, message: "Groom's name and Bride's name are required." },
          { status: 400 }
        );
      }

      let legacyTemplateId = "template-01";
      if (templateId !== undefined && templateId !== null && templateId !== "") {
        if (!isValidTemplateId(templateId)) {
          return NextResponse.json(
            { success: false, message: `Invalid templateId: "${templateId}". Must be one of template-01 through template-20.` },
            { status: 400 }
          );
        }
        legacyTemplateId = templateId;
      }

      let slug = customSlug
        ? String(customSlug).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
        : generateSlug(groomName, brideName);

      if (!slug) {
        slug = generateSlug(groomName, brideName);
      }

      const namesFormatted = `${groomName.trim().split(" ")[0]} & ${brideName.trim().split(" ")[0]}`;
      const groomInitial = groomName.trim().charAt(0).toUpperCase();
      const brideInitial = brideName.trim().charAt(0).toUpperCase();
      const monogram = `${groomInitial} & ${brideInitial}`;

      cardPayload = {
        userId: user.id,
        authorName: user.name,
        slug,
        templateThemeId: templateThemeId || "royal-emerald",
        templateId: legacyTemplateId,
        inviteData: null,
        groomName: groomName.trim(),
        brideName: brideName.trim(),
        namesFormatted,
        monogram,
        eventTitle: eventTitle?.trim() || "Grand Wedding Reception",
        eventSubtitle: eventSubtitle?.trim() || "Walima Celebration",
        eventDate: eventDate || "2026-12-29T19:00:00+06:00",
        eventTime: eventTime || "7:00 PM BST (Evening)",
        venueName: venueName?.trim() || "Phoenix Convention Hall",
        venueAddress: venueAddress?.trim() || "Tejgaon Industrial Area",
        venueCity: venueCity?.trim() || "Dhaka, Bangladesh",
        googleMapsUrl:
          googleMapsUrl?.trim() ||
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName || "Dhaka Bangladesh")}`,
        dressCodeTitle: dressCodeTitle?.trim() || "Traditional / Formal",
        dressCodeDetails: dressCodeDetails?.trim() || "Sherwani, Suit, Lehenga, Sharee",
        rsvpDeadline: rsvpDeadline?.trim() || "10 Days before event",
        phoneContact: phoneContact?.trim() || "+880 1700-000000",
        tagline:
          tagline?.trim() ||
          "Together with our families, we cordially invite you to celebrate this joyous occasion.",
        hashtag: hashtag?.trim() || `#${groomName.split(" ")[0]}${brideName.split(" ")[0]}Wedding`,
        coverImage:
          coverImage?.trim() ||
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85",
        isPublic: isPublic !== undefined ? !!isPublic : true,
      };
    }

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      // Check slug uniqueness
      const existing = await WeddingCardModel.findOne({ slug: cardPayload.slug });
      if (existing) {
        cardPayload.slug = `${cardPayload.slug}-${Date.now().toString().slice(-4)}`;
        if (cardPayload.inviteData) {
          cardPayload.inviteData.id = cardPayload.slug;
        }
      }

      const newCard = await WeddingCardModel.create(cardPayload);
      return NextResponse.json({
        success: true,
        message: "Digital wedding invitation card created successfully!",
        card: newCard,
      });
    } else {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            success: false,
            message: "Database service unavailable. Card creation requires an active database connection.",
          },
          { status: 503 }
        );
      }

      if (!global.fallbackWeddingCards) global.fallbackWeddingCards = [];

      const existing = global.fallbackWeddingCards.find((c) => c.slug === cardPayload.slug);
      if (existing) {
        cardPayload.slug = `${cardPayload.slug}-${Date.now().toString().slice(-4)}`;
        if (cardPayload.inviteData) {
          cardPayload.inviteData.id = cardPayload.slug;
        }
      }

      const fallbackCard: FallbackWeddingCard = {
        _id: "card-" + Date.now(),
        ...cardPayload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      global.fallbackWeddingCards.unshift(fallbackCard);

      return NextResponse.json({
        success: true,
        message: "Digital wedding invitation card created (development fallback in-memory only)!",
        card: fallbackCard,
      });
    }
  } catch (error: unknown) {
    const msg = formatSafeErrorMessage(error, "Failed to create invitation card. Please try again.");
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
