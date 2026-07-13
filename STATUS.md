# STATUS — GenAI Learning Hub · "Atlas"

Last updated: 2026-07-13 · **Session 5** · landing-page rework: implemented the full 12-item "product, not brochure" punch list (live hero preview, scroll-pinned chapter tour, ⌘K palette + search index, live session signals, peek-inside plates, status-chip system, custom icon set, landing Pyodide cell, two surfaces, machinery showcase, product-state nav) · content authoring resumes with Phase 0.2 next session

## Where we are

The app is up. **Dev server: http://localhost:3001** (port 3000 is busy on this machine — this is stable). CRED-style dark design with neon-mint accent, cursor halo (dark + light), star field, tilt cards, Lenis smooth scroll. All 152 chapters navigable; 10 fully written. The landing page now *demonstrates* the product: the hero is a self-running miniature chapter, a real Pyodide cell executes on the page, and every claim is backed by live manifest data.

**Currently working on: Tier 0 Phase 0.2** (Scientific Stack) — Phase 0.1 fully written (8/8).

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
- [x] RunnableCode: Pyodide + CodeMirror (lazy load, stdout, matplotlib PNG capture)
- [x] Widgets: FunctionPlot, VectorPlayground (draggable), GradientDescentLab (sliders)
- [x] Progress tracking (localStorage) via `ProgressProvider` + `MarkDone`
- [x] Living-page layer: `LivingBackground` (CSS-driven star field), `CursorHalo` (light + dark), `HeroOrbit` (CSS-driven rotation), `TiltCard` (3D perspective), `RevealOnScroll` (Framer Motion), Lenis smooth scroll (`prevent` on scrollable inner elements)

## Milestone 1 exemplars — WRITTEN

- [x] Vol I · Phase 1.1 · **Dot Product & Cosine Similarity** (flagship; includes `<LifeLesson>` on direction vs magnitude)
- [x] Vol 0 · Phase 0.1 · **Comprehensions, Generators & Decorators**
- [x] Vol I · Phase 1.3 · **Gradient Descent — Intuition** (includes `<LifeLesson>` on learning rate as life pacing)

## Milestone 2 — Tier 0 Phase 0.1 **all 8 rewritten to flagship depth**

Session 3 rewrote every Phase 0.1 chapter (and the Tier 1 gradient-descent chapter) to match the dot-product/cosine-similarity flagship: story-driven Motivation, multiple Recall cards, 5-6 Angles from different lenses, Convergence, Derivation with plain-English on every step, multiple worked Examples, deep Nuance, RealWorldML with line-by-line walkthroughs, LifeLesson, MLConnection, ProblemSet (easy → medium → hard with proofs), 5-question Quiz. Chapter sizes went from ~180-250 lines to ~500-700+ lines.

- [x] `environment-tooling` — uv, Ruff, pytest, pyproject.toml (flagship-depth rewrite)
- [x] `control-flow-data-model` — protocols, iteration, dunders, match/case (flagship-depth rewrite)
- [x] `comprehensions-generators-decorators` — three moves, generator pipelines, decorators-with-args (flagship-depth rewrite)
- [x] `functions-scope-closures` — first-class, LEGB, closures + late-binding, type hints (flagship-depth rewrite)
- [x] `classes-protocols-dataclasses` — @dataclass, Protocol, dunders, composition (flagship-depth rewrite)
- [x] `errors-testing-logging` — exception hierarchies, pytest, structured logging, retry pattern (flagship-depth rewrite)
- [x] `concurrency-async` — GIL, decision tree, asyncio patterns, RAG pipeline (flagship-depth rewrite)
- [x] `cli-io-serialization` — pathlib, argparse, JSON/TOML/Parquet, streaming, atomic write (flagship-depth rewrite)

**Programming-lens relabel (Session 3, follow-up):** All 8 Phase 0.1 chapters now use the correct programming lenses (`historical`, `mental-model`, `anatomy`, `workflow`, `runtime`, `contract`, `comparative`, `pitfall`, `performance`, `taste`, `ecosystem`, `production`) per PLAN.md's per-chapter angle map. No more math lenses (algebraic, physical, probabilistic, computational-as-visual-variety) on Python topics. `npm run build`: green (159 pages).

