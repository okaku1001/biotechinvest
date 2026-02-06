"use client";

export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Purple orb */}
      <div className="ambient-orb absolute -left-[20%] top-[10%] h-[600px] w-[600px] rounded-full bg-purple-600/[0.15] blur-[128px]" />
      {/* Blue orb */}
      <div className="ambient-orb-reverse absolute -right-[15%] top-[40%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.15] blur-[128px]" />
      {/* Indigo orb */}
      <div className="ambient-orb absolute left-[30%] top-[70%] h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[128px]" />
      {/* Warm glow — only in "lamp on" mode (light theme) */}
      <div className="ambient-orb absolute left-[40%] top-[20%] h-[500px] w-[500px] rounded-full bg-amber-500/[0.07] blur-[160px] dark:bg-transparent" />
    </div>
  );
}
