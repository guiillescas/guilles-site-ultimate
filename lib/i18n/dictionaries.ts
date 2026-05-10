import type { Locale } from "@/lib/seo/site";
import { en } from "./en";
import { pt } from "./pt";

export type Dict = Record<string, string>;

export const DICTS: Record<Locale, Dict> = { en, pt };

export const DEFAULT_LANG: Locale = "en";
