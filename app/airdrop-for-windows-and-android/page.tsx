import type { Metadata } from "next";
import Link from "next/link";
import InlineClipboardEmbed from "../../components/InlineClipboardEmbed";

export const metadata: Metadata = {
  title: "AirDrop for Windows & Android — Instant Text Sync (No App)",
  description:
    "The fastest AirDrop alternative for Windows and Android. Copy text, links, and code snippets across any device in under 100ms. No app, no account, 100% free.",
  keywords: [
    "airdrop for windows and android",
    "airdrop for windows",
    "airdrop alternative for pc",
    "airdrop android to pc",
    "cross platform airdrop text",
    "airdrop without apple id",
    "online clipboard airdrop alternative",
  ],
  alternates: {
    canonical: "https://syncclip.in/airdrop-for-windows-and-android",
    languages: {
      "en-US": "https://syncclip.in/airdrop-for-windows-and-android",
      "en-IN": "https://syncclip.in/airdrop-for-windows-and-android",
      "en-NP": "https://syncclip.in/airdrop-for-windows-and-android",
      "en-PK": "https://syncclip.in/airdrop-for-windows-and-android",
      "x-default": "https://syncclip.in/airdrop-for-windows-and-android",
    },
  },
  openGraph: {
    title: "AirDrop for Windows & Android — Instant Text Sync (No App)",
    description:
      "The fastest AirDrop alternative for Windows and Android. Copy text, links, and code snippets across any device in under 100ms.",
    url: "https://syncclip.in/airdrop-for-windows-and-android",
    siteName: "SyncClip",
    images: [
      {
        url: "https://syncclip.in/assets/og-image.png?v=3",
        width: 1200,
        height: 630,
        alt: "AirDrop for Windows and Android — SyncClip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AirDrop for Windows & Android — Instant Text Sync (No App)",
    description:
      "The fastest AirDrop alternative for Windows and Android. Copy text, links, and code snippets across any device in under 100ms.",
    images: ["https://syncclip.in/assets/og-image.png?v=3"],
  },
};

export default function AirDropAlternativePage() {
  const faqItems = [
    {
      name: "Is there an AirDrop for Windows and Android?",
      acceptedAnswer: {
        text: "While Apple does not make AirDrop for Windows or Android, SyncClip provides a browser-based AirDrop alternative. It enables instant, real-time text and link synchronization between Android phones, Windows PCs, iPhones, and Macs with no software to install.",
      },
    },
    {
      name: "Do devices need to be on the same Wi-Fi or Bluetooth range?",
      acceptedAnswer: {
        text: "No. Unlike Apple AirDrop which requires nearby Bluetooth and same-network Wi-Fi discovery, SyncClip connects globally via cloud WebSockets. Your phone can be on 5G cellular while your PC is on office Wi-Fi.",
      },
    },
    {
      name: "How fast is SyncClip compared to AirDrop?",
      acceptedAnswer: {
        text: "SyncClip synchronizes text payloads in under 100ms. Because it eliminates the 5-10 second device discovery phase of AirDrop/Bluetooth, transferring text snippets via SyncClip is often faster.",
      },
    },
    {
      name: "Is SyncClip free with no ads?",
      acceptedAnswer: {
        text: "Yes. SyncClip is 100% free with zero ads, zero subscriptions, and zero signups required.",
      },
    },
  ];

  const unifiedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": "https://syncclip.in/airdrop-for-windows-and-android#howto",
        "name": "How to AirDrop text between Windows and Android",
        "description": "Use SyncClip to transfer text across Windows and Android devices without installing apps.",
        "totalTime": "PT15S",
        "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
        "step": [
          {
            "@type": "HowToStep",
            "name": "Open the live clipboard",
            "text": "Go to syncclip.in/airdrop-for-windows-and-android on your Android or Windows device.",
            "url": "https://syncclip.in/clipboard",
          },
          {
            "@type": "HowToStep",
            "name": "Type or paste your text",
            "text": "Paste your text or link to generate a 6-character session room code.",
          },
          {
            "@type": "HowToStep",
            "name": "Open on the receiving device",
            "text": "Open syncclip.in/[code] on the receiving device to grab the text instantly.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://syncclip.in/airdrop-for-windows-and-android#faq",
        "mainEntity": faqItems.map((item) => ({
          "@type": "Question",
          "name": item.name,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.acceptedAnswer.text,
          },
        })),
      },
      {
        "@type": "WebApplication",
        "@id": "https://syncclip.in/airdrop-for-windows-and-android#webapp",
        "name": "SyncClip Cross-Platform AirDrop Alternative",
        "url": "https://syncclip.in/airdrop-for-windows-and-android",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Android, Windows, iOS, macOS, Linux",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      },
    ],
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(unifiedSchema) }}
      />

      {/* NAV */}
      <header
        className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6"
        role="banner"
      >
        <Link
          href="/"
          className="font-serif italic font-black text-white hover:text-secondary transition-colors"
        >
          SYNCCLIP
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/clipboard"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            ONLINE CLIPBOARD
          </Link>
          <Link
            href="/clipboard-sync-guide"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            GUIDE
          </Link>
        </nav>
      </header>

      <main className="pt-20 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">
              Cross-Platform Protocol // AirDrop Alternative
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-6">
              AIRDROP FOR WINDOWS &amp; ANDROID_
            </h1>
            <p className="font-body text-lg md:text-xl leading-relaxed text-zinc-600 max-w-3xl mb-8">
              AirDrop is locked to Apple hardware. SyncClip is the open, browser-native <strong>AirDrop for Windows &amp; Android</strong>. Copy on one device, paste on another in milliseconds. No apps, no accounts, no ecosystem walls.
            </p>
          </div>

          {/* LIVE TOOL EMBED */}
          <div id="live-clipboard" className="mb-12">
            <InlineClipboardEmbed />
          </div>

          {/* QUICK ANSWER AEO BOX */}
          <div className="bg-zinc-900 text-white p-8 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-3">
              Quick Answer // AirDrop for Windows &amp; Android
            </div>
            <p className="font-body text-lg md:text-xl leading-relaxed italic text-zinc-200">
              The fastest way to AirDrop text between Windows and Android is with <strong>SyncClip</strong>. Open syncclip.in on both devices, connect via the 6-character room code or QR code, and your clipboard synchronizes over WebSockets in under 100ms.
            </p>
          </div>

          {/* COMPARISON MATRIX */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">
              SyncClip vs. Apple AirDrop vs. Quick Share
            </h2>
            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full text-left border-collapse font-mono text-xs md:text-sm">
                <thead>
                  <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-wider">
                    <th className="p-4 border-r border-zinc-800">Feature</th>
                    <th className="p-4 border-r border-zinc-800 text-secondary">SyncClip</th>
                    <th className="p-4 border-r border-zinc-800">Apple AirDrop</th>
                    <th className="p-4">Google Quick Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black">
                  <tr className="bg-emerald-50">
                    <td className="p-4 font-bold border-r border-black">OS Compatibility</td>
                    <td className="p-4 border-r border-black font-bold text-emerald-800">Android, Windows, iOS, Mac, Linux</td>
                    <td className="p-4 border-r border-black text-zinc-600">Apple Only (iOS/macOS)</td>
                    <td className="p-4 text-zinc-600">Android &amp; Windows (Requires App)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black">Software Install</td>
                    <td className="p-4 border-r border-black font-bold text-secondary">Zero (100% Web-based)</td>
                    <td className="p-4 border-r border-black text-zinc-600">Built-in OS</td>
                    <td className="p-4 text-zinc-600">Windows app download required</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black">Network Requirement</td>
                    <td className="p-4 border-r border-black font-bold text-secondary">Any Internet / 5G / Wi-Fi</td>
                    <td className="p-4 border-r border-black text-zinc-600">Same Wi-Fi + Bluetooth range</td>
                    <td className="p-4 text-zinc-600">Bluetooth + Wi-Fi Direct</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black">Account Required</td>
                    <td className="p-4 border-r border-black font-bold text-secondary">No Account (Zero Login)</td>
                    <td className="p-4 border-r border-black text-zinc-600">Apple ID</td>
                    <td className="p-4 text-zinc-600">Google Account optional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              AirDrop for Windows &amp; Android FAQ
            </h2>
            <div className="space-y-8">
              {faqItems.map((faq, idx) => (
                <div key={idx} className="border-b border-zinc-200 pb-8">
                  <h3 className="font-headline text-xl font-black uppercase mb-3">{faq.name}</h3>
                  <p className="font-body text-base text-zinc-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INTERNAL WORKFLOWS */}
          <div className="border-2 border-black bg-zinc-100 p-8 mb-16">
            <div className="font-mono text-[10px] tracking-widest uppercase text-secondary font-bold mb-4">Explore More Device Bridges</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <Link href="/clipboard" className="bg-white border border-black p-3 hover:bg-black hover:text-white transition-colors text-center">
                Online Clipboard →
              </Link>
              <Link href="/iphone-to-windows-clipboard" className="bg-white border border-black p-3 hover:bg-black hover:text-white transition-colors text-center">
                iPhone to Windows →
              </Link>
              <Link href="/android-to-windows" className="bg-white border border-black p-3 hover:bg-black hover:text-white transition-colors text-center">
                Android to Windows →
              </Link>
              <Link href="/copy-text-from-phone-to-computer" className="bg-white border border-black p-3 hover:bg-black hover:text-white transition-colors text-center">
                Phone to PC →
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // AIRDROP FOR WINDOWS &amp; ANDROID
          </div>
          <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
            <Link href="/" className="text-zinc-500 hover:text-secondary transition-colors">Home</Link>
            <Link href="/clipboard" className="text-zinc-500 hover:text-secondary transition-colors">Online Clipboard</Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-secondary transition-colors">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
