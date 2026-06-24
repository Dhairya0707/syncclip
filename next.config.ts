import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // Required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: "/clipboard-between-devices",
        destination: "/cross-device-clipboard",
        permanent: true,
      },
      {
        source: "/sync-clipboard-between-devices",
        destination: "/cross-device-clipboard",
        permanent: true,
      },
      {
        source: "/copy-text-phone-to-computer",
        destination: "/copy-text-from-phone-to-computer",
        permanent: true,
      },
      {
        source: "/blog/go-online-tools-clipboard-not-working-free-alternatives",
        destination: "/blog/go-online-tools-clipboard-alternative",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.convex.cloud https://analyticsos-ten.vercel.app; connect-src 'self' https://*.convex.cloud wss://*.convex.cloud https://mailservice-five.vercel.app https://vitals.vercel-insights.com https://analyticsos-ten.vercel.app; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://api.qrserver.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
