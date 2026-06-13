export const SITE_CONFIG = {
  name: "ULTRASTREAM",
  tagline: "Stream 110,000+ channels in 4K. Buffer-free, anywhere.",
  url: "https://ultrastream.tv",
  whatsapp: "+1XXXXXXXXXX",
  telegram: "@ultrastream",
  email: "support@ultrastream.tv",
  channelCount: 110000,
  vodCount: 170000,
  countries: 150,
  uptime: 99.9,
  trialHours: 24,
  activeUsers: 47832,
  streamingChannels: 12400,
  trialActivationsToday: 847,
  satisfactionRate: 98,
};

export const NAV_ITEMS = [
  { label: "Channels", href: "/channels" },
  { label: "Pricing", href: "/pricing" },
  { label: "Devices", href: "/devices" },
  { label: "Reseller", href: "/reseller" },
  { label: "Blog", href: "/blog" },
];

export const SOCIAL_LINKS = {
  telegram: "https://t.me/ultrastream",
  whatsapp: "https://wa.me/1XXXXXXXXXX",
  twitter: "https://twitter.com/ultrastream",
  facebook: "https://facebook.com/ultrastream",
};

export const SUPPORTED_LOCALES = ["en", "fr", "es", "ar", "pt"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
