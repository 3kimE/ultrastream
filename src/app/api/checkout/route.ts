import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PLANS } from "@/lib/data/plans";
import { SITE_CONFIG } from "@/lib/constants";

const schema = z.object({
  planId: z.string(),
  paymentMethod: z.enum(["stripe", "crypto"]),
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { planId, paymentMethod, email } = schema.parse(body);

    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (paymentMethod === "stripe" && process.env.STRIPE_SECRET_KEY) {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: email,
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
        success_url: `${SITE_CONFIG.url}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${SITE_CONFIG.url}/pricing`,
        metadata: { planId, plan: plan.name },
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
          order_id: `${planId}-${Date.now()}`,
          order_description: `${SITE_CONFIG.name} ${plan.name} Subscription`,
          ipn_callback_url: `${SITE_CONFIG.url}/api/webhooks/crypto`,
          success_url: `${SITE_CONFIG.url}/checkout/success`,
          cancel_url: `${SITE_CONFIG.url}/pricing`,
        }),
      });
      const payment = await res.json();
      return NextResponse.json({ url: payment.payment_url ?? payment.invoice_url });
    }

    // Fallback (no keys configured)
    return NextResponse.json({
      url: `/pricing?plan=${planId}`,
      message: "Payment gateway not configured. Set STRIPE_SECRET_KEY or NOWPAYMENTS_API_KEY in .env",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
