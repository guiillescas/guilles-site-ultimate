/**
 * Builds an ATS-friendly résumé from the same structured data that drives the
 * site (releases + i18n dictionary + SITE), so the PDF never drifts from the
 * page. The changelog framing (version tags, git metaphor) is stripped here —
 * the résumé is plain: Role · Company · Dates + bullets.
 */
import { releases } from "@/lib/data/releases";
import { DICTS } from "@/lib/i18n/dictionaries";
import { SITE, type Locale } from "@/lib/seo/site";

const strip = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** git-style company handles → proper résumé names */
const COMPANY_NAMES: Record<string, string> = {
  viralify: "Viralify",
  awsales: "AwSales",
  previdenciarista: "Previdenciarista",
  "escola-conquer": "Escola Conquer",
  "amank → bhub": "Amank (acquired by BHUB)",
  "chamer-tech": "Chamer",
  webtrip: "WebTrip",
};

export type ResumeExperience = {
  role: string;
  company: string;
  type: string;
  dates: string;
  summary: string;
  bullets: string[];
};

export type ResumeEducation = {
  degree: string;
  school: string;
  dates: string;
  detail?: string;
};

export type ResumeData = {
  name: string;
  title: string;
  location: string;
  email: string;
  links: { label: string; url: string }[];
  summary: string;
  experience: ResumeExperience[];
  skills: string[];
  education: ResumeEducation[];
  labels: {
    summary: string;
    experience: string;
    skills: string;
    education: string;
  };
};

export function buildResume(lang: Locale): ResumeData {
  const dict = DICTS[lang];
  const t = (key: string) => dict[key] ?? key;
  const present = lang === "pt" ? "Atual" : "Present";
  const fmtDates = (d: string) =>
    d.replace(/present/gi, present).replace(/→/g, "–");

  const experience: ResumeExperience[] = releases.map((r) => ({
    role: strip(t(r.roleKey)),
    company: COMPANY_NAMES[r.company] ?? r.company,
    type: strip(t(r.typeKey)),
    dates: fmtDates(r.dateRange),
    summary: strip(t(r.summaryKey)),
    bullets: [
      ...(r.noteKey ? [strip(t(r.noteKey))] : []),
      ...r.diffs.map((d) => strip(t(d.key))),
    ],
  }));

  const skills = [...new Set(releases.flatMap((r) => r.stack))];

  const education: ResumeEducation[] =
    lang === "pt"
      ? [
          {
            degree: "Bacharelado, Computer Software Engineering",
            school: "Pontifícia Universidade Católica do Paraná (PUCPR)",
            dates: "jan 2020 – dez 2023",
          },
          {
            degree: "Full Stack Developer — Bootcamp GoStack",
            school: "Rocketseat",
            dates: "2020",
            detail: "ReactJS, React Native, Node.js, TypeScript, HTML, CSS",
          },
        ]
      : [
          {
            degree: "Bachelor's, Computer Software Engineering",
            school: "Pontifícia Universidade Católica do Paraná (PUCPR)",
            dates: "Jan 2020 – Dec 2023",
          },
          {
            degree: "Full Stack Developer — GoStack Bootcamp",
            school: "Rocketseat",
            dates: "2020",
            detail: "ReactJS, React Native, Node.js, TypeScript, HTML, CSS",
          },
        ];

  const labels =
    lang === "pt"
      ? {
          summary: "Resumo",
          experience: "Experiência",
          skills: "Competências",
          education: "Formação",
        }
      : {
          summary: "Summary",
          experience: "Experience",
          skills: "Skills",
          education: "Education",
        };

  return {
    name: SITE.name,
    title: strip(t("role.senior")),
    location: lang === "pt" ? "Curitiba, Brasil" : "Curitiba, Brazil",
    email: SITE.author.email,
    links: [
      { label: "Portfolio", url: SITE.url },
      { label: "GitHub", url: SITE.social.github },
      { label: "LinkedIn", url: SITE.social.linkedin },
    ],
    summary: strip(t("hero.tagline")),
    experience,
    skills,
    education,
    labels,
  };
}
