import type { Metadata } from "next";
import HomeClient from "../components/HomeClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://syncclip.in"),
  title: "SyncClip — Free Online Clipboard (Sync Instantly, No App, No Login)",
  description: "SyncClip — copy text on your phone and paste on your PC in under 100ms. Free online clipboard, 124,821+ syncs. No signup, no installation, no logs. Android, iOS, Windows, Mac, Linux.",
  keywords: ["syncclip", "syncclip clipboard", "sync clip", "syncclip.in", "online clipboard", "free clipboard sync", "copy paste between devices"],
  alternates: {
    canonical: "https://syncclip.in",
    languages: {
      'en-US': "https://syncclip.in",
      'en-IN': "https://syncclip.in",
      'en-NP': "https://syncclip.in",
      'en-PK': "https://syncclip.in",
    },
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is SyncClip?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SyncClip is a free, browser-based online clipboard that syncs text between any devices in under 100ms. No app download, no account, and no permanent data storage. Open syncclip.in, create a session, and copy-paste across phone, laptop, and tablet instantly."
      }
    },
    {
      "@type": "Question",
      "name": "Is SyncClip free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SyncClip is 100% free with no hidden fees, no premium tier, and no ads. No account or credit card is required."
      }
    },
    {
      "@type": "Question",
      "name": "What is an online clipboard?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "An online clipboard is a web-based tool that lets you copy and paste text, links, or code between devices without installing software. SyncClip is a free online clipboard that syncs in real time via WebSockets across Android, iOS, Windows, Mac, and Linux."
      }
    },
    {
      "@type": "Question",
      "name": "How do I copy text between devices instantly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Open SyncClip on both devices, create or join the same 6-character session code, and paste text on one device — it appears on the other in under 100ms. No login or app install required."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a way to sync clipboard without login?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. SyncClip uses ephemeral session IDs instead of user accounts. You get instant cross-device sync with zero signup, zero OAuth, and sessions that auto-delete after 24 hours."
      }
    },
    {
      "@type": "Question",
      "name": "How to share clipboard online securely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use a tool with HTTPS encryption and auto-purge. SyncClip encrypts all data in transit, deletes sessions after 24 hours, and offers Burn After Reading mode to wipe data immediately after it is accessed."
      }
    }
  ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient />
    </>
  );
}

