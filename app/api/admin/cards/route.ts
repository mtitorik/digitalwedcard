import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { WeddingCardModel, FallbackWeddingCard } from "@/models/WeddingCard";

export async function GET(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      const cards = await WeddingCardModel.find().sort({ createdAt: -1 });
      return NextResponse.json({ success: true, cards });
    } else {
      const cards: FallbackWeddingCard[] = global.fallbackWeddingCards || [];
      return NextResponse.json({ success: true, cards });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error loading cards";
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing Card ID" }, { status: 400 });
    }

    const mongooseConn = await connectToDatabase();

    if (updates.groomName || updates.brideName) {
      const g = updates.groomName || "";
      const b = updates.brideName || "";
      if (g && b) {
        updates.namesFormatted = `${g.trim().split(" ")[0]} & ${b.trim().split(" ")[0]}`;
        updates.monogram = `${g.trim().charAt(0).toUpperCase()} & ${b.trim().charAt(0).toUpperCase()}`;
      }
    }

    if (mongooseConn) {
      const card = await WeddingCardModel.findByIdAndUpdate(id, updates, { new: true });
      if (!card) {
        return NextResponse.json({ success: false, message: "Card not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: "Card updated successfully by Admin.", card });
    } else {
      if (!global.fallbackWeddingCards) global.fallbackWeddingCards = [];
      const card = global.fallbackWeddingCards.find((c) => c._id === id);
      if (!card) {
        return NextResponse.json({ success: false, message: "Card not found" }, { status: 404 });
      }
      Object.assign(card, updates, { updatedAt: new Date().toISOString() });
      return NextResponse.json({
        success: true,
        message: "Card updated successfully by Admin (in-memory).",
        card,
      });
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error updating card";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin(req);
  if (!isAuth) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing Card ID" }, { status: 400 });
    }

    const mongooseConn = await connectToDatabase();

    if (mongooseConn) {
      await WeddingCardModel.findByIdAndDelete(id);
    } else {
      if (global.fallbackWeddingCards) {
        global.fallbackWeddingCards = global.fallbackWeddingCards.filter((c) => c._id !== id);
      }
    }

    return NextResponse.json({ success: true, message: "Card deleted successfully by Admin." });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Error deleting card";
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
