export interface Plan {
  id: string;
  name: string;
  months: number;
  price: number;
  originalPrice: number;
  pricePerMonth: number;
  devices: number;
  badge?: string;
  badgeColor?: "blue" | "cyan";
  popular?: boolean;
  features: string[];
  channels: string;
  vod: string;
}

export const PLANS: Plan[] = [
  {
    id: "1mo",
    name: "1 Month",
    months: 1,
    price: 14.99,
    originalPrice: 14.99,
    pricePerMonth: 14.99,
    devices: 1,
    channels: "110,000+",
    vod: "170,000+",
    features: [
      "110,000+ Live Channels",
      "170,000+ Movies & Series",
      "4K / 8K UHD Streaming",
      "Anti-Freeze Technology",
      "EPG Electronic Guide",
      "All Major Devices",
      "VPN Compatible",
      "24/7 Customer Support",
    ],
  },
  {
    id: "3mo",
    name: "3 Months",
    months: 3,
    price: 34.99,
    originalPrice: 44.97,
    pricePerMonth: 11.66,
    devices: 2,
    channels: "110,000+",
    vod: "170,000+",
    features: [
      "110,000+ Live Channels",
      "170,000+ Movies & Series",
      "4K / 8K UHD Streaming",
      "Anti-Freeze Technology",
      "EPG Electronic Guide",
      "All Major Devices",
      "VPN Compatible",
      "24/7 Customer Support",
    ],
  },
  {
    id: "6mo",
    name: "6 Months",
    months: 6,
    price: 54.99,
    originalPrice: 89.94,
    pricePerMonth: 9.16,
    devices: 2,
    badge: "MOST POPULAR",
    badgeColor: "blue",
    popular: true,
    channels: "110,000+",
    vod: "170,000+",
    features: [
      "110,000+ Live Channels",
      "170,000+ Movies & Series",
      "4K / 8K UHD Streaming",
      "Anti-Freeze Technology",
      "EPG Electronic Guide",
      "All Major Devices",
      "VPN Compatible",
      "24/7 Priority Support",
      "Free Setup Assistance",
    ],
  },
  {
    id: "12mo",
    name: "12 Months",
    months: 12,
    price: 89.99,
    originalPrice: 179.88,
    pricePerMonth: 7.5,
    devices: 3,
    badge: "BEST VALUE",
    badgeColor: "cyan",
    channels: "110,000+",
    vod: "170,000+",
    features: [
      "110,000+ Live Channels",
      "170,000+ Movies & Series",
      "4K / 8K UHD Streaming",
      "Anti-Freeze Technology",
      "EPG Electronic Guide",
      "All Major Devices",
      "VPN Compatible",
      "24/7 Priority Support",
      "Free Setup Assistance",
      "3 Simultaneous Connections",
    ],
  },
  {
    id: "24mo",
    name: "24 Months",
    months: 24,
    price: 149.99,
    originalPrice: 359.76,
    pricePerMonth: 6.25,
    devices: 3,
    channels: "110,000+",
    vod: "170,000+",
    features: [
      "110,000+ Live Channels",
      "170,000+ Movies & Series",
      "4K / 8K UHD Streaming",
      "Anti-Freeze Technology",
      "EPG Electronic Guide",
      "All Major Devices",
      "VPN Compatible",
      "24/7 VIP Support",
      "Free Setup Assistance",
      "3 Simultaneous Connections",
      "Priority Server Access",
    ],
  },
];

export const RESELLER_PLANS = [
  { credits: 10, price: 49, discount: 30, pricePerCredit: 4.9 },
  { credits: 50, price: 199, discount: 50, pricePerCredit: 3.98 },
  { credits: 100, price: 349, discount: 60, pricePerCredit: 3.49 },
  { credits: 500, price: 1499, discount: 65, pricePerCredit: 3.0 },
  { credits: 1000, price: 2499, discount: 70, pricePerCredit: 2.5 },
];
