
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "5 Ways to Copy Text Between Phone and Laptop (No App Needed)",
  description: "Stop emailing yourself snippets. Here are 5 ways to copy text between your phone and laptop instantly, including free web-based sync tools.",
};

export default function Blog2() {
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
        <article className="max-w-3xl mx-auto">
          <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Workflow Hacks // 2026</div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-headline leading-tight text-black mb-8">
            5 Ways to Copy Text Between Phone and Laptop
          </h1>

          <div className="prose prose-zinc max-w-none font-body text-base text-zinc-700 leading-relaxed space-y-8">
            <p>
              We&apos;ve all been there: you find a long URL or a code snippet on your phone, and you need it on your laptop <em>right now</em>. Most people resort to emailing themselves, but there are much faster ways to <strong>copy text between phone and laptop</strong>.
            </p>

            <section>
              <h2 className="font-headline font-black text-2xl uppercase mb-4">1. SyncClip (The Fastest Web Method)</h2>
              <p>
                The most efficient "no-app" method. Open <Link href="/clipboard" className="text-secondary underline font-bold">SyncClip</Link> on both browsers. No login, no account. It uses WebSockets to bridge the two devices in milliseconds.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-2xl uppercase mb-4">2. Native Ecosystems (iCloud/Windows)</h2>
              <p>
                If you use an iPhone and a Mac, <strong>Universal Clipboard</strong> is your best friend. For Android and Windows, the <strong>Phone Link</strong> app offers a similar (though slightly more complex) setup.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-2xl uppercase mb-4">3. Messaging &quot;Saved Messages&quot;</h2>
              <p>
                Slack, Telegram, and WhatsApp all have &quot;Message Yourself&quot; features. It&apos;s reliable but cluttered, and your data stays on their servers forever.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-2xl uppercase mb-4">4. Shared Notes (Keep/Notes)</h2>
              <p>
                Google Keep or Apple Notes sync across devices, but they require you to create a new note just to move a single string of text. High friction.
              </p>
            </section>

            <section>
              <h2 className="font-headline font-black text-2xl uppercase mb-4">5. QR Code Generators</h2>
              <p>
                You can generate a QR code for your text on one device and scan it with the other. Great for short URLs, but terrible for long paragraphs or code snippets.
              </p>
            </section>

            <div className="bg-black text-white p-10 mt-12 border-4 border-secondary shadow-[12px_12px_0px_0px_rgba(5,125,188,1)]">
              <h3 className="font-headline font-black uppercase text-2xl mb-4 italic">The Verdict</h3>
              <p className="font-mono text-sm leading-relaxed">
                If you want speed without the "walled garden" limitations, a browser-native <strong>online clipboard</strong> is the ultimate winner. Skip the install. Just sync.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t-2 border-black">
            <Link href="/" className="inline-block bg-secondary text-black font-mono font-black py-4 px-10 hover:bg-black hover:text-white transition-all uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              Launch SyncClip_
            </Link>
          </div>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center">
            © 2026 SYNCCLIP // OPTIMIZED WORKFLOWS
          </div>
        </div>
      </footer>
    </div>
  );
}
