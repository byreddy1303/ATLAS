"use client";

// Real session telemetry — nothing aspirational. Every signal here is
// read from actual localStorage progress via ProgressProvider.

import Link from "next/link";
import { useEffect } from "react";
import { useProgress } from "@/lib/progress";
import { IconFlame, IconResume, IconArrowR } from "@/components/icons";

function timeAgo(at: number): string {
  const s = Math.max(1, Math.floor((Date.now() - at) / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "yesterday" : `${d} days ago`;
}

function shortTitle(t: string, max = 26): string {
  const clean = t.replace(/^.*·\s*/, "").trim();
  return clean.length > max ? clean.slice(0, max - 1).trimEnd() + "…" : clean;
}

/** Nav pill — live when a chapter has been opened, quiet otherwise. */
export function SessionPill() {
  const { ready, lastVisited } = useProgress();
  if (!ready || !lastVisited) {
    return (
      <span className="pill hidden lg:inline-flex">
        <span className="live-dot" />
        <span>session · new</span>
      </span>
    );
  }
  return (
    <Link
      href={`/learn/${lastVisited.slug}`}
      className="pill hidden lg:inline-flex hover:border-line-2"
      title={`Resume · ${lastVisited.title}`}
    >
      <span className="live-dot" />
      <span className="max-w-[220px] truncate normal-case tracking-normal">
        reading · {shortTitle(lastVisited.title)}
      </span>
    </Link>
  );
}

/** Streak flame — appears from the first study day. */
export function StreakBadge({ className = "" }: { className?: string }) {
  const { ready, streak } = useProgress();
  if (!ready || streak < 1) return null;
  return (
    <span
      className={`status-chip chip-flagship !normal-case ${className}`}
      title={`${streak}-day study streak`}
    >
      <IconFlame size={11} strokeWidth={1.8} />
      <span className="tabular">day {streak}</span>
    </span>
  );
}

/** Hero resume card — the thread, picked back up. */
export function ContinueCard() {
  const { ready, lastVisited, doneCount } = useProgress();
  if (!ready || !lastVisited) return null;
  return (
    <Link
      href={`/learn/${lastVisited.slug}`}
      className="group mt-8 flex w-full max-w-xl items-center gap-4 rounded-2xl border border-line bg-bg-2/80 p-4 pr-5 transition-colors hover:border-lime/40"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-soft text-lime">
        <IconResume size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="label-mono !text-[9.5px] !text-lime">
          ↻ resume the thread · {timeAgo(lastVisited.at)}
        </span>
        <span className="mt-0.5 block truncate text-[15px] font-semibold text-ink">
          {lastVisited.title}
        </span>
        <span className="mt-0.5 block text-[12px] text-ink-3">
          {doneCount > 0
            ? `${doneCount} chapter${doneCount === 1 ? "" : "s"} marked done`
            : "your place is saved automatically"}
        </span>
      </span>
      <span className="text-ink-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-lime">
        <IconArrowR size={18} />
      </span>
    </Link>
  );
}

/** Invisible visit recorder — mounted on every chapter page. */
export function TopicVisit({ slug, title }: { slug: string; title: string }) {
  const { ready, visit } = useProgress();
  useEffect(() => {
    if (!ready) return;
    visit({ slug, title, at: Date.now() });
    // visit() self-guards against repeats; depending on `visit` would loop the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, slug, title]);
  return null;
}
