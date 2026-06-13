import { Shield, Zap, Clock, Headphones, Globe, RotateCcw } from "lucide-react";

const BADGES = [
  { icon: Zap, title: "Instant Activation", desc: "Live in 60 seconds", color: "text-blue-400" },
  { icon: Shield, title: "7-Day Guarantee", desc: "Money-back, no questions", color: "text-green-400" },
  { icon: Clock, title: "24h Free Trial", desc: "No credit card needed", color: "text-cyan-400" },
  { icon: Headphones, title: "24/7 Support", desc: "4-minute avg response", color: "text-purple-400" },
  { icon: Globe, title: "150+ Countries", desc: "Worldwide content", color: "text-orange-400" },
  { icon: RotateCcw, title: "No Contracts", desc: "Cancel anytime", color: "text-pink-400" },
];

export function TrustBadges() {
  return (
    <section className="py-10 px-4 sm:px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BADGES.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2 py-4">
              <Icon className={`w-6 h-6 ${color}`} />
              <p className="text-sm font-semibold text-white leading-tight">{title}</p>
              <p className="text-xs text-zinc-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
