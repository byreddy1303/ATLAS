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
}

interface ProgressApi extends ProgressState {
  ready: boolean;
  isDone: (slug: string) => boolean;
  toggleDone: (slug: string) => void;
  visit: (v: LastVisited) => void;
  countDone: (slugs: string[]) => number;
}

const STORAGE_KEY = "gaih-progress-v1";

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>({ done: {}, lastVisited: null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
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
      isDone: (slug) => !!state.done[slug],
      toggleDone: (slug) => {
        const done = { ...state.done };
        if (done[slug]) delete done[slug];
        else done[slug] = true;
        persist({ ...state, done });
      },
      visit: (v) => {
        if (state.lastVisited?.slug === v.slug) return;
        persist({ ...state, lastVisited: v });
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
