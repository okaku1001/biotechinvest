"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/companies", label: "公司" },
  { href: "/articles", label: "文章" },
  { href: "/videos", label: "视频" },
  { href: "/about", label: "关于" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="animate-glow-pulse bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-xl font-bold text-transparent">
            BiotechInvest
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors duration-300",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Sliding frosted glass pill */}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg shadow-[inset_0_0.5px_0_rgba(255,255,255,0.12),0_1px_3px_rgba(0,0,0,0.1)] backdrop-blur-md"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 28,
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 bg-clip-text text-left text-transparent">
                  BiotechInvest
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive(pathname, item.href)
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
