"use client";

import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { ReactNode } from "react";

const OPTIONS: LenisOptions = {
  // Physics tuned for buttery feel + snappy recovery. Higher lerp means
  // less catch-up latency, which was causing "stuck in middle" on trackpads.
  lerp: 0.14,
  smoothWheel: true,
  syncTouch: false,             // let native touch/trackpad drive; Lenis smooths wheel only
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  autoResize: true,             // re-measure document height when content mounts late (CodeMirror, Pyodide UI, etc.)
  // Skip smoothing when hovering scrollable inner elements
  // (CodeMirror editors, sidebar, code output). The check runs cheaply.
  prevent: (node: Element) => {
    const el = node as HTMLElement;
    return !!(
      el.closest?.("[data-lenis-prevent]") ||
      el.closest?.(".cm-editor") ||
      el.closest?.(".cm-scroller") ||
      el.closest?.("pre") ||
      el.closest?.("nav[aria-label='side']")
    );
  },
};

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={OPTIONS}>
      {children}
    </ReactLenis>
  );
}
