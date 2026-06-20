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

    // Pin the trunk line's top to where the first branch curve actually ends, so
    // the spine starts exactly at the divergence (no dangling stub, no gap) —
    // measured from the real layout instead of a hard-coded offset.
    const setTrunkTop = () => {
      const curve = timeline.querySelector(".branch-curve");
      const release = curve?.closest<HTMLElement>(".release");
      if (!curve || !release) return;
      // offsetTop is layout-based (ignores the reveal transform); the rect diff
      // is transform-invariant (curve and card move together), so the junction
      // comes out right even mid reveal-animation.
      const top =
        release.offsetTop +
        (curve.getBoundingClientRect().bottom -
          release.getBoundingClientRect().top) -
        7; // tuck the trunk slightly under the curve end so they overlap cleanly
      timeline.style.setProperty("--trunk-top", `${top}px`);
    };
    setTrunkTop();
    window.addEventListener("resize", setTrunkTop);

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
      window.removeEventListener("resize", setTrunkTop);
      io.disconnect();
    };
  }, []);

  return (
    <ol className="timeline" ref={timelineRef}>
      {releases.map((r) => (
        <li
          key={r.version}
          className={`release${r.current ? " current" : ""}${r.branch ? " branch" : ""}`}
        >
          <article>
            <div className="release-marker" aria-hidden="true">
              {r.branch ? (
                <svg
                  className="branch-curve"
                  width="22"
                  height="40"
                  viewBox="0 0 22 40"
                  fill="none"
                  aria-hidden="true"
                >
                  {!r.current ? (
                    <defs>
                      <linearGradient
                        id={`branch-grad-${r.version.replace(/\./g, "-")}`}
                        x1="0"
                        y1="40"
                        x2="22"
                        y2="0"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" className="grad-trunk" />
                        <stop offset="1" className="grad-node" />
                      </linearGradient>
                    </defs>
                  ) : null}
                  <path
                    d="M22 0 C 22 24, 0 16, 0 40"
                    stroke={
                      r.current
                        ? "currentColor"
                        : `url(#branch-grad-${r.version.replace(/\./g, "-")})`
                    }
                    strokeWidth="1.5"
                  />
                </svg>
              ) : null}
            </div>
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
                {r.current && !r.isLatest ? (
                  <span className="status-chip is-current" aria-label="Current role">
                    <span className="chip-dot" aria-hidden="true" />
                    CURRENT
                  </span>
                ) : null}
                {r.partTime ? (
                  <span className="status-chip is-parttime" aria-label="Part-time">
                    <span className="chip-dot" aria-hidden="true" />
                    PART-TIME
                  </span>
                ) : null}
                <span className="ver">guilherme/career</span>
                <span className="at" aria-hidden="true">
                  @
                </span>
                {r.url ? (
                  <a
                    className="company"
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${r.company} — opens in a new tab`}
                  >
                    {r.company}
                    <svg
                      className="company-arrow"
                      width="9"
                      height="9"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 11L11 3M11 3H4M11 3V10"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>
                ) : (
                  <span className="company">{r.company}</span>
                )}
                {r.branch ? (
                  <span className="branch-chip">
                    <span className="branch-dot" aria-hidden="true" />
                    Side project
                  </span>
                ) : null}
              </div>
              <div className="release-meta">
                <span className="date-range">{r.dateRange}</span>
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
                {r.noteKey ? (
                  <div className="release-callout">
                    <span className="callout-icon" aria-hidden="true">
                      ◐
                    </span>
                    <span {...tHtml(r.noteKey)} />
                  </div>
                ) : null}
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
