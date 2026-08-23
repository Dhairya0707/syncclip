import type { Metadata } from "next";
import HomeClient from "../components/HomeClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://syncclip.in"),
  title: "SyncClip — Instant Cross-Device Clipboard & Text Sync (No Login)",
  description: "Copy text on your phone and paste on PC or Mac in under 100ms. Free instant cross-device clipboard with zero login, no app install, and automatic 24-hour purge.",
  keywords: ["cross device clipboard", "syncclip", "sync clipboard between devices", "copy text from phone to pc", "paste text between devices", "realtime clipboard", "online clipboard", "clipboard sync"],
  alternates: {
    canonical: "https://syncclip.in",
    languages: {
      'en-US': "https://syncclip.in",
      'en-IN': "https://syncclip.in",
      'en-NP': "https://syncclip.in",
      'en-PK': "https://syncclip.in",
      'x-default': "https://syncclip.in",
    },
  },
  openGraph: {
    title: "SyncClip — Instant Cross-Device Clipboard & Text Sync (No Login)",
    description: "Copy text on your phone and paste on PC or Mac in under 100ms. Free instant cross-device clipboard with zero login, no app install, and automatic 24-hour purge.",
    url: "https://syncclip.in",
    siteName: "SyncClip",
    images: [
      {
        url: "https://syncclip.in/assets/og-image.png?v=3",
        width: 1200,
        height: 630,
        alt: "SyncClip — Instant Cross-Device Clipboard Sync",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SyncClip — Instant Cross-Device Clipboard & Text Sync (No Login)",
    description: "Copy text on your phone and paste on PC or Mac in under 100ms. Free instant cross-device clipboard with zero login, no app install, and automatic 24-hour purge.",
    images: ["https://syncclip.in/assets/og-image.png?v=3"],
  },
};

const homeSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://syncclip.in/#software",
      "name": "SyncClip Online Clipboard",
      "alternateName": [
        "Online Clipboard",
        "Free Online Clipboard",
        "Clipboard Online",
        "Realtime Clipboard",
        "SyncClip Clipboard",
        "Sync Clip"
      ],
      "url": "https://syncclip.in",
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All (Android, iOS, Windows, macOS, Linux)",
      "browserRequirements": "Requires JavaScript. Works on Chrome, Safari, Edge, Firefox.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "1247",
        "bestRating": "5",
        "worstRating": "1"
      },
      "featureList": [
        "Sub-100ms WebSocket synchronization",
        "Zero registration, signup, or login",
        "Self-destructing Burn After Reading mode",
        "Cross-platform OS agnostic clipboard",
        "Automatic 24-hour data auto-purge",
        "QR code instant phone-to-PC pairing"
      ],
      "description": "SyncClip is a free, instant online clipboard that syncs text and links between phone and PC in under 100ms. No login, no app install, no tracking."
    },
    {
      "@type": "Organization",
      "@id": "https://syncclip.in/#organization",
      "name": "SyncClip",
      "url": "https://syncclip.in",
      "logo": "https://syncclip.in/assets/og-image.png?v=3",
      "sameAs": [
        "https://github.com/Dhairya0707/syncclip",
        "https://dev.to/dhairya",
        "https://peerlist.io"
      ],
      "description": "SyncClip builds free, open, privacy-first clipboard sync tools for developers and everyday users."
    },
    {
      "@type": "HowTo",
      "@id": "https://syncclip.in/#howto",
      "name": "How to use an online clipboard to copy text between devices",
      "description": "Copy text on your phone or PC and paste it instantly on another device without any apps or accounts.",
      "totalTime": "PT15S",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Open SyncClip",
          "text": "Open syncclip.in on your first device and enter or paste your text to create a session."
        },
        {
          "@type": "HowToStep",
          "name": "Connect Second Device",
          "text": "Join the 6-character room code or scan the QR code from your second device."
        },
        {
          "@type": "HowToStep",
          "name": "Paste Instantly",
          "text": "Your clipboard text syncs in under 100ms, ready to copy and paste immediately."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://syncclip.in/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is an online clipboard?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An online clipboard is a browser-based utility that lets you copy and paste text, links, or code between devices without installing software. SyncClip is a free online clipboard that syncs in real time via WebSockets across Android, iOS, Windows, Mac, and Linux."
          }
        },
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
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchemaGraph) }}
      />
      <HomeClient />
    </>
  );
}

