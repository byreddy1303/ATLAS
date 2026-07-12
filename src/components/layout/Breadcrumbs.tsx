import Link from "next/link";
import type { TopicPath } from "@/curriculum/curriculum";

export function Breadcrumbs({ tp }: { tp: TopicPath }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[12px] text-ink-3">
      <Link href="/" className="hover:text-ink">
        Atlas
      </Link>
      <span className="text-ink-4">/</span>
      <Link href={`/tier/${tp.tier.slug}`} className="hover:text-ink">
        Vol. {tp.tier.numeral} · {tp.tier.title}
      </Link>
      <span className="text-ink-4">/</span>
      <span>
        Phase {tp.phase.id} · {tp.phase.title}
      </span>
      <span className="text-ink-4">/</span>
      <span className="text-ink">{tp.topic.title}</span>
    </div>
  );
}
