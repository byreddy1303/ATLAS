"use client";

// The hero IS the product: a miniature chapter that derives, recalls,
// runs and plots on loop. Scene motion is CSS-driven; JS only flips
// the active scene index (and types one short recall line).

import { useEffect, useRef, useState } from "react";
import { StatusChip } from "@/components/ui/StatusChip";

const SCENE_MS = 4600;

const SCENES = [
  { key: "derive", glyph: "Σ", label: "derive" },
  { key: "recall", glyph: "↻", label: "recall" },
  { key: "run", glyph: "▶", label: "run" },
  { key: "plot", glyph: "∿", label: "plot" },
] as const;

export type HeroMath = {
  /** KaTeX-rendered HTML, server-side via lib/katex */
  cosDef: string;
  dotSum: string;
  result: string;
};

/* — cosine curve path, computed once at module load — */
const PLOT = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 96; i++) {
    const t = (i / 96) * Math.PI * 2;
    const x = 22 + (i / 96) * 276;
    const y = 96 - 62 * Math.cos(t);
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
})();

export function HeroPreview({ math }: { math: HeroMath }) {
  const [stage, setStage] = useState(0);
  const [tick, setTick] = useState(0);
  const [frozen, setFrozen] = useState(false);
  const hover = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFrozen(true);
      return;
    }
    const id = setInterval(() => {
      if (hover.current) return;
      setStage((s) => (s + 1) % SCENES.length);
      setTick((t) => t + 1);
    }, SCENE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-[560px]">
      <div className="product-light" aria-hidden />
      <div className={frozen ? "" : "levitate"}>
        <div
          className="instrument relative z-10 flex flex-col"
          onMouseEnter={() => (hover.current = true)}
          onMouseLeave={() => (hover.current = false)}
          aria-label="Live preview of an Atlas chapter"
        >
          {/* ——— title bar ——— */}
          <div className="instrument-bar">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="live-dot shrink-0" />
              <span className="label-mono truncate !text-[9.5px] !tracking-[0.14em]">
                vol I · ch 03 — dot product &amp; cosine similarity
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <StatusChip kind="flagship" size="sm" />
              <StatusChip kind="runnable" size="sm" />
            </div>
          </div>

          {/* ——— scene stage ——— */}
          <div className="relative h-[360px] sm:h-[380px]">
            {/* 01 · DERIVE */}
            <div className="scene p-6" data-on={stage === 0}>
              <div className="label-mono mb-4 !text-[9px] !text-lime">
                Σ derivation · every symbol earned
              </div>
              <div className="space-y-4">
                <DeriveLine d={0.1} html={math.cosDef} note="similarity is the angle between two arrows — never their size" />
                <DeriveLine d={0.9} html={math.dotSum} note="multiply matching coordinates, then add them up" />
                <DeriveLine d={1.7} html={math.result} note="our two vectors point 80% the same way" />
              </div>
            </div>

            {/* 02 · RECALL */}
            <div className="scene p-6" data-on={stage === 1}>
              <div className="label-mono mb-4 !text-[9px] !text-lime">
                ↻ recall · basics re-taught every time
              </div>
              <div className="rounded-xl border-l-2 border-lime bg-lime-soft/40 p-4 pl-5">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="label-mono !text-[10px] !text-lime">↻ Recall</span>
                  <span className="text-[13px] font-semibold text-ink">Unit vector</span>
                </div>
                <div className="min-h-[66px] text-[14px] leading-relaxed text-ink-2">
                  <TypeText
                    active={stage === 1 && !frozen}
                    frozen={frozen}
                    text="An arrow whose length is exactly 1 — direction with the size stripped away. Divide any vector by its own length and you get one."
                  />
                </div>
              </div>
              <div className="stage-line mt-5 flex items-center gap-2" style={{ "--d": "2.6s" } as React.CSSProperties}>
                <span className="h-px flex-1 bg-line" />
                <span className="label-mono !text-[9px]">seen it before? it re-appears anyway.</span>
                <span className="h-px flex-1 bg-line" />
              </div>
            </div>

            {/* 03 · RUN */}
            <div className="scene flex flex-col p-6" data-on={stage === 2}>
              <div className="label-mono mb-4 !text-[9px] !text-lime">
                ▶ runnable · python in your browser
              </div>
              <div className="overflow-hidden rounded-xl border border-line bg-bg">
                <div className="flex items-center justify-between border-b border-line bg-bg-3/70 px-3 py-1.5">
                  <span className="label-mono !text-[9px]">python · pyodide</span>
                  <span
                    className="stage-line rounded-full bg-lime px-2.5 py-0.5 font-mono text-[9.5px] font-bold text-lime-ink"
                    style={{ "--d": "1.9s" } as React.CSSProperties}
                  >
                    ▶ run
                  </span>
                </div>
                <pre className="p-3.5 font-mono text-[11.5px] leading-[1.75]">
                  <CodeLine d={0.15}><K>import</K> numpy <K>as</K> np</CodeLine>
                  <CodeLine d={0.45}>a = np.array([<N>2.0</N>, <N>1.0</N>])</CodeLine>
                  <CodeLine d={0.75}>b = np.array([<N>1.0</N>, <N>2.0</N>])</CodeLine>
                  <CodeLine d={1.05}>cos = a @ b / (norm(a) * norm(b))</CodeLine>
                  <CodeLine d={1.35}><K>print</K>(<S>f&quot;cos(a, b) = {"{cos:.3f}"}&quot;</S>)</CodeLine>
                </pre>
                <div
                  className="stage-line border-t border-line bg-bg-2/60 px-3.5 py-2 font-mono text-[11.5px] text-lime"
                  style={{ "--d": "2.5s" } as React.CSSProperties}
                >
                  cos(a, b) = 0.800<span className="type-caret" />
                </div>
              </div>
              <div
                className="stage-line mt-4 text-[12px] italic text-ink-3"
                style={{ "--d": "3.1s" } as React.CSSProperties}
              >
                — edit any cell, re-run it, break it, fix it. The page doesn&apos;t mind.
              </div>
            </div>

            {/* 04 · PLOT */}
            <div className="scene p-6" data-on={stage === 3}>
              <div className="label-mono mb-4 !text-[9px] !text-lime">
                ∿ evidence · the picture appears
              </div>
              <svg viewBox="0 0 320 196" className="w-full">
                {/* axes */}
                <path d="M22 96 H 298" stroke="var(--line-2)" strokeWidth="1" />
                <path d="M22 22 V 170" stroke="var(--line-2)" strokeWidth="1" />
                <text x="292" y="110" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--ink-4)">θ</text>
                <text x="153" y="108" fontFamily="var(--font-mono)" fontSize="8.5" fill="var(--ink-4)">π</text>
                {/* cosine curve draws itself */}
                <path
                  d={PLOT}
                  className="draw-path"
                  pathLength={1}
                  fill="none"
                  stroke="var(--lime)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* our pair */}
                <path d="M22 46.4 H 298" stroke="var(--violet)" strokeWidth="1" strokeDasharray="3 5" opacity="0.8" />
                <circle cx="50.6" cy="46.4" r="3.4" fill="var(--violet)" />
                <g className="stage-line" style={{ "--d": "1.6s" } as React.CSSProperties}>
                  <rect x="58" y="34" rx="4" width="104" height="16" fill="var(--bg-3)" stroke="var(--line)" />
                  <text x="66" y="45" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink-2)">
                    our pair → 0.800
                  </text>
                </g>
                {/* mini vector inset */}
                <g className="stage-line" style={{ "--d": "2.2s" } as React.CSSProperties}>
                  <rect x="228" y="118" rx="6" width="70" height="58" fill="var(--bg-2)" stroke="var(--line)" />
                  <path d="M240 168 L 284 146" stroke="var(--lime)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M240 168 L 262 124" stroke="var(--violet)" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M254 161 A 16 16 0 0 0 251 152" fill="none" stroke="var(--ink-3)" strokeWidth="1" />
                  <text x="286" y="144" fontFamily="var(--font-mono)" fontSize="8" fill="var(--lime)">a</text>
                  <text x="262" y="121" fontFamily="var(--font-mono)" fontSize="8" fill="var(--violet)">b</text>
                </g>
              </svg>
            </div>
          </div>

          {/* ——— scene rail ——— */}
          <div className="border-t border-line bg-bg-3/40 px-4 py-3">
            <div className="grid grid-cols-4 gap-3">
              {SCENES.map((s, i) => (
                <button
                  key={s.key}
                  onClick={() => {
                    setStage(i);
                    setTick((t) => t + 1);
                  }}
                  className="group text-left"
                  aria-label={`Show ${s.label} scene`}
                >
                  <div
                    className={`mb-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] transition-colors ${
                      stage === i ? "text-ink" : "text-ink-4 group-hover:text-ink-3"
                    }`}
                  >
                    <span className={stage === i ? "text-lime" : ""}>{s.glyph}</span>{" "}
                    {s.label}
                  </div>
                  <div
                    className="scene-track"
                    data-run={!frozen && stage === i}
                    key={`${i}-${tick}`}
                    style={{ "--scene-ms": `${SCENE_MS}ms` } as React.CSSProperties}
                  >
                    <span style={stage > i || frozen ? { transform: "scaleX(1)", animation: "none" } : undefined} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* engraved caption */}
      <div className="label-mono mt-5 text-center !text-[9.5px]">
        ↑ not a mockup — this is what a chapter does
      </div>
    </div>
  );
}

