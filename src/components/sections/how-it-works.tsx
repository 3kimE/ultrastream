import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreditCard, Mail, Play, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: 1,
    icon: CreditCard,
    title: "Choose Your Plan",
    description: "Pick from 1, 3, 6, 12, or 24-month plans. All include the full 110,000+ channel library and 4K streaming.",
    time: "30 seconds",
    color: "blue",
  },
  {
    step: 2,
    icon: CreditCard,
    title: "Complete Payment",
    description: "Pay securely via Stripe (Visa/Mastercard), PayPal, Bitcoin, USDT, or other crypto. All transactions encrypted.",
    time: "1 minute",
    color: "cyan",
  },
  {
    step: 3,
    icon: Mail,
    title: "Receive Credentials",
    description: "Get your M3U URL and Xtream Codes login via email and WhatsApp/Telegram within 60 seconds.",
    time: "60 seconds",
    color: "purple",
  },
  {
    step: 4,
    icon: Play,
    title: "Start Watching",
    description: "Follow our device-specific setup guide (5 steps, under 5 minutes) and start streaming in 4K instantly.",
    time: "5 minutes",
    color: "green",
  },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; num: string }> = {
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", num: "bg-blue-500" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", num: "bg-cyan-500" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", num: "bg-purple-500" },
  green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", num: "bg-green-500" },
};

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Process</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Up and running in{" "}
            <span className="gradient-brand-text">under 7 minutes</span>
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto">
            Simpler than setting up a cable box. No technician visit. No waiting days.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-blue-500/50 to-cyan-500/50 hidden lg:block" />

          {STEPS.map(({ step, icon: Icon, title, description, time, color }) => {
            const c = COLOR_MAP[color];
            return (
              <div key={step} className="relative flex flex-col">
                <div className={`glass-card rounded-2xl p-6 border ${c.border} ${c.bg} flex flex-col gap-4 h-full`}>
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl ${c.num} flex items-center justify-center text-white font-bold text-sm`}>
                      {step}
                    </div>
                    <span className={`text-xs ${c.text} font-medium bg-white/5 px-2 py-1 rounded-full`}>
                      ~{time}
                    </span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-white/5 border ${c.border} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">{title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{description}</p>
                  </div>
                </div>
                {step < STEPS.length && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-zinc-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/how-it-works">
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
              See detailed setup guide for every device →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
