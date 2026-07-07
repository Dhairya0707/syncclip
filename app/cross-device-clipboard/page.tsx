
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cross-Device Clipboard: Sync Text Between Any Devices",
  description: "The ultimate cross-device clipboard tool. Sync text and code between Android, iOS, Windows, and Mac instantly. No login, no app install, 100% free.",
  keywords: ["cross device clipboard", "sync clipboard between devices", "clipboard sharing tool", "multi device clipboard", "universal clipboard online"],
  alternates: {
    canonical: "https://syncclip.in/clipboard",
  },
  openGraph: {
    title: "Cross-Device Clipboard: Sync Text Between Any Devices",
    description: "Sync text and code between Android, iOS, Windows, and Mac instantly. No login, no app install, 100% free.",
    url: "https://syncclip.in/cross-device-clipboard",
    type: "website",
    images: [
      {
        url: "https://syncclip.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cross-Device Clipboard Sync",
      },
    ],
  },
};

export default function CrossDeviceClipboard() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a cross-device clipboard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A cross-device clipboard is a tool that allows you to copy text on one piece of hardware (like an Android phone) and paste it onto another (like a Windows PC) instantly. SyncClip provides a web-based cross-device clipboard that works on all browsers."
        }
      },
      {
        "@type": "Question",
        "name": "How do I sync my clipboard across different operating systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The easiest way to sync clipboards across OS boundaries (e.g., iPhone to Windows) is to use a browser-native tool like SyncClip. It uses WebSockets to bridge the gap between different operating systems without requiring native app installs."
        }
      }
    ]
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/clipboard" className="text-zinc-400 hover:text-white transition-colors">CLIPBOARD</Link>
          <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">BLOG</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          
          {/* AEO ANSWER BOX */}
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">Quick Answer // AEO Node</div>
            <p className="font-body text-xl md:text-2xl leading-relaxed font-bold italic">
              A cross-device clipboard is a real-time utility that synchronizes text and code snippets between multiple hardware platforms (Android, iOS, Windows, Mac) using a centralized web node. Modern tools like SyncClip use WebSocket protocols to ensure sub-100ms latency, enabling a &quot;copy here, paste there&quot; workflow without account creation or app installation.
            </p>
          </div>

          <div className="mb-20 text-center md:text-left">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Ecosystem Bridge // V1.0</div>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-10">
              CROSS-DEVICE_ CLIPBOARD_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-3xl mb-12">
              Break the ecosystem walls. Sync your clipboard across every device you own, instantly and securely. No apps, no accounts, no friction.
            </p>
          </div>

          <div className="bg-zinc-100 p-8 border-2 border-black mb-16 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
             <div className="flex justify-between border-b border-zinc-300 pb-4 mb-4">
                <span>Inter-OS Compatibility</span>
                <span className="text-green-600 font-black">100% (BROWSER-NATIVE)</span>
             </div>
             <div className="flex justify-between border-b border-zinc-300 pb-4 mb-4">
                <span>Apple Universal Clipboard Limit</span>
                <span className="text-red-600 font-black">APPLE ONLY</span>
             </div>
             <div className="flex justify-between">
                <span>Windows Phone Link Limit</span>
                <span className="text-red-600 font-black">ANDROID/WINDOWS ONLY</span>
             </div>
          </div>

          {/* ASSET - SYNC WORKFLOW */}
          <div className="mb-24">
             <div className="border-4 border-black p-4 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all overflow-hidden">
                <img 
                   src="/sync-workflow.png" 
                   alt="SyncClip Cross Device Clipboard Workflow Diagram" 
                   className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
             </div>
             <div className="font-mono text-[9px] text-zinc-400 mt-8 flex justify-between uppercase tracking-widest italic">
                <span>Fig 3.2: Multi-Node Handshake</span>
                <span>Distributed State Architecture // V4.0</span>
             </div>
          </div>

          {/* THE WALLED GARDEN ANALYSIS */}
          <section className="mb-24 border-t-2 border-black pt-16">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12 italic tracking-tighter text-secondary">The_ Walled_ Garden_ Problem_</h2>
             <div className="font-body text-lg text-zinc-700 leading-relaxed space-y-8 max-w-3xl">
                <p>
                   Most <strong>cross-device clipboard</strong> solutions are intentionally trapped in &quot;Walled Gardens.&quot; Apple&apos;s Universal Clipboard works perfectly—but only if you stay within the Mac and iPhone ecosystem. Windows Phone Link is powerful—but only for Android and Windows users. 
                </p>
                <p>
                   In a modern professional environment, your hardware stack is rarely homogenous. You might use an <strong>Android phone</strong> for testing, a <strong>MacBook</strong> for development, and a <strong>Linux server</strong> for deployment. Native manufacturer tools offer zero help in bridging these gaps.
                </p>
                <p>
                   SyncClip operates at the <strong>application layer</strong>, meaning it doesn&apos;t care what brand of hardware you are using. By using your browser as the runtime environment, it creates a &quot;Virtual Ecosystem&quot; that moves with you.
                </p>
             </div>
          </section>

          {/* TECHNICAL PROTOCOL */}
          <section className="mb-24">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12">The Universal Sync Protocol</h2>
             <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-zinc-900 text-white p-10 border-4 border-secondary shadow-[15px_15px_0px_0px_rgba(5,125,188,0.2)]">
                   <h3 className="font-headline font-black uppercase text-2xl mb-6 text-secondary italic">WebSocket Bridge_</h3>
                   <p className="font-body text-sm text-zinc-400 leading-relaxed mb-6">Unlike cloud notes that rely on periodic polling, SyncClip uses full-duplex WebSocket tunnels. Data is pushed, not pulled. This reduces cross-device latency from seconds to milliseconds.</p>
                   <div className="font-mono text-[10px] uppercase text-zinc-600 font-black border-t border-zinc-800 pt-4">Protocol: WSS // Handshake: &lt;15ms</div>
                </div>
                <div className="bg-zinc-100 p-10 border-4 border-black">
                   <h3 className="font-headline font-black uppercase text-2xl mb-6 italic text-black">State Mirroring_</h3>
                   <p className="font-body text-sm text-zinc-600 leading-relaxed mb-6">By using Convex&apos;s reactive state management, we mirror your clipboard data across all connected nodes in a shared session instantly. Every node is a master, and every sync is atomic.</p>
                   <div className="font-mono text-[10px] uppercase text-zinc-400 font-black border-t border-zinc-200 pt-4">Engine: Convex // Consistency: Real-time</div>
                </div>
             </div>
          </section>

          {/* CAPABILITY GRID */}
          <section className="mb-24 border-t-2 border-black pt-16">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-10">Cross-OS Capabilities</h2>
             <div className="grid md:grid-cols-3 gap-8">
                <div className="border-2 border-black p-8 bg-white hover:bg-zinc-50 transition-colors">
                   <h4 className="font-headline font-black uppercase text-lg mb-4 text-black">Android ↔ Mac</h4>
                   <p className="text-xs text-zinc-600 leading-relaxed">The single most requested bridge. Move snippets from mobile browser to Safari/Chrome on macOS without AirDroid bloat.</p>
                </div>
                <div className="border-2 border-black p-8 bg-white hover:bg-zinc-50 transition-colors">
                   <h4 className="font-headline font-black uppercase text-lg mb-4 text-black">Windows ↔ iPhone</h4>
                   <p className="text-xs text-zinc-600 leading-relaxed">Stop using iCloud for Windows. Sync text instantly between your iOS device and PC using our browser-native node.</p>
                </div>
                <div className="border-2 border-black p-8 bg-white hover:bg-zinc-50 transition-colors">
                   <h4 className="font-headline font-black uppercase text-lg mb-4 text-black">Linux ↔ Tablet</h4>
                   <p className="text-xs text-zinc-600 leading-relaxed">Perfect for developers. Move terminal commands from your Linux rig to your tablet or smartphone for mobile testing.</p>
                </div>
             </div>
          </section>

          {/* CTA */}
          <div className="bg-zinc-900 text-white p-16 md:p-24 text-center border-b-[20px] border-secondary shadow-[30px_30px_0px_0px_rgba(0,0,0,0.1)]">
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-10 italic tracking-tighter leading-none text-secondary">Connect_ Your_ Stack_</h2>
            <Link href="/" className="inline-block bg-white text-black font-mono font-black py-6 px-16 hover:bg-secondary transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              LAUNCH_ CROSS_ SYNC_
            </Link>
          </div>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center font-mono text-[9px] tracking-widest text-zinc-400 uppercase gap-8">
          <div>© 2026 SYNCCLIP // CROSS-DEVICE-V1</div>
          <div className="flex gap-8">
            <Link href="/blog" className="hover:text-black transition-colors">Archive</Link>
            <Link href="/clipboard" className="hover:text-black transition-colors">Hub</Link>
            <Link href="/privacy" className="hover:text-black transition-colors">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
