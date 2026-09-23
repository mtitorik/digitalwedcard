import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "new" | "replied" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: "" },
    subject: { type: String, trim: true, default: "General Inquiry" },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["new", "replied", "archived"],
      default: "new",
    },
  },
  { timestamps: true }
);

export interface FallbackInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: "new" | "replied" | "archived";
  createdAt: string;
}

declare global {
  // eslint-disable-next-line no-var
  var fallbackInquiries: FallbackInquiry[] | undefined;
}

if (!global.fallbackInquiries) {
  global.fallbackInquiries = [];
}

export const InquiryModel: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
