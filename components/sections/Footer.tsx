"use client";

import { LiveClock } from "@/components/chrome/LiveClock";
import { useT } from "@/lib/i18n/I18nProvider";
import { SITE } from "@/lib/seo/site";

export function Footer() {
  const t = useT();
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          guilherme<span className="accent">.</span>illescas
        </div>
        <nav className="footer-social" aria-label="Social profiles">
          <a href={SITE.social.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a
            href={SITE.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a href={`mailto:${SITE.author.email}`}>Email</a>
        </nav>
        <div className="footer-meta">
          <div>{t("footer.version")}</div>
          <LiveClock />
        </div>
      </div>
    </footer>
  );
}
