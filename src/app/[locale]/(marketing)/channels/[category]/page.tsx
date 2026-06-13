import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { CHANNELS, CHANNEL_CATEGORIES, type ChannelCategory } from "@/lib/data/channels";
import { generateSEO } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { CTABanner } from "@/components/sections/cta-banner";

export async function generateStaticParams() {
  return CHANNEL_CATEGORIES.map((cat) => ({
    category: cat.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

function slugToCategory(slug: string): ChannelCategory | undefined {
  return CHANNEL_CATEGORIES.find(
    (c) => c.name.toLowerCase().replace(/\s+/g, "-") === slug
  )?.name;
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = slugToCategory(category);
  if (!cat) return {};
  const catData = CHANNEL_CATEGORIES.find((c) => c.name === cat)!;
  return generateSEO({
    title: `${cat} Channels — ${catData.count.toLocaleString()}+ Channels`,
    description: `Browse ${catData.count.toLocaleString()}+ ${cat} channels available on ULTRASTREAM. All included in every plan with 4K streaming.`,
    canonical: `https://ultrastream.tv/channels/${category}`,
  });
}

export default async function CategoryChannelsPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = slugToCategory(category);
  if (!cat) notFound();

  const catData = CHANNEL_CATEGORIES.find((c) => c.name === cat)!;
  const channels = CHANNELS.filter((c) => c.category === cat);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="py-14 px-4 sm:px-6 border-b border-white/5 bg-surface/30">
        <div className="max-w-5xl mx-auto">
          <Link href="/channels" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All channels
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            <span className="gradient-brand-text">{cat}</span> Channels
          </h1>
          <p className="text-zinc-400 text-lg mb-4">
            {catData.count.toLocaleString()}+ {cat.toLowerCase()} channels from around the world.
            All included in every ULTRASTREAM plan.
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              {catData.count.toLocaleString()}+ channels
            </Badge>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
              Available on all plans
            </Badge>
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
              4K streams available
            </Badge>
          </div>
        </div>
      </section>

      {/* Channel grid */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {channels.length > 0 ? (
            <>
              <p className="text-sm text-zinc-500 mb-6">
                Showing {channels.length} sample channels. Full library of {catData.count.toLocaleString()}+ available on all plans.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    className="channel-card rounded-xl p-3 flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: channel.logoColor }}
                    >
                      {channel.logoInitials}
                    </div>
                    <p className="text-xs font-medium text-zinc-300 text-center truncate w-full">{channel.name}</p>
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

              {/* More channels note */}
              <div className="mt-10 glass-card rounded-2xl border border-blue-500/20 p-6 text-center">
                <p className="text-white font-semibold mb-1">
                  + {(catData.count - channels.length).toLocaleString()} more {cat} channels in your subscription
                </p>
                <p className="text-sm text-zinc-400 mb-4">
                  This page shows a sample. All {catData.count.toLocaleString()}+ {cat.toLowerCase()} channels are unlocked when you subscribe.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Get all {catData.count.toLocaleString()}+ {cat} channels →
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-zinc-500">
              Sample channels for this category coming soon.
              <Link href="/pricing" className="block mt-4 text-blue-400 hover:underline">
                Subscribe to access all {catData.count.toLocaleString()}+ {cat} channels
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      <section className="py-10 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Browse other categories</h3>
          <div className="flex flex-wrap gap-3">
            {CHANNEL_CATEGORIES.filter((c) => c.name !== cat).map((c) => (
              <Link
                key={c.name}
                href={`/channels/${c.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-4 py-2 rounded-xl glass-card border border-white/10 hover:border-blue-500/30 text-sm text-zinc-300 hover:text-white transition-all"
              >
                {c.name} <span className="text-zinc-600 ml-1">({c.count.toLocaleString()})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
