import { generateSEO } from "@/lib/seo";
import { CTABanner } from "@/components/sections/cta-banner";
import { Check, Zap, Users, BarChart3, Shield } from "lucide-react";
import { RESELLER_PLANS } from "@/lib/data/plans";
import { Link } from "@/i18n/navigation";

export const metadata = generateSEO({
  title: "Reseller Program",
  description: "Start an IPTV reseller business. Buy wholesale credits at up to 70% discount. White-label panel. Keep 100% of profits.",
  canonical: "https://ultrastream.tv/reseller",
});

const BENEFITS = [
  { icon: Zap, title: "Instant Panel Access", desc: "Create client subscriptions in seconds. No approval delays." },
  { icon: Users, title: "Unlimited Clients", desc: "Manage any number of subscriptions from one dashboard." },
  { icon: BarChart3, title: "Real-Time Analytics", desc: "Track sales, renewals, and revenue in one place." },
  { icon: Shield, title: "White-Label Option", desc: "Branded M3U URLs and custom panel on 500+ credit orders." },
];

export default function ResellerPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 border-b border-white/5 bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">Reseller Program</p>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
            Sell IPTV.{" "}
            <span className="gradient-brand-text">Keep 100%</span>{" "}
            of the profit.
          </h1>
          <p className="text-zinc-400 text-xl mb-8 max-w-2xl mx-auto">
            Start an IPTV reseller business in 24 hours. Buy credits wholesale at up to 70% discount, set your own retail prices, and pocket the difference.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl gradient-brand text-white font-bold text-lg hover:opacity-90 transition-opacity glow-blue"
          >
            <Zap className="w-5 h-5" />
            Apply for Reseller Access
          </Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/20 transition-all text-center">
              <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Credit pricing */}
      <section className="py-16 px-4 sm:px-6 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Wholesale Credit Pricing</h2>
            <p className="text-zinc-400">1 credit = 1 month for 1 user. You set the retail price.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="text-left p-4 text-sm font-semibold text-zinc-400">Credits</th>
                  <th className="p-4 text-center text-sm font-semibold text-zinc-400">Total Price</th>
                  <th className="p-4 text-center text-sm font-semibold text-zinc-400">Per Credit</th>
                  <th className="p-4 text-center text-sm font-semibold text-zinc-400">Discount</th>
                  <th className="p-4 text-center text-sm font-semibold text-zinc-400">Profit at $12/mo retail</th>
                </tr>
              </thead>
              <tbody>
                {RESELLER_PLANS.map((plan) => (
                  <tr key={plan.credits} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-semibold text-white">{plan.credits} credits</td>
                    <td className="p-4 text-center text-zinc-300">${plan.price}</td>
                    <td className="p-4 text-center text-zinc-300">${plan.pricePerCredit.toFixed(2)}</td>
                    <td className="p-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                        -{plan.discount}%
                      </span>
                    </td>
                    <td className="p-4 text-center font-semibold text-green-400">
                      ${((12 - plan.pricePerCredit) * plan.credits).toFixed(0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Everything included</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Reseller control panel (web-based)",
              "Create/renew/suspend subscriptions",
              "Real-time credit balance",
              "Sales & revenue analytics",
              "Custom sub-reseller accounts",
              "API access for automation",
              "Branded M3U URLs (500+ credits)",
              "White-label panel (1000+ credits)",
              "Dedicated account manager (100+ credits)",
              "Marketing materials & logos",
              "All plan tiers available to resell",
              "Bulk renewal discounts",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 p-3 rounded-xl glass-card border border-white/5">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-sm text-zinc-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
