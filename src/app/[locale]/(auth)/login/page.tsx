"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tv2, Loader2, AlertCircle } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE_CONFIG } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setServerError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      setServerError(
        error.message === "Invalid login credentials"
          ? "Incorrect email or password."
          : error.message
      );
      return;
    }
    router.push("/account");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background bg-grid px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
              <Tv2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">{SITE_CONFIG.name}</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Sign in to your account</h1>
          <p className="text-zinc-400 text-sm mt-2">Access your dashboard and subscription</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="glass-card rounded-2xl p-8 border border-white/10 space-y-5">
            {serverError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {serverError}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-zinc-300">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-zinc-300">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-500"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gradient-brand border-0 text-white font-semibold"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in…</>
              ) : "Sign In"}
            </Button>

            <p className="text-center text-sm text-zinc-500">
              Don&apos;t have an account?{" "}
              <Link href="/checkout" className="text-blue-400 hover:text-blue-300">
                Subscribe now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
