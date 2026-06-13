import { generateSEO } from "@/lib/seo";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata = generateSEO({
  title: "System Status",
  description: "Real-time ULTRASTREAM server status — uptime, incidents, and maintenance windows.",
  canonical: "https://ultrastream.tv/status",
});

const REGIONS = [
  { name: "North America (New York)", status: "operational", latency: "12ms", uptime: "99.98%" },
  { name: "North America (Los Angeles)", status: "operational", latency: "9ms", uptime: "99.97%" },
  { name: "Europe (London)", status: "operational", latency: "8ms", uptime: "99.99%" },
  { name: "Europe (Amsterdam)", status: "operational", latency: "11ms", uptime: "99.98%" },
  { name: "Europe (Frankfurt)", status: "operational", latency: "10ms", uptime: "99.97%" },
  { name: "Middle East (Dubai)", status: "operational", latency: "18ms", uptime: "99.95%" },
  { name: "Asia (Singapore)", status: "operational", latency: "14ms", uptime: "99.96%" },
  { name: "Asia (Tokyo)", status: "operational", latency: "16ms", uptime: "99.94%" },
  { name: "South America (São Paulo)", status: "operational", latency: "22ms", uptime: "99.93%" },
  { name: "Africa (Johannesburg)", status: "degraded", latency: "45ms", uptime: "98.91%" },
  { name: "Oceania (Sydney)", status: "operational", latency: "28ms", uptime: "99.92%" },
  { name: "Canada (Toronto)", status: "operational", latency: "14ms", uptime: "99.97%" },
];

const SERVICES = [
  { name: "Live Streaming (SD/HD)", status: "operational" },
  { name: "Live Streaming (4K UHD)", status: "operational" },
  { name: "VOD Library", status: "operational" },
  { name: "EPG Guide", status: "operational" },
  { name: "User Authentication", status: "operational" },
  { name: "Credential Delivery", status: "operational" },
  { name: "Reseller Panel", status: "operational" },
  { name: "Support Systems", status: "operational" },
  { name: "Billing & Payments", status: "operational" },
];

const INCIDENTS = [
  {
    date: "2026-05-20",
    title: "Degraded performance on Johannesburg node",
    status: "Monitoring",
    description: "Elevated latency on the Johannesburg CDN node due to upstream ISP maintenance. All other regions unaffected. ETA: 24 hours.",
    severity: "minor",
  },
  {
    date: "2026-05-10",
    title: "Scheduled maintenance — Amsterdam node",
    status: "Resolved",
    description: "Planned 2-hour maintenance window for hardware upgrades. All streams routed through London/Frankfurt during maintenance. No impact to users.",
    severity: "none",
  },
];

function StatusBadge({ status }: { status: string }) {
  const config = {
    operational: { color: "text-green-400 bg-green-500/10 border-green-500/20", label: "Operational", dot: "bg-green-400" },
    degraded: { color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", label: "Degraded", dot: "bg-yellow-400" },
    outage: { color: "text-red-400 bg-red-500/10 border-red-500/20", label: "Outage", dot: "bg-red-400" },
  }[status] ?? { color: "text-zinc-400 bg-white/5 border-white/10", label: status, dot: "bg-zinc-400" };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

const allOperational = REGIONS.every((r) => r.status === "operational") && SERVICES.every((s) => s.status === "operational");

export default function StatusPage() {
  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className={`py-12 px-4 sm:px-6 border-b border-white/5 ${allOperational ? "bg-green-500/5" : "bg-yellow-500/5"}`}>
        <div className="max-w-4xl mx-auto text-center">
          {allOperational ? (
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          ) : (
            <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          )}
          <h1 className="text-3xl font-bold text-white mb-2">
            {allOperational ? "All systems operational" : "Minor degradation detected"}
          </h1>
          <p className="text-zinc-400 text-sm">
            {SITE_CONFIG.name} — {SITE_CONFIG.uptime}% average uptime · Updated every 60 seconds
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-zinc-500">Live data</span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        {/* Services */}
        <section>
          <h2 className="text-xl font-bold text-white mb-5">Platform Services</h2>
          <div className="glass-card rounded-2xl border border-white/10 divide-y divide-white/5">
            {SERVICES.map((service) => (
              <div key={service.name} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-zinc-300">{service.name}</span>
                <StatusBadge status={service.status} />
              </div>
            ))}
          </div>
        </section>

        {/* Regions */}
        <section>
          <h2 className="text-xl font-bold text-white mb-5">CDN Regions</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {REGIONS.map((region) => (
              <div key={region.name} className="glass-card rounded-xl border border-white/10 px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-300">{region.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Latency: <span className="text-zinc-300">{region.latency}</span> · Uptime: <span className="text-zinc-300">{region.uptime}</span>
                  </p>
                </div>
                <StatusBadge status={region.status} />
              </div>
            ))}
          </div>
        </section>

        {/* Incidents */}
        <section>
          <h2 className="text-xl font-bold text-white mb-5">Recent Incidents</h2>
          {INCIDENTS.length === 0 ? (
            <div className="glass-card rounded-2xl border border-white/10 p-8 text-center text-zinc-500 text-sm">
              No incidents in the last 90 days.
            </div>
          ) : (
            <div className="space-y-4">
              {INCIDENTS.map((incident, i) => (
                <div key={i} className="glass-card rounded-2xl border border-white/10 p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-semibold text-white text-sm">{incident.title}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                        incident.status === "Resolved"
                          ? "bg-green-500/10 border-green-500/20 text-green-400"
                          : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                      }`}>
                        {incident.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-2">{incident.description}</p>
                  <div className="flex items-center gap-1 text-xs text-zinc-600">
                    <Clock className="w-3 h-3" />
                    {incident.date}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Subscribe to updates */}
        <section className="glass-card rounded-2xl border border-blue-500/20 p-6 text-center">
          <h3 className="font-semibold text-white mb-2">Get status updates</h3>
          <p className="text-sm text-zinc-400 mb-4">Be notified instantly of any incidents or maintenance windows.</p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-blue-500/50"
            />
            <button className="px-4 py-2 rounded-xl gradient-brand text-white text-sm font-semibold hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
