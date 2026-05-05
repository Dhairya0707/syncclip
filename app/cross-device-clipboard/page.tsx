
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cross-Device Clipboard: Sync Text Between Any Devices",
  description: "The ultimate cross-device clipboard tool. Sync text and code between Android, iOS, Windows, and Mac instantly. No login, no app install, 100% free.",
  keywords: ["cross device clipboard", "sync clipboard between devices", "clipboard sharing tool", "multi device clipboard", "universal clipboard online"],
  alternates: {
    canonical: "https://syncclip.in/cross-device-clipboard",
  },
};

export default function CrossDeviceClipboard() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a cross-device clipboard?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A cross-device clipboard is a tool that allows you to copy text on one piece of hardware (like an Android phone) and paste it onto another (like a Windows PC) instantly. SyncClip provides a web-based cross-device clipboard that works on all browsers."
        }
      },
      {
        "@type": "Question",
        "name": "How do I sync my clipboard across different operating systems?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The easiest way to sync clipboards across OS boundaries (e.g., iPhone to Windows) is to use a browser-native tool like SyncClip. It uses WebSockets to bridge the gap between different operating systems without requiring native app installs."
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
          <div className="bg-zinc-900 text-white p-10 mb-16 border-l-[12px] border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)]">
            <div className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase mb-4">Quick Answer // AEO Node</div>
            <p className="font-body text-xl md:text-2xl leading-relaxed font-bold italic">
              A cross-device clipboard is a real-time utility that synchronizes text and code snippets between multiple hardware platforms (Android, iOS, Windows, Mac) using a centralized web node. Modern tools like SyncClip use WebSocket protocols to ensure sub-100ms latency, enabling a &quot;copy here, paste there&quot; workflow without account creation or app installation.
            </p>
          </div>

          <div className="mb-20 text-center md:text-left">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Ecosystem Bridge // V1.0</div>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-10">
              CROSS-DEVICE_ CLIPBOARD_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-3xl mb-12">
              Break the ecosystem walls. Sync your clipboard across every device you own, instantly and securely. No apps, no accounts, no friction.
            </p>
          </div>

          {/* ASSET - SYNC WORKFLOW */}
          <div className="mb-24">
             <div className="border-4 border-black p-4 bg-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all overflow-hidden">
                <img 
                  src="/sync-workflow.png" 
                  alt="SyncClip Cross Device Clipboard Workflow Diagram" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
             </div>
             <div className="font-mono text-[9px] text-zinc-400 mt-8 flex justify-between uppercase tracking-widest italic">
                <span>Fig 3.2: Multi-Node Handshake</span>
                <span>Distributed State Architecture // V4.0</span>
             </div>
          </div>

          {/* WHY IT WORKS */}
          <section className="mb-24 border-t-2 border-black pt-16">
            <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-12 italic tracking-tighter">The Virtual Ecosystem Advantage_</h2>
            <div className="font-body text-lg text-zinc-600 leading-relaxed space-y-8 max-w-3xl">
               <p>
                  Most <strong>cross-device clipboard</strong> solutions are trapped in &quot;Walled Gardens.&quot; Apple&apos;s Universal Clipboard works perfectly—but only if you stay within the Mac and iPhone ecosystem. Windows Phone Link is powerful—but only for Android and Windows users.
               </p>
               <p>
                  SyncClip operates at the <strong>application layer</strong>, meaning it doesn&apos;t care what brand of hardware you are using. By using your browser as the environment, it creates a &quot;Virtual Ecosystem&quot; that moves with you. Whether you are moving code from a Linux desktop to an iPad, or a 2FA code from an Android phone to a Mac, the protocol remains the same.
               </p>
            </div>
          </section>

          {/* CAPABILITY GRID */}
          <section className="mb-24">
             <div className="grid md:grid-cols-2 gap-8">
                <div className="border-2 border-black p-10 bg-white shadow-[10px_10px_0px_0px_rgba(5,125,188,1)]">
                   <h3 className="font-headline font-black uppercase text-2xl mb-4 text-secondary italic">OS Independence_</h3>
                   <p className="text-sm text-zinc-600 leading-relaxed">SyncClip bridges the gap between Windows, Mac, Linux, Android, and iOS instantly. No configuration required—just a browser and a handshake.</p>
                </div>
                <div className="border-2 border-black p-10 bg-white shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                   <h3 className="font-headline font-black uppercase text-2xl mb-4 italic">Zero Footprint_</h3>
                   <p className="text-sm text-zinc-600 leading-relaxed">Traditional tools leave trails on your cloud account. SyncClip uses ephemeral nodes that purge data automatically, ensuring your cross-device sharing stays private.</p>
                </div>
             </div>
          </section>

          {/* COMPARISON TABLE */}
          <section className="mb-24 border-t-2 border-black pt-16">
             <h2 className="font-headline text-3xl md:text-5xl font-black uppercase mb-10">Cross-OS Compatibility Matrix</h2>
             <div className="overflow-x-auto border-2 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0,0.05)]">
                <table className="w-full text-left font-body">
                   <thead>
                      <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-widest">
                         <th className="p-6 border-r border-zinc-800">Use Case</th>
                         <th className="p-6 border-r border-zinc-800 text-secondary">SyncClip Node</th>
                         <th className="p-6">Manufacturer Tools</th>
                      </tr>
                   </thead>
                   <tbody className="text-sm divide-y divide-black">
                      <tr>
                         <td className="p-6 font-bold border-r border-black bg-zinc-50 uppercase text-[11px] tracking-widest">Android ↔ Mac</td>
                         <td className="p-6 border-r border-black text-secondary font-black text-center">FULL SYNC</td>
                         <td className="p-6 text-center text-red-600 font-bold uppercase">Unsupported</td>
                      </tr>
                      <tr>
                         <td className="p-6 font-bold border-r border-black bg-zinc-50 uppercase text-[11px] tracking-widest">Windows ↔ iPhone</td>
                         <td className="p-6 border-r border-black text-secondary font-black text-center">FULL SYNC</td>
                         <td className="p-6 text-center text-red-600 font-bold uppercase">Unsupported</td>
                      </tr>
                      <tr>
                         <td className="p-6 font-bold border-r border-black bg-zinc-50 uppercase text-[11px] tracking-widest">Linux ↔ Tablet</td>
                         <td className="p-6 border-r border-black text-secondary font-black text-center">FULL SYNC</td>
                         <td className="p-6 text-center text-red-600 font-bold uppercase">Unsupported</td>
                      </tr>
                   </tbody>
                </table>
             </div>
          </section>

          {/* CTA */}
          <div className="bg-zinc-900 text-white p-16 md:p-24 text-center border-b-8 border-secondary shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline text-4xl md:text-7xl font-black uppercase mb-10 italic tracking-tighter leading-none">Connect_ Your_ Stack_</h2>
            <Link href="/" className="inline-block bg-secondary text-black font-mono font-black py-6 px-16 hover:bg-white transition-all uppercase tracking-widest text-xl shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              LAUNCH_ CROSS_ SYNC_
            </Link>
          </div>
        </article>
      </main>

      <footer className="w-full border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center font-mono text-[9px] tracking-widest text-zinc-400 uppercase gap-8">
          <div>© 2026 SYNCCLIP // CROSS-DEVICE-V1</div>
          <div className="flex gap-8">
            <Link href="/blog" className="hover:text-black transition-colors">Archive</Link>
            <Link href="/clipboard" className="hover:text-black transition-colors">Hub</Link>
            <Link href="/privacy" className="hover:text-black transition-colors">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
