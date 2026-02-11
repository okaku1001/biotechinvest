# BiotechInvest

BiotechInvest 是一个面向生物科技投资研究的 Next.js 网站，提供公司追踪、行业文章和视频内容入口。

## 技术栈

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS v4
- Framer Motion

## 页面结构

- `/` 首页
- `/companies` 公司列表
- `/companies/[slug]` 公司详情
- `/articles` 文章列表
- `/articles/[slug]` 文章详情（仅允许已定义 slug，未知 slug 返回 404）
- `/videos` 视频列表
- `/about` 关于页面
- `/disclaimer` 投资免责声明

## 数据来源（当前为本地静态数据）

- 公司数据：`src/data/companies.ts`
- 文章数据：`src/data/articles.ts`

如需新增文章，请在 `src/data/articles.ts` 中添加 `slug/title/excerpt/publishedAt/content`。

## 本地开发

```bash
npm install
npm run dev
```

默认访问 [http://localhost:3000](http://localhost:3000)。

## 质量检查

```bash
npm run lint
npm run typecheck
npm run build
```

## SEO 配置

- 全局 metadata：`src/app/layout.tsx`
- Robots：`src/app/robots.ts`
- Sitemap：`src/app/sitemap.ts`

可通过环境变量配置站点域名：

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

未配置时默认使用 `https://biotechinvest.vercel.app`。

## 维护建议

- 把公司与文章数据迁移到 CMS / 数据库，减少手工维护成本
- 为关键路由增加自动化测试
- 定期更新免责声明和内容时间戳，避免旧信息误导
