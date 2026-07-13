// Peek inside — every WRITTEN chapter as a miniature plate, pulled live
// from the manifest. A stranger sees real interiors before clicking anything.

import Link from "next/link";
import { allTopicPaths, totals } from "@/curriculum/curriculum";
import { FLAGSHIP_SLUGS } from "@/curriculum/flagship";
import { StatusChip } from "@/components/ui/StatusChip";
import { IconArrowNE } from "@/components/icons";

export function PeekInside() {
  const written = allTopicPaths().filter((tp) => tp.topic.status === "written");
  const T = totals();

  return (
    <div
      className="no-scrollbar -mx-6 flex gap-5 overflow-x-auto px-6 pb-4 md:-mx-10 md:px-10"
      role="list"
      aria-label="Written chapters"
    >
      {written.map((tp) => {
        const flagship = FLAGSHIP_SLUGS.has(tp.topic.slug);
        return (
          <Link
            role="listitem"
            key={tp.urlSlugParts.join("/")}
            href={`/learn/${tp.urlSlugParts.join("/")}`}
            className={`plate-page tier-hue-${tp.tier.id} group p-5`}
          >
            <div className="flex items-center justify-between">
              <span className="label-mono !text-[9px]">
                vol {tp.tier.numeral} · ph {tp.phase.id}
              </span>
              <span className="text-ink-4 transition-colors group-hover:text-accent">
                <IconArrowNE size={13} />
              </span>
            </div>

            <h3 className="mt-3 line-clamp-2 min-h-[44px] text-[16px] font-bold leading-snug tracking-[-0.01em]">
              {tp.topic.title}
            </h3>
            <p className="font-editorial mt-1.5 line-clamp-2 text-[14.5px] leading-snug text-ink-2">
              {tp.topic.description}
            </p>

            {/* interior anatomy, abstracted */}
            <div className="mt-4 space-y-2" aria-hidden>
              <div className="plate-skel w-11/12" />
              <div className="plate-skel w-full" />
              <div
                className="h-[22px] rounded-md border px-2 font-mono text-[8px] leading-[20px]"
                style={{
                  color: "var(--accent)",
                  borderColor: "color-mix(in oklch, var(--accent) 30%, transparent)",
                  background: "color-mix(in oklch, var(--accent) 7%, transparent)",
                }}
              >
                Σ derivation · every line narrated
              </div>
              <div className="plate-skel w-9/12" />
              <div
                className="h-[22px] rounded-md border border-line bg-bg px-2 font-mono text-[8px] leading-[20px] text-ink-3"
              >
                ▶ import numpy as np …
              </div>
              <div className="plate-skel w-4/6" />
            </div>

            <footer className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
              <StatusChip kind="written" size="sm" />
              <StatusChip kind="runnable" size="sm" />
              {flagship && <StatusChip kind="flagship" size="sm" />}
            </footer>
          </Link>
        );
      })}

      {/* the rest of the map */}
      <a
        href="#volumes"
        role="listitem"
        className="plate-page group items-center justify-center border-dashed !bg-transparent p-5 text-center"
      >
        <div className="font-editorial text-[44px] leading-none text-ink-3 transition-colors group-hover:text-lime">
          +{T.topics - T.written}
        </div>
        <div className="label-mono mt-3">chapters outlined</div>
        <p className="mt-2 max-w-[180px] text-[13px] leading-snug text-ink-3">
          the full map is drawn — it gets inked volume by volume.
        </p>
        <span className="status-chip chip-outline mt-4" data-size="sm">
          ○ see the volumes
        </span>
      </a>
    </div>
  );
}
