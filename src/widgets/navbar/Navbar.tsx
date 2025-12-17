"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/shared/providers/locale-context";
import { usePathname } from "next/navigation";
import { useTheme } from "@/shared/providers/theme-context";
import type { TranslationResource } from "@/shared/config/i18n/translations";

type NavKey = keyof TranslationResource["nav"];

const NAV_ITEMS: { id: string; key: NavKey }[] = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "services", key: "services" },
  { id: "works", key: "works" },
  { id: "portfolio", key: "portfolio" },
  { id: "testimonials", key: "testimonials" },
  { id: "journey", key: "journey" },
  { id: "contact", key: "contact" },
];

export function Navbar() {
  const { content, toggleLocale, locale } = useLocale();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/5">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/favicon.png"
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
          {NAV_ITEMS.map((item) => {
            const shouldUseRouteHash = pathname !== '/';
            const href = item.key === 'portfolio' ? '/portfolio' : shouldUseRouteHash ? `/#${item.id}` : `#${item.id}`;
            const isLocalHash = href.startsWith('#');

            return (
              <Link
                key={item.id}
                href={href}
                onClick={(e) => {
                  if (!isLocalHash) return; // allow normal navigation for routes or cross-page hashes

                  // only intercept when we're already on the home page
                  if (pathname === '/') {
                    e.preventDefault();
                    const target = document.getElementById(item.id);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      try {
                        history.replaceState(null, '', `#${item.id}`);
                        window.dispatchEvent(new HashChangeEvent('hashchange'));
                      } catch (err) {
                        window.location.hash = `#${item.id}`;
                      }
                    }
                  }
                }}
                className="transition hover:text-white relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white/80 after:transition-all hover:after:w-full"
              >
                {content.nav[item.key]}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <button
            aria-label={content.controls.language}
            onClick={toggleLocale}
            className="rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2 text-sm font-medium text-zinc-100 shadow-sm transition hover:border-zinc-600 hover:bg-zinc-700/80"
          >
            {locale === "ar" ? "العربية" : "English"}
          </button>
        </div>
      </div>
    </header>
  );
}
