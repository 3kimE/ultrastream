import { generateSEO } from "@/lib/seo";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTABanner } from "@/components/sections/cta-banner";
import { FAQS } from "@/lib/data/faqs";

export const metadata = generateSEO({
  title: "FAQ",
  description: "Answers to common questions about ULTRASTREAM IPTV: channels, devices, billing, refunds, setup, and more.",
  canonical: "https://ultrastream.tv/faq",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FAQPage() {
  return (
    <div className="pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <section className="py-16 px-4 sm:px-6 border-b border-white/5 bg-surface/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Support</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="gradient-brand-text">Questions</span>
          </h1>
          <p className="text-zinc-400">
            Everything you need to know. Can&apos;t find what you&apos;re looking for? Chat with us on WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <FAQAccordion showSearch showCategories />
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
