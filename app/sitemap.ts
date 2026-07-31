import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://syncclip.in';

  const standardLangs = {
    'en-US': baseUrl,
    'en-IN': baseUrl,
    'en-NP': baseUrl,
    'en-PK': baseUrl,
  };

  const landingPages = [
    // Theme 1: Android-to-PC/Windows Transfer
    { path: '/android-to-pc-clipboard', priority: 0.95 },
    { path: '/android-to-windows', priority: 0.92 },
    { path: '/mac-to-windows-clipboard', priority: 0.9 },
    { path: '/copy-text-from-phone-to-computer', priority: 0.9 },
    { path: '/send-text-mobile-to-laptop', priority: 0.85 },
    { path: '/cross-device-clipboard', priority: 0.85 },

    // Theme 2: No-Install Zero-Login Clipboard
    { path: '/clipboard', priority: 0.98 },
    // /online-clipboard → 301 → /clipboard (removed from sitemap; authority consolidated)
    { path: '/clipboard-sync-guide', priority: 0.9 },
    { path: '/clipboard-sync-free-no-account', priority: 0.85 },
    { path: '/temporary-clipboard-online', priority: 0.85 },
    { path: '/clipboard-alternative-to-email', priority: 0.85 },
    { path: '/clipboard-vs-email', priority: 0.8 },
    { path: '/share-text-across-devices-free', priority: 0.8 },

    // Theme 3: Developer / Code Snippet Sharing
    { path: '/move-code-snippet-between-devices', priority: 0.9 },
    { path: '/pastebin-alternative', priority: 0.85 },
    { path: '/pastebin-alternative-private', priority: 0.8 },
    { path: '/pushbullet-alternative', priority: 0.8 },

    // Theme 4: Cross-Platform & How-To
    { path: '/how-to-send-otp-from-phone-to-pc', priority: 0.85 },
    { path: '/fastest-way-to-copy-links-between-devices', priority: 0.85 },
    { path: '/share-text-without-whatsapp', priority: 0.85 },
    { path: '/share-links-between-devices', priority: 0.8 },
  ];

  const blogPosts = [
    '5-ways-to-copy-text-between-phone-and-laptop',
    'best-free-clipboard-manager',
    'best-online-clipboard-tools-2026',
    'can-i-sync-clipboard-android-windows-free',
    'clipboard-sync-for-remote-teams',
    'clipboard-sync-indian-developers',
    'copy-phone-to-pc-without-app',
    'copy-text-from-android-phone-to-windows-pc-instantly',
    'cross-device-clipboard-sync-for-developers-copy-code-snippets-instantly',
    'fastest-way-to-copy-text-without-app',
    'free-clipboard-sync-no-account',
    'how-to-copy-and-paste-online-between-two-devices-using-a-link',
    'how-to-copy-text-from-android-to-mac',
    'how-to-share-clipboard-between-android-and-windows-pc',
    'how-to-share-clipboard-online',
    'how-to-share-text-between-android-and-windows-without-whatsapp-or-cable',
    'how-to-sync-clipboard-between-devices',
    'how-to-sync-clipboard-without-installing-anything',
    'is-online-clipboard-secure',
    'locked-clipboard-write-delegation',
    'online-clipboard-vs-cloud-notes',
    'online-clipboard-vs-desktop-apps',
    'online-clipboard-without-installing-anything-or-using-a-network-app',
    'phone-link-vs-syncclip',
    'pushbullet-alternatives-2026',
    'share-text-across-devices',
    'share-text-between-mobile-and-laptop-without-whatsapp',
    'stop-emailing-yourself-notes',
    'sync-clipboard-between-devices-without-same-wifi',
    'sync-clipboard-mac-windows',
    'syncclip-vs-universal-clipboard',
    'what-is-a-live-clipboard',
    'what-is-an-online-clipboard-complete-guide',
    'what-is-the-best-free-online-clipboard',
    'what-is-the-best-online-clipboard-that-syncs-automatically-in-real-time',
  ];

  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
      alternates: { languages: standardLangs },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/feedback`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const landingEntries: MetadataRoute.Sitemap = landingPages.map(p => ({
    url: `${baseUrl}${p.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: p.priority,
    alternates: p.path === '/android-to-windows'
      ? { languages: { 'en-IN': `${baseUrl}${p.path}` } }
      : { languages: standardLangs },
  }));

  const blogEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogPosts.map(slug => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [...corePages, ...landingEntries, ...blogEntries];
}