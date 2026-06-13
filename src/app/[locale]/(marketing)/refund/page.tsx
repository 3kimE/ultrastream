import { generateSEO } from "@/lib/seo";
import { Shield, Check } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = generateSEO({
  title: "Refund Policy",
  description: "ULTRASTREAM offers a 7-day money-back guarantee on all plans. No questions asked.",
  canonical: "https://ultrastream.tv/refund",
});

export default function RefundPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Badge */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
            <Shield className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">7-Day Money-Back Guarantee</h1>
          <p className="text-zinc-400 max-w-md">
            We stand behind our quality. If you&apos;re not satisfied within 7 days, we&apos;ll refund you — no questions asked.
          </p>
        </div>

        {/* Quick summary */}
        <div className="glass-card rounded-2xl p-6 border border-green-500/20 mb-10">
          <h2 className="font-semibold text-white mb-4">The short version</h2>
          <div className="space-y-3">
            {[
              "Request a refund within 7 days of purchase",
              "Send your order number to support",
              "Refund processed within 3-5 business days",
              "Full amount returned — no deductions",
              "No explanation required",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-sm text-zinc-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8 text-sm text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">Eligibility</h2>
            <p>Refunds are available on all plans within 7 calendar days of the original purchase date. The 7-day window begins at the moment of payment confirmation, not credential delivery.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">How to Request a Refund</h2>
            <p>Contact our support team via WhatsApp, Telegram, or email ({SITE_CONFIG.email}) with your order number and email address. We will process your refund immediately without requiring any explanation.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Refund Processing Time</h2>
            <p>Card payments (Visa/Mastercard): 3-5 business days to appear on your statement, depending on your bank. PayPal: 1-2 business days. Crypto payments: refunded in equivalent USDT to your wallet address, or as store credit at your preference. Processing time is 24-48 hours.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Exceptions</h2>
            <p>We reserve the right to decline refund requests from accounts found to be in violation of our Terms of Service, accounts with evidence of credential sharing or redistribution, and duplicate or chargeback-related claims.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">After the 7-Day Window</h2>
            <p>After 7 days, subscriptions are non-refundable. However, if you experience persistent technical issues that our support team cannot resolve within 48 hours, we will issue a prorated credit toward your next renewal.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
