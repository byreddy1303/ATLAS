"use client";

/**
 * Living hero glyph. Three concentric orbits of nodes rotate at
 * different speeds. All motion runs on CSS keyframes (compositor),
 * so it costs nothing on the JS main thread — 60fps by default.
 */
export function HeroOrbit({ size = 480 }: { size?: number }) {
  const cx = size / 2;
  const cy = size / 2;

  const orbits = [
    { r: size * 0.42, klass: "atlas-orbit-a", nodes: 3, phase: 0, color: "var(--lime)" },
    { r: size * 0.3, klass: "atlas-orbit-b", nodes: 5, phase: 30, color: "oklch(70% 0.19 288)" },
    { r: size * 0.18, klass: "atlas-orbit-c", nodes: 2, phase: 60, color: "oklch(74% 0.19 340)" },
  ];

  return (
    <div className="relative aspect-square w-full max-w-[560px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, oklch(from var(--lime) l c h / 0.14) 0%, transparent 60%)",
          filter: "blur(20px)",
        }}
      />
      <svg viewBox={`0 0 ${size} ${size}`} className="relative h-full w-full">
        {/* faint tick ring */}
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * (360 / 60) * Math.PI) / 180;
          const rIn = size * 0.48;
          const rOut = i % 5 === 0 ? size * 0.5 : size * 0.49;
          return (
            <line
              key={i}
              x1={cx + Math.cos(a) * rIn}
              y1={cy + Math.sin(a) * rIn}
              x2={cx + Math.cos(a) * rOut}
              y2={cy + Math.sin(a) * rOut}
              stroke="var(--line-2)"
              strokeWidth={i % 5 === 0 ? 1 : 0.5}
              opacity={i % 5 === 0 ? 0.7 : 0.35}
            />
          );
        })}

        {orbits.map((o, i) => (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={o.r}
              fill="none"
              stroke="var(--line)"
              strokeWidth={1}
              strokeDasharray="2 5"
              opacity={0.7}
            />
            <g className={o.klass}>
              {Array.from({ length: o.nodes }).map((_, k) => {
                const a = (k * (360 / o.nodes) + o.phase) * (Math.PI / 180);
                const x = cx + Math.cos(a) * o.r;
                const y = cy + Math.sin(a) * o.r;
                return (
                  <g key={k}>
                    <circle cx={x} cy={y} r={7} fill={o.color} opacity={0.28} />
                    <circle cx={x} cy={y} r={3.6} fill={o.color} />
                  </g>
                );
              })}
            </g>
          </g>
        ))}

        {/* central "sun" pulses via CSS */}
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={14}
            fill="var(--lime)"
            className="hero-orbit-pulse-outer"
            opacity={0.28}
          />
          <circle cx={cx} cy={cy} r={7} fill="var(--lime)" className="hero-orbit-pulse-inner" />
        </g>

        <text
          x={cx}
          y={size - 24}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={11}
          fill="var(--ink-3)"
          letterSpacing={2}
        >
          MMXXVI · ATLAS · vol. 0 → VI
        </text>
      </svg>
    </div>
  );
}
