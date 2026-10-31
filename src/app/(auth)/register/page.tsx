import { RegisterForm } from "@/components/auth/RegisterForm";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Toaster } from "sonner";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link
          href="/"
          title="Return to Digiwedcard Homepage"
          className="inline-flex flex-col items-center group mb-2"
        >
          <div className="w-10 h-10 rounded-2xl bg-stone-900 text-amber-300 flex items-center justify-center shadow group-hover:scale-105 transition-transform mb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors">
            Digiwedcard
          </h2>
        </Link>
        <p className="text-xs text-stone-500 uppercase tracking-widest font-medium">
          Create Account • Client Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl border border-stone-200/80 rounded-2xl">
          <RegisterForm />
        </div>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}