**Study-depth badges (Session 3, follow-up):** Added new `<StudyDepth drill={[...]} skim={[...]} />` pedagogy component (`src/components/pedagogy/static.tsx`, registered in `mdx-components.ts`) and inserted a block at the top of every Phase 0.1 chapter, just above `<Motivation>`. Drill = daily-use reflexes for GenAI work (async patterns, decorators, dataclasses, type hints, pathlib, streaming, retry patterns); Skim = reference material (LEGB internals, GIL semantics, cell mechanics, full dunder catalog, etc.). Distinctive two-lane design: filled lime column for Drill, outlined muted column for Skim. `npm run build`: green (159 pages).

Also rewrote **Tier 1 Phase 1.3 · gradient-descent-intuition** to flagship depth (5 angles, full derivation, 3 RealWorldML demos: line-fit, mini-batch, momentum).

**Phase 0.1 complete (8/8) at flagship depth.** Phase 0.2 (Scientific Stack) in progress:

- [x] `numpy-arrays-vectorization` — ndarray, dtypes, ufuncs, vectorization vs loops (flagship depth; 5 programming-lens angles: mental-model, anatomy, runtime, performance, taste, production; StudyDepth, LifeLesson, 9-problem ProblemSet, 5-Q Quiz)
- [x] `numpy-broadcasting-slicing` — broadcasting rules, view vs copy, einsum (732-line flagship-depth chapter; written in an earlier session but left uncommitted/unlogged — found + committed in Session 5, build green)
- [ ] `pandas-dataframe-fundamentals` — Series/DataFrame, loc vs iloc, dtypes
- [ ] `pandas-groupby-merges` — split-apply-combine, merges, pivots, rolling
- [ ] (see curriculum.ts for the full Phase 0.2 list — matplotlib, EDA, scikit-learn intro)

**Scroll bug — Quiz-area (Session 4):** Around Quiz/ProblemSet sections, user reported the scroll pull-back still occurred after the code-block fix. Likely cause: Quiz answer reveals expand the section, triggering Lenis's `autoResize` to re-measure the document mid-scroll. Applied: (a) `contain: layout paint` on `<ProblemSet>` and `<Quiz>` wrappers in `src/components/pedagogy/interactive.tsx` to isolate their layout impact; (b) narrowed the Quiz button `transition` → `transition-colors duration-150` so it doesn't repaint all properties during scroll.

## Remaining M1 polish — DONE (Session 5)

- [x] Search index + ⌘K modal — **implemented as a `force-static` route handler, NOT the planned .mjs script.** `src/app/search-index.json/route.ts` imports `curriculum.ts` + written MDX directly at build time (152 chapter docs + section docs from `##`/`###` headings of written chapters). No manual step, can't drift. CLAUDE.md updated accordingly.
- [x] Green `npm run build` (160 pages: 159 + search-index.json)

## Session 5 — landing rework ("product, not brochure" punch list, all 12 items)

Motivated by a comparison against Google Antigravity's landing: ours *described* the product, theirs *is* the product. Everything below ships on `/`:

