import type { Metadata } from "next";
import Link from "next/link";
import InlineClipboardEmbed from "../../components/InlineClipboardEmbed";

export const metadata: Metadata = {
  title: "How to Copy Text from iPhone to Windows PC Instantly (No iTunes)",
  description:
    "Copy text on iPhone and paste on Windows PC in under 100ms. No iTunes, no iCloud login, no app installation. Free cross-platform online clipboard with instant QR pairing.",
  keywords: [
    "iphone to windows clipboard",
    "copy text from iphone to windows",
    "sync iphone clipboard to pc",
    "transfer text from iphone to windows without itunes",
    "ios to pc clipboard sync",
    "share clipboard iphone to windows",
    "online clipboard iphone windows",
  ],
  alternates: {
    canonical: "https://syncclip.in/iphone-to-windows-clipboard",
    languages: {
      "en-US": "https://syncclip.in/iphone-to-windows-clipboard",
      "en-IN": "https://syncclip.in/iphone-to-windows-clipboard",
      "en-NP": "https://syncclip.in/iphone-to-windows-clipboard",
      "en-PK": "https://syncclip.in/iphone-to-windows-clipboard",
      "x-default": "https://syncclip.in/iphone-to-windows-clipboard",
    },
  },
  openGraph: {
    title: "How to Copy Text from iPhone to Windows PC Instantly (No iTunes)",
    description:
      "Copy text on iPhone and paste on Windows PC in under 100ms. No iTunes, no iCloud login, no app installation.",
    url: "https://syncclip.in/iphone-to-windows-clipboard",
    siteName: "SyncClip",
    images: [
      {
        url: "https://syncclip.in/assets/og-image.png?v=3",
        width: 1200,
        height: 630,
        alt: "iPhone to Windows Clipboard Sync — SyncClip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Copy Text from iPhone to Windows PC Instantly (No iTunes)",
    description:
      "Copy text on iPhone and paste on Windows PC in under 100ms. No iTunes, no iCloud login, no app installation.",
    images: ["https://syncclip.in/assets/og-image.png?v=3"],
  },
};

export default function IphoneToWindowsPage() {
  const faqItems = [
    {
      name: "How do I copy text from iPhone to Windows PC without iTunes?",
      acceptedAnswer: {
        text: "Open Safari on your iPhone and go to syncclip.in/clipboard. Type or paste your text to generate a 6-character session code (or QR code). Open the same link in Edge or Chrome on your Windows PC — your text appears instantly.",
      },
    },
    {
      name: "Why doesn't Apple Universal Clipboard work with Windows?",
      acceptedAnswer: {
        text: "Apple Universal Clipboard is restricted to the Apple ecosystem (iPhone, Mac, iPad) signed in with the same Apple ID. It cannot communicate natively with Microsoft Windows. SyncClip bridges this gap using browser-based WebSockets across any OS.",
      },
    },
    {
      name: "Do I need to install any software on Windows or iOS?",
      acceptedAnswer: {
        text: "No. SyncClip requires zero app downloads, zero browser extensions, and zero setup. It runs entirely within standard web browsers (Safari, Chrome, Edge, Firefox).",
      },
    },
    {
      name: "Is it safe to transfer 2FA codes and passwords between iPhone and PC?",
      acceptedAnswer: {
        text: "Yes. SyncClip uses TLS 1.3 encryption in transit. For maximum privacy with sensitive credentials, activate Burn After Reading mode to automatically self-destruct the data after reading.",
      },
    },
  ];

  const unifiedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": "https://syncclip.in/iphone-to-windows-clipboard#howto",
        "name": "How to Copy Text from iPhone to Windows PC Instantly",
        "description": "Step-by-step guide to copying text from an iOS device (iPhone/iPad) to a Windows computer with zero setup.",
        "totalTime": "PT15S",
        "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
        "step": [
          {
            "@type": "HowToStep",
            "name": "Open SyncClip on iPhone",
            "text": "Open Safari or Chrome on your iPhone and navigate to syncclip.in/clipboard.",
            "url": "https://syncclip.in/clipboard",
          },
          {
            "@type": "HowToStep",
            "name": "Paste your text",
            "text": "Paste your text, code, or URL into the live clipboard area to generate a room code.",
          },
          {
            "@type": "HowToStep",
            "name": "Connect on Windows PC",
            "text": "Open your Windows browser and enter syncclip.in/[code] or scan the QR code with your iPhone camera. The text appears on your PC in under 100ms.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://syncclip.in/iphone-to-windows-clipboard#faq",
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
        "@id": "https://syncclip.in/iphone-to-windows-clipboard#webapp",
        "name": "SyncClip iPhone to Windows Clipboard Bridge",
        "url": "https://syncclip.in/iphone-to-windows-clipboard",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "iOS, Windows, macOS, Android, Linux",
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
              Cross-Ecosystem Bridge // iOS ➔ Windows
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-6">
              COPY TEXT FROM IPHONE TO WINDOWS PC_
            </h1>
            <p className="font-body text-lg md:text-xl leading-relaxed text-zinc-600 max-w-3xl mb-8">
              Apple&apos;s Universal Clipboard won&apos;t connect to Windows. Stop emailing yourself links or messaging your own WhatsApp. SyncClip creates an instant, encrypted real-time bridge between iOS and Windows in <strong>under 100ms</strong>.
            </p>
          </div>

          {/* LIVE TOOL EMBED */}
          <div id="live-clipboard" className="mb-12">
            <InlineClipboardEmbed />
          </div>

          {/* QUICK ANSWER AEO BOX */}
          <div className="bg-zinc-900 text-white p-8 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-3">
              Quick Answer // How to Sync iPhone to Windows
            </div>
            <p className="font-body text-lg md:text-xl leading-relaxed italic text-zinc-200">
              To copy text from iPhone to Windows PC: Open <strong>syncclip.in</strong> in Safari on your iPhone, paste your text to get a 6-character room code, and open the code in Chrome or Edge on Windows. Text syncs via WebSockets in under 100ms with zero login.
            </p>
          </div>

          {/* 3 STEPS GUIDE */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              3 Steps: iPhone to Windows Text Sync
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-mono text-4xl font-black text-secondary">01</span>
                <h3 className="font-headline font-black uppercase text-xl my-4">Open on iPhone</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  Open Safari on iPhone and paste your text or URL in the clipboard above. A 6-character code is generated.
                </p>
              </div>
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(5,125,188,1)]">
                <span className="font-mono text-4xl font-black text-secondary">02</span>
                <h3 className="font-headline font-black uppercase text-xl my-4">Scan or Type Code</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  On your Windows PC browser (Edge/Chrome/Firefox), open <Link href="/" className="text-secondary underline">syncclip.in</Link> and enter the code.
                </p>
              </div>
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-mono text-4xl font-black text-secondary">03</span>
                <h3 className="font-headline font-black uppercase text-xl my-4">One-Click Copy</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">
                  Click &quot;Copy&quot; on your PC. The text is in your Windows clipboard ready to paste into VS Code, Word, or browser.
                </p>
              </div>
            </div>
          </section>

          {/* COMPARISON TABLE */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">
              SyncClip vs. Traditional iPhone-to-PC Methods
            </h2>
            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full text-left border-collapse font-mono text-xs md:text-sm">
                <thead>
                  <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-wider">
                    <th className="p-4 border-r border-zinc-800">Method</th>
                    <th className="p-4 border-r border-zinc-800">Speed</th>
                    <th className="p-4 border-r border-zinc-800">App Required?</th>
                    <th className="p-4">Privacy Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black">
                  <tr className="bg-emerald-50">
                    <td className="p-4 font-bold border-r border-black text-emerald-800">SyncClip (Browser Bridge)</td>
                    <td className="p-4 border-r border-black font-bold text-emerald-700">&lt;100ms instant</td>
                    <td className="p-4 border-r border-black font-bold text-emerald-700">None (Web-based)</td>
                    <td className="p-4 font-bold text-emerald-700">Auto-purge / Burn Mode</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black">Emailing Yourself</td>
                    <td className="p-4 border-r border-black text-zinc-600">30s - 2 minutes</td>
                    <td className="p-4 border-r border-black text-zinc-600">Email client</td>
                    <td className="p-4 text-zinc-600">Permanently logged in inbox</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black">WhatsApp Web / Telegram</td>
                    <td className="p-4 border-r border-black text-zinc-600">10s - 30s</td>
                    <td className="p-4 border-r border-black text-zinc-600">Phone + QR pairing</td>
                    <td className="p-4 text-zinc-600">Stored on cloud backups</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black">Apple Universal Clipboard</td>
                    <td className="p-4 border-r border-black text-zinc-600">Incompatible</td>
                    <td className="p-4 border-r border-black text-zinc-600">Mac hardware only</td>
                    <td className="p-4 text-zinc-600">Apple ID restricted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">
              iPhone to Windows FAQ
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

          {/* INTERNAL ROUTING HUBS */}
          <div className="border-2 border-black bg-zinc-100 p-8 mb-16">
            <div className="font-mono text-[10px] tracking-widest uppercase text-secondary font-bold mb-4">Related Workflows</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
              <Link href="/clipboard" className="bg-white border border-black p-3 hover:bg-black hover:text-white transition-colors text-center">
                Online Clipboard →
              </Link>
              <Link href="/android-to-windows" className="bg-white border border-black p-3 hover:bg-black hover:text-white transition-colors text-center">
                Android to Windows →
              </Link>
              <Link href="/copy-text-from-phone-to-computer" className="bg-white border border-black p-3 hover:bg-black hover:text-white transition-colors text-center">
                Phone to Computer →
              </Link>
              <Link href="/airdrop-for-windows-and-android" className="bg-white border border-black p-3 hover:bg-black hover:text-white transition-colors text-center">
                AirDrop for Windows →
              </Link>
            </div>
          </div>
        </article>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // IPHONE TO WINDOWS CLIPBOARD
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
