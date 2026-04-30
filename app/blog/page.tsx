
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Productivity Blog — Cross-Device Workflow Tips",
  description: "Read the latest tips on how to sync your clipboard, copy text between devices, and streamline your workflow with modern web tools.",
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
      tag: "Workflow // 2026",
    },
    {
      title: "Why You Should Stop Emailing Yourself Notes",
      desc: "Emailing yourself snippets is a broken workflow. Discover how an online clipboard can save you hours of friction.",
      slug: "stop-emailing-yourself-notes",
      tag: "Productivity // Habits",
    },
    {
      title: "How to Sync Clipboard Between Devices",
      desc: "Master the 2026 workflow for cross-OS clipboard synchronization without app fatigue.",
      slug: "how-to-sync-clipboard-between-devices",
      tag: "Guide // 2026",
    },
    {
      title: "5 Ways to Copy Text Between Phone & Laptop",
      desc: "Stop emailing yourself. Here are 5 ways to move snippets instantly in 30 seconds or less.",
      slug: "5-ways-to-copy-text-between-phone-and-laptop",
      tag: "Listicle // Workflow",
    },
    {
      title: "Best Online Clipboard Tools in 2026",
      desc: "An audit of the top clipboard sync tools. Why browser-native beats installed apps.",
      slug: "best-online-clipboard-tools-2026",
      tag: "Comparison // Audit",
    },
    {
      title: "Is an Online Clipboard Secure?",
      desc: "Are online clipboard tools safe? Learn about encryption, ephemeral storage, and transience.",
      slug: "is-online-clipboard-secure",
      tag: "Security // Privacy",
    },
  ];

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      {/* NAV */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/clipboard" className="text-zinc-400 hover:text-white transition-colors">CLIPBOARD</Link>
          <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">ABOUT</Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6">
        <div className="max-w-7xl mx-auto">
          {/* HERO */}
          <div className="mb-16">
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">SyncClip // Knowledge Base</div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-8">
              PRODUCTIVITY_ HUB
            </h1>
            <p className="font-body text-xl md:text-2xl leading-relaxed text-zinc-600 max-w-3xl">
              Insights, guides, and workflows to help you master cross-device synchronization and eliminate digital friction.
            </p>
          </div>

          {/* BLOG GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 border-t-2 border-black pt-12">
            {blogs.map((blog, index) => (
              <Link key={index} href={`/blog/${blog.slug}`} className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[9px] text-zinc-400 mb-4 uppercase">{blog.tag}</div>
                  <h3 className="font-headline font-black uppercase text-xl mb-4">{blog.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-6">{blog.desc}</p>
                </div>
                <span className="text-secondary font-mono text-[10px] font-bold uppercase tracking-widest border-b border-secondary inline-block self-start">Read Article _</span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP // EDITORIAL CONTENT
          </div>
        </div>
      </footer>
    </div>
  );
}
