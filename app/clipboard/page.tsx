import type { Metadata } from "next";
import Link from "next/link";
import InlineClipboardEmbed from "../../components/InlineClipboardEmbed";

export const metadata: Metadata = {
  title: "Free Online Clipboard — Copy Text Between Phone & PC Instantly",
  description:
    "Free online clipboard — copy text on your phone and paste on your PC in under 100ms. No login, no app download, zero logs. Works on Android, iOS, Windows, Mac & Linux.",
  keywords: [
    "online clipboard",
    "free online clipboard",
    "clipboard online",
    "copy paste online",
    "share clipboard online",
    "copy text from phone to pc",
    "clipboard sync between devices",
    "cross device clipboard",
    "clipboard sharing tool",
    "realtime clipboard online",
    "syncclip",
    "free clipboard sync no account",
  ],
  alternates: {
    canonical: "https://syncclip.in/clipboard",
    languages: {
      "en-US": "https://syncclip.in/clipboard",
      "en-IN": "https://syncclip.in/clipboard",
      "en-NP": "https://syncclip.in/clipboard",
      "en-PK": "https://syncclip.in/clipboard",
      "x-default": "https://syncclip.in/clipboard",
    },
  },
  openGraph: {
    title: "Free Online Clipboard — Copy Text Between Phone & PC Instantly",
    description:
      "Free online clipboard — copy text on your phone and paste on your PC in under 100ms. No login, no app download, zero logs.",
    url: "https://syncclip.in/clipboard",
    siteName: "SyncClip",
    images: [
      {
        url: "https://syncclip.in/assets/og-image.png?v=3",
        width: 1200,
        height: 630,
        alt: "Free Online Clipboard — SyncClip Instant Sync",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Clipboard — Copy Text Between Phone & PC Instantly",
    description:
      "Free online clipboard — copy text on your phone and paste on your PC in under 100ms. No login, no app download, zero logs.",
    images: ["https://syncclip.in/assets/og-image.png?v=3"],
  },
};

export default function ClipboardPage() {
  const faqItems = [
    {
      name: "What is an online clipboard?",
      acceptedAnswer: {
        text: "An online clipboard is a browser-based utility that transfers text, links, and code snippets between devices in real time via secure WebSockets. SyncClip operates with under 100ms sync latency, requires zero account login or app installation, and automatically purges all data after 24 hours.",
      },
    },
    {
      name: "How do I use an online clipboard to copy text between devices?",
      acceptedAnswer: {
        text: "Open syncclip.in/clipboard on your first device, type or paste your text to generate a 6-character room code, and open syncclip.in/[code] (or scan the QR code) on your other device. The text syncs instantly across both screens.",
      },
    },
    {
      name: "Can I copy text from phone to PC without installing an app?",
      acceptedAnswer: {
        text: "Yes. SyncClip works 100% in your web browser (Chrome, Safari, Edge, Firefox). You do not need to download Android apps, Windows software, browser extensions, or pair cables.",
      },
    },
    {
      name: "Can I use an online clipboard without creating an account or logging in?",
      acceptedAnswer: {
        text: "Yes. SyncClip requires zero signup, zero email, and zero passwords. Sessions are identified by ephemeral 6-character room keys that auto-delete after 24 hours.",
      },
    },
    {
      name: "How do I copy text from Android to Windows PC?",
      acceptedAnswer: {
        text: "Open SyncClip on your Android phone, type or paste your text, and note the 6-character session code. Open the same link on your Windows PC browser, and your clipboard text is ready to copy with one click.",
      },
    },
    {
      name: "Does this online clipboard work on iPhone and Mac?",
      acceptedAnswer: {
        text: "Yes. SyncClip is operating system agnostic and works seamlessly between iOS (Safari/Chrome), macOS, Android, Windows, and Linux without Apple ID or ecosystem restrictions.",
      },
    },
    {
      name: "Is online clipboard sharing safe and encrypted?",
      acceptedAnswer: {
        text: "Yes. All data in transit is encrypted using SSL/TLS 1.3 over secure WebSockets (WSS). Data is stored ephemerally in active memory and auto-purged after 24 hours with zero permanent logging.",
      },
    },
    {
      name: "What is Burn After Reading mode?",
      acceptedAnswer: {
        text: "Burn After Reading is an extra privacy mode in SyncClip. When enabled, your text and clipboard session are permanently destroyed 5 seconds after a connected device reads it.",
      },
    },
    {
      name: "How long does clipboard data stay online?",
      acceptedAnswer: {
        text: "All SyncClip clipboard sessions automatically expire and hard-purge after 24 hours of inactivity. You can also manually wipe the room at any moment using the 'Clear Node' button.",
      },
    },
    {
      name: "Can I send passwords or 2FA OTP codes securely?",
      acceptedAnswer: {
        text: "Yes. Many users transfer 2FA codes and temporary credentials between phone and PC. For maximum security, enable 'Burn After Reading' so the OTP is wiped immediately after copying.",
      },
    },
    {
      name: "Can I share code snippets and formatting with this clipboard?",
      acceptedAnswer: {
        text: "Yes. SyncClip preserves exact indentation, line breaks, special characters, JSON payloads, Bash commands, and code formatting without character corruption.",
      },
    },
    {
      name: "Does it work across different Wi-Fi networks and mobile hotspots?",
      acceptedAnswer: {
        text: "Yes. Unlike Apple AirDrop or local LAN sharing tools, SyncClip connects over the cloud via WebSockets. Your phone can be on 5G mobile data while your PC is on corporate Ethernet.",
      },
    },
    {
      name: "What is the maximum text size I can sync?",
      acceptedAnswer: {
        text: "SyncClip supports up to 100KB of raw text per payload, which is equivalent to over 15,000 words or entire source code files in a single copy-paste operation.",
      },
    },
    {
      name: "Can multiple devices connect to the same clipboard room?",
      acceptedAnswer: {
        text: "Yes. You can connect 2, 5, or 10+ devices simultaneously to the same session code. All participants see real-time updates instantly as edits are typed.",
      },
    },
    {
      name: "What makes SyncClip different from Apple Universal Clipboard or Microsoft Phone Link?",
      acceptedAnswer: {
        text: "Apple Universal Clipboard only works between Apple hardware logged into the same Apple ID. Phone Link requires Bluetooth pairing, Microsoft accounts, and background software. SyncClip works across all brands instantly via the browser with zero login.",
      },
    },
    {
      name: "Is this online clipboard 100% free forever?",
      acceptedAnswer: {
        text: "Yes. SyncClip is 100% free with no subscription, no credit card required, and no intrusive banner ads.",
      },
    },
  ];

  const unifiedGraphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://syncclip.in/clipboard#webapp",
        "name": "SyncClip — Free Online Clipboard",
        "alternateName": [
          "Online Clipboard",
          "Free Clipboard Tool",
          "Clipboard Sharing App",
          "Clipboard Sync",
          "Real-Time Clipboard",
        ],
        "url": "https://syncclip.in/clipboard",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All (Android, iOS, Windows, Mac, Linux)",
        "browserRequirements": "Requires JavaScript. Works on Chrome, Firefox, Safari, Edge.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "847",
          "bestRating": "5",
          "worstRating": "1",
        },
        "description": "Free online clipboard used 124,000+ times to copy and paste text between phone, laptop, and tablet in under 100ms. No login, no app install.",
        "publisher": { "@id": "https://syncclip.in/#organization" },
      },
      {
        "@type": "Organization",
        "@id": "https://syncclip.in/#organization",
        "name": "SyncClip",
        "url": "https://syncclip.in",
        "logo": "https://syncclip.in/assets/og-image.png?v=3",
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://syncclip.in/clipboard#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://syncclip.in",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Online Clipboard",
            "item": "https://syncclip.in/clipboard",
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": "https://syncclip.in/clipboard#howto",
        "name": "How to use a free online clipboard to sync text between devices",
        "description": "Use SyncClip to copy text on one device and instantly paste it on another — no app, no login.",
        "totalTime": "PT30S",
        "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
        "step": [
          {
            "@type": "HowToStep",
            "name": "Open the online clipboard",
            "text": "Go to syncclip.in/clipboard on your first device. A live clipboard is ready immediately.",
            "url": "https://syncclip.in/clipboard",
          },
          {
            "@type": "HowToStep",
            "name": "Type your text",
            "text": "Type or paste any text into the clipboard area. A unique 6-character session code is instantly generated.",
          },
          {
            "@type": "HowToStep",
            "name": "Share the code",
            "text": "Copy the session code and open syncclip.in/[code] on your second device — or scan the QR code. Text syncs in under 100ms.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://syncclip.in/clipboard#faq",
        "mainEntity": faqItems.map((item) => ({
          "@type": "Question",
          "name": item.name,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.acceptedAnswer.text,
          },
        })),
      },
    ],
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(unifiedGraphSchema) }}
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

      <main className="pt-16 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">

          {/* ─── TOOL-FIRST HERO ─────────────────────────────────── */}
          <div className="mb-4 font-mono text-[10px] tracking-[0.3em] text-secondary uppercase">
            Free Clipboard Tool // No Login Required
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-6">
            FREE ONLINE CLIPBOARD_
          </h1>
          <p className="font-body text-lg md:text-xl leading-relaxed text-zinc-600 max-w-3xl mb-8">
            An <strong>online clipboard</strong> that works. Type below — your
            text gets a session code instantly. Share it with any device to
            sync in under 100ms. <strong>No login. No app. Zero setup.</strong>
          </p>

          {/* ─── LIVE CLIPBOARD EMBED ────────────────────────────── */}
          <div id="live-clipboard" className="mb-6">
            <InlineClipboardEmbed />
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-4 font-mono text-[9px] tracking-widest uppercase text-zinc-500 mb-16 border-b-2 border-black pb-8">
            <span>✓ Free forever</span>
            <span>·</span>
            <span>✓ No account</span>
            <span>·</span>
            <span>✓ Auto-deletes in 24h</span>
            <span>·</span>
            <span>✓ Works on every OS</span>
            <span>·</span>
            <span>✓ 124,821+ syncs</span>
          </div>

          {/* ─── AEO DEFINITION BLOCK (AI-citeable) ─────────────── */}
          <div className="bg-zinc-900 text-white p-8 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">
              What is an online clipboard? // Quick Answer
            </div>
            <p className="font-body text-lg md:text-2xl leading-relaxed italic">
              An <strong>online clipboard</strong> is a browser-based tool that
              lets you copy text on one device and paste it on another in real
              time — without installing an app or creating an account. SyncClip
              uses secure WebSocket connections to sync your clipboard across
              Android, iOS, Windows, Mac, and Linux in under 100ms.
            </p>
          </div>

          {/* ─── KNOWLEDGE HUB DIRECTORY (Pillar Wiring) ────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            <Link
              href="/blog/what-is-a-live-clipboard"
              className="bg-black text-white p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-black transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Live Clipboard_
            </Link>
            <Link
              href="/blog/is-online-clipboard-secure"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Security Audit_
            </Link>
            <Link
              href="/copy-text-from-phone-to-computer"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Phone to PC_
            </Link>
            <Link
              href="/blog/5-ways-to-copy-text-between-phone-and-laptop"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              5-Ways Guide_
            </Link>
            <Link
              href="/pushbullet-alternative"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Pushbullet Alt_
            </Link>
            <Link
              href="/blog/best-online-clipboard-tools-2026"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Best Tools 2026_
            </Link>
            <Link
              href="/blog/online-clipboard-vs-cloud-notes"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Notes vs Sync_
            </Link>
            <Link
              href="/blog/clipboard-sync-for-remote-teams"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Remote Teams_
            </Link>
            <Link
              href="/blog/online-clipboard-vs-desktop-apps"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Apps vs Web_
            </Link>
            <Link
              href="/blog/syncclip-vs-universal-clipboard"
              className="bg-white text-black p-6 font-mono text-[10px] uppercase tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black flex items-center justify-center text-center"
            >
              Ecosystems_
            </Link>
          </div>

          {/* ─── DEVICE PAIRING QUICK MATRIX (pSEO Hub) ───────── */}
          <div className="border-2 border-black bg-zinc-50 p-8 mb-16 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="font-mono text-[10px] tracking-[0.25em] text-secondary uppercase font-bold mb-4">
              Device Pairing Hub // Select Your Setup
            </div>
            <h2 className="font-headline text-2xl md:text-3xl font-black uppercase mb-6">
              Instant Sync for Any Two Devices:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
              <Link
                href="/android-to-windows"
                className="bg-white border-2 border-black p-4 hover:bg-black hover:text-white transition-all flex items-center justify-between group"
              >
                <span>📱 Android ➔ 💻 Windows PC</span>
                <span className="text-secondary group-hover:text-white font-bold">➔</span>
              </Link>
              <Link
                href="/iphone-to-windows-clipboard"
                className="bg-white border-2 border-black p-4 hover:bg-black hover:text-white transition-all flex items-center justify-between group"
              >
                <span>🍏 iPhone ➔ 💻 Windows PC</span>
                <span className="text-secondary group-hover:text-white font-bold">➔</span>
              </Link>
              <Link
                href="/mac-to-windows-clipboard"
                className="bg-white border-2 border-black p-4 hover:bg-black hover:text-white transition-all flex items-center justify-between group"
              >
                <span>🍏 Mac ➔ 💻 Windows PC</span>
                <span className="text-secondary group-hover:text-white font-bold">➔</span>
              </Link>
              <Link
                href="/copy-text-from-phone-to-computer"
                className="bg-white border-2 border-black p-4 hover:bg-black hover:text-white transition-all flex items-center justify-between group"
              >
                <span>📱 Phone ➔ 🖥️ Desktop PC</span>
                <span className="text-secondary group-hover:text-white font-bold">➔</span>
              </Link>
              <Link
                href="/send-text-mobile-to-laptop"
                className="bg-white border-2 border-black p-4 hover:bg-black hover:text-white transition-all flex items-center justify-between group"
              >
                <span>📲 Mobile ➔ 💻 Any Laptop</span>
                <span className="text-secondary group-hover:text-white font-bold">➔</span>
              </Link>
              <Link
                href="/airdrop-for-windows-and-android"
                className="bg-white border-2 border-black p-4 hover:bg-black hover:text-white transition-all flex items-center justify-between group"
              >
                <span>⚡ AirDrop for Win &amp; Android</span>
                <span className="text-secondary group-hover:text-white font-bold">➔</span>
              </Link>
            </div>
          </div>

          {/* Secondary CTA — scrolls back up to the embed */}
          <a
            href="#live-clipboard"
            className="inline-block bg-black text-white font-mono font-black py-4 px-10 hover:bg-secondary transition-colors uppercase tracking-widest text-base shadow-[6px_6px_0px_0px_rgba(5,125,188,1)] mb-20"
          >
            ↑ Use the Clipboard Above ⚡
          </a>

          {/* SECTION: WHAT IS AN ONLINE CLIPBOARD */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">
              What is an Online Clipboard?
            </h2>
            <div className="grid md:grid-cols-2 gap-10 font-body text-base text-zinc-700 leading-relaxed">
              <div>
                <p className="mb-6">
                  An <strong>online clipboard</strong> is a web-based tool that
                  allows you to copy text, code snippets, URLs, or any string of
                  data on one device and instantly paste it on another. Unlike
                  your device&apos;s built-in clipboard (which only works
                  locally), an online clipboard bridges the gap between
                  different operating systems and devices.
                </p>
                <p>
                  Traditional clipboard tools require app installations, account
                  signups, or are locked to specific ecosystems (like
                  Apple&apos;s Universal Clipboard). A modern{" "}
                  <strong>clipboard sharing tool</strong> like SyncClip
                  eliminates all of that friction.
                </p>
              </div>
              <div className="bg-zinc-100 p-8 border-2 border-black">
                <h3 className="font-headline font-black uppercase text-lg mb-4">
                  Use Cases for Online Clipboard:
                </h3>
                <ul className="space-y-3 text-sm text-zinc-600">
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">→</span>{" "}
                    <strong>Copy paste between phone and PC</strong> without
                    emailing yourself
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">→</span> Share{" "}
                    <strong>clipboard online</strong> with another person
                    instantly
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">→</span>{" "}
                    <strong>Sync clipboard between devices</strong> across
                    different operating systems
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">→</span> Move 2FA
                    codes from phone to desktop browser
                  </li>
                  <li className="flex gap-2">
                    <span className="text-secondary font-bold">→</span> Transfer
                    code snippets between IDE and mobile
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION: HOW TO USE */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              How to Use This Free Clipboard
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-mono text-4xl font-black text-secondary">
                  01
                </span>
                <h3 className="font-headline font-black uppercase text-xl my-4">
                  Open Clipboard
                </h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  Go to{" "}
                  <Link href="/" className="text-secondary underline">
                    syncclip.in
                  </Link>{" "}
                  on your first device. Click &quot;Create Session&quot; to
                  start a new clipboard session.
                </p>
              </div>
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(5,125,188,1)]">
                <span className="font-mono text-4xl font-black text-secondary">
                  02
                </span>
                <h3 className="font-headline font-black uppercase text-xl my-4">
                  Connect Devices
                </h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  Enter the 6-character code on your second device, or scan the
                  QR code. Both devices are now connected to the same clipboard.
                </p>
              </div>
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-mono text-4xl font-black text-secondary">
                  03
                </span>
                <h3 className="font-headline font-black uppercase text-xl my-4">
                  Copy &amp; Paste
                </h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  Paste text on one device. It appears on the other instantly.
                  Use the &quot;Copy&quot; button to grab it to your local
                  clipboard.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION: WHY THIS CLIPBOARD IS DIFFERENT */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">
              Why This Clipboard Tool is Different
            </h2>
            <div className="space-y-6 font-body text-base text-zinc-700 leading-relaxed max-w-3xl">
              <p>
                Most <strong>clipboard sharing tools</strong> require you to
                download an app, create an account, or pay for a subscription.
                SyncClip is different because it runs entirely in your browser.
              </p>
              <p>
                Need an <strong>online clipboard</strong> for a quick copy paste
                between your Android phone and Windows laptop? Just open the
                URL. No Google login. No Play Store download. No permissions.
                Your clipboard data is encrypted in transit and automatically
                deleted after 24 hours.
              </p>
              <p>
                Whether you search for &quot;<strong>clipboard online</strong>
                &quot;, &quot;<strong>free clipboard tool</strong>&quot;, or
                &quot;<strong>share clipboard online</strong>&quot; — SyncClip
                is the answer. It works on every browser, every OS, every
                device.
              </p>
            </div>
          </section>

          {/* SECTION: COMPARISON TABLE */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              SyncClip vs. Legacy Tools (2026 Specs)
            </h2>
            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full text-left border-collapse font-mono text-xs md:text-sm">
                <thead>
                  <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-wider">
                    <th className="p-4 border-r border-zinc-800 font-bold">
                      Feature Metric
                    </th>
                    <th className="p-4 border-r border-zinc-800 text-secondary font-bold">
                      SyncClip (2026 Protocol)
                    </th>
                    <th className="p-4 border-r border-zinc-800 font-bold">
                      Legacy Tools (Email/Slack/Pushbullet)
                    </th>
                    <th className="p-4 font-bold">
                      Universal Clipboard (Apple)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black">
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">
                      Synchronization Latency
                    </td>
                    <td className="p-4 border-r border-black text-emerald-600 font-bold">
                      &lt;100ms (WebSocket tunnel)
                    </td>
                    <td className="p-4 border-r border-black">
                      30s+ (SMTP / Cloud polling)
                    </td>
                    <td className="p-4">1s - 5s (Bluetooth/Local network)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">
                      Authentication Barrier
                    </td>
                    <td className="p-4 border-r border-black text-secondary font-bold">
                      Zero Login (Anonymous pairing)
                    </td>
                    <td className="p-4 border-r border-black">
                      Mandatory Login (OAuth)
                    </td>
                    <td className="p-4">Mandatory iCloud Login</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">
                      Data Sovereignty
                    </td>
                    <td className="p-4 border-r border-black text-secondary font-bold">
                      24hr Auto-Purge &amp; Burn Mode
                    </td>
                    <td className="p-4 border-r border-black">
                      Permanent database logs
                    </td>
                    <td className="p-4">Transient local cache</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">
                      Ecosystem Locking
                    </td>
                    <td className="p-4 border-r border-black text-secondary font-bold">
                      100% OS Agnostic (Browser-native)
                    </td>
                    <td className="p-4 border-r border-black">
                      App-locked (Android/Win)
                    </td>
                    <td className="p-4">Ecosystem-locked (Apple Only)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">
                      Price &amp; Ad Pollution
                    </td>
                    <td className="p-4 border-r border-black text-emerald-600 font-bold">
                      FREE (No ads, 100% clean UI)
                    </td>
                    <td className="p-4 border-r border-black">
                      $4.99/mo / Heavy display ads
                    </td>
                    <td className="p-4">Free (Bundled with hardware)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              Clipboard FAQ
            </h2>
            <div className="space-y-8">
              {faqItems.map((faq, index) => (
                <div key={index} className="border-b border-zinc-200 pb-8">
                  <h3 className="font-headline text-xl font-black uppercase mb-4">
                    {faq.name}
                  </h3>
                  <p className="font-body text-base text-zinc-600 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-black text-white p-12 text-center">
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase mb-6 italic">
              Start Using This Clipboard_
            </h2>
            <p className="font-mono text-sm tracking-widest mb-10 text-zinc-400">
              FREE · NO LOGIN · NO APP · INSTANT SYNC
            </p>
            <Link
              href="/?src=clipboard_cta"
              className="inline-block bg-secondary text-black font-mono font-black py-4 px-10 hover:bg-white transition-colors uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
            >
              Create My Clipboard Now ⚡
            </Link>
          </section>
        </article>
      </main>

      {/* FOOTER */}
      <footer
        className="w-full border-t-2 border-black bg-white"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // ONLINE CLIPBOARD // FREE
            TOOL
          </div>
          <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
            <Link
              href="/"
              className="text-zinc-500 hover:text-secondary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/clipboard"
              className="text-zinc-500 hover:text-secondary transition-colors"
            >
              Online Clipboard
            </Link>
            <Link
              href="/clipboard-sync-guide"
              className="text-zinc-500 hover:text-secondary transition-colors"
            >
              Guide
            </Link>
            <Link
              href="/privacy"
              className="text-zinc-500 hover:text-secondary transition-colors"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
