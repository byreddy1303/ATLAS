// Server-safe pedagogy primitives. Interactive kin live in ./interactive.tsx

import * as React from "react";

/* ————————————————————— generic block header ————————————————————— */

function BlockHead({
  n,
  label,
  title,
  color,
}: {
  n: string;
  label: string;
  title?: React.ReactNode;
  color?: string;
}) {
  return (
    <header className="mb-4 flex items-baseline gap-3">
      <span
        className="font-editorial text-[42px] leading-none"
        style={{ color: color ?? "var(--lime)" }}
      >
        {n}
      </span>
      <div>
        <div className="label-mono">§ {label}</div>
        {title ? (
          <h3 className="mt-1 text-[22px] font-bold tracking-tight">
            {title}
          </h3>
        ) : null}
      </div>
    </header>
  );
}

/* ————————————————————— Prerequisites ————————————————————— */

export function Prerequisites({
  children,
  items = [],
}: {
  children?: React.ReactNode;
  items?: { href: string; label: string; blurb?: string }[];
}) {
  return (
    <section className="not-prose my-10">
      <BlockHead n="◔" label="Prerequisites" />
      {items.length ? (
        <ul className="grid gap-3 md:grid-cols-2">
          {items.map((it) => (
            <li key={it.href}>
              <a
                href={it.href}
                className="card block p-4 text-[14px]"
              >
                <div className="font-semibold text-ink">{it.label}</div>
                {it.blurb ? (
                  <div className="mt-1 text-[13px] text-ink-2">{it.blurb}</div>
                ) : null}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-line bg-bg-2 p-5 text-[15px] text-ink-2">
          {children}
        </div>
      )}
    </section>
  );
}

/* ————————————————————— NewConcepts (out-of-curriculum heads-up) ————————————————————— */

export function NewConcepts({
  intro,
  concepts = [],
}: {
  intro?: React.ReactNode;
  concepts?: { name: string; blurb?: string }[];
}) {
  const defaultIntro = (
    <>
      This chapter references ideas that <b>haven&rsquo;t been covered</b> in the
      earlier chapters of this curriculum. Skim them from an external source
      (Wikipedia, a textbook, or a quick search) before continuing — then come
      back and read on.
    </>
  );
  return (
    <section className="not-prose my-10">
      <header className="mb-4 flex items-baseline gap-3">
        <span
          className="font-editorial text-[42px] leading-none"
          style={{ color: "var(--rose)" }}
        >
          ⚑
        </span>
        <div>
          <div className="label-mono" style={{ color: "var(--rose)" }}>
            § New to you
          </div>
          <h3 className="mt-1 text-[20px] font-bold tracking-tight">
            Look these up before continuing
          </h3>
        </div>
      </header>
      <div
        className="relative overflow-hidden rounded-2xl border p-5"
        style={{
          borderColor: "color-mix(in oklch, var(--rose) 40%, transparent)",
          background:
            "color-mix(in oklch, var(--rose) 8%, transparent)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full opacity-30 blur-2xl"
          style={{ background: "var(--rose)" }}
        />
        <div className="relative">
          <div className="mb-4 max-w-[68ch] text-[14.5px] leading-[1.6] text-ink-2">
            {intro ?? defaultIntro}
          </div>
          {concepts.length ? (
            <ul className="grid gap-2.5 md:grid-cols-2">
              {concepts.map((c) => (
                <li
                  key={c.name}
                  className="rounded-xl border border-line bg-bg-2 p-3.5"
                >
                  <div className="text-[14.5px] font-semibold text-ink">
                    {c.name}
                  </div>
                  {c.blurb ? (
                    <div className="mt-1 text-[13px] leading-[1.55] text-ink-2">
                      {c.blurb}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— StudyDepth (drill vs. skim) ————————————————————— */

export function StudyDepth({
  drill = [],
  skim = [],
  intro,
}: {
  drill?: React.ReactNode[];
  skim?: React.ReactNode[];
  intro?: React.ReactNode;
}) {
  return (
    <section className="not-prose my-10">
      <BlockHead
        n="◆"
        label="Study depth"
        title="What to drill vs. what to skim"
      />
      {intro ? (
        <div className="mb-4 max-w-[70ch] text-[15px] leading-[1.7] text-ink-2">
          {intro}
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        {/* DRILL — filled, high-contrast, load-bearing */}
        <div className="relative overflow-hidden rounded-2xl border border-lime/40 bg-lime-soft/50 p-5">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-40 blur-2xl"
            style={{ background: "var(--lime)" }}
          />
          <div className="relative">
            <div className="mb-2 flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-3 w-3 rounded-sm"
                style={{ background: "var(--lime)" }}
              />
              <span className="label-mono !text-lime">▮ Drill</span>
            </div>
            <div className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-ink">
              You&apos;ll write this weekly
            </div>
            <ul className="space-y-2 text-[14.5px] leading-[1.55] text-ink">
              {drill.map((item, i) => (
                <li key={i} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: "var(--lime)" }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SKIM — outlined, muted, reference-only */}
        <div className="rounded-2xl border border-line bg-bg-2 p-5">
          <div className="mb-2 flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-3 w-3 rounded-sm border border-ink-3"
            />
            <span className="label-mono">▯ Skim</span>
          </div>
          <div className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-ink-2">
            Know it exists, look up when it bites
          </div>
          <ul className="space-y-2 text-[14.5px] leading-[1.55] text-ink-2">
            {skim.map((item, i) => (
              <li key={i} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-[7px] inline-block h-1.5 w-1.5 shrink-0 rounded-full border border-ink-3"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— LifeLesson ————————————————————— */

export function LifeLesson({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="not-prose my-12">
      <div className="relative overflow-hidden rounded-2xl border border-lime/30 bg-gradient-to-br from-lime-soft to-transparent p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--lime)" }}
        />
        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                background: "var(--lime)",
                color: "var(--lime-ink)",
              }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 0-4 12.7V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.3A7 7 0 0 0 12 2z" />
                <path d="M9 22h6" />
              </svg>
            </span>
            <div className="label-mono !text-lime">§ life lesson</div>
          </div>
          <h3 className="font-editorial text-[26px] leading-[1.15] tracking-[-0.01em] text-ink">
            {title ?? "The same shape appears outside math too"}
          </h3>
          <div className="prose-editorial mt-4 max-w-[68ch] text-[17px] !leading-[1.7]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— Motivation ————————————————————— */

export function Motivation({
  children,
  title = "Why this concept had to be invented",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <section className="not-prose my-12">
      <BlockHead n="◐" label="Motivation" title={title} />
      <div className="rounded-2xl border border-line bg-bg-2 p-7 text-[16.5px] leading-[1.75] text-ink-2">
        {children}
      </div>
    </section>
  );
}

/* ————————————————————— Intuition ————————————————————— */

export function Intuition({
  children,
  title = "The idea, before formalism",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <section className="not-prose my-12">
      <BlockHead n="◑" label="Intuition" title={title} />
      <div className="card-inset p-7 text-[17px] leading-[1.7] text-ink">
        {children}
      </div>
    </section>
  );
}

/* ————————————————————— Recall (margin-note) ————————————————————— */

export function Recall({
  children,
  term,
}: {
  children: React.ReactNode;
  term: string;
}) {
  return (
    <aside className="not-prose my-6 rounded-xl border-l-2 border-lime bg-lime-soft/40 p-4 pl-5">
      <div className="mb-1 flex items-center gap-2">
        <span className="label-mono !text-lime !text-[10px]">↻ Recall</span>
        <span className="text-[13px] font-semibold text-ink">{term}</span>
      </div>
      <div className="text-[14px] leading-relaxed text-ink-2">{children}</div>
    </aside>
  );
}

/* ————————————————————— Convergence ————————————————————— */

export function Convergence({ children }: { children: React.ReactNode }) {
  return (
    <section className="not-prose my-12">
      <BlockHead n="◒" label="Convergence" title="All angles meet in the middle" />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-2 p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-10 h-48 w-48 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--lime)" }}
        />
        <div className="relative text-[16.5px] leading-[1.7] text-ink-2">
          {children}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— Derivation (stepped ledger) ————————————————————— */

export function Derivation({
  children,
  title = "Derivation, line by line",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <section className="not-prose my-12">
      <BlockHead n="Σ" label="Derivation" title={title} />
      <div className="rounded-2xl border border-line bg-bg-2 p-6">
        <ol className="space-y-3">{children}</ol>
      </div>
    </section>
  );
}

export function Step({
  n,
  math,
  children,
}: {
  n: number | string;
  math?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[36px_1fr_1fr] items-start gap-4 rounded-xl border border-line/60 bg-bg p-4">
      <div className="font-mono text-[12px] font-semibold tracking-wider text-ink-3">
        {typeof n === "number" ? String(n).padStart(2, "0") : n}
      </div>
      <div className="min-w-0 text-[15px] leading-relaxed text-ink">{math}</div>
      <div className="text-[14px] leading-relaxed text-ink-2">{children}</div>
    </li>
  );
}

/* ————————————————————— Example ————————————————————— */

export function Example({
  title = "A concrete example",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="not-prose my-12">
      <BlockHead n="✎" label="Example" title={title} />
      <div className="rounded-2xl border border-line bg-bg-2 p-7 text-[16px] leading-[1.7] text-ink-2">
        {children}
      </div>
    </section>
  );
}

/* ————————————————————— Nuance ————————————————————— */

export function Nuance({
  children,
  title = "Traps, edge cases, misconceptions",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <section className="not-prose my-12">
      <BlockHead n="!" label="Nuance" title={title} color="oklch(78% 0.18 30)" />
      <div className="rounded-2xl border border-line bg-bg-2 p-7">
        <div className="text-[16px] leading-[1.72] text-ink-2">{children}</div>
      </div>
    </section>
  );
}

/* ————————————————————— RealWorldML ————————————————————— */

export function RealWorldML({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="not-prose my-16">
      <div className="mb-6 flex items-center gap-3">
        <span className="pill pill-lime">Real-world · ML</span>
        <span className="hr-mono flex-1" />
      </div>
      <h3 className="text-[28px] font-bold leading-tight tracking-[-0.02em]">
        {title}
      </h3>
      <div className="mt-6 space-y-6 rounded-2xl border border-line bg-bg-2 p-7">
        {children}
      </div>
    </section>
  );
}

/* ————————————————————— MLConnection ————————————————————— */

export function MLConnection({ children }: { children: React.ReactNode }) {
  return (
    <section className="not-prose my-12">
      <BlockHead n="⇢" label="ML Connection" title="Where this reappears" />
      <div className="rounded-2xl border border-line bg-bg-2 p-6 text-[15.5px] leading-[1.7] text-ink-2">
        {children}
      </div>
    </section>
  );
}

/* ————————————————————— Summary ————————————————————— */

export function Summary({
  children,
  bullets = [],
}: {
  children?: React.ReactNode;
  bullets?: string[];
}) {
  return (
    <section className="not-prose my-16">
      <div className="rounded-3xl border border-lime/40 bg-lime-soft p-8">
        <div className="flex items-baseline gap-3">
          <span className="font-editorial text-[38px] leading-none text-lime">TL;DR</span>
          <div className="label-mono !text-lime">Summary</div>
        </div>
        {bullets.length ? (
          <ul className="mt-5 space-y-3">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-[16px] text-ink">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5 text-[16px] leading-[1.7] text-ink">{children}</div>
        )}
      </div>
    </section>
  );
}

/* ————————————————————— Angle (server wrapper) ————————————————————— */
/* Interactive AngleSet lives in ./interactive.tsx. This is the group shell. */

export function Angles({
  children,
  intro,
}: {
  children: React.ReactNode;
  intro?: React.ReactNode;
}) {
  return (
    <section className="not-prose my-12">
      <BlockHead
        n="◈"
        label="Angles"
        title="Same idea, three or four lenses"
      />
      {intro ? (
        <div className="mb-4 text-[16px] leading-[1.7] text-ink-2">{intro}</div>
      ) : null}
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function Angle({
  type,
  title,
  children,
}: {
  type:
    // Math lenses
    | "geometric"
    | "algebraic"
    | "probabilistic"
    | "physical"
    // Universal
    | "computational"
    | "code"
    // Programming lenses
    | "historical"
    | "mental-model"
    | "anatomy"
    | "workflow"
    | "runtime"
    | "contract"
    | "comparative"
    | "pitfall"
    | "performance"
    | "taste"
    | "ecosystem"
    | "production";
  title: string;
  children: React.ReactNode;
}) {
  const badge: Record<string, string> = {
    // Math lenses
    geometric: "△ Geometric",
    algebraic: "Σ Algebraic",
    probabilistic: "⚀ Probabilistic",
    physical: "⌬ Physical",
    // Universal
    computational: "⌘ Computational",
    code: "❯ Code",
    // Programming lenses
    historical: "⏱ Historical",
    "mental-model": "◉ Mental Model",
    anatomy: "⚙ Anatomy",
    workflow: "→ Workflow",
    runtime: "▶ Runtime",
    contract: "⟨⟩ Contract",
    comparative: "⇌ Comparative",
    pitfall: "⚠ Pitfall",
    performance: "⚡ Performance",
    taste: "✦ Taste",
    ecosystem: "✚ Ecosystem",
    production: "⚑ Production",
  };
  return (
    <div className="rounded-2xl border border-line bg-bg-2 p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="pill pill-lime !py-[4px] !px-[10px] !text-[10px]">
          {badge[type]}
        </span>
        <span className="text-[16px] font-semibold text-ink">{title}</span>
      </div>
      <div className="text-[15.5px] leading-[1.72] text-ink-2">{children}</div>
    </div>
  );
}
