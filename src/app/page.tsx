import Link from "next/link";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GlowCard } from "@/components/ui/glow-card";
import { getAllCompanies } from "@/lib/content/companies";

const features = [
  {
    title: "公司追踪",
    description:
      "覆盖百济神州、传奇生物、信达生物、康方生物等核心港美股生物医药公司，追踪管线、财务与催化剂事件。",
    href: "/companies",
  },
  {
    title: "深度文章",
    description:
      "覆盖行业趋势、临床试验解读、监管动态等原创深度内容。",
    href: "/articles",
  },
  {
    title: "视频解读",
    description: "专业视频内容，直观理解复杂的生物科技投资逻辑。",
    href: "/videos",
  },
];

export default async function HomePage() {
  const companies = await getAllCompanies();
  const spotlightCompanies = companies.slice(0, 4);

  return (
    <div>
      <section className="flex min-h-[85vh] flex-col items-center justify-center px-4 text-center">
        <ScrollReveal>
          <Badge
            variant="secondary"
            className="mb-6 border-purple-500/20 bg-purple-500/10 text-purple-400"
          >
            Beta
          </Badge>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-indigo-400/90 via-purple-400/80 to-blue-400/90 bg-clip-text text-transparent">
              Decode Biotech.
            </span>
            <br />
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-purple-400/30 bg-clip-text text-transparent">
              Invest Smarter.
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            深度追踪港美股生物医药投资机会，覆盖百济神州、传奇生物、信达生物等核心公司的管线进展、财务数据与投资洞察。
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/25 transition-shadow hover:shadow-xl hover:shadow-purple-500/30"
            >
              <Link href="/companies">开始探索</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">了解更多</Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            重点追踪
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            港美股生物医药核心公司一览
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {spotlightCompanies.map((company, i) => (
            <ScrollReveal key={company.slug} delay={0.1 * (i + 1)}>
              <Link href={`/companies/${company.slug}`}>
                <GlowCard className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{company.name}</CardTitle>
                      <Badge
                        variant="outline"
                        className="shrink-0 border-purple-500/30 text-[10px] text-purple-400"
                      >
                        {company.ticker.split(" ")[0]}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{company.nameEn}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {company.keyHighlight}
                    </p>
                  </CardContent>
                </GlowCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.6}>
          <div className="mt-8 text-center">
            <Button asChild variant="ghost" className="text-muted-foreground">
              <Link href="/companies">查看全部 {companies.length} 家公司 &rarr;</Link>
            </Button>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            平台功能
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            为生物科技投资者打造的一站式信息平台
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.title} delay={0.1 * (i + 1)}>
              <Link href={feature.href}>
                <GlowCard className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </GlowCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
