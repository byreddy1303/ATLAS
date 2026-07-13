"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface LastVisited {
  slug: string; // full path slug: tier-1/phase-1-2/dot-product-and-cosine-similarity
  title: string;
  at: number;
}

interface ProgressState {
  done: Record<string, true>;
  lastVisited: LastVisited | null;
  /** local-date keys (YYYY-MM-DD) → visits that day; feeds the streak */
  visitDays: Record<string, number>;
}

interface ProgressApi extends ProgressState {
  ready: boolean;
  streak: number;
  doneCount: number;
  isDone: (slug: string) => boolean;
  toggleDone: (slug: string) => void;
  visit: (v: LastVisited) => void;
  countDone: (slugs: string[]) => number;
}

const STORAGE_KEY = "gaih-progress-v1";

const EMPTY: ProgressState = { done: {}, lastVisited: null, visitDays: {} };

function dayKey(d = new Date()): string {
  // en-CA formats as YYYY-MM-DD in local time
  return d.toLocaleDateString("en-CA");
}

/** consecutive days ending today (or yesterday, so a streak survives until midnight). */
function computeStreak(days: Record<string, number>): number {
  const cursor = new Date();
  if (!days[dayKey(cursor)]) cursor.setDate(cursor.getDate() - 1);
  let n = 0;
  while (days[dayKey(cursor)]) {
    n += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({ ...EMPTY, ...parsed, visitDays: parsed.visitDays ?? {} });
      }
    } catch {
      /* corrupted storage — start fresh */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: ProgressState) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage full/unavailable — in-memory only */
    }
  }, []);

  const api = useMemo<ProgressApi>(
    () => ({
      ...state,
      ready,
      streak: computeStreak(state.visitDays),
      doneCount: Object.keys(state.done).length,
      isDone: (slug) => !!state.done[slug],
      toggleDone: (slug) => {
        const done = { ...state.done };
        if (done[slug]) delete done[slug];
        else done[slug] = true;
        persist({ ...state, done });
      },
      visit: (v) => {
        const today = dayKey();
        // no-op when nothing would change — callers may fire on every mount
        if (state.lastVisited?.slug === v.slug && state.visitDays[today]) return;
        const visitDays = { ...state.visitDays };
        visitDays[today] = (visitDays[today] ?? 0) + 1;
        persist({ ...state, lastVisited: v, visitDays });
      },
      countDone: (slugs) => slugs.reduce((n, s) => n + (state.done[s] ? 1 : 0), 0),
    }),
    [state, ready, persist]
  );

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
