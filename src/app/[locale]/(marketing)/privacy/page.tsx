import { generateSEO } from "@/lib/seo";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = generateSEO({
  title: "Privacy Policy",
  canonical: "https://ultrastream.tv/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm mb-10">Last updated: January 1, 2026</p>

        <div className="space-y-8 text-sm text-zinc-300 leading-relaxed">
          {[
            {
              title: "1. Information We Collect",
              content: "We collect: (a) Account information (email address, contact details); (b) Payment information (processed by Stripe/PayPal — we never store card numbers); (c) Usage data (device type, connection timestamps, IP address); (d) Support communications.",
            },
            {
              title: "2. How We Use Your Information",
              content: "We use your information to: deliver your subscription, send activation credentials, provide customer support, detect and prevent abuse, and send transactional emails. We do not sell your personal data to third parties.",
            },
            {
              title: "3. Data Storage & Security",
              content: "Data is stored on encrypted servers in the EU and USA. Payment data is handled by PCI-DSS compliant processors. We use TLS 1.3 for all data in transit. Passwords are hashed using bcrypt.",
            },
            {
              title: "4. Cookies",
              content: "We use essential cookies for session management and analytics cookies (opt-in) for understanding how users interact with our site. You can manage cookie preferences via our cookie banner. We use PostHog for analytics, which anonymizes IP addresses by default.",
            },
            {
              title: "5. GDPR Rights (EU Users)",
              content: `Under GDPR, EU users have the right to: access their personal data, correct inaccurate data, request deletion ('right to be forgotten'), data portability, and object to processing. Submit requests to ${SITE_CONFIG.email}.`,
            },
            {
              title: "6. Data Retention",
              content: "Account data is retained for the duration of your subscription plus 90 days. After account deletion, data is purged within 30 days except where required by law (e.g., transaction records for tax compliance, retained for 7 years).",
            },
            {
              title: "7. Children's Privacy",
              content: "Our service is not directed to children under 13. We do not knowingly collect personal information from children.",
            },
            {
              title: "8. Contact",
              content: `Privacy questions or GDPR requests: ${SITE_CONFIG.email}`,
            },
          ].map(({ title, content }) => (
            <section key={title}>
              <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
              <p>{content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
