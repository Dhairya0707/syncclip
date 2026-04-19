"use client";

import { useState } from "react";
import Link from "next/link";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Node Connection Issue",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const response = await fetch("https://mailservice-five.vercel.app/api/contact/syncclip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", inquiryType: "Node Connection Issue", message: "" });
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Protocol transmission failed.");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to connect to the mail service.");
    }
  };

  return (
    <div className="bg-surface font-body min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-6">
          <Link href="/support" className="text-secondary border-b border-transparent font-bold">
            SUPPORT
          </Link>
        </nav>
      </header>

      <main className="pt-24 pb-20 flex-grow px-6 md:px-12 max-w-4xl mx-auto w-full">
        <div className="mb-16">
          <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-4 uppercase">Direct Line</div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter font-headline leading-none text-black mb-6">
            SUPPORT_
          </h1>
          <p className="font-body text-xl md:text-2xl leading-relaxed italic text-zinc-600 max-w-2xl">
            Having trouble with the protocol? Connect with our archivists for node diagnostics, feature requests, or general inquiries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-12">
            <div>
              <h2 className="font-headline text-2xl mb-4 font-bold uppercase tracking-tight">Direct Communications</h2>
              <div className="space-y-4 font-mono text-sm tracking-wider">
                <div className="flex gap-4 p-4 border border-zinc-200">
                  <span className="material-symbols-outlined text-secondary">mail</span>
                  <a href="mailto:support.dhairyadarji@gmail.com" className="hover:text-secondary transition-colors">support.dhairyadarji@gmail.com</a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-headline text-2xl mb-4 font-bold uppercase tracking-tight">System Status</h2>
              <div className="border-l-4 border-secondary pl-6 py-2">
                <div className="font-mono text-xs font-bold text-secondary flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                  ALL SYSTEMS OPERATIONAL
                </div>
                <p className="text-sm text-zinc-600">The Convex realtime engine is currently responding optimally.</p>
              </div>
            </div>
          </div>

          {/* Form Shell */}
          <div>
            {status === "success" ? (
              <div className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center space-y-4">
                <span className="material-symbols-outlined text-secondary text-5xl">check_circle</span>
                <h3 className="font-headline text-2xl font-bold uppercase">Transmission Confirmed</h3>
                <p className="font-body text-zinc-600">Your inquiry has been logged. Expect a response within 1-2 working days.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-4 w-full bg-black text-white font-mono text-[10px] py-4 uppercase tracking-widest hover:bg-secondary transition-colors"
                >
                  New Transmission
                </button>
              </div>
            ) : (
              <form className="border-2 border-black p-8 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6" onSubmit={handleSubmit}>
                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 p-4 text-red-600 font-mono text-xs flex gap-2 items-center">
                    <span className="material-symbols-outlined text-sm">error</span>
                    {errorMsg.toUpperCase()}
                  </div>
                )}
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase mb-2">Operator Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b-2 border-zinc-300 p-3 bg-transparent font-body focus:outline-none focus:border-black transition-colors" 
                    placeholder="Enter your name" 
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase mb-2">Email / ID</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b-2 border-zinc-300 p-3 bg-transparent font-body focus:outline-none focus:border-black transition-colors" 
                    placeholder="your@email.com" 
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase mb-2">Inquiry Type</label>
                  <select 
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full border-b-2 border-zinc-300 p-3 bg-transparent font-body focus:outline-none focus:border-black transition-colors uppercase text-sm"
                  >
                    <option>Node Connection Issue</option>
                    <option>Feature Request</option>
                    <option>Protocol Security</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-widest uppercase mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border-2 border-zinc-300 p-4 bg-transparent font-body focus:outline-none focus:border-black transition-colors resize-none" 
                    placeholder="Detail your transmission..."
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 w-full bg-zinc-900 text-white font-label font-bold py-4 uppercase tracking-widest text-sm hover:bg-secondary transition-colors disabled:bg-zinc-400 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "Transmitting..." : "Force Transmit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer Ribbon */}
      <footer className="w-full border-t-2 border-black bg-white" role="contentinfo">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-[9px] tracking-widest text-on-surface-variant uppercase text-center md:text-left">
            © {new Date().getFullYear()} SYNCCLIP PUBLISHING GROUP // DISTRIBUTED ARCHIVAL CLIPBOARD // V4.2
          </div>
          <nav className="flex gap-6 font-mono text-[9px] tracking-widest uppercase">
            <Link href="/" className="text-zinc-500 hover:text-secondary transition-colors">Home</Link>
            <Link href="/about" className="text-zinc-500 hover:text-secondary transition-colors">About</Link>
            <Link href="/privacy" className="text-zinc-500 hover:text-secondary transition-colors">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
