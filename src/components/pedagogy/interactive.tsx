"use client";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";

/* ————————————————————— CodeItYourself ————————————————————— */

export function CodeItYourself({
  title,
  spec,
  hints = [],
  solution,
}: {
  title: string;
  spec: React.ReactNode;
  hints?: string[];
  solution: React.ReactNode;
}) {
  const [showHint, setShowHint] = useState<number | null>(null);
  const [reveal, setReveal] = useState(false);
  return (
    <section className="not-prose my-14">
      <div className="mb-4 flex items-center gap-3">
        <span className="pill pill-lime">⌂ Code it yourself</span>
        <span className="hr-mono flex-1" />
      </div>
      <div className="rounded-2xl border border-line bg-bg-2 p-7">
        <h3 className="text-[22px] font-bold tracking-tight">{title}</h3>
        <div className="mt-3 text-[15.5px] leading-[1.7] text-ink-2">{spec}</div>

        {hints.length > 0 && (
          <div className="mt-6">
            <div className="label-mono mb-2">Hints</div>
            <div className="flex flex-wrap gap-2">
              {hints.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setShowHint(showHint === i ? null : i)}
                  className={`pill ${showHint === i ? "pill-lime" : ""}`}
                >
                  Hint {i + 1}
                </button>
              ))}
            </div>
            {showHint !== null && (
              <div className="mt-3 rounded-xl border border-line bg-bg p-4 text-[14.5px] leading-relaxed text-ink-2">
                {hints[showHint]}
              </div>
            )}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={() => setReveal((v) => !v)}
            className="cta-ghost !py-2 !px-4 !text-[13px]"
          >
            {reveal ? "Hide solution" : "Reveal full solution"}
          </button>
          {reveal && <div className="mt-4">{solution}</div>}
        </div>
      </div>
    </section>
  );
}

/* ————————————————————— ProblemSet ————————————————————— */

export type Problem = {
  q: React.ReactNode;
  difficulty: "easy" | "medium" | "hard";
  hint?: React.ReactNode;
  answer: React.ReactNode;
};

export function ProblemSet({
  title = "Problem set",
  problems,
}: {
  title?: string;
  problems: Problem[];
}) {
  return (
    <section className="not-prose my-14">
      <div className="mb-4 flex items-center gap-3">
        <span className="pill pill-lime">☰ Practice</span>
        <span className="hr-mono flex-1" />
      </div>
      <h3 className="text-[26px] font-bold tracking-tight">{title}</h3>
      <ol className="mt-6 space-y-4">
        {problems.map((p, i) => (
          <ProblemRow key={i} n={i + 1} p={p} />
        ))}
      </ol>
    </section>
  );
}

function ProblemRow({ n, p }: { n: number; p: Problem }) {
  const [showHint, setShowHint] = useState(false);
  const [reveal, setReveal] = useState(false);
  const difColor: Record<Problem["difficulty"], string> = {
    easy: "oklch(78% 0.16 155)",
    medium: "oklch(82% 0.19 82)",
    hard: "oklch(72% 0.21 30)",
  };
  return (
    <li className="rounded-2xl border border-line bg-bg-2 p-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono rounded-md bg-bg px-2 py-1 text-[10.5px] font-semibold tracking-wider text-ink-2">
          {String(n).padStart(2, "0")}
        </span>
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
          style={{ background: "var(--bg)", color: difColor[p.difficulty] }}
        >
          {p.difficulty}
        </span>
      </div>
      <div className="text-[16px] leading-relaxed text-ink">{p.q}</div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {p.hint && (
          <button
            onClick={() => setShowHint((v) => !v)}
            className="pill !py-[6px] !px-[10px] !text-[10.5px]"
          >
            {showHint ? "Hide hint" : "Hint"}
          </button>
        )}
        <button
          onClick={() => setReveal((v) => !v)}
          className="pill pill-lime !py-[6px] !px-[10px] !text-[10.5px]"
        >
          {reveal ? "Hide solution" : "Reveal solution"}
        </button>
      </div>

      {showHint && p.hint && (
        <div className="mt-3 rounded-xl border border-line bg-bg p-4 text-[14px] leading-relaxed text-ink-2">
          <div className="label-mono mb-1">Hint</div>
          {p.hint}
        </div>
      )}
      {reveal && (
        <div className="mt-3 rounded-xl border border-lime/40 bg-lime-soft p-4 text-[14.5px] leading-relaxed text-ink">
          <div className="label-mono mb-1 !text-lime">Solution</div>
          {p.answer}
        </div>
      )}
    </li>
  );
}

