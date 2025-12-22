import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Cairo, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import { Navbar } from "@/widgets/navbar";
import { BackgroundEffects } from "./BackgroundEffects";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Codex - Software Studio",
  description: "Where engineering excellence meets creative passion. Building digital solutions that drive real business impact.",
  keywords: ["software development", "web development", "mobile apps", "digital solutions", "تطوير البرمجيات", "تطوير المواقع"],
  authors: [{ name: "Codex Team" }],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Codex - Software Studio",
    description: "Where engineering excellence meets creative passion",
    type: "website",
    images: [
      {
        url: "/favicon.png",
        width: 48,
        height: 48,
        alt: "Codex Logo",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale = cookieStore.get("locale")?.value === "en" ? "en" : "ar";
  // Default to dark on first visit (no cookie) to match design
  const initialTheme = cookieStore.get("theme")?.value === "light" ? "light" : "dark";

  return (
    <html
      lang={initialLocale}
      dir={initialLocale === "ar" ? "rtl" : "ltr"}
      data-theme={initialTheme}
      className={initialTheme === "dark" ? "dark" : undefined}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#0b0b10" />
      </head>
      <body className={`${inter.variable} ${cairo.variable} ${jetbrainsMono.variable} antialiased`}>
        <BackgroundEffects />
        <div className="relative z-10">
          <Providers initialLocale={initialLocale} initialTheme={initialTheme}>
            <Navbar />
            <main>{children}</main>
          </Providers>
        </div>
      </body>
    </html>
  );
}
