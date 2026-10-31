import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
  endAdornment?: React.ReactNode;
  success?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, helperText, endAdornment, success, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-stone-700 tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative w-full">
          <input
            type={type}
            id={inputId}
            ref={ref}
            className={cn(
              "block h-10 w-full rounded-xl border border-stone-200 bg-white px-3.5 py-2 text-sm text-stone-900 placeholder:text-stone-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:border-stone-400 disabled:cursor-not-allowed disabled:opacity-50",
              endAdornment ? "pr-10" : "",
              error
                ? "border-rose-400 focus-visible:ring-rose-400 focus-visible:border-rose-400"
                : success
                ? "border-emerald-500/80 focus-visible:ring-emerald-400 focus-visible:border-emerald-500"
                : "",
              className
            )}
            {...props}
          />
          {endAdornment && (
            <div className="absolute right-0 top-0 bottom-0 flex items-center pr-2.5 z-10 pointer-events-auto">
              {endAdornment}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p className="text-xs text-stone-500">{helperText}</p>
        )}
        {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

