import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { MarkdownContent } from "@/components/content/markdown";
import { getAllArticles, getArticleBySlug } from "@/lib/content/articles";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "文章未找到" };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const publishDate = new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "long",
  }).format(new Date(article.publishedAt));

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <article>
        <ScrollReveal>
          <Badge
            variant="secondary"
            className="border-purple-500/20 bg-purple-500/10 text-purple-400"
          >
            {article.tag}
          </Badge>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            发布于 {publishDate} · 约 {article.readingTimeMinutes} 分钟阅读
          </p>
        </ScrollReveal>

        <Separator className="my-10" />

        <ScrollReveal delay={0.12}>
          <MarkdownContent markdown={article.content} />
        </ScrollReveal>
      </article>
    </div>
  );
}
