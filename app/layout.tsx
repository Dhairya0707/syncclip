import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";
import ConvexClientProvider from "./ConvexClientProvider";

export const metadata: Metadata = {
  metadataBase: new URL('https://syncclip.in'),
  title: {
    default: "Online Clipboard — Sync Clipboard Between Devices | SyncClip",
    template: "%s | SyncClip"
  },
  description: "Use SyncClip as an online clipboard to instantly copy and paste text between devices. No login, no tracking, just fast clipboard sharing.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "SyncClip | Universal Clipboard",
    description: "Instantly sync text and code between your phone, tablet, and desktop without logging in.",
    url: "https://syncclip.in",
    siteName: "SyncClip",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SyncClip Workflow Mockup",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SyncClip | Universal Clipboard",
    description: "Instantly sync text and code between your phone, tablet, and desktop without logging in.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://syncclip.in",
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
