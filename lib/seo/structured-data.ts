import { SITE } from "./site";

/**
 * Schema.org structured data for crawlers and LLMs.
 * Emitted as a single `@graph` block from the root layout.
 *
 * - Person: identity, role, social profiles → drives Google Knowledge Panel and LLM grounding.
 * - WebSite: site identity + SearchAction (informational, no /search route).
 * - WebPage: this page's role in the site graph.
 * - ProfilePage: hint that the homepage doubles as a personal profile.
 */
export function buildStructuredData() {
  const personId = `${SITE.url}/#person`;
  const websiteId = `${SITE.url}/#website`;
  const pageId = `${SITE.url}/#webpage`;

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
        worksFor: {
          "@type": "Organization",
          name: SITE.author.company,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "São Paulo",
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
