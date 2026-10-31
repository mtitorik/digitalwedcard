"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How do our guests open and experience the digital wedding card?",
    answer:
      "Guests simply tap your custom link (e.g., /i/your-names) from WhatsApp, iMessage, SMS, email, or social media. It opens instantly in any browser without needing to download an app or register an account.",
  },
  {
    question: "How does the interactive RSVP module work?",
    answer:
      "Guests can confirm their attendance, choose meal preferences, register additional plus-ones, and write heartfelt notes to the couple. Every response is captured live in your administrative dashboard.",
  },
  {
    question: "Can we add romantic background music to our card?",
    answer:
      "Yes! You can choose from our curated romantic acoustic and classical piano melodies, or upload your own background audio soundtrack. Guests can pause or replay anytime with floating audio controls.",
  },
  {
    question: "Can we protect our card with a private passcode?",
    answer:
      "Yes. If you wish to keep ceremony venues and dates private, you can enable Passcode Gate protection. Only guests who enter your private passcode will be granted access to the microsite.",
  },
  {
    question: "What if ceremony times or venue locations change?",
    answer:
      "Unlike printed paper cards where reprints are expensive, Digiwedcard lets you update dates, timings, addresses, and maps at any time. Your link remains the same, and guests always see the latest information.",
  },
  {
    question: "How do guests get navigation directions to our wedding venue?",
    answer:
      "Each ceremony in your schedule includes an interactive Google Maps pin. Guests can tap 'Get Directions' to launch Google Maps or Apple Maps directly on their phones for turn-by-turn navigation.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3 max-w-3xl mx-auto w-full">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.question}
            className={cn(
              "rounded-2xl border transition-all duration-200 overflow-hidden bg-white",
              isOpen
                ? "border-amber-300/80 shadow-md ring-1 ring-amber-200/50"
                : "border-stone-200/80 hover:border-stone-300"
            )}
          >
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
            >
              <span className="font-serif font-medium text-stone-900 text-base sm:text-lg">
                {faq.question}
              </span>
              <span
                className={cn(
                  "p-1.5 rounded-full text-stone-500 transition-transform duration-200 flex-shrink-0",
                  isOpen
                    ? "rotate-180 bg-amber-100 text-amber-900"
                    : "bg-stone-100"
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-sm text-stone-600 leading-relaxed border-t border-stone-100/80">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

