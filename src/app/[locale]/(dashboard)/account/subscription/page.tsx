import { Check, Calendar, Repeat } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { generateSEO } from "@/lib/seo";
import { CopyField } from "@/components/dashboard/copy-field";
import { MOCK_SUBSCRIPTION } from "@/lib/data/mock-account";

export const metadata = generateSEO({ title: "Subscription", noIndex: true });

const sub = MOCK_SUBSCRIPTION;

export default function SubscriptionPage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Subscription</h1>
        <span className="px-3 py-1.5 rounded-full bg-green-500/15 text-green-400 text-xs font-bold border border-green-500/20">
          ACTIVE
        </span>
      </div>

      {/* Plan summary */}
      <div className="glass-card rounded-2xl p-6 border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Current Plan</p>
            <p className="text-2xl font-bold text-white">{sub.planName}</p>
            <p className="text-sm text-zinc-400 mt-1">
              ${sub.price} · {sub.channels} channels · {sub.connections} connections
            </p>
          </div>
          <Link
            href="/pricing"
            className="px-5 py-2.5 rounded-xl gradient-brand text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Upgrade / Renew
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: "Started", value: sub.startedAt },
            { icon: Calendar, label: "Expires", value: sub.expiresAt },
            { icon: Repeat, label: "Days Left", value: `${sub.daysRemaining}` },
            { icon: Repeat, label: "Auto-Renew", value: sub.autoRenew ? "On" : "Off" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/5 rounded-xl p-3">
              <Icon className="w-3.5 h-3.5 text-blue-400 mb-1.5" />
              <p className="text-xs text-zinc-500 mb-0.5">{label}</p>
              <p className="font-semibold text-white text-sm">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Credentials */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-3">
        <h2 className="font-semibold text-white mb-1">IPTV Credentials</h2>
        <p className="text-xs text-zinc-500 mb-3">
          Use these in any IPTV player (TiviMate, IPTV Smarters, etc.). Keep them private.
        </p>
        <CopyField label="M3U Playlist URL" value={sub.m3uUrl} />
        <CopyField label="EPG / TV Guide URL" value={sub.epgUrl} />
        <div className="grid sm:grid-cols-3 gap-3">
          <CopyField label="Xtream Host" value={sub.xtreamHost} />
          <CopyField label="Xtream Username" value={sub.xtreamUsername} />
          <CopyField label="Xtream Password" value={sub.xtreamPassword} masked />
        </div>
      </div>

      {/* Plan features */}
      <div className="glass-card rounded-2xl p-6 border border-white/10">
        <h2 className="font-semibold text-white mb-4">What&apos;s included</h2>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {sub.features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-zinc-300">
              <Check className="w-4 h-4 text-green-400 shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
