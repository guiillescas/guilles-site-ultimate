import type { Locale } from "@/lib/seo/site";

export const LANG_COOKIE = "guilles-lang";

export const LOCALES: readonly Locale[] = ["en", "pt"] as const;

export function isLocale(value: unknown): value is Locale {
  return value === "en" || value === "pt";
}
