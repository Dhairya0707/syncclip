import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import Script from "next/script";
import { ExperimentsProvider } from "@/utils/experiments";


export const metadata: Metadata = {
  metadataBase: new URL('https://syncclip.in'),
  title: {
    default: "SyncClip — Free Online Clipboard (Sync Instantly, No App, No Login)",
    template: "%s | SyncClip"
  },
  description: "Copy text on your phone → paste on PC in milliseconds. No signup, no installation, no logs. Works on Android, iOS, Windows, Mac, Linux.",
  keywords: ["syncclip", "syncclip clipboard", "sync clip", "syncclip.in", "online clipboard", "clipboard online", "copy paste between devices", "sync clipboard between devices", "share clipboard online", "clipboard sharing tool", "cross device clipboard", "paste text between devices", "copy text from phone to computer", "free clipboard sync", "clipboard sync android windows", "universal clipboard online no signup", "pushbullet alternative free"],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "SyncClip — Free Online Clipboard (Sync Instantly)",
    description: "Copy text on your phone → paste on PC in milliseconds. No signup, no installation, no logs. Works on Android, iOS, Windows, Mac, Linux.",
    url: "https://syncclip.in",
    siteName: "SyncClip — Online Clipboard",
    images: [
      {
        url: "https://syncclip.in/assets/og-image.png?v=3",
        width: 1200,
        height: 630,
        alt: "Online Clipboard — Copy Paste Between Devices",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SyncClip — Free Online Clipboard (Sync Instantly)",
    description: "Copy text on your phone → paste on PC in milliseconds. No signup, no installation, no logs.",
    images: ["https://syncclip.in/assets/og-image.png?v=3"],
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "https://syncclip.in/feed.xml",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

//testing

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Preconnect hints — resolve DNS/TLS early, parallel to page render */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Non-blocking async font load — media="print" trick prevents render-blocking */}
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />

        {/* Material Symbols — synchronously loaded so icons render immediately on first paint */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />

        <Script
          src="https://analyticsos-ten.vercel.app/script.js"
          data-website-id="1cb0d962-ee76-45cb-abcf-68ed51a2074f"
          strategy="afterInteractive"
        />

        {/* Global Unified Entity JSON-LD Schema Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://syncclip.in/#website",
                  "url": "https://syncclip.in",
                  "name": "SyncClip",
                  "alternateName": ["SyncClip Online Clipboard", "SyncClip.in", "SyncClip Realtime Clipboard"],
                  "description": "Copy text on your phone and paste on PC in milliseconds. Free online clipboard with zero login or setup.",
                  "publisher": { "@id": "https://syncclip.in/#organization" },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://syncclip.in/[code]"
                    },
                    "query-input": "required name=code"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://syncclip.in/#organization",
                  "name": "SyncClip",
                  "url": "https://syncclip.in",
                  "logo": "https://syncclip.in/assets/og-image.png?v=3",
                  "founder": { "@id": "https://syncclip.in/#person" },
                  "sameAs": [
                    "https://github.com/Dhairya0707/syncclip"
                  ]
                },
                {
                  "@type": "Person",
                  "@id": "https://syncclip.in/#person",
                  "name": "Dhairya Darji",
                  "url": "https://syncclip.in/about",
                  "jobTitle": "Creator & Lead Architect",
                  "worksFor": { "@id": "https://syncclip.in/#organization" }
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://syncclip.in/#software",
                  "name": "SyncClip",
                  "url": "https://syncclip.in",
                  "operatingSystem": "All (Web Browser Agnostic)",
                  "applicationCategory": "UtilitiesApplication",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "128"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-body selection:bg-secondary selection:text-white">
        <ConvexClientProvider>
          <ExperimentsProvider>
            {children}
            <Analytics />
          </ExperimentsProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
