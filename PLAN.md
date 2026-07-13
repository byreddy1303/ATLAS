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
5. `<Angle type="...">` — 4–6 perspectives. **The type is a lens, not decoration** — it names the *kind of understanding* the angle produces, and the chip is visible to the reader. Use math lenses for math topics (`geometric | algebraic | probabilistic | physical`) and programming lenses for programming topics (`historical | mental-model | anatomy | workflow | runtime | contract | comparative | pitfall | performance | taste | ecosystem | production`). `computational` and `code` are the two universal types that work for both. See "Angle-lens taxonomy" below.
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

## Angle-lens taxonomy (governs every `<Angle type=...>` chip)

The `Angle` chip is visible to the reader. Its label tells them *what kind of understanding* the angle produces. Picking a math lens ("Σ Algebraic") for a Python concept ("LEGB scope resolution") reads as noise. Rule: **the lens must match the topic's shape.**

### Universal (work for math OR programming)

- **`code`** ❯ Code — the runnable code angle; syntax you'd type
- **`computational`** ⌘ Computational — algorithm, complexity, or the mechanism that makes it run

### Math lenses (use for Tier 1+ math topics)

- **`geometric`** △ Geometric — the picture, the arrows, the shape in space
- **`algebraic`** Σ Algebraic — the symbolic identity, the closed-form
- **`probabilistic`** ⚀ Probabilistic — random variables, distributions, expectation
- **`physical`** ⌬ Physical — where the same object shows up in physics/engineering

### Programming lenses (use for Tier 0 Python + later systems topics)

- **`historical`** ⏱ Historical — how did we get here? What did this replace?
- **`mental-model`** ◉ Mental Model — the metaphor to hold in your head
- **`anatomy`** ⚙ Anatomy — what's actually inside; the structure on disk / in memory
- **`workflow`** → Workflow — how you use it day-to-day; the muscle-memory commands
- **`runtime`** ▶ Runtime — what the interpreter/OS actually does at execution
- **`contract`** ⟨⟩ Contract — the interface, the typing, the promises
- **`comparative`** ⇌ Comparative — this vs alternatives (past tools, other languages)
- **`pitfall`** ⚠ Pitfall — the trap; the classic bug; the anti-pattern
- **`performance`** ⚡ Performance — cost, memory, throughput, when it matters
- **`taste`** ✦ Taste — when to reach for this; when not to; the design choice
- **`ecosystem`** ✚ Ecosystem — how this composes with the rest of the language/tools
- **`production`** ⚑ Production — the ship-it pattern you'll write again and again

### Per-chapter angle map (Phase 0.1 + gradient descent)

For each written chapter, the primary angles that would actually illuminate the topic — **the lenses a beginner needs to see it whole**. This is the reference for rewrites.

#### T0 · P0.1 · `environment-tooling`
1. **historical** — pip → virtualenv → conda → poetry → uv. Why each existed. Why uv consolidates.
2. **workflow** — the seven-command daily ritual (init, add, run, sync, format, check, commit).
3. **anatomy** — what's inside `.venv/`, `pyproject.toml`, `uv.lock`. Physical file layout.
4. **contract** — `pyproject.toml` as the single source of truth; the identity of a Python project.
5. **production** — reproducibility: two files, one `uv sync`, byte-identical envs on every machine.

#### T0 · P0.1 · `control-flow-data-model`
1. **mental-model** — everything is an object; behavior is negotiated through protocols.
2. **taste** — truthiness and "empty is false"; `if not xs` beats `if len(xs)==0`.
3. **workflow** — the idiomatic iteration vocabulary (`for x in xs`, `enumerate`, `zip`, `dict.items`).
4. **runtime** — how `match/case` destructures at execution (not switch).
5. **pitfall** — `is` vs `==`; identity vs equality; small-int caching.
6. **contract** — hashability: `__eq__` and `__hash__` must agree.

