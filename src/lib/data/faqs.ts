export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory =
  | "General"
  | "Account"
  | "Billing"
  | "Channels"
  | "Devices"
  | "Streaming Quality"
  | "Refunds"
  | "Reseller";

export const FAQS: FAQ[] = [
  // General
  {
    id: "what-is-iptv",
    category: "General",
    question: "What is IPTV and how does it work?",
    answer: "IPTV (Internet Protocol Television) delivers television content over the internet rather than through traditional cable or satellite. You receive an M3U playlist or Xtream Codes login that works with a compatible app on your device. The content is streamed in real time from global servers, giving you access to thousands of channels worldwide.",
  },
  {
    id: "is-iptv-legal",
    category: "General",
    question: "Is IPTV legal?",
    answer: "ULTRASTREAM is a technology platform that aggregates publicly available and licensed content streams. IPTV itself is a legal technology used by major providers like YouTube TV, Hulu Live, and Sling TV. We recommend you verify the content licensing terms in your jurisdiction. Our service is designed to help users access content they are authorized to view.",
  },
  {
    id: "what-internet-speed",
    category: "General",
    question: "What internet speed do I need?",
    answer: "For SD (Standard Definition) streaming: 5 Mbps minimum. For HD streaming: 10-15 Mbps. For 4K UHD streaming: 25-50 Mbps. Most modern broadband connections are more than sufficient. We recommend a wired Ethernet connection for the best 4K experience.",
  },
  {
    id: "vpn-compatible",
    category: "General",
    question: "Does it work with a VPN?",
    answer: "Yes, ULTRASTREAM is fully VPN-compatible. If you use a VPN for privacy or to access region-specific content, our service will continue to function normally. Some users report slightly higher latency with VPNs, so we recommend a fast VPN server close to your location.",
  },
  // Account
  {
    id: "how-many-devices",
    category: "Account",
    question: "How many devices can I use simultaneously?",
    answer: "The number of simultaneous connections depends on your plan: 1 Month = 1 connection, 3 Months = 2 connections, 6 Months = 2 connections, 12 Months = 3 connections, 24 Months = 3 connections. You can add extra connections for $3/month per additional device.",
  },
  {
    id: "share-account",
    category: "Account",
    question: "Can I share my subscription with family?",
    answer: "Yes! Our plans allow multiple simultaneous connections. For example, the 12-month plan supports 3 streams at once, perfect for households with multiple TVs and devices. Each person just needs to use the same M3U URL or credentials.",
  },
  {
    id: "change-device",
    category: "Account",
    question: "Can I change my device or install on a new device?",
    answer: "Absolutely. Your credentials work on any compatible device. Simply download the recommended app on your new device, enter the same M3U URL or Xtream Codes credentials, and you're live. There's no limit on how many devices you install on — only the simultaneous streams are limited.",
  },
  {
    id: "activation-time",
    category: "Account",
    question: "How fast is activation after payment?",
    answer: "Activation is instant — typically within 60 seconds of payment confirmation. You'll receive your credentials via email and optionally WhatsApp/Telegram. If you don't receive them within 5 minutes, check your spam folder or contact our 24/7 support.",
  },
  // Billing
  {
    id: "payment-methods",
    category: "Billing",
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, PayPal, Bitcoin (BTC), Ethereum (ETH), USDT (Tether), and other major cryptocurrencies. All card payments are processed securely via Stripe. Crypto payments are processed via NowPayments.",
  },
  {
    id: "auto-renewal",
    category: "Billing",
    question: "Does my subscription auto-renew?",
    answer: "Subscriptions do not auto-renew by default. You will receive a renewal reminder 7 days before your subscription expires. You can manually renew at the same or a different plan tier. There are no hidden fees or surprise charges.",
  },
  {
    id: "upgrade-plan",
    category: "Billing",
    question: "Can I upgrade my plan mid-subscription?",
    answer: "Yes. Contact our support team and we'll calculate a prorated credit for your remaining days and apply it to the upgraded plan. Upgrades are processed within 24 hours.",
  },
  {
    id: "invoice",
    category: "Billing",
    question: "Can I get an invoice for my purchase?",
    answer: "Yes, a receipt is automatically emailed after each payment. For a formal VAT invoice, contact support with your business details and we'll issue one within 48 hours.",
  },
  // Channels
  {
    id: "channel-count",
    category: "Channels",
    question: "How many channels are included?",
    answer: "All plans include 110,000+ live channels and 170,000+ movies and TV series. This covers 150+ countries worldwide including USA, UK, Canada, Europe, Middle East, South Asia, Latin America, Africa, and Southeast Asia. Channels are updated continuously.",
  },
  {
    id: "sports-coverage",
    category: "Channels",
    question: "What sports channels are included?",
    answer: "Our sports coverage is comprehensive: NFL, NBA, MLB, NHL, MLS (USA), Premier League, La Liga, Bundesliga, Serie A, UEFA Champions League, Europa League (Europe), beIN Sports (MENA), Star Sports (South Asia), SuperSport (Africa), and 15,000+ more sports channels worldwide. All major events covered.",
  },
  {
    id: "channel-updates",
    category: "Channels",
    question: "How often are channels updated?",
    answer: "Our channel list is updated automatically. When a channel changes its stream URL or a new channel is added, it's reflected in your M3U playlist within 24-48 hours. No action required on your end — just refresh your playlist in your IPTV app.",
  },
  {
    id: "epg-guide",
    category: "Channels",
    question: "Do you provide an EPG (Electronic Program Guide)?",
    answer: "Yes, EPG is included on all plans. The EPG shows current and upcoming programs for thousands of channels, 7 days ahead. It works with all major IPTV apps including TiviMate, IPTV Smarters, Smart IPTV, and more. The EPG URL is included in your welcome email.",
  },
  // Devices
  {
    id: "compatible-devices",
    category: "Devices",
    question: "What devices are compatible?",
    answer: "ULTRASTREAM works on: Amazon Fire TV Stick (all models), Android TV & Google TV, Samsung Smart TV (Tizen), LG Smart TV (webOS), Apple TV (4th gen+), iPhone & iPad (iOS 14+), Android phones & tablets, MAG boxes (250, 254, 256, 322, 351, 424), Windows PC, Mac, Kodi, VLC, and most Smart TVs with an app store.",
  },
  {
    id: "smart-tv-no-app",
    category: "Devices",
    question: "My Smart TV doesn't have an app store. Can I still use it?",
    answer: "Yes. Connect a Fire TV Stick or Android TV box (like NVIDIA SHIELD or Chromecast with Google TV) to your TV's HDMI port. This adds full app store support to any TV with an HDMI input.",
  },
  // Streaming Quality
  {
    id: "buffering-issues",
    category: "Streaming Quality",
    question: "What if it buffers?",
    answer: "Buffering is usually caused by a slow internet connection or network congestion. Try: (1) Switch to a wired Ethernet connection. (2) Restart your router. (3) In your IPTV app, select a lower stream quality. (4) Try a different server region in the app settings. Our anti-freeze technology handles most buffering automatically, but 25+ Mbps is recommended for 4K.",
  },
  {
    id: "4k-requirements",
    category: "Streaming Quality",
    question: "What do I need for 4K streaming?",
    answer: "For 4K/UHD streaming you need: (1) An internet connection of 25+ Mbps. (2) A 4K-compatible device (Fire TV Stick 4K, Apple TV 4K, Android TV box, or 4K Smart TV). (3) A 4K TV screen. (4) Wired Ethernet connection (recommended, not required).",
  },
  {
    id: "server-locations",
    category: "Streaming Quality",
    question: "Where are your servers located?",
    answer: "We operate CDN-distributed servers across 12 global regions including USA, UK, Netherlands, Germany, France, Canada, UAE, Singapore, and Brazil. Your IPTV app automatically connects you to the nearest server for the lowest latency.",
  },
  // Refunds
  {
    id: "refund-policy",
    category: "Refunds",
    question: "What is your refund policy?",
    answer: "We offer a 7-day money-back guarantee on all plans. If you're not satisfied for any reason within the first 7 days, contact support with your order number and we'll process a full refund within 3-5 business days. Crypto payments are refunded in equivalent USDT or store credit.",
  },
  {
    id: "cancel-anytime",
    category: "Refunds",
    question: "Can I cancel anytime?",
    answer: "Yes. Since subscriptions are prepaid and non-auto-renewing, there's nothing to 'cancel' — your subscription simply expires at the end of its period. If you want a refund within the 7-day window, contact support and we'll process it immediately.",
  },
  // Reseller
  {
    id: "reseller-program",
    category: "Reseller",
    question: "How does the reseller program work?",
    answer: "Purchase credit packages at wholesale prices (up to 70% discount). Each credit = 1 month for 1 user. Use our reseller panel to create and manage client subscriptions. You set your own retail price and keep 100% of the profit margin. Full white-label branding available on 500+ credit packages.",
  },
  {
    id: "reseller-panel",
    category: "Reseller",
    question: "What does the reseller panel include?",
    answer: "The reseller dashboard includes: client management (create/renew/suspend), credit balance tracking, real-time sales analytics, customizable sub-reseller creation, branded M3U URLs, API access, and a dedicated account manager for 100+ credit packages.",
  },
  // Extra FAQs
  {
    id: "trial-available",
    category: "General",
    question: "Is there a free trial?",
    answer: "Yes! We offer a 24-hour free trial with no credit card required. You get access to the full channel list so you can verify quality and compatibility with your device before subscribing. Visit /free-trial to activate instantly.",
  },
  {
    id: "customer-support",
    category: "Account",
    question: "How do I reach customer support?",
    answer: "We offer 24/7 support via: WhatsApp (fastest — avg. 4-minute response), Telegram, and email. Live chat is available on the website during business hours. For technical issues, our setup guides cover 95% of common problems.",
  },
  {
    id: "adult-channels",
    category: "Channels",
    question: "Are adult channels included?",
    answer: "Adult content channels are available as an optional add-on for +$5/month. They are disabled by default on all subscriptions and must be explicitly enabled by request. Parental controls are available to prevent accidental access.",
  },
  {
    id: "catch-up-tv",
    category: "Channels",
    question: "Do you have Catch-Up TV?",
    answer: "Yes, Catch-Up TV (watch last 7 days of programming) is available on select channels. Look for the Catch-Up icon in compatible IPTV apps like TiviMate. Coverage varies by broadcaster — major UK, French, and Spanish channels have full 7-day catch-up.",
  },
];

export const FAQ_CATEGORIES: FAQCategory[] = [
  "General",
  "Account",
  "Billing",
  "Channels",
  "Devices",
  "Streaming Quality",
  "Refunds",
  "Reseller",
];
