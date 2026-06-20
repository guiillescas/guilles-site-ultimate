"use client";

import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { useT, useTHtml, useI18n } from "@/lib/i18n/I18nProvider";
import { releases } from "@/lib/data/releases";

const RELEASE_COUNT = String(releases.length).padStart(2, "0");

export function Experience() {
  const t = useT();
  const tHtml = useTHtml();
  const { lang } = useI18n();

  return (
    <section className="section" id="experience" data-screen-label="Experience">
      <span className="section-num">// 03 — EXPERIENCE</span>
      <div className="container">
        <RevealOnScroll className="experience-header">
          <div className="left">
            <div className="eyebrow">{t("exp.eyebrow")}</div>
            <h2 className="experience-title" {...tHtml("exp.title")} />
            <p className="experience-sub">{t("exp.sub")}</p>
            <a className="cv-download" href={`/resume?lang=${lang}`} download>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 1.5V9M7 9L4 6M7 9L10 6M2.5 11.5h9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t("exp.cv")}
            </a>
          </div>
          <div className="experience-counter">
            <span className="num">{RELEASE_COUNT}</span>
            <span>{t("exp.counter")}</span>
          </div>
        </RevealOnScroll>

        <ExperienceTimeline />
      </div>
    </section>
  );
}
