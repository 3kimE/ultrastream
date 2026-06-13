import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/data/blog";
import { DEVICES } from "@/lib/data/devices";
import { CHANNEL_CATEGORIES } from "@/lib/data/channels";

const COMPETITOR_SLUGS = ["nigma-tv", "xtreme-hd-iptv", "apollo-group-tv", "falcon-iptv", "kemo-iptv"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/channels`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/free-trial`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/devices`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/reseller`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/status`, lastModified: now, changeFrequency: "hourly", priority: 0.6 },
    { url: `${base}/signup`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/checkout`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
  ];

  const devicePages: MetadataRoute.Sitemap = DEVICES.map((d) => ({
    url: `${base}/devices/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const competitorPages: MetadataRoute.Sitemap = COMPETITOR_SLUGS.map((slug) => ({
    url: `${base}/vs/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const channelCategoryPages: MetadataRoute.Sitemap = CHANNEL_CATEGORIES.map((c) => ({
    url: `${base}/channels/${c.name.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...devicePages, ...blogPages, ...competitorPages, ...channelCategoryPages];
}
