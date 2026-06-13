import { CheckCircle2, Tv2, MessageCircle, Mail, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE_CONFIG } from "@/lib/constants";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-grid px-4 py-20">
      <div className="w-full max-w-lg text-center space-y-8">

        {/* Success icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-3">Payment successful!</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Your subscription is now active. Check your email for a confirmation.
            Your IPTV credentials will be delivered to your WhatsApp/Telegram within{" "}
            <strong className="text-white">15 minutes</strong>.
          </p>
        </div>

        {/* Steps */}
        <div className="glass-card rounded-2xl border border-white/10 p-6 text-left space-y-4">
          <h2 className="text-sm font-semibold text-white mb-2">What happens next</h2>
          {[
            {
              icon: Mail,
              title: "Confirmation email sent",
              desc: "Check your inbox for a receipt and subscription details.",
            },
            {
              icon: MessageCircle,
              title: "Credentials in 15 minutes",
              desc: "Your M3U URL and Xtream login will arrive via WhatsApp/Telegram.",
            },
            {
              icon: Tv2,
              title: "Start streaming",
              desc: "Open your IPTV player, paste the credentials, and enjoy 110,000+ channels.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-semibold text-sm hover:opacity-90 transition-opacity">
              Go to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/devices">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-zinc-300 font-medium text-sm hover:bg-white/5 transition-colors">
              Setup Guides
            </button>
          </Link>
        </div>

        <p className="text-xs text-zinc-600">
          Need help? Contact us at{" "}
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-blue-400 hover:underline">
            {SITE_CONFIG.email}
          </a>
        </p>
      </div>
    </div>
  );
}
