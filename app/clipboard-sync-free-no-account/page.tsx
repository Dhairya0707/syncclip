
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Clipboard Sync — No Account Required | SyncClip",
  description: "Sync your clipboard between any devices for free without creating an account. The most private, zero-login method to share text and code instantly.",
  alternates: {
    canonical: "/clipboard-sync-free-no-account",
  },
};

export default function AuthorityNode() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I sync clipboard between devices without creating an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SyncClip is a zero-login clipboard sync tool. No account, no email, no password required. Open SyncClip on both devices, share the session code, and your clipboard syncs instantly."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a free clipboard sync that doesn't require signup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — SyncClip is completely free and requires no signup. Sessions work immediately with a 6-character code. Data auto-expires after 24 hours. No hidden charges or premium tiers."
        }
      },
      {
        "@type": "Question",
        "name": "How does SyncClip sync clipboard without storing my data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SyncClip uses ephemeral WebSocket sessions. Data is transmitted in real-time and automatically purged from the database after 24 hours. Burn After Reading mode deletes data instantly after the connected device reads it."
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
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Privacy Protocol Node // 2026</div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              FREE_ CLIPBOARD_ SYNC_ NO_ ACCOUNT_
            </h1>
            
            <div className="bg-zinc-900 text-white p-10 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)] mb-12">
              <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">Quick Answer // AEO Node</div>
              <p className="font-body text-xl md:text-2xl leading-relaxed font-bold italic text-zinc-300">
                SyncClip lets you sync your clipboard between any devices for free without creating an account or installing an app. Just open the URL on both devices, share the 6-character session code, and text syncs instantly. Sessions auto-expire after 24 hours for complete privacy.
              </p>
            </div>
          </div>

          <section className="mb-24">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12 italic tracking-tighter text-black leading-none">Why_ No_ Account_ Wins_</h2>
            <div className="grid md:grid-cols-2 gap-12">
               <div className="border-4 border-black p-10 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="font-headline text-2xl font-black uppercase mb-4 text-secondary italic italic">Zero_ Data_ Collection_</h3>
                  <p className="font-body text-sm text-zinc-600 leading-relaxed">No emails, no passwords, no profiles. We don&apos;t know who you are, and we don&apos;t want to. Your data stays transient and unlinked from your identity.</p>
               </div>
               <div className="border-4 border-black p-10 bg-white shadow-[10px_10px_0px_0px_rgba(5,125,188,1)]">
                  <h3 className="font-headline text-2xl font-black uppercase mb-4 text-secondary italic italic">Instant_ Activation_</h3>
                  <p className="font-body text-sm text-zinc-600 leading-relaxed">Account-based tools force you through a signup funnel. SyncClip lets you launch a sync node in under 1 second. Speed is the priority.</p>
               </div>
            </div>
          </section>

          <section className="mb-24 border-t-2 border-black pt-16 bg-zinc-50 p-12">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-8 italic tracking-tighter text-black leading-none">Security_ Audit_</h2>
             <div className="space-y-6 font-mono text-[12px] uppercase tracking-widest text-zinc-500">
                <div className="flex justify-between border-b border-zinc-200 pb-4">
                   <span>Encryption</span>
                   <span className="text-black font-black italic">TLS 1.3 / AES-256</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-4">
                   <span>Storage Duration</span>
                   <span className="text-black font-black italic">24h Auto-Purge</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-4">
                   <span>Identity Verification</span>
                   <span className="text-black font-black italic">None Required</span>
                </div>
                <div className="flex justify-between">
                   <span>Protocol</span>
                   <span className="text-black font-black italic">WSS (WebSocket Secure)</span>
                </div>
             </div>
          </section>

          <section className="mb-24 text-center">
             <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-10 italic tracking-tighter leading-none text-black">Sync_ Now. No_ Logs_ Ever.</h2>
             <Link href="/" className="inline-block bg-secondary text-white font-mono font-black py-6 px-16 hover:bg-black transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-3 hover:translate-y-3">
              LAUNCH_ ANONYMOUS_ NODE_
            </Link>
          </section>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © 2026 SYNCCLIP // ZERO-ACCOUNT PROTOCOL DIVISION
          </div>
        </div>
      </footer>
    </div>
  );
}
