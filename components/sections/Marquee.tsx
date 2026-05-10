const ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Vue / Nuxt",
  "React Query",
  "Tailwind",
  "Prisma",
  "GraphQL",
  "React Native",
  "Storybook",
  "Playwright",
  "Stripe API",
  "Meta WhatsApp API",
  "GCP",
  "Docker",
  "GitHub Actions",
  "Figma",
];

export function Marquee() {
  return (
    <section className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {ITEMS.map((item, i) => (
          <div className="marquee-item" key={`a-${i}`}>
            {item}
          </div>
        ))}
        {ITEMS.map((item, i) => (
          <div className="marquee-item" key={`b-${i}`}>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
