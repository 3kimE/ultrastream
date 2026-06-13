import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";
import { DEVICES } from "@/lib/data/devices";
import { generateSEO } from "@/lib/seo";
import { CTABanner } from "@/components/sections/cta-banner";

export async function generateStaticParams() {
  return DEVICES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const device = DEVICES.find((d) => d.slug === slug);
  if (!device) return {};
  return generateSEO({
    title: `How to Install IPTV on ${device.name}`,
    description: `Step-by-step guide to set up ULTRASTREAM on your ${device.name}. Best IPTV app: ${device.recommendedApp}. Setup in under 5 minutes.`,
    canonical: `https://ultrastream.tv/devices/${slug}`,
  });
}

export default async function DeviceGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const device = DEVICES.find((d) => d.slug === slug);
  if (!device) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to install IPTV on ${device.name}`,
    step: device.steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.description,
      position: s.step,
    })),
  };

  return (
    <div className="pt-20 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 border-b border-white/5 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <Link href="/devices" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            All devices
          </Link>
          <div className="flex items-center gap-5 mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: device.bgColor + "33" }}
            >
              {device.icon}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                IPTV on {device.name}
              </h1>
              <p className="text-zinc-400 mt-1">
                OS: {device.os} · Recommended app: {device.recommendedApp}
              </p>
            </div>
          </div>
          <p className="text-zinc-300 text-lg">{device.description}</p>
        </div>
      </section>

      {/* Install steps */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">
            Installation Guide — 5 Steps
          </h2>
          <div className="space-y-4">
            {device.steps.map((step) => (
              <div
                key={step.step}
                className="glass-card rounded-2xl p-6 border border-white/10 flex gap-5"
              >
                <div
                  className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-sm shrink-0"
                >
                  {step.step}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-start gap-3">
            <Check className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">All done! Start watching.</p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Need help? Contact support via WhatsApp — avg. response in 4 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-12 px-4 sm:px-6 bg-surface/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
            Common Issues &amp; Fixes
          </h2>
          <div className="space-y-4">
            {device.issues.map((issue, i) => (
              <div key={i} className="glass-card rounded-xl p-5 border border-yellow-500/10">
                <p className="text-sm font-semibold text-yellow-300 mb-2">❓ {issue.problem}</p>
                <p className="text-sm text-zinc-400">✅ {issue.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other devices */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6">Other devices we support</h3>
          <div className="flex flex-wrap gap-3">
            {DEVICES.filter((d) => d.slug !== slug).map((d) => (
              <Link
                key={d.slug}
                href={`/devices/${d.slug}`}
                className="px-4 py-2 rounded-xl glass-card border border-white/10 hover:border-blue-500/30 text-sm text-zinc-300 hover:text-white transition-all flex items-center gap-2"
              >
                <span>{d.icon}</span>
                <span>{d.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
