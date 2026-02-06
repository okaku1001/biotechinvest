import type { Metadata } from "next";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GlowCard } from "@/components/ui/glow-card";

export const metadata: Metadata = {
  title: "关于我们",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <ScrollReveal>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          关于 BiotechInvest
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          BiotechInvest
          致力于为投资者提供专业的生物科技行业分析与投资洞察。
        </p>
      </ScrollReveal>

      <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="mt-16 grid gap-8 sm:grid-cols-2">
        <ScrollReveal delay={0.1}>
          <GlowCard className="h-full">
            <CardHeader>
              <CardTitle>我们的使命</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                降低生物科技投资的信息不对称，帮助投资者做出更明智的决策。
              </p>
            </CardContent>
          </GlowCard>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <GlowCard className="h-full">
            <CardHeader>
              <CardTitle>联系方式</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                联系方式占位，后续补充邮箱和社交媒体链接。
              </p>
            </CardContent>
          </GlowCard>
        </ScrollReveal>
      </div>
    </div>
  );
}
