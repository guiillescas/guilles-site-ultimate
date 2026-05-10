"use client";

import { useRef } from "react";
import { useT } from "@/lib/i18n/I18nProvider";
import { projects } from "@/lib/data/projects";

function splitNameAndKind(html: string): { brand: string; kind: string } {
  const idx = html.indexOf("—");
  if (idx === -1) return { brand: html, kind: "" };
  return {
    brand: html.slice(0, idx).trim(),
    kind: html.slice(idx + 1).trim(),
  };
}

const ARROW_PREV = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M10 12L6 8L10 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ARROW_NEXT = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6 4L10 8L6 12"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function WorkNav() {
  const t = useT();
  return (
    <div className="projects-nav">
      <button
        type="button"
        data-prev
        aria-label={t("work.prev")}
        onClick={() => {
          const track = document.getElementById("projects-track");
          if (!track) return;
          track.scrollBy({ left: -stepFor(track), behavior: "smooth" });
        }}
      >
        {ARROW_PREV}
      </button>
      <button
        type="button"
        data-next
        aria-label={t("work.next")}
        onClick={() => {
          const track = document.getElementById("projects-track");
          if (!track) return;
          track.scrollBy({ left: stepFor(track), behavior: "smooth" });
        }}
      >
        {ARROW_NEXT}
      </button>
    </div>
  );
}

function stepFor(track: HTMLElement) {
  const card = track.querySelector<HTMLElement>(".project");
  const gap = parseFloat(getComputedStyle(track).gap) || 24;
  return (card?.offsetWidth || 560) + gap;
}

export function WorkTrack() {
  const t = useT();
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div className="projects-track" id="projects-track" ref={trackRef}>
      {projects.map((p) => {
        const { brand, kind } = splitNameAndKind(t(`${p.slug}.name`));
        return (
          <a
            key={p.slug}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project"
            style={{ "--project-gradient": p.gradient } as React.CSSProperties}
            aria-label={`${p.name} — ${t("work.visit")}`}
          >
            <div className="project-visual">
              <div className="project-mock">
                <div className="project-mock-top">
                  <div className="project-mock-status">
                    <span className="ind" aria-hidden="true" />
                    <span>{p.status}</span>
                  </div>
                  <span aria-hidden="true">// {p.num}</span>
                </div>
                <div>
                  <div className="project-mock-name">{p.name}</div>
                  <div className="project-mock-desc" style={{ marginTop: 8 }}>
                    {t(`${p.slug}.subtitle`)}
                  </div>
                </div>
              </div>
            </div>
            <div className="project-info">
              <div>
                <div className="project-name">
                  <span className="project-name-row">
                    <span className="num">{p.num}</span>
                    <span
                      className="brand"
                      dangerouslySetInnerHTML={{ __html: brand }}
                    />
                  </span>
                  {kind ? (
                    <>
                      <span className="kind-sep">{" — "}</span>
                      <span
                        className="kind"
                        dangerouslySetInnerHTML={{ __html: kind }}
                      />
                    </>
                  ) : null}
                </div>
                <p className="project-desc">{t(`${p.slug}.desc`)}</p>
              </div>
              <span className="project-link">
                <span>{t("work.visit")}</span>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 8.5L8.5 2.5M8.5 2.5H3.5M8.5 2.5V7.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
