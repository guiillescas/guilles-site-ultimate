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
  // Initialize with the final value so the server-rendered HTML carries the
  // real number (not 0) for crawlers and no-JS readers. The first client
  // render matches this, avoiding a hydration mismatch; the effect below then
  // resets to 0 and animates up once the section scrolls into view.
  const [val, setVal] = useState(to);
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

    // Hydrated and motion is allowed: drop to 0 to prime the count-up. The
    // Signal section sits below the fold, so this happens before it is seen.
    setVal(0);

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

  const format = (n: number) =>
    decimals > 0
      ? n.toFixed(decimals)
      : Math.floor(n).toLocaleString(LOCALE_TO_HTML[lang]);
  // Visible text animates; aria-label always exposes the final value so
  // assistive tech announces the real number even mid-animation.
  return (
    <span ref={ref} aria-label={format(to)}>
      {format(val)}
    </span>
  );
}