1. **HeroPreview** (`src/components/landing/HeroPreview.tsx`) — replaced decorative `HeroOrbit` with a framed instrument window that loops a real chapter's life: Σ derive (KaTeX) → ↻ recall (typed text) → ▶ run (tinted code) → ∿ plot (SVG stroke-draw cosine curve). CSS-driven scenes; JS only flips an index. Pauses on hover; freezes on `prefers-reduced-motion`. KaTeX rendered **server-side** (`src/lib/katex.ts` → HTML strings as props) so katex JS never enters the client bundle.
2. **ChapterTour** (`landing/ChapterTour.tsx`) — scroll-pinned 430vh section: sticky panel cycles derive → recall → runnable → problem set → quiz as you scroll (Framer Motion `useScroll` → stage index; crossfade via `[data-on]` CSS). Stage buttons `lenis.scrollTo` jump. Static stacked fallback below `lg` and for reduced motion.
3. **⌘K command palette** (`palette/CommandPalette.tsx` + `PaletteTrigger.tsx`, mounted in `layout.tsx`) — MiniSearch over the route-handler index; lazy-loads minisearch + index JSON on first open; fuzzy/prefix, boosts written chapters; ↑↓/Enter; groups chapters + sections; empty state = resume-reading + volume jump. Stops Lenis while open.
4. **Live session signals** (`landing/SessionSignal.tsx` + rewritten `lib/progress.tsx`) — progress state gained `visitDays` day-log + `computeStreak()` (yesterday-grace). `TopicVisit` (mounted on chapter pages) records visits. Landing nav shows real `SessionPill` ("reading · <chapter>") and `StreakBadge` ("day N"); hero shows `ContinueCard` resume card. localStorage shape stays backward-compatible with `MarkDone`'s direct writes.
5. **PeekInside** (`landing/PeekInside.tsx`) — horizontal strip of every *written* chapter as a miniature plate (abstract interior anatomy + chips), pulled live from the manifest; trailing ghost card counts outlined chapters.
6. **StatusChip system** (`ui/StatusChip.tsx`) — ● written / ○ outline / ▲ flagship / ◆ runnable / ▮ core / live (pulsing). Applied on landing volume cards, tier-page topic rows, and chapter headers (`learn/[...slug]/page.tsx`). Flagship set: `src/curriculum/flagship.ts`.
7. **Custom icon set** (`components/icons.tsx`) — 16 cartographic-instrument line icons (compass, sextant, orbit, plumb, meridian, bolt, flame, folio, target…), 1.6 stroke, currentColor.
8. **Landing Pyodide cell** — inside **Machinery** (`landing/Machinery.tsx`): the *actual* `RunnableCode` component with a numpy+matplotlib cosine-similarity demo (captureFig, transparent fig, theme-safe colors).
9. **TwoSurfaces** (`landing/TwoSurfaces.tsx`) — "Read the volume" (lime) vs "Work the volume" (violet) split using `.surface-read`/`.surface-practice`; links Volume 0 + flagship chapter.
10. **Hero depth** — `.product-light` blurred radial glow behind the preview (static gradient, `contain: strict`, own GPU layer — scroll-perf safe) + `.levitate` float.
11. **Machinery showcase** — real `Motivation`/`Recall`/`Angle`/`Derivation`+`Step` components rendered on the landing with authentic dot-product content, each annotated with its MDX tag (`<Recall term="norm">` etc.).
12. **Product-state nav** — landing + tier navs now carry SessionPill/StreakBadge/PaletteTrigger; "Begin" CTA intact.

Supporting changes: `globals.css` gained chips/instrument/scene/palette/plate/tour/surface layers + `--amber/--violet/--rose` tokens (dark + light); `page.tsx` fully reassembled (§00 Frontispiece → §01 Tour → §02 Plates → §03 Volumes → §04 Spine → §05 Surfaces → §06 Machinery → §07 Method → colophon); `TopBar.tsx` (inner pages) gained streak + palette trigger. `ambient/HeroOrbit.tsx` is now unused (kept on disk, no git history to recover from).

## Key files & locations

