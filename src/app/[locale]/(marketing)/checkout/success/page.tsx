import { CheckCircle2, Tv2, MessageCircle, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { PLANS } from "@/lib/data/plans";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

// Verify the Stripe payment and activate the subscription.
// This runs on the success page so the demo works locally without the
// Stripe CLI. In production the webhook also fires — both are idempotent
// (upsert on stripe_session_id), so activating twice is harmless.
async function activateSubscription(sessionId: string): Promise<boolean> {
  if (!process.env.STRIPE_SECRET_KEY) return false;

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") return false;

  const planId = session.metadata?.planId;
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan) return false;

  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setMonth(expiresAt.getMonth() + plan.months);

  const admin = createAdminClient();

  await admin.from("subscriptions").upsert(
    {
      user_id: session.metadata?.userId || null,
      plan_id: plan.id,
      plan_name: plan.name,
      status: "active",
      stripe_customer_id:
        typeof session.customer === "string" ? session.customer : null,
      stripe_session_id: session.id,
      amount: plan.price,
      currency: session.currency ?? "usd",
      starts_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      connections: plan.devices,
    },
    { onConflict: "stripe_session_id" }
  );

  await admin
    .from("orders")
    .update({ status: "completed" })
    .eq("stripe_session_id", session.id);

  return true;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let activated = false;
  let error = false;
  if (session_id) {
    try {
      activated = await activateSubscription(session_id);
    } catch (e) {
      console.error("Activation error:", e);
      error = true;
    }
  }

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
            {activated
              ? "Your subscription is now active. Your IPTV credentials will be delivered to your WhatsApp/Telegram within "
              : "Thank you for your order. Your subscription is being set up and your credentials will arrive within "}
            <strong className="text-white">15 minutes</strong>.
          </p>
          {error && (
            <p className="mt-3 text-xs text-yellow-400 flex items-center justify-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              We&apos;re finalizing your subscription — it will appear in your dashboard shortly.
            </p>
          )}
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
          <Link href="/account">
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
