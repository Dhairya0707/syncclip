import type { Metadata } from "next";
import Link from "next/link";
import AndroidWindowsSimulation from "../../components/AndroidWindowsSimulation";

export const metadata: Metadata = {
  title: "How to Sync Clipboard Between Devices Instantly (Free, No Apps)",
  description: "Copy on phone and paste on PC instantly. No logins, no app downloads, no account setup. Works cross-platform on Android, Windows, iPhone, Mac.",
  alternates: {
    canonical: "https://syncclip.in/clipboard-sync-guide",
  },
  openGraph: {
    title: "How to Sync Clipboard Between Devices Instantly (Free, No Apps)",
    description: "Copy on phone and paste on PC instantly. No logins, no app downloads, no account setup. Works cross-platform on Android, Windows, iPhone, Mac.",
    url: "https://syncclip.in/clipboard-sync-guide",
    type: "article",
    images: [
      {
        url: "https://syncclip.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "SyncClip Clipboard Sync Guide",
      },
    ],
  },
};

export default function ClipboardSyncGuide() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I sync clipboard between my phone and computer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Open syncclip.in on both devices. Enter the 6-character room code on your second device or scan the QR code to pair them instantly. Text copied on one device mirrors to the other instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Can I sync clipboard cross-platform (e.g. Android to Mac)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SyncClip is completely platform-agnostic since it runs entirely in your web browser. You can sync clipboards between Android, iOS, macOS, Windows, and Linux."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to install an application to sync my clipboard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No app installation is required. SyncClip runs entirely in the browser using WebSockets, meaning zero downloads, zero setup, and zero local space needed."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Sync Clipboard Between Devices Instantly",
    "description": "Copy text on your phone, paste on your laptop in seconds. Free clipboard sync tool, no installation required. Works on Android, iPhone, Mac, Windows.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Open SyncClip on both devices",
        "text": "Open syncclip.in on your phone and laptop browser. No account registration or app installation is required."
      },
      {
        "@type": "HowToStep",
        "name": "Connect to the same session",
        "text": "Enter the 6-character room code on your second device or scan the QR code to pair the devices instantly."
      },
      {
        "@type": "HowToStep",
        "name": "Copy and paste seamlessly",
        "text": "Copy text, links, or code snippets on one device. It will appear instantly on the other device in real-time."
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://syncclip.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Clipboard Sync Guide",
        "item": "https://syncclip.in/clipboard-sync-guide"
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SyncClip",
    "operatingSystem": "All",
    "applicationCategory": "UtilityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free, browser-based online clipboard to sync text instantly between phone and computer with no app installation or signups."
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* NAV */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/about" className="text-zinc-400 hover:text-white transition-colors font-bold">ABOUT</Link>
          <Link href="/support" className="text-zinc-400 hover:text-white transition-colors font-bold">SUPPORT</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          
          {/* HEADER */}
          <div className="mb-12">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Direct Utility Node // 2026</div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-6">
              HOW TO SYNC CLIPBOARD BETWEEN DEVICES IN SECONDS_
            </h1>
            <p className="font-body text-lg md:text-xl text-zinc-600 leading-relaxed max-w-3xl">
              Forget emailing yourself links, messaging yourself notes, or configuring bloated desktop applications. Here is the direct, no-install guide to instant clipboard sync.
            </p>
          </div>

          {/* INTERACTIVE SIMULATION (Instant Value Highlight) */}
          <div className="border-4 border-black p-6 md:p-8 bg-zinc-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-16">
            <div className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase mb-4">Live Simulation: Real-Time WebSocket Mirroring</div>
            <AndroidWindowsSimulation />
          </div>

          {/* AEO FEATURED SNIPPET BOX */}
          <div className="border-l-[12px] border-secondary pl-8 py-6 bg-zinc-50 border-y border-r border-black mb-16 shadow-[10px_10px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[9px] tracking-widest text-secondary uppercase mb-2 font-bold">Quick Setup Guide</div>
            <p className="font-body text-base md:text-lg leading-relaxed text-zinc-900">
              To sync clipboards between any phone and computer instantly:
              <br />
              <strong>1. Open:</strong> Visit <Link href="/" className="text-secondary underline font-bold">syncclip.in</Link> on both devices.
              <br />
              <strong>2. Link:</strong> Enter the 6-character room code on your second device or scan the QR code.
              <br />
              <strong>3. Sync:</strong> Type/paste text into the input field. It will sync and be ready to copy on the other device in under 100ms.
            </p>
          </div>

          {/* WORKFLOW SCENARIOS SECTION */}
          <section className="mb-20">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Ecosystem Pairing Workflows</h2>
            <div className="grid md:grid-cols-2 gap-8 font-body">
              
              {/* Android to Windows */}
              <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">📱</span>
                  <h3 className="font-headline uppercase font-black text-lg">Android to Windows PC</h3>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                  Ditch the heavy Microsoft Phone Link app configuration. 
                </p>
                <ol className="list-decimal list-inside text-xs text-zinc-500 space-y-2">
                  <li>Open SyncClip on your Windows PC.</li>
                  <li>Scan the QR code with your Android phone's camera.</li>
                  <li>Paste text/links on either device to copy on the other.</li>
                </ol>
              </div>

              {/* iPhone to Windows */}
              <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🍎</span>
                  <h3 className="font-headline uppercase font-black text-lg">iPhone to Windows PC</h3>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                  No iCloud sync required. Mirror data between Safari on iOS and Chrome on Windows.
                </p>
                <ol className="list-decimal list-inside text-xs text-zinc-500 space-y-2">
                  <li>Create a room on your Windows browser.</li>
                  <li>Open Safari on iPhone and input the 6-letter room code.</li>
                  <li>Instantly copy OTPs, URLs, and notes between them.</li>
                </ol>
              </div>

              {/* Android to Mac */}
              <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🤖</span>
                  <h3 className="font-headline uppercase font-black text-lg">Android to macOS</h3>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                  Connect across Apple's ecosystem wall without installation barriers.
                </p>
                <ol className="list-decimal list-inside text-xs text-zinc-500 space-y-2">
                  <li>Launch SyncClip on Android.</li>
                  <li>Open the room URL on your Mac Safari/Chrome window.</li>
                  <li>Transfer code snippets, links, or texts instantly.</li>
                </ol>
              </div>

              {/* Mac to Windows */}
              <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">💻</span>
                  <h3 className="font-headline uppercase font-black text-lg">macOS to Windows PC</h3>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                  Move assets and logs between work computers with zero friction.
                </p>
                <ol className="list-decimal list-inside text-xs text-zinc-500 space-y-2">
                  <li>Initiate a room on macOS.</li>
                  <li>Enter the room code on your Windows PC.</li>
                  <li>Enjoy instant copy-paste connectivity.</li>
                </ol>
              </div>

            </div>
          </section>

          {/* CRITICAL BENCHMARKS */}
          <section className="mb-20 border-t-4 border-dashed border-zinc-200 pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Performance & Specs</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <div className="border border-black p-4 bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-secondary font-black text-2xl mb-1">&lt;100ms</div>
                <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">WebSocket Latency</div>
              </div>
              <div className="border border-black p-4 bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-black font-black text-2xl mb-1">TLS 1.3</div>
                <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Connection Security</div>
              </div>
              <div className="border border-black p-4 bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-black font-black text-2xl mb-1">0 Apps</div>
                <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Universal Compatibility</div>
              </div>
              <div className="border border-black p-4 bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-black font-black text-2xl mb-1">24 Hour</div>
                <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">Auto-Purge Retention</div>
              </div>
            </div>
          </section>

          {/* FAQS */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">Frequently Asked Questions</h2>
            <div className="space-y-8 font-body">
              {faqSchema.mainEntity.map((faq, index) => (
                <div key={index} className="border-b border-zinc-200 pb-8">
                  <h3 className="font-headline text-xl font-black uppercase mb-4">{faq.name}</h3>
                  <p className="font-body text-base text-zinc-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mb-16 bg-black text-white p-12 md:p-20 text-center border-b-[20px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase mb-8 italic tracking-tighter leading-none text-secondary">Start Syncing Now_</h2>
            <p className="font-mono text-xs tracking-[0.4em] mb-10 text-zinc-400 uppercase">NO INSTALL · NO ACCOUNT · 100% FREE</p>
            <Link href="/" className="inline-block bg-white text-black font-mono font-black py-5 px-12 hover:bg-secondary transition-all uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              Open Free Clipboard ⚡
            </Link>
          </section>

        </article>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // INSTANT CLIPBOARD BRIDGE
          </div>
          <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
            <Link href="/" className="text-zinc-500 hover:text-secondary transition-colors font-bold">Home</Link>
            <Link href="/about" className="text-zinc-500 hover:text-secondary transition-colors font-bold">About</Link>
            <Link href="/support" className="text-zinc-500 hover:text-secondary transition-colors font-bold">Support</Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-secondary transition-colors font-bold">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
