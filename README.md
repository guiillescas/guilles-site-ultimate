# guilhermeillescas.dev

Personal site for Guilherme Illescas. Single-page portfolio with a documented design system. Server-rendered, internationalized, accessible, fully indexed.

**Live:** https://guilhermeillescas.dev

---

## Stack

| Layer        | Choice                                       |
| ------------ | -------------------------------------------- |
| Framework    | Next.js 15.5 · App Router · Server Actions   |
| UI runtime   | React 19                                     |
| Language     | TypeScript 5.6 · `strict` · `typedRoutes`    |
| Styling      | Tailwind CSS v4 · CSS variables (tokens)     |
| Fonts        | Geist · Geist Mono via `next/font` (zero CLS)|
| i18n         | Cookie-based · SSR-aware · `en` + `pt-BR`    |
| Package mgr  | pnpm                                         |

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm build
pnpm start
```

## Architecture

```
app/                    Routes, metadata, OG/icons, sitemap, robots, manifest
├── layout.tsx          Root layout — full Metadata API + JSON-LD graph
├── page.tsx            Composes the home from sections
├── opengraph-image.tsx Edge-rendered 1200×630 OG/Twitter card
├── icon.tsx            Edge-rendered favicon
├── apple-icon.tsx      Edge-rendered iOS/Android icon
├── sitemap.ts          Sitemap with hreflang alternates
├── robots.ts           robots.txt
├── manifest.ts         PWA manifest
├── globals.css         Tokens + reset + components + reduced-motion
└── design-system/      Public design system showcase

components/
├── chrome/             Site chrome — Nav, BgCanvas, Preloader, LiveClock, LangSwitch, SkipLink
├── motion/             Animation primitives — RevealOnScroll, CountUp, MagneticButton, SplitWords
└── sections/           Server-rendered home sections + small client islands

lib/
├── data/               Typed content arrays — releases (career), projects (work)
├── i18n/               Server + client translation helpers
│                       - server.ts        getServerI18n() reads cookie
│                       - I18nProvider.tsx Client context, persists via cookie
│                       - en.ts / pt.ts    Dictionaries
└── seo/                Site-wide constants and JSON-LD graph
```

### Server-first rendering

Every section is a Server Component that resolves `t()` from the locale cookie. Only interactive islands are client-rendered (`Nav`, `LiveClock`, `Preloader`, `BgCanvas`, the timeline scroll-progress effect, the work carousel, the magnetic CTAs). Crawlers and LLMs receive fully-translated, fully-static HTML on first byte.

### Internationalization

- `<I18nProvider initialLang>` is hydrated from a cookie set on the server.
- Switching language writes the cookie and updates `<html lang>`.
- Server Components read the same cookie via `getServerI18n()`.
- No SSR/CSR mismatch, no flash of untranslated content, no extra dependency.

### SEO

- **Metadata API** with `metadataBase`, OpenGraph, Twitter Card, robots, hreflang alternates, canonical.
- **JSON-LD `@graph`** with `Person`, `WebSite`, `ProfilePage` — drives Google Knowledge Panel and grounds LLM crawlers (ChatGPT, Perplexity, Gemini).
- Real numbers in copy: 10M+ certificates issued at Conquer, 35M+ students reached, 22% perf gains — never adjectives.
- **Edge-rendered OG image** (`/opengraph-image`) — 1200×630 PNG, branded.
- **Sitemap + robots + manifest** generated from `lib/seo/site.ts`.
- **`<title>` template** so subpages inherit the brand suffix.

### Accessibility

- `prefers-reduced-motion` honored in CSS *and* in every motion component (canvas hidden, preloader skipped, `IntersectionObserver` reveals turned into instant state).
- `pointer: coarse` disables magnetic buttons and the canvas grid on touch devices.
- Skip-to-content link, `aria-current` on the active nav item, `aria-label`s on icon-only buttons, semantic `<dl>` / `<ol>` for the about card and timeline, focus-visible rings.
- HTTP security headers: HSTS, X-Frame-Options, Permissions-Policy, Referrer-Policy.

### Performance

- First Load JS for `/`: **~118 kB** shared + **5.19 kB** route.
- All home sections are Server Components — copy ships in HTML, not JS.
- Canvas RAF pauses on `visibilitychange` and skips entirely when reduced motion or coarse pointer is detected.
- Single global `Intl.DateTimeFormat` instance for the live clock.
- `next/font` self-hosts Geist with `display: swap` and emits `<link rel="preload">` font hints.

### Design tokens

A single `:root` block in `app/globals.css` defines color, type, spacing, and motion tokens. Tailwind v4 re-exports them via `@theme inline { … }` so utility classes and bespoke CSS share one source of truth — the public `/design-system` route documents the tokens.

## License

All rights reserved. Code is published for transparency, not for reuse.
