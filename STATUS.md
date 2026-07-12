# STATUS — GenAI Learning Hub · "Atlas"

Last updated: 2026-07-12 · **Session 2 in progress** · M1 done, M2 (Tier 0 authoring) started

## Where we are

The app is up. **Dev server: http://localhost:3001** (port 3000 is busy on this machine — this is stable). CRED-style dark design with neon-mint accent, cursor halo (dark + light), star field, tilt cards, hero orbit, Lenis smooth scroll. All 152 chapters navigable; 6 fully written.

**Currently working on: Tier 0 Phase 0.1** (Python craft) in study order.

## Milestone 1 — DONE

- [x] Scaffold Next.js 16 app (Turbopack) + install deps
- [x] MDX pipeline (`next-mdx-remote/rsc` + KaTeX + Shiki + slug anchors, **`blockJS:false` + `useDynamicImport:true` required**)
- [x] Full `curriculum.ts` — 7 tiers, 30 phases, 152 topics
- [x] CRED-style design system (`globals.css` + Manrope / Instrument Serif / JetBrains Mono)
- [x] Landing (`/`) — hero, orbit, marquee, volume cards (tilt), spine, method
- [x] Tier overview (`/tier/[slug]`) — phases + topics per volume
- [x] Topic route (`/learn/[...slug]`) — written vs outline
- [x] Layout shell — Sidebar (per-tier, filter, `data-lenis-prevent`), TopBar, Breadcrumbs, PrevNext
- [x] Pedagogy components — Prerequisites, Motivation, Intuition, Recall, Angles+Angle, Convergence, Derivation+Step, Example, Nuance, RealWorldML, CodeItYourself, MLConnection, Summary, ProblemSet, Quiz, Term, MarkDone, **LifeLesson** (added Session 2)
- [x] RunnableCode: Pyodide + CodeMirror (lazy load, stdout, matplotlib PNG capture, `data-lenis-prevent`)
- [x] Widgets: FunctionPlot, VectorPlayground (draggable), GradientDescentLab (sliders)
- [x] Progress tracking (localStorage) via `ProgressProvider` + `MarkDone`
- [x] Living-page layer: `LivingBackground` (CSS-driven star field), `CursorHalo` (light + dark), `HeroOrbit` (CSS-driven rotation), `TiltCard` (3D perspective), `RevealOnScroll` (Framer Motion), Lenis smooth scroll (`prevent` on scrollable inner elements)

## Milestone 1 exemplars — WRITTEN

- [x] Vol I · Phase 1.1 · **Dot Product & Cosine Similarity** (flagship; includes `<LifeLesson>` on direction vs magnitude)
- [x] Vol 0 · Phase 0.1 · **Comprehensions, Generators & Decorators**
- [x] Vol I · Phase 1.3 · **Gradient Descent — Intuition** (includes `<LifeLesson>` on learning rate as life pacing)

## Milestone 2 (in progress) — Tier 0 Phase 0.1 in study order

- [x] `environment-tooling` — uv, Ruff, pytest, pyproject.toml
- [x] `control-flow-data-model` — truthiness, iterables, match/case, dunder protocols
- [x] `comprehensions-generators-decorators` (already done as exemplar 2)
- [x] `functions-scope-closures` — args styles, LEGB, closures + late-binding trap, type hints
- [x] `classes-protocols-dataclasses` — @dataclass, Protocol, dunders, composition
- [x] `errors-testing-logging` — exception hierarchies, pytest, structured logging
- [x] `concurrency-async` — GIL, threads/processes/asyncio decision tree
- [ ] `cli-io-serialization` — argparse/Click/Typer, pathlib, JSON/YAML/Parquet

Once Phase 0.1 is complete, continue with Phase 0.2 (Scientific Stack) in the same order.

## Remaining M1 polish (do after Tier 0 Phase 0.1)

- [ ] Search index script (`scripts/build-search-index.mjs`) + ⌘K modal
- [ ] Green `npm run build`

## Key files & locations

