// Atlas icon set — cartographic instrument engravings.
// One visual language: 24×24 grid, 1.6px stroke, round caps, currentColor.

import * as React from "react";

type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

function Svg({
  size = 18,
  strokeWidth = 1.6,
  className = "",
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Compass rose — orientation, the reading path. */
export function IconCompass(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 5.6 13.7 10.3 18.4 12 13.7 13.7 12 18.4 10.3 13.7 5.6 12 10.3 10.3 Z" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Sextant — measurement, derivations. */
export function IconSextant(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="5" r="1.5" />
      <path d="M10.9 6 5 16.5M13.1 6 19 16.5" />
      <path d="M5 16.5a9.7 9.7 0 0 0 14 0" />
      <path d="M12 6.5v3.2" />
      <path d="M7.4 18.4l-.5 1.4M12 19.4v1.5M16.6 18.4l.5 1.4" />
    </Svg>
  );
}

/** Orbit rings — systems in motion, the living page. */
export function IconOrbit(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="3.4" />
      <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(-18 12 12)" />
      <circle cx="20.2" cy="8.4" r="1.2" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Plumb line — first principles, what everything hangs from. */
export function IconPlumb(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7.5 3.5h9" />
      <path d="M12 3.5v8" />
      <path d="M12 11.5 15.2 15 12 20.5 8.8 15 Z" />
    </Svg>
  );
}

/** Meridian globe — the whole map, all volumes. */
export function IconMeridian(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4.2" ry="9" />
      <path d="M3 12h18" />
    </Svg>
  );
}

/** Bolt — runnable, live compute. */
export function IconBolt(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M13.2 3 6 13.6h4.6L10.8 21 18 10.4h-4.6L13.2 3Z" />
    </Svg>
  );
}

/** Telemetry wave — live signal. */
export function IconWave(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M2.5 12c1.6-4.6 3.2-4.6 4.8 0s3.2 4.6 4.8 0 3.2-4.6 4.8 0 3.2 4.6 4.6 0" />
    </Svg>
  );
}

/** Command key — the front door. */
export function IconCommand(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
    </Svg>
  );
}

/** Plotted line — evidence, the chart that appears. */
export function IconGraph(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 4v16h16" />
      <path d="M7.5 15.5l4-5 3 2.5 5-6.5" />
      <circle cx="19.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Open folio — the reading surface. */
export function IconFolio(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 6.6C10.2 4.9 7.2 4.5 4 5v13.4c3.2-.5 6.2-.1 8 1.6 1.8-1.7 4.8-2.1 8-1.6V5c-3.2-.5-6.2-.1-8 1.6Z" />
      <path d="M12 6.6V20" />
    </Svg>
  );
}

/** Target — the practice surface, the proving ground. */
export function IconTarget(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.8" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Flame — streak. */
export function IconFlame(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3.5c.6 3-3.4 4.7-3.4 8.6a5.4 5.4 0 0 0 10.8 0c0-2.3-1-4.3-2.6-5.7.1 1.7-.6 2.7-1.6 3.1.4-2.4-1-5.2-3.2-6Z" />
    </Svg>
  );
}

/** Resume — pick the thread back up. */
export function IconResume(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4.5 12a7.5 7.5 0 1 1 2.2 5.3" />
      <path d="M7.6 20.2l-.9-2.9 2.9-.9" />
      <path d="M10.6 9.4 15 12l-4.4 2.6Z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** North-east arrow — outbound / enter. */
export function IconArrowNE(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 17 17 7" />
      <path d="M9.5 7H17v7.5" />
    </Svg>
  );
}

/** Right arrow. */
export function IconArrowR(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 12h15" />
      <path d="M13.5 6.5 19 12l-5.5 5.5" />
    </Svg>
  );
}

/** Magnifier — search. */
export function IconSearch(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </Svg>
  );
}
