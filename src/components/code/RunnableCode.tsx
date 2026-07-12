"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

type PyodideAPI = {
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackagesFromImports: (code: string) => Promise<void>;
  globals: { get: (k: string) => unknown };
  setStdout: (opts: { batched: (s: string) => void }) => void;
  setStderr: (opts: { batched: (s: string) => void }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (opts?: unknown) => Promise<PyodideAPI>;
    __ATLAS_PYODIDE__?: Promise<PyodideAPI>;
  }
}

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
const PYODIDE_INDEX = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

async function getPyodide(): Promise<PyodideAPI> {
  if (window.__ATLAS_PYODIDE__) return window.__ATLAS_PYODIDE__;
  window.__ATLAS_PYODIDE__ = (async () => {
    await loadScript(PYODIDE_CDN);
    if (!window.loadPyodide) throw new Error("Pyodide did not attach");
    return window.loadPyodide({ indexURL: PYODIDE_INDEX });
  })();
  return window.__ATLAS_PYODIDE__;
}

export function RunnableCode({
  code: initialCode,
  children,
  title,
  packages = [],
  captureFig = false,
}: {
  code?: string;
  children?: React.ReactNode;
  title?: string;
  packages?: string[];
  captureFig?: boolean;
}) {
  const raw =
    typeof initialCode === "string"
      ? initialCode
      : typeof children === "string"
      ? children
      : "";
  const [code, setCode] = useState((raw || "# no code provided").replace(/\n$/, ""));
  const [status, setStatus] = useState<"idle" | "loading" | "running" | "ok" | "err">("idle");
  const [output, setOutput] = useState<string>("");
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);
  const stdoutRef = useRef<string>("");

  async function run() {
    setStatus("loading");
    setOutput("");
    setPngDataUrl(null);
    stdoutRef.current = "";
    try {
      const py = await getPyodide();
      if (packages.length) {
        setOutput((o) => o + `» loading packages: ${packages.join(", ")}\n`);
        const req = `import micropip\nawait micropip.install(${JSON.stringify(packages)})`;
        try {
          await py.runPythonAsync(req);
        } catch {
          /* micropip may fail for stdlib-only jobs; ignore */
        }
      }
      py.setStdout({ batched: (s) => (stdoutRef.current += s) });
      py.setStderr({ batched: (s) => (stdoutRef.current += s) });
      setStatus("running");
      await py.loadPackagesFromImports(code);
      let userCode = code;
      if (captureFig) {
        userCode = `import matplotlib\nmatplotlib.use('AGG')\nimport matplotlib.pyplot as plt\n${code}\nimport io, base64\n_buf = io.BytesIO()\nplt.gcf().savefig(_buf, format='png', bbox_inches='tight', dpi=140, facecolor='none')\nplt.close('all')\n_fig_b64 = base64.b64encode(_buf.getvalue()).decode()`;
      }
      await py.runPythonAsync(userCode);
      if (captureFig) {
        const b64 = py.globals.get("_fig_b64");
        if (typeof b64 === "string") setPngDataUrl(`data:image/png;base64,${b64}`);
      }
      setOutput(stdoutRef.current);
      setStatus("ok");
    } catch (e) {
      setOutput(stdoutRef.current + "\n" + (e as Error).message);
      setStatus("err");
    }
  }

  return (
    <div
      className="not-prose my-6 overflow-hidden rounded-2xl border border-line bg-bg-2"
      data-lenis-prevent
    >
      <div className="flex items-center justify-between border-b border-line bg-bg-3 px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-lime" />
          <span className="label-mono !text-[10.5px]">
            {title ?? "python · pyodide"}
          </span>
        </div>
        <button
          onClick={run}
          disabled={status === "loading" || status === "running"}
          className="cta-lime !py-1.5 !px-3 !text-[11.5px]"
        >
          {status === "loading"
            ? "Loading…"
            : status === "running"
            ? "Running…"
            : "▶ Run"}
        </button>
      </div>
      <CodeMirror
        value={code}
        extensions={[python()]}
        theme="dark"
        onChange={(v) => setCode(v)}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          foldGutter: false,
        }}
        style={{ fontSize: 13.5 }}
      />
      {(output || pngDataUrl) && (
        <div className="border-t border-line bg-bg p-4">
          {output && (
            <pre className="whitespace-pre-wrap break-words font-mono text-[12.5px] leading-relaxed text-ink-2">
              {output}
            </pre>
          )}
          {pngDataUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={pngDataUrl}
              alt="matplotlib output"
              className="mt-3 max-w-full rounded-lg border border-line"
            />
          )}
        </div>
      )}
    </div>
  );
}

/* Static code display (no run) */
export function CodeBlock({
  code,
  children,
  language = "python",
  title,
}: {
  code?: string;
  children?: React.ReactNode;
  language?: string;
  title?: string;
}) {
  const body =
    typeof code === "string"
      ? code
      : typeof children === "string"
      ? children
      : "";
  return (
    <div
      className="not-prose my-6 overflow-hidden rounded-2xl border border-line bg-bg-2"
      data-lenis-prevent
    >
      {title && (
        <div className="border-b border-line bg-bg-3 px-4 py-2">
          <span className="label-mono !text-[10.5px]">{title}</span>
        </div>
      )}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-ink">
        <code>{body}</code>
      </pre>
      <div className="border-t border-line bg-bg px-4 py-1.5 text-right">
        <span className="label-mono !text-[9px]">{language}</span>
      </div>
    </div>
  );
}
