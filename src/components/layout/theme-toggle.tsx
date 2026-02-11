"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isPulling, setIsPulling] = useState(false);
  const switchTimer = useRef<number | null>(null);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (switchTimer.current !== null) {
        window.clearTimeout(switchTimer.current);
      }
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current);
      }
    };
  }, []);

  const isLit = resolvedTheme === "light";

  function handlePull() {
    if (!resolvedTheme) return;
    setIsPulling(true);

    switchTimer.current = window.setTimeout(() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }, 180);

    resetTimer.current = window.setTimeout(() => {
      setIsPulling(false);
    }, 400);
  }

  return (
    <button
      onClick={handlePull}
      aria-label="Toggle theme"
      className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-accent"
    >
      <motion.div
        className="absolute flex flex-col items-center"
        animate={isPulling ? { y: 6 } : { y: 0 }}
        transition={
          isPulling
            ? { type: "spring", stiffness: 400, damping: 12 }
            : { type: "spring", stiffness: 300, damping: 15 }
        }
      >
        <div className="h-2 w-px bg-muted-foreground/40" />
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative"
        >
          <motion.circle
            cx="12"
            cy="10"
            r="10"
            initial={false}
            animate={{
              opacity: isLit ? 0.5 : 0,
              scale: isLit ? 1 : 0.6,
            }}
            transition={{ duration: 0.4 }}
            fill="url(#bulbGlow)"
          />
          <path
            d="M9 21h6M10 17h4M12 3a6 6 0 0 0-4 10.5V16a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.5A6 6 0 0 0 12 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={
              isLit
                ? "text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]"
                : "text-muted-foreground"
            }
            style={{
              transition: "color 0.4s, filter 0.4s",
            }}
          />
          <motion.path
            d="M10 13.5c0-1 0.8-2 2-2s2 1 2 2"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            initial={false}
            animate={{
              opacity: isLit ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="text-amber-400"
          />
          <defs>
            <radialGradient id="bulbGlow" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor="rgb(251 191 36)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(251 191 36)" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>
    </button>
  );
}
