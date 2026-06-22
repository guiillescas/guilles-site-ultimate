/**
 * Career releases — structured data for the Experience section.
 * Order: newest first (renders top-down on the timeline).
 *
 * `summaryKey` and `diffKeys` point into the i18n dictionary —
 * actual copy lives in /lib/i18n/{en,pt}.ts.
 */

export type DiffMarker = "+" | "★";
export type DiffTone = "default" | "shipped" | "led";

export type DiffLine = {
  key: string;            // i18n key (HTML allowed)
  marker: DiffMarker;
  tone?: DiffTone;
};

export type Release = {
  version: string;        // "v8.0.0"
  isLatest?: boolean;
  current?: boolean;
  company: string;        // displayed lowercased after `@`
  url?: string;           // company/product link — renders the name as an external link
  branch?: string;        // git-style branch name (e.g. "side/amank") — side ventures render off the main trunk
  partTime?: boolean;     // renders a PART-TIME chip
  noteKey?: string;       // i18n key for a highlighted callout (e.g. the part-time transition)
  dateRange: string;      // "Jul 2024 → present" — kept literal, no i18n
  durationKey: string;    // i18n key e.g. "dur.v8"
  roleKey: string;        // i18n key e.g. "role.senior"
  typeKey: string;        // i18n key e.g. "type.fulltime.remote"
  summaryKey: string;     // HTML i18n key
  diffs: DiffLine[];
  stack: string[];        // raw chip labels — NOT translated
  hash: string;           // 7-char fake commit hash
};

