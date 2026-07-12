"use client";

import { useRef, ReactNode } from "react";

/** Pointer-tilt card. GPU-cheap: only transform + one CSS var. */
export function TiltCard({
  children,
  className = "",
  intensity = 8,
  glare = true,
  href,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * intensity;
    const ry = (px - 0.5) * intensity;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  const Wrapper: "a" | "div" = href ? "a" : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-outer ${className}`}
      style={{ perspective: 1000 }}
    >
      <Wrapper
        {...wrapperProps}
        className="tilt-inner block"
        style={{
          transform:
            "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)",
          transformStyle: "preserve-3d",
          transition: "transform .35s cubic-bezier(.19,1,.22,1)",
          willChange: "transform",
        }}
      >
        {children}
        {glare && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 [.tilt-outer:hover_&]:opacity-100"
            style={{
              background:
                "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), oklch(100% 0 0 / 0.14) 0%, transparent 55%)",
              mixBlendMode: "screen",
            }}
          />
        )}
      </Wrapper>
    </div>
  );
}