/* ————————————————————— Quiz ————————————————————— */

export type QuizItem = {
  q: React.ReactNode;
  choices: { text: React.ReactNode; correct?: boolean }[];
  explanation?: React.ReactNode;
};

export function Quiz({
  items,
  title = "Quick self-check",
}: {
  items: QuizItem[];
  title?: string;
}) {
  return (
    <section className="not-prose my-14">
      <div className="mb-4 flex items-center gap-3">
        <span className="pill pill-lime">◎ Quiz</span>
        <span className="hr-mono flex-1" />
      </div>
      <h3 className="text-[24px] font-bold tracking-tight">{title}</h3>
      <div className="mt-5 space-y-4">
        {items.map((it, i) => (
          <QuizRow key={i} idx={i} item={it} />
        ))}
      </div>
    </section>
  );
}

function QuizRow({ idx, item }: { idx: number; item: QuizItem }) {
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div className="rounded-2xl border border-line bg-bg-2 p-6">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[10.5px] font-semibold tracking-wider text-ink-3">
          Q{String(idx + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-2 text-[16px] leading-relaxed text-ink">{item.q}</div>
      <div className="mt-4 space-y-2">
        {item.choices.map((c, i) => {
          const state =
            picked === null
              ? "idle"
              : i === picked
              ? c.correct
                ? "correct"
                : "wrong"
              : c.correct
              ? "correct-quiet"
              : "idle";
          const cls =
            state === "correct" || state === "correct-quiet"
              ? "border-lime/60 bg-lime-soft text-ink"
              : state === "wrong"
              ? "border-[oklch(60%_0.19_30)] bg-[oklch(60%_0.19_30/0.14)] text-ink"
              : "border-line hover:border-line-2";
          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className={`w-full rounded-xl border p-3 text-left text-[14.5px] transition ${cls}`}
            >
              <span className="mr-3 inline-block h-4 w-4 shrink-0 rounded-full border border-current align-middle" />
              {c.text}
            </button>
          );
        })}
      </div>
      {picked !== null && item.explanation && (
        <div className="mt-4 rounded-xl border border-line bg-bg p-4 text-[13.5px] leading-relaxed text-ink-2">
          <div className="label-mono mb-1">Why</div>
          {item.explanation}
        </div>
      )}
    </div>
  );
}

/* ————————————————————— Term (inline glossary) ————————————————————— */

export function Term({
  children,
  define,
}: {
  children: React.ReactNode;
  define: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="underline decoration-lime/60 decoration-1 underline-offset-4 hover:decoration-lime"
      >
        {children}
      </button>
      {open && (
        <span
          className="pointer-events-none absolute left-0 top-full z-30 mt-2 w-64 rounded-xl border border-line bg-bg-2 p-3 text-[12.5px] leading-relaxed text-ink-2 shadow-2xl"
          role="tooltip"
        >
          {define}
        </span>
      )}
    </span>
  );
}

/* ————————————————————— MarkDone ————————————————————— */

export function MarkDone({ slug, title }: { slug: string; title: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("gaih-progress-v1");
      if (raw) {
        const s = JSON.parse(raw);
        setDone(!!s.done?.[slug]);
      }
    } catch {}
  }, [slug]);

  const toggle = () => {
    try {
      const raw = localStorage.getItem("gaih-progress-v1");
      const s = raw ? JSON.parse(raw) : { done: {}, lastVisited: null };
      if (s.done[slug]) delete s.done[slug];
      else s.done[slug] = true;
      s.lastVisited = { slug, title, at: Date.now() };
      localStorage.setItem("gaih-progress-v1", JSON.stringify(s));
      setDone(!!s.done[slug]);
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      className={done ? "cta-lime" : "cta-ghost"}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-current">
        {done ? "✓" : ""}
      </span>
      <span>{done ? "Chapter complete" : "Mark as read"}</span>
    </button>
  );
}
