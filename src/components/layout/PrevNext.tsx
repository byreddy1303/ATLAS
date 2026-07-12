import Link from "next/link";
import type { TopicPath } from "@/curriculum/curriculum";

export function PrevNext({
  prev,
  next,
}: {
  prev?: TopicPath;
  next?: TopicPath;
}) {
  return (
    <nav className="mt-16 grid gap-4 border-t border-line pt-8 md:grid-cols-2">
      {prev ? (
        <Link
          href={`/learn/${prev.urlSlugParts.join("/")}`}
          className="card group block p-5"
        >
          <div className="label-mono">← Previous chapter</div>
          <div className="mt-2 text-[16px] font-semibold text-ink group-hover:text-lime">
            {prev.topic.title}
          </div>
          <div className="mt-1 text-[13px] text-ink-3">
            Vol. {prev.tier.numeral} · {prev.phase.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/learn/${next.urlSlugParts.join("/")}`}
          className="card group block p-5 md:text-right"
        >
          <div className="label-mono">Next chapter →</div>
          <div className="mt-2 text-[16px] font-semibold text-ink group-hover:text-lime">
            {next.topic.title}
          </div>
          <div className="mt-1 text-[13px] text-ink-3">
            Vol. {next.tier.numeral} · {next.phase.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
