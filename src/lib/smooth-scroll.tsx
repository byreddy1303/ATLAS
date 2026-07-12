"use client";

import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import { ReactNode } from "react";

// Only defer to native scroll when the innermost ancestor under the pointer
// is *actually* vertically scrollable. Previously we deferred on any `pre`
// or CodeMirror element, which broke page scroll whenever the pointer sat
// over a non-scrollable code block: the wheel event was declined by Lenis,
// then swallowed by the pre with no scroll extent. `data-lenis-prevent`
// remains the explicit escape hatch (used by sidebars etc.).
function isOverScrollableRegion(node: Element): boolean {
  const el = node as HTMLElement;
  if (el.closest?.("[data-lenis-prevent]")) return true;

  let cur: HTMLElement | null = el;
  while (cur && cur !== document.body && cur !== document.documentElement) {
    const style = window.getComputedStyle(cur);
    const overflowY = style.overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") &&
      cur.scrollHeight > cur.clientHeight + 1
    ) {
      return true;
    }
    cur = cur.parentElement;
  }
  return false;
}

const OPTIONS: LenisOptions = {
  lerp: 0.14,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  autoResize: true,
  prevent: (node: Element) => isOverScrollableRegion(node),
};

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={OPTIONS}>
      {children}
    </ReactLenis>
  );
}
