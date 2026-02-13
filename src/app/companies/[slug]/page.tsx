import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GlowCard } from "@/components/ui/glow-card";
import { getAllCompanies, getCompanyBySlug } from "@/lib/content/companies";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const companies = await getAllCompanies();
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) return { title: "公司未找到" };
  return { title: `${company.name} (${company.nameEn})` };
}

export default async function CompanyDetailPage({ params }: Props) {
  const { slug } = await params;
  const company = await getCompanyBySlug(slug);
  if (!company) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <ScrollReveal>
        <div className="mb-16">
          <Link
            href="/companies"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            &larr; 返回公司列表
          </Link>

          <div className="mt-6 flex flex-wrap items-start gap-3">
            <Badge
              variant="secondary"
              className="border-purple-500/20 bg-purple-500/10 text-purple-400"
            >
              {company.sector}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {company.ticker}
            </Badge>
            {company.otherTickers?.map((t) => (
              <Badge key={t} variant="outline" className="text-xs">
                {t}
              </Badge>
            ))}
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {company.name}
          </h1>
          <p className="mt-1 text-xl text-muted-foreground">{company.nameEn}</p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {company.description}
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {company.financials.map((f) => (
            <div
              key={f.label}
              className="rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm"
            >
              <p className="text-xs text-muted-foreground">{f.label}</p>
              <p className="mt-1 text-lg font-semibold">{f.value}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <h2 className="text-2xl font-bold tracking-tight">核心产品</h2>
      </ScrollReveal>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {company.coreProducts.map((product, i) => (
          <ScrollReveal key={product.name} delay={0.1 * (i + 1) + 0.15}>
            <GlowCard className="h-full">
              <CardHeader>
                <CardTitle className="text-base">{product.name}</CardTitle>
                <Badge variant="outline" className="w-fit text-[10px]">
                  {product.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                {product.revenue && (
                  <p className="text-sm font-medium text-foreground">{product.revenue}</p>
                )}
              </CardContent>
            </GlowCard>
          </ScrollReveal>
        ))}
      </div>

      {company.pipeline.length > 0 && (
        <>
          <ScrollReveal delay={0.2}>
            <h2 className="mt-16 text-2xl font-bold tracking-tight">研发管线</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <div className="mt-6 overflow-hidden rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                        候选药物
                      </th>
                      <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                        靶点/机制
                      </th>
                      <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                        适应症
                      </th>
                      <th className="px-5 py-3 text-left font-medium text-muted-foreground">
                        阶段
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.pipeline.map((item) => (
                      <tr
                        key={item.name}
                        className="border-b border-border/30 last:border-0"
                      >
                        <td className="px-5 py-3 font-medium">{item.name}</td>
                        <td className="px-5 py-3 text-muted-foreground">{item.target}</td>
                        <td className="px-5 py-3 text-muted-foreground">{item.indication}</td>
                        <td className="px-5 py-3">
                          <Badge
                            variant="secondary"
                            className="text-[10px] whitespace-nowrap"
                          >
                            {item.stage}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </>
      )}

      <ScrollReveal delay={0.3}>
        <h2 className="mt-16 text-2xl font-bold tracking-tight">近期催化剂</h2>
      </ScrollReveal>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {company.catalysts.map((catalyst, i) => (
          <ScrollReveal key={i} delay={0.08 * (i + 1) + 0.3}>
            <div className="flex gap-3 rounded-xl border border-border/50 bg-card/40 p-5 backdrop-blur-sm">
              <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
              <p className="text-sm leading-relaxed text-muted-foreground">{catalyst}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
