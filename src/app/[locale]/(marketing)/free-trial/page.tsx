"use client";

import { useEffect, useState } from "react";
import { Check, Clock, Users } from "lucide-react";
import { TrialForm } from "@/components/forms/trial-form";
import { SITE_CONFIG } from "@/lib/constants";

const BENEFITS = [
  "Full access to 110,000+ live channels",
  "4K UHD streaming on all compatible devices",
  "VOD: 170,000+ movies & series",
  "EPG electronic program guide",
  "Works on all your devices instantly",
  "24/7 customer support included",
];

function Countdown() {
  const [secs, setSecs] = useState(86400);
  useEffect(() => {
    const interval = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return (
    <div className="flex gap-2 items-center">
      {[h, m, s].map((unit, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="glass-card border border-white/10 rounded-xl px-4 py-3 text-3xl font-bold text-white tabular-nums glow-blue-sm">
            {unit}
          </span>
          {i < 2 && <span className="text-2xl text-zinc-500 font-bold">:</span>}
        </span>
      ))}
    </div>
  );
}

function ActivationCounter() {
  const [count, setCount] = useState(SITE_CONFIG.trialActivationsToday);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  return <span className="text-white font-bold">{count.toLocaleString()}</span>;
}

export default function FreeTrialPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">24-Hour Free Trial</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Try{" "}
              <span className="gradient-brand-text">{SITE_CONFIG.name}</span>{" "}
              free for 24 hours
            </h1>
            <p className="text-zinc-400 mb-8 text-lg">
              No credit card. No commitment. Full access to everything — all 110,000+ channels, 4K quality, and every feature.
            </p>

            <ul className="space-y-3 mb-10">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-blue-400" />
                  </div>
                  <span className="text-sm text-zinc-300">{b}</span>
                </li>
              ))}
            </ul>

            {/* Countdown */}
            <div className="glass-card rounded-2xl p-6 border border-white/10 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-semibold text-white">Your trial expires in</p>
              </div>
              <Countdown />
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
              <Users className="w-5 h-5 text-green-400 shrink-0" />
              <p className="text-sm text-zinc-300">
                <ActivationCounter /> trials activated today
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="glass-card rounded-3xl p-8 border border-blue-500/20 glow-blue-sm">
            <h2 className="text-xl font-bold text-white mb-6">Activate your free trial</h2>
            <TrialForm />
          </div>
        </div>
      </div>
    </div>
  );
}
