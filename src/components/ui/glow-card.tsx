"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
}

export function GlowCard({ children, className, ...props }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current?.style.setProperty("--mx", `${x}px`);
      glowRef.current?.style.setProperty("--my", `${y}px`);
      borderRef.current?.style.setProperty("--mx", `${x}px`);
      borderRef.current?.style.setProperty("--my", `${y}px`);
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    glowRef.current?.style.setProperty("opacity", "1");
    borderRef.current?.style.setProperty("opacity", "1");
  }, []);

  const handleMouseLeave = useCallback(() => {
    glowRef.current?.style.setProperty("opacity", "0");
    borderRef.current?.style.setProperty("opacity", "0");
  }, []);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative overflow-hidden border-transparent bg-card/60 backdrop-blur-sm transition-shadow duration-500",
          "hover:shadow-[0_0_32px_-8px_rgba(139,92,246,0.35)]",
          className
        )}
        {...props}
      >
        {/* Mouse-tracking radial light — no React state, pure CSS */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(139,92,246,0.12), rgba(59,130,246,0.06) 50%, transparent 100%)",
          }}
        />
        {/* Mouse-tracking border glow */}
        <div
          ref={borderRef}
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(139,92,246,0.35), transparent 100%)",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "1px",
          }}
        />
        <div className="relative z-10">{children}</div>
      </Card>
    </motion.div>
  );
}
