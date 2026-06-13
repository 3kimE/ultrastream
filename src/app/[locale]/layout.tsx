import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_CONFIG } from "@/lib/constants";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: {
      default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: `Stream ${SITE_CONFIG.channelCount.toLocaleString()}+ live channels in 4K. ${SITE_CONFIG.vodCount.toLocaleString()}+ movies & series. Buffer-free, instant activation, 24-hour free trial.`,
    metadataBase: new URL(SITE_CONFIG.url),
    openGraph: {
      type: "website",
      siteName: SITE_CONFIG.name,
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/favicon.ico", apple: "/icons/icon-192.png" },
    manifest: "/manifest.json",
    appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: SITE_CONFIG.name },
    alternates: {
      languages: {
        en: `${SITE_CONFIG.url}`,
        fr: `${SITE_CONFIG.url}/fr`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir="ltr"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
