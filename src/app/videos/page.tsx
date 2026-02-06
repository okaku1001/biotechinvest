import type { Metadata } from "next";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GlowCard } from "@/components/ui/glow-card";

export const metadata: Metadata = {
  title: "视频列表",
};

const placeholderVideos = [
  {
    id: "1",
    title: "生物科技投资入门",
    description: "30 分钟带你了解生物科技投资的核心逻辑和关键指标。",
    tag: "入门",
  },
  {
    id: "2",
    title: "ADC 药物市场深度解读",
    description: "抗体偶联药物（ADC）的技术原理、竞争格局与投资机会。",
    tag: "深度",
  },
  {
    id: "3",
    title: "FDA 咨询委员会直播解读",
    description: "实时解读 FDA AdCom 投票结果及对股价的潜在影响。",
    tag: "直播",
  },
];

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <ScrollReveal>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          视频解读
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          专业视频内容，直观理解复杂的生物科技投资逻辑。
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {placeholderVideos.map((video, i) => (
          <ScrollReveal key={video.id} delay={0.1 * (i + 1)}>
            <GlowCard className="h-full">
              <CardHeader>
                <div className="mb-3 flex aspect-video items-center justify-center rounded-md bg-muted/50">
                  <span className="text-sm text-muted-foreground">
                    视频缩略图
                  </span>
                </div>
                <CardTitle className="text-lg">{video.title}</CardTitle>
                <Badge variant="outline" className="w-fit">
                  {video.tag}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {video.description}
                </p>
              </CardContent>
            </GlowCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
