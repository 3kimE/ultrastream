"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const EPG_DATA = {
  Sports: [
    { channel: "ESPN", color: "#CC0000", now: "NFL Live: Chiefs vs Ravens", next: "SportsCenter", time: "20:00 – 23:00", live: true },
    { channel: "Sky Sports", color: "#0072C6", now: "Premier League: Man City vs Arsenal", next: "Goals Express", time: "19:45 – 22:00", live: true },
    { channel: "beIN Sports", color: "#8B0000", now: "UEFA Champions League Highlights", next: "La Liga Preview", time: "21:00 – 22:30", live: true },
    { channel: "NBA TV", color: "#1D428A", now: "Lakers vs Warriors LIVE", next: "NBA GameTime", time: "20:30 – 23:00", live: true },
    { channel: "Eurosport", color: "#003580", now: "Tennis: Wimbledon Finals", next: "Cycling Tour Recap", time: "14:00 – 18:00", live: false },
    { channel: "Fox Sports", color: "#003366", now: "MLB: Yankees vs Red Sox", next: "NFL Countdown", time: "18:00 – 21:30", live: true },
  ],
  Movies: [
    { channel: "HBO", color: "#000080", now: "The Batman (2022) – 4K", next: "Succession S4E8", time: "21:00 – 24:00", live: false },
    { channel: "Showtime", color: "#CC0000", now: "Top Gun: Maverick – 4K", next: "Tulsa King", time: "20:00 – 22:30", live: false },
    { channel: "Sky Cinema", color: "#0072C6", now: "Avatar: The Way of Water", next: "Dune: Part Two", time: "19:00 – 22:00", live: false },
    { channel: "Starz", color: "#000080", now: "Oppenheimer – 4K HDR", next: "Power Book III", time: "20:30 – 23:30", live: false },
    { channel: "AMC", color: "#C8102E", now: "The Walking Dead Marathon", next: "Better Call Saul", time: "18:00 – 24:00", live: false },
  ],
  News: [
    { channel: "CNN", color: "#CC0000", now: "Breaking: World Markets Update", next: "CNN Tonight", time: "LIVE 24/7", live: true },
    { channel: "BBC News", color: "#BB1919", now: "BBC News at Ten", next: "Newsnight", time: "22:00 – 23:30", live: true },
    { channel: "Al Jazeera", color: "#0054A6", now: "Inside Story: Middle East", next: "The Stream", time: "21:30 – 22:00", live: true },
    { channel: "Fox News", color: "#003366", now: "Hannity LIVE", next: "The Ingraham Angle", time: "21:00 – 22:00", live: true },
    { channel: "Euronews", color: "#003580", now: "EU Parliament Coverage", next: "World Now", time: "LIVE 24/7", live: true },
  ],
  Kids: [
    { channel: "Cartoon Network", color: "#FFCC00", now: "Adventure Time Marathon", next: "Regular Show", time: "16:00 – 20:00", live: false },
    { channel: "Nickelodeon", color: "#FF8C00", now: "SpongeBob SquarePants", next: "The Loud House", time: "17:00 – 18:30", live: false },
    { channel: "Disney Junior", color: "#003087", now: "Bluey – New Episodes!", next: "Mickey Mouse Clubhouse", time: "15:00 – 17:00", live: false },
    { channel: "Nick Jr.", color: "#FF8C00", now: "Paw Patrol: The Movie", next: "Peppa Pig", time: "14:30 – 16:00", live: false },
  ],
};

type TabKey = keyof typeof EPG_DATA;

export function LiveChannelPreview() {
  const [tab, setTab] = useState<TabKey>("Sports");

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Live Preview</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            What&apos;s on <span className="gradient-brand-text">right now</span>
          </h2>
          <p className="text-zinc-400">
            A live snapshot of what&apos;s streaming on ULTRASTREAM tonight.
          </p>
        </div>

        <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
              <TabsList className="bg-white/5 border border-white/10">
                {(Object.keys(EPG_DATA) as TabKey[]).map((key) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:gradient-brand data-[state=active]:text-white data-[state=active]:border-0"
                  >
                    {key}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="divide-y divide-white/5">
            {EPG_DATA[tab].map((item) => (
              <div
                key={item.channel}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  {item.channel.slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-white truncate">{item.now}</p>
                    {item.live && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[10px] px-1.5 py-0 shrink-0">
                        LIVE
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500">
                    Next: {item.next}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-zinc-400">{item.time}</p>
                  <p className="text-xs text-zinc-600">{item.channel}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/5 text-center">
            <p className="text-xs text-zinc-500">
              Showing sample EPG data. Full 7-day guide available on all plans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
