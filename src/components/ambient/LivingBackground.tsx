"use client";

import { useEffect, useMemo, useRef } from "react";

/**
 * Star field with ALL animation on the CSS compositor — no
 * per-frame JavaScript. We render N absolutely-positioned dots and let
 * `@keyframes atlas-twinkle` drift their opacity + a tiny transform.
 *
 * Cost per scroll frame: zero (each star sits on its own GPU layer).
 */
export function LivingBackground({
  density = 44,
  seed = 42,
}: {
  density?: number;
  seed?: number;
}) {
  const stars = useMemo(() => {
    let s = seed >>> 0;
    const rand = () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 0xffffffff;
    };
    return Array.from({ length: density }).map(() => ({
      x: rand() * 100,
      y: rand() * 100,
      r: 1 + rand() * 2.2,
      d: 2.4 + rand() * 3.8,
      lag: rand() * 4,
      dim: 0.35 + rand() * 0.55,
      hue: rand() < 0.72 ? "var(--lime)" : "oklch(74% 0.19 340)",
    }));
  }, [density, seed]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[110vh] w-full"
      style={{
        maskImage:
          "linear-gradient(180deg, black 0%, black 55%, transparent 95%)",
        WebkitMaskImage:
          "linear-gradient(180deg, black 0%, black 55%, transparent 95%)",
        contain: "strict",
      }}
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="atlas-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.r}px`,
            height: `${s.r}px`,
            background: s.hue,
            opacity: s.dim,
            animationDuration: `${s.d}s`,
            animationDelay: `${s.lag}s`,
          }}
        />
      ))}
    </div>
  );
}

/** Cursor-following halo. GPU compositor, throttled rAF, sleeps when idle. */
export function CursorHalo() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = document.getElementById("cursor-halo");
    if (!el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf: number | null = null;
    const step = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x - 160}px, ${y - 160}px, 0)`;
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) {
        raf = requestAnimationFrame(step);
      } else {
        raf = null;
      }
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (raf === null) raf = requestAnimationFrame(step);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      id="cursor-halo"
      aria-hidden
      className="cursor-halo pointer-events-none fixed left-0 top-0 z-[1] h-[320px] w-[320px] rounded-full"
      style={{
        willChange: "transform",
        transform: "translate3d(-9999px, -9999px, 0)",
      }}
    />
  );
}

/** Odometer-style animated counter. Runs once on mount, then idle. */
export function TickCount({
  value,
  duration = 1200,
  className = "",
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = 0;
    const to = value;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(from + (to - from) * eased);
      el.textContent = String(v);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
