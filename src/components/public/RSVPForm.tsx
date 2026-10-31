"use client";

import { useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rsvpSchema, RSVPFormValues } from "@/lib/validators/rsvp.schema";
import { submitRSVP } from "@/server/actions/rsvp.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle2, Heart, Send } from "lucide-react";

interface RSVPFormProps {
  invitationId: string;
  primaryColor?: string;
  accentColor?: string;
}

export function RSVPForm({ invitationId, primaryColor = "#064e3b", accentColor = "#d97706" }: RSVPFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const form = useForm<RSVPFormValues>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      invitationId,
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      attendance: "ATTENDING",
      additionalGuestsCount: 0,
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const attendance = useWatch({ control: form.control, name: "attendance" }) ?? "ATTENDING";

  const onSubmit = (values: RSVPFormValues) => {
    startTransition(async () => {
      const res = await submitRSVP(values);
      if (res.success) {
        setIsSubmitted(true);
        setSubmittedName(values.guestName);
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    });
  };

  if (isSubmitted) {
    return (
      <div className="rounded-3xl p-8 sm:p-12 text-center bg-white/95 backdrop-blur-md shadow-xl border border-stone-200/80 max-w-lg mx-auto">
        <div
          className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 text-white shadow-md"
          style={{ backgroundColor: primaryColor, borderColor: accentColor }}
        >
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-stone-900">
          RSVP Received!
        </h3>
        <p className="text-stone-600 text-sm mt-2 leading-relaxed">
          Thank you, <strong className="text-stone-900">{submittedName}</strong>. Your attendance response has been recorded.
        </p>
        <p className="text-xs text-stone-400 mt-4 italic">
          We look forward to celebrating this magical milestone together.
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsSubmitted(false)}
          className="mt-6 text-xs text-stone-600 hover:text-stone-900"
        >
          Submit another response
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-3xl p-6 sm:p-10 bg-white/95 backdrop-blur-md shadow-xl border border-stone-200/80 max-w-xl mx-auto space-y-6"
    >
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif uppercase tracking-widest text-stone-600 bg-stone-100 mb-2">
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          <span>Will You Join Us?</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
          Kindly Respond
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
          Please confirm your attendance so we may reserve your seat and prepare for this joyous gathering.
        </p>
      </div>

      <input type="hidden" {...register("invitationId")} />

      {/* Attendance Choice */}
      <div className="space-y-2">
        <label className="block text-xs font-medium uppercase tracking-wider text-stone-500 text-center mb-2">
          Your Response
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <label
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition select-none ${
              attendance === "ATTENDING"
                ? "border-emerald-500 bg-emerald-50/50 text-emerald-900 font-semibold shadow-xs"
                : "border-stone-200 hover:border-stone-300 bg-stone-50/50 text-stone-600"
            }`}
          >
            <input
              type="radio"
              value="ATTENDING"
              {...register("attendance")}
              className="sr-only"
            />
            <span className="text-xs uppercase tracking-wide">Joyfully Accepts</span>
            <span className="text-[10px] text-stone-400 mt-0.5">I will attend</span>
          </label>

          <label
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition select-none ${
              attendance === "DECLINED"
                ? "border-rose-400 bg-rose-50/50 text-rose-900 font-semibold shadow-xs"
                : "border-stone-200 hover:border-stone-300 bg-stone-50/50 text-stone-600"
            }`}
          >
            <input
              type="radio"
              value="DECLINED"
              {...register("attendance")}
              className="sr-only"
            />
            <span className="text-xs uppercase tracking-wide">Regretfully Declines</span>
            <span className="text-[10px] text-stone-400 mt-0.5">Celebrating in spirit</span>
          </label>

          <label
            className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition select-none ${
              attendance === "TENTATIVE"
                ? "border-amber-400 bg-amber-50/50 text-amber-900 font-semibold shadow-xs"
                : "border-stone-200 hover:border-stone-300 bg-stone-50/50 text-stone-600"
            }`}
          >
            <input
              type="radio"
              value="TENTATIVE"
              {...register("attendance")}
              className="sr-only"
            />
            <span className="text-xs uppercase tracking-wide">Tentative</span>
            <span className="text-[10px] text-stone-400 mt-0.5">Will confirm soon</span>
          </label>
        </div>
        {errors.attendance && (
          <p className="text-xs text-rose-500 text-center">{errors.attendance.message}</p>
        )}
      </div>

      {/* Guest Name & Details */}
      <div className="space-y-4 pt-2">
        <Input
          label="Your Full Name *"
          placeholder="e.g. Julian & Clara Hawthorne"
          {...register("guestName")}
          error={errors.guestName?.message}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="julian@example.com"
            {...register("guestEmail")}
            error={errors.guestEmail?.message}
            helperText="For event updates & itinerary notes"
          />

          <Input
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            {...register("guestPhone")}
            error={errors.guestPhone?.message}
          />
        </div>

        {attendance === "ATTENDING" && (
          <div>
            <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1.5">
              Additional Guests (Plus-Ones)
            </label>
            <select
              {...register("additionalGuestsCount", { valueAsNumber: true })}
              className="w-full h-10 rounded-xl border border-stone-200 bg-white px-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
            >
              <option value={0}>Just me (1 attendee)</option>
              <option value={1}>+1 additional guest (2 attendees)</option>
              <option value={2}>+2 additional guests (3 attendees)</option>
              <option value={3}>+3 additional guests (4 attendees)</option>
              <option value={4}>+4 additional guests (5 attendees)</option>
            </select>
            {errors.additionalGuestsCount && (
              <p className="text-xs text-rose-500 mt-1">{errors.additionalGuestsCount.message}</p>
            )}
          </div>
        )}

        <Textarea
          label="Warm Wishes or Dietary Notes"
          rows={3}
          placeholder="Leave a message for the couple or mention any dietary requirements..."
          {...register("message")}
          error={errors.message?.message}
        />
      </div>

      <Button
        type="submit"
        variant="gold"
        size="lg"
        isLoading={isPending}
        className="w-full text-sm font-serif tracking-wider uppercase shadow-md py-3.5"
        style={{ backgroundColor: primaryColor, borderColor: accentColor }}
      >
        <Send className="w-4 h-4 mr-2" />
        Send RSVP Confirmation
      </Button>
    </form>
  );
}

