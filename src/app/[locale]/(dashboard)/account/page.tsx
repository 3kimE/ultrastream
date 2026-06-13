import { redirect } from "next/navigation";
import { Copy, Tv2, Settings, CreditCard, HelpCircle, LayoutDashboard, Wifi, Clock, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { generateSEO } from "@/lib/seo";
import type { Database } from "@/lib/supabase/types";

type Profile      = Database["public"]["Tables"]["profiles"]["Row"];
type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

export const metadata = generateSEO({ title: "My Account", noIndex: true });

const NAV = [
  { icon: LayoutDashboard, label: "Overview",    href: "/account",              active: true  },
  { icon: Tv2,             label: "Subscription", href: "/account/subscription", active: false },
  { icon: Wifi,            label: "Devices",      href: "/account/devices",      active: false },
  { icon: CreditCard,      label: "Billing",      href: "/account/billing",      active: false },
  { icon: HelpCircle,      label: "Support",      href: "/account/support",      active: false },
  { icon: Settings,        label: "Settings",     href: "/account/settings",     active: false },
];

export default async function AccountPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  const profile = profileData as Profile | null;

  const { data: subscriptionData } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const subscription = subscriptionData as Subscription | null;

  const displayName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || user.email!;
  const initials = [profile?.first_name?.[0], profile?.last_name?.[0]].filter(Boolean).join("").toUpperCase() || user.email![0].toUpperCase();

  const expiresAt = subscription?.expires_at ? new Date(subscription.expires_at) : null;
  const daysLeft = expiresAt
    ? Math.max(0, Math.ceil((expiresAt.getTime() - Date.now()) / 86400000))
    : null;

  const m3uUrl = subscription?.m3u_url;
  const xtreamUsername = subscription?.xtream_username;
  const xtreamPassword = subscription?.xtream_password;
  const xtreamHost     = subscription?.xtream_host;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-white/5 bg-surface/50 flex flex-col pt-20 hidden lg:flex">
        <div className="px-4 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-white truncate">{displayName}</p>
              <p className="text-xs text-zinc-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ icon: Icon, label, href, active }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-500/15 text-blue-400"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <Link href="/" className="text-xs text-zinc-500 hover:text-white transition-colors">
            ← Back to website
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 pt-24 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>

          {/* No active subscription */}
          {!subscription && (
            <div className="glass-card rounded-2xl p-6 border border-yellow-500/20 bg-yellow-500/5 flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white mb-1">No active subscription</p>
                <p className="text-xs text-zinc-400">
                  You don&apos;t have an active subscription yet.{" "}
                  <Link href="/pricing" className="text-blue-400 hover:underline">Browse plans →</Link>
                </p>
              </div>
            </div>
          )}

          {/* Active subscription card */}
          {subscription && (
            <div className="glass-card rounded-2xl p-6 border border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-cyan-500/5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Active Plan</p>
                  <p className="text-xl font-bold text-white">{subscription.plan_name} Subscription</p>
                </div>
                <span className="px-3 py-1.5 rounded-full gradient-brand text-white text-xs font-bold">ACTIVE</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Days Remaining", value: daysLeft !== null ? `${daysLeft}` : "—" },
                  { label: "Expires",        value: expiresAt ? expiresAt.toLocaleDateString() : "—" },
                  { label: "Connections",    value: `${subscription.connections}` },
                  { label: "Plan Price",     value: `$${subscription.amount}` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-3">
                    <p className="text-xs text-zinc-500 mb-1">{label}</p>
                    <p className="font-semibold text-white text-sm">{value}</p>
                  </div>
                ))}
              </div>

              {/* Credentials section */}
              {m3uUrl ? (
                <div className="space-y-3">
                  <p className="text-xs text-zinc-500 font-semibold uppercase tracking-widest">Your IPTV Credentials</p>

                  <CredentialRow label="M3U Playlist URL" value={m3uUrl} />
                  {xtreamHost && xtreamUsername && (
                    <>
                      <CredentialRow label="Xtream Host"     value={xtreamHost}     />
                      <CredentialRow label="Xtream Username" value={xtreamUsername} />
                      <CredentialRow label="Xtream Password" value={xtreamPassword ?? ""} masked />
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                  <Clock className="w-4 h-4 text-yellow-400 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Credentials being set up</p>
                    <p className="text-xs text-zinc-500">
                      Your IPTV credentials will be delivered to your WhatsApp/Telegram within 15 minutes.
                      They will also appear here once ready.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: "/devices",     label: "Setup Guides",   desc: "Configure your devices" },
              { href: "/contact",     label: "Get Support",    desc: "Chat with our team" },
              { href: "/pricing",     label: "Upgrade Plan",   desc: "More devices or longer term" },
            ].map(({ href, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="glass-card rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-colors group"
              >
                <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{label}</p>
                <p className="text-xs text-zinc-500 mt-1">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function CredentialRow({
  label,
  value,
  masked = false,
}: {
  label: string;
  value: string;
  masked?: boolean;
}) {
  return (
    <div>
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-zinc-400 font-mono truncate">
          {masked ? "••••••••" : value}
        </div>
        <button
          className="px-3 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-colors"
          aria-label="Copy"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
