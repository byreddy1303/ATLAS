"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
            <span className="label-mono">Render fault</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-1 flex-col justify-center px-6 py-24 md:px-10">
        <div className="chapter-mark">
          <span className="no">§ err</span>
          <span className="rule" />
          <span className="no !text-ink-3">a page threw</span>
        </div>

        <h1 className="hero-display mt-8 text-[clamp(2.6rem,7vw,6rem)]">
          Something <span className="em">threw</span> while rendering.
        </h1>

        <p className="prose-editorial mt-6 max-w-[62ch]">
          The route hit an error before it could finish laying out. It&rsquo;s almost always
          a stale build artefact or a fresh code change that the server hasn&rsquo;t caught up
          to. Retry the segment first; refresh full-page if that fails.
        </p>

        {error.message ? (
          <pre className="mt-8 max-w-[80ch] overflow-x-auto rounded-md border border-line bg-bg-2 p-4 text-[12.5px] leading-relaxed text-ink-2">
            {error.message}
            {error.digest ? `\n\ndigest: ${error.digest}` : ""}
          </pre>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={() => unstable_retry()} className="pill">
            ↻ Retry this segment
          </button>
          <Link href="/" className="pill">
            ← Frontispiece
          </Link>
        </div>
      </main>
    </div>
  );
}
