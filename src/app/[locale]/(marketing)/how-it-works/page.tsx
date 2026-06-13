import { generateSEO } from "@/lib/seo";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CTABanner } from "@/components/sections/cta-banner";
import { DeviceGrid } from "@/components/sections/device-grid";
import { Link } from "@/i18n/navigation";
import { MessageCircle, Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = generateSEO({
  title: "How It Works",
  description: "Get started with ULTRASTREAM in under 7 minutes. Choose a plan, pay securely, receive credentials in 60 seconds, install on any device.",
  canonical: "https://ultrastream.tv/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <div className="pt-20">
      <section className="py-16 px-4 sm:px-6 border-b border-white/5 bg-surface/30">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Setup</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Up and running in{" "}
            <span className="gradient-brand-text">7 minutes</span>
          </h1>
          <p className="text-zinc-400 text-lg">No technician. No waiting days. Just streaming.</p>
        </div>
      </section>

      <HowItWorks />
      <DeviceGrid />

      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still confused? We&apos;ll help you live.</h2>
          <p className="text-zinc-400 mb-8">
            Our support team responds in under 4 minutes on average — any time of day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`}
              className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-white font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              Chat on WhatsApp
            </a>
            <a
              href={`https://t.me/${SITE_CONFIG.telegram.replace("@", "")}`}
              className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-white font-medium transition-colors"
            >
              <Send className="w-5 h-5 text-blue-400" />
              Message on Telegram
            </a>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
