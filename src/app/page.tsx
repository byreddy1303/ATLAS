import Link from "next/link";
import "katex/dist/katex.min.css";
import { CURRICULUM, tierCounts, totals } from "@/curriculum/curriculum";
import { tex } from "@/lib/katex";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LivingBackground,
  TickCount,
} from "@/components/ambient/LivingBackground";
import { TiltCard } from "@/components/ambient/TiltCard";
import {
  Reveal,
  RevealStagger,
  RevealItem,
} from "@/components/ambient/RevealOnScroll";
import { HeroPreview } from "@/components/landing/HeroPreview";
import { ChapterTour } from "@/components/landing/ChapterTour";
import { PeekInside } from "@/components/landing/PeekInside";
import { TwoSurfaces } from "@/components/landing/TwoSurfaces";
import { Machinery } from "@/components/landing/Machinery";
import {
  SessionPill,
  StreakBadge,
  ContinueCard,
} from "@/components/landing/SessionSignal";
import { PaletteTrigger } from "@/components/palette/PaletteTrigger";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  IconCompass,
  IconMeridian,
  IconBolt,
  IconGraph,
} from "@/components/icons";

const T = totals();

// KaTeX rendered once on the server; client scenes receive HTML strings.
const MATH = {
  cosDef: tex(
    "\\cos\\theta \\;=\\; \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{\\lVert\\mathbf{a}\\rVert\\,\\lVert\\mathbf{b}\\rVert}",
  ),
  dotSum: tex(
    "\\mathbf{a}\\cdot\\mathbf{b} \\;=\\; \\textstyle\\sum_i a_i b_i \\;=\\; (2)(1) + (1)(2) \\;=\\; 4",
  ),
  result: tex(
    "\\cos\\theta \\;=\\; \\dfrac{4}{\\sqrt{5}\\,\\sqrt{5}} \\;=\\; 0.800",
  ),
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-bg text-ink">
      {/* ————— Ambient background stack ————— */}
      <div className="mesh-bg">
        <div className="mesh-blob mesh-a" />
        <div className="mesh-blob mesh-b" />
        <div className="mesh-blob mesh-c" />
      </div>
      <div className="grid-overlay" />
      <LivingBackground density={72} />

      {/* ————— Nav bar (product state, not marketing links) ————— */}
      <header className="nav-bar">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 md:px-10">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <MarkGlyph />
            <div className="leading-tight">
              <div className="text-[15px] font-bold tracking-tight">Atlas</div>
              <div className="label-mono !text-[9.5px]">Living Textbook</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {[
              ["Tour", "#tour"],
              ["Volumes", "#volumes"],
              ["Machinery", "#machinery"],
              ["Method", "#method"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-full px-4 py-2 text-[13.5px] font-medium text-ink-2 transition hover:bg-bg-2 hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <SessionPill />
            <StreakBadge className="hidden md:inline-flex" />
            <span className="hidden xl:block">
              <PaletteTrigger />
            </span>
            <span className="xl:hidden">
              <PaletteTrigger compact />
            </span>
            <ThemeToggle />
            <Link
              href={`/tier/${CURRICULUM[0].slug}`}
              className="cta-lime hidden !py-2.5 !px-4 !text-[12.5px] sm:inline-flex"
            >
              Begin
              <ArrowGlyph />
            </Link>
          </div>
        </div>
      </header>

      {/* ————— Hero ————— */}
      <section className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-14 pb-16 md:px-10 md:pt-20 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-6">
            <Reveal>
              <div className="chapter-mark mb-8">
                <span className="rule" />
                <span className="no">§ 00 · Frontispiece</span>
                <span className="rule" />
              </div>
            </Reveal>

            <Reveal delay={0.08} y={30}>
              <h1 className="hero-display text-[clamp(2.8rem,7vw,6.6rem)]">
                from <span className="em">first</span>{" "}
                <span className="em">principle</span>
                <br />
                to first token.
              </h1>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="prose-editorial mt-8 max-w-xl">
                An <em>opinionated</em>, hand-typeset field manual for the road
                from Python to production-grade Generative AI. Written for the
                mind that has seen zero of this before — and it&apos;s not a
                promise: the page on the right is a chapter,{" "}
                <em>actually running</em>.
              </p>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href={`/tier/${CURRICULUM[0].slug}`} className="cta-lime">
                  <span>Open Volume 0</span>
                  <ArrowGlyph />
                </Link>
                <a href="#tour" className="cta-ghost">
                  Watch a chapter work ↓
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.46}>
              <div className="mt-9 flex flex-wrap gap-3">
                <StatChip value={T.tiers} l="Volumes" />
                <StatChip value={T.phases} l="Phases" />
                <StatChip value={T.topics} l="Chapters" />
                <StatChip value={T.written} l="Written" accent />
              </div>
            </Reveal>

            <Reveal delay={0.56}>
              <div className="mt-8 max-w-md">
                <ContinueCard />
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-6 lg:flex lg:items-center lg:justify-end">
            <Reveal delay={0.15} y={40} className="w-full max-w-[560px]">
              <HeroPreview math={MATH} />
            </Reveal>
          </div>
        </div>

        {/* live ticker */}
        <Reveal delay={0.6}>
          <div className="mt-16 overflow-hidden border-y border-line py-4">
            <div className="marquee label-mono !text-[11.5px] !text-ink-2">
              {Array.from({ length: 2 }).flatMap((_, i) =>
                [
                  "★  Volume I · Mathematics",
                  "vectors → matrices → calculus → probability → statistics → optimization",
                  "★  Volume IV · Generative AI",
                  "attention · tokenization · RAG · agents",
                  "★  Volume V · Production",
                  "evaluate · deploy · monitor · red-team",
                  "★  first principle → first token",
                ].map((s, j) => (
                  <span key={`${i}-${j}`} className="whitespace-nowrap">
                    {s}
                  </span>
                )),
              )}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ————— Chapter tour (scroll-pinned) ————— */}
      <section
        id="tour"
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10"
      >
        <Reveal>
          <div className="chapter-mark">
            <span className="no">§ 01 · The loop</span>
            <span className="rule" />
          </div>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[0.94] tracking-[-0.03em]">
              every chapter runs
              <br />
              <span className="font-editorial text-lime">the same loop.</span>
            </h2>
            <p className="prose-editorial max-w-md">
              Derive → recall → run → practice → quiz. Keep scrolling — the page
              pins and walks you through one real chapter,{" "}
              <em>dot product &amp; cosine similarity</em>.
            </p>
          </div>
        </Reveal>
        <div className="mt-10">
          <ChapterTour math={MATH} />
        </div>
      </section>

      {/* ————— Peek inside ————— */}
      <section
        id="inside"
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10"
      >
        <div className="border-t border-line pt-14">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="chapter-mark">
                  <span className="no">§ 02 · Plates</span>
                  <span className="rule" />
                </div>
                <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[0.94] tracking-[-0.03em]">
                  open pages,{" "}
                  <span className="font-editorial text-lime">not promises.</span>
                </h2>
              </div>
              <p className="prose-editorial max-w-md">
                Every plate below is a <em>written</em> chapter you can open
                right now — pulled live from the manifest, never hand-curated.
              </p>
            </div>
          </Reveal>
          <div className="mt-10">
            <PeekInside />
          </div>
        </div>
      </section>

      {/* ————— Volumes ————— */}
      <section
        id="volumes"
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10"
      >
        <div className="border-t border-line pt-14">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="chapter-mark">
                  <span className="no">§ 03 · Volumes</span>
                  <span className="rule" />
                </div>
                <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[0.94]">
                  seven volumes.
                  <br />
                  <span className="font-editorial text-lime">one thread.</span>
                </h2>
              </div>
              <p className="prose-editorial max-w-md">
                Read in order — each volume rests on the last. Every one closes
                with an <em>object</em> a stranger could open and see the work.
              </p>
            </div>
          </Reveal>

          <RevealStagger
            step={0.06}
            className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {CURRICULUM.map((tier) => {
              const c = tierCounts(tier);
              return (
                <RevealItem key={tier.id} className={`tier-hue-${tier.id}`}>
                  <TiltCard intensity={5}>
                    <Link
                      href={`/tier/${tier.slug}`}
                      className="card relative block overflow-hidden p-7"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="label-mono">Volume {tier.numeral}</div>
                          <h3 className="mt-4 text-[26px] font-bold leading-[1.02] tracking-[-0.02em]">
                            {tier.title}
                          </h3>
                          <div className="font-editorial mt-1 text-[19px] leading-tight text-ink-2">
                            {tier.subtitle}
                          </div>
                        </div>
                        <div className="plate flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl">
                          <span className="plate-numeral text-[54px]">
                            {tier.numeral}
                          </span>
                        </div>
                      </div>

                      <p className="prose-editorial mt-6 text-[15.5px] !leading-[1.65]">
                        {tier.landing}
                      </p>

                      <footer className="mt-8 flex items-center justify-between border-t border-line pt-4 text-[12.5px]">
                        <div className="flex items-center gap-4">
                          <span className="tabular font-mono text-ink-2">
                            {c.phases} <span className="text-ink-3">phases</span>
                          </span>
                          <span className="tabular font-mono text-ink-2">
                            {c.topics} <span className="text-ink-3">chapters</span>
                          </span>
                        </div>
                        <span className="label-mono">{tier.duration}</span>
                      </footer>

                      <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full bg-accent transition-all duration-700"
                          style={{ width: `${(c.written / c.topics) * 100}%` }}
                        />
                      </div>

                      <div className="mt-5 flex items-center justify-between">
                        {c.written > 0 ? (
                          <StatusChip
                            kind="live"
                            label={`${c.written
                              .toString()
                              .padStart(2, "0")}/${c.topics
                              .toString()
                              .padStart(2, "0")} inked`}
                            size="sm"
                          />
                        ) : (
                          <StatusChip kind="outline" label="outlined" size="sm" />
                        )}
                        <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-ink-2">
                          Enter <ArrowGlyph />
                        </span>
                      </div>
                    </Link>
                  </TiltCard>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* ————— Project spine ————— */}
      <section
        id="spine"
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10"
      >
        <div className="grid gap-10 border-t border-line pt-14 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <div className="chapter-mark">
              <span className="no">§ 04 · Spine</span>
            </div>
            <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              the <span className="font-editorial text-lime">object</span>
              <br />
              at every landing.
            </h2>
            <p className="prose-editorial mt-6 max-w-sm">
              Not exercises — <em>objects.</em> One artifact per volume. A
              stranger could open the repo and see the work.
            </p>
          </Reveal>

          <ol className="md:col-span-8">
            {CURRICULUM.map((tier, i) => {
              const projectTopic = tier.phases
                .flatMap((p) => p.topics)
                .find((t) => t.slug.startsWith("project-"));
              const label =
                projectTopic?.title.replace(/^Project · /, "") ??
                "In-volume artifact";
              return (
                <Reveal
                  key={tier.id}
                  delay={0.06 * i}
                  className={`tier-hue-${tier.id}`}
                >
                  <li className="group flex items-center gap-8 border-b border-line py-6 last:border-b-0">
                    <span className="font-editorial w-14 flex-shrink-0 text-[38px] leading-none text-lime opacity-70 transition-opacity group-hover:opacity-100">
                      {tier.numeral}
                    </span>
                    <div className="flex-1">
                      <div className="label-mono !text-[10px]">
                        Vol. {tier.numeral} — {tier.title}
                      </div>
                      <div className="mt-1 text-[18px] leading-snug text-ink">
                        {label}
                      </div>
                    </div>
                    <Link
                      href={`/tier/${tier.slug}`}
                      className="pill opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      Open ↗
                    </Link>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ————— Two surfaces ————— */}
      <section
        id="surfaces"
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10"
      >
        <div className="border-t border-line pt-14">
          <Reveal>
            <div className="chapter-mark">
              <span className="no">§ 05 · Surfaces</span>
              <span className="rule" />
            </div>
            <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[0.94] tracking-[-0.03em]">
              read it.{" "}
              <span
                className="font-editorial"
                style={{ color: "var(--violet)" }}
              >
                then work it.
              </span>
            </h2>
          </Reveal>
          <div className="mt-10">
            <TwoSurfaces />
          </div>
        </div>
      </section>

      {/* ————— Machinery (real components + live python) ————— */}
      <section
        id="machinery"
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10"
      >
        <div className="border-t border-line pt-14">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="chapter-mark">
                  <span className="no">§ 06 · Machinery</span>
                  <span className="rule" />
                </div>
                <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[0.94] tracking-[-0.03em]">
                  the machinery,{" "}
                  <span className="font-editorial text-lime">live.</span>
                </h2>
              </div>
              <p className="prose-editorial max-w-md">
                Not screenshots. These are the <em>actual</em> components
                chapters are written with — and the Python cell on the right
                really executes, in your browser.
              </p>
            </div>
          </Reveal>
          <div className="mt-12">
            <Machinery />
          </div>
        </div>
      </section>

      {/* ————— Method ————— */}
      <section
        id="method"
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-20 md:px-10"
      >
        <div className="border-t border-line pt-14">
          <Reveal>
            <div className="chapter-mark">
              <span className="no">§ 07 · Method</span>
            </div>
            <h2 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.2vw,4.2rem)] font-bold leading-[0.94] tracking-[-0.03em]">
              every chapter approached from four sides{" "}
              <span className="font-editorial text-lime">
                until they meet in the middle.
              </span>
            </h2>
          </Reveal>

          <RevealStagger
            step={0.08}
            className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {[
              ["01", "Motivation", "The problem that forces this concept into existence. What breaks without it."],
              ["02", "Intuition", "The core idea in plain language, before any formalism. What a child would recognise."],
              ["03", "Angles", "Geometric, algebraic, computational, probabilistic. Three to five lenses per concept."],
              ["04", "Convergence", "All angles land on the same quiet truth — then a real project brings it alive."],
            ].map(([num, title, body]) => (
              <RevealItem key={num}>
                <div className="card-inset p-8">
                  <div className="method-num">{num}</div>
                  <h3 className="mt-6 text-[22px] font-bold tracking-tight">
                    {title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                    {body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          <RevealStagger step={0.08} className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <IconBolt size={17} />,
                t: "Runnable Python, in-page",
                b: "Pyodide runs numpy, pandas, scikit-learn and matplotlib inside your browser. Edit any cell, run it, see the plot.",
              },
              {
                icon: <IconMeridian size={17} />,
                t: "Beginner derivations",
                b: "Every math step gets a plain-English 'what just happened and why' beside it. Zero 'it can be shown'.",
              },
              {
                icon: <IconGraph size={17} />,
                t: "Graded problem sets",
                b: "Easy → medium → hard. Hints. Full solutions revealed on demand. Practice built into the page.",
              },
            ].map(({ icon, t, b }) => (
              <RevealItem key={t}>
                <FeatureRow icon={icon} title={t} body={b} />
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ————— Colophon ————— */}
      <footer
        id="colophon"
        className="relative z-10 mx-auto mt-10 w-full max-w-[1400px] border-t border-line px-6 py-14 md:px-10"
      >
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <MarkGlyph />
                <div className="text-[20px] font-bold tracking-tight">Atlas</div>
                <span className="text-ink-3">
                  <IconCompass size={18} />
                </span>
              </div>
              <p className="mt-3 max-w-md text-[14.5px] text-ink-3">
                A field manual for the road from{" "}
                <em className="font-editorial not-italic text-ink">
                  first principle
                </em>{" "}
                to{" "}
                <em className="font-editorial not-italic text-ink">
                  first token
                </em>
                . Set in Manrope, Instrument Serif &amp; JetBrains Mono.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 text-[12.5px] text-ink-3">
              <span className="label-mono">MMXXVI · First Edition</span>
              <span className="italic">
                &ldquo;application beats re-reading.&rdquo;
              </span>
            </div>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}

// ————— tiny presentational atoms —————

function StatChip({
  value,
  l,
  accent,
}: {
  value: number;
  l: string;
  accent?: boolean;
}) {
  return (
    <div className="stat-chip">
      <div className={`n tabular ${accent ? "!text-lime" : ""}`}>
        <TickCount value={value} duration={1400} />
      </div>
      <div className="l">{l}</div>
    </div>
  );
}

function FeatureRow({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-bg-2 p-6">
      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-lime-soft text-lime">
        {icon}
      </div>
      <div className="text-[16px] font-semibold">{title}</div>
      <div className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{body}</div>
    </div>
  );
}

function ArrowGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 10h12" />
      <path d="M11 5l5 5-5 5" />
    </svg>
  );
}

function MarkGlyph() {
  return (
    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-lime shadow-[0_0_24px_-6px_var(--lime)]">
      <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none">
        <path d="M8 24 L16 6 L24 24" stroke="var(--lime-ink)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11 18 L21 18" stroke="var(--lime-ink)" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
