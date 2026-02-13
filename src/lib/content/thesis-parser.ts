import matter from "gray-matter";

export type ThesisTone = "neutral" | "growth" | "risk";

export type NumberPoint = {
  label: string;
  value: number;
};

export type ThesisBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string }
  | { type: "numberChart"; points: NumberPoint[] }
  | { type: "list"; items: string[] };

export type ThesisSection = {
  id: string;
  title: string;
  tone: ThesisTone;
  blocks: ThesisBlock[];
};

export type ThesisDocument = {
  title?: string;
  subtitle?: string;
  sections: ThesisSection[];
};

const RISK_WORDS = ["风险", "下行", "不确定", "衰退", "崩塌", "压力", "回撤", "危机"];
const GROWTH_WORDS = ["增长", "机会", "扩张", "突破", "复苏", "上行", "改善", "利好"];

function slugify(input: string, index: number): string {
  const raw = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);

  return raw || `section-${index + 1}`;
}

function detectTone(text: string): ThesisTone {
  const lower = text.toLowerCase();

  if (RISK_WORDS.some((word) => lower.includes(word.toLowerCase()))) {
    return "risk";
  }
  if (GROWTH_WORDS.some((word) => lower.includes(word.toLowerCase()))) {
    return "growth";
  }
  return "neutral";
}

function parseNumericList(items: string[]): NumberPoint[] | null {
  const points: NumberPoint[] = [];

  for (const item of items) {
    const match = item.match(/^(.*?)([-+]?\d+(?:\.\d+)?)(?:\s*[%亿万kKmM]*)\s*$/);
    if (!match) return null;

    const label = match[1].replace(/[:：-]\s*$/, "").trim() || "数值";
    const value = Number.parseFloat(match[2]);
    if (Number.isNaN(value)) return null;

    points.push({ label, value });
  }

  return points.length > 1 ? points : null;
}

function flushParagraph(paragraphLines: string[], blocks: ThesisBlock[]) {
  if (!paragraphLines.length) return;
  const paragraph = paragraphLines.join(" ").trim();
  if (paragraph) blocks.push({ type: "paragraph", text: paragraph });
  paragraphLines.length = 0;
}

function flushList(listItems: string[], blocks: ThesisBlock[]) {
  if (!listItems.length) return;
  const chart = parseNumericList(listItems);
  if (chart) {
    blocks.push({ type: "numberChart", points: chart });
  } else {
    blocks.push({ type: "list", items: [...listItems] });
  }
  listItems.length = 0;
}

function parseBlocks(markdownBody: string): ThesisSection[] {
  const lines = markdownBody.split("\n");

  const sections: ThesisSection[] = [];
  let currentTitle = "导语";
  let currentBlocks: ThesisBlock[] = [];
  const paragraphLines: string[] = [];
  const listItems: string[] = [];
  let quoteLines: string[] = [];

  function pushSection() {
    flushParagraph(paragraphLines, currentBlocks);
    flushList(listItems, currentBlocks);

    if (quoteLines.length) {
      currentBlocks.push({ type: "quote", text: quoteLines.join(" ").trim() });
      quoteLines = [];
    }

    if (!currentBlocks.length) return;

    const toneSource = `${currentTitle} ${currentBlocks
      .map((block) => {
        if (block.type === "paragraph" || block.type === "quote") return block.text;
        if (block.type === "numberChart") return block.points.map((p) => p.label).join(" ");
        if (block.type === "list") return block.items.join(" ");
        return block.alt;
      })
      .join(" ")}`;

    sections.push({
      id: slugify(currentTitle, sections.length),
      title: currentTitle,
      tone: detectTone(toneSource),
      blocks: currentBlocks,
    });

    currentBlocks = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph(paragraphLines, currentBlocks);
      flushList(listItems, currentBlocks);

      if (quoteLines.length) {
        currentBlocks.push({ type: "quote", text: quoteLines.join(" ").trim() });
        quoteLines = [];
      }
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      pushSection();
      currentTitle = headingMatch[2].trim();
      continue;
    }

    const imageMatch = line.match(/^!\[(.*?)\]\((.+?)\)$/);
    if (imageMatch) {
      flushParagraph(paragraphLines, currentBlocks);
      flushList(listItems, currentBlocks);
      if (quoteLines.length) {
        currentBlocks.push({ type: "quote", text: quoteLines.join(" ").trim() });
        quoteLines = [];
      }
      currentBlocks.push({
        type: "image",
        alt: imageMatch[1] || "Article image",
        src: imageMatch[2],
      });
      continue;
    }

    if (line.startsWith(">")) {
      flushParagraph(paragraphLines, currentBlocks);
      flushList(listItems, currentBlocks);
      quoteLines.push(line.replace(/^>\s?/, "").trim());
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushParagraph(paragraphLines, currentBlocks);
      if (quoteLines.length) {
        currentBlocks.push({ type: "quote", text: quoteLines.join(" ").trim() });
        quoteLines = [];
      }
      listItems.push(listMatch[1].trim());
      continue;
    }

    flushList(listItems, currentBlocks);
    if (quoteLines.length) {
      currentBlocks.push({ type: "quote", text: quoteLines.join(" ").trim() });
      quoteLines = [];
    }

    paragraphLines.push(line);
  }

  pushSection();
  return sections;
}

export function parseThesisMarkdown(markdown: string): ThesisDocument {
  const parsed = matter(markdown);
  const sections = parseBlocks(parsed.content);

  const fm = parsed.data as Record<string, unknown>;
  const title = typeof fm.title === "string" ? fm.title : undefined;
  const subtitle = typeof fm.subtitle === "string" ? fm.subtitle : undefined;

  return {
    title,
    subtitle,
    sections,
  };
}
