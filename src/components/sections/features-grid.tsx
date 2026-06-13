import { Zap, Shield, Headphones, Monitor, Globe, Clock, Tv2, Wifi } from "lucide-react";

const FEATURES = [
  {
    icon: Tv2,
    title: "4K & 8K UHD Streaming",
    description: "Crystal-clear picture quality on every screen that supports it. True 4K and 8K resolution available.",
    color: "blue",
  },
  {
    icon: Zap,
    title: "Anti-Freeze Technology",
    description: "Proprietary stream buffering eliminates freezing on HD and 4K channels, even during peak hours.",
    color: "cyan",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description: "Average 4-minute response via WhatsApp or Telegram. Real humans, not bots — any time of day.",
    color: "purple",
  },
  {
    icon: Monitor,
    title: "Works on All Devices",
    description: "Fire TV, Android TV, Smart TV, iPhone, Android, MAG box, PC, Mac. One subscription, every screen.",
    color: "green",
  },
  {
    icon: Globe,
    title: "150+ Countries",
    description: "USA, UK, Canada, Europe, MENA, South Asia, Latin America, Africa — 110,000+ channels worldwide.",
    color: "orange",
  },
  {
    icon: Clock,
    title: "Instant Activation",
    description: "Credentials delivered within 60 seconds of payment. No waiting, no manual approval.",
    color: "blue",
  },
  {
    icon: Shield,
    title: "99.9% Uptime SLA",
    description: "Redundant servers across 12 global regions ensure you never miss a live match or episode.",
    color: "cyan",
  },
  {
    icon: Wifi,
    title: "VPN Compatible",
    description: "Works seamlessly with all major VPNs. Enhanced privacy without any sacrifice in performance.",
    color: "purple",
  },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  green: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/20" },
};

export function FeaturesGrid() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">
            Why Choose ULTRASTREAM
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything a premium service{" "}
            <span className="gradient-brand-text">should be</span>
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            We built what others promised. No fluff, no gimmicks — just rock-solid streaming that works.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, description, color }) => {
            const c = COLOR_MAP[color];
            return (
              <div
                key={title}
                className={`glass-card rounded-2xl p-6 border ${c.border} hover:border-opacity-60 transition-all duration-200 group hover:-translate-y-1`}
              >
                <div className={`w-11 h-11 rounded-xl ${c.bg} ${c.border} border flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${c.text}`} />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm leading-snug">{title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
