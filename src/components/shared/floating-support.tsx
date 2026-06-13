"use client";

import { useState } from "react";
import { MessageCircle, Send, X, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FloatingSupport() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="glass-card rounded-2xl p-4 w-64 border border-white/10 shadow-2xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-white">24/7 Support</p>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-zinc-400 mb-3">
            Avg. response time: <span className="text-green-400 font-medium">4 minutes</span>
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm text-white font-medium">WhatsApp</span>
            </a>
            <a
              href={`https://t.me/${SITE_CONFIG.telegram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
            >
              <Send className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white font-medium">Telegram</span>
            </a>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-zinc-400" />
              <span className="text-sm text-zinc-300">Email Support</span>
            </a>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-14 h-14 rounded-full gradient-brand flex items-center justify-center shadow-lg transition-all duration-300 glow-blue",
          open ? "rotate-90" : "hover:scale-110"
        )}
        aria-label="Open support chat"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
