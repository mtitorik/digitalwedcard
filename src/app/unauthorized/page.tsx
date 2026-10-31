import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-stone-200/80 p-8 text-center space-y-5">
        <Link
          href="/"
          title="Return to Digiwedcard Homepage"
          className="inline-flex flex-col items-center group mx-auto"
        >
          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto border border-rose-200/80 text-rose-600 group-hover:scale-105 transition-transform mb-2">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <span className="font-serif text-lg font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
            Digiwedcard
          </span>
        </Link>

        <div className="space-y-1.5">
          <span className="text-[11px] font-mono font-medium text-rose-600 uppercase tracking-widest">
            403 Forbidden
          </span>
          <h1 className="text-2xl font-serif font-semibold text-stone-900">
            Access Restricted
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
            Your current account does not have permission to access this section of the platform.
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          <Link href="/?auth=signin" className="block">
            <Button variant="gold" size="md" className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In with a Different Account
            </Button>
          </Link>

          <Link href="/" className="block">
            <Button variant="outline" size="md" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Home Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
