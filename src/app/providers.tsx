"use client";

import { LocaleProvider } from "@/shared/providers/locale-context";
import { ThemeProvider } from "@/shared/providers/theme-context";
import type { Locale } from "@/shared/config/i18n/translations";
import type { Theme } from "@/shared/providers/theme-context";
import { MouseAmbientEffect } from "@/shared/components/MouseAmbientEffect";
import SplashCursor from "@/components/SplashCursor";

export function Providers({
  initialLocale,
  initialTheme,
  children,
}: {
  initialLocale: Locale;
  initialTheme: Theme;
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LocaleProvider initialLocale={initialLocale}>
        {children}
        <SplashCursor />
        <MouseAmbientEffect />
      </LocaleProvider>
    </ThemeProvider>
  );
}
