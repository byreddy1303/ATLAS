import Link from "next/link";
import { CURRICULUM, tierCounts, totals } from "@/curriculum/curriculum";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  LivingBackground,
  TickCount,
} from "@/components/ambient/LivingBackground";
import { HeroOrbit } from "@/components/ambient/HeroOrbit";
import { TiltCard } from "@/components/ambient/TiltCard";
import {
  Reveal,
  RevealStagger,
  RevealItem,
} from "@/components/ambient/RevealOnScroll";

const T = totals();

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-bg text-ink">
      {/* ————— Ambient background stack ————— */}
      <div className="mesh-bg">
        <div className="mesh-blob mesh-a" />
        <div className="mesh-blob mesh-b" />
        <div className="mesh-blob mesh-c" />
      </div>
      <div className="grid-overlay" />
      <LivingBackground density={72} />

      {/* ————— Nav bar ————— */}
      <header className="nav-bar">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-3">
            <MarkGlyph />
            <div className="leading-tight">
              <div className="text-[15px] font-bold tracking-tight">Atlas</div>
              <div className="label-mono !text-[9.5px]">Living Textbook</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              ["Volumes", "#volumes"],
              ["Spine", "#spine"],
              ["Method", "#method"],
              ["Colophon", "#colophon"],
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
            <span className="pill hidden md:inline-flex">
              <span className="live-dot" />
              <span>Session · live</span>
            </span>
            <ThemeToggle />
            <Link
              href={`/tier/${CURRICULUM[0].slug}`}
              className="cta-lime !py-2.5 !px-4 !text-[12.5px]"
            >
              Begin
              <ArrowGlyph />
            </Link>
          </div>
        </div>
      </header>

      {/* ————— Hero ————— */}
      <section className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-14 pb-20 md:px-10 md:pt-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="chapter-mark mb-8">
                <span className="rule" />
                <span className="no">§ 00 · Frontispiece</span>
                <span className="rule" />
              </div>
            </Reveal>

            <Reveal delay={0.08} y={30}>
              <h1 className="hero-display text-[clamp(3rem,9vw,8.4rem)]">
                from{" "}
                <span className="em">first</span>{" "}
                <span className="em">principle</span>
                <br />
                to first token.
              </h1>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="prose-editorial mt-10 max-w-xl">
                An <em>opinionated</em>, hand-typeset field manual for the road
                from Python to production-grade Generative AI. Written for the
                mind that has seen zero of this before — every concept approached
                from four angles until they land on one truth.
              </p>
            </Reveal>

            <Reveal delay={0.34}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/tier/foundations" className="cta-lime">
                  <span>Open Volume 0</span>
                  <ArrowGlyph />
                </Link>
                <a href="#method" className="cta-ghost">
                  See the method
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-10 flex flex-wrap gap-3">
                <StatChip
                  value={T.tiers}
                  pad={2}
                  l="Volumes"
                />
                <StatChip
                  value={T.phases}
                  pad={2}
                  l="Phases"
                />
                <StatChip value={T.topics} pad={3} l="Chapters" />
                <StatChip value={T.written} pad={3} l="Written" accent />
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center">
            <Reveal delay={0.15} y={40}>
              <HeroOrbit size={520} />
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

      {/* ————— Volumes ————— */}
      <section
        id="volumes"
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10"
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="chapter-mark">
                <span className="no">§ 01 · Volumes</span>
                <span className="rule" />
              </div>
              <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[0.94]">
                seven volumes.
                <br />
                <span className="font-editorial text-lime">one thread.</span>
              </h2>
            </div>
            <p className="prose-editorial max-w-md">
              Read in order — each volume rests on the last. Every one closes with an
              <em> object</em> a stranger could open and see the work.
            </p>
          </div>
        </Reveal>

        <RevealStagger step={0.06} className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
                      <span className="label-mono">
                        {c.written.toString().padStart(2, "0")}/
                        {c.topics.toString().padStart(2, "0")} written
                      </span>
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
      </section>

      {/* ————— Project spine ————— */}
      <section
        id="spine"
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10"
      >
        <div className="grid gap-10 border-t border-line pt-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <div className="chapter-mark">
              <span className="no">§ 02 · Spine</span>
            </div>
            <h2 className="mt-5 text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              the <span className="font-editorial text-lime">object</span>
              <br />
              at every landing.
            </h2>
            <p className="prose-editorial mt-6 max-w-sm">
              Not exercises — <em>objects.</em> One artifact per volume. A stranger
              could open the repo and see the work.
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

      {/* ————— Method ————— */}
      <section
        id="method"
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-24 md:px-10"
      >
        <div className="border-t border-line pt-16">
          <Reveal>
            <div className="chapter-mark">
              <span className="no">§ 03 · Method</span>
            </div>
            <h2 className="mt-5 max-w-4xl text-[clamp(2.4rem,5.2vw,4.2rem)] font-bold leading-[0.94] tracking-[-0.03em]">
              every chapter approached from four sides{" "}
              <span className="font-editorial text-lime">
                until they meet in the middle.
              </span>
            </h2>
          </Reveal>

          <RevealStagger step={0.08} className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
              ["Runnable Python, in-page", "Pyodide runs numpy, pandas, scikit-learn and matplotlib inside your browser. Edit any cell, run it, see the plot."],
              ["Beginner derivations", "Every math step gets a plain-English 'what just happened and why' beside it. Zero 'it can be shown'."],
              ["Graded problem sets", "Easy → medium → hard. Hints. Full solutions revealed on demand. Practice built into the page."],
            ].map(([t, b]) => (
              <RevealItem key={t}>
                <FeatureRow title={t} body={b} />
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
              </div>
              <p className="mt-3 max-w-md text-[14.5px] text-ink-3">
                A field manual for the road from{" "}
                <em className="font-editorial not-italic text-ink">first principle</em>{" "}
                to <em className="font-editorial not-italic text-ink">first token</em>.
                Set in Manrope, Instrument Serif & JetBrains Mono.
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
  pad,
  l,
  accent,
}: {
  value: number;
  pad: number;
  l: string;
  accent?: boolean;
}) {
  return (
    <div className="stat-chip">
      <div className={`n tabular ${accent ? "!text-lime" : ""}`}>
        <TickCount value={value} duration={1400} />
      </div>
      <div className="l">
        {l}
        {pad > 2 && value < 100 ? "" : ""}
      </div>
    </div>
  );
}

function FeatureRow({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-line bg-bg-2 p-6">
      <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-lime-soft text-lime">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12l6 6 10-14" />
        </svg>
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
