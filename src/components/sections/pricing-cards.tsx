"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/lib/data/plans";
import { cn } from "@/lib/utils";

interface PricingCardsProps {
  variant?: "homepage" | "full";
}

export function PricingCards({ variant = "full" }: PricingCardsProps) {
  const [billing, setBilling] = useState<"one-time" | "monthly">("one-time");
  const plans = variant === "homepage" ? [PLANS[0], PLANS[2], PLANS[3]] : PLANS;

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {variant === "full" && (
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Pricing</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Pick a plan.{" "}
              <span className="gradient-brand-text">No contracts.</span>
            </h2>
            <p className="text-zinc-400 max-w-lg mx-auto mb-8">
              All plans include the full channel list, 4K streams, EPG guide, and 24/7 support.
              Longer plans = bigger savings.
            </p>
          </div>
        )}

        {variant === "homepage" && (
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Plans for every budget
            </h2>
          </div>
        )}

        <div className={cn(
          "grid gap-5",
          variant === "full"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
            : "grid-cols-1 sm:grid-cols-3"
        )}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "rounded-2xl p-6 flex flex-col border transition-all duration-200 relative",
                plan.popular
                  ? "bg-gradient-to-b from-blue-500/10 to-transparent border-blue-500/50 glow-blue-sm scale-[1.02]"
                  : "glass-card border-white/10 hover:border-white/20"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge
                    className={cn(
                      "text-xs font-bold px-3 py-1",
                      plan.badgeColor === "blue"
                        ? "bg-blue-500 text-white border-blue-400"
                        : "bg-cyan-500 text-white border-cyan-400"
                    )}
                  >
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-5">
                <p className="text-sm font-semibold text-zinc-400 mb-1">{plan.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  {plan.originalPrice !== plan.price && (
                    <span className="text-sm text-zinc-600 line-through">${plan.originalPrice}</span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  ${plan.pricePerMonth.toFixed(2)}/month · {plan.devices} device{plan.devices > 1 ? "s" : ""}
                </p>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.slice(0, variant === "homepage" ? 5 : undefined).map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={`/checkout?plan=${plan.id}`}>
                <Button
                  className={cn(
                    "w-full font-semibold",
                    plan.popular
                      ? "gradient-brand border-0 text-white glow-blue-sm hover:opacity-90"
                      : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                  )}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {variant === "homepage" && (
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-4">
              See all 5 plans including 24-month →
            </Link>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-sm text-zinc-300">7-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-zinc-300">Instant activation · No contracts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
