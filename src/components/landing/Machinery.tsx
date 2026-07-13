// Under the hood — the ACTUAL pedagogy components rendered live on the
// landing page with real dot-product content, each annotated with the
// MDX tag authors write. Server component; KaTeX rendered at build time.

import { Motivation, Recall, Angle, Derivation, Step } from "@/components/pedagogy/static";
import { RunnableCode } from "@/components/code/RunnableCode";
import { tex } from "@/lib/katex";

function K({ t, block = false }: { t: string; block?: boolean }) {
  return (
    <span
      className={block ? "katex-block" : undefined}
      dangerouslySetInnerHTML={{ __html: tex(t, block) }}
    />
  );
}

function TagLabel({ tag }: { tag: string }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span
        className="rounded-md border px-2 py-[3px] font-mono text-[10.5px] tracking-tight"
        style={{
          color: "var(--violet)",
          borderColor: "color-mix(in oklch, var(--violet) 35%, transparent)",
          background: "color-mix(in oklch, var(--violet) 8%, transparent)",
        }}
      >
        {tag}
      </span>
      <span className="hr-mono flex-1 opacity-40" />
    </div>
  );
}

const TRY_CODE = `import numpy as np
import matplotlib.pyplot as plt

# three taste vectors: [action, romance, sci-fi] ratings 0-10
you    = np.array([9, 1, 8])
friend = np.array([8, 2, 9])
rando  = np.array([1, 9, 2])

def cosine(a, b):
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))

print(f"you vs friend -> {cosine(you, friend):.3f}   (same taste)")
print(f"you vs rando  -> {cosine(you, rando):.3f}   (opposite taste)")

# sweep every possible angle to see the whole curve
theta = np.linspace(0, np.pi, 200)
fig, ax = plt.subplots(figsize=(7.2, 3.4))
fig.patch.set_alpha(0)
ax.set_facecolor("none")
ax.plot(np.degrees(theta), np.cos(theta), color="#b8e62e", lw=2.4)
ax.axhline(0, color="#8a8f98", lw=0.7, ls="--")
for a, b, name, c in [(you, friend, "friend", "#b8e62e"), (you, rando, "rando", "#e05f8a")]:
    s = cosine(a, b)
    ax.scatter([np.degrees(np.arccos(s))], [s], s=55, color=c, zorder=3)
    ax.annotate(name, (np.degrees(np.arccos(s)), s), textcoords="offset points",
                xytext=(10, 6), color=c, fontsize=10)
for side in ["top", "right"]:
    ax.spines[side].set_visible(False)
for side in ["left", "bottom"]:
    ax.spines[side].set_color("#8a8f98")
ax.tick_params(colors="#8a8f98")
ax.set_xlabel("angle between taste vectors (deg)", color="#8a8f98")
ax.set_ylabel("cosine similarity", color="#8a8f98")
fig.tight_layout()`;

export function Machinery() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
      {/* left column — real pedagogy blocks, annotated */}
      <div className="min-w-0">
        <div>
          <TagLabel tag="<Motivation>" />
          <Motivation title="Why anyone invented the dot product">
            <p>
              A recommender needs one number that says &ldquo;these two people
              have similar taste.&rdquo; Taste lives in a list of numbers — a
              vector. The dot product is the machine that compresses two whole
              vectors into that single agreement score.
            </p>
          </Motivation>
        </div>

        <div className="-mt-4">
          <TagLabel tag='<Recall term="norm">' />
          <Recall term="Norm ‖a‖ — a vector's length">
            The norm is the Pythagorean length of a vector:{" "}
            <K t="\lVert \mathbf{a} \rVert = \sqrt{a_1^2 + a_2^2 + \cdots}" />.
            We re-explain this every single time it reappears — that&apos;s the
            rule of the atlas.
          </Recall>
        </div>

        <div className="mt-8">
          <TagLabel tag='<Angle type="geometric">' />
          <Angle type="geometric" title="One idea, seen from three sides">
            Two arrows pointing the same way have a small angle between them.
            The dot product secretly measures that angle — every idea in the
            atlas gets a story lens, a picture lens, and a symbols lens.
          </Angle>
        </div>

        <div className="mt-8">
          <TagLabel tag="<Derivation> + <Step>" />
          <Derivation title="No line skipped, ever">
            <Step n={1} math={<K t="\cos\theta = \dfrac{\mathbf{a}\cdot\mathbf{b}}{\lVert\mathbf{a}\rVert\,\lVert\mathbf{b}\rVert}" />}>
              Divide the raw dot product by both lengths — this strips away
              &ldquo;how big&rdquo; and keeps only &ldquo;which direction.&rdquo;
            </Step>
            <Step n={2} math={<K t="-1 \;\le\; \cos\theta \;\le\; 1" />}>
              The result is trapped in this range (Cauchy–Schwarz — proved in
              the chapter, not waved at).
            </Step>
          </Derivation>
        </div>
      </div>

      {/* right column — the live cell */}
      <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <TagLabel tag="<RunnableCode captureFig>" />
        <div className="rounded-2xl border border-line bg-bg-2 p-1.5">
          <RunnableCode
            title="cosine similarity — edit it, then hit run"
            packages={["numpy", "matplotlib"]}
            captureFig
            code={TRY_CODE}
          />
        </div>
        <p className="mt-3 flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-3">
          <span className="mt-[3px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
          Real Python (numpy + matplotlib) running in your browser via
          WebAssembly — the first run downloads the interpreter (~10s), then
          it&apos;s instant. Every chapter has cells like this.
        </p>
      </div>
    </div>
  );
}
