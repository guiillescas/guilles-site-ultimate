"use client";

import { LiveClock } from "@/components/chrome/LiveClock";
import { SplitWords } from "@/components/motion/SplitWords";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useT, useTHtml } from "@/lib/i18n/I18nProvider";

export function Hero() {
  const t = useT();
  const tHtml = useTHtml();

  return (
    <section className="hero" id="top" data-screen-label="Hero">
      <div className="container">
        <div className="hero-meta">
          <div className="hero-meta-block">
            <span>// 01 / Index</span>
            <span>{t("hero.meta.role")}</span>
          </div>
          <div className="hero-meta-block" style={{ textAlign: "right" }}>
            <span>{t("hero.meta.based")}</span>
            <span>
              {t("hero.meta.location")}{" "}
              <LiveClock className="clock" />
            </span>
          </div>
        </div>

        <SplitWords keyName="hero.headline" className="hero-headline" />

        <div className="hero-bottom">
          <p className="hero-tagline" {...tHtml("hero.tagline")} />
          <div className="hero-actions">
            <MagneticButton href="#work" className="btn btn-primary">
              <span>{t("hero.cta.work")}</span>
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
            <a href="#contact" className="btn">
              <span>{t("hero.cta.talk")}</span>
            </a>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>{t("hero.scroll")}</span>
        </div>
      </div>
    </section>
  );
}
