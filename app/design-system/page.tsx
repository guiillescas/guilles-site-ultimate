import type { Metadata } from "next";
import { Swatch } from "./Swatch";
import { AnchorNav } from "./AnchorNav";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Design System — Guilherme Illescas",
};

const SURFACES = [
  { token: "--bg", hex: "#0b0b0c", use: "Main background of every page." },
  { token: "--bg-elevated", hex: "#131316", use: "Cards, panels, elevated areas." },
  { token: "--bg-overlay", hex: "#1a1a1e", use: "Card headers, hover states." },
];

const TEXTS = [
  { token: "--text", hex: "#e8e8e3", use: "Primary text — never use pure white." },
  { token: "--text-dim", hex: "#8b8b90", use: "Secondary text, body copy." },
  { token: "--text-faint", hex: "#4a4a52", use: "Labels, metadata, timestamps." },
  { token: "--text-mute", hex: "#2e2e34", use: "Hashes, near-invisible dividers." },
];

const BORDERS = [
  { token: "--border-faint", hex: "#16161a", use: "Ultra-subtle dividers." },
  { token: "--border", hex: "#1f1f23", use: "Default borders for cards and inputs." },
  { token: "--border-strong", hex: "#2a2a30", use: "Hover, focus, emphasis." },
];

const ACCENTS = [
  {
    token: "--lime",
    hex: "#c5fc4d",
    hexNote: "star of the show",
    use: "The only living accent. Use sparingly.",
    swatchStyle: { boxShadow: "inset 0 0 60px rgba(197,252,77,0.3)" },
  },
  { token: "--violet", hex: "#a78bfa", use: "Leadership marker (★) in changelogs." },
  { token: "--green", hex: "#4ade80", use: '"Added" marker (+) in changelogs.' },
  { token: "--orange", hex: "#ff8a4c", use: "Secondary project gradients." },
  { token: "--red", hex: "#f87171", use: "Errors, alerts (rare)." },
];

const SPACES = [
  { token: "--s-1", px: 4 },
  { token: "--s-2", px: 8 },
  { token: "--s-3", px: 12 },
  { token: "--s-4", px: 16 },
  { token: "--s-5", px: 24 },
  { token: "--s-6", px: 32 },
  { token: "--s-7", px: 48 },
  { token: "--s-8", px: 64 },
  { token: "--s-9", px: 96 },
  { token: "--s-10", px: 128 },
  { token: "--s-11", px: 192 },
];

