export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  coverImage: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "best-iptv-2026-complete-guide",
    title: "Best IPTV Service in 2026: The Complete Guide",
    excerpt: "A comprehensive breakdown of everything you need to know before choosing an IPTV provider in 2026 — including what to look for, what red flags to avoid, and why channel count alone doesn't tell the whole story.",
    date: "2026-01-15",
    category: "IPTV Guides",
    readTime: "12 min read",
    coverImage: "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=1200&q=80",
    author: "James Mitchell",
  },
  {
    slug: "how-to-install-iptv-on-firestick",
    title: "How to Install IPTV on Fire TV Stick (2026 Guide)",
    excerpt: "Step-by-step guide to installing IPTV on any Amazon Fire TV Stick model. Covers enabling unknown sources, installing Downloader, setting up IPTV Smarters, and troubleshooting common issues.",
    date: "2026-01-20",
    category: "Device Setup",
    readTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    author: "Sana Karimi",
  },
  {
    slug: "iptv-vs-cable-tv-2026-comparison",
    title: "IPTV vs Cable TV in 2026: Which Is Worth Your Money?",
    excerpt: "We compared IPTV and cable TV across 10 criteria: cost, channel count, 4K availability, contract requirements, setup ease, and more. The results might surprise long-time cable subscribers.",
    date: "2026-02-01",
    category: "Comparisons",
    readTime: "10 min read",
    coverImage: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&q=80",
    author: "Alex Rivera",
  },
  {
    slug: "best-iptv-for-sports-streaming",
    title: "Best IPTV for Sports Streaming: Premier League, NFL, NBA and More",
    excerpt: "Sports fans demand the most from their IPTV service — low latency, reliable HD/4K streams, and comprehensive coverage. We break down what to look for and which providers deliver.",
    date: "2026-02-10",
    category: "Sports Streaming",
    readTime: "9 min read",
    coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80",
    author: "James Mitchell",
  },
  {
    slug: "4k-iptv-everything-you-need-to-know",
    title: "4K IPTV: Everything You Need to Know in 2026",
    excerpt: "What does 4K IPTV actually mean? What internet speed do you need? Which devices support it? We answer every 4K question and explain why not all '4K IPTV' claims are equal.",
    date: "2026-02-20",
    category: "IPTV Guides",
    readTime: "11 min read",
    coverImage: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=1200&q=80",
    author: "Sana Karimi",
  },
];
