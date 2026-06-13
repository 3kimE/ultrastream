import Link from "next/link";
import { Tv2, Home, Search, HelpCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 bg-grid">
      <div className="text-center max-w-lg">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
            <Tv2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-white">{SITE_CONFIG.name}</span>
        </Link>

        {/* 404 visual */}
        <div className="relative mb-8">
          <p className="text-[8rem] font-black text-white/5 leading-none select-none">404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-6xl font-black gradient-brand-text">404</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">Channel not found</h1>
        <p className="text-zinc-400 mb-8">
          Looks like this page got lost in the broadcast. Let&apos;s get you back to streaming.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/channels"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass-card border border-white/10 text-zinc-300 hover:text-white text-sm font-medium hover:border-blue-500/30 transition-all"
          >
            <Search className="w-4 h-4" />
            Browse Channels
          </Link>
        </div>

        {/* Quick links */}
        <div className="glass-card rounded-2xl border border-white/10 p-5">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Popular pages</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Pricing", href: "/pricing" },
              { label: "Free Trial", href: "/free-trial" },
              { label: "Device Setup", href: "/devices" },
              { label: "FAQ", href: "/faq" },
              { label: "Contact Support", href: "/contact" },
              { label: "System Status", href: "/status" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-blue-400 transition-colors py-1.5 px-2 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-600">
          <HelpCircle className="w-3.5 h-3.5" />
          Need help?{" "}
          <Link href="/contact" className="text-blue-400 hover:underline">
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
}
