import { z } from "zod";

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .regex(EMAIL_REGEX, "Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(64, "Name must be under 64 characters"),
    email: z
      .string()
      .trim()
      .min(1, "Email address is required")
      .regex(EMAIL_REGEX, "Please enter a valid email address (e.g. name@example.com)"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter (A-Z)")
      .regex(/[a-z]/, "Password must include at least one lowercase letter (a-z)")
      .regex(
        /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/,
        "Password must include at least one number or special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Common typo suggestion dictionary for email domains
 */
export const COMMON_DOMAIN_TYPOS: Record<string, string> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmaill.com": "gmail.com",
  "gmai.co": "gmail.com",
  "yaho.com": "yahoo.com",
  "yahooo.com": "yahoo.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "outloo.com": "outlook.com",
  "icliud.com": "icloud.com",
  "iclod.com": "icloud.com",
};

export interface EmailValidationResult {
  isValid: boolean;
  message?: string;
  suggestion?: string;
}

export function validateEmailFormat(email: string): EmailValidationResult {
  const trimmed = email.trim();
  if (!trimmed) {
    return { isValid: false };
  }

  if (/\s/.test(trimmed)) {
    return { isValid: false, message: "Email cannot contain spaces" };
  }

  if (!trimmed.includes("@")) {
    return { isValid: false, message: "Email must include '@'" };
  }

  const parts = trimmed.split("@");
  if (parts.length > 2) {
    return { isValid: false, message: "Email cannot contain multiple '@' symbols" };
  }

  const [local, domain] = parts;
  if (!local) {
    return { isValid: false, message: "Enter username before '@'" };
  }

  if (!domain) {
    return { isValid: false, message: "Enter domain after '@' (e.g. gmail.com)" };
  }

  if (!domain.includes(".")) {
    return { isValid: false, message: "Domain must include extension (e.g. .com)" };
  }

  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2) {
    return { isValid: false, message: "Domain extension must be at least 2 letters (e.g. .com)" };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, message: "Please enter a valid email address format" };
  }

  const domainLower = domain.toLowerCase();
  if (COMMON_DOMAIN_TYPOS[domainLower]) {
    const suggestedEmail = `${local}@${COMMON_DOMAIN_TYPOS[domainLower]}`;
    return {
      isValid: true,
      suggestion: suggestedEmail,
      message: `Did you mean ${suggestedEmail}?`,
    };
  }

  return { isValid: true };
}

export interface PasswordRequirements {
  minLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumberOrSymbol: boolean;
}

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  label: "Weak" | "Fair" | "Good" | "Strong";
  requirements: PasswordRequirements;
}

export function checkPasswordStrength(password: string): PasswordStrengthResult {
  const requirements: PasswordRequirements = {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumberOrSymbol: /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password),
  };

  let score = 0;
  if (requirements.minLength) score += 1;
  if (requirements.hasUpper) score += 1;
  if (requirements.hasLower) score += 1;
  if (requirements.hasNumberOrSymbol) score += 1;

  let label: "Weak" | "Fair" | "Good" | "Strong" = "Weak";
  if (score === 4 && password.length >= 10) {
    label = "Strong";
  } else if (score >= 3) {
    label = "Good";
  } else if (score >= 2) {
    label = "Fair";
  } else {
    label = "Weak";
  }

  return { score, label, requirements };
}