const MOTION_CARDS = [
  {
    title: "Default easing",
    body: "Out-quart-ish. Soft on entry, decisive on exit. Use it almost everywhere.",
    code: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  {
    title: "Reveal on scroll",
    body: "IntersectionObserver triggers fade + translateY 30px → 0.",
    code: "0.7s · ease-out · stagger 100ms",
  },
  {
    title: "Headline word reveal",
    body: "Each word with overflow:hidden, inner translateY 110% → 0. Incremental 100ms delay.",
    code: "1.1s · word-by-word cascade",
  },
  {
    title: "Stat counter",
    body: "Counts from 0 to the real value with cubic-out easing.",
    code: "1.6s · trigger on intersect 0.4",
  },
  {
    title: "Status pulse",
    body: "Box-shadow 0 → 8px → 0, transparent. Infinite loop.",
    code: "2s · ease-in-out · infinite",
  },
  {
    title: "Magnetic buttons",
    body: "Translation proportional to cursor distance. 18% horizontal, 25% vertical.",
    code: "transform: translate(x*0.18, y*0.25)",
  },
  {
    title: "Custom cursor",
    body: "Rigid dot (direct mousemove), ring with 0.18 lerp — natural lag. Mix-blend-difference.",
    code: "lerp 0.18 · ring 32→56px on hover",
  },
  {
    title: "Grid background",
    body: "Full-viewport canvas. Dots grow and glow within a 220px radius of the cursor.",
    code: "requestAnimationFrame · 56px cell",
  },
  {
    title: "Timeline progress",
    body: "Lime bar fills as you scroll through the releases section.",
    code: "scroll-linked · CSS var --scroll-progress",
  },
];

export default function DesignSystemPage() {
  return (
    <main className={`${styles.main} docs-page`}>
      <AnchorNav />

      <header className={styles.docHero}>
        <div className="eyebrow">Brand & Visual System</div>
        <h1>
          The system, <span className="accent">documented</span>.
        </h1>
        <p>
          Everything that defines the look, tone and behavior of the site —
          palette, typography, spacing, anchor components and motion. When in
          doubt, this is the source of truth.
        </p>
        <div className={styles.docHeroMeta}>
          <span>
            <strong>Version</strong> · v2026.01
          </span>
          <span>
            <strong>Released</strong> · Jan 2026
          </span>
          <span>
            <strong>Status</strong> ·{" "}
            <span style={{ color: "var(--lime)" }}>● Living document</span>
          </span>
          <span>
            <strong>Implementation</strong> ·{" "}
            <code style={{ color: "var(--text)" }}>styles.css</code>
          </span>
        </div>
      </header>

      {/* 01 — PALETTE */}
      <section className={styles.docSection} id="palette">
        <div className={styles.docSectionHead}>
          <h2>
            Palette <span className="accent">— core tokens</span>.
          </h2>
          <span className={styles.num}>// 01 — COLORS</span>
        </div>

        <p className={styles.intro}>
          Dark canvas with a single living color. The lime{" "}
          <code className={`${styles.codeInline} ${styles.lime}`}>#c5fc4d</code>{" "}
          is surgical — pills, active dots, italics,{" "}
          <code className={`${styles.codeInline} ${styles.lime}`}>LATEST</code>{" "}
          tags. Pure white{" "}
          <code className={styles.codeInline}>#ffffff</code> is forbidden —
          always{" "}
          <code className={`${styles.codeInline} ${styles.text}`}>
            #e8e8e3
          </code>
          .
        </p>

        <h3 className={styles.subhead}>// surfaces</h3>
        <div className={styles.swatchGrid} style={{ marginBottom: 32 }}>
          {SURFACES.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>

        <h3 className={styles.subhead}>// text</h3>
        <div className={styles.swatchGrid} style={{ marginBottom: 32 }}>
          {TEXTS.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>

        <h3 className={styles.subhead}>// borders</h3>
        <div className={styles.swatchGrid} style={{ marginBottom: 32 }}>
          {BORDERS.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>

        <h3 className={styles.subhead}>// accents</h3>
        <div className={styles.swatchGrid} style={{ marginBottom: 40 }}>
          {ACCENTS.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>

        <h3 className={styles.subhead}>// usage ratio · 70 / 20 / 10</h3>
        <div className={styles.usageBar}>
          <div
            className={styles.usageSeg}
            style={{ background: "#0b0b0c", flex: 70, color: "var(--text-dim)" }}
          >
            70% bg + neutrals
          </div>
          <div
            className={styles.usageSeg}
            style={{ background: "#e8e8e3", flex: 20, color: "var(--bg)" }}
          >
            20% text
          </div>
          <div
            className={styles.usageSeg}
            style={{ background: "#c5fc4d", flex: 10, color: "var(--bg)" }}
          >
            10% lime
          </div>
        </div>
        <div className={styles.usageLegend}>
          <span>
            <span
              className={styles.dot}
              style={{
                background: "#0b0b0c",
                border: "1px solid var(--border-strong)",
              }}
            />
            Surfaces & neutrals
          </span>
          <span>
            <span className={styles.dot} style={{ background: "#e8e8e3" }} />
            Primary text
          </span>
          <span>
            <span className={styles.dot} style={{ background: "#c5fc4d" }} />
            Lime (surgical accent)
          </span>
        </div>
      </section>

      {/* 02 — TYPOGRAPHY */}
      <section className={styles.docSection} id="typography">
        <div className={styles.docSectionHead}>
          <h2>
            Typography <span className="accent">— Geist</span>.
          </h2>
          <span className={styles.num}>// 02 — TYPE</span>
        </div>

        <div className={`${styles.fontCard} ${styles.sans}`}>
          <div>
            <div className={styles.alphabet}>
              Aa Bb Cc 0123
              <br />
              Engineering interfaces
            </div>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Family</span>
            <span className={styles.value}>Geist</span>
            <span className={styles.label}>Use</span>
            <span className={styles.value}>Display, body, navigation</span>
            <span className={styles.label}>Weights loaded</span>
            <span className={styles.value}>300, 400, 500, 600, 700</span>
            <span className={styles.label}>Recommended</span>
            <span className={styles.value}>
              500 for headings · 400 for body
            </span>
            <span className={styles.label}>Tracking</span>
            <span className={styles.value}>
              -0.04em headings · -0.01em body
            </span>
          </div>
        </div>

        <div className={`${styles.fontCard} ${styles.mono}`}>
          <div>
            <div className={styles.alphabet}>
              Aa Bb Cc 0123
              <br />
              // guilherme.json
            </div>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>Family</span>
            <span className={styles.value}>Geist Mono</span>
            <span className={styles.label}>Use</span>
            <span className={styles.value}>
              Eyebrows, labels, chips, tags, hashes, clock
            </span>
            <span className={styles.label}>Weights loaded</span>
            <span className={styles.value}>400, 500, 600</span>
            <span className={styles.label}>Recommended</span>
            <span className={styles.value}>
              400 always · 500 for rare emphasis
            </span>
            <span className={styles.label}>Carries</span>
            <span className={styles.value}>
              ~30% of the technical identity
            </span>
          </div>
        </div>

        <h3 className={styles.subhead} style={{ margin: "56px 0 0" }}>
          // scale
        </h3>

        <div className={styles.typeRow}>
          <div className={styles.typeMeta}>
            <span className={styles.label}>Hero headline</span>display · w500
          </div>
          <div className={`${styles.typeSample} ${styles.display} ${styles.h1}`}>
            Engineering{" "}
            <span
              style={{
                color: "var(--lime)",
                fontWeight: 400,
                fontStyle: "italic",
              }}
            >
              millions
            </span>
            .
          </div>
          <div className={styles.typeSpec}>
            96px · clamp(48–132)
            <br />
            line: 0.95
            <br />
            track: -0.04em
          </div>
        </div>

        <div className={styles.typeRow}>
          <div className={styles.typeMeta}>
            <span className={styles.label}>Section title</span>display · w500
          </div>
          <div className={`${styles.typeSample} ${styles.display} ${styles.h2}`}>
            A craftsman,{" "}
            <span
              style={{
                color: "var(--lime)",
                fontWeight: 400,
                fontStyle: "italic",
              }}
            >
              not a ticket closer
            </span>
            .
          </div>
          <div className={styles.typeSpec}>
            64px · clamp(36–80)
            <br />
            line: 1.0
            <br />
            track: -0.04em
          </div>
        </div>

        <div className={styles.typeRow}>
          <div className={styles.typeMeta}>
            <span className={styles.label}>Subsection</span>display · w500
          </div>
          <div className={`${styles.typeSample} ${styles.display} ${styles.h3}`}>
            Things I've shipped.
          </div>
          <div className={styles.typeSpec}>
            40px
            <br />
            line: 1.05
            <br />
            track: -0.03em
          </div>
        </div>

        <div className={styles.typeRow}>
          <div className={styles.typeMeta}>
            <span className={styles.label}>Tagline / lead</span>sans · w400
          </div>
          <div className={`${styles.typeSample} ${styles.lg}`}>
            Senior full-stack engineer obsessed with the millimeter craft of
            interfaces.
          </div>
          <div className={styles.typeSpec}>
            24px
            <br />
            line: 1.4
            <br />
            track: -0.01em
          </div>
        </div>

        <div className={styles.typeRow}>
          <div className={styles.typeMeta}>
            <span className={styles.label}>Body large</span>sans · w400
          </div>
          <div className={`${styles.typeSample} ${styles.body}`}>
            I believe great software is invisible — until you compare it with
            the alternatives. The interfaces I build aim for that: fast,
            deliberate, accessible.
          </div>
          <div className={styles.typeSpec}>
            18px
            <br />
            line: 1.6
            <br />
            color: text-dim
          </div>
        </div>

        <div className={styles.typeRow}>
          <div className={styles.typeMeta}>
            <span className={styles.label}>Body</span>sans · w400
          </div>
          <div className={`${styles.typeSample} ${styles.sm}`}>
            A simple but effective tool to help Music Directors lead their
            bands and coordinate songs in real time.
          </div>
          <div className={styles.typeSpec}>
            15px
            <br />
            line: 1.5
            <br />
            color: text-dim
          </div>
        </div>

        <div className={styles.typeRow}>
          <div className={styles.typeMeta}>
            <span className={styles.label}>Eyebrow</span>mono · w400
          </div>
          <div
            className={`${styles.typeSample} ${styles.mono} ${styles.eyebrow}`}
          >
            — Career, as a changelog
          </div>
          <div className={styles.typeSpec}>
            12px
            <br />
            line: 1.5
            <br />
            track: 0.02em
          </div>
        </div>

        <div className={styles.typeRow}>
          <div className={styles.typeMeta}>
            <span className={styles.label}>Caps / labels</span>mono · w400
          </div>
          <div className={`${styles.typeSample} ${styles.mono} ${styles.caps}`}>
            // 03 — EXPERIENCE
          </div>
          <div className={styles.typeSpec}>
            10px
            <br />
            letter-spacing: 0.1em
            <br />
            uppercase
          </div>
        </div>
      </section>

      {/* 03 — SPACING */}
      <section className={styles.docSection} id="spacing">
        <div className={styles.docSectionHead}>
          <h2>
            Spacing <span className="accent">— 8pt grid</span>.
          </h2>
          <span className={styles.num}>// 03 — SCALE</span>
        </div>

        <div className={styles.spaceGrid}>
          {SPACES.map((s) => (
            <div className={styles.spaceRow} key={s.token}>
              <div className={styles.spaceToken}>{s.token}</div>
              <div>
                <div
                  className={styles.spaceBar}
                  style={{ width: `${s.px}px` }}
                />
              </div>
              <div className={styles.spacePx}>{s.px}px</div>
            </div>
          ))}
        </div>

        <h3 className={styles.subhead} style={{ margin: "48px 0 16px" }}>
          // border radius
        </h3>
        <div className={styles.radiusRow}>
          <div className={styles.radiusBox} style={{ borderRadius: 4 }}>
            <strong>4px</strong>
            <span>small tags</span>
          </div>
          <div className={styles.radiusBox} style={{ borderRadius: 16 }}>
            <strong>16px</strong>
            <span>cards & panels</span>
          </div>
          <div className={styles.radiusBox} style={{ borderRadius: 999 }}>
            <strong>999px</strong>
            <span>pills & dots</span>
          </div>
        </div>
      </section>

      {/* 04 — COMPONENTS */}
      <section className={styles.docSection} id="components">
        <div className={styles.docSectionHead}>
          <h2>
            Components <span className="accent">— anchors</span>.
          </h2>
          <span className={styles.num}>// 04 — UI</span>
        </div>

        <div className={styles.compShowcase}>
          <div className={styles.compShowcaseHead}>
            <h3>Buttons</h3>
            <span className={styles.tag}>primary · secondary</span>
          </div>
          <div className={styles.compRow}>
            <a href="#" className="btn btn-primary">
              <span>See selected work</span>
              <svg
                className="btn-arrow"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 11L11 3M11 3H4M11 3V10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </a>
            <a href="#" className="btn">
              <span>Let&apos;s talk</span>
            </a>
            <div className="nav-availability">
              <span className="status-dot" />
              <span>Available — Q1&apos;26</span>
            </div>
          </div>
        </div>

        <div className={styles.compShowcase}>
          <div className={styles.compShowcaseHead}>
            <h3>Chips, Tags & Pills</h3>
            <span className={styles.tag}>mono · 11–12px</span>
          </div>
          <div className={styles.compRow}>
            <span className="skill-chip">React 19</span>
            <span className="skill-chip">TypeScript</span>
            <span className="skill-chip">Tailwind</span>
            <span className="stack-chip">Next.js</span>
            <span className="stack-chip">Prisma</span>
            <span className="stack-chip">Stripe</span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                padding: "3px 8px",
                borderRadius: 4,
                background: "rgba(197, 252, 77, 0.1)",
                color: "var(--lime)",
                border: "1px solid rgba(197, 252, 77, 0.2)",
              }}
            >
              v8.0.0
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                padding: "3px 8px",
                borderRadius: 4,
                background: "var(--lime)",
                color: "var(--bg)",
                border: "1px solid var(--lime)",
              }}
            >
              v8.0.0
            </span>
          </div>
        </div>

        <div className={styles.compShowcase}>
          <div className={styles.compShowcaseHead}>
            <h3>Stat</h3>
            <span className={styles.tag}>data display</span>
          </div>
          <div className={styles.compRow} style={{ gap: 32 }}>
            <div className={styles.demoStat} data-num="00">
              <div className={styles.v}>
                1<span className={styles.unit}>M+</span>
              </div>
              <div className={styles.l}>
                users reached across products in production worldwide.
              </div>
            </div>
            <div className={styles.demoStat} data-num="01">
              <div className={styles.v}>
                22<span className={styles.unit}>%</span>
              </div>
              <div className={styles.l}>
                average performance gains delivered through targeted refactors.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.compShowcase}>
          <div className={styles.compShowcaseHead}>
            <h3>Changelog · Diff lines</h3>
            <span className={styles.tag}>anchor component</span>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <div className="diff-line">
              <span className="marker shipped">+</span>
              <span className="text">
                Shipped <strong>customer platform features</strong> end-to-end
              </span>
            </div>
            <div className="diff-line">
              <span className="marker">+</span>
              <span className="text">
                Built and maintained the internal back-office app on{" "}
                <strong>Nuxt + Node</strong>
              </span>
            </div>
            <div className="diff-line">
              <span className="marker led">★</span>
              <span className="text">
                Cross-squad collaboration: customer platform (8 ppl) +
                back-office (3 ppl)
              </span>
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-dim)",
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <span>
              <span style={{ color: "var(--green)" }}>+</span> green · added /
              shipped
            </span>
            <span>
              <span style={{ color: "var(--lime)" }}>+</span> lime · highlight
              ship
            </span>
            <span>
              <span style={{ color: "var(--violet)" }}>★</span> violet ·
              leadership
            </span>
          </div>
        </div>

        <div className={styles.compShowcase}>
          <div className={styles.compShowcaseHead}>
            <h3>Status indicator</h3>
            <span className={styles.tag}>live · pulsing</span>
          </div>
          <div className={styles.compRow} style={{ gap: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-dim)",
              }}
            >
              <span className="status-dot" />
              <span>Available</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-dim)",
              }}
            >
              <span
                className="status-dot"
                style={{
                  background: "var(--orange)",
                  boxShadow: "0 0 0 0 var(--orange)",
                }}
              />
              <span>Limited</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--text-dim)",
              }}
            >
              <span
                className="status-dot"
                style={{
                  background: "var(--text-faint)",
                  animation: "none",
                }}
              />
              <span>Booked</span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — MOTION */}
      <section className={styles.docSection} id="motion">
        <div className={styles.docSectionHead}>
          <h2>
            Motion <span className="accent">— intentional, never decorative</span>
            .
          </h2>
          <span className={styles.num}>// 05 — MOTION</span>
        </div>

        <div className={styles.motionGrid}>
          {MOTION_CARDS.map((m) => (
            <div className={styles.motionCard} key={m.title}>
              <h4>{m.title}</h4>
              <p>{m.body}</p>
              <code>{m.code}</code>
            </div>
          ))}
        </div>
      </section>

      {/* 06 — VOICE */}
      <section className={styles.docSection} id="voice">
        <div className={styles.docSectionHead}>
          <h2>
            Voice <span className="accent">— direct, never arrogant</span>.
          </h2>
          <span className={styles.num}>// 06 — COPY</span>
        </div>

        <div className={styles.voiceGrid}>
          <div className={styles.voiceCard}>
            <div className={`${styles.voiceLabel} ${styles.do}`}>+ DO</div>
            <ul className={styles.voiceList}>
              <li>
                <strong>Show before you tell.</strong> "35M+ users", "27K+ active
                customers" — not "passionate".
              </li>
              <li>
                <strong>Short imperatives in CTAs.</strong> "See selected work" ·
                "Let&apos;s talk" · "Schedule a call".
              </li>
              <li>
                <strong>Code-comment section markers.</strong>{" "}
                <code
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--lime)",
                  }}
                >
                  // 03 — EXPERIENCE
                </code>
              </li>
              <li>
                <strong>Descriptive eyebrows.</strong> "Career, as a changelog" ·
                "The engineer".
              </li>
              <li>
                <strong>Italics for emphasis.</strong> On key words, always lime.
              </li>
            </ul>
          </div>
          <div className={styles.voiceCard}>
            <div className={`${styles.voiceLabel} ${styles.dont}`}>— DON&apos;T</div>
            <ul className={styles.voiceList}>
              <li>
                <span className={styles.strike}>
                  "I&apos;m passionate about clean code"
                </span>{" "}
                — empty buzzword.
              </li>
              <li>
                <span className={styles.strike}>
                  "Innovative solutions for digital transformation"
                </span>{" "}
                — buzzword soup.
              </li>
              <li>
                <span className={styles.strike}>
                  Emojis in headlines or formal sections.
                </span>{" "}
                Fine in meta microcopy.
              </li>
              <li>
                <span className={styles.strike}>
                  Stock photos of "developer typing"
                </span>{" "}
                — placeholders just to fill emptiness.
              </li>
              <li>
                <span className={styles.strike}>
                  "Welcome to my portfolio"
                </span>{" "}
                — don&apos;t ask permission to exist.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 07 — DON'TS */}
      <section className={styles.docSection} id="dont">
        <div className={styles.docSectionHead}>
          <h2>
            Don&apos;ts <span className="accent">— hard rules</span>.
          </h2>
          <span className={styles.num}>// 07 — RULES</span>
        </div>

        <div className={styles.dontList}>
          <div className={styles.dontRow}>
            <span className={styles.x}>✗</span>
            <span>
              <strong>
                Never pure white{" "}
                <code
                  style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
                >
                  #ffffff
                </code>
                .
              </strong>{" "}
              Always use{" "}
              <code
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--text)",
                }}
              >
                --text
              </code>{" "}
              (
              <code style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
                #e8e8e3
              </code>
              ) — pure white feels clinical in a dark theme.
            </span>
          </div>
          <div className={styles.dontRow}>
            <span className={styles.x}>✗</span>
            <span>
              <strong>Lime never as a section background.</strong> Only in
              pills, dots, italics, and ONE primary button per viewport.
            </span>
          </div>
          <div className={styles.dontRow}>
            <span className={styles.x}>✗</span>
            <span>
              <strong>Headings never weight 700.</strong> Always 500. Heavier
              weights kill the elegance.
            </span>
          </div>
          <div className={styles.dontRow}>
            <span className={styles.x}>✗</span>
            <span>
              <strong>No Inter, no Roboto, no system-ui.</strong> Geist is the
              identity — substituting it strips the personality.
            </span>
          </div>
          <div className={styles.dontRow}>
            <span className={styles.x}>✗</span>
            <span>
              <strong>
                No psychedelic gradients in section backgrounds.
              </strong>{" "}
              Gradients only on project cards, two colors max.
            </span>
          </div>
          <div className={styles.dontRow}>
            <span className={styles.x}>✗</span>
            <span>
              <strong>No heavy drop-shadows.</strong> Hierarchy comes from
              borders and subtle bg elevation, not blur.
            </span>
          </div>
          <div className={styles.dontRow}>
            <span className={styles.x}>✗</span>
            <span>
              <strong>No text-align: center on long paragraphs.</strong>{" "}
              Reserve it for mega CTAs (8.0+ rem).
            </span>
          </div>
          <div className={styles.dontRow}>
            <span className={styles.x}>✗</span>
            <span>
              <strong>Container never above 1280px.</strong> Density beats
              sprawl.
            </span>
          </div>
          <div className={styles.dontRow}>
            <span className={styles.x}>✗</span>
            <span>
              <strong>No emojis in hero, headlines or CTAs.</strong> Fine in
              meta microcopy in moderation.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
