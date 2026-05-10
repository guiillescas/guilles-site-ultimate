"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LangSwitch } from "./LangSwitch";
import { useT } from "@/lib/i18n/I18nProvider";

const LINKS = [
  { href: "#about", key: "nav.about" },
  { href: "#experience", key: "nav.experience" },
  { href: "#work", key: "nav.work" },
  { href: "#process", key: "nav.process" },
  { href: "#contact", key: "nav.contact" },
] as const;

export function Nav() {
  const t = useT();
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    if (!sections.length) return;

    const onScroll = () => {
      let cur = "";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= 100) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nav" aria-label="Primary">
      <Link href="/" className="nav-logo" aria-label="guilherme.illescas — home">
        <div className="nav-logo-mark" aria-hidden="true">
          G
        </div>
        <span>guilherme.illescas</span>
      </Link>
      <ul className="nav-links">
        {LINKS.map((l) => {
          const isActive = active === l.href.slice(1);
          return (
            <li key={l.href}>
              <a
                href={l.href}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "true" : undefined}
              >
                {t(l.key)}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="nav-end">
        <LangSwitch />
      </div>
    </nav>
  );
}
