import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Check, X, Zap } from "lucide-react";
import { generateSEO } from "@/lib/seo";
import { CTABanner } from "@/components/sections/cta-banner";
import { SITE_CONFIG } from "@/lib/constants";

const COMPETITORS: Record<string, {
  name: string;
  price: string;
  channels: string;
  vod: string;
  trial: string;
  support: string;
  uptime: string;
  setup: string;
  refund: string;
  verdict: string;
}> = {
  "nigma-tv": {
    name: "Nigma TV",
    price: "$19.99/mo",
    channels: "~60,000",
    vod: "~50,000",
    trial: "12 hours",
    support: "Ticket only",
    uptime: "~99.5%",
    setup: "~15 min",
    refund: "No refund policy",
    verdict: "Nigma TV offers decent channel count but charges nearly 3× more per month with no clear refund policy and slower setup. Their support is ticket-based only — no WhatsApp or live chat.",
  },
  "xtreme-hd-iptv": {
    name: "Xtreme HD IPTV",
    price: "$14.99/mo",
    channels: "~80,000",
    vod: "~70,000",
    trial: "24 hours",
    support: "Email + Telegram",
    uptime: "~99.7%",
    setup: "~10 min",
    refund: "3-day guarantee",
    verdict: "Xtreme HD IPTV is a solid mid-tier option but their 3-day refund window is half of ours, and their pricing at $14.99/month compares poorly to our $7.50/month on annual plans.",
  },
  "apollo-group-tv": {
    name: "Apollo Group TV",
    price: "$15/mo",
    channels: "~70,000",
    vod: "~60,000",
    trial: "None publicly",
    support: "Discord + Email",
    uptime: "~99.6%",
    setup: "~20 min",
    refund: "Case by case",
    verdict: "Apollo Group TV has a good community on Discord but no public free trial, a vague refund policy, and significantly fewer channels than ULTRASTREAM.",
  },
  "falcon-iptv": {
    name: "Falcon IPTV",
    price: "$12/mo",
    channels: "~50,000",
    vod: "~40,000",
    trial: "None",
    support: "Email",
    uptime: "~99.4%",
    setup: "~15 min",
    refund: "No",
    verdict: "Falcon IPTV offers no free trial and no refund guarantee, making it a risk for new subscribers. Their channel count at 50,000 is less than half of ULTRASTREAM's library.",
  },
  "kemo-iptv": {
    name: "Kemo IPTV",
    price: "$10/mo",
    channels: "~35,000",
    vod: "~30,000",
    trial: "None",
    support: "WhatsApp",
    uptime: "~99.2%",
    setup: "~20 min",
    refund: "No",
    verdict: "Kemo IPTV is budget-priced but cuts corners on channel count, has no free trial, and reported uptime issues on premium channels. Not recommended for sports streaming.",
  },
};

export async function generateStaticParams() {
  return Object.keys(COMPETITORS).map((slug) => ({ competitor: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ competitor: string }> }) {
  const { competitor } = await params;
  const comp = COMPETITORS[competitor];
  if (!comp) return {};
  return generateSEO({
    title: `${SITE_CONFIG.name} vs ${comp.name}: Which is Better? (2026)`,
    description: `Detailed comparison of ${SITE_CONFIG.name} vs ${comp.name}. Channel count, pricing, uptime, refund policy, support — see which wins.`,
    canonical: `https://ultrastream.tv/vs/${competitor}`,
  });
}

const ROWS = [
  { label: "Channels", us: `${(SITE_CONFIG.channelCount / 1000).toFixed(0)}K+`, them: (c: (typeof COMPETITORS)[string]) => c.channels },
  { label: "VOD Library", us: `${(SITE_CONFIG.vodCount / 1000).toFixed(0)}K+`, them: (c: (typeof COMPETITORS)[string]) => c.vod },
  { label: "Price / month", us: "From $7.50", them: (c: (typeof COMPETITORS)[string]) => c.price },
  { label: "Free Trial", us: "24 hours", them: (c: (typeof COMPETITORS)[string]) => c.trial },
  { label: "Customer Support", us: "WhatsApp + Telegram (24/7)", them: (c: (typeof COMPETITORS)[string]) => c.support },
  { label: "Uptime SLA", us: `${SITE_CONFIG.uptime}%`, them: (c: (typeof COMPETITORS)[string]) => c.uptime },
  { label: "Typical Setup Time", us: "< 5 minutes", them: (c: (typeof COMPETITORS)[string]) => c.setup },
  { label: "Money-Back Guarantee", us: "7 days", them: (c: (typeof COMPETITORS)[string]) => c.refund },
  { label: "4K UHD Channels", us: "Yes (dedicated)", them: () => "Limited" },
  { label: "EPG Guide", us: "7 days ahead", them: () => "Varies" },
  { label: "Multi-Language Support", us: "EN, FR, ES, AR, PT", them: () => "English only" },
  { label: "Crypto Payments", us: "BTC, USDT, ETH", them: () => "Varies" },
];

export default async function VsPage({ params }: { params: Promise<{ competitor: string }> }) {
  const { competitor } = await params;
  const comp = COMPETITORS[competitor];
  if (!comp) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${SITE_CONFIG.name} vs ${comp.name}`,
    description: `Detailed comparison between ${SITE_CONFIG.name} and ${comp.name} IPTV services.`,
  };

  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 border-b border-white/5 bg-surface/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Comparison · 2026</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            <span className="gradient-brand-text">{SITE_CONFIG.name}</span>
            {" "}vs{" "}
            <span className="text-zinc-300">{comp.name}</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            An honest, feature-by-feature breakdown. No marketing spin — just the numbers.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-sm font-semibold text-zinc-400 w-1/3">Feature</th>
                <th className="p-4 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg gradient-brand text-white text-sm font-bold">
                    {SITE_CONFIG.name} ✓
                  </div>
                </th>
                <th className="p-4 text-center text-sm font-semibold text-zinc-400">{comp.name}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.label} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                  <td className="p-4 text-sm text-zinc-300 font-medium">{row.label}</td>
                  <td className="p-4 text-center text-sm text-green-400 font-medium">{row.us}</td>
                  <td className="p-4 text-center text-sm text-zinc-400">{typeof row.them === "function" ? row.them(comp) : row.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Verdict */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto glass-card rounded-2xl border border-blue-500/20 p-8">
          <h2 className="text-xl font-bold text-white mb-3">Our honest verdict</h2>
          <p className="text-zinc-300 leading-relaxed mb-6">{comp.verdict}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
              <p className="text-sm font-semibold text-green-400 mb-1">Why choose {SITE_CONFIG.name}</p>
              <ul className="space-y-1.5">
                {["More channels at a lower price", "Longer free trial (24h)", "7-day money-back guarantee", "WhatsApp support 24/7", "Multi-language platform"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
              <p className="text-sm font-semibold text-red-400 mb-1">Where {comp.name} falls short</p>
              <ul className="space-y-1.5">
                {["Higher price per month", "Fewer channels in library", "Weaker or no refund policy", "Limited support channels", "No free trial or shorter"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                    <X className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Other comparisons */}
      <section className="py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Compare with other providers</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(COMPETITORS)
              .filter(([slug]) => slug !== competitor)
              .map(([slug, c]) => (
                <Link
                  key={slug}
                  href={`/vs/${slug}`}
                  className="px-4 py-2 rounded-xl glass-card border border-white/10 hover:border-blue-500/30 text-sm text-zinc-300 hover:text-white transition-all"
                >
                  {SITE_CONFIG.name} vs {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
