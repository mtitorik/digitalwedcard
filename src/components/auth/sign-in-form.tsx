"use client";

import { useTransition, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginInput,
  validateEmailFormat,
} from "@/lib/validators/auth.schema";
import { loginAction } from "@/server/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { useAuthModal } from "@/context/auth-modal-context";

interface SignInFormProps {
  onSuccess?: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const { setMode, closeAuthModal } = useAuthModal();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const emailValue = watch("email") || "";
  const emailCheck = useMemo(
    () => validateEmailFormat(emailValue),
    [emailValue]
  );

  const handleForgotPassword = () => {
    toast.info("Password Recovery", {
      description:
        "Please contact your wedding portal concierge at support@digiwedcard.com to reset your credentials.",
    });
  };

  const onSubmit = (values: LoginInput) => {
    setServerError(null);
    startTransition(async () => {
      const res = await loginAction(values);
      if (res.success) {
        toast.success(res.message);
        if (onSuccess) onSuccess();
        closeAuthModal();

        // Redirect based on role
        if (res.data.role === "ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      } else {
        setServerError(res.error || "Invalid email or password combination.");
        toast.error(res.error || "Invalid email or password.");
      }
    });
  };

  return (
    <div className="space-y-6">
      {serverError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs animate-fadeIn">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Address */}
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
            ) : null
          }
        />

        {/* Password */}
        <div className="space-y-1.5">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
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

          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[11px] font-medium text-stone-500 hover:text-amber-800 transition-colors cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full mt-2 cursor-pointer shadow-sm"
          isLoading={isPending}
        >
          Sign In
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </form>

      {/* Switch Tab Trigger */}
      <div className="text-center text-xs text-stone-500 pt-3 border-t border-stone-100">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => setMode("signup")}
          className="font-semibold text-stone-900 underline underline-offset-4 hover:text-amber-800 transition-colors cursor-pointer"
        >
          Create an Account
        </button>
      </div>
    </div>
  );
}

