"use client";

import React, { use, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TEMPLATE_MANIFEST } from "@/data";
import { WeddingCardRenderer, TEMPLATE_REGISTRY } from "@/templates";
import { ChevronLeft, RotateCcw, LayoutGrid } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

function TemplatePreviewInner({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const normalizedId = id.startsWith("template-") ? id : `template-${id.padStart(2, "0")}`;

  const currentTemplate = TEMPLATE_MANIFEST.find(
    (t) => t.id === normalizedId || t.id === id
  );

  const [resetKey, setResetKey] = useState(0);
  const searchParams = useSearchParams();
  const isMockup = searchParams.get("mockup") === "true";

  const allTemplatePills = Array.from({ length: 20 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    const tid = `template-${num}`;
    const manifestItem = TEMPLATE_MANIFEST.find((t) => t.id === tid);
    return {
      id: tid,
      label: `T${num}`,
      name: manifestItem ? `${num}: ${manifestItem.title}` : `Template ${num}`,
    };
  });

  const isImplemented = Boolean(TEMPLATE_REGISTRY[normalizedId]);

  if (!isImplemented) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-stone-900 text-white">
        <h1 className="text-2xl font-serif font-bold text-amber-400 mb-2">
          Template In Development
        </h1>
        <p className="text-sm text-stone-400 max-w-md mb-6">
          Currently, Templates 01 through 20 are registered.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {allTemplatePills.map((t) => (
            <Link
              key={t.id}
              href={`/templates/${t.id}`}
              className="px-4 py-2 rounded-full bg-stone-800 text-white text-xs font-semibold hover:bg-stone-700 transition"
            >
              {t.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (isMockup) {
    return (
      <div suppressHydrationWarning className="w-full min-h-screen flex flex-col justify-start items-stretch overflow-x-hidden pt-2 pb-8 scrollbar-none">
        <WeddingCardRenderer
          key={`${normalizedId}-${resetKey}`}
          templateId={normalizedId}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-50 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition font-semibold"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Catalog</span>
          </Link>
          <span className="w-[1px] h-4 bg-stone-800" />
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-white transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Explore</span>
          </Link>
          <span className="w-[1px] h-4 bg-stone-800" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xs sm:text-sm font-semibold tracking-wide truncate max-w-[150px] sm:max-w-none">
              {currentTemplate?.title || normalizedId}
            </h1>
          </div>
        </div>

        {/* Template Selector Pills (T01 - T20) */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap max-h-12 overflow-x-auto py-1">
          {allTemplatePills.map((t) => {
            const active = normalizedId === t.id;
            return (
              <Link
                key={t.id}
                href={`/templates/${t.id}`}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition ${
                  active
                    ? "bg-amber-400 text-stone-950 font-bold shadow"
                    : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                }`}
              >
                {t.label}
              </Link>
            );
          })}

          {/* Reset Seal Opener */}
          <button
            onClick={() => setResetKey((k) => k + 1)}
            title="Reset seal animation"
            className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition ml-1 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Template Render Area using dynamic WeddingCardRenderer */}
      <div className="flex-1 w-full flex flex-col justify-start items-stretch">
        <WeddingCardRenderer
          key={`${normalizedId}-${resetKey}`}
          templateId={normalizedId}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default function TemplatePreviewPage(props: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-400 text-xs font-mono">Loading Preview...</div>}>
      <TemplatePreviewInner {...props} />
    </Suspense>
  );
}
