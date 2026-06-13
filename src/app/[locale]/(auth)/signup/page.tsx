import { Link } from "@/i18n/navigation";
import { Tv2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE_CONFIG } from "@/lib/constants";
import { PLANS as PLAN_DATA } from "@/lib/data/plans";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-grid px-4 py-20">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
              <Tv2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">{SITE_CONFIG.name}</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Create your account</h1>
          <p className="text-zinc-400 text-sm mt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300">Sign in</Link>
          </p>
        </div>

        {/* Plan reminder */}
        <div className="glass-card rounded-2xl p-4 border border-blue-500/20 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shrink-0">
            <Tv2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">6 Month Plan — $54.99</p>
            <p className="text-xs text-zinc-500">110,000+ channels · 4K · 2 devices</p>
          </div>
          <Link href="/pricing" className="text-xs text-blue-400 hover:text-blue-300 shrink-0">Change</Link>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-zinc-300">First Name</Label>
              <Input placeholder="John" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500" />
            </div>
            <div className="space-y-2">
              <Label className="text-zinc-300">Last Name</Label>
              <Input placeholder="Doe" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Email Address</Label>
            <Input type="email" placeholder="you@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">WhatsApp or Telegram (for credential delivery)</Label>
            <Input placeholder="+1234567890 or @username" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500" />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Password</Label>
            <Input type="password" placeholder="Minimum 8 characters" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500" />
          </div>

          <div className="flex items-start gap-3">
            <input type="checkbox" id="terms" className="mt-1 rounded" />
            <label htmlFor="terms" className="text-xs text-zinc-400 leading-relaxed">
              I agree to the{" "}
              <Link href="/terms" className="text-blue-400 hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
            </label>
          </div>

          <Link href="/pricing">
            <Button className="w-full gradient-brand border-0 text-white font-semibold py-4 h-auto">
              Continue to Payment →
            </Button>
          </Link>

          <div className="flex flex-col gap-1.5 pt-1">
            {["✓ Instant activation after payment", "✓ 7-day money-back guarantee", "✓ Secure checkout via Stripe"].map((t) => (
              <p key={t} className="text-xs text-zinc-500 text-center">{t}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {["Visa", "Mastercard", "PayPal", "BTC", "USDT"].map((method) => (
            <span key={method} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-500">{method}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
