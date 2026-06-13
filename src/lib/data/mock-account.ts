// Mock account data for the dashboard demo / video.
// TODO: replace with real Supabase reads (subscriptions table) before launch.

export const MOCK_SUBSCRIPTION = {
  planName: "12 Months",
  status: "active" as const,
  daysRemaining: 247,
  startedAt: "2026-02-15",
  expiresAt: "2027-02-15",
  connections: 3,
  connectionsInUse: 2,
  price: 89.99,
  autoRenew: true,
  channels: "110,000+",
  vod: "170,000+",
  m3uUrl:
    "http://cdn.ultrastream.tv:8080/get.php?username=demo_customer&password=Xy7Kp9Qm&type=m3u_plus",
  xtreamHost: "http://cdn.ultrastream.tv:8080",
  xtreamUsername: "demo_customer",
  xtreamPassword: "Xy7Kp9Qm",
  epgUrl: "http://cdn.ultrastream.tv:8080/xmltv.php?username=demo_customer&password=Xy7Kp9Qm",
  features: [
    "110,000+ Live Channels",
    "170,000+ Movies & Series",
    "4K / 8K UHD Streaming",
    "Anti-Freeze Technology",
    "EPG Electronic Guide",
    "3 Simultaneous Connections",
    "24/7 Priority Support",
  ],
};

export const MOCK_DEVICES = [
  { name: "Fire TV Stick 4K", type: "📺", lastActive: "2 minutes ago", ip: "Living Room", status: "online" as const },
  { name: "iPhone 15 Pro",    type: "📱", lastActive: "1 hour ago",    ip: "Mobile (4G)", status: "online" as const },
  { name: "Samsung Smart TV", type: "📺", lastActive: "Yesterday",     ip: "Bedroom",     status: "offline" as const },
];

export const MOCK_ACTIVITY = [
  { action: "Stream started", detail: "ESPN 4K · Fire TV Stick", time: "2 minutes ago" },
  { action: "Login",          detail: "iPhone 15 Pro · Mobile",  time: "1 hour ago" },
  { action: "Stream started", detail: "Netflix VOD · Samsung TV", time: "Yesterday" },
  { action: "Subscription renewed", detail: "12 Months plan",     time: "Feb 15, 2026" },
  { action: "Password changed", detail: "Account security",       time: "Feb 10, 2026" },
];

export const MOCK_PAYMENT_METHOD = {
  brand: "Visa",
  last4: "4242",
  expiry: "12 / 30",
};

export const MOCK_INVOICES = [
  { id: "INV-2026-0215", date: "Feb 15, 2026", plan: "12 Months", amount: 89.99, status: "Paid" as const },
  { id: "INV-2025-0215", date: "Feb 15, 2025", plan: "12 Months", amount: 89.99, status: "Paid" as const },
  { id: "INV-2024-0820", date: "Aug 20, 2024", plan: "6 Months",  amount: 54.99, status: "Paid" as const },
  { id: "INV-2024-0215", date: "Feb 15, 2024", plan: "3 Months",  amount: 34.99, status: "Paid" as const },
];
