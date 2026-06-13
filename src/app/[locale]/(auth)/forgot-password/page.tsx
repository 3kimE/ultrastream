import { Link } from "@/i18n/navigation";
import { Tv2, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE_CONFIG } from "@/lib/constants";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-grid px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
              <Tv2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">{SITE_CONFIG.name}</span>
          </Link>
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Reset your password</h1>
          <p className="text-zinc-400 text-sm mt-2">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-5">
          <div className="space-y-2">
            <Label className="text-zinc-300">Email Address</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
            />
          </div>

          <Button className="w-full gradient-brand border-0 text-white font-semibold">
            Send Reset Link
          </Button>

          <div className="text-center space-y-2 pt-1">
            <p className="text-xs text-zinc-500">
              Reset link expires in 30 minutes. Check your spam folder if you don&apos;t see it.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to sign in
            </Link>
          </div>
        </div>

        {/* Support */}
        <p className="text-center text-xs text-zinc-600">
          Still can&apos;t access your account?{" "}
          <Link href="/contact" className="text-blue-400 hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
