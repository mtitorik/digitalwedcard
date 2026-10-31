import Link from "next/link";
import { getTemplatesAdmin } from "@/server/actions/template.actions";
import { TemplateCard } from "@/components/admin/template-card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Filter, Sparkles } from "lucide-react";

interface TemplatesPageProps {
  searchParams: Promise<{
    search?: string;
    type?: string;
    status?: string;
  }>;
}

export default async function TemplatesAdminPage({ searchParams }: TemplatesPageProps) {
  const resolved = await searchParams;
  const search = resolved.search || "";
  const type = resolved.type || "ALL";
  const status = resolved.status || "ALL";

  const isPremium = type === "PREMIUM" ? true : type === "FREE" ? false : undefined;
  const isActive = status === "ACTIVE" ? true : status === "INACTIVE" ? false : undefined;

  const templates = await getTemplatesAdmin({
    search,
    isPremium,
    isActive,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-stone-900">
            Digital Invitation Templates
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Manage base themes, typography presets, color palettes, and pricing tiers for couple microsites.
          </p>
        </div>

        <Link href="/admin/templates/new">
          <Button variant="gold" size="md">
            <PlusCircle className="w-4 h-4" />
            Create Design Template
          </Button>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs">
        <form method="GET" className="flex-1 flex items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search by template name or slug..."
              className="w-full h-9 pl-9 pr-4 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>
          <Button type="submit" variant="secondary" size="sm">
            Search
          </Button>
        </form>

        <div className="flex items-center gap-2">
          {/* Type Filter */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs">
            <Link
              href="/admin/templates"
              className={`px-3 py-1 rounded-lg font-medium transition ${
                type === "ALL" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
              }`}
            >
              All
            </Link>
            <Link
              href="/admin/templates?type=FREE"
              className={`px-3 py-1 rounded-lg font-medium transition ${
                type === "FREE" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
              }`}
            >
              Free
            </Link>
            <Link
              href="/admin/templates?type=PREMIUM"
              className={`px-3 py-1 rounded-lg font-medium transition ${
                type === "PREMIUM" ? "bg-white text-stone-900 shadow-xs" : "text-stone-500 hover:text-stone-900"
              }`}
            >
              Premium
            </Link>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <div className="rounded-2xl border border-stone-200/80 bg-white p-12 text-center text-xs text-stone-500 shadow-sm">
          No templates found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <TemplateCard key={tpl.id} template={tpl} />
          ))}
        </div>
      )}
    </div>
  );
}

