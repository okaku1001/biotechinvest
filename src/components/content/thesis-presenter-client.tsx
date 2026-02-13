"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import type {
  NumberPoint,
  ThesisBlock,
  ThesisSection,
  ThesisTone,
} from "@/lib/content/thesis-parser";

type ThesisPresenterClientProps = {
  title: string;
  subtitle?: string;
  tag?: string;
  publishedLabel?: string;
  readingTimeMinutes?: number;
  sections: ThesisSection[];
};

type Segment =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "link"; value: string; href: string };

function parseInline(text: string): Segment[] {
  const regex = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  const segments: Segment[] = [];
  let cursor = 0;

  for (const match of text.matchAll(regex)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      segments.push({ type: "text", value: text.slice(cursor, index) });
    }

    if (match[1]) {
      segments.push({ type: "bold", value: match[1] });
    } else if (match[2] && match[3]) {
      segments.push({ type: "link", value: match[2], href: match[3] });
    }

    cursor = index + match[0].length;
  }

  if (cursor < text.length) {
    segments.push({ type: "text", value: text.slice(cursor) });
  }

  return segments;
}

function InlineRichText({ text }: { text: string }) {
  const segments = useMemo(() => parseInline(text), [text]);

  return (
    <>
      {segments.map((segment, index) => {
        const key = `${segment.type}-${index}`;
        if (segment.type === "bold") {
          return (
            <strong key={key} className="font-semibold text-foreground">
              {segment.value}
            </strong>
          );
        }

        if (segment.type === "link") {
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

        return <span key={key}>{segment.value}</span>;
      })}
    </>
  );
}

function toneStyle(tone: ThesisTone) {
  if (tone === "risk") {
    return {
      bg: "from-black via-zinc-950 to-zinc-900",
      pulse: "bg-zinc-700/50",
    };
  }
  if (tone === "growth") {
    return {
      bg: "from-zinc-100 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800",
      pulse: "bg-primary/40",
    };
  }
  return {
    bg: "from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-black dark:to-zinc-900",
    pulse: "bg-zinc-500/30",
  };
}

function MinimalChart({ points }: { points: NumberPoint[] }) {
  const [active, setActive] = useState(0);
  const max = Math.max(...points.map((point) => Math.abs(point.value)), 1);

  return (
    <div className="space-y-4 rounded-2xl border border-border/60 bg-background/50 p-6">
      <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
        Logic Signal
      </div>
      <div className="space-y-3">
        {points.map((point, idx) => {
          const width = Math.max(8, (Math.abs(point.value) / max) * 100);
          return (
            <button
              key={`${point.label}-${idx}`}
              type="button"
              onMouseEnter={() => setActive(idx)}
              onFocus={() => setActive(idx)}
              className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 text-left"
            >
              <div className="overflow-hidden rounded-full bg-muted/60">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${width}%` }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={cn(
                    "h-2 rounded-full bg-primary/65 transition-opacity",
                    active === idx ? "opacity-100" : "opacity-60"
                  )}
                />
              </div>
              <span className="text-xs tracking-wide text-muted-foreground">{point.value}</span>
              <span className="col-span-2 text-sm text-foreground/90">{point.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LightboxImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -48]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border border-border/50"
      >
        <motion.img
          src={src}
          alt={alt}
          style={{ y }}
          className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </button>

      {open && (
        <motion.button
          type="button"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-black/88 p-8"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="max-h-[90vh] w-auto max-w-[90vw] object-contain" />
        </motion.button>
      )}
    </>
  );
}

function BlockRenderer({ block }: { block: ThesisBlock }) {
  if (block.type === "paragraph") {
    return (
      <p className="text-pretty text-lg leading-[1.95] text-zinc-700 dark:text-zinc-300">
        <InlineRichText text={block.text} />
      </p>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote className="mx-auto max-w-4xl py-8 text-center font-serif text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        “{block.text}”
      </blockquote>
    );
  }

  if (block.type === "numberChart") {
    return <MinimalChart points={block.points} />;
  }

  if (block.type === "image") {
    return <LightboxImage src={block.src} alt={block.alt} />;
  }

  return (
    <ul className="space-y-2 pl-5 text-lg text-zinc-700 marker:text-primary dark:text-zinc-300">
      {block.items.map((item) => (
        <li key={item} className="list-disc leading-relaxed">
          <InlineRichText text={item} />
        </li>
      ))}
    </ul>
  );
}

function ScrollySection({
  section,
  index,
  onActive,
}: {
  section: ThesisSection;
  index: number;
  onActive: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45, margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      className="mx-auto grid min-h-[70vh] w-full max-w-4xl content-center gap-10 py-24"
    >
      <div className="space-y-5">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
          Section {String(index + 1).padStart(2, "0")}
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {section.title}
        </h2>
      </div>

      <div className="space-y-8">
        {section.blocks.map((block, idx) => (
          <BlockRenderer key={`${section.id}-${idx}`} block={block} />
        ))}
      </div>
    </motion.section>
  );
}

export function ThesisPresenterClient({
  title,
  subtitle,
  tag,
  publishedLabel,
  readingTimeMinutes,
  sections,
}: ThesisPresenterClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 25,
    mass: 0.1,
  });

  const activeTone = sections[activeIndex]?.tone ?? "neutral";
  const tone = toneStyle(activeTone);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-primary"
        style={{ scaleX: progressScale }}
      />

      <motion.div
        key={activeTone}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b transition-colors duration-700",
          tone.bg
        )}
      >
        <div
          className={cn(
            "absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl",
            tone.pulse
          )}
        />
      </motion.div>

      <header className="mx-auto min-h-[80vh] max-w-5xl px-6 pb-12 pt-24 md:px-12">
        <div className="mx-auto flex h-full max-w-4xl flex-col justify-end gap-8">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {tag ?? "Biotech Thesis"}
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-300">
              {subtitle}
            </p>
          ) : null}
          <p className="text-sm text-muted-foreground">
            {publishedLabel}
            {readingTimeMinutes ? ` · ${readingTimeMinutes} min logic chain` : ""}
          </p>
        </div>
      </header>

      <main className="px-6 pb-24 md:px-12">
        {sections.map((section, idx) => (
          <ScrollySection
            key={section.id}
            section={section}
            index={idx}
            onActive={setActiveIndex}
          />
        ))}
      </main>
    </div>
  );
}
