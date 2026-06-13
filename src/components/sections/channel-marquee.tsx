import { CHANNEL_LOGOS_MARQUEE } from "@/lib/data/channels";

const COLORS = [
  "#3B82F6", "#06B6D4", "#8B5CF6", "#10B981", "#F59E0B",
  "#EF4444", "#EC4899", "#14B8A6", "#6366F1", "#F97316",
];

export function ChannelMarquee() {
  const doubled = [...CHANNEL_LOGOS_MARQUEE, ...CHANNEL_LOGOS_MARQUEE];

  return (
    <section className="py-12 overflow-hidden border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-zinc-500">
          110,000+ channels — a small sample
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee gap-4 w-max">
          {doubled.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 shrink-0 hover:border-blue-500/30 transition-colors"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              >
                {name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-zinc-300 whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
