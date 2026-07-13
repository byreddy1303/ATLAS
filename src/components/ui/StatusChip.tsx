// Status glyph vocabulary — one chip language across nav, cards,
// chapter headers and the palette. Monospace, engraved, terse.

const KINDS = {
  written: { glyph: "●", label: "written", cls: "chip-written" },
  outline: { glyph: "○", label: "outline", cls: "chip-outline" },
  flagship: { glyph: "▲", label: "flagship", cls: "chip-flagship" },
  runnable: { glyph: "◆", label: "runnable", cls: "chip-runnable" },
  core: { glyph: "▮", label: "core", cls: "chip-core" },
  live: { glyph: "", label: "live", cls: "chip-live" },
} as const;

export type ChipKind = keyof typeof KINDS;

export function StatusChip({
  kind,
  label,
  size = "md",
  className = "",
}: {
  kind: ChipKind;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const k = KINDS[kind];
  return (
    <span className={`status-chip ${k.cls} ${className}`} data-size={size}>
      {kind === "live" ? (
        <span className="live-dot !h-[6px] !w-[6px]" />
      ) : (
        <span className="glyph" aria-hidden>
          {k.glyph}
        </span>
      )}
      {label ?? k.label}
    </span>
  );
}
