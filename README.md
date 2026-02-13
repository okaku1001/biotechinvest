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
- `/articles` 文章列表（读取 Obsidian Markdown）
- `/articles/[slug]` 文章详情
- `/videos` 视频列表
- `/about` 关于页面
- `/disclaimer` 投资免责声明

## 内容来源

### 文章（Obsidian CMS）

网站会优先读取以下目录中的 Markdown 文件：

- `OBSIDIAN_ARTICLES_DIR`（环境变量）
- 默认路径：`/Users/zeyuansun/Documents/Obsidian Vault/BiotechSite`
- 回退路径：`content/articles`

你可以直接在 Obsidian 里写 `.md`，保存后刷新网站即可看到更新。

可选 frontmatter（不写也能工作）：

```md
---
title: "你的标题"
slug: "your-slug"
date: "2026-02-13"
tag: "公司研究"
summary: "一段摘要"
readingTimeMinutes: 8
---

正文...
```

如果没有 frontmatter，系统会自动：

- 用文件名作为标题
- 自动生成 slug
- 用文件修改时间作为发布日期
- 自动估算阅读时长
- 取首段作为摘要

### 公司数据

- `src/data/companies.ts`

## 本地开发

```bash
npm install
npm run dev
```

默认访问 [http://localhost:3000](http://localhost:3000)。

## 同步 Obsidian 文章到项目（用于部署备份）

```bash
npm run sync:obsidian
```

该命令会把 Obsidian 文章复制到 `content/articles`。

## 质量检查

```bash
npm run lint
npm run typecheck
npm run build
```

## 环境变量

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
OBSIDIAN_ARTICLES_DIR=/absolute/path/to/your/obsidian/articles
```

如果不设置 `OBSIDIAN_ARTICLES_DIR`，默认读取：
`/Users/zeyuansun/Documents/Obsidian Vault/BiotechSite`。

## SEO 配置

- 全局 metadata：`src/app/layout.tsx`
- Robots：`src/app/robots.ts`
- Sitemap：`src/app/sitemap.ts`
