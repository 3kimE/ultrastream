"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Check, Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  contact: z.string().min(3, "Please enter your WhatsApp or Telegram"),
  device: z.string().min(1, "Please select a device"),
  connections: z.enum(["1", "2", "3"]),
});

type FormData = z.infer<typeof schema>;

const DEVICES = [
  "Fire TV Stick",
  "Android TV",
  "Samsung Smart TV",
  "LG Smart TV",
  "Apple TV",
  "iPhone / iPad",
  "Android Phone",
  "MAG Box",
  "Windows / Mac",
  "Other",
];

export function TrialForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { connections: "1" },
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or contact us via WhatsApp.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full gradient-brand flex items-center justify-center mx-auto glow-blue">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white">You&apos;re all set!</h3>
        <p className="text-zinc-400 max-w-sm mx-auto">
          Check your email and WhatsApp/Telegram — your free trial credentials will arrive within 60 seconds.
        </p>
        <p className="text-sm text-zinc-500">
          Check spam if you don&apos;t see it. Or contact us on WhatsApp for instant delivery.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-blue-500/50"
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact" className="text-zinc-300">WhatsApp or Telegram</Label>
        <Input
          id="contact"
          placeholder="+1234567890 or @username"
          className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus:border-blue-500/50"
          {...register("contact")}
        />
        {errors.contact && <p className="text-xs text-red-400">{errors.contact.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="device" className="text-zinc-300">Primary Device</Label>
        <select
          id="device"
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500/50"
          {...register("device")}
        >
          <option value="">Select your device...</option>
          {DEVICES.map((d) => (
            <option key={d} value={d} className="bg-zinc-900">{d}</option>
          ))}
        </select>
        {errors.device && <p className="text-xs text-red-400">{errors.device.message}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-zinc-300">Simultaneous Connections</Label>
        <div className="flex gap-3">
          {(["1", "2", "3"] as const).map((n) => (
            <label key={n} className="flex-1">
              <input type="radio" value={n} {...register("connections")} className="sr-only peer" />
              <div className="border border-white/10 rounded-xl py-3 text-center text-sm font-medium text-zinc-400 cursor-pointer peer-checked:border-blue-500 peer-checked:text-blue-400 peer-checked:bg-blue-500/10 transition-all">
                {n} {n === "1" ? "device" : "devices"}
              </div>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full gradient-brand border-0 text-white font-semibold text-base py-4 h-auto glow-blue-sm hover:opacity-90 transition-opacity"
      >
        {isSubmitting ? (
          <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Activating...</>
        ) : (
          <><Zap className="w-5 h-5 mr-2" />Activate My Free Trial</>
        )}
      </Button>

      <div className="flex flex-col gap-1.5 pt-2">
        {["✓ Instant activation", "✓ No credit card required", "✓ Cancel anytime"].map((t) => (
          <p key={t} className="text-xs text-zinc-500 text-center">{t}</p>
        ))}
      </div>
    </form>
  );
}
