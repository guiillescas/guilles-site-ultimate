import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { geist, geistMono } from "./fonts";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { SITE } from "@/lib/seo/site";
import { LANG_COOKIE } from "@/lib/i18n/locale";
import { buildStructuredData } from "@/lib/seo/structured-data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.author.name, url: SITE.url }],
  creator: SITE.author.name,
  publisher: SITE.author.name,
  keywords: [...SITE.keywords],
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "pt-BR": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "profile",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: SITE.locale.default,
    alternateLocale: [...SITE.locale.alternate],
    firstName: "Guilherme",
    lastName: "Illescas",
    username: "guiillescas",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    creator: SITE.social.twitter,
    site: SITE.social.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
    { media: "(prefers-color-scheme: light)", color: "#0b0b0c" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const STRUCTURED_DATA_JSON = JSON.stringify(buildStructuredData());

/**
 * Runs synchronously before React hydrates. Reads the language cookie and
 * applies the correct `<html lang>` and a data attribute the I18nProvider
 * will use as its initial value, eliminating any flash of untranslated text
 * without forcing the route into dynamic rendering.
 */
const LANG_BOOTSTRAP_SCRIPT = `
(function(){
  try {
    var m = document.cookie.match(/(?:^|; )${LANG_COOKIE}=([^;]+)/);
    var lang = m && (m[1] === "pt" || m[1] === "en") ? m[1] : "en";
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.documentElement.dataset.lang = lang;
  } catch (e) {}
})();
`.trim();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOTSTRAP_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA_JSON }}
        />
      </head>
      <body>
        <I18nProvider>{children}</I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
