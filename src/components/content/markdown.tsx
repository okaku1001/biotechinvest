import type { ReactNode } from "react";

type Segment = {
  type: "text" | "link" | "bold";
  value: string;
  href?: string;
};

function parseInline(text: string): Segment[] {
  const segments: Segment[] = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      segments.push({
        type: "text",
        value: text.slice(lastIndex, index),
      });
    }

    if (match[1] && match[2]) {
      segments.push({
        type: "link",
        value: match[1],
        href: match[2],
      });
    } else if (match[3]) {
      segments.push({
        type: "bold",
        value: match[3],
      });
    }

    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({
      type: "text",
      value: text.slice(lastIndex),
    });
  }

  return segments;
}

function InlineText({ text }: { text: string }) {
  const segments = parseInline(text);

  return (
    <>
      {segments.map((segment, index) => {
        const key = `${segment.type}-${index}-${segment.value}`;

        if (segment.type === "link" && segment.href) {
          return (
            <a
              key={key}
              href={segment.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-primary/50 underline-offset-4"
            >
              {segment.value}
            </a>
          );
        }

        if (segment.type === "bold") {
          return (
            <strong key={key} className="font-semibold text-foreground">
              {segment.value}
            </strong>
          );
        }

        return <span key={key}>{segment.value}</span>;
      })}
    </>
  );
}

export function MarkdownContent({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const elements: ReactNode[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = () => {
    if (!paragraphBuffer.length) return;
    const text = paragraphBuffer.join(" ").trim();
    paragraphBuffer = [];
    if (!text) return;

    elements.push(
      <p key={`p-${elements.length}`} className="leading-relaxed text-muted-foreground">
        <InlineText text={text} />
      </p>
    );
  };

  const flushList = () => {
    if (!listBuffer.length) return;
    const items = listBuffer;
    listBuffer = [];

    elements.push(
      <ul key={`ul-${elements.length}`} className="list-disc space-y-2 pl-6 text-muted-foreground">
        {items.map((item) => (
          <li key={item}>
            <InlineText text={item} />
          </li>
        ))}
      </ul>
    );
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushParagraph();
      listBuffer.push(line.slice(2).trim());
      continue;
    }

    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h1 key={`h1-${elements.length}`} className="text-3xl font-bold tracking-tight text-foreground">
          <InlineText text={line.slice(2).trim()} />
        </h1>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h2 key={`h2-${elements.length}`} className="text-2xl font-bold tracking-tight text-foreground">
          <InlineText text={line.slice(3).trim()} />
        </h2>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h3 key={`h3-${elements.length}`} className="text-xl font-semibold tracking-tight text-foreground">
          <InlineText text={line.slice(4).trim()} />
        </h3>
      );
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushList();

  return <div className="space-y-5">{elements}</div>;
}
