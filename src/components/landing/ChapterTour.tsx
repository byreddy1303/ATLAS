"use client";

// One chapter, dissected. The mock page pins while scroll drives it
// through five mechanisms: derive → recall → run → problems → quiz.
// Scroll maps to a stage index; panel motion itself is CSS transitions.

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { StatusChip } from "@/components/ui/StatusChip";

export type TourMath = { cosDef: string; dotSum: string; result: string };

const STAGES = [
  { glyph: "Σ", name: "derivation", blurb: "plain English beside every math line" },
  { glyph: "↻", name: "recall", blurb: "basics re-taught the moment they reappear" },
  { glyph: "▶", name: "runnable", blurb: "real numpy, running inside the page" },
  { glyph: "▤", name: "problem set", blurb: "easy → hard · hints · full solutions" },
  { glyph: "?", name: "quiz", blurb: "check yourself before the next chapter" },
] as const;

export function ChapterTour({ math }: { math: TourMath }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [stage, setStage] = useState(0);
  const reduced = useReducedMotion();
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStage(Math.max(0, Math.min(STAGES.length - 1, Math.floor(v * STAGES.length))));
  });

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const y = top + ((i + 0.5) / STAGES.length) * span;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y });
  };

  /* static fallback: small screens + reduced motion get a plain stack */
  const panels = [
    <DerivePanel key="d" math={math} />,
    <RecallPanel key="r" />,
    <RunPanel key="x" />,
    <ProblemsPanel key="p" />,
    <QuizPanel key="q" />,
  ];

  if (reduced) {
    return (
      <div className="space-y-6">
        {panels.map((p, i) => (
          <StaticStage key={i} i={i}>
            {p}
          </StaticStage>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* pinned dissection — needs room; lg and up */}
      <div ref={ref} className="relative hidden h-[430vh] lg:block">
        <div className="sticky top-[84px] flex h-[calc(100vh-110px)] max-h-[820px] items-center">
          <div className="grid w-full gap-10 lg:grid-cols-12">
            {/* stage rail */}
            <div className="flex flex-col justify-center gap-1.5 lg:col-span-4">
              {STAGES.map((s, i) => (
                <button
                  key={s.name}
                  className="tour-stage-btn"
                  data-on={stage === i}
                  onClick={() => jumpTo(i)}
                >
                  <span className="glyph font-editorial w-7 text-[26px] leading-none">
                    {s.glyph}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10.5px] uppercase tracking-[0.18em]">
                      {String(i + 1).padStart(2, "0")} · {s.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-snug">
                      {s.blurb}
                    </span>
                  </span>
                </button>
              ))}
              {/* progress spine */}
              <div className="mt-6 flex items-center gap-3 pl-3">
                <div className="relative h-24 w-[3px] overflow-hidden rounded-full bg-line">
                  <motion.div
                    className="absolute inset-x-0 top-0 origin-top rounded-full bg-lime"
                    style={{ scaleY: scrollYProgress, height: "100%" }}
                  />
                </div>
                <span className="label-mono !text-[9px]">
                  scroll drives the page
                </span>
              </div>
            </div>

            {/* the specimen */}
            <div className="lg:col-span-8">
              <div className="instrument relative h-[560px] max-h-[calc(100vh-160px)]">
                <div className="instrument-bar">
                  <div className="flex items-center gap-2.5">
                    <span className="live-dot" />
                    <span className="label-mono !text-[9.5px]">
                      specimen · vol I · ch 03 — pinned for dissection
                    </span>
                  </div>
                  <StatusChip kind="written" size="sm" />
                </div>
                <div className="relative h-[calc(100%-42px)]">
                  {panels.map((p, i) => (
                    <div key={i} className="tour-panel overflow-hidden p-7" data-on={stage === i}>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* stacked fallback below lg */}
      <div className="space-y-6 lg:hidden">
        {panels.map((p, i) => (
          <StaticStage key={i} i={i}>
            {p}
          </StaticStage>
        ))}
      </div>
    </>
  );
}

function StaticStage({ i, children }: { i: number; children: React.ReactNode }) {
  return (
    <div className="instrument">
      <div className="instrument-bar">
        <span className="label-mono !text-[9.5px]">
          {String(i + 1).padStart(2, "0")} · {STAGES[i].name}
        </span>
        <span className="font-editorial text-[20px] leading-none text-lime">
          {STAGES[i].glyph}
        </span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ————————————— the five specimens ————————————— */

function PanelHead({ k, title }: { k: string; title: string }) {
  return (
    <div className="mb-5 flex items-baseline justify-between gap-4">
      <div>
        <div className="label-mono !text-[9px] !text-lime">{k}</div>
        <div className="mt-1 text-[19px] font-bold tracking-tight">{title}</div>
      </div>
    </div>
  );
}

function DerivePanel({ math }: { math: TourMath }) {
  const rows = [
    { html: math.cosDef, note: "read it as: how aligned are these two arrows?" },
    { html: math.dotSum, note: "multiply matching coordinates, add. That's the entire operation." },
    { html: math.result, note: "0.8 of perfectly aligned — same taste, different intensity." },
  ];
  return (
    <div>
      <PanelHead k="Σ derivation, line by line" title="No 'it can be shown'. Ever." />
      <ol className="space-y-3">
        {rows.map((r, i) => (
          <li
            key={i}
            className="grid grid-cols-[30px_1fr_1fr] items-center gap-4 rounded-xl border border-line/60 bg-bg p-4"
          >
            <span className="font-mono text-[11px] font-semibold tracking-wider text-ink-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="katex-host text-[15.5px] text-ink" dangerouslySetInnerHTML={{ __html: r.html }} />
            <span className="text-[13px] leading-relaxed text-ink-2">{r.note}</span>
          </li>
        ))}
      </ol>
      <div className="mt-4 text-[12.5px] italic text-ink-3">
        every symbol defined, every step narrated — the left column is math, the right column is a person explaining it.
      </div>
    </div>
  );
}

function RecallPanel() {
  return (
    <div>
      <PanelHead k="↻ recall, in place" title="The page assumes you forgot." />
      <div className="space-y-2.5">
        <div className="plate-skel w-11/12" />
        <div className="plate-skel w-full" />
        <div className="plate-skel w-4/6" />
      </div>
      <div className="my-4 rounded-xl border-l-2 border-lime bg-lime-soft/40 p-4 pl-5">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="label-mono !text-[10px] !text-lime">↻ Recall</span>
          <span className="text-[13.5px] font-semibold text-ink">Norm ‖a‖</span>
        </div>
        <p className="text-[14px] leading-relaxed text-ink-2">
          The plain length of the arrow: square every coordinate, add them, take the
          square root. For a = (2, 1): ‖a‖ = √(4+1) = √5.
        </p>
      </div>
      <div className="space-y-2.5">
        <div className="plate-skel w-full" />
        <div className="plate-skel w-9/12" />
      </div>
      <div className="mt-5 text-[12.5px] italic text-ink-3">
        ‖a‖ was defined two chapters ago — it gets re-taught here anyway, exactly where
        it's needed. 152 chapters, zero assumed memory.
      </div>
    </div>
  );
}

function RunPanel() {
  return (
    <div>
      <PanelHead k="▶ runnable, in-page" title="The textbook has a Python interpreter." />
      <div className="overflow-hidden rounded-xl border border-line bg-bg">
        <div className="flex items-center justify-between border-b border-line bg-bg-3/70 px-3 py-1.5">
          <span className="label-mono !text-[9px]">python · pyodide</span>
          <span className="rounded-full bg-lime px-2.5 py-0.5 font-mono text-[9.5px] font-bold text-lime-ink">
            ▶ run
          </span>
        </div>
        <pre className="p-3.5 font-mono text-[12px] leading-[1.8] text-ink">
          <span style={{ color: "var(--violet)" }}>import</span> numpy{" "}
          <span style={{ color: "var(--violet)" }}>as</span> np{"\n"}
          movies = np.array([[9, 2, 3, 8], [9, 1, 8, 4], [1, 9, 2, 3]]){"\n"}
          liked = movies[<span style={{ color: "var(--lime)" }}>0</span>]{"  "}
          <span style={{ color: "var(--ink-3)" }}># you liked Arrival</span>{"\n"}
          sims = movies @ liked / (norm(movies, axis=<span style={{ color: "var(--lime)" }}>1</span>) * norm(liked)){"\n"}
          <span style={{ color: "var(--violet)" }}>print</span>(sims.round(<span style={{ color: "var(--lime)" }}>3</span>))
        </pre>
        <div className="border-t border-line bg-bg-2/60 px-3.5 py-2 font-mono text-[12px] text-lime">
          [1.    0.83  0.415]
        </div>
      </div>
      <div className="mt-4 text-[12.5px] italic text-ink-3">
        a real recommender in five lines — edit it, break it, re-run it. First run boots
        Python in your browser; nothing to install.
      </div>
    </div>
  );
}

function ProblemsPanel() {
  const items = [
    { level: "E", c: "var(--lime)", q: "Compute a·b for a = (3, 4), b = (4, 3).", state: "hint" },
    { level: "M", c: "var(--amber)", q: "Show cos θ is unchanged when both vectors are doubled.", state: "hint" },
    { level: "H", c: "var(--rose)", q: "Prove |a·b| ≤ ‖a‖‖b‖ — Cauchy–Schwarz.", state: "solution" },
  ] as const;
  return (
    <div>
      <PanelHead k="▤ graded problem set" title="Application beats re-reading." />
      <ol className="space-y-3">
        {items.map((it, i) => (
          <li key={i} className="rounded-xl border border-line/70 bg-bg p-4">
            <div className="flex items-start gap-3">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-bold"
                style={{ color: it.c, border: `1px solid color-mix(in oklch, ${it.c} 45%, transparent)` }}
              >
                {it.level}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[14px] leading-snug text-ink">{it.q}</div>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="status-chip" data-size="sm">▸ hint</span>
                  <span className={`status-chip ${it.state === "solution" ? "chip-written" : ""}`} data-size="sm">
                    ✓ full solution
                  </span>
                </div>
                {it.state === "solution" && (
                  <div className="mt-2.5 rounded-lg border border-lime/25 bg-lime-soft/30 px-3 py-2 text-[12.5px] leading-relaxed text-ink-2">
                    Start from ‖a − tb‖² ≥ 0 for every t, expand, and pick the t that
                    makes the inequality tightest… <em className="text-ink-3">(full proof, step by step, in the chapter)</em>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function QuizPanel() {
  const opts = [
    { t: "They point exactly the same way", ok: false },
    { t: "They point exactly opposite ways", ok: true },
    { t: "They are perpendicular", ok: false },
    { t: "Nothing — need their lengths too", ok: false },
  ];
  return (
    <div>
      <PanelHead k="? quiz — five questions per chapter" title="Two vectors have cos θ = −1. What do you know?" />
      <div className="space-y-2.5">
        {opts.map((o, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-[14px] ${
              o.ok
                ? "border-lime/45 bg-lime-soft/40 text-ink"
                : "border-line bg-bg text-ink-2"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] ${
                o.ok ? "border-lime text-lime" : "border-line-2 text-ink-3"
              }`}
            >
              {o.ok ? "✓" : String.fromCharCode(97 + i)}
            </span>
            {o.t}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-line bg-bg-2 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-ink-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-lime">why · </span>
        cosine only measures direction — −1 means anti-aligned, whatever the sizes.
        Every answer comes with the reasoning, not just the letter.
      </div>
    </div>
  );
}
