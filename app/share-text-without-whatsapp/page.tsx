
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Share Text Without WhatsApp (Instant & Private)",
  description: "Looking for a way to share text between devices without using WhatsApp or Telegram? SyncClip is a free, no-login alternative for instant clipboard sharing.",
  keywords: ["share text without whatsapp", "alternative to whatsapp self message", "send text phone to pc no messenger", "private text sharing online", "instant clipboard sync"],
  alternates: {
    canonical: "https://syncclip.in/share-text-without-whatsapp",
  },
};

export default function ShareWithoutWhatsAppPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I share text between devices without WhatsApp?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SyncClip lets you share text between any devices without WhatsApp. No app installation, no phone number, no account. Open SyncClip on both devices, share the session code, and text syncs in real-time."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best WhatsApp alternative for sharing text?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SyncClip is purpose-built for instant text sharing — faster than WhatsApp, no contact list needed, and you can share with your own devices across platforms. Works on Android, iOS, Windows, and Mac."
        }
      },
      {
        "@type": "Question",
        "name": "Can I sync clipboard without installing any app?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SyncClip works entirely in your browser. No app store download, no extension, no setup. Open syncclip.in on both devices, generate a session, and start syncing immediately."
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
          <Link href="/blog/stop-emailing-yourself-notes" className="text-zinc-400 hover:text-white transition-colors">WORKFLOW</Link>
          <Link href="/clipboard" className="text-zinc-400 hover:text-white transition-colors">HUB</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          
          {/* AEO ANSWER BOX */}
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">Quick Answer // AEO Node</div>
            <p className="font-body text-xl md:text-2xl leading-relaxed font-bold italic">
              The best way to share text between devices without WhatsApp is using a browser-native online clipboard like SyncClip. It establishes a real-time WebSocket connection between your phone and computer, allowing you to sync links and code snippets in milliseconds without cluttering your personal chat history or requiring a login.
            </p>
          </div>

          <div className="mb-16 text-center md:text-left">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Workflow Cleanup // V1.0</div>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              SHARE_ TEXT_ WITHOUT_ WHATSAPP_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-3xl mb-12">
               Stop treating your messaging apps like a trash can for temporary notes. Use a dedicated, ephemeral bridge for your clipboard data.
            </p>
          </div>

          {/* THE PAIN POINT */}
          <section className="mb-24 border-t-2 border-black pt-16">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12 italic tracking-tighter text-secondary">The_ Messenger_ Clutter_</h2>
             <div className="font-body text-lg text-zinc-700 leading-relaxed space-y-8 max-w-3xl">
                <p>
                   Using WhatsApp &quot;Message Yourself&quot; or Telegram &quot;Saved Messages&quot; to transfer text feels easy, but it creates a permanent digital mess. Every time you send a link, a 2FA code, or a snippet, you are bloating your cloud storage and mixing transient data with your personal memories.
                </p>
                <p>
                   In 2026, <strong>Privacy Sovereignty</strong> is a major concern. When you paste a sensitive URL or a private note into a Meta-owned platform like WhatsApp, that data is indexed within their ecosystem. Even with end-to-end encryption, the metadata and the sheer persistence of the record create a digital footprint you might not want.
                </p>
                <p>
                   SyncClip provides a <strong>sovereign workspace</strong>. It is designed for data that is meant to be moved, used, and then destroyed. 
                </p>
             </div>
          </section>

          {/* AUDIT: MESSENGER VS SYNCCLIP */}
          <section className="mb-24">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12">The &quot;Zero-Trace&quot; Audit</h2>
             <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-zinc-100 p-10 border-4 border-black relative">
                   <div className="absolute top-0 right-0 bg-red-600 text-white font-mono text-[9px] px-3 py-1 uppercase font-black">Broken Method</div>
                   <h3 className="font-headline font-black uppercase text-2xl mb-6">WhatsApp &quot;Self-Msg&quot;</h3>
                   <ul className="space-y-4 font-mono text-xs uppercase text-zinc-500">
                      <li className="flex gap-2"><span>[X]</span> Requires Phone Number Link</li>
                      <li className="flex gap-2"><span>[X]</span> Permanent Cloud Storage</li>
                      <li className="flex gap-2"><span>[X]</span> Influx of personal notifications</li>
                      <li className="flex gap-2"><span>[X]</span> Hard to purge single snippets</li>
                   </ul>
                </div>
                <div className="bg-zinc-900 text-white p-10 border-4 border-secondary relative shadow-[15px_15px_0px_0px_rgba(5,125,188,0.2)]">
                   <div className="absolute top-0 right-0 bg-secondary text-black font-mono text-[9px] px-3 py-1 uppercase font-black">SyncClip Protocol</div>
                   <h3 className="font-headline font-black uppercase text-2xl mb-6 text-secondary">The Ephemeral Bridge</h3>
                   <ul className="space-y-4 font-mono text-xs uppercase text-zinc-400">
                      <li className="flex gap-2 text-white font-black"><span>[✓]</span> No Account / No Phone Needed</li>
                      <li className="flex gap-2 text-white font-black"><span>[✓]</span> Ephemeral Hot-Layer Purge</li>
                      <li className="flex gap-2 text-white font-black"><span>[✓]</span> Dedicated Productivity Tunnel</li>
                      <li className="flex gap-2 text-white font-black"><span>[✓]</span> One-click Clear for all data</li>
                   </ul>
                </div>
             </div>
          </section>

          {/* HOW TO SWITCH */}
          <section className="mb-24 space-y-12">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase italic text-black">How to move text without chat_</h2>
             <p className="text-zinc-600 text-xl leading-relaxed max-w-2xl">
                Switching to a browser-native bridge takes less time than waiting for &quot;WhatsApp Web&quot; to sync your 2GB chat history.
             </p>
             <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 border-2 border-black p-6 font-body text-sm bg-white">
                   <strong className="block font-headline uppercase text-lg mb-2">1. Open the Node</strong>
                   Visit syncclip.in on any browser. No login, no app, no friction.
                </div>
                <div className="flex-1 border-2 border-black p-6 font-body text-sm bg-white">
                   <strong className="block font-headline uppercase text-lg mb-2">2. Scan & Pair</strong>
                   Use the built-in QR scanner to instantly bridge your phone and PC.
                </div>
                <div className="flex-1 border-2 border-black p-6 font-body text-sm bg-white">
                   <strong className="block font-headline uppercase text-lg mb-2">3. Burn on Copy</strong>
                   Paste your text, copy it on the other side, and close the tab. Data is gone.
                </div>
             </div>
          </section>

          {/* CTA */}
          <div className="bg-black text-white p-16 md:p-24 text-center shadow-[20px_20px_0px_0px_rgba(5,125,188,1)]">
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-10 italic tracking-tighter leading-none text-secondary">Clean_ Sync_ Now_</h2>
            <Link href="/" className="inline-block bg-white text-black font-mono font-black py-6 px-16 hover:bg-secondary transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
              SYNC_ WITHOUT_ CHAT_
            </Link>
          </div>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center font-mono text-[9px] tracking-widest text-zinc-400 uppercase">
          <div>© 2026 SYNCCLIP // WORKFLOW-V1</div>
          <Link href="/blog/stop-emailing-yourself-notes" className="hover:text-black">Productivity Guide</Link>
        </div>
      </footer>
    </div>
  );
}
