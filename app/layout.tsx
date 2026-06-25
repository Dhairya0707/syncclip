import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL('https://syncclip.in'),
  title: {
    default: "SyncClip — Free Online Clipboard (Sync Instantly, No App, No Login)",
    template: "%s | SyncClip — Online Clipboard"
  },
  description: "Copy text on your phone → paste on PC in milliseconds. No signup, no installation, no logs. Works on Android, iOS, Windows, Mac, Linux.",
  keywords: ["online clipboard", "clipboard online", "copy paste between devices", "sync clipboard between devices", "share clipboard online", "clipboard sharing tool", "cross device clipboard", "paste text between devices", "copy text from phone to computer", "free clipboard sync", "clipboard sync android windows", "universal clipboard online no signup", "pushbullet alternative free"],
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
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://analyticsos-ten.vercel.app/script.js"
          data-website-id="1cb0d962-ee76-45cb-abcf-68ed51a2074f"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-body selection:bg-secondary selection:text-white">
        <ConvexClientProvider>
          {children}
          <Analytics />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
