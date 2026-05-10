"use client";

import { CountUp } from "@/components/motion/CountUp";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { useT } from "@/lib/i18n/I18nProvider";

export function Signal() {
  const t = useT();

  return (
    <RevealOnScroll
      as="section"
      stagger
      className="section signal"
      data-screen-label="Signal"
    >
      <div className="container">
        <div className="signal-grid">
          <div className="stat" data-num="00">
            <div className="stat-value">
              <CountUp to={35} />
              <span className="unit">M+</span>
            </div>
            <div className="stat-label">{t("stats.users")}</div>
          </div>
          <div className="stat" data-num="01">
            <div className="stat-value">
              <CountUp to={27} />
              <span className="unit">K+</span>
            </div>
            <div className="stat-label">{t("stats.customers")}</div>
          </div>
          <div className="stat" data-num="02">
            <div className="stat-value">
              <CountUp to={22} />
              <span className="unit">%</span>
            </div>
            <div className="stat-label">{t("stats.perf")}</div>
          </div>
          <div className="stat" data-num="03">
            <div className="stat-value">
              <CountUp to={6} />
              <span className="unit">yr</span>
            </div>
            <div className="stat-label">{t("stats.years")}</div>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
