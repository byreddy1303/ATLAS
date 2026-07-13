import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CURRICULUM,
  tierCounts,
  type Phase,
  type Topic,
  type Tier,
} from "@/curriculum/curriculum";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StatusChip } from "@/components/ui/StatusChip";
import { FLAGSHIP_SLUGS } from "@/curriculum/flagship";
import { PaletteTrigger } from "@/components/palette/PaletteTrigger";
import { StreakBadge } from "@/components/landing/SessionSignal";

export function generateStaticParams() {
  return CURRICULUM.map((t) => ({ tierSlug: t.slug }));
}

export default async function TierPage({
  params,
}: {
  params: Promise<{ tierSlug: string }>;
}) {
  const { tierSlug } = await params;
  const tier = CURRICULUM.find((t) => t.slug === tierSlug);
  if (!tier) notFound();
  return <TierView tier={tier} />;
}

function TierView({ tier }: { tier: Tier }) {
  const c = tierCounts(tier);
  const tierIdx = CURRICULUM.findIndex((t) => t.id === tier.id);
  const prev = tierIdx > 0 ? CURRICULUM[tierIdx - 1] : null;
  const next = tierIdx < CURRICULUM.length - 1 ? CURRICULUM[tierIdx + 1] : null;

  return (
    <div className={`tier-hue-${tier.id} relative flex min-h-screen flex-col overflow-x-clip bg-bg text-ink`}>
      <div className="mesh-bg">
        <div className="mesh-blob mesh-a" />
        <div className="mesh-blob mesh-b" />
      </div>
      <div className="grid-overlay" />

      {/* nav */}
      <header className="nav-bar">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-3 text-ink-2 hover:text-ink">
            <span className="text-[15px] font-bold tracking-tight">Atlas</span>
            <span className="text-ink-3">/</span>
            <span className="label-mono">Vol. {tier.numeral}</span>
          </Link>
          <div className="flex items-center gap-2">
            <StreakBadge className="hidden sm:inline-flex" />
            <Link href="/" className="pill">
              ← All volumes
            </Link>
            <PaletteTrigger compact />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-14 pb-16 md:px-10 md:pt-20">
        <div className="chapter-mark reveal">
          <span className="no">Volume {tier.numeral}</span>
          <span className="rule" />
          <span className="no !text-ink-3">{tier.duration}</span>
        </div>

        <h1 className="hero-display reveal reveal-2 mt-8 text-[clamp(3rem,8vw,7.5rem)]">
          {tier.title.split(" ").map((word, i) => (
            <span key={i}>
              {i === tier.title.split(" ").length - 1 ? (
                <span className="em">{word}</span>
              ) : (
                word
              )}
              {i < tier.title.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <div className="font-editorial reveal reveal-3 mt-4 text-[clamp(1.4rem,3vw,2.2rem)] text-ink-2">
          {tier.subtitle}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <p className="prose-editorial reveal reveal-4 lg:col-span-7">
            {tier.blurb}
          </p>
          <div className="reveal reveal-5 lg:col-span-5">
            <div className="flex flex-wrap gap-3">
              <div className="stat-chip">
                <div className="n tabular">{c.phases.toString().padStart(2, "0")}</div>
                <div className="l">Phases</div>
              </div>
              <div className="stat-chip">
                <div className="n tabular">{c.topics}</div>
                <div className="l">Chapters</div>
              </div>
              <div className="stat-chip">
                <div className="n tabular !text-lime">{c.written.toString().padStart(3, "0")}</div>
                <div className="l">Written</div>
              </div>
            </div>
            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-lime"
                style={{ width: `${(c.written / c.topics) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* phases */}
      <section className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10">
        <div className="border-t border-line pt-14">
          <div className="chapter-mark mb-10">
            <span className="no">§ chapters</span>
            <span className="rule" />
          </div>

          <div className="space-y-14">
            {tier.phases.map((phase, i) => (
              <PhaseBlock key={phase.id} tier={tier} phase={phase} phaseIdx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* prev/next volume */}
      <section className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 md:px-10">
        <div className="grid gap-4 border-t border-line pt-10 md:grid-cols-2">
          {prev ? (
            <Link href={`/tier/${prev.slug}`} className="card block p-6">
              <div className="label-mono">← Previous volume</div>
              <div className="mt-3 text-[20px] font-bold tracking-tight">
                Vol. {prev.numeral} · {prev.title}
              </div>
              <div className="font-editorial mt-1 text-[16px] text-ink-2">
                {prev.subtitle}
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link href={`/tier/${next.slug}`} className="card block p-6 md:text-right">
              <div className="label-mono">Next volume →</div>
              <div className="mt-3 text-[20px] font-bold tracking-tight">
                Vol. {next.numeral} · {next.title}
              </div>
              <div className="font-editorial mt-1 text-[16px] text-ink-2">
                {next.subtitle}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </div>
  );
}

function PhaseBlock({
  tier,
  phase,
  phaseIdx,
}: {
  tier: Tier;
  phase: Phase;
  phaseIdx: number;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-4">
        <span className="font-editorial text-[62px] leading-none text-lime">
          {phaseIdx + 1}
        </span>
        <div>
          <div className="label-mono">Phase {phase.id}</div>
          <h2 className="text-[30px] font-bold tracking-[-0.02em]">
            {phase.title}
          </h2>
          <div className="font-editorial mt-1 text-[19px] text-ink-2">
            {phase.subtitle}
          </div>
        </div>
      </div>

      <ol className="mt-8 grid gap-3 md:grid-cols-2">
        {phase.topics.map((topic, i) => (
          <TopicRow
            key={topic.slug}
            tier={tier}
            phase={phase}
            topic={topic}
            n={i + 1}
          />
        ))}
      </ol>
    </div>
  );
}

function TopicRow({
  tier,
  phase,
  topic,
  n,
}: {
  tier: Tier;
  phase: Phase;
  topic: Topic;
  n: number;
}) {
  return (
    <li>
      <Link
        href={`/learn/${tier.slug}/${phase.slug}/${topic.slug}`}
        className="card group flex items-start gap-4 p-5"
      >
        <span className="font-mono mt-1 shrink-0 rounded-md bg-bg-3 px-2 py-1 text-[10.5px] font-semibold tracking-wider text-ink-2">
          {String(n).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="mr-0.5 text-[15.5px] font-semibold leading-snug text-ink group-hover:text-lime">
              {topic.title}
            </div>
            {topic.status === "written" ? (
              <StatusChip kind="written" size="sm" />
            ) : (
              <StatusChip kind="outline" size="sm" />
            )}
            {topic.status === "written" && <StatusChip kind="runnable" size="sm" />}
            {FLAGSHIP_SLUGS.has(topic.slug) && (
              <StatusChip kind="flagship" size="sm" />
            )}
            {topic.priority === "core" && <StatusChip kind="core" size="sm" />}
          </div>
          <div className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
            {topic.description}
          </div>
        </div>
        <span className="mt-1 text-ink-3 transition group-hover:text-lime">→</span>
      </Link>
    </li>
  );
}
