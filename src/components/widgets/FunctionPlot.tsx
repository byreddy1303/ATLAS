"use client";

import * as React from "react";
import { useMemo, useState } from "react";

type Sample = { x: number; y: number };

function samples(
  f: (x: number) => number,
  xMin: number,
  xMax: number,
  n = 200,
): Sample[] {
  const out: Sample[] = [];
  const dx = (xMax - xMin) / (n - 1);
  for (let i = 0; i < n; i++) {
    const x = xMin + i * dx;
    const y = f(x);
    if (Number.isFinite(y)) out.push({ x, y });
  }
  return out;
}

export function FunctionPlot({
  fn = (x: number) => x * x,
  xMin = -3,
  xMax = 3,
  yMin,
  yMax,
  height = 260,
  label,
}: {
  fn?: (x: number) => number;
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  height?: number;
  label?: string;
}) {
  const pts = useMemo(() => samples(fn, xMin, xMax), [fn, xMin, xMax]);
  const ys = pts.map((p) => p.y);
  const yMinAuto = yMin ?? Math.min(...ys);
  const yMaxAuto = yMax ?? Math.max(...ys);
  const w = 600;
  const h = height;
  const pad = 32;
  const sx = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (w - 2 * pad);
  const sy = (y: number) =>
    h - pad - ((y - yMinAuto) / (yMaxAuto - yMinAuto)) * (h - 2 * pad);
  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.x)},${sy(p.y)}`)
    .join(" ");
  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-line bg-bg-2 p-4">
      {label && <div className="label-mono mb-2">{label}</div>}
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
        {/* grid */}
        {Array.from({ length: 6 }).map((_, i) => {
          const y = pad + (i * (h - 2 * pad)) / 5;
          return (
            <line
              key={"h" + i}
              x1={pad}
              y1={y}
              x2={w - pad}
              y2={y}
              stroke="var(--line)"
              strokeWidth={0.5}
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = pad + (i * (w - 2 * pad)) / 7;
          return (
            <line
              key={"v" + i}
              x1={x}
              y1={pad}
              x2={x}
              y2={h - pad}
              stroke="var(--line)"
              strokeWidth={0.5}
            />
          );
        })}
        {/* axes */}
        <line
          x1={pad}
          y1={sy(0)}
          x2={w - pad}
          y2={sy(0)}
          stroke="var(--line-2)"
        />
        <line
          x1={sx(0)}
          y1={pad}
          x2={sx(0)}
          y2={h - pad}
          stroke="var(--line-2)"
        />
        {/* curve */}
        <path d={path} stroke="var(--lime)" strokeWidth={2} fill="none" />
      </svg>
    </div>
  );
}

/* Interactive vector playground: two draggable vectors, live sum + dot product. */
export function VectorPlayground({
  initial = [
    { x: 2, y: 1, color: "var(--lime)", label: "a" },
    { x: 1, y: 2, color: "oklch(74% 0.19 340)", label: "b" },
  ],
  mode = "angle",
}: {
  initial?: { x: number; y: number; color: string; label: string }[];
  mode?: "angle" | "sum";
}) {
  const [vecs, setVecs] = useState(initial);
  const dragging = React.useRef<number | null>(null);

  const w = 520;
  const h = 360;
  const cx = w / 2;
  const cy = h / 2;
  const scale = 40;

  const sx = (x: number) => cx + x * scale;
  const sy = (y: number) => cy - y * scale;
  const inv = (px: number, py: number) => ({
    x: (px - cx) / scale,
    y: (cy - py) / scale,
  });

  const onDown = (i: number) => (e: React.PointerEvent) => {
    dragging.current = i;
    (e.currentTarget as SVGElement).setPointerCapture(e.pointerId);
  };
  const onUp = (e: React.PointerEvent) => {
    dragging.current = null;
    (e.currentTarget as SVGElement).releasePointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (dragging.current === null) return;
    const box = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - box.left) / box.width) * w;
    const py = ((e.clientY - box.top) / box.height) * h;
    const p = inv(px, py);
    setVecs((prev) =>
      prev.map((v, i) =>
        i === dragging.current
          ? {
              ...v,
              x: +Math.round(p.x * 10) / 10,
              y: +Math.round(p.y * 10) / 10,
            }
          : v,
      ),
    );
  };

  const a = vecs[0];
  const b = vecs[1];
  const dot = a.x * b.x + a.y * b.y;
  const na = Math.hypot(a.x, a.y);
  const nb = Math.hypot(b.x, b.y);
  const cos = na && nb ? dot / (na * nb) : 0;
  const deg = (Math.acos(Math.max(-1, Math.min(1, cos))) * 180) / Math.PI;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-line bg-bg-2">
      <div className="flex flex-wrap items-center gap-4 border-b border-line px-4 py-3">
        <span className="pill pill-lime !py-[3px] !px-[8px] !text-[10px]">
          Vector playground
        </span>
        <span className="label-mono">drag the tips</span>
        <div className="ml-auto flex flex-wrap items-center gap-4 text-[12.5px] text-ink-2">
          {mode === "sum" ? (
            <>
              <span>a + b = <span className="tabular text-lime">({(a.x + b.x).toFixed(1)}, {(a.y + b.y).toFixed(1)})</span></span>
              <span>a − b = <span className="tabular text-ink">({(a.x - b.x).toFixed(1)}, {(a.y - b.y).toFixed(1)})</span></span>
            </>
          ) : (
            <>
              <span>a·b = <span className="tabular text-ink">{dot.toFixed(2)}</span></span>
              <span>‖a‖ = <span className="tabular text-ink">{na.toFixed(2)}</span></span>
              <span>‖b‖ = <span className="tabular text-ink">{nb.toFixed(2)}</span></span>
              <span>cos θ = <span className="tabular text-lime">{cos.toFixed(3)}</span></span>
              <span>θ ≈ <span className="tabular text-lime">{deg.toFixed(1)}°</span></span>
            </>
          )}
        </div>
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full touch-none select-none"
        onPointerMove={onMove}
        onPointerUp={onUp}
      >
        {/* grid */}
        {Array.from({ length: 13 }).map((_, i) => {
          const p = (i - 6) * scale;
          return (
            <g key={i} stroke="var(--line)" strokeWidth={0.5}>
              <line x1={cx + p} y1={0} x2={cx + p} y2={h} />
              <line x1={0} y1={cy + p} x2={w} y2={cy + p} />
            </g>
          );
        })}
        <line x1={0} y1={cy} x2={w} y2={cy} stroke="var(--line-2)" />
        <line x1={cx} y1={0} x2={cx} y2={h} stroke="var(--line-2)" />

        {mode === "sum" && (
          <g>
            <line x1={sx(a.x)} y1={sy(a.y)} x2={sx(a.x + b.x)} y2={sy(a.y + b.y)} stroke="oklch(74% 0.19 340)" strokeWidth={1.5} strokeDasharray="5 5" opacity={0.6} />
            <line x1={sx(b.x)} y1={sy(b.y)} x2={sx(a.x + b.x)} y2={sy(a.y + b.y)} stroke="var(--lime)" strokeWidth={1.5} strokeDasharray="5 5" opacity={0.6} />
            <line x1={sx(0)} y1={sy(0)} x2={sx(a.x + b.x)} y2={sy(a.y + b.y)} stroke="oklch(85% 0.15 95)" strokeWidth={2.5} />
            <circle cx={sx(a.x + b.x)} cy={sy(a.y + b.y)} r={5} fill="oklch(85% 0.15 95)" />
            <text x={sx(a.x + b.x) + 12} y={sy(a.y + b.y) + 14} fill="oklch(85% 0.15 95)" fontFamily="var(--font-mono)" fontSize={12}>
              a+b ({(a.x + b.x).toFixed(1)}, {(a.y + b.y).toFixed(1)})
            </text>
          </g>
        )}

        {/* vectors */}
        {vecs.map((v, i) => (
          <g key={v.label}>
            <line
              x1={sx(0)}
              y1={sy(0)}
              x2={sx(v.x)}
              y2={sy(v.y)}
              stroke={v.color}
              strokeWidth={2.5}
            />
            <circle
              cx={sx(v.x)}
              cy={sy(v.y)}
              r={9}
              fill={v.color}
              onPointerDown={onDown(i)}
              style={{ cursor: "grab" }}
            />
            <text
              x={sx(v.x) + 12}
              y={sy(v.y) - 8}
              fill="var(--ink)"
              fontFamily="var(--font-mono)"
              fontSize={12}
            >
              {v.label} ({v.x.toFixed(1)}, {v.y.toFixed(1)})
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* GradientDescentLab: 1-D quadratic, draggable start, adjustable learning rate */
export function GradientDescentLab({
  fnLabel = "f(x) = x² − 2x + 3",
  fn = (x: number) => x * x - 2 * x + 3,
  grad = (x: number) => 2 * x - 2,
}: {
  fnLabel?: string;
  fn?: (x: number) => number;
  grad?: (x: number) => number;
}) {
  const [x0, setX0] = useState(3.5);
  const [lr, setLr] = useState(0.15);
  const [steps, setSteps] = useState(15);

  const path = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    let x = x0;
    for (let i = 0; i < steps; i++) {
      out.push({ x, y: fn(x) });
      x = x - lr * grad(x);
    }
    return out;
  }, [x0, lr, steps, fn, grad]);

  const w = 600;
  const h = 340;
  const xMin = -3;
  const xMax = 5;
  const curve = useMemo(() => samples(fn, xMin, xMax), [fn]);
  const yMin = Math.min(...curve.map((p) => p.y)) - 0.5;
  const yMax = Math.max(...curve.map((p) => p.y)) + 0.5;
  const pad = 32;
  const sx = (x: number) => pad + ((x - xMin) / (xMax - xMin)) * (w - 2 * pad);
  const sy = (y: number) => h - pad - ((y - yMin) / (yMax - yMin)) * (h - 2 * pad);
  const curvePath = curve
    .map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.x)},${sy(p.y)}`)
    .join(" ");

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-line bg-bg-2">
      <div className="flex flex-wrap items-center gap-4 border-b border-line px-4 py-3">
        <span className="pill pill-lime !py-[3px] !px-[8px] !text-[10px]">
          Gradient descent lab
        </span>
        <span className="label-mono !text-ink-2">{fnLabel}</span>
      </div>
      <div className="grid gap-4 p-4 md:grid-cols-[1fr_220px]">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
          {Array.from({ length: 6 }).map((_, i) => {
            const y = pad + (i * (h - 2 * pad)) / 5;
            return (
              <line
                key={"h" + i}
                x1={pad}
                y1={y}
                x2={w - pad}
                y2={y}
                stroke="var(--line)"
                strokeWidth={0.5}
              />
            );
          })}
          <line
            x1={pad}
            y1={sy(0)}
            x2={w - pad}
            y2={sy(0)}
            stroke="var(--line-2)"
          />
          <path d={curvePath} stroke="var(--lime)" strokeWidth={2} fill="none" />
          {/* trajectory */}
          {path.map((p, i) => (
            <g key={i}>
              <circle
                cx={sx(p.x)}
                cy={sy(p.y)}
                r={5}
                fill={i === 0 ? "var(--ink)" : "oklch(74% 0.19 340)"}
              />
              {i < path.length - 1 && (
                <line
                  x1={sx(p.x)}
                  y1={sy(p.y)}
                  x2={sx(path[i + 1].x)}
                  y2={sy(path[i + 1].y)}
                  stroke="oklch(74% 0.19 340 / 0.6)"
                  strokeDasharray="2 3"
                />
              )}
            </g>
          ))}
        </svg>

        <div className="space-y-4 text-[13px] text-ink-2">
          <Slider label="Start x₀" value={x0} min={-2.5} max={5} step={0.1} onChange={setX0} />
          <Slider label="Learning rate η" value={lr} min={0.01} max={1.1} step={0.01} onChange={setLr} />
          <Slider label="Steps" value={steps} min={2} max={40} step={1} onChange={setSteps} />
          <div className="rounded-lg border border-line bg-bg p-3 text-[12px]">
            <div className="label-mono mb-1">Final</div>
            <div className="tabular text-ink">
              x = {path[path.length - 1].x.toFixed(3)}
            </div>
            <div className="tabular text-ink-2">
              f(x) = {path[path.length - 1].y.toFixed(3)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="label-mono !text-[10px]">{label}</span>
        <span className="tabular font-mono text-[12px] text-ink">
          {value.toFixed(step < 1 ? 2 : 0)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full accent-lime"
      />
    </div>
  );
}
