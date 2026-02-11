export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  publishedAt: string;
  readingTimeMinutes: number;
  content: string[];
}

export const articles: Article[] = [
  {
    slug: "biotech-trends-2025",
    title: "2025 生物科技行业趋势展望",
    excerpt: "从 AI 辅助药物发现到基因编辑疗法的商业化进程，梳理行业关键变化。",
    tag: "行业趋势",
    publishedAt: "2025-01-15",
    readingTimeMinutes: 8,
    content: [
      "2025 年生物科技投融资和并购活动继续向临床后期资产集中，资本市场更偏好可验证商业化路径。",
      "在技术层面，ADC、双抗与细胞治疗依然是焦点，具备明确临床差异化证据的平台型公司更容易获得估值溢价。",
      "投资框架上，建议将监管节奏、医保可及性和产能兑现能力作为与临床数据同等重要的三条主线。",
    ],
  },
  {
    slug: "clinical-trial-guide",
    title: "临床试验数据解读指南",
    excerpt: "如何系统理解 P 值、置信区间、终点设计与分层分析。",
    tag: "教程",
    publishedAt: "2025-02-01",
    readingTimeMinutes: 10,
    content: [
      "阅读临床结果时，优先确认主要终点是否命中，再评估次要终点是否支持同一结论。",
      "统计显著性并不等于临床意义，绝对获益、治疗持续时间和不良反应谱对投资判断同样关键。",
      "对于亚组分析，需关注是否为预设分层和样本量是否充足，避免由小样本波动得出过度结论。",
    ],
  },
  {
    slug: "fda-approval-tracker",
    title: "FDA 审批动态追踪",
    excerpt: "按月整理关键 PDUFA 节点和监管信号，追踪潜在估值催化剂。",
    tag: "监管动态",
    publishedAt: "2025-02-20",
    readingTimeMinutes: 6,
    content: [
      "审批节奏会直接影响短期股价波动，但长期估值仍取决于标签范围和商业化执行。",
      "对于咨询委员会会议，建议重点关注外部专家对风险收益比、临床终点选择和安全性争议的讨论。",
      "将审批事件与公司现金消耗曲线结合观察，可更准确评估融资需求与潜在稀释风险。",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
