import type { Metadata } from "next";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GlowCard } from "@/components/ui/glow-card";

export const metadata: Metadata = {
  title: "文章列表",
};

const placeholderArticles = [
  {
    slug: "biotech-trends-2025",
    title: "2025 生物科技行业趋势展望",
    excerpt: "从 AI 辅助药物发现到基因编辑疗法的商业化进程...",
    tag: "行业趋势",
  },
  {
    slug: "clinical-trial-guide",
    title: "临床试验数据解读指南",
    excerpt: "如何正确理解 P 值、置信区间与终点设计...",
    tag: "教程",
  },
  {
    slug: "fda-approval-tracker",
    title: "FDA 审批动态追踪",
    excerpt: "本月重大审批节点与 PDUFA 日期汇总...",
    tag: "监管动态",
  },
];

export default function ArticlesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <ScrollReveal>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          深度文章
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          覆盖行业趋势、临床试验解读、监管动态等原创深度内容。
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderArticles.map((article, i) => (
          <ScrollReveal key={article.slug} delay={0.1 * (i + 1)}>
            <a href={`/articles/${article.slug}`}>
              <GlowCard className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {article.tag}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                </CardContent>
              </GlowCard>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
