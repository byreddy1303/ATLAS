import fs from "node:fs/promises";
import path from "node:path";
import { existsSync } from "node:fs";
import { CURRICULUM, type TopicPath, allTopicPaths } from "@/curriculum/curriculum";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export function contentPathFor(tp: TopicPath): string {
  return path.join(CONTENT_ROOT, tp.filePath);
}

export function contentExists(tp: TopicPath): boolean {
  return existsSync(contentPathFor(tp));
}

export async function readTopicMdx(tp: TopicPath): Promise<string | null> {
  try {
    return await fs.readFile(contentPathFor(tp), "utf8");
  } catch {
    return null;
  }
}

export function slugForProgress(tp: TopicPath): string {
  return tp.urlSlugParts.join("/");
}

export function tierBySlug(slug: string) {
  return CURRICULUM.find((t) => t.slug === slug);
}

export function allTopicSlugParams() {
  return allTopicPaths().map((tp) => ({ slug: tp.urlSlugParts }));
}
