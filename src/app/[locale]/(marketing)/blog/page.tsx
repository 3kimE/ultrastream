import { generateSEO } from "@/lib/seo";
import { BLOG_POSTS } from "@/lib/data/blog";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = generateSEO({
  title: "Blog — IPTV Guides & News",
  description: "IPTV setup guides, device tutorials, sports streaming tips, and industry news from the ULTRASTREAM team.",
  canonical: "https://ultrastream.tv/blog",
});

const CATEGORIES = ["All", "IPTV Guides", "Device Setup", "Sports Streaming", "Comparisons", "Industry News"];

export default function BlogPage() {
  return (
    <div className="pt-20 min-h-screen">
      <section className="py-16 px-4 sm:px-6 border-b border-white/5 bg-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Resources</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            IPTV Guides & <span className="gradient-brand-text">Tutorials</span>
          </h1>
          <p className="text-zinc-400">Real, technical content to help you get the most from your IPTV subscription.</p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 rounded-xl text-sm font-medium border border-white/10 text-zinc-400 hover:border-blue-500/30 hover:text-blue-400 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured post */}
          <Link href={`/blog/${BLOG_POSTS[0].slug}`} className="block mb-8 group">
            <div className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/20 transition-all duration-200 grid lg:grid-cols-2 gap-0">
              <div className="relative aspect-video lg:aspect-auto">
                <Image
                  src={BLOG_POSTS[0].coverImage}
                  alt={BLOG_POSTS[0].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4 bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {BLOG_POSTS[0].category}
                </Badge>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:gradient-brand-text transition-all leading-snug">
                  {BLOG_POSTS[0].title}
                </h2>
                <p className="text-zinc-400 text-sm mb-5 leading-relaxed">{BLOG_POSTS[0].excerpt}</p>
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{BLOG_POSTS[0].author} · {BLOG_POSTS[0].date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {BLOG_POSTS[0].readTime}
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Post grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {BLOG_POSTS.slice(1).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-blue-500/20 transition-all duration-200">
                  <div className="relative aspect-video">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <Badge className="w-fit mb-3 bg-white/10 text-zinc-300 border-white/10 text-xs">
                      {post.category}
                    </Badge>
                    <h3 className="font-semibold text-white mb-2 leading-snug group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-zinc-600">
                      <span>{post.date}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* More posts CTA */}
          <div className="text-center mt-10">
            <button className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl border border-white/10 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors">
              Load more articles
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
