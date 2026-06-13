"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_KEY = "ultrastream_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // Small delay so it doesn't flash on first paint
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).posthog) {
      ((window as unknown as Record<string, unknown>).posthog as { opt_in_capturing?: () => void })?.opt_in_capturing?.();
    }
  }

  function decline() {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="glass-card rounded-2xl p-5 border border-white/10 shadow-2xl">
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="text-sm font-semibold text-white">🍪 Cookie preferences</p>
          <button
            onClick={decline}
            className="text-zinc-400 hover:text-white transition-colors shrink-0 mt-0.5"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          We use essential cookies to run this site, and optional analytics cookies to understand how visitors use it.
          No personal data is sold. See our{" "}
          <Link href="/privacy" className="text-blue-400 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-2">
          <Button
            onClick={accept}
            className="flex-1 gradient-brand border-0 text-white text-sm font-medium h-9"
          >
            Accept all
          </Button>
          <Button
            onClick={decline}
            variant="outline"
            className="flex-1 border-white/15 text-zinc-300 hover:text-white text-sm h-9"
          >
            Essential only
          </Button>
        </div>
      </div>
    </div>
  );
}
