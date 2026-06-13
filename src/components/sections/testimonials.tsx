import Image from "next/image";
import { Star, Play } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data/testimonials";

const FLAG_MAP: Record<string, string> = {
  us: "🇺🇸", gb: "🇬🇧", fr: "🇫🇷", es: "🇪🇸", ae: "🇦🇪", nl: "🇳🇱",
  de: "🇩🇪", ca: "🇨🇦", au: "🇦🇺", br: "🇧🇷",
};

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Customer Reviews</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trusted by{" "}
            <span className="gradient-brand-text">50,000+ streamers</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-yellow-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            <span className="text-zinc-300 text-sm ml-2">4.9/5 from 3,200+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/20 transition-all duration-200 relative">
              {t.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/60 rounded-2xl">
                  <div className="w-14 h-14 rounded-full gradient-brand flex items-center justify-center glow-blue">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-blue-500/30">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-zinc-500 flex items-center gap-1">
                      {FLAG_MAP[t.countryCode] ?? "🌍"} {t.country}
                    </p>
                  </div>
                </div>
                {t.verifiedBuyer && (
                  <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                )}
              </div>

              <div className="flex gap-0.5 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>

              <div className="text-xs text-zinc-600 pt-3 border-t border-white/5">
                {t.plan}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
