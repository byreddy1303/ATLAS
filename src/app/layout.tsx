import type { Metadata } from "next";
import { Manrope, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import { ProgressProvider } from "@/lib/progress";
import { SmoothScroll } from "@/lib/smooth-scroll";
import { CursorHalo } from "@/components/ambient/LivingBackground";
import { CommandPalette } from "@/components/palette/CommandPalette";
import { CURRICULUM, tierCounts } from "@/curriculum/curriculum";

const PALETTE_VOLUMES = CURRICULUM.map((t) => ({
  numeral: t.numeral,
  title: t.title,
  slug: t.slug,
  topics: tierCounts(t).topics,
}));

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atlas · Data Science → Gen AI",
  description:
    "A hand-crafted, multi-angle field manual for the road from Python to production-grade Generative AI. Built for the beginner mind.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${instrument.variable} ${jetbrains.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ProgressProvider>
            <SmoothScroll>
              <CursorHalo />
              <CommandPalette volumes={PALETTE_VOLUMES} />
              {children}
            </SmoothScroll>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
