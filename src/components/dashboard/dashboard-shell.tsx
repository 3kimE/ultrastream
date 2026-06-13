"use client";

import { usePathname, Link } from "@/i18n/navigation";
import {
  LayoutDashboard,
  Tv2,
  Wifi,
  CreditCard,
  HelpCircle,
  Settings,
} from "lucide-react";
import { LogoutButton } from "@/components/shared/logout-button";

const NAV = [
  { icon: LayoutDashboard, label: "Overview",     href: "/account" },
  { icon: Tv2,             label: "Subscription", href: "/account/subscription" },
  { icon: Wifi,            label: "Devices",      href: "/account/devices" },
  { icon: CreditCard,      label: "Billing",      href: "/account/billing" },
  { icon: Settings,        label: "Settings",     href: "/account/settings" },
  { icon: HelpCircle,      label: "Support",      href: "/contact" },
] as const;

export function DashboardShell({
  name,
  email,
  initials,
  children,
}: {
  name: string;
  email: string;
  initials: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-white/5 bg-surface/50 flex flex-col pt-20 hidden lg:flex">
        <div className="px-4 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{name}</p>
              <p className="text-xs text-zinc-500 truncate">{email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ icon: Icon, label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
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
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 flex flex-col gap-3">
          <Link href="/" className="text-xs text-zinc-500 hover:text-white transition-colors">
            ← Back to website
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-8 pt-24 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">{children}</div>
      </main>
    </div>
  );
}