/* ————— tiny scene atoms ————— */

function DeriveLine({ d, html, note }: { d: number; html: string; note: string }) {
  return (
    <div
      className="stage-line grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl border border-line/70 bg-bg/60 px-4 py-3"
      style={{ "--d": `${d}s` } as React.CSSProperties}
    >
      <span
        className="katex-host text-[15px] text-ink"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <span className="max-w-[190px] text-right text-[11px] leading-snug text-ink-3">
        {note}
      </span>
    </div>
  );
}

function CodeLine({ d, children }: { d: number; children: React.ReactNode }) {
  return (
    <div className="stage-line" style={{ "--d": `${d}s` } as React.CSSProperties}>
      {children}
    </div>
  );
}

function K({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "var(--violet)" }}>{children}</span>;
}
function N({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "var(--lime)" }}>{children}</span>;
}
function S({ children }: { children: React.ReactNode }) {
  return <span style={{ color: "var(--amber)" }}>{children}</span>;
}

/** one interval, alive only while its scene is on stage */
function TypeText({
  text,
  active,
  frozen,
}: {
  text: string;
  active: boolean;
  frozen: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (frozen || !active) {
      setN(frozen ? text.length : 0);
      return;
    }
    setN(0);
    let id = 0;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        setN((v) => {
          if (v >= text.length) {
            window.clearInterval(id);
            return v;
          }
          return v + 2;
        });
      }, 26);
    }, 500);
    return () => {
      window.clearTimeout(start);
      if (id) window.clearInterval(id);
    };
  }, [active, frozen, text]);
  const done = n >= text.length;
  return (
    <span className={done ? "" : "type-caret"}>{text.slice(0, n)}</span>
  );
}
