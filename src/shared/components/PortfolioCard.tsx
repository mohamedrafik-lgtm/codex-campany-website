"use client";

import Link from "next/link";
import React, { useRef } from "react";

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

  return (
    <article
      ref={ref}
      className="w-full rounded-3xl border border-zinc-200 bg-gradient-to-br from-white/80 to-zinc-100 p-0 shadow-lg overflow-hidden dark:border-zinc-800 dark:bg-zinc-900/70 flex flex-col md:flex-row items-stretch"
      style={{ minHeight: 320 }}
    >
      {/* Image Section */}
      {project.image && (
        <div className="relative w-full md:w-2/5 flex-shrink-0 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900" style={{ minHeight: 260, maxHeight: 400 }}>
          <img
            src={project.image}
            alt={project.title}
            className="object-contain w-full h-full max-h-[340px] max-w-[95%] rounded-2xl shadow-md border border-zinc-100 dark:border-zinc-800 bg-white"
            style={{ background: '#fff', margin: 'auto' }}
          />
          <Link
            href={`/portfolio/${project.id}`}
            aria-label={locale === 'ar' ? 'عرض المشروع' : 'View project'}
            className="absolute bottom-4 left-4 group h-12 w-12 rounded-full bg-white flex items-center justify-center text-black shadow-lg transition-shadow duration-300 hover:shadow-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 z-10"
          >
            <svg className="h-6 w-6 transition-transform duration-300 transform group-hover:translate-x-1 group-hover:rotate-6" viewBox="0 0 24 24" fill="none" stroke="black">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 17l10-10M7 7h10v10" />
            </svg>
          </Link>
        </div>
      )}

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between p-6 gap-2">
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">{project.title}</h3>
              <div className="text-sm text-zinc-600 dark:text-zinc-300 mb-1">{project.client}</div>
            </div>
            <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 text-right bg-zinc-100 dark:bg-zinc-800/40 rounded-full px-4 py-1">
              {project.metric}
            </div>
          </div>
          <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 line-clamp-4 min-h-[60px]">{project.desc}</div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {(project.tags || []).map((t) => (
              <span key={t} className="rounded px-3 py-1 text-xs bg-zinc-200 text-zinc-700 dark:bg-zinc-800/40 dark:text-zinc-200 font-semibold">{t}</span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="rounded-2xl bg-zinc-900/90 p-4 text-white shadow-inner">
            <h4 className="text-lg font-semibold mb-1">{project.successTitle || 'Key Success Point:'}</h4>
            <p className="text-sm text-zinc-200">{project.successDesc || project.metric}</p>
          </div>
          {project.highlight ? (
            <div className="mt-3 inline-block rounded-full bg-emerald-700/10 text-emerald-500 px-4 py-2 text-sm font-semibold">
              {project.highlight}
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex items-center gap-3 justify-end">
          <Link
            href="#contact"
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition"
          >
            {locale === 'ar' ? 'تواصل معنا' : 'Contact us'}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PortfolioCard;
