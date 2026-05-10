export type Project = {
  num: string;             // "01"
  name: string;            // brand name — displayed verbatim
  slug: string;            // for keys: p1, p2…
  href: string;
  status: string;          // "LIVE · v1.4.0"
  gradient: string;        // CSS gradient string for --project-gradient
};

export const projects: Project[] = [
  {
    num: "01",
    slug: "p5",
    name: "Gui & Gi",
    href: "https://www.guilherme-e-giovana.com/",
    status: "LIVE · personal",
    gradient: "linear-gradient(135deg, #f5f5f0 0%, #c5fc4d 100%)",
  },
  {
    num: "02",
    slug: "p2",
    name: "Viralify",
    href: "https://www.viralify.app/",
    status: "LIVE · AI",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #ff8a4c 100%)",
  },
  {
    num: "03",
    slug: "p1",
    name: "Guidefy",
    href: "https://guidefy.guilhermeillescas.dev/",
    status: "LIVE · v1.4.0",
    gradient: "linear-gradient(135deg, #c5fc4d 0%, #4ade80 100%)",
  },
  {
    num: "04",
    slug: "p4",
    name: "Coffee Delivery",
    href: "https://coffee-delivery.guilhermeillescas.dev/",
    status: "LIVE · case study",
    gradient: "linear-gradient(135deg, #ff8a4c 0%, #f87171 100%)",
  },
  {
    num: "05",
    slug: "p3",
    name: "Digital Hippo",
    href: "https://digital-hippo.com/",
    status: "LIVE · marketplace",
    gradient: "linear-gradient(135deg, #38bdf8 0%, #a78bfa 100%)",
  },
];
