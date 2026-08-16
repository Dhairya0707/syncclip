import { MetadataRoute } from 'next';
import { blogs } from '@/utils/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://syncclip.in';

  // Helper to generate precise multilingual / regional alternate links per path
  const getAlternates = (path: string = '') => ({
    languages: {
      'en-US': `${baseUrl}${path}`,
      'en-IN': `${baseUrl}${path}`,
      'en-NP': `${baseUrl}${path}`,
      'en-PK': `${baseUrl}${path}`,
      'x-default': `${baseUrl}${path}`,
    },
  });

  const landingPages = [
    // Theme 1: Android-to-PC/Windows Transfer (High-Traffic Geographies)
    { path: '/android-to-pc-clipboard', priority: 0.95 },
    { path: '/android-to-windows', priority: 0.95, regional: true },
    { path: '/mac-to-windows-clipboard', priority: 0.9 },
    { path: '/iphone-to-windows-clipboard', priority: 0.92 },
    { path: '/copy-text-from-phone-to-computer', priority: 0.9 },
    { path: '/send-text-mobile-to-laptop', priority: 0.88 },
    { path: '/cross-device-clipboard', priority: 0.88 },

    // Theme 2: No-Install Zero-Login Online Clipboard (High-Leverage Search)
    { path: '/clipboard', priority: 0.99 },
    { path: '/clipboard-sync-guide', priority: 0.9 },
    { path: '/clipboard-sync-free-no-account', priority: 0.88 },
    { path: '/temporary-clipboard-online', priority: 0.88 },
    { path: '/clipboard-alternative-to-email', priority: 0.85 },
    { path: '/clipboard-vs-email', priority: 0.85 },
    { path: '/share-text-across-devices-free', priority: 0.85 },

    // Theme 3: Developer / Code Snippet Sharing & Competitor Alternatives
    { path: '/airdrop-for-windows-and-android', priority: 0.92 },
    { path: '/move-code-snippet-between-devices', priority: 0.9 },
    { path: '/pastebin-alternative', priority: 0.88 },
    { path: '/pastebin-alternative-private', priority: 0.85 },
    { path: '/pushbullet-alternative', priority: 0.88 },

    // Theme 4: Cross-Platform & How-To Workflows
    { path: '/how-to-send-otp-from-phone-to-pc', priority: 0.88 },
    { path: '/fastest-way-to-copy-links-between-devices', priority: 0.88 },
    { path: '/share-text-without-whatsapp', priority: 0.88 },
    { path: '/share-links-between-devices', priority: 0.85 },
  ];

  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: getAlternates(''),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: getAlternates('/about'),
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: getAlternates('/support'),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: getAlternates('/privacy'),
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: getAlternates('/feedback'),
    },
  ];

  const landingEntries: MetadataRoute.Sitemap = landingPages.map((p) => ({
    url: `${baseUrl}${p.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p.priority,
    alternates: p.regional
      ? { languages: { 'en-IN': `${baseUrl}${p.path}`, 'x-default': `${baseUrl}${p.path}` } }
      : getAlternates(p.path),
  }));

  const blogIndexEntry: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
      alternates: getAlternates('/blog'),
    },
  ];

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.pubDate),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
    alternates: getAlternates(`/blog/${blog.slug}`),
  }));

  return [...corePages, ...landingEntries, ...blogIndexEntry, ...blogEntries];
}