import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.convex.cloud; connect-src 'self' https://*.convex.cloud wss://*.convex.cloud https://mailservice-five.vercel.app https://vitals.vercel-insights.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://api.qrserver.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
