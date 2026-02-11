import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AmbientBackground } from "@/components/motion/ambient-background";
import { CursorSpotlight } from "@/components/motion/cursor-spotlight";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://biotechinvest.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BiotechInvest",
    template: "%s | BiotechInvest",
  },
  description:
    "深度追踪生物科技投资机会，提供公司分析、行业文章与视频解读。",
  keywords: ["生物科技", "Biotech", "投资", "港股", "美股", "医药"],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "BiotechInvest",
    title: "BiotechInvest",
    description:
      "深度追踪生物科技投资机会，提供公司分析、行业文章与视频解读。",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "BiotechInvest",
    description:
      "深度追踪生物科技投资机会，提供公司分析、行业文章与视频解读。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AmbientBackground />
          <CursorSpotlight />
          <div className="relative flex min-h-svh flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
