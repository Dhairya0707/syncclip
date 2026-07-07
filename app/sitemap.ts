import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://syncclip.in';

  return [
    // === CORE ===
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
      alternates: {
        languages: {
          'en-US': `${baseUrl}`,
          'en-IN': `${baseUrl}`,
        },
      },
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

    // === THEME 1 FLAGSHIP: Android-to-PC/Windows Transfer ===
    {
      url: `${baseUrl}/android-to-pc-clipboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/android-to-windows`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.92,
      alternates: {
        languages: {
          'en-IN': `${baseUrl}/android-to-windows`,
        },
      },
    },
    {
      url: `${baseUrl}/mac-to-windows-clipboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // === THEME 2 FLAGSHIP: No-Install Zero-Login Clipboard ===
    {
      url: `${baseUrl}/clipboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/online-clipboard`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/clipboard-sync-guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // === THEME 3 FLAGSHIP: Developer / Code Snippet Sharing ===
    {
      url: `${baseUrl}/move-code-snippet-between-devices`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // === UNIQUE CONTENT (not consolidated) ===
    {
      url: `${baseUrl}/pastebin-alternative`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pastebin-alternative-private`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pushbullet-alternative`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },

    // === UNIQUE BLOG POSTS (not consolidated) ===
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/phone-link-vs-syncclip`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/blog/how-to-copy-text-from-android-to-mac`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/clipboard-sync-for-remote-teams`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/clipboard-sync-indian-developers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
