import { Tv2, Clock, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { generateSEO } from "@/lib/seo";
import { CopyField } from "@/components/dashboard/copy-field";
import { MOCK_SUBSCRIPTION, MOCK_DEVICES, MOCK_ACTIVITY } from "@/lib/data/mock-account";

export const metadata = generateSEO({ title: "Dashboard", noIndex: true });

const sub = MOCK_SUBSCRIPTION;

export default function AccountOverviewPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-white">Dashboard</h1>

      {/* Plan card */}
      <div className="glass-card rounded-2xl p-6 border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Active Plan</p>
            <p className="text-xl font-bold text-white">{sub.planName} Subscription</p>
          </div>
          <span className="px-3 py-1.5 rounded-full gradient-brand text-white text-xs font-bold">
            ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Days Remaining", value: `${sub.daysRemaining}` },
            { label: "Expires", value: sub.expiresAt },
            { label: "Connections", value: `${sub.connectionsInUse}/${sub.connections}` },
            { label: "Plan Price", value: `$${sub.price}` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/5 rounded-xl p-3">
              <p className="text-xs text-zinc-500 mb-1">{label}</p>
              <p className="font-semibold text-white text-sm">{value}</p>
            </div>
          ))}
        </div>

        {/* Credentials */}
        <div className="space-y-3">
          <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest">
            Your IPTV Credentials
          </p>
          <CopyField label="M3U Playlist URL" value={sub.m3uUrl} />
          <div className="grid sm:grid-cols-2 gap-3">
            <CopyField label="Xtream Host" value={sub.xtreamHost} />
            <CopyField label="Xtream Username" value={sub.xtreamUsername} />
          </div>
          <Link
            href="/account/subscription"
            className="inline-block text-xs text-blue-400 hover:text-blue-300 mt-1"
          >
            View full credentials & setup →
          </Link>
        </div>
      </div>

      {/* Active devices */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white">Active Devices</h2>
          <span className="text-xs text-zinc-500">
            {sub.connectionsInUse} of {sub.connections} in use
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MOCK_DEVICES.map((d) => (
            <div
              key={d.name}
              className={`rounded-xl p-3 border ${
                d.status === "online"
                  ? "bg-blue-500/10 border-blue-500/30"
                  : "bg-white/[0.02] border-white/5"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-2xl">{d.type}</span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    d.status === "online" ? "bg-green-400" : "bg-zinc-600"
                  }`}
                />
              </div>
              <p className="text-xs font-medium text-zinc-200 truncate">{d.name}</p>
              <p className="text-[10px] text-zinc-500 mt-0.5">{d.lastActive}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-400" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {MOCK_ACTIVITY.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">{item.action}</p>
                  <p className="text-xs text-zinc-500">{item.detail}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <Clock className="w-3 h-3" />
                {item.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { href: "/devices", label: "Setup Guides", desc: "Configure your devices" },
          { href: "/account/subscription", label: "My Subscription", desc: "Plan & credentials" },
          { href: "/pricing", label: "Upgrade Plan", desc: "More devices or longer term" },
        ].map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="glass-card rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-colors group"
          >
            <Tv2 className="w-4 h-4 text-blue-400 mb-2" />
            <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
              {label}
            </p>
            <p className="text-xs text-zinc-500 mt-1">{desc}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
