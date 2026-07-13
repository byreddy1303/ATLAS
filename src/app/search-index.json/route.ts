// Static search index — prerendered at build, fresh in dev.
// Replaces the planned scripts/build-search-index.mjs: no manual step,
// the index can never drift from curriculum.ts or the content tree.

import { allTopicPaths } from "@/curriculum/curriculum";
import { readTopicMdx } from "@/lib/content";
import { FLAGSHIP_SLUGS } from "@/curriculum/flagship";

export const dynamic = "force-static";

export type ChapterDoc = {
  id: string;
  type: "chapter";
  title: string;
  desc: string;
  body: string;
  url: string;
  vol: string;
  volTitle: string;
  phase: string;
  status: "written" | "outline";
  flagship: boolean;
  core: boolean;
};

export type SectionDoc = {
  id: string;
  type: "section";
  title: string;
  body: string;
  chapter: string;
  url: string;
  vol: string;
};

/** mirrors github-slugger closely enough for rehype-slug anchors */
function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function stripMdx(src: string): string {
  return src
    .replace(/^---[\s\S]*?---/, "")
    .replace(/^export const \w+ = `[\s\S]*?`;?\s*$/gm, "")
    .replace(/^(import|export)\s[^\n]*$/gm, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\{[^{}]*\}/g, " ")
    .replace(/[#>*_`$\\]/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET() {
  const chapters: ChapterDoc[] = [];
  const sections: SectionDoc[] = [];

  for (const tp of allTopicPaths()) {
    const url = `/learn/${tp.urlSlugParts.join("/")}`;
    const raw = tp.topic.status === "written" ? await readTopicMdx(tp) : null;

    chapters.push({
      id: url,
      type: "chapter",
      title: tp.topic.title,
      desc: tp.topic.description,
      body: [tp.topic.description, ...tp.topic.syllabusBullets].join(" "),
      url,
      vol: tp.tier.numeral,
      volTitle: tp.tier.title,
      phase: `${tp.phase.id} · ${tp.phase.title}`,
      status: tp.topic.status,
      flagship: FLAGSHIP_SLUGS.has(tp.topic.slug),
      core: tp.topic.priority === "core",
    });

    if (!raw) continue;

    const headingRe = /^#{2,3}\s+(.+)$/gm;
    let match: RegExpExecArray | null;
    const found: { title: string; start: number; end: number }[] = [];
    while ((match = headingRe.exec(raw)) !== null) {
      if (found.length) found[found.length - 1].end = match.index;
      found.push({
        title: match[1].replace(/[#*`$]/g, "").trim(),
        start: match.index + match[0].length,
        end: raw.length,
      });
    }
    for (const h of found) {
      const body = stripMdx(raw.slice(h.start, h.end)).slice(0, 220);
      sections.push({
        id: `${url}#${slugify(h.title)}`,
        type: "section",
        title: h.title,
        body,
        chapter: tp.topic.title,
        url: `${url}#${slugify(h.title)}`,
        vol: tp.tier.numeral,
      });
    }
  }

  return Response.json({ chapters, sections, builtAt: Date.now() });
}
