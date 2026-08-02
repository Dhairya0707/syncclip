import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://syncclip.in';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // Do not index API routes
          '/join', // Do not index the raw join route without a session code
          '/*?*',  // Do not index URLs with query parameters to prevent duplicate content
        ],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'YouBot',
          'Google-Extended',
          'cohere-ai',
          'Applebot-Extended',
          'Bytespider',
          'CCBot',
        ],
        allow: '/',
        disallow: [
          '/api/',
          '/join',
          '/*?*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
