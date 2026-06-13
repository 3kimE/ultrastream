import { generateSEO } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = generateSEO({
  title: "Terms of Service",
  noIndex: false,
  canonical: "https://ultrastream.tv/terms",
});

export default function TermsPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-zinc-500 text-sm mb-10">Last updated: January 1, 2026</p>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8 text-sm text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using {SITE_CONFIG.name} services, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Service Description</h2>
            <p>{SITE_CONFIG.name} provides a technology platform for accessing publicly available and licensed content streams from global broadcasters. We do not host, produce, or control the content streamed through our platform. Users are responsible for ensuring they have the right to access content in their jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. User Obligations</h2>
            <p>You agree to: (a) provide accurate registration information; (b) use the service only for personal, non-commercial purposes; (c) not share, resell, or redistribute your credentials without an active reseller agreement; (d) comply with all applicable laws in your jurisdiction.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Payment & Subscription</h2>
            <p>All subscriptions are prepaid and non-auto-renewing. Prices are shown in USD. Payment is processed via Stripe, PayPal, or NowPayments (crypto). We reserve the right to modify pricing with 30 days notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Refund Policy</h2>
            <p>We offer a 7-day money-back guarantee on all plans. Refund requests must be submitted within 7 days of purchase. Refunds are processed within 3-5 business days. See our full <a href="/refund" className="text-blue-400 hover:underline">Refund Policy</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Termination</h2>
            <p>We reserve the right to suspend or terminate accounts that violate these terms, engage in abusive behavior toward support staff, attempt to circumvent technical protection measures, or use the service for commercial redistribution without authorization.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Limitation of Liability</h2>
            <p>{SITE_CONFIG.name} is provided &quot;as is&quot;. We do not guarantee uninterrupted service. Our maximum liability to any user is limited to the amount paid for the current subscription period.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Contact</h2>
            <p>For questions about these terms, contact us at <a href={`mailto:${SITE_CONFIG.email}`} className="text-blue-400 hover:underline">{SITE_CONFIG.email}</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
