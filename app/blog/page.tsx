
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SyncClip Knowledge Base — Master Your Cross-Device Workflow",
  description: "Explore deep technical guides, productivity hacks, and security audits for cross-device clipboard synchronization in 2026.",
  alternates: {
    canonical: "https://syncclip.in/blog",
  },
};

export default function BlogIndex() {
  const blogs = [
    {
      title: "How to Copy Text from Android to Mac (Without Apps)",
      desc: "Learn the fastest way to move text from an Android phone to a Mac computer in 2026 without installing background apps.",
      slug: "how-to-copy-text-from-android-to-mac",
      tag: "Top Choice // Guide",
    },
    {
      title: "Why You Should Stop Emailing Yourself Notes",
      desc: "Emailing yourself snippets is a broken workflow. Discover how an online clipboard can save you hours of friction.",
      slug: "stop-emailing-yourself-notes",
      tag: "Productivity // Habits",
    },
    {
      title: "Is an Online Clipboard Secure?",
      desc: "Are online clipboard tools safe? Learn about encryption, ephemeral storage, and the transience protocol.",
      slug: "is-online-clipboard-secure",
      tag: "Security // Privacy",
    },
    {
      title: "Online Clipboard: Best Free Sync Tools for 2026",
      desc: "An audit of the top clipboard sync tools. Why browser-native beats installed apps for transient data.",
      slug: "best-online-clipboard-tools-2026",
      tag: "Comparison // Audit",
    },
    {
      title: "5 Ways to Copy Text Between Phone & Laptop",
      desc: "Stop emailing yourself. Here are 5 ways to move snippets instantly in 30 seconds or less.",
      slug: "5-ways-to-copy-text-between-phone-and-laptop",
      tag: "Listicle // Workflow",
    },
    {
      title: "How to Sync Clipboard Between Devices",
      desc: "Master the 2026 workflow for cross-OS clipboard synchronization without app fatigue.",
      slug: "how-to-sync-clipboard-between-devices",
      tag: "Guide // 2026",
    },
    {
      title: "What is a Live Clipboard?",
      desc: "Discover the new way to sync devices instantly without apps or cloud storage. Learn about the live clipboard protocol.",
      slug: "what-is-a-live-clipboard",
      tag: "Tech // Concept",
    },
    {
      title: "How to Share Your Clipboard Online",
      desc: "Stop emailing yourself. Learn how to share your clipboard instantly using real-time WebSockets.",
      slug: "how-to-share-clipboard-online",
      tag: "Workflow // Guide",
    },
    {
      title: "SyncClip vs Universal Clipboard",
      desc: "Bridge the gap between Android, iPhone, and PC without ecosystem walls.",
      slug: "syncclip-vs-universal-clipboard",
      tag: "Analysis // Ecosystem",
    },
  ];

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      {/* NAV */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/clipboard" className="text-zinc-400 hover:text-white transition-colors">PILLAR HUB</Link>
          <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">ABOUT</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <div className="max-w-7xl mx-auto">
          {/* HERO */}
          <div className="mb-20">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Archive // Knowledge Base</div>
            <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter font-headline leading-[0.8] text-black mb-8">
              KNOWLEDGE_ BASE_
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-3xl">
              Technical insights and optimized workflows for cross-device synchronization. Eliminate digital friction in 2026.
            </p>
          </div>

          {/* FEATURED SECTION */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
             <Link href="/clipboard" className="bg-zinc-900 text-white p-12 flex flex-col justify-between border-t-8 border-secondary shadow-[20px_20px_0px_0px_rgba(5,125,188,0.1)] group">
                <div>
                   <div className="font-mono text-[10px] text-secondary uppercase tracking-widest mb-6 italic">Featured Pillar Hub</div>
                   <h2 className="font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none mb-6 group-hover:text-secondary transition-colors">The Master_ Clipboard_ Protocol_</h2>
                   <p className="text-zinc-400 text-lg leading-relaxed mb-8">Access our complete directory of cross-device syncing solutions, technical comparisons, and one-click launch nodes.</p>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest border-b border-white self-start pb-1">Enter The Hub →</span>
             </Link>
             <div className="flex flex-col gap-8">
                <div className="border-2 border-black p-8 bg-white">
                   <h3 className="font-headline font-black uppercase text-xl mb-4">Master The Stack_</h3>
                   <p className="text-sm text-zinc-600 mb-6">Our guides are built for developers and power users who need to bridge the gap between Android, iOS, Windows, and Mac without ecosystem walls.</p>
                   <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-zinc-100 font-mono text-[10px] uppercase tracking-widest border border-zinc-200">AEO Node</span>
                      <span className="px-3 py-1 bg-zinc-100 font-mono text-[10px] uppercase tracking-widest border border-zinc-200">WebSocket Tunnel</span>
                      <span className="px-3 py-1 bg-zinc-100 font-mono text-[10px] uppercase tracking-widest border border-zinc-200">Ephemeral State</span>
                   </div>
                </div>
                <div className="border-2 border-black p-8 bg-zinc-50 flex-grow">
                   <h3 className="font-headline font-black uppercase text-xl mb-4">Latest Audit_</h3>
                   <p className="text-sm text-zinc-600 mb-4 italic">Updated for Q2 2026: &quot;Why browser-native protocol is replacing installed extensions for transient data.&quot;</p>
                   <Link href="/blog/is-online-clipboard-secure" className="text-secondary font-black font-mono text-[10px] uppercase tracking-widest">Read Audit _</Link>
                </div>
             </div>
          </div>

          {/* BLOG GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 border-t-2 border-black pt-16">
            {blogs.map((blog, index) => (
              <Link key={index} href={`/blog/${blog.slug}`} className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[9px] text-zinc-400 mb-4 uppercase">{blog.tag}</div>
                  <h3 className="font-headline font-black uppercase text-xl mb-4 leading-tight">{blog.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-8 italic">{blog.desc}</p>
                </div>
                <span className="text-secondary font-mono text-[10px] font-black uppercase tracking-widest border-b-2 border-secondary inline-block self-start pb-1">View Full Protocol _</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[9px] tracking-widest text-zinc-400 uppercase">
          <div>© {new Date().getFullYear()} SYNCCLIP // ARCHIVE-V4</div>
          <div className="flex gap-8">
             <Link href="/" className="hover:text-black">Home</Link>
             <Link href="/clipboard" className="hover:text-black">Hub</Link>
             <Link href="/privacy" className="hover:text-black">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
