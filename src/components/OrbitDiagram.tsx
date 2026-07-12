"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A living orbital diagram: a knowledge core with concentric orbits,
 * pulsing nodes, and mouse-parallax tilt. This is the hero centerpiece.
 */
export function OrbitDiagram() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!wrapRef.current) return;
        const rect = wrapRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / window.innerWidth;
        const dy = (e.clientY - cy) / window.innerHeight;
        setTilt({ x: dx * 12, y: -dy * 12 });
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const rings = [
    { r: 120, dur: 60, count: 3, offset: 0 },
    { r: 180, dur: 90, count: 5, offset: 30 },
    { r: 250, dur: 130, count: 7, offset: 60 },
    { r: 320, dur: 180, count: 9, offset: 90 },
  ];

  return (
    <div
      ref={wrapRef}
      className="relative aspect-square w-full"
      style={{
        transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        transition: "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
        transformStyle: "preserve-3d",
      }}
    >
      <svg viewBox="-400 -400 800 800" className="h-full w-full">
        <defs>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent-bright)" stopOpacity="1" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="core-inner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="60%" stopColor="var(--accent-bright)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.4" />
          </radialGradient>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.5" />
          </linearGradient>
          <filter id="soft-blur">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>

        {/* soft aura behind core */}
        <circle r="380" fill="url(#core-glow)" opacity="0.28" />

        {/* concentric rings + orbiting nodes */}
        {rings.map((ring, i) => (
          <g key={i}>
            <circle
              r={ring.r}
              fill="none"
              stroke="url(#ring-grad)"
              strokeWidth="1"
              opacity={0.7 - i * 0.1}
              strokeDasharray={i === 3 ? "2 6" : undefined}
            />
            <g
              style={{
                transformOrigin: "center",
                animation: `${i % 2 === 0 ? "spin-slow" : "spin-reverse"} ${ring.dur}s linear infinite`,
              }}
            >
              {Array.from({ length: ring.count }).map((_, n) => {
                const angle = (n * 360) / ring.count + ring.offset;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * ring.r;
                const y = Math.sin(rad) * ring.r;
                const isMajor = n === 0;
                return (
                  <g key={n} transform={`translate(${x} ${y})`}>
                    {isMajor && (
                      <circle
                        r={12}
                        fill="var(--accent)"
                        opacity="0.15"
                        filter="url(#soft-blur)"
                      />
                    )}
                    <circle
                      className="orbit-node"
                      r={isMajor ? 4 : 2.5}
                      fill={isMajor ? "var(--accent-bright)" : "var(--ink-2)"}
                      style={{
                        animationDelay: `${n * 0.3 + i * 0.5}s`,
                      }}
                    />
                    {isMajor && (
                      <circle
                        r={7}
                        fill="none"
                        stroke="var(--accent-bright)"
                        strokeWidth="0.7"
                        opacity="0.5"
                      />
                    )}
                  </g>
                );
              })}
            </g>
          </g>
        ))}

        {/* radial tick marks — reference */}
        <g opacity="0.35">
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i * 360) / 48;
            const rad = (angle * Math.PI) / 180;
            const isMajor = i % 6 === 0;
            const inner = 355;
            const outer = isMajor ? 375 : 365;
            const x1 = Math.cos(rad) * inner;
            const y1 = Math.sin(rad) * inner;
            const x2 = Math.cos(rad) * outer;
            const y2 = Math.sin(rad) * outer;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? "var(--accent)" : "var(--ink-3)"}
                strokeWidth="0.7"
              />
            );
          })}
        </g>

        {/* the core */}
        <circle r="60" fill="url(#core-inner)" opacity="0.9" />
        <circle r="28" fill="var(--accent-bright)" />
        <circle r="14" fill="#fff" opacity="0.95" />

        {/* connective chords */}
        <g opacity="0.25" stroke="var(--accent)" strokeWidth="0.5" fill="none">
          <path d="M 0 -120 Q 90 -50 180 0" />
          <path d="M 180 0 Q 50 90 0 250" />
          <path d="M 0 250 Q -180 130 -320 90" />
          <path d="M -320 90 Q -140 -80 0 -120" />
        </g>

        {/* label ticks around the outer ring */}
        <g opacity="0.5" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink-3)" letterSpacing="0.15em">
          <text x="0" y="-360" textAnchor="middle">MATH</text>
          <text x="360" y="0" textAnchor="middle">CODE</text>
          <text x="0" y="370" textAnchor="middle">MIND</text>
          <text x="-360" y="0" textAnchor="middle">SHIP</text>
        </g>
      </svg>

      {/* soft light source top-left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 20%, oklch(100% 0 0 / 0.08), transparent 60%)",
        }}
      />
    </div>
  );
}
