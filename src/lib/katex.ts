// Server-side KaTeX → HTML. Keeps katex JS out of the client bundle:
// pages render formulas at build time and pass HTML strings to client
// components that dangerouslySetInnerHTML them (trusted, self-authored TeX).

import katex from "katex";

export function tex(src: string, displayMode = false): string {
  return katex.renderToString(src, {
    displayMode,
    throwOnError: false,
    output: "html",
  });
}
