"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { CURRICULUM, tierCounts } from "@/curriculum/curriculum";

export function Sidebar() {
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const currentTierId = useMemo(() => {
    const m = pathname.match(/^\/learn\/([^/]+)/);
    if (!m) return null;
    const t = CURRICULUM.find((x) => x.slug === m[1]);
    return t?.id ?? null;
  }, [pathname]);
  const [openTier, setOpenTier] = useState<number | null>(currentTierId);

  const filter = q.trim().toLowerCase();

  return (
    <aside className="hidden w-[300px] shrink-0 border-r border-line bg-bg xl:block">
      <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col">
        <div className="border-b border-line p-4">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter chapters…"
            className="w-full rounded-lg border border-line bg-bg-2 px-3 py-2 text-[13px] text-ink placeholder:text-ink-3 focus:border-lime focus:outline-none"
          />
        </div>
        <nav
          className="flex-1 overflow-y-auto p-3"
          data-lenis-prevent
          aria-label="side"
        >
          {CURRICULUM.map((tier) => {
            const c = tierCounts(tier);
            const isOpen = openTier === tier.id || filter.length > 0;
            const tierMatches = filter
              ? tier.title.toLowerCase().includes(filter) ||
                tier.subtitle.toLowerCase().includes(filter) ||
                tier.phases.some((p) =>
                  p.topics.some((t) =>
                    t.title.toLowerCase().includes(filter),
                  ),
                )
              : true;
            if (!tierMatches) return null;
            return (
              <div key={tier.id} className={`tier-hue-${tier.id} mb-2`}>
                <button
                  onClick={() =>
                    setOpenTier((v) => (v === tier.id ? null : tier.id))
                  }
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${
                    currentTierId === tier.id
                      ? "bg-accent-soft"
                      : "hover:bg-bg-2"
                  }`}
                >
                  <span className="font-editorial text-[22px] leading-none text-accent">
                    {tier.numeral}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-semibold text-ink">
                      {tier.title}
                    </div>
                    <div className="truncate text-[10.5px] tracking-wide text-ink-3">
                      {c.written}/{c.topics} · {tier.duration}
                    </div>
                  </div>
                  <span
                    className={`text-ink-3 transition-transform ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    ›
                  </span>
                </button>
                {isOpen && (
                  <div className="ml-3 mt-1 space-y-2 border-l border-line pl-3">
                    {tier.phases.map((phase) => {
                      const phaseTopics = phase.topics.filter(
                        (t) =>
                          !filter ||
                          t.title.toLowerCase().includes(filter),
                      );
                      if (!phaseTopics.length) return null;
                      return (
                        <div key={phase.id}>
                          <div className="label-mono px-2 py-1 !text-[9.5px]">
                            {phase.id} · {phase.title}
                          </div>
                          <ul>
                            {phaseTopics.map((topic) => {
                              const href = `/learn/${tier.slug}/${phase.slug}/${topic.slug}`;
                              const active = pathname === href;
                              return (
                                <li key={topic.slug}>
                                  <Link
                                    href={href}
                                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[12.5px] transition ${
                                      active
                                        ? "bg-accent-soft text-ink"
                                        : "text-ink-2 hover:bg-bg-2 hover:text-ink"
                                    }`}
                                  >
                                    <span
                                      className={`h-1 w-1 shrink-0 rounded-full ${
                                        topic.status === "written"
                                          ? "bg-lime"
                                          : "bg-ink-4"
                                      }`}
                                    />
                                    <span className="min-w-0 flex-1 truncate">
                                      {topic.title}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
