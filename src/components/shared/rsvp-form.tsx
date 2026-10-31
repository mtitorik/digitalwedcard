"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rsvpSchema, RSVPFormValues } from "@/lib/validators/rsvp.schema";
import { submitRSVP } from "@/server/actions/rsvp.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CheckCircle2, Heart, Send, Users, Sparkles, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export type RsvpFormTone = "porcelain" | "parchment" | "dark-glass";

export interface RsvpFormProps extends React.HTMLAttributes<HTMLFormElement> {
  invitationId: string;
  coupleNames?: string;
  title?: string;
  subtitle?: string;
  primaryColor?: string;
  accentColor?: string;
  tone?: RsvpFormTone;
  onSuccess?: (response: {
    id: string;
    attendance: "ATTENDING" | "DECLINED" | "TENTATIVE";
    guestName: string;
  }) => void;
}

export function RsvpForm({
  invitationId,
  coupleNames,
  title = "Kindly Respond",
  subtitle = "Please let us know if you will celebrate with us by submitting your response below.",
  primaryColor = "#78350f",
  accentColor = "#d97706",
  tone = "porcelain",
  onSuccess,
  className,
  ...props
}: RsvpFormProps) {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedAttendance, setSubmittedAttendance] = useState<
    "ATTENDING" | "DECLINED" | "TENTATIVE"
  >("ATTENDING");

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
    watch,
    reset,
    formState: { errors },
  } = form;

  const attendance = watch("attendance");

  const onSubmit = (values: RSVPFormValues) => {
    startTransition(async () => {
      const res = await submitRSVP(values);

      if (res.success && res.data) {
        setIsSubmitted(true);
        setSubmittedName(values.guestName);
        setSubmittedAttendance(values.attendance);
        toast.success(res.message || "Your RSVP has been confirmed!");

        if (onSuccess) {
          onSuccess({
            id: res.data.id,
            attendance: res.data.attendance,
            guestName: values.guestName,
          });
        }
      } else {
        toast.error(res.error || "Failed to submit RSVP. Please try again.");
      }
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    reset({
      invitationId,
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      attendance: "ATTENDING",
      additionalGuestsCount: 0,
      message: "",
    });
  };

  const toneStyles: Record<RsvpFormTone, string> = {
    porcelain: "bg-white/95 text-stone-900 border-stone-200/90 shadow-xl",
    parchment: "bg-stone-50/95 text-stone-900 border-amber-900/10 shadow-xl",
    "dark-glass":
      "bg-stone-950/90 text-white border-white/15 shadow-2xl backdrop-blur-xl",
  };

  // --------------------------------------------------------------------------
  // Success View
  // --------------------------------------------------------------------------
  if (isSubmitted) {
    return (
      <div
        className={cn(
          "rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto border transition-all animate-in fade-in zoom-in-95 duration-300",
          toneStyles[tone],
          className
        )}
      >
        <div
          className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5 text-white shadow-lg shadow-amber-900/15"
          style={{ backgroundColor: primaryColor }}
        >
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight">
          {submittedAttendance === "ATTENDING"
            ? "We Can't Wait to Celebrate!"
            : submittedAttendance === "DECLINED"
            ? "You Will Be Missed!"
            : "Tentative Response Noted"}
        </h3>

        <p className="text-sm mt-3 leading-relaxed opacity-85">
          Thank you, <strong className="font-semibold">{submittedName}</strong>.
          Your response has been successfully recorded
          {coupleNames ? ` for ${coupleNames}` : ""}.
        </p>

        <p className="text-xs mt-4 italic opacity-60">
          A confirmation note has been logged in the event guestbook.
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="mt-8 rounded-full px-5 py-2 text-xs uppercase tracking-wider cursor-pointer"
        >
          Submit Another Response
        </Button>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Form View
  // --------------------------------------------------------------------------
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "rounded-3xl p-6 sm:p-10 border max-w-xl mx-auto space-y-6 backdrop-blur-md transition-shadow",
        toneStyles[tone],
        className
      )}
      {...props}
    >
      {/* Title & Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-serif uppercase tracking-[0.2em] bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 mb-1">
          <Heart className="w-3 h-3 fill-current" />
          <span>{coupleNames ? `Celebrate with ${coupleNames}` : "RSVP Invitation"}</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight">
          {title}
        </h3>

        {subtitle && (
          <p className="text-xs sm:text-sm opacity-75 max-w-md mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <input type="hidden" {...register("invitationId")} />

      {/* Attendance Choice Buttons */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-[0.16em] text-center opacity-70 mb-2">
          Will You Be Attending? *
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Attending */}
          <label
            className={cn(
              "flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center cursor-pointer transition-all select-none",
              attendance === "ATTENDING"
                ? "border-emerald-600 bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 font-semibold shadow-xs ring-1 ring-emerald-500/40"
                : "border-stone-200/90 dark:border-white/10 hover:border-stone-400 bg-stone-50/50 dark:bg-white/5 opacity-80"
            )}
          >
            <input
              type="radio"
              value="ATTENDING"
              {...register("attendance")}
              className="sr-only"
            />
            <span className="text-xs uppercase tracking-wide">Joyfully Accepts</span>
            <span className="text-[10px] opacity-65 mt-0.5">I will attend</span>
          </label>

          {/* Declined */}
          <label
            className={cn(
              "flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center cursor-pointer transition-all select-none",
              attendance === "DECLINED"
                ? "border-rose-500 bg-rose-500/15 text-rose-900 dark:text-rose-300 font-semibold shadow-xs ring-1 ring-rose-500/40"
                : "border-stone-200/90 dark:border-white/10 hover:border-stone-400 bg-stone-50/50 dark:bg-white/5 opacity-80"
            )}
          >
            <input
              type="radio"
              value="DECLINED"
              {...register("attendance")}
              className="sr-only"
            />
            <span className="text-xs uppercase tracking-wide">Regretfully Declines</span>
            <span className="text-[10px] opacity-65 mt-0.5">Celebrating in spirit</span>
          </label>

          {/* Tentative */}
          <label
            className={cn(
              "flex flex-col items-center justify-center p-3.5 rounded-2xl border text-center cursor-pointer transition-all select-none",
              attendance === "TENTATIVE"
                ? "border-amber-500 bg-amber-500/15 text-amber-900 dark:text-amber-300 font-semibold shadow-xs ring-1 ring-amber-500/40"
                : "border-stone-200/90 dark:border-white/10 hover:border-stone-400 bg-stone-50/50 dark:bg-white/5 opacity-80"
            )}
          >
            <input
              type="radio"
              value="TENTATIVE"
              {...register("attendance")}
              className="sr-only"
            />
            <span className="text-xs uppercase tracking-wide">Tentative</span>
            <span className="text-[10px] opacity-65 mt-0.5">Will confirm soon</span>
          </label>
        </div>

        {errors.attendance && (
          <p className="text-xs text-rose-500 text-center">{errors.attendance.message}</p>
        )}
      </div>

      {/* Guest Contact Details */}
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
            helperText="For event updates & schedule notes"
          />

          <Input
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            {...register("guestPhone")}
            error={errors.guestPhone?.message}
          />
        </div>

        {/* Plus-Ones Selector (Only displayed when joyfully accepting) */}
        {attendance === "ATTENDING" && (
          <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-white/5 border border-amber-200/60 dark:border-white/10 space-y-1.5 animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-800 dark:text-stone-200">
                Additional Guests (Plus-Ones)
              </label>
            </div>

            <select
              {...register("additionalGuestsCount", { valueAsNumber: true })}
              className="w-full h-10 rounded-xl border border-stone-200/90 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <option value={0}>Just me (1 attendee)</option>
              <option value={1}>+1 additional guest (2 attendees total)</option>
              <option value={2}>+2 additional guests (3 attendees total)</option>
              <option value={3}>+3 additional guests (4 attendees total)</option>
              <option value={4}>+4 additional guests (5 attendees total)</option>
            </select>

            {errors.additionalGuestsCount && (
              <p className="text-xs text-rose-500 mt-1">{errors.additionalGuestsCount.message}</p>
            )}
          </div>
        )}

        {/* Message / Dietary Notes */}
        <Textarea
          label="Warm Wishes or Dietary Restrictions"
          rows={3}
          placeholder="Leave a heartfelt message for the couple or note any vegetarian/allergy needs..."
          {...register("message")}
          error={errors.message?.message}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="gold"
        size="lg"
        isLoading={isPending}
        className="w-full rounded-full py-3.5 text-xs uppercase tracking-[0.18em] font-semibold shadow-md transition-all cursor-pointer"
        style={{ backgroundColor: primaryColor }}
      >
        <Send className="w-4 h-4 mr-2" />
        Send RSVP Confirmation
      </Button>
    </form>
  );
}
