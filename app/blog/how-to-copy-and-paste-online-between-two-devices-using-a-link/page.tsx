import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Copy and Paste Online Between Two Devices Using a Link",
  description: "Learn how to instantly copy and paste text between your phone and computer using a simple URL link. No apps or logins required.",
  alternates: {
    canonical: "https://syncclip.in/blog/how-to-copy-and-paste-online-between-two-devices-using-a-link",
  },
};

export default function HowToCopyPasteLink() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I copy and paste between two devices using a link?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can use an online clipboard like SyncClip. Generate a session link on your first device, open that link on your second device, and any text you copy will instantly sync between them via WebSockets."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to download an app to sync text via a link?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The process works entirely in your web browser. You do not need to install any apps or create an account."
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
      {/* NAV */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/blog" className="text-zinc-400 hover:text-white transition-colors">BLOG</Link>
          <Link href="/clipboard" className="text-zinc-400 hover:text-white transition-colors">CLIPBOARD</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          {/* QUICK ANSWER BOX */}
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4 text-center md:text-left">Quick Answer // AEO Node</div>
            <p className="font-body text-xl md:text-2xl leading-relaxed italic text-center md:text-left">
              <strong>Quick Answer:</strong> To copy and paste online between two devices using a link, open an ephemeral web clipboard like SyncClip. It generates a unique URL for your session. Simply open that link on your second device, and you can instantly copy text on one screen and paste it on the other without downloading any apps.
            </p>
          </div>

          {/* HEADER */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-headline leading-[0.9] text-black mb-8">
              How to Copy & Paste Online Between Two Devices <span className="text-secondary italic font-serif text-4xl block mt-2">Using a Link_</span>
            </h1>
          </div>

          {/* CONTENT */}
          <div className="prose prose-zinc max-w-none font-body text-lg text-zinc-800 leading-relaxed space-y-10">
            <section>
              <p>
                We've all been there: you have a long URL, a 2FA code, or a paragraph of text on your phone that you need on your laptop right now. You don't want to install an app, log into an account, or send yourself another cluttered email. You just want to <strong>copy on device A and paste on device B</strong>.
              </p>
              <p>
                In 2026, the absolute easiest way to do this is using a simple URL link. Here is exactly how to do it using a browser-native clipboard sync tool.
              </p>
            </section>

            <section className="bg-zinc-100 p-10 border-2 border-black">
              <h2 className="font-headline font-black text-3xl uppercase mb-6 mt-0">The 3-Step Process</h2>
              <ol className="space-y-6 font-mono text-sm">
                <li><strong className="text-black uppercase">Step 1: Generate the Link</strong> — Open <Link href="/" className="text-secondary hover:underline">SyncClip.in</Link> on your first device and click 'Launch'. The system instantly generates a secure, random 6-character session link (e.g., syncclip.in/AB12CD).</li>
                <li><strong className="text-black uppercase">Step 2: Open on Device Two</strong> — Open that exact link on your second device's web browser. The two devices are now cryptographically paired via a WebSocket tunnel.</li>
                <li><strong className="text-black uppercase">Step 3: Copy and Paste</strong> — Type or paste text into the text box on your phone. It will magically appear on your computer screen in under 100 milliseconds. Copy it and you're done.</li>
              </ol>
            </section>

            <section>
              <h2 className="font-headline font-black text-4xl uppercase mb-6 inline-block border-b-4 border-black pb-2">Why WebSockets Beat Apps</h2>
              <p>
                Traditional clipboard managers require you to download a background application (like Pushbullet) and grant it sweeping permissions to read your operating system's clipboard. This drains your battery, requires account registration, and often costs money.
              </p>
              <p>
                By using a <strong>URL link</strong> to bridge the devices, you keep everything sandboxed inside the browser. It works instantly across Android, iOS, Mac, Windows, and Linux. When you close the tab, the connection is severed and the session is destroyed.
              </p>
            </section>
          </div>

          <div className="mt-16 pt-12 border-t-4 border-black text-center">
            <h2 className="font-headline text-3xl font-black uppercase mb-6">Start Syncing Now</h2>
            <Link href="/" className="inline-block bg-secondary text-white font-mono font-black py-5 px-12 hover:bg-black transition-colors uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2">
              Generate Link_
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
