"use client";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#0d0d10",
          color: "#f4f4f0",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 680, width: "100%" }}>
          <div
            style={{
              fontFamily:
                "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8a8a82",
            }}
          >
            § global fault
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              lineHeight: 1.05,
              margin: "20px 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            The root layout crashed.
          </h1>
          <p style={{ color: "#c9c9c1", lineHeight: 1.6, margin: "0 0 24px" }}>
            An error escaped every route boundary and reached the shell. This is
            usually a hydration mismatch or a broken provider in the layout.
          </p>
          {error.message ? (
            <pre
              style={{
                background: "#181820",
                border: "1px solid #2a2a35",
                borderRadius: 6,
                padding: 16,
                fontSize: 12.5,
                color: "#c9c9c1",
                overflow: "auto",
                margin: "0 0 24px",
              }}
            >
              {error.message}
              {error.digest ? `\n\ndigest: ${error.digest}` : ""}
            </pre>
          ) : null}
          <button
            type="button"
            onClick={() => unstable_retry()}
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid #2a2a35",
              background: "#181820",
              color: "#f4f4f0",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ↻ Retry
          </button>
        </div>
      </body>
    </html>
  );
}
