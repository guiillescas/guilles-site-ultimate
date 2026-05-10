"use client";

import { useI18n, useT } from "@/lib/i18n/I18nProvider";

export function LangSwitch() {
  const { lang, setLang } = useI18n();
  const t = useT();
  return (
    <div
      className="lang-switch"
      role="group"
      aria-label={t("nav.language")}
    >
      <button
        type="button"
        className={`lang-opt ${lang === "en" ? "active" : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <span className="lang-divider" aria-hidden="true" />
      <button
        type="button"
        className={`lang-opt ${lang === "pt" ? "active" : ""}`}
        aria-pressed={lang === "pt"}
        onClick={() => setLang("pt")}
      >
        PT
      </button>
    </div>
  );
}
