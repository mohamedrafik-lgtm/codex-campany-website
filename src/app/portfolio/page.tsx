"use client";

import Link from "next/link";
import { useLocale } from "@/shared/providers/locale-context";
import PortfolioCard from "@/shared/components/PortfolioCard";
import { projects as mockProjects } from "@/lib/projects";

export default function Portfolio() {
  const { locale } = useLocale();

  // pick Arabic fields when locale is Arabic (fallback to English fields)
  const projects = mockProjects.map((p) => ({
    ...p,
    title: locale === 'ar' ? (p.title_ar || p.title) : p.title,
    client: locale === 'ar' ? (p.client_ar || p.client) : p.client,
    desc: locale === 'ar' ? (p.desc_ar || p.desc) : p.desc,
    highlight: locale === 'ar' ? (p.highlight_ar || p.highlight) : p.highlight,
    successTitle: locale === 'ar' ? (p.successTitle_ar || p.successTitle) : p.successTitle,
    successDesc: locale === 'ar' ? (p.successDesc_ar || p.successDesc) : p.successDesc,
  }));

  return (
    <div className="min-h-screen bg-transparent px-6 py-16 text-zinc-900 dark:text-zinc-50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold">{locale === 'ar' ? 'محفظتنا' : 'Portfolio'}</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'نماذج تُظهر كيف نحول الأفكار إلى نتائج قابلة للقياس — تصميم، هندسة، وتأثير.'
              : 'Work that moves metrics — crafted end-to-end. Design, engineer, deliver impact.'}
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1">
          {projects.map((p) => (
            <div key={p.id} className="w-full">
              <PortfolioCard project={p} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
