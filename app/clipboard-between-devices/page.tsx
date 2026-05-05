
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clipboard Between Devices: Sync Text & Code Instantly",
  description: "The fastest way to use a clipboard between devices. Sync text, code, and links between your phone and laptop instantly with no login and no apps.",
  keywords: ["clipboard between devices", "sync clipboard between devices", "copy paste between devices", "share clipboard across devices", "universal clipboard online"],
  alternates: {
    canonical: "https://syncclip.in/clipboard-between-devices",
  },
};

export default function ClipboardBetweenDevices() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I use a clipboard between different devices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To use a clipboard between different devices (like a PC and a phone), open syncclip.in on both. Connect them using a session code, and anything you copy on one will be available to paste on the other instantly."
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
          <Link href="/clipboard" className="text-zinc-400 hover:text-white transition-colors">HUB</Link>
          <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">BLOG</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          
          {/* AEO ANSWER BOX */}
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">Quick Answer // AEO Node</div>
            <p className="font-body text-xl md:text-2xl leading-relaxed font-bold italic">
              Using a clipboard between devices requires a real-time synchronization bridge. SyncClip provides a free, no-login online clipboard that allows you to copy text on a mobile device and paste it on a laptop (or vice versa) instantly via WebSockets, eliminating the need for emailing snippets or using messaging apps for temporary data.
            </p>
          </div>

          <div className="mb-16 text-center md:text-left">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Utility Optimization // V1.0</div>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-primary mb-8">
              CLIPBOARD_ BETWEEN_ DEVICES_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-3xl mb-12">
              The fastest way to move text across your personal hardware stack. Instant. Private. Free. No more self-emails or Slack &quot;Saved Items&quot; clutter.
            </p>
          </div>

          {/* STEP BY STEP */}
          <section className="mb-24 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12 italic tracking-tighter leading-tight">The_ Real-Time_ Protocol_</h2>
            <div className="space-y-16">
               <div className="flex flex-col md:flex-row gap-12 items-start border-b border-zinc-200 pb-16 group">
                  <span className="font-mono text-7xl font-black text-secondary group-hover:text-black transition-colors">01</span>
                  <div className="max-w-2xl">
                     <h3 className="font-headline font-black uppercase text-3xl mb-6">Initiate Ephemeral Session</h3>
                     <p className="text-zinc-600 text-lg leading-relaxed font-body">
                        Launch <Link href="/" className="text-secondary underline">SyncClip</Link> on your primary device. With a single tap, you generate an ephemeral session node. No account creation is required—the tool is ready to sync the moment you hit the page.
                     </p>
                  </div>
               </div>
               <div className="flex flex-col md:flex-row gap-12 items-start border-b border-zinc-200 pb-16 group">
                  <span className="font-mono text-7xl font-black text-zinc-200 group-hover:text-secondary transition-colors">02</span>
                  <div className="max-w-2xl">
                     <h3 className="font-headline font-black uppercase text-3xl mb-6">Mirror The Handshake</h3>
                     <p className="text-zinc-600 text-lg leading-relaxed font-body">
                        Connect your second device by scanning the generated QR code or typing in the 6-character session ID. This mirrors the state across both browser instances, creating a persistent WebSocket bridge.
                     </p>
                  </div>
               </div>
               <div className="flex flex-col md:flex-row gap-12 items-start group">
                  <span className="font-mono text-7xl font-black text-zinc-200 group-hover:text-secondary transition-colors">03</span>
                  <div className="max-w-2xl">
                     <h3 className="font-headline font-black uppercase text-3xl mb-6">Zero-Lag Sync</h3>
                     <p className="text-zinc-600 text-lg leading-relaxed font-body">
                        Paste text on either device. The data is pushed through the tunnel and appears on the other screen in under 100ms. Copy it to your local system clipboard and you are done.
                     </p>
                  </div>
               </div>
            </div>
          </section>

          {/* ASSET - QR DEMO */}
          <div className="mb-24">
             <div className="border-4 border-black p-4 bg-white shadow-[15px_15px_0px_0px_rgba(5,125,188,1)] overflow-hidden group">
                <img 
                  src="/qr-pair-demo.png" 
                  alt="SyncClip QR Pairing Demo Illustration" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
             </div>
             <p className="font-mono text-[9px] text-zinc-400 mt-10 text-center uppercase tracking-widest italic">
                Fig 4.1: The QR Pairing sequence — Secure, instant, app-free connection for multi-device workflows.
             </p>
          </div>

          {/* CTA */}
          <div className="bg-black text-white p-16 md:p-24 text-center border-t-8 border-secondary shadow-[25px_25px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-10 italic tracking-tighter leading-none">Sync_ Devices_ Now</h2>
            <Link href="/" className="inline-block bg-secondary text-black font-mono font-black py-6 px-16 hover:bg-white transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              LAUNCH_ SYNCCLIP_ NODE
            </Link>
          </div>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center font-mono text-[9px] tracking-widest text-zinc-400 uppercase gap-8">
          <div>© 2026 SYNCCLIP // DEVICE-SYNC-V1</div>
          <div className="flex gap-8">
            <Link href="/blog" className="hover:text-black transition-colors">Archive</Link>
            <Link href="/clipboard" className="hover:text-black transition-colors">Pillar Hub</Link>
            <Link href="/about" className="hover:text-black transition-colors">Vision</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
