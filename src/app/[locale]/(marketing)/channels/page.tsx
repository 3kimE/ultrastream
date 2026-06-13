"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { CHANNELS, CHANNEL_CATEGORIES, type ChannelCategory } from "@/lib/data/channels";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { code: "all", name: "All Countries", flag: "🌍" },
  { code: "us", name: "USA", flag: "🇺🇸" },
  { code: "gb", name: "UK", flag: "🇬🇧" },
  { code: "fr", name: "France", flag: "🇫🇷" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "es", name: "Spain", flag: "🇪🇸" },
  { code: "it", name: "Italy", flag: "🇮🇹" },
  { code: "pt", name: "Portugal", flag: "🇵🇹" },
  { code: "br", name: "Brazil", flag: "🇧🇷" },
  { code: "in", name: "India", flag: "🇮🇳" },
  { code: "qa", name: "Qatar", flag: "🇶🇦" },
  { code: "sa", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "jp", name: "Japan", flag: "🇯🇵" },
  { code: "za", name: "South Africa", flag: "🇿🇦" },
  { code: "au", name: "Australia", flag: "🇦🇺" },
];

const PAGE_SIZE = 48;

export default function ChannelsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ChannelCategory | "all">("all");
  const [activeCountry, setActiveCountry] = useState("all");
  const [page, setPage] = useState(1);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let result = CHANNELS;
    if (activeCategory !== "all") result = result.filter((c) => c.category === activeCategory);
    if (activeCountry !== "all") result = result.filter((c) => c.countryCode === activeCountry);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }
    return result;
  }, [search, activeCategory, activeCountry]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero strip */}
      <section className="py-12 px-4 sm:px-6 border-b border-white/5 bg-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Channel Library</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Browse{" "}
            <span className="gradient-brand-text">110,000+</span> live channels
          </h1>
          <p className="text-zinc-400">Across 150+ countries. All included in every plan.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Category</p>
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveCategory("all"); setPage(1); }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between",
                      activeCategory === "all" ? "bg-blue-500/15 text-blue-400" : "text-zinc-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>All Categories</span>
                    <span className="text-xs text-zinc-600">{CHANNELS.length}</span>
                  </button>
                  {CHANNEL_CATEGORIES.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => { setActiveCategory(cat.name); setPage(1); }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between",
                        activeCategory === cat.name ? "bg-blue-500/15 text-blue-400" : "text-zinc-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-zinc-600">{cat.count.toLocaleString()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">Country</p>
                <div className="space-y-1 max-h-80 overflow-y-auto">
                  {COUNTRIES.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => { setActiveCountry(country.code); setPage(1); }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2",
                        activeCountry === country.code ? "bg-blue-500/15 text-blue-400" : "text-zinc-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span>{country.flag}</span>
                      <span>{country.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Search + filter chips */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="search"
                  placeholder={`Search 110,000+ channels...`}
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500/50 text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {["Sports", "Movies", "News", "Kids", "4K", "Premium"].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => {
                      const cat = chip === "4K" ? "all" : chip as ChannelCategory;
                      setActiveCategory(cat);
                      setPage(1);
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-zinc-400 hover:border-blue-500/30 hover:text-blue-400 transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-zinc-500">
                Showing <span className="text-white font-medium">{paginated.length}</span> of{" "}
                <span className="text-white font-medium">{filtered.length}</span> channels
              </p>
              <Filter className="w-4 h-4 text-zinc-600" />
            </div>

            {/* Channel grid */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {[...Array(24)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-xl bg-white/5" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {paginated.map((channel) => (
                  <div
                    key={channel.id}
                    className="channel-card rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer group"
                    title={`${channel.name} — Available on all plans`}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                      style={{ backgroundColor: channel.logoColor }}
                    >
                      {channel.logoInitials}
                    </div>
                    <p className="text-xs font-medium text-zinc-300 text-center leading-tight truncate w-full text-center">
                      {channel.name}
                    </p>
                    <div className="flex gap-1 flex-wrap justify-center">
                      {channel.isLive && (
                        <Badge className="text-[9px] px-1.5 py-0 bg-red-500/20 text-red-400 border-red-500/30">LIVE</Badge>
                      )}
                      {channel.is4K && (
                        <Badge className="text-[9px] px-1.5 py-0 bg-blue-500/20 text-blue-400 border-blue-500/30">4K</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load more */}
            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-8 py-3 rounded-xl border border-white/10 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  Load more channels
                </button>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20 text-zinc-500">
                No channels found. Try a different search or filter.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
