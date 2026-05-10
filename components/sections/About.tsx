"use client";

import { LiveClock } from "@/components/chrome/LiveClock";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { useT, useTHtml } from "@/lib/i18n/I18nProvider";

const SKILLS = [
  "React 19",
  "Next.js 15",
  "TypeScript",
  "React Query",
  "Nuxt 3",
  "Prisma",
  "Tailwind v4",
  "Node.js",
  "Stripe",
];

export function About() {
  const t = useT();
  const tHtml = useTHtml();

  return (
    <section className="section" id="about" data-screen-label="About">
      <span className="section-num">// 02 — ABOUT</span>
      <div className="container">
        <div className="about-grid">
          <RevealOnScroll>
            <div className="eyebrow">{t("about.eyebrow")}</div>
            <h2 className="about-title" {...tHtml("about.title")} />
          </RevealOnScroll>

          <RevealOnScroll className="about-body">
            <p {...tHtml("about.p1")} />
            <p {...tHtml("about.p2")} />
            <p {...tHtml("about.p3")} />

            <div className="about-card">
              <div className="about-card-header">
                <span className="about-card-title">~/guilherme.json</span>
                <div className="about-card-dots" aria-hidden="true">
                  <span className="about-card-dot active" />
                  <span className="about-card-dot" />
                  <span className="about-card-dot" />
                </div>
              </div>
              <dl className="about-info">
                <div className="about-info-row">
                  <dt className="label">{t("about.card.role.l")}</dt>
                  <dd className="value">{t("about.card.role.v")}</dd>
                </div>
                <div className="about-info-row">
                  <dt className="label">{t("about.card.based.l")}</dt>
                  <dd className="value">{t("about.card.based.v")}</dd>
                </div>
                <div className="about-info-row">
                  <dt className="label">{t("about.card.company.l")}</dt>
                  <dd className="value">{t("about.card.company.v")}</dd>
                </div>
                <div className="about-info-row">
                  <dt className="label">{t("about.card.localtime.l")}</dt>
                  <dd className="value live">
                    <LiveClock className="clock" />
                  </dd>
                </div>
                <div className="about-info-row">
                  <dt className="label">{t("about.card.status.l")}</dt>
                  <dd className="value live">{t("about.card.status.v")}</dd>
                </div>
                <div className="about-info-row">
                  <dt className="label">{t("about.card.tz.l")}</dt>
                  <dd className="value">{t("about.card.tz.v")}</dd>
                </div>
              </dl>

              <div className="about-skills-label">
                {t("about.card.skills")}
              </div>
              <ul className="about-skills" aria-label={t("about.card.skills")}>
                {SKILLS.map((s) => (
                  <li className="skill-chip" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
