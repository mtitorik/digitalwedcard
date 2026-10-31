"use client";

import { useTransition, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterInput,
  validateEmailFormat,
  checkPasswordStrength,
} from "@/lib/validators/auth.schema";
import { registerAction } from "@/server/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const emailValue = useWatch({ control, name: "email" }) || "";
  const passwordValue = useWatch({ control, name: "password" }) || "";
  const confirmPasswordValue = useWatch({ control, name: "confirmPassword" }) || "";

  // Live evaluation
  const emailCheck = useMemo(
    () => validateEmailFormat(emailValue),
    [emailValue]
  );

  const passwordStrength = useMemo(
    () => checkPasswordStrength(passwordValue),
    [passwordValue]
  );

  const passwordsMatch =
    passwordValue.length > 0 &&
    confirmPasswordValue.length > 0 &&
    passwordValue === confirmPasswordValue;

  const passwordsMismatch =
    confirmPasswordValue.length > 0 && passwordValue !== confirmPasswordValue;

  const onSubmit = (values: RegisterInput) => {
    setServerError(null);
    startTransition(async () => {
      const res = await registerAction(values);
      if (res.success) {
        toast.success(res.message);
        router.push("/");
        router.refresh();
      } else {
        setServerError(res.error);
        toast.error(res.error);
      }
    });
  };

  return (
    <div className="space-y-6">
      {serverError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4.5">
        {/* Full Name */}
        <Input
          label="Full Name"
          placeholder="e.g. Eleanor Vance"
          autoComplete="name"
          {...register("name")}
          error={errors.name?.message}
        />

        {/* Email Address with real-time format checking */}
        <div className="space-y-1.5">
          <Input
            label="Email Address"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            {...register("email")}
            error={errors.email?.message}
            success={emailCheck.isValid && !errors.email && emailValue.length > 0}
            endAdornment={
              emailCheck.isValid && !errors.email && emailValue.length > 0 ? (
                <div
                  className="flex items-center text-emerald-600"
                  title="Valid email format"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
              ) : emailValue.length > 0 && !emailCheck.isValid ? (
                <div
                  className="flex items-center text-amber-500"
                  title={emailCheck.message || "Invalid format"}
                >
                  <AlertCircle className="w-4 h-4" />
                </div>
              ) : null
            }
          />

          {/* Typo suggestion banner */}
          {emailCheck.suggestion && (
            <div className="p-2 rounded-xl bg-amber-50/90 border border-amber-200 flex items-center justify-between text-xs text-amber-900 transition-all">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>
                  Did you mean{" "}
                  <strong className="font-mono text-amber-950 font-semibold">
                    {emailCheck.suggestion}
                  </strong>
                  ?
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setValue("email", emailCheck.suggestion!, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                className="ml-2 px-2.5 py-1 rounded-lg bg-amber-200/90 hover:bg-amber-300 text-amber-950 text-[11px] font-semibold transition cursor-pointer shadow-xs"
              >
                Apply Fix
              </button>
            </div>
          )}

          {/* Valid format indicator */}
          {emailCheck.isValid &&
            !errors.email &&
            !emailCheck.suggestion &&
            emailValue.length > 0 && (
              <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 pl-0.5">
                <Check className="w-3 h-3" />
                Valid email format
              </p>
            )}
        </div>

        {/* Password with Strength Meter & Requirements */}
        <div className="space-y-1.5">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Create a strong password"
            {...register("password")}
            error={errors.password?.message}
            success={passwordStrength.score >= 3 && !errors.password}
            endAdornment={
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-stone-600" />
                ) : (
                  <Eye className="w-4 h-4 text-stone-600" />
                )}
              </button>
            }
          />

          {/* Live Strength Meter */}
          {passwordValue.length > 0 && (
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2.5 mt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 text-[11px]">Password Strength:</span>
                <span
                  className={cn(
                    "text-[11px] font-semibold uppercase tracking-wider",
                    passwordStrength.label === "Weak" && "text-rose-600",
                    passwordStrength.label === "Fair" && "text-amber-600",
                    passwordStrength.label === "Good" && "text-yellow-600",
                    passwordStrength.label === "Strong" && "text-emerald-600"
                  )}
                >
                  {passwordStrength.label}
                </span>
              </div>

              {/* 4-bar strength indicator */}
              <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                <div
                  className={cn(
                    "h-full rounded-full transition-colors",
                    passwordStrength.score >= 1
                      ? passwordStrength.score === 1
                        ? "bg-rose-500"
                        : passwordStrength.score === 2
                        ? "bg-amber-500"
                        : passwordStrength.score === 3
                        ? "bg-yellow-500"
                        : "bg-emerald-500"
                      : "bg-stone-200"
                  )}
                />
                <div
                  className={cn(
                    "h-full rounded-full transition-colors",
                    passwordStrength.score >= 2
                      ? passwordStrength.score === 2
                        ? "bg-amber-500"
                        : passwordStrength.score === 3
                        ? "bg-yellow-500"
                        : "bg-emerald-500"
                      : "bg-stone-200"
                  )}
                />
                <div
                  className={cn(
                    "h-full rounded-full transition-colors",
                    passwordStrength.score >= 3
                      ? passwordStrength.score === 3
                        ? "bg-yellow-500"
                        : "bg-emerald-500"
                      : "bg-stone-200"
                  )}
                />
                <div
                  className={cn(
                    "h-full rounded-full transition-colors",
                    passwordStrength.score >= 4
                      ? "bg-emerald-600"
                      : "bg-stone-200"
                  )}
                />
              </div>

              {/* Requirements Checklist */}
              <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                <div
                  className={cn(
                    "flex items-center gap-1.5 transition-colors",
                    passwordStrength.requirements.minLength
                      ? "text-emerald-700 font-medium"
                      : "text-stone-400"
                  )}
                >
                  {passwordStrength.requirements.minLength ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-stone-300 flex-shrink-0" />
                  )}
                  <span>8+ characters</span>
                </div>

                <div
                  className={cn(
                    "flex items-center gap-1.5 transition-colors",
                    passwordStrength.requirements.hasUpper
                      ? "text-emerald-700 font-medium"
                      : "text-stone-400"
                  )}
                >
                  {passwordStrength.requirements.hasUpper ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-stone-300 flex-shrink-0" />
                  )}
                  <span>1 uppercase (A-Z)</span>
                </div>

                <div
                  className={cn(
                    "flex items-center gap-1.5 transition-colors",
                    passwordStrength.requirements.hasLower
                      ? "text-emerald-700 font-medium"
                      : "text-stone-400"
                  )}
                >
                  {passwordStrength.requirements.hasLower ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-stone-300 flex-shrink-0" />
                  )}
                  <span>1 lowercase (a-z)</span>
                </div>

                <div
                  className={cn(
                    "flex items-center gap-1.5 transition-colors",
                    passwordStrength.requirements.hasNumberOrSymbol
                      ? "text-emerald-700 font-medium"
                      : "text-stone-400"
                  )}
                >
                  {passwordStrength.requirements.hasNumberOrSymbol ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-stone-300 flex-shrink-0" />
                  )}
                  <span>1 number or symbol</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password with match checker */}
        <div className="space-y-1.5">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            success={passwordsMatch}
            endAdornment={
              <div className="flex items-center gap-1">
                {passwordsMatch && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-0.5" />
                )}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors focus:outline-none flex items-center justify-center cursor-pointer"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  title={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 text-stone-600" />
                  ) : (
                    <Eye className="w-4 h-4 text-stone-600" />
                  )}
                </button>
              </div>
            }
          />

          {confirmPasswordValue.length > 0 && (
            <div className="text-[11px] pl-0.5">
              {passwordsMatch ? (
                <p className="text-emerald-600 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Passwords match
                </p>
              ) : passwordsMismatch ? (
                <p className="text-rose-500 font-medium flex items-center gap-1">
                  <X className="w-3 h-3" />
                  Passwords do not match yet
                </p>
              ) : null}
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full mt-2 cursor-pointer"
          isLoading={isPending}
        >
          Create Account
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </form>

      <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100">
        Already have an account?{" "}
        <Link
          href="/?auth=signin"
          className="font-medium text-stone-900 underline underline-offset-4 hover:text-amber-800"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
