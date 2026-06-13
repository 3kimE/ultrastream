import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Clock, User } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data/blog";
import { generateSEO } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { CTABanner } from "@/components/sections/cta-banner";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return generateSEO({
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    canonical: `https://ultrastream.tv/blog/${slug}`,
  });
}

const PLACEHOLDER_CONTENT: Record<string, string[]> = {
  "best-iptv-2026-complete-guide": [
    "The IPTV industry has matured dramatically since 2020. What was once a fragmented market of questionable resellers has evolved into a competitive space with legitimate, feature-rich providers offering genuine 4K streams and professional customer support.",
    "When evaluating an IPTV service in 2026, the most important factors are stream stability (not just channel count), server infrastructure quality, support response times, and transparent pricing. Many providers advertise '80,000 channels' but deliver 40% dead links — always use a 24-hour trial before committing.",
    "Our testing across 15 major providers revealed that the average '4K' claim only delivers genuine 4K on 30-40% of advertised channels. True 4K requires H.265/HEVC encoding, a minimum 15 Mbps stream bitrate, and CDN infrastructure that can sustain those bitrates at peak viewing hours (7-10 PM in each timezone).",
    "The best IPTV services in 2026 also include EPG (Electronic Program Guide) data for at least 7 days ahead, Catch-Up TV for key channels, VOD libraries with accurate metadata, and apps optimized for each device type rather than generic M3U loaders.",
  ],
  "how-to-install-iptv-on-firestick": [
    "The Amazon Fire TV Stick is the most popular IPTV device in English-speaking markets — affordable, easy to use, and compatible with every major IPTV app. This guide covers installation on all Fire TV Stick models: Lite, HD, 4K, and 4K Max.",
    "Before installing any IPTV app, you need to enable 'Apps from Unknown Sources'. Navigate to Settings → My Fire TV → Developer Options → Apps from Unknown Sources → toggle ON. Without this step, you cannot sideload any APK files.",
    "The recommended IPTV app for Fire TV is IPTV Smarters Pro. It's the most stable, supports Xtream Codes and M3U, has a proper EPG, and is actively maintained. Download it via the Downloader app using our APK URL in the welcome email.",
    "For Fire TV Stick 4K and 4K Max users: enable 4K Ultra HD in Settings → Display & Sounds → Video Resolution → 4K Ultra HD. Also enable 'Dolby Vision' if your TV supports it for the best HDR picture quality.",
  ],
  "iptv-vs-cable-tv-2026-comparison": [
    "Cable TV in 2026 averages $120-180/month in the US when you include regional sports networks, HD fees, DVR charges, and equipment rental. For that price, you get ~200 local channels, limited 4K content, and a 12-24 month contract.",
    "A premium IPTV subscription covering the same content (and far more) costs $7-15/month with no contract. The math is staggering: a family switching from cable to IPTV saves $1,200-2,000 per year.",
    "The main arguments for keeping cable are reliability and local channels. Cable is generally more stable than IPTV because it doesn't rely on your internet connection. However, with 25+ Mbps internet (now standard in most urban households), a quality IPTV service matches cable stability.",
    "Local channels are available via IPTV for most major US cities, UK regions, and European countries. For hyperlocal programming, a digital antenna ($30 one-time) picks up all over-the-air networks in HD for free.",
  ],
  "best-iptv-for-sports-streaming": [
    "Sports streaming is the most demanding IPTV use case. A football match going to penalties cannot buffer. Champions League final in 720p when your neighbor's cable is showing it in 4K is unacceptable. Sports fans need a premium service, not the cheapest one.",
    "For US sports fans, essential channels include ESPN, ESPN2, Fox Sports, FS1, FS2, NBC Sports, NFL Network, NFL RedZone, NBA TV, MLB Network, NHL Network, and the regional sports networks (RSN) for your local teams.",
    "European football coverage requires Sky Sports (Premier League), BT Sport / TNT Sports (Champions League, Bundesliga, Serie A), beIN Sports (Ligue 1, La Liga), and Canal+ (full European coverage). All major IPTV providers carry these — the difference is stream quality at kickoff.",
    "The biggest differentiator for sports is anti-buffering technology. Premium providers use adaptive bitrate streaming (ABR) that downgrades from 4K to 1080p for 5 seconds rather than freezing for 30 seconds. This is invisible to the eye but critical during fast play.",
  ],
  "4k-iptv-everything-you-need-to-know": [
    "Not all '4K IPTV' is created equal. True 4K means a 3840×2160 pixel resolution stream encoded in H.265/HEVC at 15-25 Mbps. Many providers label 1080p streams as '4K' or use low-bitrate 4K that looks worse than 1080p due to compression artifacts.",
    "To verify genuine 4K: check your IPTV app's stream info during playback. Look for resolution 3840x2160 and bitrate above 12 Mbps. Anything lower is upscaled or heavily compressed — your TV's own upscaler may actually produce better results.",
    "Internet requirements for 4K IPTV: minimum 25 Mbps dedicated to the stream, 50 Mbps recommended if multiple household devices are active. Wired Ethernet is strongly preferred over Wi-Fi for 4K — a single 4K stream can saturate a 2.4GHz Wi-Fi connection under normal home network conditions.",
    "4K-compatible devices for IPTV: Amazon Fire TV Stick 4K Max, Apple TV 4K (3rd gen), NVIDIA SHIELD Pro, Chromecast with Google TV (4K), Samsung/LG Smart TV (2019+), and any Android TV box with 4K/H.265 hardware decoding support.",
  ],
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const content = PLACEHOLDER_CONTENT[slug] ?? ["Content coming soon."];
  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
  };

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          All articles
        </Link>

        <Badge className="mb-5 bg-blue-500/20 text-blue-400 border-blue-500/30">{post.category}</Badge>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-8">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <span>·</span>
          <span>{post.date}</span>
          <span>·</span>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Cover image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 border border-white/10">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-zinc max-w-none space-y-6">
          {content.map((paragraph, i) => (
            <p key={i} className="text-zinc-300 leading-relaxed text-base">
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA in article */}
        <div className="mt-12 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <h3 className="font-bold text-white mb-2">Ready to start streaming?</h3>
          <p className="text-sm text-zinc-400 mb-4">Try ULTRASTREAM free for 24 hours — no credit card required.</p>
          <Link
            href="/free-trial"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-brand text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Start Free Trial
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-12 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Related articles</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <div className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/20 transition-all">
                    <div className="relative aspect-video">
                      <Image src={p.coverImage} alt={p.title} fill sizes="50vw" className="object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors leading-snug">
                        {p.title}
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">{p.readTime}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </div>
  );
}
