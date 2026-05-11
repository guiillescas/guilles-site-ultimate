"use client";

import { useEffect, useRef } from "react";
import { useT, useTHtml } from "@/lib/i18n/I18nProvider";
import { releases } from "@/lib/data/releases";

export function ExperienceTimeline() {
  const t = useT();
  const tHtml = useTHtml();
  const timelineRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const update = () => {
      const rect = timeline.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.6;
      const end = -rect.height + vh * 0.4;
      const total = start - end;
      const prog = Math.max(0, Math.min(1, (start - rect.top) / total));
      timeline.style.setProperty("--scroll-progress", `${prog * 100}%`);
    };

    if (!reduceMotion) {
      update();
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
    } else {
      timeline.style.setProperty("--scroll-progress", "100%");
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
    timeline
      .querySelectorAll<HTMLElement>(".release")
      .forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      io.disconnect();
    };
  }, []);

  return (
    <ol className="timeline" ref={timelineRef}>
      {releases.map((r) => (
        <li
          key={r.version}
          className={`release${r.current ? " current" : ""}`}
        >
          <article>
            <div className="release-marker" aria-hidden="true" />
            <header className="release-head">
              <div className="release-version">
                <span className={`tag${r.isLatest ? " latest" : ""}`}>
                  {r.version}
                </span>
                {r.isLatest ? (
                  <span className="latest-chip" aria-label="Latest release">
                    <span className="latest-chip-dot" aria-hidden="true" />
                    LATEST
                  </span>
                ) : null}
                <span className="ver">guilherme/career</span>
                <span className="at" aria-hidden="true">
                  @
                </span>
                <span className="company">{r.company}</span>
              </div>
              <div className="release-meta">
                <span>{r.dateRange}</span>
                <span className="duration">{t(r.durationKey)}</span>
              </div>
            </header>
            <div className="release-body">
              <div className="release-role">
                <span className="label">{t("release.role.label")}</span>
                <span className="title">{t(r.roleKey)}</span>
                <span className="type">{t(r.typeKey)}</span>
              </div>
              <div className="release-changes">
                <p className="release-summary" {...tHtml(r.summaryKey)} />
                {r.diffs.map((d) => (
                  <div className="diff-line" key={d.key}>
                    <span
                      className={`marker${d.tone && d.tone !== "default" ? ` ${d.tone}` : ""}`}
                      aria-hidden="true"
                    >
                      {d.marker}
                    </span>
                    <span className="text" {...tHtml(d.key)} />
                  </div>
                ))}
              </div>
            </div>
            <footer className="release-footer">
              <ul className="release-stack" aria-label="Stack">
                {r.stack.map((s) => (
                  <li className="stack-chip" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
              <span className="release-hash" aria-hidden="true">
                {r.hash}
              </span>
            </footer>
          </article>
        </li>
      ))}
    </ol>
  );
}
