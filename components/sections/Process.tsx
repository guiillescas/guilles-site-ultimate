"use client";

import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useT, useTHtml } from "@/lib/i18n/I18nProvider";
import { SITE } from "@/lib/seo/site";

const CARDS = [
  { eyebrow: "process.c1.eyebrow", title: "process.c1.title", body: "process.c1.body", html: false },
  { eyebrow: "process.c2.eyebrow", title: "process.c2.title", body: "process.c2.body", html: true },
  { eyebrow: "process.c3.eyebrow", title: "process.c3.title", body: "process.c3.body", html: false },
  { eyebrow: "process.c4.eyebrow", title: "process.c4.title", body: "process.c4.body", html: false },
] as const;

export function Process() {
  const t = useT();
  const tHtml = useTHtml();

  return (
    <section className="section" id="process" data-screen-label="Process">
      <span className="section-num">// 05 — PROCESS</span>
      <div className="container">
        <RevealOnScroll className="experience-header">
          <div className="left">
            <div className="eyebrow">{t("process.eyebrow")}</div>
            <h2 className="experience-title" {...tHtml("process.title")} />
            <p className="experience-sub">{t("process.sub")}</p>
          </div>
          <div className="experience-counter">
            <span className="num">v1</span>
            <span>{t("process.counter")}</span>
          </div>
        </RevealOnScroll>

        <div className="process-grid">
          {CARDS.map((c) => (
            <article className="process-card" key={c.eyebrow}>
              <div className="process-card-eyebrow">{t(c.eyebrow)}</div>
              <h3 className="process-card-title">{t(c.title)}</h3>
              {c.html ? (
                <p className="process-card-body" {...tHtml(c.body)} />
              ) : (
                <p className="process-card-body">{t(c.body)}</p>
              )}
            </article>
          ))}
        </div>

        <div className="process-actions">
          <MagneticButton href="/design-system" className="btn btn-primary">
            <span>{t("process.cta.ds")}</span>
            <svg
              className="btn-arrow"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 11L11 3M11 3H4M11 3V10"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </MagneticButton>
          <a
            href={SITE.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <span>{t("process.cta.gh")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
