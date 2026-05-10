"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { LOCALE_TO_HTML } from "@/lib/seo/site";

export function CountUp({
  to,
  decimals = 0,
  duration = 1600,
}: {
  to: number;
  decimals?: number;
  duration?: number;
}) {
  const { lang } = useI18n();
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setVal(to);
      startedRef.current = true;
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || startedRef.current) continue;
          startedRef.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
          io.unobserve(el);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const display =
    decimals > 0
      ? val.toFixed(decimals)
      : Math.floor(val).toLocaleString(LOCALE_TO_HTML[lang]);
  return <span ref={ref}>{display}</span>;
}
