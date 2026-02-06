import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const displayTitle = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <article>
        <ScrollReveal>
          <Badge
            variant="secondary"
            className="border-purple-500/20 bg-purple-500/10 text-purple-400"
          >
            文章
          </Badge>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {displayTitle}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            发布日期占位 · 阅读时间占位
          </p>
        </ScrollReveal>

        <Separator className="my-10" />

        <ScrollReveal delay={0.15}>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground">
              文章内容将在此处展示。此页面为占位骨架，后续将接入实际内容数据源。
            </p>
          </div>
        </ScrollReveal>
      </article>
    </div>
  );
}
