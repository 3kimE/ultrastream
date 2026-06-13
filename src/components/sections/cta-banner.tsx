import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function CTABanner() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 gradient-brand p-px">
          <div className="rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-sm px-8 py-16 text-center">
            {/* Stars background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-4">
              Start today
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Ready to cut the cord?
            </h2>
            <p className="text-zinc-300 mb-8 max-w-lg mx-auto">
              Join 50,000+ streamers. {SITE_CONFIG.trialHours}-hour free trial. No credit card needed.
              Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free-trial">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-zinc-100 font-bold text-base px-8 py-4 h-auto"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start 24-Hour Free Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-base px-8 py-4 h-auto"
                >
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
