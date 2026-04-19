
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sync Clipboard Between Devices Instantly",
  description: "Sync your clipboard between Android, iOS, Windows, and Mac instantly. No login, no app installation, and zero tracking. The fastest way to copy paste across devices.",
  alternates: {
    canonical: "https://syncclip.in/sync-clipboard-between-devices",
  },
};

export default function SyncClipboardPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SyncClip Clipboard Sync",
    "url": "https://syncclip.in/sync-clipboard",
    "applicationCategory": "Utility",
    "operatingSystem": "Universal",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "A zero-friction, real-time clipboard synchronization tool that works across all devices via the web."
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* NAV */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">ABOUT</Link>
          <Link href="/clipboard-sync-guide" className="text-zinc-400 hover:text-white transition-colors">GUIDE</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* HEADER */}
          <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Solution Overview // V4.0</div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              SYNC CLIPBOARD BETWEEN ANY DEVICES_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed italic text-zinc-600 max-w-2xl mb-12">
              Cross-device text sharing redefined for 2026. Instant, account-free, and cryptographically secure.
            </p>
            <div className="border-4 border-black shadow-[12px_12px_0px_0px_rgba(5,125,188,1)] overflow-hidden max-w-sm">
              <img 
                src="/mockup-mobile.png" 
                alt="SyncClip Mobile Interface Mockup" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* SECTION 1: THE PROBLEM */}
          <section className="mb-20 border-t-2 border-black pt-10">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-black">The Clipboard Gap</h2>
            <div className="grid md:grid-cols-2 gap-10 font-body text-base text-zinc-700 leading-relaxed">
              <p>
                In a multi-device world, moving a simple string of text—an API key, a shipping address, or a long URL—between a smartphone and a laptop remains a significant bottleneck. Native solutions like Apple&apos;s Universal Clipboard are excellent but strictly limited to their own ecosystem. 
              </p>
              <p>
                SYNCCLIP bridges this &quot;clipboard gap&quot; by providing a platform-agnostic, web-native protocol that works on any device with a browser. No apps, no accounts, and no setup required.
              </p>
            </div>
          </section>

          {/* SECTION 2: REAL-TIME ARCHITECTURE */}
          <section className="mb-20 border-t-2 border-black pt-10">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-6">Real-Time Sync Architecture</h2>
            <p className="font-body text-base text-zinc-700 leading-relaxed mb-10 max-w-3xl">
              Most clipboard sync tools rely on slow cloud polling or invasive background apps. SYNCCLIP uses a <strong>WebSocket-first architecture</strong> powered by Convex. When you paste text into a session node, the update is broadcast to all connected devices in under 100ms.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4">bolt</span>
                <h3 className="font-headline font-black uppercase text-xl mb-3">Ultra-Low Latency</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Optimized for sub-100ms sync. Every keystroke is pushed through real-time channels, eliminating the need for manual refreshes.</p>
              </div>
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(5,125,188,1)]">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4">hub</span>
                <h3 className="font-headline font-black uppercase text-xl mb-3">Multi-Node Mesh</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Connect up to 100 devices to a single session. Any device can be the sender or receiver in a true peer-to-peer style mesh.</p>
              </div>
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4">shield_lock</span>
                <h3 className="font-headline font-black uppercase text-xl mb-3">Ephemeral Security</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Data is never stored permanently. Sessions are purged from the database after 24 hours of inactivity, leaving zero digital trail.</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: WORKFLOW */}
          <section className="mb-20 border-t-2 border-black pt-10">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">The 3-Step Workflow</h2>
            <div className="space-y-8">
              <div className="flex gap-8 items-start">
                <span className="font-mono text-4xl font-black text-secondary border-r-4 border-black pr-6 py-2">01</span>
                <div>
                  <h4 className="font-headline text-2xl font-black uppercase mb-2">Initialize Node</h4>
                  <p className="font-body text-base text-zinc-600">Open syncclip.in on your primary device. A unique 6-character session ID is generated instantly using cryptographically secure randomness.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <span className="font-mono text-4xl font-black text-secondary border-r-4 border-black pr-6 py-2">02</span>
                <div>
                  <h4 className="font-headline text-2xl font-black uppercase mb-2">Connect Remote</h4>
                  <p className="font-body text-base text-zinc-600">Scan the QR code or type the code on your second device. The devices establish a real-time handshake via our distributed sync engine.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <span className="font-mono text-4xl font-black text-secondary border-r-4 border-black pr-6 py-2">03</span>
                <div>
                  <h4 className="font-headline text-2xl font-black uppercase mb-2">Sync Instant</h4>
                  <p className="font-body text-base text-zinc-600">Paste or type on either device. The clipboard content updates globally. Use the &quot;Copy&quot; button to land it directly in your OS clipboard.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: USE CASES */}
          <section className="mb-20 border-t-2 border-black pt-10">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Universal Compatibility</h2>
            <p className="font-body text-base text-zinc-700 leading-relaxed mb-8 max-w-2xl">
              Because SYNCCLIP runs entirely in the browser, it bypasses the walled gardens of modern operating systems and hardware limitations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              <div className="border-2 border-black p-4 text-center hover:bg-black hover:text-white transition-colors">Android ⇄ Win</div>
              <div className="border-2 border-black p-4 text-center hover:bg-black hover:text-white transition-colors">iOS ⇄ macOS</div>
              <div className="border-2 border-black p-4 text-center hover:bg-black hover:text-white transition-colors">Linux ⇄ Android</div>
              <div className="border-2 border-black p-4 text-center hover:bg-black hover:text-white transition-colors">Win ⇄ Linux</div>
              <div className="border-2 border-black p-4 text-center hover:bg-black hover:text-white transition-colors">ChromeOS ⇄ iOS</div>
              <div className="border-2 border-black p-4 text-center hover:bg-black hover:text-white transition-colors">macOS ⇄ Android</div>
              <div className="border-2 border-black p-4 text-center hover:bg-black hover:text-white transition-colors">iPadOS ⇄ Win</div>
              <div className="border-2 border-black p-4 text-center hover:bg-black hover:text-white transition-colors">Any ⇄ Any</div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-black text-white p-12 text-center border-[10px] border-secondary shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase mb-6 italic">Bridge the Gap Now.</h2>
            <Link href="/" className="inline-block bg-white text-black font-mono font-black py-5 px-12 hover:bg-secondary transition-colors uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              LAUNCH_ SYNC
            </Link>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // UNIVERSAL CLIPBOARD // V2.6
          </div>
          <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
            <Link href="/" className="text-zinc-500 hover:text-secondary transition-colors">Home</Link>
            <Link href="/clipboard-sync-guide" className="text-zinc-500 hover:text-secondary transition-colors">Guide</Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-secondary transition-colors">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
