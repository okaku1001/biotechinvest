import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { getAllArticles } from "@/lib/content/articles";

export const metadata: Metadata = {
  title: "文章列表",
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <ScrollReveal>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">深度文章</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          覆盖行业趋势、临床试验解读、监管动态等原创深度内容。
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, i) => (
          <ScrollReveal key={article.slug} delay={0.06 * (i + 1)}>
            <Link href={`/articles/${article.slug}`}>
              <Card className="h-full border-border/60 bg-card/70 backdrop-blur-sm transition-colors hover:border-primary/40">
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {article.tag}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{article.excerpt}</p>
                  <p className="mt-3 text-xs text-muted-foreground/80">
                    {article.publishedAt} · {article.readingTimeMinutes} 分钟阅读
                  </p>
                </CardContent>
              </Card>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
