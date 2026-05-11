"use client";

import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { useT, useTHtml } from "@/lib/i18n/I18nProvider";
import { releases } from "@/lib/data/releases";

const RELEASE_COUNT = String(releases.length).padStart(2, "0");

export function Experience() {
  const t = useT();
  const tHtml = useTHtml();

  return (
    <section className="section" id="experience" data-screen-label="Experience">
      <span className="section-num">// 03 — EXPERIENCE</span>
      <div className="container">
        <RevealOnScroll className="experience-header">
          <div className="left">
            <div className="eyebrow">{t("exp.eyebrow")}</div>
            <h2 className="experience-title" {...tHtml("exp.title")} />
            <p className="experience-sub">{t("exp.sub")}</p>
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
