"use client";

import { useEffect, useRef } from "react";

const PRELOADER_DURATION = 1500;

export function Preloader() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("gone");
      return;
    }
    const id = window.setTimeout(
      () => el.classList.add("gone"),
      PRELOADER_DURATION,
    );
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="preloader" aria-hidden="true" ref={ref}>
      <div className="preloader-mark">
        guilherme<span>.</span>illescas
      </div>
      <div className="preloader-progress" />
      <div className="preloader-count">
        INITIALIZING <span>—</span> v2026.01
      </div>
    </div>
  );
}
