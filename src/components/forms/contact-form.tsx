"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Loader2, Check } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Please write at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError("Failed to send. Try WhatsApp for instant support.");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
        <p className="text-zinc-400 text-sm">We&apos;ll reply to your email within a few hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-zinc-300">Name</Label>
          <Input {...register("name")} placeholder="Your name" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500" />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label className="text-zinc-300">Email</Label>
          <Input {...register("email")} type="email" placeholder="you@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500" />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-zinc-300">Subject</Label>
        <Input {...register("subject")} placeholder="How can we help?" className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500" />
        {errors.subject && <p className="text-xs text-red-400">{errors.subject.message}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-zinc-300">Message</Label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Describe your question or issue..."
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-blue-500/50 resize-none"
        />
        {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
      </div>
      {error && <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}
      <Button type="submit" disabled={isSubmitting} className="w-full gradient-brand border-0 text-white font-semibold">
        {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : <><Send className="w-4 h-4 mr-2" />Send Message</>}
      </Button>
    </form>
  );
}
