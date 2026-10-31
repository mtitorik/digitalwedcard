"use client";

import { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Template } from "@prisma/client";
import { toggleTemplateStatus, deleteTemplate } from "@/server/actions/template.actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Sparkles, Eye, Trash2, Power, Layers } from "lucide-react";

interface TemplateCardProps {
  template: Template & { _count?: { invitations: number } };
}

export function TemplateCard({ template }: TemplateCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggleStatus = () => {
    startTransition(async () => {
      const res = await toggleTemplateStatus(template.id, !template.isActive);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    });
  };

  const handleDelete = () => {
    if (!confirm(`Are you sure you want to delete template "${template.name}"?`)) {
      return;
    }

    startTransition(async () => {
      const res = await deleteTemplate(template.id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.error);
      }
    });
  };

  return (
    <div className="group rounded-2xl border border-stone-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
      {/* Thumbnail Banner */}
      <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
        <Image
          src={template.thumbnailUrl}
          alt={template.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/20" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {template.isPremium ? (
            <Badge variant="gold" className="shadow-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium Design
            </Badge>
          ) : (
            <Badge variant="secondary" className="shadow-sm">
              Complimentary (Free)
            </Badge>
          )}

          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase shadow-sm border ${
              template.isActive
                ? "bg-emerald-500/90 text-white border-emerald-400"
                : "bg-stone-500/90 text-white border-stone-400"
            }`}
          >
            {template.isActive ? "Active" : "Archived"}
          </span>
        </div>

        {/* Pricing tag */}
        <div className="absolute bottom-3 right-3 bg-stone-900/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-white font-mono text-xs font-semibold shadow-md border border-stone-700/60">
          {template.price > 0 ? `$${template.price.toFixed(2)}` : "FREE"}
        </div>
      </div>

      {/* Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-serif font-semibold text-stone-900 text-base leading-snug">
              {template.name}
            </h3>
            <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1">
              <Layers className="w-3 h-3" />
              {template._count?.invitations || 0} cards
            </span>
          </div>

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {template.description}
          </p>

          <p className="text-[11px] font-mono text-stone-400 pt-1">
            slug: <span className="text-stone-600 font-semibold">{template.slug}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="pt-5 mt-4 border-t border-stone-100 flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleToggleStatus}
            isLoading={isPending}
            className={`text-xs ${
              template.isActive
                ? "text-stone-600 hover:text-amber-700"
                : "text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <Power className="w-3.5 h-3.5 mr-1" />
            {template.isActive ? "Deactivate" : "Activate"}
          </Button>

          <div className="flex items-center gap-1.5">
            <Link href={`/admin/invitations?templateId=${template.id}`}>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-stone-500 hover:text-stone-900"
                title="View Invitations with this template"
              >
                <Eye className="w-3.5 h-3.5" />
              </Button>
            </Link>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              isLoading={isPending}
              className="h-8 px-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50"
              title="Delete template"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

