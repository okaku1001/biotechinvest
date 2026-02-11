import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "免责声明",
  description: "BiotechInvest 投资相关免责声明",
};

const notices = [
  "本站内容仅用于信息分享与研究交流，不构成任何形式的投资建议、要约或承诺。",
  "生物科技行业波动较大，个股可能受到临床数据、监管决策、融资事件等因素显著影响。",
  "文中提及公司、产品与观点可能随时间变化，请在交易前结合最新公告与官方文件独立判断。",
  "你应自行承担投资决策风险；如有需要，请咨询持牌投资顾问或专业机构。",
];

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">免责声明</h1>
      <p className="mt-4 text-muted-foreground">
        为避免误解，请在使用本站信息前阅读以下说明。
      </p>

      <div className="mt-10 space-y-4">
        {notices.map((notice) => (
          <div key={notice} className="rounded-xl border border-border/60 bg-card/70 p-5">
            <p className="leading-relaxed text-muted-foreground">{notice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
