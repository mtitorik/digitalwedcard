import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { InquiryModel, FallbackInquiry } from "@/models/Inquiry";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide your valid full name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Please write a message with at least 10 characters.",
        },
        { status: 400 }
      );
    }

    const cleanPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : "",
      subject: subject ? String(subject).trim() : "Wedding Card Inquiry",
      message: message.trim(),
      status: "new" as const,
    };

    // Try MongoDB
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      const savedInquiry = await InquiryModel.create(cleanPayload);
      return NextResponse.json({
        success: true,
        message:
          "Thank you! Your message has been received. Our wedding concierge will reply within 24 hours.",
        inquiryId: savedInquiry._id,
      });
    }

    // In-memory fallback
    if (!global.fallbackInquiries) {
      global.fallbackInquiries = [];
    }
    const fallbackItem: FallbackInquiry = {
      _id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      ...cleanPayload,
      createdAt: new Date().toISOString(),
    };
    global.fallbackInquiries.unshift(fallbackItem);

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your message has been received. Our wedding concierge will reply within 24 hours.",
      inquiryId: fallbackItem._id,
    });
  } catch (error) {
    console.error("Error submitting contact inquiry:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
