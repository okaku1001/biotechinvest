import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThesisPresenter } from "@/components/content/thesis-presenter";
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
    <ThesisPresenter
      markdown={article.content}
      fallbackTitle={article.title}
      tag={article.tag}
      publishedLabel={`发布于 ${publishDate}`}
      readingTimeMinutes={article.readingTimeMinutes}
    />
  );
}
