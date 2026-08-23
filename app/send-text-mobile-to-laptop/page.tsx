
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Send Text from Mobile to Laptop Instantly (No Apps)",
  description: "The fastest way to send text from your mobile phone to your laptop instantly. No login, no app install, and no cables. Works on Android, iPhone, Windows, and Mac.",
  keywords: ["send text mobile to laptop", "transfer text from phone to pc", "share text mobile to computer", "copy paste phone to laptop", "sync text mobile pc"],
  alternates: {
    canonical: "https://syncclip.in/send-text-mobile-to-laptop",
  },
};

export default function SendTextMobileToLaptop() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I send text from my phone to my laptop instantly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The fastest way is to use SyncClip. Open the website on your phone and laptop, join the same session code, and paste your text. It will appear on your laptop instantly through a real-time WebSocket connection."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to install an app to share text between mobile and laptop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SyncClip works entirely in your web browser, allowing you to move text between mobile and laptop without downloading any software or creating an account."
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
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4 text-center md:text-left">Quick Answer // AEO Node</div>
            <p className="font-body text-xl md:text-2xl leading-relaxed font-bold italic">
              To send text from mobile to laptop instantly, use a web-based <Link href="/clipboard" className="text-secondary underline hover:text-white">online clipboard</Link> like SyncClip. By connecting both devices to a real-time session via a 6-character code or QR scan, you can sync text across Android, iOS, Windows, and Mac browsers in under 100ms without installing apps or logging in.
            </p>
          </div>

          <div className="mb-16 text-center md:text-left">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Task-Oriented Workflow // V1.0</div>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              SEND_ TEXT_ MOBILE_ TO_ LAPTOP_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-2xl mb-12">
              Stop emailing yourself snippets. Start sending text from your phone to your laptop in real-time with the protocol built for speed.
            </p>
          </div>

          {/* HOW TO STEPS */}
          <section className="mb-24 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12 italic">The 3-Second Transfer_</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-50 transition-colors">
                <div className="bg-black text-white w-10 h-10 flex items-center justify-center font-mono font-black mb-6 shadow-[4px_4px_0px_0px_rgba(5,125,188,1)]">01</div>
                <h3 className="font-headline font-black uppercase text-xl mb-4">Open & Launch</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-body">
                  Navigate to <Link href="/" className="text-secondary underline">SyncClip</Link> on your mobile browser. Tap the <strong>&quot;Generate Session&quot;</strong> button to create your unique, ephemeral sharing node.
                </p>
              </div>
              <div className="p-8 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(5,125,188,1)] hover:bg-zinc-50 transition-colors">
                <div className="bg-secondary text-black w-10 h-10 flex items-center justify-center font-mono font-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">02</div>
                <h3 className="font-headline font-black uppercase text-xl mb-4">Mirror Code</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-body">
                   On your laptop, enter the 6-character code displayed on your phone, or simply scan the QR code. The devices are now locked in a real-time WebSocket handshake.
                </p>
              </div>
              <div className="p-8 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-50 transition-colors">
                <div className="bg-black text-white w-10 h-10 flex items-center justify-center font-mono font-black mb-6 shadow-[4px_4px_0px_0px_rgba(5,125,188,1)]">03</div>
                <h3 className="font-headline font-black uppercase text-xl mb-4">Instant Sync</h3>
                <p className="text-sm text-zinc-600 leading-relaxed font-body">
                   Paste your text into the mobile dashboard. Within 100ms, the snippet appears on your laptop screen. No &quot;Send&quot; button, no lag, just pure data flow.
                </p>
              </div>
            </div>
          </section>

          {/* DEEP DIVE SECTION */}
          <section className="mb-24 space-y-10">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight">Why Mobile-to-Laptop Sync is Broken</h2>
             <div className="font-body text-lg text-zinc-600 leading-relaxed space-y-6 max-w-3xl">
                <p>
                   Most users still rely on &quot;Self-Emailing&quot; or &quot;Slack Saved Messages&quot; to move text. These methods aren&apos;t just slow—they are invasive. They leave a permanent trail of transient data on company servers and require you to be logged into multiple accounts.
                </p>
                <p>
                   A <strong>mobile-to-laptop clipboard</strong> should be like a physical cable: direct, temporary, and friction-free. SyncClip provides that digital cable by using ephemeral nodes that exist only as long as you need them.
                </p>
             </div>
          </section>

          {/* COMPARISON TABLE */}
          <section className="mb-24 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-10">Transfer Protocol Analysis</h2>
            <div className="overflow-x-auto border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <table className="w-full text-left font-body">
                <thead>
                  <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-widest">
                    <th className="p-6 border-r border-zinc-800">Capability</th>
                    <th className="p-6 border-r border-zinc-800 text-secondary">SyncClip Node</th>
                    <th className="p-6">Email / WhatsApp Self</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-black">
                  <tr>
                    <td className="p-6 font-bold border-r border-black bg-zinc-50 uppercase text-[11px] tracking-widest">Latency</td>
                    <td className="p-6 border-r border-black text-secondary font-black">&lt; 100ms (Real-time)</td>
                    <td className="p-6">30s - 2min (Async)</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-bold border-r border-black bg-zinc-50 uppercase text-[11px] tracking-widest">Data Trail</td>
                    <td className="p-6 border-r border-black text-secondary font-black">Zero (Auto-Purge)</td>
                    <td className="p-6">Permanent (Stored)</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-bold border-r border-black bg-zinc-50 uppercase text-[11px] tracking-widest">Account Req.</td>
                    <td className="p-6 border-r border-black text-secondary font-black text-center font-black">NO</td>
                    <td className="p-6 text-center font-black">YES</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-black text-white p-16 md:p-24 text-center shadow-[20px_20px_0px_0px_rgba(5,125,188,1)] border-t-8 border-secondary">
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-10 italic tracking-tighter leading-none">Bridge_ The_ Gap_</h2>
            <Link href="/" className="inline-block bg-secondary text-black font-mono font-black py-6 px-16 hover:bg-white transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              OPEN_ SYNCCLIP_ NOW
            </Link>
          </div>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center font-mono text-[9px] tracking-widest text-zinc-400 uppercase gap-6">
          <div>© 2026 SYNCCLIP // MOBILE-TO-LAPTOP-V1</div>
          <div className="flex gap-8">
            <Link href="/blog" className="border-b border-zinc-200 pb-1">Archive</Link>
            <Link href="/clipboard" className="border-b border-zinc-200 pb-1">Hub</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
