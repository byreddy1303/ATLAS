// Two surfaces, two verbs — the atlas is read (lime) and worked (violet).
// Server component; flagship links computed from the manifest.

import Link from "next/link";
import { allTopicPaths, CURRICULUM } from "@/curriculum/curriculum";
import { IconFolio, IconTarget, IconArrowR } from "@/components/icons";
import { StatusChip } from "@/components/ui/StatusChip";

export function TwoSurfaces() {
  const flagship = allTopicPaths().find(
    (tp) => tp.topic.slug === "dot-product-cosine-similarity",
  );
  const flagshipHref = flagship
    ? `/learn/${flagship.urlSlugParts.join("/")}`
    : "/tier/foundations";
  const vol0 = CURRICULUM[0];

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* READ */}
      <section className="surface-read flex flex-col p-7 md:p-9">
        <div className="relative flex items-center justify-between">
          <span className="label-mono" style={{ color: "var(--lime)" }}>
            surface 01 — read
          </span>
          <span className="text-lime/80">
            <IconFolio size={22} />
          </span>
        </div>

        <h3 className="relative mt-5 text-[26px] font-bold leading-[1.08] tracking-[-0.02em] md:text-[30px]">
          Read the volume.
        </h3>
        <p className="font-editorial relative mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-2">
          Long-form chapters in plain English — story first, then the technical
          picture, then the math with every line narrated. Nothing is ever
          &ldquo;left as an exercise.&rdquo;
        </p>

        <ul className="relative mt-6 space-y-2.5 text-[13.5px] text-ink-2">
          {[
            "three angles on every idea — story, picture, symbols",
            "derivations that never skip a step",
            "recall cards re-teach the basics, every time they reappear",
          ].map((line) => (
            <li key={line} className="flex items-start gap-2.5">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-lime" />
              {line}
            </li>
          ))}
        </ul>

        <div className="relative mt-auto flex flex-wrap items-center gap-3 pt-8">
          <Link
            href={`/tier/${vol0.slug}`}
            className="group inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-[13.5px] font-bold text-bg transition-transform hover:-translate-y-0.5"
          >
            Open Volume 0
            <IconArrowR size={15} />
          </Link>
          <StatusChip kind="written" label={`${allTopicPaths().filter((t) => t.topic.status === "written").length} chapters live`} size="sm" />
        </div>
      </section>

      {/* PRACTICE */}
      <section className="surface-practice flex flex-col p-7 md:p-9">
        <div className="relative flex items-center justify-between">
          <span className="label-mono" style={{ color: "var(--violet)" }}>
            surface 02 — practice
          </span>
          <span style={{ color: "var(--violet)" }}>
            <IconTarget size={22} />
          </span>
        </div>

        <h3 className="relative mt-5 text-[26px] font-bold leading-[1.08] tracking-[-0.02em] md:text-[30px]">
          Work the volume.
        </h3>
        <p className="font-editorial relative mt-3 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-2">
          Every chapter ends in sweat: runnable code you edit in the page,
          graded problem sets with full worked solutions, and a quiz that
          tells you <em>why</em> each answer is right.
        </p>

        <ul className="relative mt-6 space-y-2.5 text-[13.5px] text-ink-2">
          {[
            "◆ runnable cells — python executes in your browser",
            "▤ problem sets graded easy → hard, hints before answers",
            "? quizzes with explanations, not just scores",
          ].map((line) => (
            <li key={line} className="flex items-start gap-2.5">
              <span
                className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
                style={{ background: "var(--violet)" }}
              />
              {line}
            </li>
          ))}
        </ul>

        <div className="relative mt-auto flex flex-wrap items-center gap-3 pt-8">
          <Link
            href={flagshipHref}
            className="group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13.5px] font-bold transition-transform hover:-translate-y-0.5"
            style={{
              color: "var(--violet)",
              borderColor: "color-mix(in oklch, var(--violet) 45%, transparent)",
              background: "color-mix(in oklch, var(--violet) 10%, transparent)",
            }}
          >
            Try a flagship chapter
            <IconArrowR size={15} />
          </Link>
          <StatusChip kind="runnable" size="sm" />
        </div>
      </section>
    </div>
  );
}
