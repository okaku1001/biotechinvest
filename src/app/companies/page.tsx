import type { Metadata } from "next";
import Link from "next/link";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GlowCard } from "@/components/ui/glow-card";
import { getAllCompanies } from "@/lib/content/companies";

export const metadata: Metadata = {
  title: "公司列表",
};

export default async function CompaniesPage() {
  const companies = await getAllCompanies();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <ScrollReveal>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">公司追踪</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          追踪港美股生物医药核心公司的管线进展、财务数据与投资机会。
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {companies.map((company, i) => (
          <ScrollReveal key={company.slug} delay={0.08 * (i + 1)}>
            <Link href={`/companies/${company.slug}`}>
              <GlowCard className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <p className="mt-1 text-xs text-muted-foreground">{company.nameEn}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-[10px]">
                      {company.sector}
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <Badge
                      variant="outline"
                      className="border-purple-500/30 text-[10px] text-purple-400"
                    >
                      {company.ticker}
                    </Badge>
                    {company.otherTickers?.map((t) => (
                      <Badge
                        key={t}
                        variant="outline"
                        className="text-[10px] text-muted-foreground"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {company.keyHighlight}
                  </p>
                  {company.revenue2024 && (
                    <div className="mt-3 flex items-center gap-2 border-t border-border/50 pt-3">
                      <span className="text-[10px] text-muted-foreground">2024 收入</span>
                      <span className="text-xs font-semibold text-foreground">
                        {company.revenue2024}
                      </span>
                    </div>
                  )}
                </CardContent>
              </GlowCard>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
