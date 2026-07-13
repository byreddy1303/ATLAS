import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import "katex/dist/katex.min.css";

import {
  findTopicByUrlParts,
  allTopicPaths,
  neighbors,
} from "@/curriculum/curriculum";
import { readTopicMdx, slugForProgress } from "@/lib/content";
import { mdxComponents } from "@/lib/mdx-components";
import { TopBar } from "@/components/layout/TopBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PrevNext } from "@/components/layout/PrevNext";
import { MarkDone } from "@/components/pedagogy/interactive";
import { StatusChip } from "@/components/ui/StatusChip";
import { TopicVisit } from "@/components/landing/SessionSignal";
import { FLAGSHIP_SLUGS } from "@/curriculum/flagship";

export function generateStaticParams() {
  return allTopicPaths().map((tp) => ({ slug: tp.urlSlugParts }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tp = findTopicByUrlParts(slug);
  if (!tp) notFound();

  const mdxSource = await readTopicMdx(tp);
  const { prev, next } = neighbors(tp);
  const progressSlug = slugForProgress(tp);

  return (
    <div
      className={`tier-hue-${tp.tier.id} min-h-screen bg-bg text-ink`}
    >
      <TopBar
        trail={
          <>
            <span>Vol. {tp.tier.numeral}</span>
            <span className="text-ink-4">·</span>
            <span className="truncate">{tp.tier.title}</span>
          </>
        }
      />
      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />
        <main className="min-w-0 flex-1 px-5 py-10 md:px-10 lg:px-14 lg:py-14">
          <Breadcrumbs tp={tp} />

          <div className="mt-6 flex flex-wrap items-baseline gap-4">
            <span className="font-editorial text-[46px] leading-none text-lime">
              {tp.tier.numeral}
              <span className="text-ink-3">/</span>
              {tp.phase.id.split(".")[1]}
            </span>
            <div className="min-w-0">
              <div className="label-mono">Chapter</div>
              <h1 className="mt-1 text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                {tp.topic.title}
              </h1>
              <div className="font-editorial mt-2 text-[19px] text-ink-2">
                {tp.topic.description}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {tp.topic.status === "written" ? (
              <StatusChip kind="written" />
            ) : (
              <StatusChip kind="outline" label="outline · draft" />
            )}
            {FLAGSHIP_SLUGS.has(tp.topic.slug) && <StatusChip kind="flagship" />}
            {tp.topic.status === "written" && <StatusChip kind="runnable" />}
            {tp.topic.priority === "core" && <StatusChip kind="core" label="core chapter" />}
            <span className="pill">
              Phase {tp.phase.id} · {tp.phase.title}
            </span>
          </div>
          <TopicVisit slug={progressSlug} title={tp.topic.title} />

          <hr className="my-10 border-line" />

          {mdxSource ? (
            <article className="max-w-[780px] text-[16px] leading-[1.75]">
              <MDXRemote
                source={mdxSource}
                components={mdxComponents}
                options={{
                  parseFrontmatter: true,
                  // MDX in this app is fully authored & trusted (loaded from
                  // ./content). We rely on JS expressions inside JSX props
                  // (arrays for <ProblemSet>, template-literal code strings,
                  // etc.) so JS must not be stripped.
                  blockJS: false,
                  mdxOptions: {
                    useDynamicImport: true,
                    remarkPlugins: [remarkGfm, remarkMath],
                    rehypePlugins: [
                      rehypeSlug,
                      rehypeKatex,
                      [
                        rehypePrettyCode,
                        {
                          theme: {
                            dark: "github-dark",
                            light: "github-light",
                          },
                          keepBackground: false,
                        },
                      ],
                    ],
                  },
                }}
              />
            </article>
          ) : (
            <OutlineView tp={tp} />
          )}

          <div className="mt-14 flex flex-wrap items-center gap-3">
            <MarkDone slug={progressSlug} title={tp.topic.title} />
            <Link href={`/tier/${tp.tier.slug}`} className="cta-ghost">
              ← Back to Vol. {tp.tier.numeral}
            </Link>
          </div>

          <PrevNext prev={prev} next={next} />
        </main>
      </div>
    </div>
  );
}

function OutlineView({
  tp,
}: {
  tp: ReturnType<typeof findTopicByUrlParts> & object;
}) {
  return (
    <div className="max-w-[780px] space-y-8">
      <div className="rounded-2xl border border-line bg-bg-2 p-6">
        <div className="flex items-center gap-3">
          <span className="pill">Draft outline</span>
          <span className="hr-mono flex-1" />
        </div>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
          This chapter has a planned outline — the full write-up (with derivations,
          runnable code, real-world project, problem set, and quiz) lands in a
          future session. Until then, here's the shape it will take.
        </p>
      </div>

      <div>
        <div className="label-mono mb-3">§ syllabus bullets</div>
        <ul className="space-y-2">
          {tp.topic.syllabusBullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-line bg-bg-2 p-4"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
              <span className="text-[14.5px] text-ink-2">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="label-mono mb-3">§ section skeleton once written</div>
        <ol className="grid gap-2 text-[13.5px] text-ink-3 sm:grid-cols-2 md:grid-cols-3">
          {[
            "Prerequisites",
            "Motivation",
            "Intuition",
            "Build-up",
            "Angles",
            "Convergence",
            "Derivation",
            "Example",
            "Nuance",
            "Real-world · ML",
            "Code it yourself",
            "ML connection",
            "Summary",
            "Problem set",
            "Quiz",
          ].map((label, i) => (
            <li
              key={label}
              className="rounded-lg border border-line bg-bg-2 px-3 py-2"
            >
              <span className="font-mono mr-2 text-[10px] text-ink-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
