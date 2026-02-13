import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export interface CmsArticle {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  publishedAt: string;
  readingTimeMinutes: number;
  content: string;
  sourcePath: string;
}

const DEFAULT_OBSIDIAN_DIR =
  "/Users/zeyuansun/Documents/Obsidian Vault/BiotechSite";
const REPO_CONTENT_DIR = path.join(process.cwd(), "content/articles");

function getArticleDirs(): string[] {
  const configuredDir = process.env.OBSIDIAN_ARTICLES_DIR?.trim();
  const dirs = [configuredDir || DEFAULT_OBSIDIAN_DIR, REPO_CONTENT_DIR];
  return [...new Set(dirs.filter(Boolean))];
}

function normalizeDate(input: string): string | null {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function toSlug(name: string): string {
  const normalized = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);

  if (normalized.length >= 3) return normalized;

  const digest = createHash("sha1").update(name).digest("hex").slice(0, 12);
  return `post-${digest}`;
}

function parseFrontmatter(raw: string): {
  fields: Record<string, string>;
  body: string;
} {
  if (!raw.startsWith("---\n")) {
    return { fields: {}, body: raw.trim() };
  }

  const endMarker = "\n---\n";
  const endIndex = raw.indexOf(endMarker, 4);
  if (endIndex === -1) {
    return { fields: {}, body: raw.trim() };
  }

  const frontmatterText = raw.slice(4, endIndex).trim();
  const body = raw.slice(endIndex + endMarker.length).trim();
  const fields: Record<string, string> = {};

  for (const line of frontmatterText.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    if (!key) continue;
    fields[key] = value.replace(/^['\"]|['\"]$/g, "");
  }

  return { fields, body };
}

function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(markdown: string, fallbackTitle: string): string {
  const paragraphs = markdown
    .split(/\n{2,}/)
    .map((part) => stripMarkdown(part))
    .filter(Boolean);

  const candidate = paragraphs[0] || fallbackTitle;
  return candidate.length > 140 ? `${candidate.slice(0, 140)}...` : candidate;
}

function getReadingTime(markdown: string): number {
  const plain = stripMarkdown(markdown);
  const chineseChars = (plain.match(/[\u4e00-\u9fff]/g) || []).length;
  const latinWords = plain
    .replace(/[\u4e00-\u9fff]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = chineseChars / 320 + latinWords / 200;
  return Math.max(1, Math.round(minutes));
}

async function loadMarkdownFile(filePath: string): Promise<CmsArticle | null> {
  const fileName = path.basename(filePath);
  const stem = fileName.replace(/\.(md|markdown)$/i, "").trim();
  if (!stem) return null;

  const [raw, stats] = await Promise.all([
    fs.readFile(filePath, "utf8"),
    fs.stat(filePath),
  ]);

  const { fields, body } = parseFrontmatter(raw);
  const title = fields.title || stem;
  const normalizedDate =
    normalizeDate(fields.date || fields.publishedAt || "") ||
    stats.mtime.toISOString().slice(0, 10);

  const tags = (fields.tags || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const content = body || raw.trim();

  return {
    slug: fields.slug || toSlug(stem),
    title,
    excerpt: fields.summary || getExcerpt(content, title),
    tag: fields.tag || tags[0] || "研报",
    publishedAt: normalizedDate,
    readingTimeMinutes:
      Number.parseInt(fields.readingTimeMinutes || "", 10) ||
      getReadingTime(content),
    content,
    sourcePath: filePath,
  };
}

async function loadArticlesFromDir(dirPath: string): Promise<CmsArticle[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const files = entries
      .filter((entry) => entry.isFile() && /\.(md|markdown)$/i.test(entry.name))
      .map((entry) => path.join(dirPath, entry.name));

    const results = await Promise.all(files.map(loadMarkdownFile));
    return results.filter((item): item is CmsArticle => item !== null);
  } catch {
    return [];
  }
}

export async function getAllArticles(): Promise<CmsArticle[]> {
  const seen = new Set<string>();
  const output: CmsArticle[] = [];

  for (const dir of getArticleDirs()) {
    const articles = await loadArticlesFromDir(dir);
    for (const article of articles) {
      if (seen.has(article.slug)) continue;
      seen.add(article.slug);
      output.push(article);
    }
  }

  return output.sort((a, b) =>
    b.publishedAt === a.publishedAt
      ? a.title.localeCompare(b.title, "zh-CN")
      : b.publishedAt.localeCompare(a.publishedAt)
  );
}

export async function getArticleBySlug(slug: string): Promise<CmsArticle | undefined> {
  const articles = await getAllArticles();
  return articles.find((article) => article.slug === slug);
}
