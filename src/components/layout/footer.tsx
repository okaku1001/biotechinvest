import Link from "next/link";

const footerLinks = [
  {
    title: "产品",
    links: [
      { href: "/companies", label: "公司分析" },
      { href: "/articles", label: "深度文章" },
      { href: "/videos", label: "视频解读" },
    ],
  },
  {
    title: "关于",
    links: [{ href: "/about", label: "关于我们" }],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-auto bg-background/80 pt-20 backdrop-blur-sm">
      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-lg font-bold text-transparent">
                BiotechInvest
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Decode Biotech. Invest Smarter.
            </p>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} BiotechInvest. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <span className="cursor-pointer text-xs text-muted-foreground/60 transition-colors hover:text-foreground">
              Twitter
            </span>
            <span className="cursor-pointer text-xs text-muted-foreground/60 transition-colors hover:text-foreground">
              GitHub
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
