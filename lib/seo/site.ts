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
    "Senior software engineer building high-performance web products for millions. Now at AwSales (AI sales infra). Ex-Conquer, founder of Amank (acquired 2024).",
  locale: {
    default: "en_US",
    alternate: ["pt_BR"],
  },
  author: {
    name: "Guilherme Illescas",
    email: "oi@guilhermeillescas.dev",
    location: "Curitiba, Brazil",
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
    "Curitiba developer",
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
