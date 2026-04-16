"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { debounce } from "../utils/debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ClipboardEditor({ session }: { session: any }) {
  const update = useMutation(api.sessions.updateText);
  const updatePresence = useMutation(api.sessions.updatePresence);
  const restoreHistory = useMutation(api.sessions.restoreHistory);
  const toggleLockMutation = useMutation(api.sessions.toggleLock);
  const toggleBurnMutation = useMutation(api.sessions.toggleBurnMode);
  const burnMutation = useMutation(api.sessions.burnSession);
  const deleteSessionMutation = useMutation(api.sessions.deleteSession);
  const router = useRouter();
  const presence = useQuery(api.sessions.getPresence, { sessionId: session._id });

  const [text, setText] = useState(session.text);
  const [toast, setToast] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isNameFixed, setIsNameFixed] = useState(false);
  const [suggestedName, setSuggestedName] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);
  const [autoReadEnabled, setAutoReadEnabled] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const qrUrl = typeof window !== "undefined" ? window.location.href : "";

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
    window.addEventListener("visibilitychange", heartbeat);
    return () => {
      clearInterval(interval);
      window.removeEventListener("visibilitychange", heartbeat);
    };
  }, [isNameFixed, userName, nodeId, session._id, updatePresence]);

  // Session Expiration Countdown
  useEffect(() => {
    const expiresAt = session.createdAt + 24 * 60 * 60 * 1000;

    const updateCountdown = () => {
      const remaining = expiresAt - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [session.createdAt]);

  const formatTimeLeft = (ms: number | null) => {
    if (ms === null) return "--:--:--";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  // Auto Clipboard Sync Logic
  useEffect(() => {
    if (session.text !== text) {
      setText(session.text);
      if (autoSyncEnabled && typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(session.text).then(() => {
          showToast("Remote Uplink Copied to Clipboard");
        }).catch((e) => {
          console.error("Auto-sync failed:", e);
        });
      }
    }
  }, [session.text]); // Exclude text and autoSyncEnabled to prevent loop

  // Smart Clipboard Polling (Auto-Read)
  const isOwner = session.ownerNodeId === nodeId;
  const isLocked = session.isLocked;
  const canEdit = !isLocked || isOwner;

  // Command Palette Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(p => !p);
      }
      if (e.key === 'Escape') {
        setIsPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Burn Protocol self-destruct
  useEffect(() => {
    if (session.isBurnMode && !isOwner && text !== "") {
      const tm = setTimeout(() => {
        burnMutation({ id: session._id }).then(() => {
          showToast("🔥 Data wiped! Burn protocol complete.");
        });
      }, 5000);
      return () => clearTimeout(tm);
    }
  }, [session.isBurnMode, isOwner, session._id, text, burnMutation]);

  // Smart Clipboard Polling (Auto-Read)
  useEffect(() => {
    if (!autoReadEnabled || !canEdit) return;
    const handleFocus = async () => {
      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          const localText = await navigator.clipboard.readText();
          if (localText && localText !== session.text && localText !== text) {
            setText(localText);
            setIsSyncing(true);
            update({ id: session._id, text: localText, callerNodeId: nodeId }).finally(() => {
              setIsSyncing(false);
              showToast("Clipboard Auto-Synced to Node");
            });
          }
        }
      } catch (err) {
        console.error("Auto-read clipboard failed:", err);
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [autoReadEnabled, session.text, text, session._id, update, nodeId, canEdit]);

  const debouncedUpdate = useCallback(
    debounce((newText: string) => {
      if (!canEdit) return;
      setIsSyncing(true);
      update({ id: session._id, text: newText, callerNodeId: nodeId }).finally(() => {
        setIsSyncing(false);
      });
    }, 500),
    [update, session._id, nodeId, canEdit]
  );

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setText(value);
    debouncedUpdate(value);
  }

  function handleCopyLink(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard");
    }
  }

  function handleClearNode() {
    if (!canEdit) return;
    setIsSyncing(true);
    setText("");
    update({ id: session._id, text: "", saveToHistory: true, callerNodeId: nodeId }).finally(() => {
      setIsSyncing(false);
      showToast("Node cleared & saved to history");
    });
  }

  function handleForceSync() {
    if (!canEdit) return;
    setIsSyncing(true);
    update({ id: session._id, text, saveToHistory: true, callerNodeId: nodeId }).finally(() => {
      setIsSyncing(false);
      showToast("Force synced & saved to history");
    });
  }

  function handleRestore(idx: number) {
    if (!canEdit) return;
    restoreHistory({ id: session._id, index: idx, callerNodeId: nodeId });
    setIsSidebarOpen(false); // Close drawer on mobile
  }

  function handleToggleLock() {
    if (!isOwner) return;
    toggleLockMutation({ id: session._id, callerNodeId: nodeId, isLocked: !isLocked }).then(() => {
      showToast(`Node ${!isLocked ? "Locked" : "Unlocked"}`);
    });
  }

  function handleToggleBurn() {
    if (!isOwner) return;
    toggleBurnMutation({ id: session._id, callerNodeId: nodeId, isBurnMode: !session.isBurnMode }).then(() => {
      showToast(`Burn Protocol ${!session.isBurnMode ? "ARMED" : "DISARMED"}`);
    });
  }

  async function handleDeleteSession() {
    if (!isOwner) return;
    if (confirm("🚨 WARNING: This cluster and its archival history will be permanently deleted. Proceed?")) {
      await deleteSessionMutation({ id: session._id, callerNodeId: nodeId });
      router.push("/");
    }
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

  const payloadType = useMemo(() => {
    if (!text) return "EMPTY";
    if (/^https?:\/\/[^\s]+$/.test(text.trim())) return "URL";
    try { JSON.parse(text); return "JSON"; } catch { }
    if (/[{}\[\];=]/.test(text) && /\b(function|const|let|var|class|import|return)\b/.test(text)) return "CODE";
    return "TEXT";
  }, [text]);

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

      {/* Command Palette Overlay */}
      {isPaletteOpen && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-start justify-center pt-32 p-6 backdrop-blur-sm" onClick={() => setIsPaletteOpen(false)}>
          <div className="bg-white border-4 border-black w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="border-b-4 border-black p-4 flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary">terminal</span>
              <input
                autoFocus
                className="flex-grow bg-transparent font-mono uppercase text-lg focus:outline-none placeholder:text-zinc-300"
                placeholder="EXECUTE PROTOCOL..."
                value={paletteQuery}
                onChange={e => { setPaletteQuery(e.target.value); setPaletteIndex(0); }}
                onKeyDown={(e) => {
                  const commands = [
                    { id: 'clear', label: 'clear node', icon: 'delete_sweep' },
                    { id: 'copy', label: 'copy text', icon: 'content_copy' },
                    { id: 'lock', label: 'toggle lock', icon: 'lock' },
                    { id: 'pair', label: 'pair device', icon: 'qr_code_2' },
                    { id: 'burn', label: 'burn protocol', icon: 'local_fire_department' },
                    { id: 'sync', label: 'force sync', icon: 'sync' }
                  ].filter(cmd => cmd.label.includes(paletteQuery.toLowerCase()) || cmd.id.includes(paletteQuery.toLowerCase()));

                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setPaletteIndex(prev => (prev + 1) % commands.length);
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setPaletteIndex(prev => (prev - 1 + commands.length) % commands.length);
                  } else if (e.key === 'Enter' && commands.length > 0) {
                    e.preventDefault();
                    const cmd = commands[paletteIndex].id;
                    setIsPaletteOpen(false);
                    setPaletteQuery('');
                    setPaletteIndex(0);
                    if (cmd === 'clear') handleClearNode();
                    if (cmd === 'copy') { navigator.clipboard.writeText(text); showToast("Copied"); }
                    if (cmd === 'lock') handleToggleLock();
                    if (cmd === 'pair') setShowQRModal(true);
                    if (cmd === 'burn') handleToggleBurn();
                    if (cmd === 'sync') handleForceSync();
                  }
                }}
              />
              <span className="font-mono text-[10px] text-zinc-400 px-2 py-1 bg-zinc-100 uppercase tracking-widest hidden sm:block">ESC</span>
            </div>
            <div className="p-2 font-mono text-sm uppercase max-h-[40vh] overflow-y-auto">
              {[
                { id: 'clear', label: 'clear node', icon: 'delete_sweep' },
                { id: 'copy', label: 'copy text', icon: 'content_copy' },
                { id: 'lock', label: 'toggle lock', icon: 'lock' },
                { id: 'pair', label: 'pair device', icon: 'qr_code_2' },
                { id: 'burn', label: 'burn protocol', icon: 'local_fire_department' },
                { id: 'sync', label: 'force sync', icon: 'sync' }

              ].filter(cmd => cmd.label.includes(paletteQuery.toLowerCase()) || cmd.id.includes(paletteQuery.toLowerCase())).map((cmd, idx) => (
                <button
                  key={cmd.id}
                  className={`w-full text-left p-4 transition-colors flex justify-between items-center uppercase tracking-widest border-b border-zinc-100 last:border-0 ${paletteIndex === idx ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-50'}`}
                  onClick={() => {
                    setIsPaletteOpen(false);
                    setPaletteQuery('');
                    setPaletteIndex(0);
                    if (cmd.id === 'clear') handleClearNode();
                    if (cmd.id === 'copy') { navigator.clipboard.writeText(text); showToast("Copied"); }
                    if (cmd.id === 'lock') handleToggleLock();
                    if (cmd.id === 'pair') setShowQRModal(true);
                    if (cmd.id === 'burn') handleToggleBurn();
                    if (cmd.id === 'sync') handleForceSync();
                  }}
                  onMouseEnter={() => setPaletteIndex(idx)}
                >
                  <div className="flex items-center gap-4">
                    <span className={`material-symbols-outlined text-[18px] ${paletteIndex === idx ? 'text-secondary' : 'text-zinc-400'}`}>{cmd.icon}</span>
                    <span>&gt; {cmd.label}</span>
                  </div>
                  <span className={`material-symbols-outlined text-[16px] transition-transform ${paletteIndex === idx ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}>keyboard_return</span>
                </button>
              ))}
              {['clear', 'copy', 'lock', 'pair', 'burn', 'sync'].filter(cmd => cmd.includes(paletteQuery.toLowerCase())).length === 0 && (
                <div className="p-6 text-center text-zinc-400 italic text-xs tracking-widest">COMMAND NOT RECOGNIZED</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* QR Modal Overlay */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-6 backdrop-blur-sm" onClick={() => setShowQRModal(false)}>
          <div className="bg-white border-4 border-black p-10 flex flex-col items-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-black hover:text-secondary material-symbols-outlined" onClick={() => setShowQRModal(false)}>close</button>
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-2 uppercase">Optical Pairing</div>
            <h2 className="font-headline text-2xl font-black mb-8 uppercase text-center">Scan to Connect Node</h2>
            <div className="bg-white p-4 border-2 border-black inline-block mb-6 relative group cursor-pointer hover:border-secondary transition-colors">
              <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {qrUrl && (
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrUrl)}`} alt="Session QR Code" className="w-[200px] h-[200px]" />
              )}
            </div>
            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest text-center">
              Scan from any mobile device to directly access this clipboard cluster.
            </p>
          </div>
        </div>
      )}

      {/* TopAppBar Small (Anchor) */}
      <header className="bg-black text-white font-mono uppercase tracking-widest text-[10px] antialiased fixed top-0 w-full z-50 h-10 flex justify-between items-center px-6" role="banner">
        <Link href="/" className="font-serif italic font-black text-white shrink-0 hover:text-secondary transition-colors">SYNCCLIP</Link>
        <nav className="flex gap-4 md:gap-6 overflow-hidden items-center" aria-label="Session status">
          <div className="text-white border-b border-transparent shrink-0 flex items-center gap-2">
            {isLocked && <span className="material-symbols-outlined text-[12px] text-secondary" title="Session Locked">lock</span>}
            {session.isBurnMode && <span className="material-symbols-outlined text-[12px] text-orange-500 animate-pulse" title="Burn Mode Enabled">local_fire_department</span>}
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 text-secondary font-bold shrink-0 border border-secondary px-2 py-0.5 hover:bg-secondary hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">menu</span>
            <span>NODES ({presence?.length || 0})</span>
          </button>
          <button
            onClick={() => setIsNameFixed(false)}
            className="text-zinc-500 hidden md:block truncate max-w-[100px] hover:text-white transition-colors uppercase cursor-pointer"
            title="Click to edit your node signature"
          >
            SIG: {userName}
          </button>
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="hidden xl:flex items-center gap-2 text-zinc-400 group hover:text-secondary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[10px]">terminal</span>
            <span>COMMANDS <span className="text-[8px] opacity-50">(CMD+K)</span></span>
          </button>
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
            {/* <Link href="/" className="group inline-block"> */}
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter font-headline leading-none ">
              SYNCCLIP
            </h1>
            {/* </Link> */}
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
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-baseline sm:items-center gap-2">
              <div className="font-mono text-xs font-bold tracking-[0.3em] text-secondary uppercase flex items-center gap-2 flex-wrap">
                <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-secondary animate-pulse" : "bg-zinc-400"} block`}></span>
                {isOnline ? "LIVE UPLINK ACTIVE" : "UPLINK SIGNAL LOST"}
                {isLocked && !isOwner && <span className="text-zinc-500 ml-2">(READ ONLY)</span>}
                {session.isBurnMode && <span className="text-orange-500 ml-2 animate-pulse">(BURN PROTOCOL ARMED)</span>}
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
                readOnly={!canEdit}
                className={`w-full h-full min-h-[300px] flex-grow p-6 md:p-10 font-body text-xl md:text-2xl leading-relaxed border ${!canEdit ? 'border-zinc-300 bg-zinc-50 text-zinc-500 cursor-not-allowed' : 'border-black focus:border-secondary'} focus:outline-none focus:ring-0 transition-all resize-none placeholder:text-zinc-300`}
                placeholder={canEdit ? "Your text here. Or your cat's walking on the keyboard. Both are fine." : "This node is locked. No entry for you."}
                value={text}
                onChange={handleChange}
              />
              <div className="mt-4 flex flex-wrap gap-4 justify-between items-center border-t border-black pt-4">
                <div className="flex flex-wrap gap-6 md:gap-8 font-mono text-[10px] tracking-widest uppercase text-on-surface-variant">
                  <div>WEIGHT: {weightKb} KB</div>
                  <div>CHARS: {charCount.toLocaleString()} / 100K</div>
                  <div>TYPE: {payloadType}</div>
                  <div className="hidden xl:block">ROOM: {session.code}</div>
                  <div className="flex items-center gap-1.5 text-secondary font-bold">
                    <span className="material-symbols-outlined text-[12px]">timer</span>
                    EXPIRES IN: {formatTimeLeft(timeLeft)}
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="material-symbols-outlined text-[14px]">encrypted</span>
                  <span className="font-mono text-[9px] tracking-tighter uppercase">Protocol Secured</span>
                </div>
              </div>
            </div>
            {/* Interaction Layer: Action Buttons */}
            <div className="mt-8">
              {/* Desktop Grid (Visible on lg and up) */}
              <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {canEdit && (
                  <button
                    onClick={handleForceSync}
                    aria-label="Force manual cloud snapshot"
                    className="bg-zinc-900 text-white font-label font-bold py-6 px-2 border-2 border-black hover:bg-secondary hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] disabled:bg-zinc-800"
                    disabled={!isOnline}
                  >
                    Force Sync
                  </button>
                )}
                {canEdit && (
                  <button
                    onClick={handleClearNode}
                    aria-label="Clear all text in this node"
                    className="bg-white text-black font-label font-bold py-6 px-2 border-2 border-black hover:bg-secondary hover:text-white hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                  >
                    Clear Node
                  </button>
                )}
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(text);
                    showToast("Copied to clipboard");
                  }}
                  aria-label="Copy session text"
                  className="bg-white text-black font-label font-bold py-6 px-2 border-2 border-black hover:bg-secondary hover:text-white hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  Copy Text
                </button>
                <button
                  onClick={() => setIsShareModalOpen(true)}
                  aria-label="Open sharing options"
                  className="bg-white text-black font-label font-bold py-6 px-2 border-2 border-black hover:bg-secondary hover:text-white hover:border-secondary transition-all uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  Share
                </button>
                <button
                  onClick={() => setIsSettingsModalOpen(true)}
                  aria-label="Open node protocol settings"
                  className="bg-white text-black font-label font-bold py-6 px-2 border-2 border-black hover:bg-zinc-900 hover:text-white transition-all uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  Settings
                </button>
              </div>

              {/* Mobile/Compact Actions (Visible under lg) */}
              <div className="lg:hidden flex flex-col sm:flex-row gap-4">
                <div className="flex flex-1 gap-4">
                  {canEdit && (
                    <button
                      onClick={handleForceSync}
                      className="flex-1 bg-zinc-900 text-white font-label font-bold py-6 border-2 border-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                      disabled={!isOnline}
                    >
                      SYNC
                    </button>
                  )}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(text);
                      showToast("Copied to clipboard");
                    }}
                    className="flex-1 bg-white text-black font-label font-bold py-6 border-2 border-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                  >
                    <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    COPY
                  </button>
                </div>
                <button
                  onClick={() => setIsActionsModalOpen(true)}
                  className="bg-secondary text-white font-label font-bold py-6 border-2 border-secondary uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-all hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                >
                  <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                  PROTOCOL ACTIONS
                </button>
              </div>
            </div>

            {/* Protocol Actions Modal (Mobile/Tablet Only) */}
            {isActionsModalOpen && (
              <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6">
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setIsActionsModalOpen(false)}
                />
                <div className="relative w-full max-w-lg bg-surface border-t-4 sm:border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-8 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                  <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-zinc-100">
                    <h2 className="font-headline text-2xl font-black uppercase tracking-tight">PROTOCOL_ACTIONS</h2>
                    <button
                      onClick={() => setIsActionsModalOpen(false)}
                      className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white hover:bg-secondary hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {canEdit && (
                      <button
                        onClick={() => { handleClearNode(); setIsActionsModalOpen(false); }}
                        className="w-full flex items-center justify-between p-5 border-2 border-black bg-white hover:bg-zinc-50 font-label font-bold uppercase tracking-widest text-sm transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                      >
                        <span className="flex items-center gap-3">
                          <span className="material-symbols-outlined">delete_forever</span>
                          Clear Node
                        </span>
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                      </button>
                    )}
                    <button
                      onClick={() => { setIsActionsModalOpen(false); setIsShareModalOpen(true); }}
                      className="w-full flex items-center justify-between p-5 border-2 border-black bg-white hover:bg-zinc-50 font-label font-bold uppercase tracking-widest text-sm transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined">share</span>
                        Share Protocol
                      </span>
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>
                    <button
                      onClick={() => { setIsActionsModalOpen(false); setIsSettingsModalOpen(true); }}
                      className="w-full flex items-center justify-between p-5 border-2 border-black bg-white hover:bg-zinc-50 font-label font-bold uppercase tracking-widest text-sm transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined">tune</span>
                        Protocol Settings
                      </span>
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </button>



                  </div>

                  <div className="mt-8 pt-6 border-t font-mono text-[9px] text-zinc-400 tracking-tighter text-center uppercase">
                    SYNCCLIP SECURITY PROTOCOL V4.2 // NODE_{session.code}
                  </div>
                </div>
              </div>
            )}

            {/* Protocol Settings Modal */}
            {isSettingsModalOpen && (
              <div className="fixed inset-0 z-[210] flex items-end sm:items-center justify-center p-0 sm:p-6">
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => { setIsSettingsModalOpen(false); setActiveInfo(null); }}
                />
                <div className="relative w-full max-w-lg bg-surface border-t-4 sm:border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-8 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
                  <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-zinc-100">
                    <h2 className="font-headline text-2xl font-black uppercase tracking-tight">Node Settings</h2>
                    <button
                      onClick={() => { setIsSettingsModalOpen(false); setActiveInfo(null); }}
                      className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white hover:bg-secondary hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Auto-Push */}
                    <div className="flex flex-col border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setActiveInfo(activeInfo === 'push' ? null : 'push')}
                            className={`w-6 h-6 border border-black flex items-center justify-center text-[10px] font-bold transition-colors ${activeInfo === 'push' ? 'bg-secondary text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
                          >
                            ?
                          </button>
                          <span className="font-label font-bold uppercase tracking-widest text-xs">Upload to Cloud</span>
                        </div>
                        <button
                          onClick={() => setAutoSyncEnabled(!autoSyncEnabled)}
                          className={`w-12 h-6 border-2 border-black relative transition-colors ${autoSyncEnabled ? 'bg-secondary' : 'bg-zinc-200'}`}
                        >
                          <div className={`absolute top-0.5 bottom-0.5 w-4 bg-white border border-black transition-all ${autoSyncEnabled ? 'right-0.5' : 'left-0.5'}`}></div>
                        </button>
                      </div>
                      {activeInfo === 'push' && (
                        <div className="mt-4 pt-4 border-t border-zinc-100 font-mono text-[10px] text-zinc-500 leading-relaxed uppercase">
                          Automatically syncs your local clipboard to this cloud node.
                        </div>
                      )}
                    </div>

                    {/* Auto-Read */}
                    {canEdit && (
                      <div className="flex flex-col border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setActiveInfo(activeInfo === 'read' ? null : 'read')}
                              className={`w-6 h-6 border border-black flex items-center justify-center text-[10px] font-bold transition-colors ${activeInfo === 'read' ? 'bg-secondary text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
                            >
                              ?
                            </button>
                            <span className="font-label font-bold uppercase tracking-widest text-xs">Download to Device</span>
                          </div>
                          <button
                            onClick={() => setAutoReadEnabled(!autoReadEnabled)}
                            className={`w-12 h-6 border-2 border-black relative transition-colors ${autoReadEnabled ? 'bg-secondary' : 'bg-zinc-200'}`}
                          >
                            <div className={`absolute top-0.5 bottom-0.5 w-4 bg-white border border-black transition-all ${autoReadEnabled ? 'right-0.5' : 'left-0.5'}`}></div>
                          </button>
                        </div>
                        {activeInfo === 'read' && (
                          <div className="mt-4 pt-4 border-t border-zinc-100 font-mono text-[10px] text-zinc-500 leading-relaxed uppercase">
                            Automatically pulls cloud content into your local clipboard.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Node Lock */}
                    {isOwner && (
                      <div className="flex flex-col border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setActiveInfo(activeInfo === 'lock' ? null : 'lock')}
                              className={`w-6 h-6 border border-black flex items-center justify-center text-[10px] font-bold transition-colors ${activeInfo === 'lock' ? 'bg-secondary text-white' : 'bg-zinc-100 hover:bg-zinc-200'}`}
                            >
                              ?
                            </button>
                            <span className="font-label font-bold uppercase tracking-widest text-xs">Lock for Editing</span>
                          </div>
                          <button
                            onClick={handleToggleLock}
                            className={`w-12 h-6 border-2 border-black relative transition-colors ${isLocked ? 'bg-zinc-900' : 'bg-zinc-200'}`}
                          >
                            <div className={`absolute top-0.5 bottom-0.5 w-4 bg-white border border-black transition-all ${isLocked ? 'right-0.5' : 'left-0.5'}`}></div>
                          </button>
                        </div>
                        {activeInfo === 'lock' && (
                          <div className="mt-4 pt-4 border-t border-zinc-100 font-mono text-[10px] text-zinc-500 leading-relaxed uppercase">
                            Stops others from changing this text. Only you can unlock it.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Burn Protocol */}
                    {isOwner && (
                      <div className={`flex flex-col border-2 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors ${session.isBurnMode ? 'bg-orange-50 border-orange-500' : 'bg-white border-black'}`}>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setActiveInfo(activeInfo === 'burn' ? null : 'burn')}
                              className={`w-6 h-6 border border-black flex items-center justify-center text-[10px] font-bold transition-colors ${activeInfo === 'burn' ? 'bg-orange-500 text-white border-orange-500' : 'bg-zinc-100 hover:bg-zinc-200'}`}
                            >
                              ?
                            </button>
                            <span className={`font-label font-bold uppercase tracking-widest text-xs ${session.isBurnMode ? 'text-orange-600' : 'text-black'}`}>Burn (Delete Everything)</span>
                          </div>
                          <button
                            onClick={handleToggleBurn}
                            className={`w-12 h-6 border-2 relative transition-colors ${session.isBurnMode ? 'bg-orange-500 border-orange-600' : 'bg-zinc-200 border-black'}`}
                          >
                            <div className={`absolute top-0.5 bottom-0.5 w-4 bg-white border border-black transition-all ${session.isBurnMode ? 'right-0.5' : 'left-0.5'}`}></div>
                          </button>
                        </div>
                        {activeInfo === 'burn' && (
                          <div className="mt-4 pt-4 border-t border-orange-200 font-mono text-[10px] text-orange-600 leading-relaxed uppercase">
                            Arms a manual self-destruct. Once triggered, everything is deleted forever.
                          </div>
                        )}
                      </div>
                    )}

                    {/* Exit & Delete (Owner Only) */}
                    {isOwner && (
                      <div className="mt-8 pt-8 border-t-2 border-zinc-100 flex flex-col gap-4">
                        <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest text-center">Origin Cleanup</div>
                        <button
                          onClick={handleDeleteSession}
                          className="w-full bg-zinc-900 text-white font-label font-bold py-5 px-4 border-2 border-black hover:bg-orange-600 transition-colors uppercase tracking-[0.2em] text-xs shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                        >
                          Exit & Delete Node
                        </button>
                      </div>
                    )}

                    {/* Status Info / Expiration Note */}
                    <div className="mt-8 pt-6 border-t-2 border-zinc-100">
                      <div className="flex items-start gap-4 p-4 bg-zinc-50 border border-zinc-200 font-mono text-[9px] text-zinc-400 uppercase leading-relaxed">
                        <span className="material-symbols-outlined text-sm text-secondary">info</span>
                        <div>
                          <p className="mb-2">Your clips stay in the cloud for <span className="text-secondary font-bold text-[11px]">24 hours</span>. After that, they are automatically cleared.</p>
                          <p>Use the <span className="text-orange-500 font-bold">Burn</span> button to delete them instantly.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t font-mono text-[9px] text-zinc-400 tracking-tighter text-center uppercase">
                    Node Settings // {session.code}
                  </div>
                </div>
              </div>
            )}

            {/* Share Protocol Modal */}
            {isShareModalOpen && (
              <div className="fixed inset-0 z-[210] flex items-end sm:items-center justify-center p-0 sm:p-6">
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setIsShareModalOpen(false)}
                />
                <div className="relative w-full max-w-md bg-surface border-t-4 sm:border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-8 animate-in slide-in-from-bottom duration-300">
                  <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-zinc-100">
                    <h2 className="font-headline text-2xl font-black uppercase tracking-tight">Share Room</h2>
                    <button
                      onClick={() => setIsShareModalOpen(false)}
                      className="w-10 h-10 border-2 border-black flex items-center justify-center bg-white hover:bg-secondary hover:text-white transition-colors"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(session.code);
                        showToast(`Room ID ${session.code} copied`);
                        setIsShareModalOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-5 border-2 border-black bg-white hover:bg-zinc-50 font-label font-bold uppercase tracking-widest text-sm transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined">fingerprint</span>
                        Copy Room ID
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400">{session.code}</span>
                    </button>

                    <button
                      onClick={() => { handleCopyLink(); setIsShareModalOpen(false); }}
                      className="w-full flex items-center justify-between p-5 border-2 border-black bg-white hover:bg-zinc-50 font-label font-bold uppercase tracking-widest text-sm transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined">link</span>
                        Copy Share Link
                      </span>
                      <span className="material-symbols-outlined text-[18px]">content_copy</span>
                    </button>

                    <button
                      onClick={() => { setShowQRModal(true); setIsShareModalOpen(false); }}
                      className="w-full flex items-center justify-between p-5 border-2 border-black bg-white hover:bg-zinc-50 font-label font-bold uppercase tracking-widest text-sm transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                    >
                      <span className="flex items-center gap-3">
                        <span className="material-symbols-outlined">qr_code_2</span>
                        Phone Pair (QR Code)
                      </span>
                      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    </button>
                  </div>

                  <div className="mt-8 pt-4 border-t font-mono text-[9px] text-zinc-400 tracking-tighter text-center uppercase">
                    Secure Share Gate // {session.code}
                  </div>
                </div>
              </div>
            )}
          </div>

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

              {/* Analytics & Telemetry */}
              <section className="p-6 border-b border-black bg-zinc-50" aria-label="Session Telemetry">
                <div className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-500 mb-4">
                  TELEMETRY DATA
                </div>
                <div className="grid grid-cols-2 gap-4 font-mono text-[10px] tracking-widest text-black">
                  <div>
                    <div className="text-zinc-400 mb-1">UPTIME</div>
                    <div className="font-bold text-xs">{Math.floor((Date.now() - session.createdAt) / 60000)} MIN</div>
                  </div>
                  <div>
                    <div className="text-zinc-400 mb-1">MUTATIONS</div>
                    <div className="font-bold text-xs">{session.updateCount || 0}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-zinc-400 mb-1">NODE DENSITY</div>
                    <div className="font-bold text-xs">{presence?.length || 0} ACTIVE</div>
                  </div>
                </div>
              </section>

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
          © 2026 SYNCCLIP PUBLISHING GROUP // DISTRIBUTED ARCHIVAL CLIPBOARD // V4.2
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


