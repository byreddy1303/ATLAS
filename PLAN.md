# GenAI Learning Hub — Approved Plan (Milestone 1)

> Approved 2026-07-11. This is the master plan. Progress lives in STATUS.md. Do not lose these files — they let any future session resume without re-explaining.

## Context

Build a Next.js app that turns the syllabus PDF (7 tiers, ~30 phases, ~140 topic pages) into a personal, textbook-quality learning site **written for a complete beginner**. Content is authored tier-by-tier across sessions (study order: Tier 0 → 6). Milestone 1 = complete app + full syllabus navigation + pedagogy/widget/runnable-code systems + 3 fully-authored exemplar topics that lock the quality bar.

**User's non-negotiables:**
1. **Design like never before** — distinctive, production-grade aesthetics, not generic AI styling. Cost/effort no object.
2. **Real-world ML project examples** — for ML-critical concepts: scenario intuition → technical intuition → math → **executable code demo** → line-by-line explanation of how the concept powers the example.
3. **Relentless reinforcement of basics** — re-explain fundamentals every time they reappear; never skip steps. Important results get full **derivations explained like to a complete beginner** — every math step paired with plain-English "what just happened and why". No walls of symbols.
4. **Practice built in** — "code it yourself" suggestions where coding aids learning, plus **separate graded problem sections (easy → hard) with hints and full solutions** for math topics.

## Tech Stack

- Next.js (App Router, TypeScript, `src/` dir), Tailwind CSS
- MDX compiled at build/request time via **next-mdx-remote/rsc** reading `content/**.mdx` (bundler-independent, works with Turbopack)
- Math: `remark-math` + `rehype-katex` (KaTeX). Code: `rehype-pretty-code` (Shiki, dual light/dark themes). `rehype-slug` for TOC anchors.
- **Runnable Python in the browser: Pyodide** (WebAssembly) — NumPy, pandas, scikit-learn, matplotlib run client-side. Cells are editable (CodeMirror) + re-runnable. Lazy-loaded on first Run, cached after. PyTorch/LLM examples = static code with real recorded outputs.
- Search: MiniSearch + build-time index script → ⌘K modal
- Progress: React context + localStorage
- All diagrams = custom interactive SVG components (no stock images)

## Design Direction ("like never before")

Use the **frontend-design skill**. Direction: **modern editorial textbook** — a beautifully typeset math book that happens to be alive:
- Typography-first: expressive serif display (Fraunces) for headings, readable serif (Source Serif 4) for prose, clean sans (Inter) for UI chrome, JetBrains Mono for code
- Rich neutral base + **per-tier accent hue** (each tier = its own volume); dark mode first-class
- Every pedagogy component gets a distinct crafted identity: Derivations as stepped ledgers, Angles as tabbed lenses, Recall as margin-note cards
- Micro-interactions: smooth reveals, animated progress ring, satisfying mark-as-done
- Dashboard as a "course atlas": progress across tiers, continue-reading card, project spine

## Project Structure

```
genai roadmap/genai-notes/
├── scripts/build-search-index.mjs
├── content/tier-X/phase-X-Y/<topic>.mdx        # all notes
└── src/
    ├── app/page.tsx                            # dashboard
    ├── app/tier/[tierId]/page.tsx              # tier overview
    ├── app/learn/[...slug]/page.tsx            # topic page (generateStaticParams)
    ├── curriculum/curriculum.ts                # full syllabus tree manifest
    ├── components/layout/                      # Sidebar, TOC, Breadcrumbs, PrevNext, Search, Theme
    ├── components/pedagogy/                    # 15+ components, see template
    ├── components/widgets/                     # interactive visualizations
    ├── components/code/RunnableCode.tsx        # Pyodide cell
    └── lib/                                    # progress, search, pyodide loader
```

## Curriculum Manifest

`curriculum.ts` encodes the entire PDF: Tier → Phase → Topic with slug, title, description, syllabusBullets, priority (★/mandatory/optional), status (written/outline). Drives sidebar, dashboard, prev/next, progress, static params, search. ~140 pages (T0≈16 · T1≈48 · T2≈20 · T3≈14 · T4≈28 · T5≈18 · T6≈8). Unwritten topics still render a planned outline + "not yet written" badge.

## Topic Page Template (the heart)

Authoring rules: assume zero prior knowledge · define every symbol at first use · re-explain basics every time reused (`<Recall>`) · never say "it can be shown" · plain English beside every math step.

Section flow (not every section on every topic):
1. `<Prerequisites>` — linked topics + one-line refreshers
2. `<Motivation>` — the problem that forces this concept to exist
3. `<Intuition>` — core idea in plain language
4. Build-up — from-zero explanation with `<Recall>` cards re-teaching basics inline
5. `<Angle type="geometric|algebraic|computational|probabilistic|physical|code">` — 3–5 perspectives
6. `<Convergence>` — all angles land on the same spot
7. `<Derivation>` — stepped ledger: every line = math + beginner-English what/why
8. `<Example>` — worked by hand, then runnable code cell
9. `<Nuance>` — tricky variations, edge cases, misconceptions (top priority)
10. `<RealWorldML>` — real project scenario with executable Pyodide demo + line-by-line walkthrough
11. `<CodeItYourself>` — mini spec + hints + reveal-able solution
12. `<MLConnection>` — everywhere this shows up in ML/GenAI
13. `<Summary>` — TL;DR card
14. `<ProblemSet>` — easy→medium→hard, hint → full solution reveal
15. `<Quiz>` — quick self-check
Plus: `<Term>` glossary tooltips, path context strip, keyboard prev/next. Flashcards = later milestone.

## Widgets

M1: FunctionPlot (SVG primitive) · VectorPlayground · GradientDescentLab
Later: MatrixTransform · DerivativeExplorer · DistributionExplorer · CLT sampler · BiasVarianceLab · DecisionBoundary · NeuralNetForwardPass · AttentionHeatmap · TokenizerDemo (BPE) · SamplingLab · RAG visualizer

## Milestone 1 Exemplar Topics

1. **Dot Product & Cosine Similarity** (T1·P1.2) — flagship: 4 angles, beginner derivation of cosθ, VectorPlayground, high-dim nuances, RealWorldML movie recommender (live Pyodide), ProblemSet, Quiz
2. **Comprehensions, Generators & Decorators** (T0·P0.1) — code-heavy template, generator memory nuances, CodeItYourself, ML connections
3. **Gradient Descent Intuition** (T1·P1.3) — GradientDescentLab, 3 angles, update-rule derivation, divergence nuances, RealWorldML line-fitting with live plot, ProblemSet

## Milestone 1 Steps

1. Scaffold create-next-app → 2. MDX pipeline → 3. curriculum manifest → 4. frontend-design skill: design system + layout shell → 5. pedagogy components → 6. RunnableCode/Pyodide → 7. routes (dashboard/tier/topic) → 8. progress tracking → 9. widgets → 10. exemplar content → 11. search → 12. verify + `npm run build`

## Verification

- `npm run dev`: all 7 tiers navigable, every slug resolves (written vs outline)
- Exemplars: KaTeX renders, Pyodide cells execute (recommender + GD produce output/plots), widgets interactive, derivations/problems/quizzes/recall all work
- Progress persists across reload; search finds concepts; dark/light polished
- `npm run build` generates all routes cleanly

## Content Roadmap (later sessions)

M2: Tier 0 (~16 pages) → M3–M5: Tier 1 by phase → M6: T2 → M7: T3 → M8: T4 (transformers/LLM/RAG/agents) → M9: T5 → M10: T6 + flashcards + polish. Every session ends with a green `npm run build` and a STATUS.md update.
