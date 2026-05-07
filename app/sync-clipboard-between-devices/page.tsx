
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
            <div className="border-4 border-black shadow-[15px_15px_0px_0px_rgba(5,125,188,1)] overflow-hidden max-w-sm group">
              <img 
                src="/mockup-mobile.png" 
                alt="SyncClip Mobile Interface Mockup" 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          <div className="bg-zinc-100 p-8 border-2 border-black mb-16 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div className="border-r border-zinc-300 pr-8">
                   <div className="text-black font-black mb-2 italic uppercase">Edge Latency</div>
                   <p className="text-[10px] leading-relaxed">Global edge node clusters ensure your handshake is processed by the nearest available data center.</p>
                </div>
                <div className="border-r border-zinc-300 px-8">
                   <div className="text-black font-black mb-2 italic uppercase">Mesh Architecture</div>
                   <p className="text-[10px] leading-relaxed">Not just phone-to-PC. Connect your entire hardware stack into a unified clipboard environment.</p>
                </div>
                <div className="pl-8">
                   <div className="text-black font-black mb-2 italic uppercase">Protocol: WSS</div>
                   <p className="text-[10px] leading-relaxed">Data is pushed via encrypted WebSocket Secure tunnels. Zero polling, zero waiting.</p>
                </div>
             </div>
          </div>

          {/* SECTION 1: THE PROBLEM */}
          <section className="mb-24 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12 italic text-black leading-none">The_ Clipboard_ Gap_</h2>
            <div className="grid md:grid-cols-2 gap-12 font-body text-lg text-zinc-700 leading-relaxed">
              <p>
                In a multi-device world, moving a simple string of text—an API key, a shipping address, or a long URL—between a smartphone and a laptop remains a significant bottleneck. Native solutions like Apple&apos;s Universal Clipboard are excellent but strictly limited to their own ecosystem. 
              </p>
              <p>
                SYNCCLIP bridges this &quot;clipboard gap&quot; by providing a platform-agnostic, web-native protocol that works on any device with a browser. No apps, no accounts, and no setup required. We turn your browser into a secure portal for your data.
              </p>
            </div>
          </section>

          {/* MULTI-NODE MESH SECTION */}
          <section className="mb-24 bg-zinc-900 text-white p-12 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-8 italic text-secondary">Multi-Node_ Mesh_ Architecture_</h2>
             <p className="font-body text-lg text-zinc-400 mb-8 leading-relaxed max-w-3xl">
                While most tools only allow point-to-point sharing (Device A to Device B), SyncClip creates a <strong>Multi-Node Mesh Network</strong>. This means you can have your Windows Desktop, MacBook Pro, Android Phone, and iPad all connected to the same session simultaneously.
             </p>
             <p className="font-body text-lg text-zinc-400 mb-10 leading-relaxed max-w-3xl">
                When you paste into the mesh, every single connected node updates reactively. This is perfect for complex development environments where you are moving data between multiple testing platforms and workstations at once.
             </p>
             <div className="flex gap-4">
                <div className="h-1 flex-1 bg-secondary"></div>
                <div className="h-1 flex-1 bg-secondary opacity-50"></div>
                <div className="h-1 flex-1 bg-secondary opacity-20"></div>
             </div>
          </section>

          {/* SECTION 2: REAL-TIME ARCHITECTURE */}
          <section className="mb-24 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-12">The Real-Time Engine</h2>
            <p className="font-body text-lg text-zinc-700 leading-relaxed mb-12 max-w-3xl">
              Most clipboard sync tools rely on slow cloud polling or invasive background apps. SYNCCLIP uses a <strong>WebSocket-first architecture</strong> powered by Convex. When you paste text into a session node, the update is broadcast to all connected devices in under 100ms.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-4 border-black p-10 bg-white hover:bg-zinc-50 transition-colors shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-headline font-black uppercase text-xl mb-4 text-secondary italic">Ultra-Low Latency_</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Optimized for sub-100ms sync. Every keystroke is pushed through real-time channels, eliminating the need for manual refreshes or periodic fetching.</p>
              </div>
              <div className="border-4 border-black p-10 bg-white hover:bg-zinc-50 transition-colors shadow-[10px_10px_0px_0px_rgba(5,125,188,1)]">
                <h3 className="font-headline font-black uppercase text-xl mb-4 text-secondary italic">Distributed State_</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Connect multiple hardware platforms to a single session. Any device can be the sender or receiver in a true peer-to-peer style reactive mesh.</p>
              </div>
              <div className="border-4 border-black p-10 bg-white hover:bg-zinc-50 transition-colors shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-headline font-black uppercase text-xl mb-4 text-secondary italic">Ephemeral Lock_</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Data is never stored permanently. Sessions are purged from the database after 24 hours of inactivity, ensuring your temporary snippets leave zero digital trail.</p>
              </div>
            </div>
          </section>

          {/* SECTION 3: WORKFLOW */}
          <section className="mb-24 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-12">The 3-Step Synchronization</h2>
            <div className="space-y-12">
              <div className="flex gap-8 items-start bg-zinc-50 p-8 border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
                <span className="font-mono text-5xl font-black text-secondary border-r-4 border-black pr-8 py-2">01</span>
                <div>
                  <h4 className="font-headline text-2xl font-black uppercase mb-4 text-black italic">Initialize Node_</h4>
                  <p className="font-body text-base text-zinc-600 leading-relaxed">Open syncclip.in on your primary device. A unique 6-character session ID is generated instantly. No sign-up flow, no onboarding, just immediate utility.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start bg-zinc-50 p-8 border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
                <span className="font-mono text-5xl font-black text-secondary border-r-4 border-black pr-8 py-2">02</span>
                <div>
                  <h4 className="font-headline text-2xl font-black uppercase mb-4 text-black italic">Connect Remote_</h4>
                  <p className="font-body text-base text-zinc-600 leading-relaxed">Scan the QR code or type the code on your second device. The devices establish a real-time handshake via our distributed sync engine using TLS 1.3 encryption.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start bg-zinc-50 p-8 border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]">
                <span className="font-mono text-5xl font-black text-secondary border-r-4 border-black pr-8 py-2">03</span>
                <div>
                  <h4 className="font-headline text-2xl font-black uppercase mb-4 text-black italic">Sync Instant_</h4>
                  <p className="font-body text-base text-zinc-600 leading-relaxed">Paste text on either device. The content updates globally across all connected browsers. Click &apos;Copy&apos; on the destination device to land it in your system clipboard.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: USE CASES */}
          <section className="mb-24 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Universal Compatibility</h2>
            <p className="font-body text-lg text-zinc-700 leading-relaxed mb-12 max-w-2xl">
              Because SYNCCLIP runs entirely in the browser, it bypasses the walled gardens of modern operating systems and hardware limitations.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-[11px] uppercase tracking-widest text-zinc-600 font-black">
              <div className="border-4 border-black p-6 text-center hover:bg-secondary hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">Android ⇄ Win</div>
              <div className="border-4 border-black p-6 text-center hover:bg-secondary hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">iOS ⇄ macOS</div>
              <div className="border-4 border-black p-6 text-center hover:bg-secondary hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">Linux ⇄ Android</div>
              <div className="border-4 border-black p-6 text-center hover:bg-secondary hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">Win ⇄ Linux</div>
              <div className="border-4 border-black p-6 text-center hover:bg-secondary hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">ChromeOS ⇄ iOS</div>
              <div className="border-4 border-black p-6 text-center hover:bg-secondary hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">macOS ⇄ Android</div>
              <div className="border-4 border-black p-6 text-center hover:bg-secondary hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">iPadOS ⇄ Win</div>
              <div className="border-4 border-black p-6 text-center hover:bg-secondary hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">Any ⇄ Any</div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-zinc-900 text-white p-16 md:p-24 text-center border-b-[20px] border-secondary shadow-[30px_30px_0px_0px_rgba(0,0,0,0.1)]">
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-10 italic tracking-tighter leading-none text-secondary">Bridge_ The_ Gap_ Now_</h2>
            <Link href="/" className="inline-block bg-white text-black font-mono font-black py-6 px-16 hover:bg-secondary transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
              LAUNCH_ SYNC_ ENGINE_
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
