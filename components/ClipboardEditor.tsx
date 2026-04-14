"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { debounce } from "../utils/debounce";

export default function ClipboardEditor({ session }: { session: any }) {
  const update = useMutation(api.sessions.updateText);
  const updatePresence = useMutation(api.sessions.updatePresence);
  const restoreHistory = useMutation(api.sessions.restoreHistory);
  const presence = useQuery(api.sessions.getPresence, { sessionId: session._id });

  const [text, setText] = useState(session.text);
  const [toast, setToast] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isNameFixed, setIsNameFixed] = useState(false);
  const [suggestedName, setSuggestedName] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Network Status
  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handleStatus);
    window.addEventListener("offline", handleStatus);
    return () => {
      window.removeEventListener("online", handleStatus);
      window.removeEventListener("offline", handleStatus);
    };
  }, []);

  // Random Name Fragments
  const fragments = useMemo(() => ({
    prefixes: ["OPERATOR", "ARCHIVIST", "NODE", "SIGNAL", "PROXY", "BUFFER"],
    suffixes: ["ALFA", "BRAVO", "KILO", "X-RAY", "OMNI", "ZULU", "01", "07", "88"]
  }), []);

  const generateRandomName = useCallback(() => {
    const p = fragments.prefixes[Math.floor(Math.random() * fragments.prefixes.length)];
    const s = fragments.suffixes[Math.floor(Math.random() * fragments.suffixes.length)];
    return `${p}-${s}`;
  }, [fragments]);
  
  // Persistent Node ID for heartbeat continuity
  const nodeId = useMemo(() => {
    if (typeof window === "undefined") return "NODE-INIT";
    let id = localStorage.getItem("syncclip_node_id");
    if (!id) {
      id = `NODE-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
      localStorage.setItem("syncclip_node_id", id);
    }
    return id;
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // Initialize Name from localStorage or suggest one
  useEffect(() => {
    const savedName = localStorage.getItem("syncclip_user_name");
    if (savedName) {
      setUserName(savedName);
      setIsNameFixed(true);
    } else {
      setSuggestedName(generateRandomName());
    }
  }, [generateRandomName]);

  // Presence Heartbeat (with Visibility Throttling)
  useEffect(() => {
    if (!isNameFixed || !userName) return;

    const heartbeat = () => {
      if (document.visibilityState === "hidden") return;
      updatePresence({
        sessionId: session._id,
        name: userName,
        nodeId: nodeId,
      });
    };

    heartbeat(); // Initial call
    const interval = setInterval(heartbeat, 15000); // Every 15s
    
    // Listen for visibility changes to immediately sync when returning
    const handleVisChange = () => {
      if (document.visibilityState === "visible") heartbeat();
    };
    document.addEventListener("visibilitychange", handleVisChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisChange);
    };
  }, [updatePresence, session._id, userName, nodeId, isNameFixed]);

  useEffect(() => {
    if (session.text !== text) {
      setText(session.text);
    }
  }, [session.text]);

  const debouncedUpdate = useCallback(
    debounce((newText: string) => {
      setIsSyncing(true);
      update({ id: session._id, text: newText }).finally(() => {
        setIsSyncing(false);
      });
    }, 500),
    [update, session._id]
  );

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setText(value);
    debouncedUpdate(value);
  }

  function handleCopyLink(e: React.MouseEvent) {
    e.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    showToast("Link copied to clipboard");
  }

  function handleClearNode() {
    setIsSyncing(true);
    setText("");
    update({ id: session._id, text: "", saveToHistory: true }).finally(() => {
      setIsSyncing(false);
      showToast("Node cleared & saved to history");
    });
  }

  function handleForceSync() {
    setIsSyncing(true);
    update({ id: session._id, text, saveToHistory: true }).finally(() => {
      setIsSyncing(false);
      showToast("Force synced & saved to history");
    });
  }

  function handleRestore(idx: number) {
    restoreHistory({ id: session._id, index: idx });
    setIsSidebarOpen(false); // Close drawer on mobile
  }

  function handleSetSignature(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let name = formData.get("name")?.toString().trim();
    if (!name) name = nodeId; // Default to node ID if empty
    if (name.length > 50) name = name.slice(0, 50);
    
    setUserName(name);
    setIsNameFixed(true);
    localStorage.setItem("syncclip_user_name", name);
  }

  const charCount = text.length;
  const weightKb = (new Blob([text]).size / 1024).toFixed(2);

  if (!isNameFixed) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center p-6" role="dialog" aria-labelledby="signature-heading">
        <div className="max-w-md w-full border-2 border-white p-8">
          <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-2 uppercase">Identity Cluster</div>
          <h2 id="signature-heading" className="font-headline text-4xl text-white italic mb-8">Node Signature</h2>
          <form onSubmit={handleSetSignature} className="space-y-6">
            <div>
              <label htmlFor="op-name" className="sr-only">Operator Name</label>
              <input 
                id="op-name"
                name="name"
                maxLength={50}
                placeholder="ENTER OPERATOR NAME..."
                defaultValue={suggestedName}
                className="w-full bg-transparent border-b-2 border-white text-white p-4 font-mono focus:outline-none focus:border-secondary transition-colors uppercase"
                autoFocus
              />
            </div>
            <button type="submit" className="w-full bg-white text-black font-label font-bold py-4 hover:bg-secondary hover:text-white transition-all uppercase tracking-widest text-sm">
              Confirm Uplink
            </button>
          </form>
          <button 
            type="button"
            className="mt-6 w-full text-left font-mono text-[8px] text-zinc-500 uppercase tracking-widest hover:text-white transition-colors" 
            onClick={() => {
              setUserName(nodeId);
              setIsNameFixed(true);
            }}
          >
            Connect as anonymous {nodeId}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface font-body selection:bg-secondary selection:text-white min-h-screen flex flex-col">
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-secondary text-white font-mono text-[10px] uppercase tracking-widest text-center py-2 z-[60] sticky top-0">
          NODE OFFLINE — CLOUD SYCHRONIZATION PAUSED
        </div>
      )}

      {/* TopAppBar Small (Anchor) */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <div className="font-serif italic font-black text-white shrink-0">SYNCCLIP</div>
        <nav className="flex gap-4 md:gap-6 overflow-hidden items-center" aria-label="Session status">
          <div className="text-white border-b border-transparent shrink-0">
            SESSION: {session.code}
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 text-secondary font-bold shrink-0 border border-secondary px-2 py-0.5 hover:bg-secondary hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">menu</span>
            <span>NODES ({presence?.length || 0})</span>
          </button>
          <div className="text-zinc-500 hidden md:block truncate max-w-[100px]">
            SIG: {userName}
          </div>
          <button
            aria-label="Copy session link"
            className="text-zinc-400 border-b border-transparent hover:text-secondary hover:border-secondary transition-colors cursor-pointer uppercase shrink-0"
            onClick={handleCopyLink}
          >
            COPY LINK
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="pt-10 flex-grow flex flex-col relative">
        {/* TopAppBar Medium (Branding Section) */}
        <section className="flex flex-col md:flex-row justify-between items-end w-full px-6 pt-12 pb-6 border-b-2 border-black">
          <div className="flex flex-col">
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter font-headline leading-none">
              SYNCCLIP
            </h1>
            <div className="font-mono text-xs tracking-[0.2em] mt-2 text-on-surface-variant uppercase flex items-center gap-3">
              DIGITAL BROADSHEET PROTOCOL V4.2
              <span className="text-black inline-block px-2 border border-black text-[9px]">NODE_{session.code}</span>
            </div>
          </div>
          <nav className="flex items-center gap-6 mt-6 md:mt-0 font-label text-sm font-bold tracking-widest" aria-label="Main navigation">
            <a className="text-black border-b-4 border-black pb-1 focus:outline-none focus:ring-2 focus:ring-secondary" href="#">
              CLIPBOARD
            </a>
          </nav>
        </section>

        {/* Editorial Interface Grid */}
        <div className="editorial-grid flex-grow min-h-[calc(100vh-350px)]">
          {/* Left Column: Primary Interaction */}
          <div className="p-6 border-r border-black flex flex-col">
            <div className="mb-4 flex justify-between items-center">
              <div className="font-mono text-xs font-bold tracking-[0.3em] text-secondary uppercase flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-secondary animate-pulse" : "bg-zinc-400"} block`}></span>
                {isOnline ? "LIVE UPLINK ACTIVE" : "UPLINK SIGNAL LOST"}
              </div>
              <div className="font-mono text-[9px] tracking-widest uppercase text-zinc-400">
                {isSyncing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 border-t border-r border-secondary animate-spin rounded-full"></span>
                    Syncing...
                  </span>
                ) : (
                  <span className="text-secondary font-bold">Synced</span>
                )}
              </div>
            </div>
            {/* Main Textarea Container */}
            <div className="flex-grow flex flex-col relative group">
              <div className="absolute -top-3 left-6 bg-white px-2 font-mono text-[10px] tracking-widest text-on-surface-variant z-10 select-none">
                INPUT_STREAM
              </div>
              <textarea
                aria-label="Clipboard Text Input"
                maxLength={100000}
                className="w-full h-full min-h-[300px] flex-grow p-6 md:p-10 font-body text-xl md:text-2xl leading-relaxed border border-black focus:outline-none focus:ring-0 focus:border-secondary transition-all resize-none placeholder:text-zinc-300"
                placeholder="Begin archival typing for immediate cloud synchronization..."
                value={text}
                onChange={handleChange}
              />
              <div className="mt-4 flex flex-wrap gap-4 justify-between items-center border-t border-black pt-4">
                <div className="flex flex-wrap gap-6 md:gap-8 font-mono text-[10px] tracking-widest uppercase text-on-surface-variant">
                  <div>WEIGHT: {weightKb} KB</div>
                  <div>CHARS: {charCount.toLocaleString()} / 100K</div>
                  <div className="hidden sm:block">NODEID: {nodeId}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="material-symbols-outlined text-[14px]">encrypted</span>
                  <span className="font-mono text-[9px] tracking-tighter uppercase">Protocol Secured</span>
                </div>
              </div>
            </div>
            {/* Large Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
              <button
                onClick={handleForceSync}
                aria-label="Force manual cloud snapshot"
                className="bg-black text-white font-label font-bold py-6 px-4 border-2 border-black hover:bg-secondary hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] disabled:bg-zinc-800"
                disabled={!isOnline}
              >
                Force Sync
              </button>
              <button
                onClick={handleClearNode}
                aria-label="Clear all text in this node"
                className="bg-white text-black font-label font-bold py-6 px-4 border-2 border-black hover:bg-secondary hover:text-white hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                Clear Node
              </button>
              <button
                onClick={handleCopyLink}
                aria-label="Copy session link to clipboard"
                className="bg-white text-black font-label font-bold py-6 px-4 border-2 border-black hover:bg-secondary hover:text-white hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                Share Link
              </button>
            </div>
          </div>

          {/* Right Column: Context & Metadata */}
          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-[90] lg:hidden" 
              onClick={() => setIsSidebarOpen(false)}
            />
          )}
          
          <aside className={`bg-surface border-l border-black overflow-y-auto z-[100] transition-transform duration-300
            fixed top-0 right-0 h-full w-[85%] max-w-[400px] lg:static lg:h-auto lg:w-auto lg:z-0 lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          `} role="complementary">
            <div className="flex flex-col h-full lg:h-[calc(100vh-150px)] lg:sticky lg:top-10">
              {/* Mobile Close Button */}
              <div className="lg:hidden p-4 border-b border-black flex justify-between items-center bg-black text-white shrink-0">
                <span className="font-mono uppercase tracking-widest text-xs">Node Logs</span>
                <button onClick={() => setIsSidebarOpen(false)} className="material-symbols-outlined">close</button>
              </div>

              {/* Active Nodes */}
              <section className="p-6 border-b border-black" aria-label="Presence list">
                <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-4 flex justify-between">
                  ACTIVE NODES <span>({presence?.length || 0})</span>
                </div>
                <ul className="space-y-3 font-label text-xs">
                  {presence?.map((p: any) => (
                    <li key={p.nodeId} className="flex justify-between items-center border-b border-zinc-100 pb-2">
                      <span className={`${p.nodeId === nodeId ? "text-black font-bold" : "text-zinc-600"} truncate pr-2`}>
                        {p.name} {p.nodeId === nodeId && "(YOU)"}
                      </span>
                      <span className="text-secondary text-[8px] animate-pulse uppercase font-black shrink-0">active</span>
                    </li>
                  ))}
                  {(!presence || presence.length === 0) && (
                    <li className="text-zinc-400 italic">No nodes detected</li>
                  )}
                </ul>
              </section>

              {/* History */}
              <section className="p-6 flex-grow overflow-y-auto" aria-label="Clipboard restoration history">
                <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-4 text-center lg:text-left">
                  Archive Log
                </div>
                <div className="space-y-4">
                  {session.history?.map((h: any, idx: number) => (
                    <button 
                      key={h.timestamp}
                      aria-label={`Restore version from ${new Date(h.timestamp).toLocaleTimeString()}`}
                      onClick={() => handleRestore(idx)}
                      className="w-full text-left border border-black p-4 group hover:bg-black transition-all focus:ring-2 focus:ring-secondary focus:outline-none"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-[9px] text-zinc-500 group-hover:text-zinc-400">
                          {new Date(h.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="material-symbols-outlined text-[14px] text-zinc-300 group-hover:text-white">history</span>
                      </div>
                      <p className="font-body text-[11px] line-clamp-2 text-zinc-600 group-hover:text-white leading-tight">
                        {h.text}
                      </p>
                    </button>
                  ))}
                  {(!session.history || session.history.length === 0) && (
                    <p className="text-zinc-400 italic text-xs text-center">No entries archived</p>
                  )}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer Ribbon */}
      <footer className="mt-auto border-t-2 border-black p-6 flex flex-col md:flex-row justify-between items-center" role="contentinfo">
        <div className="font-mono text-[9px] tracking-widest text-on-surface-variant mb-4 md:mb-0 uppercase text-center md:text-left">
          © 2024 SYNCCLIP PUBLISHING GROUP // DISTRIBUTED ARCHIVAL CLIPBOARD // V4.2
        </div>
      </footer>

      {/* Action Toast Snackbar */}
      {toast && (
        <div className="fixed bottom-6 right-6 left-6 md:left-auto bg-black text-white px-6 py-4 border-l-4 border-secondary font-mono text-[10px] uppercase tracking-widest z-[200] shadow-[4px_4px_0px_0px_#057dbc] animate-in slide-in-from-bottom-5 fade-in duration-300" role="status">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-secondary font-bold text-sm">check_circle</span>
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}