#### T0 · P0.1 · `comprehensions-generators-decorators`
1. **taste** — comprehensions as loops-as-expressions; when they aid readability, when they hurt.
2. **code** — the syntax vocabulary (list/dict/set/generator comprehensions, filter clauses).
3. **performance** — the generator memory-profile story; 10M items in 100 bytes.
4. **ecosystem** — generator pipelines (pull-based dataflow, the DataLoader shape).
5. **runtime** — what `@decorator` above `def` actually compiles to.
6. **runtime** — decorator factories: `@retry(3)` is `f = retry(3)(f)`.

#### T0 · P0.1 · `functions-scope-closures`
1. **mental-model** — functions are first-class values; you can assign, pass, store, return them.
2. **code** — the five argument styles (positional, default, *args, keyword-only, **kwargs).
3. **runtime** — LEGB name resolution: how Python actually finds `x`.
4. **anatomy** — closures capture *cells*, not values; inspect `fn.__closure__`.
5. **pitfall** — the late-binding trap and its three fixes.
6. **contract** — type hints as documentation the tools read.

#### T0 · P0.1 · `classes-protocols-dataclasses`
1. **historical** — old OOP (deep inheritance trees) → modern minimalism (dataclass + Protocol + composition).
2. **code** — `@dataclass(frozen=True, slots=True)` gives you `__init__`, `__repr__`, `__eq__`, `__hash__` for free.
3. **pitfall** — `field(default_factory=list)` vs mutable class-level defaults.
4. **contract** — `Protocol` as structural typing; anything shaped-right satisfies.
5. **runtime** — dunder methods as the hooks Python's built-ins call through.
6. **taste** — composition over inheritance; `has-a` beats `is-a` for readability + testability.

#### T0 · P0.1 · `errors-testing-logging`
1. **mental-model** — three roles: exceptions communicate, tests document, logs narrate.
2. **taste** — custom exception hierarchies; specific types unlock precise `except`.
3. **runtime** — `raise X from Y` chains the cause into the traceback.
4. **workflow** — pytest: `test_*` functions, `parametrize`, `pytest.raises`, fixtures.
5. **comparative** — EAFP vs LBYL — the Python happy-path preference.
6. **production** — structured JSON logging with levels; retry-with-backoff decorator.

#### T0 · P0.1 · `concurrency-async`
1. **mental-model** — one decision: I/O-bound vs CPU-bound; the tool follows.
2. **runtime** — the GIL, honestly; why threads help for I/O but not CPU.
3. **runtime** — what `await` actually does inside the event loop.
4. **comparative** — threads vs processes vs asyncio; when each wins.
5. **production** — semaphore + gather + timeout + retry (the LLM/RAG pattern).
6. **pitfall** — one sync blocking call freezes the whole event loop.

#### T0 · P0.1 · `cli-io-serialization`
1. **mental-model** — four boundaries: args, paths, formats, streams.
2. **taste** — pathlib over strings; Path is the modern default.
3. **workflow** — argparse for scripts you own; the `type=int` / `--dry-run` habits.
4. **comparative** — argparse vs Typer vs Click; the CLI-parser choice.
5. **comparative** — format trade-off table (JSON / YAML / TOML / CSV / Parquet / safetensors).
6. **performance** — streaming vs materializing; how the file iterator saves you.
7. **production** — atomic writes; `encoding="utf-8"` discipline; two-file reproducibility for datasets.

#### T1 · P1.3 · `gradient-descent-intuition` (math — keep math lenses)
1. **geometric** — the mountain-in-fog picture; follow the negative gradient.
2. **algebraic** — `θ ← θ − η ∇f(θ)`; two lines of code, forever.
3. **computational** — every smooth function looks linear up close (Taylor).
4. **code** — vanilla GD from scratch; runnable trace.
5. **physical** — learning rate as the one knob that owns everything.

Math lenses are correct here; do not "programming-ize" this chapter.

### What this means for the recently-rewritten chapters

Every Phase 0.1 chapter currently uses math lenses (`algebraic`, `physical`, `probabilistic`) as visual variety. **This must be fixed** — the reader's chip is misleading. Extend the `Angle` component with the programming-lens types above and update each Python chapter's `<Angle type=...>` per the map above.

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
