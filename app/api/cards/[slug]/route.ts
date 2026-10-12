import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectToDatabase, formatSafeErrorMessage } from "@/lib/mongodb";
import { WeddingCardModel } from "@/models/WeddingCard";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const cleanSlug = slug.toLowerCase();

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const card = await WeddingCardModel.findOne({ slug: cleanSlug });
      if (!card) {
        return NextResponse.json({ success: false, message: "Card not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, card });
    } else {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json({ success: false, message: "Database service temporarily unavailable." }, { status: 503 });
      }
      const card = (global.fallbackWeddingCards || []).find((c) => c.slug === cleanSlug);
      if (!card) {
        return NextResponse.json({ success: false, message: "Card not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, card });
    }
  } catch (error: unknown) {
    const msg = formatSafeErrorMessage(error, "Error loading card.");
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

import type { WeddingInviteData } from "@/types/invite";

const VALID_TEMPLATE_IDS = new Set(
  Array.from({ length: 20 }, (_, i) => `template-${String(i + 1).padStart(2, "0")}`)
);

function isValidTemplateId(id: unknown): id is string {
  return typeof id === "string" && VALID_TEMPLATE_IDS.has(id);
}

function resolveTemplateId(
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

function validateModernInviteData(
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

function applyCardUpdates(
  card: any,
  body: Record<string, any>,
  cleanSlug: string
): { success: true } | { success: false; message: string } {
  // Strip protected fields to prevent mass-assignment
  delete body.userId;
  delete body.authorName;
  delete body.slug;
  delete body.createdAt;
  delete body.updatedAt;
  delete body._id;

  const hasInviteData = body.inviteData !== undefined && body.inviteData !== null;

  if (hasInviteData) {
    const val = validateModernInviteData(body.inviteData);
    if (!val.valid) {
      return { success: false, message: val.message };
    }

    const tplRes = resolveTemplateId(body.templateId, val.inviteData.templateId, card.templateId);
    if (!tplRes.valid) {
      return { success: false, message: tplRes.message };
    }

    const normalizedInviteData: WeddingInviteData = {
      ...val.inviteData,
      id: card.slug || cleanSlug,
      templateId: tplRes.templateId,
    };

    card.inviteData = normalizedInviteData;
    card.templateId = tplRes.templateId;

    const groom = normalizedInviteData.groomName.trim();
    const bride = normalizedInviteData.brideName.trim();
    card.groomName = groom;
    card.brideName = bride;
    card.namesFormatted = `${groom.split(" ")[0]} & ${bride.split(" ")[0]}`;
    card.monogram = `${groom.charAt(0).toUpperCase()} & ${bride.charAt(0).toUpperCase()}`;

    if (normalizedInviteData.weddingDate) {
      card.eventDate = normalizedInviteData.weddingDate;
    }

    const firstEvent = normalizedInviteData.events[0];
    if (firstEvent) {
      if (firstEvent.title) card.eventTitle = firstEvent.title.trim();
      if (firstEvent.time) card.eventTime = firstEvent.time.trim();
      if (firstEvent.venueName) card.venueName = firstEvent.venueName.trim();
      if (firstEvent.address) card.venueAddress = firstEvent.address.trim();
      if (firstEvent.mapsUrl) card.googleMapsUrl = firstEvent.mapsUrl.trim();
      if (firstEvent.dressCode) card.dressCodeDetails = firstEvent.dressCode.trim();
    }

    if (normalizedInviteData.rsvp) {
      if (normalizedInviteData.rsvp.deadline) card.rsvpDeadline = normalizedInviteData.rsvp.deadline.trim();
      if (normalizedInviteData.rsvp.contactNumber) card.phoneContact = normalizedInviteData.rsvp.contactNumber.trim();
    }

    if (normalizedInviteData.tagline) card.tagline = normalizedInviteData.tagline.trim();
    if (normalizedInviteData.hashtag) card.hashtag = normalizedInviteData.hashtag.trim();
    if (normalizedInviteData.gallery && normalizedInviteData.gallery[0]) {
      card.coverImage = normalizedInviteData.gallery[0].trim();
    }

    if (body.isPublic !== undefined) card.isPublic = !!body.isPublic;
    if (body.templateThemeId) card.templateThemeId = body.templateThemeId;

    return { success: true };
  }

  // If only templateId was provided without inviteData
  if (body.templateId !== undefined && body.templateId !== null && body.templateId !== "") {
    if (!isValidTemplateId(body.templateId)) {
      return {
        success: false,
        message: `Invalid templateId: "${body.templateId}". Must be one of template-01 through template-20.`,
      };
    }
    card.templateId = body.templateId;
    if (card.inviteData) {
      card.inviteData = {
        ...card.inviteData,
        templateId: body.templateId,
      };
    }
  }

  // Format names if names changed
  if (body.groomName || body.brideName) {
    const g = body.groomName || card.groomName;
    const b = body.brideName || card.brideName;
    card.groomName = g.trim();
    card.brideName = b.trim();
    card.namesFormatted = `${g.trim().split(" ")[0]} & ${b.trim().split(" ")[0]}`;
    card.monogram = `${g.trim().charAt(0).toUpperCase()} & ${b.trim().charAt(0).toUpperCase()}`;
  }

  const ALLOWED_LEGACY_KEYS = [
    "templateThemeId",
    "eventTitle",
    "eventSubtitle",
    "eventDate",
    "eventTime",
    "venueName",
    "venueAddress",
    "venueCity",
    "googleMapsUrl",
    "dressCodeTitle",
    "dressCodeDetails",
    "rsvpDeadline",
    "phoneContact",
    "tagline",
    "hashtag",
    "coverImage",
    "isPublic",
  ] as const;

  for (const key of ALLOWED_LEGACY_KEYS) {
    if (body[key] !== undefined) {
      card[key] = body[key];
    }
  }

  return { success: true };
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const cleanSlug = slug.toLowerCase();
    const body = await req.json();

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const card = await WeddingCardModel.findOne({ slug: cleanSlug });
      if (!card) {
        return NextResponse.json({ success: false, message: "Card not found" }, { status: 404 });
      }

      // Check ownership or super admin
      if (card.userId !== user.id && user.role !== "admin") {
        return NextResponse.json(
          { success: false, message: "You do not have permission to modify this card." },
          { status: 403 }
        );
      }

      const updateResult = applyCardUpdates(card, body, cleanSlug);
      if (!updateResult.success) {
        return NextResponse.json({ success: false, message: updateResult.message }, { status: 400 });
      }

      await card.save();

      return NextResponse.json({
        success: true,
        message: "Wedding invitation card updated successfully!",
        card,
      });
    } else {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { success: false, message: "Database service unavailable. Card updates require an active database connection." },
          { status: 503 }
        );
      }

      if (!global.fallbackWeddingCards) global.fallbackWeddingCards = [];
      const card = global.fallbackWeddingCards.find((c) => c.slug === cleanSlug);

      if (!card) {
        return NextResponse.json({ success: false, message: "Card not found" }, { status: 404 });
      }

      if (card.userId !== user.id && user.role !== "admin") {
        return NextResponse.json(
          { success: false, message: "You do not have permission to modify this card." },
          { status: 403 }
        );
      }

      const updateResult = applyCardUpdates(card, body, cleanSlug);
      if (!updateResult.success) {
        return NextResponse.json({ success: false, message: updateResult.message }, { status: 400 });
      }

      card.updatedAt = new Date().toISOString();

      return NextResponse.json({
        success: true,
        message: "Wedding invitation card updated (development fallback in-memory only)!",
        card,
      });
    }
  } catch (error: unknown) {
    const msg = formatSafeErrorMessage(error, "Error updating card.");
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const card = await WeddingCardModel.findOne({ slug });
      if (!card) {
        return NextResponse.json({ success: false, message: "Card not found" }, { status: 404 });
      }

      if (card.userId !== user.id && user.role !== "admin") {
        return NextResponse.json(
          { success: false, message: "You do not have permission to delete this card." },
          { status: 403 }
        );
      }

      await WeddingCardModel.deleteOne({ slug });
      return NextResponse.json({
        success: true,
        message: "Invitation card removed successfully.",
      });
    } else {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { success: false, message: "Database service unavailable. Card deletion requires an active database connection." },
          { status: 503 }
        );
      }

      if (!global.fallbackWeddingCards) return NextResponse.json({ success: true });
      const card = global.fallbackWeddingCards.find((c) => c.slug === slug);

      if (!card) {
        return NextResponse.json({ success: false, message: "Card not found" }, { status: 404 });
      }

      if (card.userId !== user.id && user.role !== "admin") {
        return NextResponse.json(
          { success: false, message: "You do not have permission to delete this card." },
          { status: 403 }
        );
      }

      global.fallbackWeddingCards = global.fallbackWeddingCards.filter((c) => c.slug !== slug);
      return NextResponse.json({
        success: true,
        message: "Invitation card removed (development fallback in-memory only).",
      });
    }
  } catch (error: unknown) {
    const msg = formatSafeErrorMessage(error, "Error deleting card.");
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
