"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Zap, Shield, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function Hero() {
  const t = useTranslations("hero");

  const TRUST_BADGES = [
    { icon: Zap,    key: "trust4k" },
    { icon: Shield, key: "trustUptime" },
    { icon: Clock,  key: "trustActivation" },
    { icon: Play,   key: "trustSupport" },
  ] as const;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid pt-20">
      <div className="absolute inset-0 gradient-hero-glow pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20">
            <span className="animate-pulse-dot inline-block w-2 h-2 bg-green-400 rounded-full me-2" />
            {SITE_CONFIG.activeUsers.toLocaleString()} {t("badge")}
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-none tracking-tight mb-6">
            {t("headline1")}{" "}
            <span className="block">
              {(SITE_CONFIG.channelCount / 1000).toFixed(0)}K+{" "}
              <span className="gradient-brand-text">{t("headline2")}</span>
            </span>
            <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-300">
              {t("headline3")}
            </span>
          </h1>

          <p className="text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
            {t("subheadline")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link href="/free-trial">
              <Button size="lg" className="gradient-brand border-0 text-white font-semibold text-base px-8 py-4 h-auto glow-blue hover:opacity-90 transition-all w-full sm:w-auto">
                <Zap className="w-5 h-5 me-2" />
                {t("ctaPrimary")}
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 text-base px-8 py-4 h-auto w-full sm:w-auto">
                <Play className="w-4 h-4 me-2" />
                {t("ctaSecondary")}
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-3">
            {TRUST_BADGES.map(({ icon: Icon, key }) => (
              <div key={key} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <Icon className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium text-zinc-300">{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TV mockup */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-75" />
            <div className="relative glass-card rounded-2xl border border-white/10 p-3 glow-blue-sm">
              <div className="flex items-center gap-2 mb-2 px-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 h-5 rounded-md bg-white/5 flex items-center px-2">
                  <span className="text-[10px] text-zinc-500">ultrastream.tv — Live Channels</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 p-2">
                {CHANNEL_GRID.map((ch) => (
                  <div key={ch.name} className="aspect-video rounded-lg flex flex-col items-center justify-center gap-1 border border-white/5 hover:border-blue-500/30 transition-colors" style={{ backgroundColor: ch.color + "22" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: ch.color }}>
                      {ch.initials}
                    </div>
                    <span className="text-[9px] text-zinc-400 truncate w-full text-center px-1">{ch.name}</span>
                    {ch.live && <span className="text-[8px] bg-red-500 text-white px-1.5 rounded-full font-bold">LIVE</span>}
                  </div>
                ))}
              </div>
              <div className="mt-2 mx-2 px-3 py-1.5 rounded-lg bg-white/5 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500">
                  <span className="text-green-400 font-semibold">● </span>
                  {SITE_CONFIG.streamingChannels.toLocaleString()} channels live
                </span>
                <span className="text-[10px] text-blue-400 font-semibold">4K UHD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

const CHANNEL_GRID = [
  { name: "ESPN",      initials: "ES", color: "#CC0000", live: true },
  { name: "HBO",       initials: "HB", color: "#000080", live: false },
  { name: "BBC News",  initials: "BB", color: "#BB1919", live: true },
  { name: "Sky Sports",initials: "SS", color: "#0072C6", live: true },
  { name: "Nat Geo",   initials: "NG", color: "#FFCC00", live: false },
  { name: "CNN",       initials: "CN", color: "#CC0000", live: true },
  { name: "Discovery", initials: "DC", color: "#00A8E0", live: false },
  { name: "NBA TV",    initials: "NB", color: "#1D428A", live: true },
  { name: "beIN",      initials: "BS", color: "#8B0000", live: true },
];
