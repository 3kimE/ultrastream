"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Tv2, MessageCircle, Send, Globe } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const PAYMENT_METHODS = ["Visa", "MC", "PayPal", "BTC", "ETH", "USDT"];

export function Footer() {
  const t = useTranslations("footer");

  const FOOTER_LINKS = {
    [t("product")]: [
      { label: t("channels"),    href: "/channels"   },
      { label: t("pricingLink"), href: "/pricing"    },
      { label: t("devices"),     href: "/devices"    },
      { label: t("freeTrial"),   href: "/free-trial" },
      { label: t("status"),      href: "/status"     },
    ],
    [t("company")]: [
      { label: t("about"),    href: "/about"    },
      { label: t("blog"),     href: "/blog"     },
      { label: t("reseller"), href: "/reseller" },
      { label: t("contact"),  href: "/contact"  },
    ],
    [t("support")]: [
      { label: t("faq"),          href: "/faq"         },
      { label: t("howItWorks"),   href: "/how-it-works" },
      { label: t("deviceGuides"), href: "/devices"     },
      { label: t("liveChat"),     href: "/contact"     },
      { label: t("whatsapp"),     href: `https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`, external: true },
    ],
    [t("legal")]: [
      { label: t("terms"),   href: "/terms"   },
      { label: t("privacy"), href: "/privacy" },
      { label: t("refund"),  href: "/refund"  },
    ],
  };

  return (
    <footer className="border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <Tv2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-sm text-zinc-500 mb-5 leading-relaxed">{t("tagline")}</p>
            <div className="flex items-center gap-3">
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/\D/g, "")}`} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-green-500/20 hover:text-green-400 flex items-center justify-center text-zinc-400 transition-colors" aria-label="WhatsApp">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href={`https://t.me/${SITE_CONFIG.telegram.replace("@", "")}`} className="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-500/20 hover:text-blue-400 flex items-center justify-center text-zinc-400 transition-colors" aria-label="Telegram">
                <Send className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 hover:bg-sky-500/20 hover:text-sky-400 flex items-center justify-center text-zinc-400 transition-colors" aria-label="Twitter">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">{group}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href as "/channels" | "/pricing" | "/devices" | "/free-trial" | "/status" | "/about" | "/blog" | "/reseller" | "/contact" | "/faq" | "/how-it-works" | "/terms" | "/privacy" | "/refund"} className="text-sm text-zinc-400 hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. {t("copyright")}
          </p>
          <div className="flex items-center gap-2">
            {PAYMENT_METHODS.map((m) => (
              <span key={m} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-zinc-400 font-medium">{m}</span>
            ))}
          </div>
          <p className="text-xs text-zinc-600">EN · FR · AR</p>
        </div>
      </div>
    </footer>
  );
}
