"use client";

import { useEffect, useRef } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  stagger?: boolean;
  children: ReactNode;
};

/**
 * Adds an `in-view` class on intersection. Animation lives in CSS.
 * `stagger` swaps the trigger class for `.reveal-stagger`, which CSS uses
 * to cascade descendants instead of fading the wrapper itself.
 */
export function RevealOnScroll({
  as,
  stagger = false,
  className = "",
  children,
  ...rest
}: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.classList.add("in-view");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const triggerClass = stagger ? "reveal-stagger" : "reveal";

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={`${triggerClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}
