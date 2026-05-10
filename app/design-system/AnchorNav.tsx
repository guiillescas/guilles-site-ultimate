"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const LINKS = [
  { id: "palette", num: "01", label: "Palette" },
  { id: "typography", num: "02", label: "Typography" },
  { id: "spacing", num: "03", label: "Spacing" },
  { id: "components", num: "04", label: "Components" },
  { id: "motion", num: "05", label: "Motion" },
  { id: "voice", num: "06", label: "Voice" },
  { id: "dont", num: "07", label: "Don'ts" },
] as const;

export function AnchorNav() {
  const [active, setActive] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Keep the active link visible inside the horizontally-scrolling nav.
  useEffect(() => {
    if (!active || !navRef.current) return;
    const link = navRef.current.querySelector<HTMLAnchorElement>(
      `[data-target="${active}"]`,
    );
    if (link) {
      link.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  return (
    <nav className={styles.anchorNav} ref={navRef} aria-label="Sections">
      <Link href="/" className={styles.brand}>
        ← guilherme.illescas
      </Link>
      {LINKS.map((l) => {
        const isActive = active === l.id;
        return (
          <a
            key={l.id}
            href={`#${l.id}`}
            data-target={l.id}
            className={isActive ? styles.active : undefined}
            aria-current={isActive ? "true" : undefined}
          >
            {l.num} / {l.label}
          </a>
        );
      })}
    </nav>
  );
}
