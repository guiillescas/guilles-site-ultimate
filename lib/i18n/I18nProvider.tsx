"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Locale } from "@/lib/seo/site";
import { LOCALE_TO_HTML } from "@/lib/seo/site";
import { DICTS, DEFAULT_LANG } from "./dictionaries";
import { LANG_COOKIE } from "./locale";

type Ctx = {
  lang: Locale;
  setLang: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nCtx = createContext<Ctx | null>(null);

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function readLangFromCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LANG;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LANG_COOKIE}=([^;]+)`),
  );
  const value = match?.[1];
  return value === "pt" || value === "en" ? value : DEFAULT_LANG;
}

function persistLang(lang: Locale) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // SSR returns DEFAULT_LANG. The bootstrap script in <head> already set
  // <html lang> from the cookie, so the only thing we hydrate is the
  // translation values inside React-controlled subtrees.
  const [lang, setLangState] = useState<Locale>(DEFAULT_LANG);

  useEffect(() => {
    const cookieLang = readLangFromCookie();
    if (cookieLang !== DEFAULT_LANG) setLangState(cookieLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = LOCALE_TO_HTML[lang];
  }, [lang]);

  const setLang = useCallback((l: Locale) => {
    setLangState(l);
    persistLang(l);
  }, []);

  const t = useCallback(
    (key: string) => DICTS[lang][key] ?? DICTS.en[key] ?? key,
    [lang],
  );

  return (
    <I18nCtx.Provider value={{ lang, setLang, t }}>{children}</I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}

/** Translation hook — returns plain string. */
export function useT() {
  return useI18n().t;
}

/** Helper for HTML strings: returns props for dangerouslySetInnerHTML. */
export function useTHtml() {
  const t = useT();
  return (key: string) => ({ dangerouslySetInnerHTML: { __html: t(key) } });
}
