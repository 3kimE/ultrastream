import { Metadata } from "next";
import { SITE_CONFIG } from "./constants";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
}

export function generateSEO({
  title,
  description,
  image = "/og-image.png",
  noIndex = false,
  canonical,
}: SEOProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`;
  const fullDescription =
    description ??
    `${SITE_CONFIG.name}: Stream ${SITE_CONFIG.channelCount.toLocaleString()}+ live channels in 4K. ${SITE_CONFIG.vodCount.toLocaleString()}+ movies & series. Buffer-free, instant activation, 24-hour free trial.`;

  return {
    title: fullTitle,
    description: fullDescription,
    metadataBase: new URL(SITE_CONFIG.url),
    ...(canonical && { alternates: { canonical } }),
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonical ?? SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/logo.svg`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "French", "Spanish", "Arabic", "Portuguese"],
  },
  sameAs: [
    `https://t.me/${SITE_CONFIG.telegram.replace("@", "")}`,
    `https://twitter.com/${SITE_CONFIG.name.toLowerCase()}`,
  ],
};
