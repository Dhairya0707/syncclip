
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Clipboard — Free Online Clipboard to Share Text Between Devices",
  description: "Use this free online clipboard to instantly copy and paste text between your phone, laptop, and tablet. No login, no app install. Sync your clipboard across all devices in real-time.",
  keywords: ["clipboard", "online clipboard", "clipboard online", "free clipboard", "clipboard tool", "clipboard app", "clipboard sharing", "share clipboard", "clipboard sync", "text clipboard online"],
  alternates: {
    canonical: "https://syncclip.in/clipboard",
  },
  openGraph: {
    title: "Free Online Clipboard — Share Text Between Any Devices",
    description: "The fastest free clipboard to copy and paste text across devices. No login, no tracking, instant sync.",
  },
};

export default function ClipboardPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SyncClip Online Clipboard",
    "alternateName": ["Free Online Clipboard", "Clipboard Tool", "Clipboard Sharing App"],
    "url": "https://syncclip.in/clipboard",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Free online clipboard to copy and paste text between phone, laptop, and tablet. Sync clipboard across devices with no login."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an online clipboard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An online clipboard is a web-based tool that lets you copy and paste text between different devices like phones, laptops, and tablets without installing any software. SyncClip is a free online clipboard that works instantly in your browser."
        }
      },
      {
        "@type": "Question",
        "name": "How do I use an online clipboard to copy text between devices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Open syncclip.in on both devices, create or join a session using the 6-character code, and paste text on one device. It instantly appears on the other device through real-time WebSocket sync."
        }
      },
      {
        "@type": "Question",
        "name": "Is online clipboard sharing safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SyncClip uses SSL encryption for all data in transit. Sessions are ephemeral and auto-delete after 24 hours. You can also enable Burn After Reading mode to destroy data immediately after it is accessed."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to install an app to use an online clipboard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SyncClip runs entirely in your web browser. No downloads, no plugins, and no account creation required. It works on Chrome, Safari, Firefox, and Edge across all operating systems."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best free clipboard for Android and Windows?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SyncClip is the best free clipboard for syncing between Android and Windows. Unlike native tools that are locked to one ecosystem, SyncClip works across all operating systems through the browser."
        }
      }
    ]
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* NAV */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/online-clipboard" className="text-zinc-400 hover:text-white transition-colors">ONLINE CLIPBOARD</Link>
          <Link href="/clipboard-sync-guide" className="text-zinc-400 hover:text-white transition-colors">GUIDE</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <article className="max-w-4xl mx-auto">
          
          {/* HERO */}
          <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Free Clipboard Tool // No Login Required</div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              FREE ONLINE CLIPBOARD_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-3xl mb-12">
              Need to <strong>copy and paste text between devices</strong>? Use this free online clipboard to sync your clipboard between phone, laptop, and tablet instantly. No login, no app install, no tracking.
            </p>
            <Link href="/" className="inline-block bg-black text-white font-mono font-black py-5 px-12 hover:bg-secondary transition-colors uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(5,125,188,1)]">
              Open Clipboard Now_
            </Link>
          </div>

          {/* SECTION: WHAT IS AN ONLINE CLIPBOARD */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">What is an Online Clipboard?</h2>
            <div className="grid md:grid-cols-2 gap-10 font-body text-base text-zinc-700 leading-relaxed">
              <div>
                <p className="mb-6">
                  An <strong>online clipboard</strong> is a web-based tool that allows you to copy text, code snippets, URLs, or any string of data on one device and instantly paste it on another. Unlike your device&apos;s built-in clipboard (which only works locally), an online clipboard bridges the gap between different operating systems and devices.
                </p>
                <p>
                  Traditional clipboard tools require app installations, account signups, or are locked to specific ecosystems (like Apple&apos;s Universal Clipboard). A modern <strong>clipboard sharing tool</strong> like SyncClip eliminates all of that friction.
                </p>
              </div>
              <div className="bg-zinc-100 p-8 border-2 border-black">
                <h3 className="font-headline font-black uppercase text-lg mb-4">Use Cases for Online Clipboard:</h3>
                <ul className="space-y-3 text-sm text-zinc-600">
                  <li className="flex gap-2"><span className="text-secondary font-bold">→</span> <strong>Copy paste between phone and PC</strong> without emailing yourself</li>
                  <li className="flex gap-2"><span className="text-secondary font-bold">→</span> Share <strong>clipboard online</strong> with another person instantly</li>
                  <li className="flex gap-2"><span className="text-secondary font-bold">→</span> <strong>Sync clipboard between devices</strong> across different operating systems</li>
                  <li className="flex gap-2"><span className="text-secondary font-bold">→</span> Move 2FA codes from phone to desktop browser</li>
                  <li className="flex gap-2"><span className="text-secondary font-bold">→</span> Transfer code snippets between IDE and mobile</li>
                </ul>
              </div>
            </div>
          </section>

          {/* SECTION: HOW TO USE */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">How to Use This Free Clipboard</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-mono text-4xl font-black text-secondary">01</span>
                <h3 className="font-headline font-black uppercase text-xl my-4">Open Clipboard</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">Go to <Link href="/" className="text-secondary underline">syncclip.in</Link> on your first device. Click &quot;Create Session&quot; to start a new clipboard session.</p>
              </div>
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(5,125,188,1)]">
                <span className="font-mono text-4xl font-black text-secondary">02</span>
                <h3 className="font-headline font-black uppercase text-xl my-4">Connect Devices</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">Enter the 6-character code on your second device, or scan the QR code. Both devices are now connected to the same clipboard.</p>
              </div>
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-mono text-4xl font-black text-secondary">03</span>
                <h3 className="font-headline font-black uppercase text-xl my-4">Copy &amp; Paste</h3>
                <p className="font-body text-sm text-zinc-600 leading-relaxed">Paste text on one device. It appears on the other instantly. Use the &quot;Copy&quot; button to grab it to your local clipboard.</p>
              </div>
            </div>
          </section>

          {/* SECTION: WHY THIS CLIPBOARD IS DIFFERENT */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-8">Why This Clipboard Tool is Different</h2>
            <div className="space-y-6 font-body text-base text-zinc-700 leading-relaxed max-w-3xl">
              <p>
                Most <strong>clipboard sharing tools</strong> require you to download an app, create an account, or pay for a subscription. SyncClip is different because it runs entirely in your browser.
              </p>
              <p>
                Need an <strong>online clipboard</strong> for a quick copy paste between your Android phone and Windows laptop? Just open the URL. No Google login. No Play Store download. No permissions. Your clipboard data is encrypted in transit and automatically deleted after 24 hours.
              </p>
              <p>
                Whether you search for &quot;<strong>clipboard online</strong>&quot;, &quot;<strong>free clipboard tool</strong>&quot;, or &quot;<strong>share clipboard online</strong>&quot; — SyncClip is the answer. It works on every browser, every OS, every device.
              </p>
            </div>
          </section>

          {/* SECTION: COMPARISON TABLE */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">Clipboard Tools Compared</h2>
            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full text-left border-collapse font-body">
                <thead>
                  <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-widest">
                    <th className="p-4 border-r border-zinc-800">Feature</th>
                    <th className="p-4 border-r border-zinc-800 text-secondary">SyncClip</th>
                    <th className="p-4 border-r border-zinc-800">Pushbullet</th>
                    <th className="p-4">Apple Clipboard</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-black">
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">App Install?</td>
                    <td className="p-4 border-r border-black text-secondary font-bold">NO</td>
                    <td className="p-4 border-r border-black">YES</td>
                    <td className="p-4">Built-in</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">Login Required?</td>
                    <td className="p-4 border-r border-black text-secondary font-bold">NO</td>
                    <td className="p-4 border-r border-black">YES</td>
                    <td className="p-4">YES (iCloud)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">Cross-Platform?</td>
                    <td className="p-4 border-r border-black text-secondary font-bold">ALL DEVICES</td>
                    <td className="p-4 border-r border-black">Android/Win</td>
                    <td className="p-4">Apple Only</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold border-r border-black bg-zinc-50">Price</td>
                    <td className="p-4 border-r border-black text-secondary font-bold">FREE</td>
                    <td className="p-4 border-r border-black">$4.99/mo</td>
                    <td className="p-4">Free (Apple)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="mb-20 border-t-2 border-black pt-12">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-tight mb-10">Clipboard FAQ</h2>
            <div className="space-y-8">
              {faqSchema.mainEntity.map((faq, index) => (
                <div key={index} className="border-b border-zinc-200 pb-8">
                  <h3 className="font-headline text-xl font-black uppercase mb-4">{faq.name}</h3>
                  <p className="font-body text-base text-zinc-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-black text-white p-12 text-center">
            <h2 className="font-headline text-4xl md:text-6xl font-black uppercase mb-6 italic">Start Using This Clipboard_</h2>
            <p className="font-mono text-sm tracking-widest mb-10 text-zinc-400">FREE · NO LOGIN · NO APP · INSTANT SYNC</p>
            <Link href="/" className="inline-block bg-secondary text-black font-mono font-black py-4 px-10 hover:bg-white transition-colors uppercase tracking-widest text-lg shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              Open Free Clipboard_
            </Link>
          </section>

        </article>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // ONLINE CLIPBOARD // FREE TOOL
          </div>
          <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
            <Link href="/" className="text-zinc-500 hover:text-secondary transition-colors">Home</Link>
            <Link href="/online-clipboard" className="text-zinc-500 hover:text-secondary transition-colors">Online Clipboard</Link>
            <Link href="/clipboard-sync-guide" className="text-zinc-500 hover:text-secondary transition-colors">Guide</Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-secondary transition-colors">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
