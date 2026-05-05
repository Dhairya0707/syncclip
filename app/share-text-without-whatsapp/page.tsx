
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
  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
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
                   SyncClip provides a <strong>sovereign workspace</strong>. It is designed for data that is meant to be moved, used, and then destroyed.
                </p>
             </div>
          </section>

          {/* ADVANTAGES GRID */}
          <section className="mb-24">
             <div className="grid md:grid-cols-2 gap-12">
                <div className="border-4 border-black p-10 bg-white">
                   <h3 className="font-headline font-black uppercase text-2xl mb-6">No Chat History</h3>
                   <p className="text-zinc-600">Your clipboard data doesn&apos;t live in a chat thread. Once the session is closed, the data is hard-purged. Zero clutter.</p>
                </div>
                <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(5,125,188,1)]">
                   <h3 className="font-headline font-black uppercase text-2xl mb-6">Instant Access</h3>
                   <p className="text-zinc-600">No need to wait for &apos;WhatsApp Web&apos; to load or sync your entire chat database just to copy a single URL.</p>
                </div>
             </div>
          </section>

          {/* CTA */}
          <div className="bg-black text-white p-16 md:p-24 text-center">
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
