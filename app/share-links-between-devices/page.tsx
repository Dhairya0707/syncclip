
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fastest Way to Share Links Between Devices — Free & No Login",
  description: "Need to share links between phone and PC instantly? Use SyncClip for real-time link sharing across Android, iOS, Windows, and Mac. No app required.",
  keywords: ["share links between devices", "send link from phone to pc", "sync links between phone and laptop", "copy links cross platform", "how to share urls between devices"],
  alternates: {
    canonical: "https://syncclip.in/clipboard",
  },
};

export default function ShareLinksPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I share a link from my phone to my PC instantly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The fastest way to share a link from phone to PC is using SyncClip. Open the site on both devices, paste the URL on your phone, and it will appear on your PC in under 100ms. No login or app installation needed."
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
          <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">BLOG</Link>
          <Link href="/clipboard" className="text-zinc-400 hover:text-white transition-colors underline decoration-secondary">PILLAR_HUB</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6 max-w-4xl mx-auto">
        <article>
          <header className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Workflow // Productivity</div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter font-headline leading-tight text-black mb-8">
              SHARE_ LINKS_ BETWEEN_ DEVICES_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 italic max-w-2xl">
              Stop emailing yourself URLs. Move links between your mobile and desktop ecosystem in milliseconds.
            </p>
          </header>

          {/* AEO ANSWER BOX */}
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">Quick Answer // AEO Node</div>
            <p className="font-body text-lg md:text-xl leading-relaxed font-bold italic text-zinc-300">
              The fastest way to share links between devices is using a browser-native clipboard sync tool like SyncClip. It creates a real-time WebSocket bridge between your phone and PC, allowing you to paste a URL on one device and click it on the other instantly. This eliminates the need for messaging apps, emails, or cloud notes for transient URL sharing.
            </p>
          </div>

          <div className="space-y-12 font-body text-lg text-zinc-800 leading-relaxed">
            <section>
              <h2 className="font-headline text-3xl font-black uppercase mb-6 italic tracking-tight border-b-2 border-black pb-2 inline-block">The_ URL_ Friction_ Problem_</h2>
              <p>
                We often find an article or video on our phone that we want to view on the big screen. Most people use &quot;Self-WhatsApp&quot; or &quot;Self-Email&quot; to bridge this gap. This adds 30-60 seconds of latency and clutters your communication channels with transient data.
              </p>
            </section>

            <section className="bg-zinc-50 p-8 border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
               <h3 className="font-headline font-black uppercase text-xl mb-4 text-secondary">The 100ms Solution</h3>
               <p className="text-sm mb-6">SyncClip treats every link as a transient packet. No history saved, no accounts required.</p>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2 font-bold"><span className="w-2 h-2 bg-secondary block"></span> No Login</div>
                  <div className="flex items-center gap-2 font-bold"><span className="w-2 h-2 bg-secondary block"></span> No App</div>
                  <div className="flex items-center gap-2 font-bold"><span className="w-2 h-2 bg-secondary block"></span> Real-time</div>
                  <div className="flex items-center gap-2 font-bold"><span className="w-2 h-2 bg-secondary block"></span> Secure</div>
               </div>
            </section>
          </div>

          {/* CTA */}
          <div className="mt-20 bg-black text-white p-12 md:p-20 text-center">
            <h2 className="font-headline text-3xl md:text-6xl font-black uppercase mb-8 leading-none italic text-secondary">Move_ Links_ Now_</h2>
            <Link href="/" className="inline-block bg-white text-black font-mono font-black py-5 px-12 hover:bg-secondary hover:text-white transition-all uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              SYNC_ YOUR_ FIRST_ URL_
            </Link>
          </div>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="font-mono text-[9px] tracking-widest text-zinc-400 uppercase">
             © 2026 SYNCCLIP // URL-SYNC-V1
           </div>
           <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
             <Link href="/clipboard" className="text-zinc-500 hover:text-secondary">Hub</Link>
             <Link href="/blog/5-ways-to-copy-text-between-phone-and-laptop" className="text-zinc-500 hover:text-secondary">Guides</Link>
           </nav>
        </div>
      </footer>
    </div>
  );
}
