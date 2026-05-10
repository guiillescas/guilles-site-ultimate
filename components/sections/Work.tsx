"use client";

import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { WorkNav, WorkTrack } from "./WorkCarousel";
import { useT, useTHtml } from "@/lib/i18n/I18nProvider";

export function Work() {
  const t = useT();
  const tHtml = useTHtml();

  return (
    <section className="section" id="work" data-screen-label="Work">
      <span className="section-num">// 04 — SELECTED WORK</span>
      <div className="container">
        <RevealOnScroll className="projects-header">
          <div>
            <div className="eyebrow">{t("work.eyebrow")}</div>
            <h2 className="projects-title" {...tHtml("work.title")} />
          </div>
          <WorkNav />
        </RevealOnScroll>
      </div>

      <WorkTrack />
    </section>
  );
}
