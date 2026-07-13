"use client";

// ⌘K — the front door. Fuzzy-jump to any chapter or section from anywhere.
// Index is fetched lazily on first open; MiniSearch is dynamically imported
// so the palette costs almost nothing until summoned.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import type MiniSearch from "minisearch";
import { useProgress } from "@/lib/progress";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  IconSearch,
  IconResume,
  IconMeridian,
  IconArrowNE,
} from "@/components/icons";

export type PaletteVolume = {
  numeral: string;
  title: string;
  slug: string;
  topics: number;
};

type IndexedDoc = {
  id: string;
  type: "chapter" | "section";
  title: string;
  url: string;
  vol: string;
  volTitle?: string;
  phase?: string;
  status?: "written" | "outline";
  flagship?: boolean;
  chapter?: string;
};

type Row =
  | { kind: "resume"; title: string; url: string; sub: string }
  | { kind: "volume"; v: PaletteVolume }
  | { kind: "doc"; d: IndexedDoc };

type Store = {
  mini: MiniSearch<IndexedDoc>;
  nChapters: number;
  nSections: number;
};

export function openPalette() {
  window.dispatchEvent(new CustomEvent("atlas:palette"));
}

export function CommandPalette({ volumes }: { volumes: PaletteVolume[] }) {
  const router = useRouter();
  const lenis = useLenis();
  const { ready, lastVisited } = useProgress();

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(false);

  const storeRef = useRef<Promise<Store> | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async (): Promise<Store> => {
    if (storeRef.current) return storeRef.current;
    storeRef.current = (async () => {
      setLoading(true);
      const [{ default: MiniSearchCtor }, res] = await Promise.all([
        import("minisearch"),
        fetch("/search-index.json"),
      ]);
      const data = (await res.json()) as {
        chapters: IndexedDoc[];
        sections: IndexedDoc[];
      };
      const mini = new MiniSearchCtor<IndexedDoc>({
        fields: ["title", "body", "chapter", "volTitle"],
        storeFields: [
          "type", "title", "url", "vol", "volTitle", "phase",
          "status", "flagship", "chapter",
        ],
        searchOptions: {
          prefix: true,
          fuzzy: 0.18,
          boost: { title: 4, chapter: 1.6 },
          boostDocument: (_id, _term, fields) =>
            fields?.type === "chapter"
              ? fields?.status === "written" ? 1.5 : 1.15
              : 1,
        },
      });
      mini.addAll([...data.chapters, ...data.sections]);
      const s: Store = {
        mini,
        nChapters: data.chapters.length,
        nSections: data.sections.length,
      };
      setStore(s);
      setLoading(false);
      return s;
    })();
    return storeRef.current;
  }, []);

  // summon / dismiss
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onSummon = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("atlas:palette", onSummon);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("atlas:palette", onSummon);
    };
  }, []);

  // page freeze + lazy index load while open
  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    void load();
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = prev;
    };
  }, [open, load, lenis]);

  const rows = useMemo<Row[]>(() => {
    if (!open) return [];
    const query = q.trim();
    if (!query) {
      const out: Row[] = [];
      if (ready && lastVisited) {
        out.push({
          kind: "resume",
          title: lastVisited.title,
          url: `/learn/${lastVisited.slug}`,
          sub: "continue where you left off",
        });
      }
      for (const v of volumes) out.push({ kind: "volume", v });
      return out;
    }
    if (!store) return [];
    const hits = store.mini.search(query) as unknown as (IndexedDoc & {
      score: number;
    })[];
    const chapters = hits.filter((h) => h.type === "chapter").slice(0, 7);
    const sections = hits.filter((h) => h.type === "section").slice(0, 6);
    return [...chapters, ...sections].map((d) => ({ kind: "doc", d }));
  }, [open, q, store, volumes, ready, lastVisited]);

  const go = useCallback(
    (row: Row) => {
      setOpen(false);
      if (row.kind === "resume") router.push(row.url);
      else if (row.kind === "volume") router.push(`/tier/${row.v.slug}`);
      else router.push(row.d.url);
    },
    [router],
  );

  // keyboard navigation inside the list
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, rows.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter" && rows[active]) {
        e.preventDefault();
        go(rows[active]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, rows, active, go]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-idx="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const grouped = q.trim().length > 0;
  let lastGroup = "";

  return (
    <>
      <div className="palette-scrim" onClick={() => setOpen(false)} />
      <div
        className="palette-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Atlas command palette"
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <span className="text-lime">
            <IconSearch size={17} />
          </span>
          <input
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            placeholder="Jump to a chapter, section, volume…"
            className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-4"
            spellCheck={false}
          />
          <span className="kbd shrink-0">esc</span>
        </div>

        <div
          ref={listRef}
          data-lenis-prevent
          className="max-h-[52vh] overflow-y-auto p-2"
        >
          {loading && grouped && (
            <div className="px-3 py-6 text-center">
              <span className="label-mono">indexing the atlas…</span>
            </div>
          )}

          {!loading && grouped && rows.length === 0 && (
            <div className="px-3 py-8 text-center">
              <div className="font-editorial text-[19px] text-ink-2">
                nothing on this meridian.
              </div>
              <div className="label-mono mt-2">try a broader term</div>
            </div>
          )}

          {rows.map((row, i) => {
            const group =
              row.kind === "resume"
                ? "session"
                : row.kind === "volume"
                  ? "volumes"
                  : row.d.type === "chapter"
                    ? "chapters"
                    : "sections";
            const header = group !== lastGroup;
            lastGroup = group;
            return (
              <div key={row.kind === "doc" ? row.d.id : `${row.kind}-${i}`}>
                {header && (
                  <div className="label-mono px-3 pb-1.5 pt-3 !text-[9.5px]">
                    § {group}
                  </div>
                )}
                <button
                  data-idx={i}
                  data-active={i === active}
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(row)}
                  className="palette-item flex w-full items-center gap-3 px-3 py-2.5 text-left"
                >
                  <RowGlyph row={row} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-medium text-ink">
                      {row.kind === "volume" ? (
                        <>
                          Volume {row.v.numeral} — {row.v.title}
                        </>
                      ) : row.kind === "resume" ? (
                        row.title
                      ) : (
                        row.d.title
                      )}
                    </span>
                    <span className="block truncate text-[11.5px] text-ink-3">
                      {row.kind === "volume"
                        ? `${row.v.topics} chapters`
                        : row.kind === "resume"
                          ? row.sub
                          : row.d.type === "chapter"
                            ? `Vol ${row.d.vol} · ${row.d.phase ?? row.d.volTitle}`
                            : `in ${row.d.chapter} · Vol ${row.d.vol}`}
                    </span>
                  </span>
                  {row.kind === "doc" && row.d.type === "chapter" && (
                    <span className="hidden items-center gap-1.5 sm:flex">
                      {row.d.flagship && (
                        <StatusChip kind="flagship" size="sm" label="" className="!px-1.5" />
                      )}
                      <StatusChip
                        kind={row.d.status === "written" ? "written" : "outline"}
                        size="sm"
                      />
                    </span>
                  )}
                  <span className="text-ink-4">
                    <IconArrowNE size={13} />
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-line bg-bg-3/50 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="kbd">↑↓</span>
            <span className="kbd">↵</span>
            <span className="label-mono !text-[9px]">navigate · open</span>
          </div>
          <span className="label-mono !text-[9px]">
            {store
              ? `atlas index · ${store.nChapters} chapters · ${store.nSections} sections`
              : "atlas index"}
          </span>
        </div>
      </div>
    </>
  );
}

function RowGlyph({ row }: { row: Row }) {
  if (row.kind === "resume")
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime-soft text-lime">
        <IconResume size={16} />
      </span>
    );
  if (row.kind === "volume")
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-3 text-ink-2">
        <IconMeridian size={15} />
      </span>
    );
  return (
    <span
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-3 font-mono text-[10px] ${
        row.d.type === "chapter" ? "text-lime" : "text-ink-3"
      }`}
    >
      {row.d.type === "chapter" ? "ch" : "§"}
    </span>
  );
}
