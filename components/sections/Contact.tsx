"use client";

import { MagneticButton } from "@/components/motion/MagneticButton";
import { useT, useTHtml } from "@/lib/i18n/I18nProvider";
import { SITE } from "@/lib/seo/site";

export function Contact() {
  const t = useT();
  const tHtml = useTHtml();

  return (
    <section className="cta" id="contact" data-screen-label="Contact">
      <span className="section-num">// 06 — CONTACT</span>
      <div className="container">
        <h2 className="cta-headline" {...tHtml("cta.headline")} />
        <div className="cta-actions">
          <MagneticButton
            href={`mailto:${SITE.author.email}`}
            className="btn btn-primary"
          >
            <span>{SITE.author.email}</span>
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
            href={SITE.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <span>{t("cta.btn.call")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
