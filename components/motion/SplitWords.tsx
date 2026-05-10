"use client";

import { useEffect, useRef } from "react";
import { useI18n, useT } from "@/lib/i18n/I18nProvider";

/**
 * Renders an HTML i18n value containing pre-built `.word > .word-inner` spans.
 * On every language change, re-triggers the CSS keyframe animation by clearing
 * and restoring the inner element's `animation` style.
 */
export function SplitWords({
  keyName,
  className,
}: {
  keyName: string;
  className?: string;
}) {
  const t = useT();
  const { lang } = useI18n();
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const inners = el.querySelectorAll<HTMLElement>(".word-inner");
    inners.forEach((i) => (i.style.animation = "none"));
    void el.offsetWidth;
    inners.forEach((i) => (i.style.animation = ""));
  }, [lang]);

  return (
    <h1
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: t(keyName) }}
    />
  );
}
