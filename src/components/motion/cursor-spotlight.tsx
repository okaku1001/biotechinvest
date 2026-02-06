"use client";

import { useEffect, useRef } from "react";

export function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let running = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function animate() {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Stop looping when close enough (< 0.5px)
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        currentX = targetX;
        currentY = targetY;
        el!.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
        running = false;
        return;
      }

      currentX += dx * 0.08;
      currentY += dy * 0.08;
      el!.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
      raf = requestAnimationFrame(animate);
    }

    function startLoop() {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(animate);
      }
    }

    function onMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      startLoop();
    }

    function onLeave() {
      el!.style.opacity = "0";
    }

    function onEnter() {
      el!.style.opacity = "1";
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-500 md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(139,92,246,0.06) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)",
      }}
    />
  );
}
