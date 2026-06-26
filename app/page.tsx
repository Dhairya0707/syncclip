import type { Metadata } from "next";
import HomeClient from "../components/HomeClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://syncclip.in"),
  title: "SyncClip — Free Online Clipboard (Sync Instantly, No App, No Login)",
  description: "Copy text on your phone → paste on PC in milliseconds. No signup, no installation, no logs. Works on Android, iOS, Windows, Mac, Linux.",
  alternates: {
    canonical: "https://syncclip.in",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SyncClip",
  "alternateName": ["Online Clipboard", "Free Clipboard Sync", "SyncClip Clipboard"],
  "url": "https://syncclip.in",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Works on Chrome, Firefox, Safari, Edge.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "847",
    "bestRating": "5",
    "worstRating": "1"
  },
  "description": "SyncClip is a free online clipboard that syncs text between any devices in under 100ms. No login, no app, no tracking. Works on Android, iOS, Windows, Mac and Linux."
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SyncClip",
  "url": "https://syncclip.in",
  "logo": "https://syncclip.in/icon.png",
  "sameAs": [
    "https://dev.to/dhairya",
    "https://peerlist.io"
  ],
  "description": "SyncClip builds free, open, privacy-first clipboard sync tools for developers and everyday users."
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <HomeClient />
    </>
  );
}

