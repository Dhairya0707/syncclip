
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Share Text Across Devices Free — No App, No Signup | SyncClip",
  description: "The fastest free way to share text snippets and code across every device in your hardware stack. Instant synchronization via web-native WebSocket protocol.",
  alternates: {
    canonical: "/share-text-across-devices-free",
  },
};

export default function AuthorityNode() {
  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">BLOG</Link>
          <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">ABOUT</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Workflow Utility Node // 2026</div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              SHARE_ TEXT_ ACROSS_ DEVICES_ FREE_
            </h1>
            
            <div className="border-l-[12px] border-secondary pl-8 py-6 bg-zinc-900 text-white mb-12 shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
              <p className="font-body text-xl md:text-2xl leading-relaxed font-bold italic">
                Bridges every screen in your life with a single click. SyncClip allows you to move text snippets, code, and long URLs across Android, iOS, Windows, and Mac without installing a single application.
              </p>
            </div>
          </div>

          <section className="mb-24">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="border-2 border-black p-8 bg-white relative">
                  <span className="material-symbols-outlined text-4xl mb-4 text-secondary">devices_other</span>
                  <h3 className="font-headline font-black uppercase text-xl mb-2">Cross-Platform_</h3>
                  <p className="font-body text-xs text-zinc-600 leading-relaxed">Android, iOS, Windows, Mac, Linux. If it has a browser, it has a clipboard bridge.</p>
               </div>
               <div className="border-2 border-black p-8 bg-white relative">
                  <span className="material-symbols-outlined text-4xl mb-4 text-secondary">bolt</span>
                  <h3 className="font-headline font-black uppercase text-xl mb-2">Zero_ Lag_</h3>
                  <p className="font-body text-xs text-zinc-600 leading-relaxed">Real-time WebSocket engine ensures sub-100ms synchronization across the mesh.</p>
               </div>
               <div className="border-2 border-black p-8 bg-white relative">
                  <span className="material-symbols-outlined text-4xl mb-4 text-secondary">no_accounts</span>
                  <h3 className="font-headline font-black uppercase text-xl mb-2">No_ Signup_</h3>
                  <p className="font-body text-xs text-zinc-600 leading-relaxed">Skip the login screen. Launch a session instantly and start sharing without accounts.</p>
               </div>
            </div>
          </section>

          <section className="mb-24 border-t-2 border-black pt-16">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12 italic tracking-tighter text-black leading-none text-center">Stop_ Your_ Email_ Draft_ Workflow_</h2>
             <div className="max-w-2xl mx-auto space-y-8 font-body text-lg text-zinc-700 leading-relaxed italic text-center">
                <p>&quot;I used to email myself links or use a private Slack channel just to get data from my phone to my PC. SyncClip removed those 5 extra clicks and made my workflow invisible.&quot;</p>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 not-italic">— 2026 Senior Dev Audit</div>
             </div>
          </section>

          <section className="mb-24 bg-black text-white p-16 text-center border-b-[20px] border-secondary">
             <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-10 italic tracking-tighter leading-none text-secondary">Join_ The_ Mesh_</h2>
             <Link href="/" className="inline-block bg-white text-black font-mono font-black py-6 px-16 hover:bg-secondary hover:text-white transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
              LAUNCH_ NODE_
            </Link>
          </section>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © 2026 SYNCCLIP // UNIVERSAL WORKFLOW PROTOCOL
          </div>
        </div>
      </footer>
    </div>
  );
}
