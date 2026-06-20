import { SITE } from "./site";
import { releases } from "@/lib/data/releases";
import { en } from "@/lib/i18n/en";
import { COMPANY_NAMES } from "@/lib/resume/data";

/**
 * Schema.org structured data for crawlers and LLMs.
 * Emitted as a single `@graph` block from the root layout.
 *
 * - Person: identity, role, social profiles, full dated work history and
 *   education → drives Google Knowledge Panel and lets AI/recruiter tools
 *   extract the career straight from structured data, not the changelog visual.
 * - WebSite: site identity + SearchAction (informational, no /search route).
 * - WebPage: this page's role in the site graph.
 * - ProfilePage: hint that the homepage doubles as a personal profile.
 */
const MONTHS: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};
const isoMonth = (s: string) => {
  const m = s.trim().match(/^([A-Za-z]{3}) (\d{4})$/);
  return m ? `${m[2]}-${MONTHS[m[1]]}` : undefined;
};

export function buildStructuredData() {
  const personId = `${SITE.url}/#person`;
  const websiteId = `${SITE.url}/#website`;
  const pageId = `${SITE.url}/#webpage`;

  const dict = en as Record<string, string>;

  // Every role as a dated schema.org Role (Person → worksFor → Role → worksFor → Organization).
  const employment = releases.map((r) => {
    const [startRaw, endRaw] = r.dateRange.split("→").map((s) => s.trim());
    const startDate = isoMonth(startRaw);
    const endDate = isoMonth(endRaw);
    return {
      "@type": "OrganizationRole",
      roleName: dict[r.roleKey] ?? r.roleKey,
      ...(startDate ? { startDate } : {}),
      ...(endDate ? { endDate } : {}),
      worksFor: {
        "@type": "Organization",
        name: COMPANY_NAMES[r.company] ?? r.company,
      },
    };
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.author.name,
        givenName: "Guilherme",
        familyName: "Illescas",
        url: SITE.url,
        image: `${SITE.url}/opengraph-image`,
        email: `mailto:${SITE.author.email}`,
        jobTitle: SITE.author.role,
        worksFor: employment,
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "Pontifícia Universidade Católica do Paraná",
            sameAs: "https://www.pucpr.br/",
          },
          {
            "@type": "EducationalOrganization",
            name: "Rocketseat",
            sameAs: "https://www.rocketseat.com.br/",
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Curitiba",
          addressCountry: "BR",
        },
        sameAs: [
          SITE.social.github,
          SITE.social.linkedin,
          SITE.social.instagram,
        ],
        knowsAbout: [
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "Web performance",
          "Design systems",
          "AI engineering",
          "Vue",
          "Nuxt",
          "Prisma",
          "GraphQL",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE.url,
        name: SITE.name,
        description: SITE.description,
        publisher: { "@id": personId },
        inLanguage: ["en", "pt-BR"],
      },
      {
        "@type": "ProfilePage",
        "@id": pageId,
        url: SITE.url,
        name: SITE.title,
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        isPartOf: { "@id": websiteId },
      },
    ],
  };
}
