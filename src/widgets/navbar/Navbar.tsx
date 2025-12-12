"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/img/9a642e6f-c17d-4dad-9ab3-0c44c42430e1.jpg";
import { useLocale } from "@/shared/providers/locale-context";
import { useTheme } from "@/shared/providers/theme-context";
import type { TranslationResource } from "@/shared/config/i18n/translations";

type NavKey = keyof TranslationResource["nav"];

const NAV_ITEMS: { id: string; key: NavKey }[] = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "services", key: "services" },
  { id: "works", key: "works" },
  { id: "testimonials", key: "testimonials" },
  { id: "journey", key: "journey" },
  { id: "contact", key: "contact" },
];

export function Navbar() {
  const { content, toggleLocale, locale } = useLocale();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src={logo}
            alt="Codex logo"
            width={48}
            height={48}
            className="h-12 w-12 rounded-lg object-cover shadow-lg"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-white">Codex</span>
            <span className="text-xs text-zinc-400">Software Studio</span>
          </div>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-300 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`#${item.id}`}
              className="transition hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full"
            >
              {content.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            aria-label={content.controls.language}
            onClick={toggleLocale}
            className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-100 shadow-sm transition hover:border-zinc-600 hover:bg-zinc-700/80"
          >
            {locale === "ar" ? "العربية" : "English"}
          </button>
          <button
            aria-label={content.controls.theme}
            onClick={toggleTheme}
            className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-100 shadow-sm transition hover:border-zinc-600 hover:bg-zinc-700/80"
          >
            {theme === "light" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
