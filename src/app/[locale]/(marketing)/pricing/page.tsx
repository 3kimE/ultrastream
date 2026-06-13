import { generateSEO } from "@/lib/seo";
import { PricingCards } from "@/components/sections/pricing-cards";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTABanner } from "@/components/sections/cta-banner";
import { Check, Shield } from "lucide-react";
import { RESELLER_PLANS } from "@/lib/data/plans";

export const metadata = generateSEO({
  title: "Pricing",
  description: "IPTV subscription plans from $7.50/month. 110,000+ channels, 4K streaming, no contracts. 7-day money-back guarantee.",
  canonical: "https://ultrastream.tv/pricing",
});

const PAYMENT_METHODS = [
  { name: "Visa", color: "#1A1F71" },
  { name: "Mastercard", color: "#EB001B" },
  { name: "PayPal", color: "#003087" },
  { name: "Bitcoin", color: "#F7931A" },
  { name: "USDT", color: "#26A17B" },
  { name: "Ethereum", color: "#627EEA" },
];

export default function PricingPage() {
  return (
    <div className="pt-20">
      <PricingCards variant="full" />

      {/* Add-ons */}
      <section className="py-10 px-4 sm:px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Optional Add-ons</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: "Extra Connection", price: "+$3/mo", desc: "Add a 4th simultaneous stream" },
              { name: "4K Priority Access", price: "+$2/mo", desc: "Priority routing on 4K servers" },
              { name: "Adult Channels", price: "+$5/mo", desc: "Optional. Disabled by default." },
            ].map((addon) => (
              <div key={addon.name} className="glass-card rounded-xl p-4 border border-white/10 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{addon.name}</p>
                  <p className="text-xs text-zinc-500">{addon.desc}</p>
                </div>
                <span className="text-blue-400 font-semibold text-sm shrink-0">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reseller strip */}
      <section className="py-10 px-4 sm:px-6 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Selling IPTV?</h3>
            <p className="text-zinc-400 text-sm">Get reseller credits at up to 70% discount. Keep 100% of profit.</p>
          </div>
          <a href="/reseller" className="px-6 py-3 rounded-xl gradient-brand text-white font-semibold text-sm hover:opacity-90 transition-opacity shrink-0">
            View Reseller Plans →
          </a>
        </div>
      </section>

      {/* Payment methods */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">Accepted payment methods</p>
          <div className="flex flex-wrap justify-center gap-3">
            {PAYMENT_METHODS.map((pm) => (
              <div key={pm.name} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-zinc-300">
                {pm.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money-back guarantee */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-sm mx-auto glass-card rounded-2xl p-8 border border-green-500/20 text-center">
          <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">7-Day Money-Back Guarantee</h3>
          <p className="text-sm text-zinc-400">
            Not satisfied within 7 days? Full refund, no questions asked. We stand behind our quality.
          </p>
          <div className="mt-4 space-y-2">
            {["Full refund within 3-5 business days", "No cancellation fees", "No questions asked"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ComparisonTable />

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Billing FAQ</h2>
          <FAQAccordion category="Billing" />
          <FAQAccordion category="Refunds" />
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
