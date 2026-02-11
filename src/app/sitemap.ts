import type { MetadataRoute } from "next";
import { companies } from "@/data/companies";
import { articles } from "@/data/articles";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://biotechinvest.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/companies",
    "/articles",
    "/videos",
    "/about",
    "/disclaimer",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const companyRoutes: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${siteUrl}/companies/${company.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...companyRoutes, ...articleRoutes];
}
