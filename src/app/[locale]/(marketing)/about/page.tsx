import { generateSEO } from "@/lib/seo";
import { CTABanner } from "@/components/sections/cta-banner";
import { StatsCounter } from "@/components/sections/stats-counter";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = generateSEO({
  title: "About Us",
  description: `${SITE_CONFIG.name} was founded by streaming engineers to deliver the best IPTV experience. Learn our story.`,
  canonical: "https://ultrastream.tv/about",
});

const TEAM = [
  { name: "Alex Rivera", role: "CEO & Co-Founder", bio: "Former VP Engineering at a major streaming platform. 12 years in video delivery." },
  { name: "Sana Karimi", role: "CTO", bio: "Built CDN infrastructure at scale. Expert in low-latency streaming protocols." },
  { name: "James O'Brien", role: "Head of Support", bio: "Customer success specialist. Believes every customer deserves a response in under 5 minutes." },
  { name: "Priya Nair", role: "Head of Content", bio: "Manages channel licensing partnerships across 150+ countries." },
];

const VALUES = [
  { emoji: "🔒", title: "Privacy First", desc: "We never sell user data. Zero logging policy. VPN-compatible by design." },
  { emoji: "⚡", title: "Speed Obsessed", desc: "Sub-second channel switching. 99.9% uptime SLA. Anti-freeze on every stream." },
  { emoji: "🌍", title: "Global by Default", desc: "Built for international users from day one. 5 languages, 150 countries." },
  { emoji: "🤝", title: "Radical Transparency", desc: "No hidden fees. Clear refund policy. Real channel counts, not marketing fluff." },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 border-b border-white/5 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Our Story</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Built by streamers,{" "}
            <span className="gradient-brand-text">for streamers</span>
          </h1>
          <p className="text-zinc-300 text-lg leading-relaxed mb-6">
            {SITE_CONFIG.name} was founded in 2020 by a team of streaming engineers who were tired of paying $150/month for cable channels they never watched — and frustrated by IPTV providers that looked like scam sites and buffered every 10 minutes.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            We set out to build the IPTV service we wished existed: blazing fast, honest about what it delivers, easy to set up, and backed by real human support. Today we serve 50,000+ customers across 150+ countries, with a 98% satisfaction rate and a team that responds in under 4 minutes.
          </p>
        </div>
      </section>

      <StatsCounter />

      {/* Values */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">What we stand for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ emoji, title, desc }) => (
              <div key={title} className="glass-card rounded-2xl p-6 border border-white/10 text-center">
                <p className="text-4xl mb-4">{emoji}</p>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 sm:px-6 bg-surface/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center">The team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map(({ name, role, bio }) => (
              <div key={name} className="glass-card rounded-2xl p-6 border border-white/10">
                <div className="w-14 h-14 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-lg mb-4">
                  {name.split(" ").map((n) => n[0]).join("")}
                </div>
                <p className="font-semibold text-white text-sm mb-0.5">{name}</p>
                <p className="text-xs text-blue-400 mb-3">{role}</p>
                <p className="text-xs text-zinc-500 leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Server locations */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Global CDN Infrastructure</h2>
          <p className="text-zinc-400 mb-8">12 server regions ensure the lowest latency wherever you are.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["New York", "Los Angeles", "London", "Amsterdam", "Paris", "Frankfurt", "Dubai", "Singapore", "Tokyo", "Sydney", "São Paulo", "Toronto"].map((city) => (
              <div key={city} className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card border border-white/10">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-zinc-300">{city}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
