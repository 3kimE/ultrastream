import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PLANS } from "@/lib/data/plans";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature");

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email   = session.customer_email ?? (session.customer_details?.email ?? null);
    const planId  = session.metadata?.planId ?? "unknown";
    const plan    = PLANS.find((p) => p.id === planId);

    if (!email || !plan) {
      console.error("Webhook: missing email or plan", { email, planId });
      return NextResponse.json({ received: true });
    }

    const supabase = createAdminClient();

    // Look up user by email
    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users?.users?.find((u) => u.email === email);

    // Calculate subscription dates
    const now      = new Date();
    const expiresAt = new Date(now);
    expiresAt.setMonth(expiresAt.getMonth() + plan.months);

    // 1. Upsert subscription record
    const { error: subError } = await supabase.from("subscriptions").upsert(
      {
        user_id:           user?.id ?? null,
        plan_id:           plan.id,
        plan_name:         plan.name,
        status:            "active",
        stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
        stripe_session_id:  session.id,
        amount:            plan.price,
        currency:          session.currency ?? "usd",
        starts_at:         now.toISOString(),
        expires_at:        expiresAt.toISOString(),
        connections:       plan.devices,
      },
      { onConflict: "stripe_session_id" }
    );

    if (subError) {
      console.error("Webhook: subscription upsert error", subError);
    }

    // 2. Mark order as completed
    await supabase
      .from("orders")
      .update({ status: "completed" })
      .eq("stripe_session_id", session.id);

    // 3. Send confirmation email
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "ULTRASTREAM <noreply@ultrastream.tv>",
        to:   [email],
        subject: `Your ULTRASTREAM ${plan.name} subscription is active!`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0a0a0a;color:#e4e4e7;padding:32px;border-radius:12px">
            <h1 style="color:#3b82f6;margin-bottom:8px">Welcome to ULTRASTREAM!</h1>
            <p>Your <strong>${plan.name}</strong> subscription is now active.</p>
            <div style="background:#18181b;border-radius:8px;padding:16px;margin:16px 0">
              <p style="margin:0 0 8px"><strong>Plan:</strong> ${plan.name}</p>
              <p style="margin:0 0 8px"><strong>Channels:</strong> ${plan.channels}+</p>
              <p style="margin:0 0 8px"><strong>Expires:</strong> ${expiresAt.toLocaleDateString()}</p>
              <p style="margin:0"><strong>Connections:</strong> ${plan.devices}</p>
            </div>
            <p>Your IPTV credentials will be sent to you within <strong>15 minutes</strong> via your registered WhatsApp/Telegram.</p>
            <p>You can also log in to your dashboard at any time to view your subscription details.</p>
            <a href="https://ultrastream.tv/login" style="display:inline-block;background:#3b82f6;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:8px">
              Go to Dashboard →
            </a>
            <p style="margin-top:24px;color:#71717a;font-size:12px">
              Need help? Reply to this email or contact us on WhatsApp.
            </p>
          </div>
        `,
      });

      // Notify admin
      await resend.emails.send({
        from:    "ULTRASTREAM Orders <noreply@ultrastream.tv>",
        to:      [process.env.ADMIN_EMAIL ?? "admin@ultrastream.tv"],
        subject: `New order: ${plan.name} — ${email}`,
        html: `
          <p><strong>New paid subscription</strong></p>
          <ul>
            <li>Email: ${email}</li>
            <li>Plan: ${plan.name} ($${plan.price})</li>
            <li>Session ID: ${session.id}</li>
            <li>Expires: ${expiresAt.toLocaleDateString()}</li>
          </ul>
          <p><strong>ACTION REQUIRED:</strong> Set IPTV credentials in Supabase subscriptions table for this user.</p>
        `,
      });
    }
  }

  return NextResponse.json({ received: true });
}
