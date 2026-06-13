import { generateSEO, ORG_JSON_LD } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { StatsCounter } from "@/components/sections/stats-counter";
import { ChannelMarquee } from "@/components/sections/channel-marquee";
import { FeaturesGrid } from "@/components/sections/features-grid";
import { LiveChannelPreview } from "@/components/sections/live-channel-preview";
import { PricingCards } from "@/components/sections/pricing-cards";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { DeviceGrid } from "@/components/sections/device-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { CTABanner } from "@/components/sections/cta-banner";
import { TrustBadges } from "@/components/sections/trust-badges";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = generateSEO({
  canonical: SITE_CONFIG.url,
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
      />
      <Hero />
      <StatsCounter />
      <ChannelMarquee />
      <FeaturesGrid />
      <LiveChannelPreview />
      <PricingCards variant="homepage" />
      <ComparisonTable />
      <DeviceGrid />
      <Testimonials />
      <HowItWorks />
      <section className="py-16 px-4 sm:px-6 bg-surface/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-zinc-400">Quick answers to the most common questions.</p>
          </div>
          <FAQAccordion limit={8} />
        </div>
      </section>
      <CTABanner />
      <TrustBadges />
    </>
  );
}
