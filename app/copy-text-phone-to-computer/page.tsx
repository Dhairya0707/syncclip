
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Copy Text from Phone to Computer Instantly (No Apps)",
  description: "The absolute fastest way to copy text from your phone to your computer in 2026. No login, no app download, and zero tracking. Sync clipboard between Android, iPhone, and PC instantly.",
  keywords: ["copy text phone to computer", "transfer text from phone to pc", "share text phone to computer", "copy paste phone to laptop", "sync text phone pc"],
  alternates: {
    canonical: "https://syncclip.in/copy-text-phone-to-computer",
  },
};

export default function CopyTextPhoneToComputer() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I copy text from my phone and paste it on my computer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To copy text from your phone to your computer instantly, use SyncClip. Open the website on both devices, join the same 6-character session, and any text you paste on your phone will appear on your computer in milliseconds."
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
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4 text-center md:text-left">Quick Answer // AEO Node</div>
            <p className="font-body text-xl md:text-2xl leading-relaxed font-bold italic">
              To copy text from phone to computer instantly, use a web-based clipboard bridge like SyncClip. By opening the tool on both browsers and pairing them via a session code, you can move text snippets, code, and links across Android, iPhone, Windows, and Mac browsers in under 100ms without installing software or creating accounts.
            </p>
          </div>

          <div className="mb-16 text-center md:text-left">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Direct Solution // V1.0</div>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              COPY_ TEXT_ PHONE_ TO_ COMPUTER_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-3xl mb-12">
               Moving text between your phone and computer shouldn&apos;t be a chore. Skip the email-self workflow and use the real-time clipboard protocol.
            </p>
          </div>

          {/* THE PROBLEM SECTION */}
          <section className="mb-24 border-t-2 border-black pt-16">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12 italic tracking-tighter leading-tight">Why_ It_ Was_ Slow_</h2>
             <div className="font-body text-lg text-zinc-700 leading-relaxed space-y-8 max-w-2xl">
                <p>
                   Most people still use &quot;Self-Emailing&quot; to move text from their phone to their PC. This is a 20th-century solution to a 21st-century problem. It litters your inbox, creates a permanent data trail, and takes way too long.
                </p>
                <p>
                   SyncClip provides a <strong>Distrubuted Clipboard Node</strong>. It acts as a temporary digital scratchpad that mirrors your clipboard across all active browser windows instantly.
                </p>
             </div>
          </section>

          {/* THE SOLUTION STEPS */}
          <section className="mb-24">
             <div className="grid md:grid-cols-2 gap-12">
                <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(5,125,188,1)]">
                   <h3 className="font-headline font-black uppercase text-2xl mb-6">01. Open the Bridge</h3>
                   <p className="text-zinc-600">Navigate to syncclip.in on your phone and computer. Tap &apos;Launch&apos; to create an anonymous session.</p>
                </div>
                <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                   <h3 className="font-headline font-black uppercase text-2xl mb-6">02. Copy & Paste</h3>
                   <p className="text-zinc-600">Paste the text on your phone. It lands on your computer screen in milliseconds. Zero clicks required.</p>
                </div>
             </div>
          </section>

          {/* COMPARISON */}
          <section className="mb-24 border-t-2 border-black pt-16">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12">The Speed Analysis</h2>
             <div className="overflow-x-auto border-2 border-black shadow-[15px_15px_0px_0px_rgba(5,125,188,0.1)]">
                <table className="w-full text-left font-body">
                   <thead>
                      <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-widest">
                         <th className="p-6 border-r border-zinc-800">Method</th>
                         <th className="p-6 border-r border-zinc-800 text-secondary">SyncClip</th>
                         <th className="p-6">Email / Cloud Note</th>
                      </tr>
                   </thead>
                   <tbody className="text-sm divide-y divide-black">
                      <tr>
                         <td className="p-6 font-bold border-r border-black bg-zinc-50 uppercase text-[11px] tracking-widest">Transfer Speed</td>
                         <td className="p-6 border-r border-black text-secondary font-black">INSTANT (&lt;100ms)</td>
                         <td className="p-6">SLOW (30s+)</td>
                      </tr>
                      <tr>
                         <td className="p-6 font-bold border-r border-black bg-zinc-50 uppercase text-[11px] tracking-widest">Steps Involved</td>
                         <td className="p-6 border-r border-black text-secondary font-black text-center">2</td>
                         <td className="p-6 text-center">8+</td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </section>

          {/* CTA */}
          <div className="bg-black text-white p-16 md:p-24 text-center border-b-[20px] border-secondary">
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-10 italic tracking-tighter leading-none">Sync_ Now_</h2>
            <Link href="/" className="inline-block bg-secondary text-black font-mono font-black py-6 px-16 hover:bg-white transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              LAUNCH_ NODE_ V4
            </Link>
          </div>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center font-mono text-[9px] tracking-widest text-zinc-400 uppercase gap-8">
          <div>© 2026 SYNCCLIP // PHONE-PC-SYNC-V1</div>
          <div className="flex gap-8">
            <Link href="/blog" className="hover:text-black">Guides</Link>
            <Link href="/clipboard" className="hover:text-black">Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
