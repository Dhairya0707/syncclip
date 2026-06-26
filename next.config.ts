import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization — auto WebP/AVIF, lazy loading, size optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.qrserver.com",
      },
      {
        protocol: "https",
        hostname: "api.producthunt.com",
      },
      {
        protocol: "https",
        hostname: "ph-files.imgix.net",
      },
    ],
  },

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
        // Security headers for all routes
        source: "/(.*)",
        headers: [
          // Existing CSP — kept exactly as-is
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.convex.cloud https://analyticsos-ten.vercel.app https://va.vercel-scripts.com; connect-src 'self' https://*.convex.cloud wss://*.convex.cloud https://mailservice-five.vercel.app https://vitals.vercel-insights.com https://analyticsos-ten.vercel.app; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://api.qrserver.com https://api.producthunt.com https://ph-files.imgix.net;",
          },
          // HSTS — force HTTPS for 1 year (fixes "Use a strong HSTS policy" audit)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Prevent clickjacking (fixes "Mitigate clickjacking with XFO or CSP" audit)
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Prevent MIME sniffing attacks
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Cross-Origin-Opener-Policy — using allow-popups so Convex/OAuth popups still work
          // (fixes "Ensure proper origin isolation with COOP" audit)
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          // Referrer policy — privacy-safe
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions policy — restrict unused browser APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
      {
        // Long-term caching for static assets (images, fonts, etc.)
        source: "/(.*)\\.(png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|otf|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

