/**
 * Single source of truth for site-wide SEO and identity constants.
 * Imported by metadata, structured data, sitemap, robots, and OG image.
 */

export const SITE = {
  url: "https://guilhermeillescas.dev",
  name: "Guilherme Illescas",
  shortName: "Guilles",
  title: "Guilherme Illescas — Senior Software Engineer",
  description:
    "Senior software engineer crafting high-performance web products for millions of users. Currently building AI sales infrastructure at AwSales. Previously: Conquer (10M+ certificates, 35M+ students), Amank (acquired 2024).",
  locale: {
    default: "en_US",
    alternate: ["pt_BR"],
  },
  author: {
    name: "Guilherme Illescas",
    email: "oi@guilhermeillescas.dev",
    location: "São Paulo, Brazil",
    role: "Senior Software Engineer",
    company: "AwSales",
  },
  social: {
    github: "https://github.com/guiillescas",
    linkedin: "https://linkedin.com/in/guilherme-illescas",
    instagram: "https://instagram.com/gui.illescas",
    twitter: "@guiillescas",
  },
  keywords: [
    "Guilherme Illescas",
    "Senior Software Engineer",
    "Full-stack engineer",
    "Next.js engineer",
    "React engineer",
    "TypeScript engineer",
    "São Paulo developer",
    "AI sales infrastructure",
    "AwSales",
    "Conquer",
    "Amank",
    "Web performance",
    "Design systems",
  ],
} as const;

export type Locale = "en" | "pt";

export const LOCALE_TO_OG: Record<Locale, string> = {
  en: "en_US",
  pt: "pt_BR",
};

export const LOCALE_TO_HTML: Record<Locale, string> = {
  en: "en",
  pt: "pt-BR",
};
