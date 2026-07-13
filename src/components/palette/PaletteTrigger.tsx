"use client";

import { openPalette } from "./CommandPalette";
import { IconCommand, IconSearch } from "@/components/icons";

export function PaletteTrigger({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <button
        onClick={openPalette}
        aria-label="Open command palette (⌘K)"
        title="Search the atlas — ⌘K"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
      >
        <IconCommand size={15} />
      </button>
    );
  }
  return (
    <button
      onClick={openPalette}
      aria-label="Open command palette (⌘K)"
      className="group hidden items-center gap-2.5 rounded-full border border-line bg-bg-2/60 py-2 pl-3.5 pr-2 text-[12.5px] text-ink-3 transition-colors hover:border-line-2 hover:text-ink-2 md:inline-flex"
    >
      <IconSearch size={13} />
      <span className="pr-1">Search the atlas</span>
      <span className="kbd transition-colors group-hover:border-lime/40 group-hover:text-lime">
        <IconCommand size={10} />K
      </span>
    </button>
  );
}
