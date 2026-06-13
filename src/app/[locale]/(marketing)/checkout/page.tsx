"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "@/i18n/navigation";
import { Tv2, Check, Shield, Lock, CreditCard, Bitcoin, ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE_CONFIG } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

const PLANS = [
  { id: "1mo", label: "1 Month",   price: 14.99, perMonth: 14.99, devices: 1, popular: false },
  { id: "3mo", label: "3 Months",  price: 34.99, perMonth: 11.66, devices: 2, popular: false },
  { id: "6mo", label: "6 Months",  price: 54.99, perMonth:  9.16, devices: 2, popular: true  },
  { id: "12mo", label: "12 Months", price: 89.99, perMonth:  7.50, devices: 3, popular: false },
];

const PAYMENT_METHODS = [
  { id: "card",   label: "Credit / Debit Card", icon: CreditCard },
  { id: "crypto", label: "Cryptocurrency",      icon: Bitcoin    },
  { id: "paypal", label: "PayPal",              icon: Shield     },
];

const CRYPTO_OPTIONS = ["Bitcoin (BTC)", "Tether (USDT)", "Ethereum (ETH)"];

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName:  z.string().min(1, "Required"),
  email:     z.string().email("Invalid email"),
  whatsapp:  z.string().min(3, "Enter your WhatsApp or Telegram"),
  password:  z.string().min(8, "Minimum 8 characters"),
  terms:     z.literal(true, "You must accept the terms"),
});
type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan]   = useState("6mo");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0]);
  const [serverError, setServerError]     = useState<string | null>(null);

  const plan = PLANS.find((p) => p.id === selectedPlan)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const supabase = createClient();

    // 1. Create or sign in to Supabase account
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { first_name: data.firstName, last_name: data.lastName },
      },
    });

    // If email already registered, sign in instead
    if (signUpError?.message?.toLowerCase().includes("already registered")) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (signInError) {
        setServerError("An account with this email already exists. Please sign in first.");
        return;
      }
    } else if (signUpError) {
      setServerError(signUpError.message);
      return;
    }

    // Update whatsapp in profile (best-effort, suppress type error with cast)
    const userId = signUpData?.user?.id;
    if (userId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from("profiles")
        .update({ whatsapp: data.whatsapp })
        .eq("id", userId);
    }

    // 2. Create Stripe/crypto checkout session
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        planId: selectedPlan,
        paymentMethod: paymentMethod === "crypto" ? "crypto" : "stripe",
        email: data.email,
        whatsapp: data.whatsapp,
        cryptoCurrency: paymentMethod === "crypto"
          ? selectedCrypto.split(" ")[0].toLowerCase()
          : undefined,
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      setServerError(json.error ?? "Payment error. Please try again.");
      return;
    }
    if (json.url) {
      window.location.href = json.url;
    }
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl gradient-brand flex items-center justify-center">
              <Tv2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-white">{SITE_CONFIG.name}</span>
          </Link>
          <h1 className="text-3xl font-bold text-white">Complete your order</h1>
          <p className="text-zinc-400 text-sm mt-2">
            <Lock className="w-3.5 h-3.5 inline mr-1 text-green-400" />
            Secure checkout · Instant activation · 7-day money-back guarantee
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left — form */}
            <div className="lg:col-span-3 space-y-6">

              {/* Step 1 — Plan */}
              <div className="glass-card rounded-2xl border border-white/10 p-6">
                <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full gradient-brand flex items-center justify-center text-[10px] font-bold">1</span>
                  Choose your plan
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {PLANS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPlan(p.id)}
                      className={`relative rounded-xl border p-3 text-left transition-all ${
                        selectedPlan === p.id
                          ? "border-blue-500/50 bg-blue-500/10"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {p.popular && (
                        <span className="absolute -top-2 left-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider gradient-brand text-white rounded-full">
                          Best Value
                        </span>
                      )}
                      <p className="text-sm font-semibold text-white">{p.label}</p>
                      <p className="text-xs text-zinc-500">{p.devices} device{p.devices > 1 ? "s" : ""}</p>
                      <p className="text-lg font-bold text-white mt-1">${p.price}</p>
                      <p className="text-[10px] text-zinc-500">${p.perMonth.toFixed(2)}/mo</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2 — Account */}
              <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full gradient-brand flex items-center justify-center text-[10px] font-bold">2</span>
                  Your account details
                </h2>

                {serverError && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    {serverError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-zinc-400">First Name</Label>
                    <Input
                      placeholder="John"
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 h-9 text-sm"
                      {...register("firstName")}
                    />
                    {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-zinc-400">Last Name</Label>
                    <Input
                      placeholder="Doe"
                      className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 h-9 text-sm"
                      {...register("lastName")}
                    />
                    {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-400">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 h-9 text-sm"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-400">WhatsApp or Telegram (credentials delivered here)</Label>
                  <Input
                    placeholder="+1234567890 or @username"
                    className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 h-9 text-sm"
                    {...register("whatsapp")}
                  />
                  {errors.whatsapp && <p className="text-xs text-red-400">{errors.whatsapp.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-zinc-400">Password (min. 8 characters)</Label>
                  <Input
                    type="password"
                    placeholder="Choose a strong password"
                    className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 h-9 text-sm"
                    {...register("password")}
                  />
                  {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 rounded accent-blue-500"
                    {...register("terms")}
                  />
                  <label htmlFor="terms" className="text-xs text-zinc-400 leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-400 hover:underline">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
                  </label>
                </div>
                {errors.terms && <p className="text-xs text-red-400">{errors.terms.message}</p>}
              </div>

              {/* Step 3 — Payment */}
              <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full gradient-brand flex items-center justify-center text-[10px] font-bold">3</span>
                  Payment method
                </h2>
                <div className="flex gap-2 flex-wrap">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm transition-all ${
                        paymentMethod === m.id
                          ? "border-blue-500/50 bg-blue-500/10 text-white"
                          : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-300"
                      }`}
                    >
                      <m.icon className="w-4 h-4" />
                      {m.label}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" && (
                  <p className="text-[10px] text-zinc-500 p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
                    <Lock className="w-3 h-3 text-green-400" />
                    You&apos;ll be redirected to Stripe&apos;s secure payment page. We never store card details.
                  </p>
                )}

                {paymentMethod === "crypto" && (
                  <div className="space-y-3 pt-1">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-zinc-400">Select cryptocurrency</Label>
                      <div className="relative">
                        <select
                          value={selectedCrypto}
                          onChange={(e) => setSelectedCrypto(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 text-sm appearance-none focus:outline-none focus:border-blue-500/50"
                        >
                          {CRYPTO_OPTIONS.map((c) => (
                            <option key={c} value={c} className="bg-zinc-900">{c}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-zinc-500 pointer-events-none" />
                      </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 p-3 rounded-lg bg-white/5 border border-white/10">
                      After clicking &quot;Complete Order&quot;, you&apos;ll receive a wallet address. Confirmed on-chain within ~10 minutes.
                    </p>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <p className="text-sm text-zinc-400 p-3 rounded-lg bg-white/5 border border-white/10">
                    You&apos;ll be redirected to PayPal to complete your payment securely.
                  </p>
                )}
              </div>
            </div>

            {/* Right — Order summary */}
            <div className="lg:col-span-2 sticky top-24 space-y-4">
              <div className="glass-card rounded-2xl border border-white/10 p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Order Summary</h3>

                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shrink-0">
                    <Tv2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{SITE_CONFIG.name} — {plan.label}</p>
                    <p className="text-xs text-zinc-500">
                      110,000+ channels · 4K · {plan.devices} device{plan.devices > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span>${plan.price}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span>${plan.price}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gradient-brand border-0 text-white font-semibold py-5 h-auto text-sm"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing…</>
                  ) : `Complete Order — $${plan.price}`}
                </Button>

                <div className="mt-4 space-y-2">
                  {[
                    "Instant activation after payment",
                    "7-day money-back guarantee",
                    "Credentials delivered via WhatsApp/Telegram",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-2 text-xs text-zinc-500">
                      <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-xl border border-white/10 p-4 text-center">
                <p className="text-[10px] text-zinc-600 mb-3 uppercase tracking-wider font-semibold">Accepted payments</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Visa", "Mastercard", "PayPal", "BTC", "USDT", "ETH"].map((m) => (
                    <span key={m} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-zinc-500 font-medium">{m}</span>
                  ))}
                </div>
              </div>

              <p className="text-center text-xs text-zinc-600">
                Questions?{" "}
                <Link href="/contact" className="text-blue-400 hover:underline">Chat with support</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
