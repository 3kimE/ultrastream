import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PLANS } from "@/lib/data/plans";
import { SITE_CONFIG } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const schema = z.object({
  planId: z.string(),
  paymentMethod: z.enum(["stripe", "crypto"]),
  email: z.string().email().optional(),
  whatsapp: z.string().optional(),
  cryptoCurrency: z.string().optional(),
});

// Use localhost during local demo, real URL in production
function getBaseUrl(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const origin = req.headers.get("origin");
  if (origin) return origin;
  return SITE_CONFIG.url;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, paymentMethod, email, whatsapp } = schema.parse(body);

    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    // Identify the logged-in user (created moments ago on the checkout page)
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const customerEmail = email ?? user?.email ?? undefined;
    const baseUrl = getBaseUrl(req);

    if (paymentMethod === "stripe" && process.env.STRIPE_SECRET_KEY) {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: customerEmail,
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: Math.round(plan.price * 100),
              product_data: {
                name: `${SITE_CONFIG.name} — ${plan.name} Subscription`,
                description: `${plan.channels} channels · ${plan.vod} VOD · ${plan.devices} device(s) · 4K UHD`,
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/pricing`,
        metadata: {
          planId,
          plan: plan.name,
          userId: user?.id ?? "",
          whatsapp: whatsapp ?? "",
        },
      });

      // Record a pending order (admin client bypasses RLS)
      const admin = createAdminClient();
      await admin.from("orders").insert({
        user_id: user?.id ?? null,
        email: customerEmail ?? "unknown",
        plan_id: plan.id,
        plan_name: plan.name,
        amount: plan.price,
        currency: "usd",
        stripe_session_id: session.id,
        payment_method: "stripe",
        status: "pending",
        whatsapp: whatsapp ?? null,
      });

      return NextResponse.json({ url: session.url });
    }

    if (paymentMethod === "crypto" && process.env.NOWPAYMENTS_API_KEY) {
      const res = await fetch("https://api.nowpayments.io/v1/payment", {
        method: "POST",
        headers: {
          "x-api-key": process.env.NOWPAYMENTS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_amount: plan.price,
          price_currency: "usd",
          pay_currency: "btc",
          order_id: `${planId}-${user?.id ?? "guest"}`,
          order_description: `${SITE_CONFIG.name} ${plan.name} Subscription`,
          ipn_callback_url: `${baseUrl}/api/webhooks/crypto`,
          success_url: `${baseUrl}/checkout/success`,
          cancel_url: `${baseUrl}/pricing`,
        }),
      });
      const payment = await res.json();
      return NextResponse.json({ url: payment.payment_url ?? payment.invoice_url });
    }

    // Fallback (no payment keys configured)
    return NextResponse.json(
      {
        error:
          "Payment gateway not configured. Add STRIPE_SECRET_KEY to .env.local to enable checkout.",
      },
      { status: 503 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