export const releases: Release[] = [
  {
    version: "v7.0.0",
    isLatest: true,
    current: true,
    company: "awsales",
    url: "https://www.awsales.io/",
    dateRange: "Jul 2024 → present",
    durationKey: "dur.v8",
    roleKey: "role.senior",
    typeKey: "type.fulltime.remote",
    summaryKey: "v8.summary",
    diffs: [
      { key: "v8.d1", marker: "★", tone: "led" },
      { key: "v8.d2", marker: "+", tone: "shipped" },
      { key: "v8.d3", marker: "+", tone: "shipped" },
      { key: "v8.d4", marker: "+" },
      { key: "v8.d5", marker: "+", tone: "shipped" },
      { key: "v8.d6", marker: "+" },
      { key: "v8.d7", marker: "★", tone: "led" },
    ],
    stack: ["Next.js", "TypeScript", "React", "Vite", "React Query", "Node.js", "Nuxt", "Prisma", "GraphQL", "Stripe", "WhatsApp API", "Tailwind", "Storybook", "Jest", "Playwright", "GCP", "Docker", "GitHub Actions", "Figma"],
    hash: "a8f2c7e",
  },
  {
    version: "v6.0.0",
    current: true,
    company: "viralify",
    url: "https://www.viralify.app/",
    branch: "side/viralify",
    dateRange: "Aug 2025 → present",
    durationKey: "dur.v9",
    roleKey: "role.cofounder.swe",
    typeKey: "type.founder.side",
    summaryKey: "v9.summary",
    diffs: [
      { key: "v9.d1", marker: "★", tone: "led" },
      { key: "v9.d2", marker: "+", tone: "shipped" },
      { key: "v9.d3", marker: "+", tone: "shipped" },
      { key: "v9.d4", marker: "★", tone: "led" },
      { key: "v9.d5", marker: "+", tone: "shipped" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Mongoose", "Prisma", "NextAuth", "Stripe", "OpenAI", "Claude", "Puppeteer", "Zod", "React Hook Form", "Zustand", "Tailwind", "Radix UI", "Framer Motion", "Three.js", "Resend", "Vercel"],
    hash: "b9f4e21",
  },
  {
    version: "v5.0.0",
    company: "previdenciarista",
    url: "https://previdenciarista.com/",
    partTime: true,
    noteKey: "v7.note",
    dateRange: "Oct 2023 → Sep 2025",
    durationKey: "dur.v7",
    roleKey: "role.frontend.senior",
    typeKey: "type.fulltime.remote",
    summaryKey: "v7.summary",
    diffs: [
      { key: "v7.d1", marker: "+", tone: "shipped" },
      { key: "v7.d2", marker: "+", tone: "shipped" },
      { key: "v7.d3", marker: "+" },
      { key: "v7.d4", marker: "+", tone: "shipped" },
      { key: "v7.d5", marker: "+" },
      { key: "v7.d6", marker: "+" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "React Hooks", "Jest", "Playwright", "GA", "GTM", "SEO"],
    hash: "b3d4f1a",
  },
  {
    version: "v4.1.0",
    company: "escola-conquer",
    url: "https://conquer.plus/",
    dateRange: "Oct 2022 → Oct 2023",
    durationKey: "dur.v6_1",
    roleKey: "role.frontend.senior",
    typeKey: "type.fulltime.hybrid",
    summaryKey: "v6_1.summary",
    diffs: [
      { key: "v6_1.d1", marker: "★", tone: "led" },
      { key: "v6_1.d2", marker: "+", tone: "shipped" },
      { key: "v6_1.d3", marker: "+", tone: "shipped" },
      { key: "v6_1.d4", marker: "★", tone: "led" },
      { key: "v6_1.d5", marker: "★", tone: "led" },
      { key: "v6_1.d6", marker: "+" },
    ],
    stack: ["Next.js", "TypeScript", "Styled Components", "React Hooks", "Single SPA", "Storybook", "Figma", "Leadership"],
    hash: "e1c5b09",
  },
  {
    version: "v4.0.0",
    company: "escola-conquer",
    url: "https://conquer.plus/",
    dateRange: "Sep 2021 → Oct 2022",
    durationKey: "dur.v6_0",
    roleKey: "role.frontend.mid",
    typeKey: "type.fulltime.hybrid",
    summaryKey: "v6_0.summary",
    diffs: [
      { key: "v6_0.d1", marker: "+", tone: "shipped" },
      { key: "v6_0.d2", marker: "+" },
      { key: "v6_0.d3", marker: "+" },
      { key: "v6_0.d4", marker: "+" },
    ],
    stack: ["React", "TypeScript", "Node.js", "Styled Components", "REST APIs"],
    hash: "4a08d72",
  },
  {
    version: "v3.0.0",
    company: "amank → bhub",
    url: "https://amank.com.br/",
    branch: "side/amank",
    dateRange: "Jun 2021 → May 2023",
    durationKey: "dur.v5",
    roleKey: "role.cofounder",
    typeKey: "type.founder.side",
    summaryKey: "v5.summary",
    diffs: [
      { key: "v5.d1", marker: "+", tone: "shipped" },
      { key: "v5.d2", marker: "★", tone: "led" },
      { key: "v5.d3", marker: "★", tone: "led" },
      { key: "v5.d4", marker: "★", tone: "shipped" },
    ],
    stack: ["React", "Next.js", "TypeScript", "Styled Components", "REST APIs", "Founding team"],
    hash: "d7a2189",
  },
  {
    version: "v2.0.0",
    company: "chamer-tech",
    url: "https://www.chamer.com.br/",
    dateRange: "Feb 2021 → Sep 2021",
    durationKey: "dur.v4",
    roleKey: "role.engineer",
    typeKey: "type.fulltime.onsite",
    summaryKey: "v4.summary",
    diffs: [
      { key: "v4.d1", marker: "+", tone: "shipped" },
      { key: "v4.d2", marker: "+", tone: "shipped" },
      { key: "v4.d3", marker: "+" },
      { key: "v4.d4", marker: "+" },
    ],
    stack: ["React", "TypeScript", "REST APIs", "E-commerce", "SEO"],
    hash: "2b94da5",
  },
  {
    version: "v1.0.0",
    company: "webtrip",
    dateRange: "Jan 2020 → Nov 2020",
    durationKey: "dur.v3",
    roleKey: "role.junior",
    typeKey: "type.fulltime.onsite",
    summaryKey: "v3.summary",
    diffs: [
      { key: "v3.d1", marker: "+", tone: "shipped" },
      { key: "v3.d2", marker: "+" },
      { key: "v3.d3", marker: "+" },
      { key: "v3.d4", marker: "+" },
    ],
    stack: ["HTML", "CSS", "JavaScript", "Apps Script", "Suite CRM", "DevOps"],
    hash: "f0bd31c",
  },
];
