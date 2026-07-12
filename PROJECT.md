# GenAI Learning Hub

Personal learning-notes app (`genai-notes/`, Next.js) covering `Complete_Syllabus_DataScience_GenAI_FINAL (1).pdf` (7 tiers: Python → math → ML → DL → transformers/GenAI → production → research). The user is a **complete beginner** studying tier-by-tier; content is authored across many sessions.

## Session protocol (IMPORTANT)

1. **Before any work**: read `STATUS.md` (current state + next actions) and `PLAN.md` (approved master plan).
2. **After every meaningful chunk of work**: update `STATUS.md` (check items off, note what's next). Never end a session without updating it — the user clears sessions and relies on these files to resume.
3. End sessions with a green `npm run build` in `genai-notes/`.

## Non-negotiable authoring rules (user's explicit requirements)

1. **Design**: distinctive, production-grade, never generic AI styling.
2. **ML-critical concepts**: include a real-world project example — story intuition → technical intuition → math → runnable (Pyodide) code demo → line-by-line explanation.
3. **Beginner-first, always**: re-explain basics every time they reappear (`<Recall>`); derivations step-by-step with plain English beside every math line; define every symbol; never "it can be shown".
4. **Practice**: `<CodeItYourself>` prompts; math topics get graded `<ProblemSet>` (easy→hard, hints + full solutions) plus a `<Quiz>`.

## Key locations

- `genai-notes/src/curriculum/curriculum.ts` — syllabus tree manifest; topic `status: 'written' | 'outline'` drives everything
- `genai-notes/content/tier-X/phase-X-Y/<slug>.mdx` — the notes (15-section template in PLAN.md)
- `genai-notes/src/components/pedagogy/` — Motivation, Angle, Derivation, Recall, RealWorldML, ProblemSet, Quiz, etc.
- `genai-notes/src/components/widgets/` — interactive SVG visualizations
- After adding content: `node scripts/build-search-index.mjs` (also runs pre-build)
