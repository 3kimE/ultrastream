"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Menu, X, Tv2, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import type { Locale } from "@/i18n/routing";

const LANGUAGES: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "EN", native: "English" },
  { code: "fr", label: "FR", native: "Français" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params?.locale as Locale) ?? "en";

  const NAV_ITEMS = [
    { label: t("channels"), href: "/channels" as const },
    { label: t("pricing"),  href: "/pricing"  as const },
    { label: t("devices"),  href: "/devices"  as const },
    { label: t("reseller"), href: "/reseller" as const },
    { label: t("blog"),     href: "/blog"     as const },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  function switchLocale(locale: Locale) {
    router.replace(pathname, { locale });
    setLangOpen(false);
  }

  return (
    <>
      <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "glass-nav py-3" : "py-5")}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Tv2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white group-hover:gradient-brand-text transition-all">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase font-medium">{currentLocale}</span>
              </button>
              {langOpen && (
                <div className="absolute end-0 top-full mt-1 glass-card rounded-xl overflow-hidden border border-white/10 w-36 shadow-2xl z-50">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => switchLocale(l.code)}
                      className={cn(
                        "w-full px-4 py-2.5 text-sm text-start hover:bg-white/5 transition-colors flex items-center justify-between",
                        currentLocale === l.code ? "text-blue-400 bg-blue-500/5" : "text-zinc-300"
                      )}
                    >
                      <span>{l.native}</span>
                      <span className="text-xs text-zinc-600 font-mono">{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white">
                {t("login")}
              </Button>
            </Link>
            <Link href="/free-trial">
              <Button size="sm" className="gradient-brand border-0 text-white hover:opacity-90 glow-blue-sm font-semibold">
                {t("freeTrial")}
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 glass-nav pt-20">
          <div className="px-4 py-6 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  pathname === item.href
                    ? "text-white bg-blue-500/20 border border-blue-500/30"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/login" className="block">
                <Button variant="ghost" className="w-full border border-white/10">{t("login")}</Button>
              </Link>
              <Link href="/free-trial" className="block">
                <Button className="w-full gradient-brand border-0 text-white font-semibold glow-blue">
                  {t("freeTrial")}
                </Button>
              </Link>
            </div>
            {/* Language row */}
            <div className="mt-4 flex gap-2 flex-wrap">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors",
                    currentLocale === l.code
                      ? "border-blue-500 text-blue-400 bg-blue-500/10"
                      : "border-white/10 text-zinc-400 hover:text-white"
                  )}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
