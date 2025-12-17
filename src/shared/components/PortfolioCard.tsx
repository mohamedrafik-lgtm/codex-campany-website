"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { useRevealOnScroll } from "@/shared/hooks/useRevealOnScroll";

type Project = {
  id: string;
  title: string;
  client: string;
  metric: string;
  desc: string;
  image?: string;
  tags?: string[];
  highlight?: string;
  successTitle?: string;
  successDesc?: string;
};

export function PortfolioCard({ project, locale }: { project: Project; locale: string }) {
  const ref = useRef<HTMLElement>(null!);
  useRevealOnScroll(ref);

  return (
    <article ref={ref} className="w-full rounded-2xl border border-zinc-200 bg-white/60 p-0 shadow-sm overflow-hidden dark:border-zinc-800 dark:bg-zinc-900/50 reveal-component">
      <div className="flex flex-col md:flex-row md:items-stretch">
        <div className="p-6 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{project.client}</div>
            </div>
            <div className="text-sm font-semibold text-zinc-800 dark:text-zinc-100 max-w-xs text-right">{project.metric}</div>
          </div>

          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">{project.desc}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(project.tags || []).map((t) => (
              <span key={t} className="rounded px-3 py-1 text-xs bg-zinc-100 text-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-200">{t}</span>
            ))}
          </div>

          <div className="mt-6">
            <div className="rounded-2xl bg-zinc-900/90 p-6 text-white shadow-inner">
              <h4 className="text-lg font-semibold">{project.successTitle || 'Key Success Point:'}</h4>
              <p className="mt-3 text-sm text-zinc-200">{project.successDesc || project.metric}</p>
            </div>

            {project.highlight ? (
              <div className="mt-4 inline-block rounded-full bg-emerald-700/10 text-emerald-400 px-4 py-2 text-sm font-semibold">
                {project.highlight}
              </div>
            ) : null}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div />

            <Link
              href="#contact"
              className="ml-auto rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-zinc-900 dark:text-white"
            >
              {locale === 'ar' ? 'تواصل معنا' : 'Contact us'}
            </Link>
          </div>
        </div>

        {project.image ? (
          <div className="w-full md:w-1/2 lg:w-2/5 bg-zinc-100 overflow-hidden flex-shrink-0 relative">
            <div className="w-full portfolio-image relative">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />

              <div className="absolute left-6 top-1/2 -translate-y-1/2">
                <Link
                  href={`/portfolio/${project.id}`}
                  aria-label={locale === 'ar' ? 'عرض المشروع' : 'View project'}
                  className="group h-16 w-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/90 shadow-lg transition-shadow duration-300 hover:shadow-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  <svg className="h-7 w-7 transition-transform duration-300 transform group-hover:translate-x-1 group-hover:rotate-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 17l10-10M7 7h10v10" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default PortfolioCard;
