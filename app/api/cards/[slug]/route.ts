import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
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
      const card = (global.fallbackWeddingCards || []).find((c) => c.slug === cleanSlug);
      if (!card) {
        return NextResponse.json({ success: false, message: "Card not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, card });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error loading card";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { slug } = await params;
    const body = await req.json();

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const card = await WeddingCardModel.findOne({ slug });
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

      // Format names if names changed
      if (body.groomName || body.brideName) {
        const g = body.groomName || card.groomName;
        const b = body.brideName || card.brideName;
        body.namesFormatted = `${g.trim().split(" ")[0]} & ${b.trim().split(" ")[0]}`;
        body.monogram = `${g.trim().charAt(0).toUpperCase()} & ${b.trim().charAt(0).toUpperCase()}`;
      }

      Object.assign(card, body);
      await card.save();

      return NextResponse.json({
        success: true,
        message: "Wedding invitation card updated successfully!",
        card,
      });
    } else {
      if (!global.fallbackWeddingCards) global.fallbackWeddingCards = [];
      const card = global.fallbackWeddingCards.find((c) => c.slug === slug);

      if (!card) {
        return NextResponse.json({ success: false, message: "Card not found" }, { status: 404 });
      }

      if (card.userId !== user.id && user.role !== "admin") {
        return NextResponse.json(
          { success: false, message: "You do not have permission to modify this card." },
          { status: 403 }
        );
      }

      if (body.groomName || body.brideName) {
        const g = body.groomName || card.groomName;
        const b = body.brideName || card.brideName;
        body.namesFormatted = `${g.trim().split(" ")[0]} & ${b.trim().split(" ")[0]}`;
        body.monogram = `${g.trim().charAt(0).toUpperCase()} & ${b.trim().charAt(0).toUpperCase()}`;
      }

      Object.assign(card, body, { updatedAt: new Date().toISOString() });

      return NextResponse.json({
        success: true,
        message: "Wedding invitation card updated successfully (in-memory)!",
        card,
      });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error updating card";
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
        message: "Invitation card removed successfully (in-memory).",
      });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error deleting card";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