- `src/curriculum/curriculum.ts` — syllabus tree manifest (edit `status: 'outline' | 'written'` per topic as you author)
- `src/lib/content.ts` — MDX loader (`content/tier-X/phase-X-Y/{slug}.mdx`)
- `src/lib/mdx-components.ts` — MDX component registry
- `src/lib/smooth-scroll.tsx` — Lenis wrapper (tuned `lerp: 0.14`, `prevent` for CodeMirror + Sidebar + `pre` + `[data-lenis-prevent]`)
- `src/components/pedagogy/{static,interactive}.tsx` — 17 pedagogy components (incl. `LifeLesson`)
- `src/components/widgets/FunctionPlot.tsx` — SVG widgets (FunctionPlot, VectorPlayground, GradientDescentLab)
- `src/components/code/RunnableCode.tsx` — Pyodide cell + CodeBlock (accept `code` prop OR `children`)
- `src/components/ambient/` — LivingBackground, CursorHalo, TickCount, TiltCard, RevealOnScroll (Framer Motion); HeroOrbit now unused
- `src/components/landing/` — HeroPreview, ChapterTour, PeekInside, TwoSurfaces, Machinery, SessionSignal (Session 5)
- `src/components/palette/` — CommandPalette (⌘K) + PaletteTrigger; index served by `src/app/search-index.json/route.ts`
- `src/components/ui/StatusChip.tsx` + `src/components/icons.tsx` + `src/curriculum/flagship.ts` — chip vocabulary, icon set, flagship registry
- `src/lib/katex.ts` — server-side `tex()` → KaTeX HTML strings (keep katex JS out of client components)
- `content/tier-0/phase-0-1/*.mdx` — all 8 chapters written (phase complete)
- `content/tier-1/phase-1-1/dot-product-cosine-similarity.mdx` — flagship exemplar
- `content/tier-1/phase-1-3/gradient-descent-intuition.mdx` — gradient descent exemplar

## Known gotchas (write down so future-me doesn't relearn)

- **next-mdx-remote strips JS by default.** Must pass `blockJS: false` + `mdxOptions.useDynamicImport: true` for JSX prop expressions (arrays, template literals, JSX) and top-level `export const` inside MDX to work. Fix lives in `src/app/learn/[...slug]/page.tsx`.
- **Next 16 params are `Promise`.** Always `const { x } = await params;`.
- **Do not spread module namespaces into a plain object** (`...pedagogy` → "trap returned extra keys but proxy target is non-extensible" under RSC). Import each component explicitly.
- **MDX top-level exports** (`export const foo = \`...\`;`) work thanks to `useDynamicImport: true` — good for long code strings.
- **Scroll perf:** backdrop-filter + mix-blend-mode film grain kill fps. Use Lenis + isolated GPU compositor layers (`transform: translateZ`, `will-change`, `contain: strict`). All ambient animation runs on CSS keyframes, not JS rAF (only cursor halo uses rAF and it sleeps when idle).
- **Lenis + inner scrollables:** anything with its own scroll (CodeMirror, sidebar, `[data-lenis-prevent]`) must be excluded via the `prevent` callback in `smooth-scroll.tsx`.
- **`overflow-hidden` on a page-root div silently kills every `position: sticky` inside it** (sticky pins to the nearest scroll container; `overflow: hidden` creates one that never scrolls). Bit us in Session 5: the pinned ChapterTour showed a 430vh blank band and the sticky nav-bar never pinned. Fix: use `overflow-x-clip` on page roots (`clip` doesn't create a scroll container). `.mesh-bg` clips its own blobs, so roots never needed vertical clipping.
- **Server-rendered KaTeX still needs the stylesheet.** Any page that injects `tex()` HTML must `import "katex/dist/katex.min.css"` (landing + learn pages do). Without it formulas render as stacked plain text.
- **Progress localStorage (`gaih-progress-v1`) is written from two places** — `ProgressProvider` (visits/streak) and `MarkDone` (direct parse-mutate-write). Any new field must be optional + preserved by both paths (`{ ...EMPTY, ...parsed }` on load; spread-preserve on write).
- **Lenis prevent must check scrollability, not just selector:** Session 3 hit a serious bug — the original naive prevent (`el.closest('pre')`) deferred to native scroll for every `pre` element, including non-scrollable ones. Result: hovering any code block killed page scroll (native had nothing to scroll on that `pre`, so the wheel event was swallowed). Also caused "scroll down pulls up" when Lenis and native scroll re-sync out of phase. Fix (in `smooth-scroll.tsx`): walk the ancestor chain from the wheel target; only defer when a real vertically-scrollable container is found, OR when `[data-lenis-prevent]` is on the chain. Static `pre` (from rehype-pretty-code) with only `overflow-x: auto` no longer breaks scroll. Also added `overscroll-behavior: contain` on `.cm-editor`, `.cm-scroller`, `pre`, and `[data-lenis-prevent]` as boundary safety.

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
