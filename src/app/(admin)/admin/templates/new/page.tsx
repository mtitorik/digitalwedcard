"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { templateSchema, TemplateFormValues } from "@/lib/validators/template.schema";
import { createTemplate } from "@/server/actions/template.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SAMPLE_WEDDING_PHOTOS } from "@/lib/storage";
import { toast } from "sonner";
import { ArrowLeft, Save, Sparkles, Palette } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NewTemplatePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: "",
      slug: "",
      thumbnailUrl: SAMPLE_WEDDING_PHOTOS[0].url,
      description: "",
      price: 0,
      isPremium: false,
      isActive: true,
      defaultConfig: {
        fontFamily: "serif",
        primaryColor: "#064e3b",
        accentColor: "#d97706",
        preset: "luxury",
      },
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const thumbnailUrl = watch("thumbnailUrl");
  const isPremium = watch("isPremium");
  const primaryColor = watch("defaultConfig.primaryColor");
  const accentColor = watch("defaultConfig.accentColor");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue("name", val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setValue("slug", generatedSlug);
  };

  const onSubmit = (values: TemplateFormValues) => {
    startTransition(async () => {
      const res = await createTemplate(values);
      if (res.success) {
        toast.success(res.message);
        router.push("/admin/templates");
        router.refresh();
      } else {
        toast.error(res.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link href="/admin/templates">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 w-9 p-0 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 text-stone-600" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-semibold text-stone-900">
              Create Design Template
            </h1>
            <p className="text-xs sm:text-sm text-stone-500">
              Author a new digital wedding invitation theme with typography, color palettes, and tier pricing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/templates">
            <Button type="button" variant="outline" size="md">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="gold"
            size="md"
            isLoading={isPending}
          >
            <Save className="w-4 h-4" />
            Save & Publish Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Details</CardTitle>
              <CardDescription>
                Name, URL slug, and narrative description shown to couples in the template gallery.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Template Name"
                placeholder="e.g. Victorian Golden Botanical"
                {...register("name")}
                onChange={handleNameChange}
                error={errors.name?.message}
              />

              <Input
                label="URL Slug"
                placeholder="e.g. victorian-golden-botanical"
                {...register("slug")}
                error={errors.slug?.message}
                helperText="Unique identifier used in system URLs"
              />

              <Textarea
                label="Description"
                rows={4}
                placeholder="Describe the mood, typography, aesthetic motifs, and ideal wedding atmosphere..."
                {...register("description")}
                error={errors.description?.message}
              />

              <div>
                <Input
                  label="Thumbnail Image URL"
                  placeholder="https://images.unsplash.com/..."
                  {...register("thumbnailUrl")}
                  error={errors.thumbnailUrl?.message}
                />

                {/* Preset Picker */}
                <div className="mt-3">
                  <p className="text-[11px] font-medium text-stone-500 mb-2">
                    Quick Sample Presets:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SAMPLE_WEDDING_PHOTOS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setValue("thumbnailUrl", p.url)}
                        className="text-[11px] px-2.5 py-1 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition"
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {thumbnailUrl && (
                  <div className="mt-4">
                    <span className="block text-[11px] font-medium text-stone-500 uppercase tracking-wide mb-1.5">
                      Thumbnail Preview
                    </span>
                    <div className="relative w-48 aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                      <Image
                        src={thumbnailUrl}
                        alt="Template Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Default Styling Config */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-600" />
                <CardTitle>Default Styling Configuration</CardTitle>
              </div>
              <CardDescription>
                Initial font and palette presets applied when a couple selects this template.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1.5">
                    Font Family
                  </label>
                  <select
                    {...register("defaultConfig.fontFamily")}
                    className="w-full h-10 rounded-xl border border-stone-200 bg-white px-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400"
                  >
                    <option value="serif">Cormorant / Classic Serif</option>
                    <option value="sans">Inter / Modern Minimal Sans</option>
                    <option value="playfair">Playfair / Luxury Editorial</option>
                    <option value="script">Romantic Script / Calligraphy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1.5">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={primaryColor || "#064e3b"}
                      onChange={(e) => setValue("defaultConfig.primaryColor", e.target.value)}
                      className="w-10 h-10 rounded-lg border border-stone-200 cursor-pointer p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      {...register("defaultConfig.primaryColor")}
                      className="flex-1 h-10 rounded-xl border border-stone-200 px-3 text-xs font-mono text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1.5">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor || "#d97706"}
                      onChange={(e) => setValue("defaultConfig.accentColor", e.target.value)}
                      className="w-10 h-10 rounded-lg border border-stone-200 cursor-pointer p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      {...register("defaultConfig.accentColor")}
                      className="flex-1 h-10 rounded-xl border border-stone-200 px-3 text-xs font-mono text-stone-800"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Tier</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPremium"
                  {...register("isPremium")}
                  className="w-4 h-4 rounded text-amber-600 border-stone-300 focus:ring-amber-500"
                />
                <label htmlFor="isPremium" className="text-xs font-medium text-stone-700 cursor-pointer">
                  Premium Tier Theme
                </label>
              </div>

              {isPremium && (
                <Input
                  label="Purchase Price (USD)"
                  type="number"
                  step="0.01"
                  placeholder="29.00"
                  {...register("price", { valueAsNumber: true })}
                  error={errors.price?.message}
                  helperText="One-time unlock price for this template design"
                />
              )}

              <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  {...register("isActive")}
                  className="w-4 h-4 rounded text-stone-900 border-stone-300 focus:ring-stone-400"
                />
                <label htmlFor="isActive" className="text-xs font-medium text-stone-700 cursor-pointer">
                  Active (Visible to couples in gallery)
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}

