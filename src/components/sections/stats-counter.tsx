"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/constants";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const STATS: StatItem[] = [
  { value: SITE_CONFIG.activeUsers, suffix: "", label: "viewers right now", color: "text-green-400" },
  { value: SITE_CONFIG.streamingChannels, suffix: "", label: "channels streaming", color: "text-blue-400" },
  { value: SITE_CONFIG.uptime, suffix: "%", label: "uptime today", color: "text-cyan-400" },
  { value: SITE_CONFIG.trialActivationsToday, suffix: "", label: "trials activated today", color: "text-purple-400" },
];

function useCountUp(target: number, duration = 2000, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [target, duration, active]);
  return count;
}

function StatCounter({ stat, active }: { stat: StatItem; active: boolean }) {
  const count = useCountUp(stat.value, 2000, active);
  return (
    <div className="flex flex-col items-center sm:items-start gap-0.5">
      <span className={`text-2xl font-bold tabular-nums ${stat.color}`}>
        {count.toLocaleString()}{stat.suffix}
      </span>
      <span className="text-xs text-zinc-500">{stat.label}</span>
    </div>
  );
}

export function StatsCounter() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="border-y border-white/5 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
          <div className="flex items-center gap-2">
            <span className="animate-pulse-dot inline-block w-2.5 h-2.5 bg-red-500 rounded-full" />
            <span className="text-sm font-semibold text-white uppercase tracking-widest">LIVE</span>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-10">
            {STATS.map((stat) => (
              <StatCounter key={stat.label} stat={stat} active={active} />
            ))}
          </div>
          <div className="text-xs text-zinc-600 hidden lg:block">Updated every 60 seconds</div>
        </div>
      </div>
    </div>
  );
}
