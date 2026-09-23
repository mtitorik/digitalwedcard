import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { WeddingCardModel, FallbackWeddingCard } from "@/models/WeddingCard";
import { SAMPLE_TEMPLATES } from "@/data/sampleTemplates";

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

      if (!mineOnly) {
        const existingSlugs = new Set(cards.map((c: { slug: string }) => c.slug));
        const missingTemplates = SAMPLE_TEMPLATES.filter((t) => !existingSlugs.has(t.slug));
        return NextResponse.json({
          success: true,
          cards: [...cards, ...missingTemplates].map(sanitizeCardCover),
        });
      }

      return NextResponse.json({ success: true, cards: cards.map(sanitizeCardCover) });
    } else {
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
    const msg = error instanceof Error ? error.message : "Failed to retrieve cards";
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
    } = body;

    if (!groomName || !brideName) {
      return NextResponse.json(
        { success: false, message: "Groom's name and Bride's name are required." },
        { status: 400 }
      );
    }

    let slug = customSlug
      ? customSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
      : generateSlug(groomName, brideName);

    if (!slug) {
      slug = generateSlug(groomName, brideName);
    }

    const namesFormatted = `${groomName.trim().split(" ")[0]} & ${brideName.trim().split(" ")[0]}`;
    const groomInitial = groomName.trim().charAt(0).toUpperCase();
    const brideInitial = brideName.trim().charAt(0).toUpperCase();
    const monogram = `${groomInitial} & ${brideInitial}`;

    const cardPayload = {
      userId: user.id,
      authorName: user.name,
      slug,
      templateThemeId: templateThemeId || "royal-emerald",
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

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      // Check slug uniqueness
      const existing = await WeddingCardModel.findOne({ slug });
      if (existing) {
        cardPayload.slug = `${cardPayload.slug}-${Date.now().toString().slice(-4)}`;
      }

      const newCard = await WeddingCardModel.create(cardPayload);
      return NextResponse.json({
        success: true,
        message: "Digital wedding invitation card created successfully!",
        card: newCard,
      });
    } else {
      if (!global.fallbackWeddingCards) global.fallbackWeddingCards = [];

      const existing = global.fallbackWeddingCards.find((c) => c.slug === slug);
      if (existing) {
        cardPayload.slug = `${cardPayload.slug}-${Date.now().toString().slice(-4)}`;
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
        message: "Digital wedding invitation card created successfully (in-memory)!",
        card: fallbackCard,
      });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Failed to create card";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
