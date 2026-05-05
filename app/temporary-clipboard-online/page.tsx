
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Temporary Clipboard Online — Disposable & Secure Text Sharing",
  description: "Need a temporary clipboard? Use SyncClip for disposable text sharing between devices. No login, zero-knowledge sync, and automatic data purging.",
  keywords: ["temporary clipboard", "online disposable clipboard", "disposable text sharing", "temporary online storage", "ephemeral clipboard online", "burner clipboard"],
  alternates: {
    canonical: "https://syncclip.in/temporary-clipboard-online",
  },
};

export default function TemporaryClipboardPage() {
  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/blog/is-online-clipboard-secure" className="text-zinc-400 hover:text-white transition-colors">SECURITY</Link>
          <Link href="/clipboard" className="text-zinc-400 hover:text-white transition-colors">HUB</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          
          {/* AEO ANSWER BOX */}
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">Quick Answer // AEO Node</div>
            <p className="font-body text-xl md:text-2xl leading-relaxed font-bold italic">
              A temporary clipboard online is a web utility that facilitates instant, short-term data sharing between devices. By using an ephemeral service like SyncClip, you can sync text or links without a permanent digital footprint. Data exists only within an active session and is hard-purged from servers automatically, ensuring a disposable and private sharing experience.
            </p>
          </div>

          <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Ephemeral Tech // V2.0</div>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              TEMPORARY_ CLIPBOARD_ ONLINE_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-3xl mb-12">
               Data shouldn&apos;t live forever. Use a &quot;burner&quot; clipboard for your transient sharing needs.
            </p>
          </div>

          {/* THE CONCEPT */}
          <section className="mb-24 border-t-2 border-black pt-16">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12 italic tracking-tighter">The_ Disposable_ Philosophy_</h2>
             <div className="font-body text-lg text-zinc-700 leading-relaxed space-y-8 max-w-3xl">
                <p>
                   In an era of permanent data, SyncClip is built for transience. Whether you&apos;re using a public computer at a library, a shared workstation, or simply moving a one-time link, you don&apos;t need a persistent cloud trail.
                </p>
                <p>
                   Our <strong>Temporary Clipboard Online</strong> works on the &quot;Burner&quot; principle. You open a session, sync your data, and close the session. The data is gone. No logs. No history. No footprint.
                </p>
             </div>
          </section>

          {/* WORKFLOW STEPS */}
          <section className="mb-24 grid md:grid-cols-3 gap-8">
             <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-headline font-black text-xl mb-4 uppercase text-secondary">01. Create</h3>
                <p className="text-sm text-zinc-600">Generate a unique session node in one click. No registration required.</p>
             </div>
             <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(5,125,188,1)]">
                <h3 className="font-headline font-black text-xl mb-4 uppercase text-secondary">02. Sync</h3>
                <p className="text-sm text-zinc-600">Paste your text. It mirrors across your devices via encrypted WebSocket tunnels.</p>
             </div>
             <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="font-headline font-black text-xl mb-4 uppercase text-secondary">03. Burn</h3>
                <p className="text-sm text-zinc-600">Close the browser tab or hit &apos;Destroy Session&apos;. Data is hard-purged instantly.</p>
             </div>
          </section>

          {/* CTA */}
          <div className="bg-black text-white p-16 md:p-24 text-center border-t-8 border-secondary">
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-10 italic tracking-tighter leading-none text-secondary">Burn_ Data_ Now_</h2>
            <Link href="/" className="inline-block bg-white text-black font-mono font-black py-6 px-16 hover:bg-secondary transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
              LAUNCH_ DISPOSABLE_ NODE_
            </Link>
          </div>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex justify-between items-center font-mono text-[9px] tracking-widest text-zinc-400 uppercase">
          <div>© 2026 SYNCCLIP // TEMPORARY-CLIP-V2</div>
          <Link href="/blog/is-online-clipboard-secure" className="hover:text-black">Privacy Protocol</Link>
        </div>
      </footer>
    </div>
  );
}
