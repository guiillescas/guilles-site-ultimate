import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({ extension: /\.mdx?$/ });

const isDev = process.env.NODE_ENV === "development";

// Vercel Analytics + Speed Insights endpoints — scripts come from va.vercel-scripts.com,
// page-view + vitals beacons go to vercel.com/_vercel/insights.
const VERCEL_SCRIPTS = "https://va.vercel-scripts.com";
const VERCEL_INSIGHTS = "https://vitals.vercel-insights.com";

// Dev needs `unsafe-eval` for React Refresh / HMR; prod hardens it away.
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${VERCEL_SCRIPTS}${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' ${VERCEL_INSIGHTS} ${VERCEL_SCRIPTS}${isDev ? " ws:" : ""}`,
  "frame-ancestors 'self'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  typedRoutes: true,
  outputFileTracingRoot: process.cwd(),
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [{ source: "/:path*", headers: [...SECURITY_HEADERS] }];
  },
};

export default withMDX(nextConfig);
