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
    version: "v8.0.0",
    isLatest: true,
    current: true,
    company: "awsales",
    dateRange: "Jul 2024 → present",
    durationKey: "dur.v8",
    roleKey: "role.senior",
    typeKey: "type.fulltime.remote",
    summaryKey: "v8.summary",
    diffs: [
      { key: "v8.d1", marker: "+", tone: "shipped" },
      { key: "v8.d2", marker: "+" },
      { key: "v8.d3", marker: "+" },
      { key: "v8.d4", marker: "★", tone: "led" },
      { key: "v8.d5", marker: "+" },
    ],
    stack: ["Next.js", "React", "React Query", "Tailwind", "Prisma", "Nuxt", "Node.js", "Stripe", "GCP", "Docker"],
    hash: "a8f2c7e",
  },
  {
    version: "v7.0.0",
    company: "previdenciarista",
    dateRange: "Nov 2023 → Sep 2025",
    durationKey: "dur.v7",
    roleKey: "role.senior",
    typeKey: "type.freelance.remote",
    summaryKey: "v7.summary",
    diffs: [
      { key: "v7.d1", marker: "+", tone: "shipped" },
      { key: "v7.d2", marker: "+", tone: "shipped" },
      { key: "v7.d3", marker: "+" },
      { key: "v7.d4", marker: "+" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Playwright", "Jest", "SEO"],
    hash: "b3d4f1a",
  },
  {
    version: "v6.0.0",
    company: "escola-conquer",
    dateRange: "Oct 2022 → Oct 2023",
    durationKey: "dur.v6",
    roleKey: "role.lead",
    typeKey: "type.fulltime.hybrid",
    summaryKey: "v6.summary",
    diffs: [
      { key: "v6.d1", marker: "★", tone: "led" },
      { key: "v6.d2", marker: "+" },
      { key: "v6.d3", marker: "+" },
      { key: "v6.d4", marker: "+" },
      { key: "v6.d5", marker: "+" },
    ],
    stack: ["Next.js", "TypeScript", "Single SPA", "Storybook", "Styled Components", "Jest", "Leadership"],
    hash: "e1c5b09",
  },
  {
    version: "v5.0.0",
    company: "amank → bhub",
    dateRange: "Aug 2022 → May 2023",
    durationKey: "dur.v5",
    roleKey: "role.cofounder",
    typeKey: "type.founder.hybrid",
    summaryKey: "v5.summary",
    diffs: [
      { key: "v5.d1", marker: "+", tone: "shipped" },
      { key: "v5.d2", marker: "★", tone: "led" },
      { key: "v5.d3", marker: "★", tone: "shipped" },
    ],
    stack: ["Next.js", "TypeScript", "Styled Components", "Storybook", "REST APIs", "Founding team"],
    hash: "d7a2189",
  },
  {
    version: "v4.0.0",
    company: "dobank",
    dateRange: "Jun 2021 → Dec 2021",
    durationKey: "dur.v4",
    roleKey: "role.mobile",
    typeKey: "type.freelance.remote",
    summaryKey: "v4.summary",
    diffs: [
      { key: "v4.d1", marker: "+", tone: "shipped" },
      { key: "v4.d2", marker: "+" },
    ],
    stack: ["React Native", "GraphQL", "Jest", "Styled Components"],
    hash: "6f18c2e",
  },
  {
    version: "v3.0.0",
    company: "chamer-tech",
    dateRange: "Mar 2021 → Sep 2021",
    durationKey: "dur.v3",
    roleKey: "role.engineer",
    typeKey: "type.freelance.remote",
    summaryKey: "v3.summary",
    diffs: [
      { key: "v3.d1", marker: "+" },
      { key: "v3.d2", marker: "+" },
    ],
    stack: ["React", "TypeScript", "Jest", "REST APIs", "SEO"],
    hash: "2b94da5",
  },
  {
    version: "v2.0.0",
    company: "webtrip",
    dateRange: "Jan 2020 → Nov 2020",
    durationKey: "dur.v2",
    roleKey: "role.junior",
    typeKey: "type.fulltime.onsite",
    summaryKey: "v2.summary",
    diffs: [
      { key: "v2.d1", marker: "+" },
      { key: "v2.d2", marker: "+" },
    ],
    stack: ["HTML", "CSS", "JavaScript", "DevOps", "Suite CRM"],
    hash: "f0bd31c",
  },
];