- `src/curriculum/curriculum.ts` — syllabus tree manifest (edit `status: 'outline' | 'written'` per topic as you author)
- `src/lib/content.ts` — MDX loader (`content/tier-X/phase-X-Y/{slug}.mdx`)
- `src/lib/mdx-components.ts` — MDX component registry
- `src/lib/smooth-scroll.tsx` — Lenis wrapper (tuned `lerp: 0.14`, `prevent` for CodeMirror + Sidebar + `pre` + `[data-lenis-prevent]`)
- `src/components/pedagogy/{static,interactive}.tsx` — 17 pedagogy components (incl. `LifeLesson`)
- `src/components/widgets/FunctionPlot.tsx` — SVG widgets (FunctionPlot, VectorPlayground, GradientDescentLab)
- `src/components/code/RunnableCode.tsx` — Pyodide cell + CodeBlock (accept `code` prop OR `children`)
- `src/components/ambient/` — LivingBackground, CursorHalo, TickCount, HeroOrbit, TiltCard, RevealOnScroll (Framer Motion)
- `content/tier-0/phase-0-1/*.mdx` — 5 chapters written so far
- `content/tier-1/phase-1-1/dot-product-cosine-similarity.mdx` — flagship exemplar
- `content/tier-1/phase-1-3/gradient-descent-intuition.mdx` — gradient descent exemplar

## Known gotchas (write down so future-me doesn't relearn)

- **next-mdx-remote strips JS by default.** Must pass `blockJS: false` + `mdxOptions.useDynamicImport: true` for JSX prop expressions (arrays, template literals, JSX) and top-level `export const` inside MDX to work. Fix lives in `src/app/learn/[...slug]/page.tsx`.
- **Next 16 params are `Promise`.** Always `const { x } = await params;`.
- **Do not spread module namespaces into a plain object** (`...pedagogy` → "trap returned extra keys but proxy target is non-extensible" under RSC). Import each component explicitly.
- **MDX top-level exports** (`export const foo = \`...\`;`) work thanks to `useDynamicImport: true` — good for long code strings.
- **Scroll perf:** backdrop-filter + mix-blend-mode film grain kill fps. Use Lenis + isolated GPU compositor layers (`transform: translateZ`, `will-change`, `contain: strict`). All ambient animation runs on CSS keyframes, not JS rAF (only cursor halo uses rAF and it sleeps when idle).
- **Lenis + inner scrollables:** anything with its own scroll (CodeMirror `.cm-editor`, sidebar, `pre`, `[data-lenis-prevent]`) must be excluded via the `prevent` callback in `smooth-scroll.tsx`.

## Content roadmap (later sessions)

M2: rest of Tier 0 → M3–M5: Tier 1 by phase (math) → M6: T2 (classical ML) → M7: T3 (DL) → M8: T4 (transformers/LLM/RAG/agents) → M9: T5 (production) → M10: T6 (research) + flashcards + polish.

**Authoring workflow every session:**
1. `cd genai-notes && npm run dev` → http://localhost:3001 (or whichever port Next chose).
2. Read this file + PLAN.md (CLAUDE.md auto-loads).
3. Open `src/curriculum/curriculum.ts`, find next topics with `status: 'outline'` in study order.
4. Write MDX at `content/tier-X/phase-X-Y/{slug}.mdx` using the 15-section template (Prerequisites → Motivation → Intuition → Recall → Angles → Convergence → Derivation → Example → Nuance → RealWorldML → CodeItYourself → MLConnection → Summary → ProblemSet → Quiz).
5. **On math chapters, include `<LifeLesson>` before `<MLConnection>`** — connect the technical concept to a life pattern.
6. Flip topic `status` to `'written'` in `curriculum.ts`.
7. Update this STATUS.md.
8. End session with a green `npm run build`.

## How to resume after /clear

1. Read this file + PLAN.md.
2. `cd genai-notes && npm run dev` → visit landing, tier overview, and a written topic to confirm state.
3. Continue with the first unchecked topic in the current phase.
