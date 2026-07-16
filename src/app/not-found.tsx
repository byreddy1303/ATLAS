import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip bg-bg text-ink">
      <div className="mesh-bg">
        <div className="mesh-blob mesh-a" />
        <div className="mesh-blob mesh-b" />
      </div>
      <div className="grid-overlay" />

      <header className="nav-bar">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-3 text-ink-2 hover:text-ink">
            <span className="text-[15px] font-bold tracking-tight">Atlas</span>
            <span className="text-ink-3">/</span>
            <span className="label-mono">Off-map</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-1 flex-col justify-center px-6 py-24 md:px-10">
        <div className="chapter-mark">
          <span className="no">404</span>
          <span className="rule" />
          <span className="no !text-ink-3">not on the atlas</span>
        </div>

        <h1 className="hero-display mt-8 text-[clamp(2.6rem,7vw,6rem)]">
          This <span className="em">page</span> isn&rsquo;t part of the volume.
        </h1>

        <p className="prose-editorial mt-6 max-w-[62ch]">
          Either the URL is bent out of shape or the chapter hasn&rsquo;t been drawn yet.
          Head back to the frontispiece and pick a route from the atlas.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="pill">
            ← Frontispiece
          </Link>
          <Link href="/tier/foundations" className="pill">
            Volume 0 · Foundations
          </Link>
        </div>
      </main>
    </div>
  );
}
