"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { debounce } from "../utils/debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { track } from "../utils/analytics";
import { useExperiment } from "../utils/experiments";
import { sendError, sendInfo } from "../utils/discord";
import SecondDeviceCTA from "./SecondDeviceCTA";
import PWAInstallPrompt from "./PWAInstallPrompt";
import { getRandomCopyBlock, CopyBlock } from "../utils/headlines";

export default function ClipboardEditor({ session }: { session: any }) {
  const update = useMutation(api.sessions.updateText);
  const updatePresence = useMutation(api.sessions.updatePresence);
  const restoreHistory = useMutation(api.sessions.restoreHistory);
  const toggleLockMutation = useMutation(api.sessions.toggleLock);
  const toggleBurnMutation = useMutation(api.sessions.toggleBurnMode);
  const burnMutation = useMutation(api.sessions.burnSession);
  const deleteSessionMutation = useMutation(api.sessions.deleteSession);
  const toggleNodeWriteAccess = useMutation(api.sessions.toggleNodeWriteAccess);
  const resetAllowedWriteNodes = useMutation(api.sessions.resetAllowedWriteNodes);
  const router = useRouter();

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

  const presence = useQuery(api.sessions.getPresence, { 
    sessionId: session._id,
    nodeId: nodeId
  });

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
  const lastDownloadedRef = useRef<number>(0);
  const firstKeystrokeTracked = useRef(false);
  const secondDeviceTracked = useRef(false);
  const qrTracked = useRef(false);
  const [copyBlock, setCopyBlock] = useState<CopyBlock | null>(null);
  const [showCollabPrompt, setShowCollabPrompt] = useState(false);
  const collabPromptShown = useRef(false);

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const feedbackEnabled = useExperiment("FEEDBACK_CAMPAIGN_ENABLED");
  const isRotatingHeadlinesEnabled = useExperiment("ROTATING_HEADLINES_ENABLED");
  const autoQRModalEnabled = useExperiment("AUTO_QR_MODAL_ENABLED");
  const isForceSecondDeviceEnabled = useExperiment("FORCE_SECOND_DEVICE_ENABLED");
  const modalTrackedRef = useRef(false);

  const incrementInteractions = useCallback(() => {
    if (!feedbackEnabled || localStorage.getItem("syncclip_feedback_done") === "true") return;
    if (typeof window !== "undefined" && sessionStorage.getItem("syncclip_feedback_session_closed") === "true") return;
    const count = parseInt(localStorage.getItem("syncclip_interactions") || "0", 10) + 1;
    localStorage.setItem("syncclip_interactions", count.toString());
    if (count >= 5) {
      setShowFeedbackModal(true);
    }
  }, [feedbackEnabled]);

  function handleDismissFeedback() {
    localStorage.setItem("syncclip_feedback_done", "true");
    setShowFeedbackModal(false);
    track("feedback_popup_dismissed", { timestamp: new Date().toISOString() });
    showToast("Feedback dismissed");
  }

  function handleCloseFeedback() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("syncclip_feedback_session_closed", "true");
    }
    setShowFeedbackModal(false);
    track("feedback_popup_closed", { timestamp: new Date().toISOString() });
  }

  function handleFeedbackClick() {
    track("feedback_popup_clicked", { timestamp: new Date().toISOString() });
    router.push(`/feedback?code=${session.code}`);
  }

  function handleDismissThankYou() {
    if (typeof window !== "undefined") {
      localStorage.setItem("syncclip_feedback_thanked_mtkqo", "true");
    }
    setShowThankYouModal(false);
  }

  useEffect(() => {
    if (typeof window === "undefined" || !nodeId) return;
    const thanked = localStorage.getItem("syncclip_feedback_thanked_mtkqo") === "true";
    if (nodeId === "NODE-MTKQO" && !thanked) {
      // Fire Discord message
      sendInfo("User NODE-MTKQO returned! ⚡", [
        { name: "Node ID", value: nodeId },
        { name: "Event", value: "Returned to editor / thank you modal shown" }
      ]);
      const timer = setTimeout(() => {
        setShowThankYouModal(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [nodeId]);
  useEffect(() => {
    if (typeof window === "undefined" || !presence || presence.length < 2) return;
    const sessionKey = `syncclip_paired_session_${session.code}`;
    if (sessionStorage.getItem(sessionKey) !== "true") {
      sessionStorage.setItem(sessionKey, "true");
      track("second_device_joined", {
        code: session.code,
        timestamp: new Date().toISOString()
      });
    }
  }, [presence, session.code]);
  useEffect(() => {
    if (typeof window === "undefined" || !feedbackEnabled) return;
    const feedbackDone = localStorage.getItem("syncclip_feedback_done") === "true";
    const sessionClosed = sessionStorage.getItem("syncclip_feedback_session_closed") === "true";
    const interactions = parseInt(localStorage.getItem("syncclip_interactions") || "0", 10);
    if (!feedbackDone && !sessionClosed && interactions >= 1) {
      setShowFeedbackModal(true);
    }
  }, [feedbackEnabled]);

  useEffect(() => {
    if (showFeedbackModal && !modalTrackedRef.current) {
      track("feedback_popup_shown", { timestamp: new Date().toISOString() });
      modalTrackedRef.current = true;
    }
  }, [showFeedbackModal]);

  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_APP_URL || "https://syncclip.in";
  };

  const qrUrl = `${getBaseUrl()}/${session.code}`;

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

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const isOwner = session.ownerNodeId === nodeId;
  const isLocked = session.isLocked;
  const isAllowedWriter = session.allowedWriteNodeIds?.includes(nodeId) || false;
  const canEdit = !isLocked || isOwner || isAllowedWriter;

  // Initialize Name and Headline
  useEffect(() => {
    const savedName = localStorage.getItem("syncclip_user_name");
    if (savedName) {
      setUserName(savedName);
      setIsNameFixed(true);
    } else {
      setSuggestedName(generateRandomName());
    }

    if (isRotatingHeadlinesEnabled) {
      setCopyBlock(getRandomCopyBlock());
    }

    // Auto-show QR modal on first entry ONLY for session owner if alone and flag is enabled
    const hasSeenQR = sessionStorage.getItem(`syncclip_qr_shown_${session.code}`);
    if (isOwner && autoQRModalEnabled && presence?.length === 1 && !hasSeenQR) {
      setShowQRModal(true);
      sessionStorage.setItem(`syncclip_qr_shown_${session.code}`, "true");
      // Tracking will be handled by the useEffect watching showQRModal
    }
  }, [generateRandomName, presence?.length, session.code, isOwner, autoQRModalEnabled]);


  // Track QR View (Once per modal show)
  useEffect(() => {
    if (showQRModal && !qrTracked.current) {
      track("qr_viewed", { timestamp: new Date().toISOString() });
      qrTracked.current = true;
    } else if (!showQRModal) {
      qrTracked.current = false; // Reset when closed so it tracks on next open
    }
  }, [showQRModal]);

  // Presence Heartbeat (with Visibility Throttling)
  useEffect(() => {
    if (!isNameFixed || !userName) return;

    const heartbeat = () => {
      if (document.visibilityState === "hidden") return;
      updatePresence({
        sessionId: session._id,
        name: userName,
        nodeId: nodeId,
      }).catch((err) => {
        sendError("Presence heartbeat failed", err instanceof Error ? err.message : String(err), {
          nodeId,
          sessionId: session.code,
        });
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
      lastDownloadedRef.current = Date.now(); // SET SEMAPHORE
      if (autoSyncEnabled && typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(session.text).then(() => {
          showToast("Remote Uplink Copied to Clipboard");
        }).catch((e) => {
          console.error("Auto-sync failed:", e);
        });
      }
    }
  }, [session.text]); // Exclude text and autoSyncEnabled to prevent loop

  // Track when second device joins
  useEffect(() => {
    if (presence && presence.length > 1) {
      if (!secondDeviceTracked.current) {
        track("second_device_joined", {
          deviceCount: presence.length,
          timestamp: new Date().toISOString(),
        });
        secondDeviceTracked.current = true;
      }
    }
  }, [presence]);

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

  // Burn Protocol self-destruct timer
  useEffect(() => {
    if (session.isBurnMode && text !== "") {
      const tm = setTimeout(() => {
        burnMutation({ id: session._id })
          .then(() => {
            showToast("🔥 Text self-destructed! (Burn Mode remains ARMED)");
          })
          .catch((err) => {
            sendError("Burn execution failed", err instanceof Error ? err.message : String(err), {
              sessionId: session.code,
              nodeId,
            });
          });
      }, 5000);
      return () => clearTimeout(tm);
    }
  }, [session.isBurnMode, session._id, text, burnMutation, nodeId]);

  // Smart Clipboard Polling (Upload to Cloud)
  useEffect(() => {
    if (!autoReadEnabled || !canEdit) return;

    const checkClipboard = async () => {
      // Only check if window is focused to respect browser security & user privacy
      if (document.hidden || !document.hasFocus()) return;

      try {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          const localText = await navigator.clipboard.readText();
          // Only update if local clipboard differs from both cloud AND current local state
          if (localText && localText !== session.text && localText !== text) {
            // Guard clause: Only trigger upload if we haven't recently downloaded
            if (Date.now() - lastDownloadedRef.current < 1500) {
              return; // Ignore local reads during the synchronization settling period
            }

            setText(localText);
            setIsSyncing(true);
            update({ id: session._id, text: localText, callerNodeId: nodeId })
              .catch((err) => {
                sendError("Auto-read clipboard sync failed", err instanceof Error ? err.message : String(err), {
                  nodeId,
                  sessionId: session.code,
                });
              })
              .finally(() => {
                setIsSyncing(false);
                showToast("Local Clipboard Uploaded to Cloud");
              });
          }
        }
      } catch (err) {
        // Silently fail if permission not granted yet, or log if restricted
        console.debug("Clipboard read restricted or permission denied.");
      }
    };

    // Immediate check on focus
    window.addEventListener("focus", checkClipboard);
    
    // 1s Polling Interval while focused
    const pollInterval = setInterval(checkClipboard, 1000);

    return () => {
      window.removeEventListener("focus", checkClipboard);
      clearInterval(pollInterval);
    };
  }, [autoReadEnabled, session.text, text, session._id, update, nodeId, canEdit]);

  const debouncedUpdate = useCallback(
    debounce((newText: string) => {
      if (!canEdit) return;
      setIsSyncing(true);
      update({ id: session._id, text: newText, callerNodeId: nodeId })
        .then(() => {
          incrementInteractions();
          const syncedKey = `syncclip_text_synced_${session.code}`;
          if (sessionStorage.getItem(syncedKey) !== "true") {
            sessionStorage.setItem(syncedKey, "true");
            track("text_synced", {
              code: session.code,
              timestamp: new Date().toISOString()
            });
          }
        })
        .catch((err) => {
          sendError("Text sync failed", err instanceof Error ? err.message : String(err), {
            nodeId,
            sessionId: session.code,
            textLength: newText.length,
          });
        })
        .finally(() => {
          setIsSyncing(false);
        });
    }, 500),
    [update, session._id, nodeId, canEdit, incrementInteractions]
  );

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    
    // Experiment Flag F: Track first keystroke
    if (!firstKeystrokeTracked.current && value.length > 0) {
      track("first_keystroke", { timestamp: new Date().toISOString() });
      firstKeystrokeTracked.current = true;
      // Dispatch custom event for PWA nudge (Part D)
      window.dispatchEvent(new Event('first_keystroke'));
    }

    setText(value);
    debouncedUpdate(value);

    // Code-paste collaboration prompt: detect code-like content
    if (
      !collabPromptShown.current &&
      value.length > 40 &&
      (presence?.length || 0) <= 1 &&
      typeof window !== "undefined" &&
      sessionStorage.getItem("syncclip_collab_prompt_dismissed") !== "true"
    ) {
      const codeSignals = /(?:function\s|const\s|let\s|var\s|import\s|export\s|<div|<span|=>|\{\s*\n|console\.|return\s|class\s)/;
      if (codeSignals.test(value)) {
        setShowCollabPrompt(true);
        collabPromptShown.current = true;
        track("collab_prompt_shown", { timestamp: new Date().toISOString() });
      }
    }
  }

  function handleCopyLink(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    if (typeof window !== "undefined") {
      const fullUrl = `${getBaseUrl()}/${session.code}`;
      navigator.clipboard.writeText(fullUrl);
      showToast("Link copied to clipboard");
      track("link_shared", { timestamp: new Date().toISOString() });
      incrementInteractions();
    }
  }

  function handleLeaveRoom() {
    track("room_left", { timestamp: new Date().toISOString() });
    router.push("/");
  }

  function handleClearNode() {
    if (!canEdit) return;
    setIsSyncing(true);
    setText("");
    track("node_cleared", { text_length: text.length, timestamp: new Date().toISOString() });
    update({ id: session._id, text: "", saveToHistory: true, callerNodeId: nodeId }).finally(() => {
      setIsSyncing(false);
      showToast("Node cleared & saved to history");
    });
  }

  function handleForceSync() {
    if (!canEdit) return;
    setIsSyncing(true);
    update({ id: session._id, text, saveToHistory: true, callerNodeId: nodeId })
      .then(() => {
        incrementInteractions();
      })
      .finally(() => {
        setIsSyncing(false);
        showToast("Force synced & saved to history");
      });
  }

  function handleRestore(idx: number) {
    if (!canEdit) return;
    track("history_restored", { history_index: idx, timestamp: new Date().toISOString() });
    restoreHistory({ id: session._id, index: idx, callerNodeId: nodeId }).catch((err) => {
      sendError("History restore failed", err instanceof Error ? err.message : String(err), {
        nodeId,
        sessionId: session.code,
        historyIndex: idx,
      });
    });
    setIsSidebarOpen(false);
  }

  function handleToggleLock() {
    if (!isOwner) return;
    const newLockedState = !isLocked;
    track("session_locked", { locked: newLockedState, timestamp: new Date().toISOString() });
    toggleLockMutation({ id: session._id, callerNodeId: nodeId, isLocked: newLockedState })
      .then(() => {
        showToast(`Node ${newLockedState ? "Locked" : "Unlocked"}`);
      })
      .catch((err) => {
        sendError("Toggle lock failed", err instanceof Error ? err.message : String(err), {
          nodeId,
          sessionId: session.code,
          newLockedState,
        });
      });
  }

  function handleToggleWriteAccess(targetNodeId: string, allow: boolean) {
    if (!isOwner) return;
    toggleNodeWriteAccess({
      id: session._id,
      callerNodeId: nodeId,
      targetNodeId,
      allow,
    })
      .then(() => {
        showToast(allow ? "Write access granted" : "Write access revoked");
      })
      .catch((err) => {
        sendError("Toggle write access failed", err instanceof Error ? err.message : String(err), {
          nodeId,
          sessionId: session.code,
          targetNodeId,
          allow,
        });
      });
  }

  function handleResetWriteAccess() {
    if (!isOwner) return;
    resetAllowedWriteNodes({
      id: session._id,
      callerNodeId: nodeId,
    })
      .then(() => {
        showToast("All write access revoked");
      })
      .catch((err) => {
        sendError("Reset write access failed", err instanceof Error ? err.message : String(err), {
          nodeId,
          sessionId: session.code,
        });
      });
  }

  function handleToggleBurn() {
    if (!isOwner) return;
    const newBurnState = !session.isBurnMode;
    track("burn_mode_toggled", { armed: newBurnState, timestamp: new Date().toISOString() });
    toggleBurnMutation({ id: session._id, callerNodeId: nodeId, isBurnMode: newBurnState })
      .then(() => {
        showToast(`Burn Protocol ${newBurnState ? "ARMED" : "DISARMED"}`);
        if (newBurnState) {
          sendInfo("Burn Mode Armed", [
            { name: "Session", value: `\`${session.code}\``, inline: true },
            { name: "Node", value: `\`${nodeId}\``, inline: true },
          ], { sessionId: session.code, nodeId });
        }
      })
      .catch((err) => {
        sendError("Toggle burn mode failed", err instanceof Error ? err.message : String(err), {
          nodeId,
          sessionId: session.code,
        });
      });
  }

  // Remove native confirm popup - handleDeleteSession removed in favor of clean handleLeaveRoom

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
    <div className="bg-surface font-body selection:bg-secondary selection:text-white min-h-screen flex flex-col viewport-locked overflow-y-auto">
      {/* Offline Banner */}
      {!isOnline && (
        <div className="bg-secondary text-white font-mono text-[10px] uppercase tracking-widest text-center py-2 z-[60] sticky top-0">
          NODE OFFLINE — CLOUD SYCHRONIZATION PAUSED
        </div>
      )}

      {/* Personalized Thank You Modal for feedback submitter (NODE-MTKQO) */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black/80 z-[250] flex items-center justify-center p-6 backdrop-blur-xs animate-fade-in" role="dialog" aria-labelledby="thankyou-popup-heading">
          <div className="bg-emerald-300 text-black border-4 border-black p-8 max-w-md w-full shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            <button 
              onClick={handleDismissThankYou} 
              aria-label="Close thank you"
              className="absolute top-4 right-4 text-black hover:text-secondary font-bold font-mono text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="font-mono text-[9px] tracking-[0.25em] text-emerald-300 bg-black px-2.5 py-1 uppercase font-bold inline-block self-start">
              ⚡ SYSTEM UPDATE TRANSMISSION
            </div>

            <h3 id="thankyou-popup-heading" className="font-headline text-3xl font-black uppercase tracking-tight leading-none text-black">
              THANK YOU, OPERATOR!
            </h3>

            <p className="font-body text-sm leading-relaxed font-bold text-zinc-900">
              We listened to your genuine feedback about the scrolling issue. We worked on it and solved it—you can try it out now! We hope you love it.
            </p>

            <p className="font-body text-sm leading-relaxed text-zinc-950">
              Your feedback is very precious to us, and we value your support. As one of our special power users, we appreciate you helping us shape SyncClip!
            </p>

            <p className="font-body text-xs text-zinc-700">
              Is there any other feedback you'd like to share to help us improve?
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() => {
                  handleDismissThankYou();
                  router.push(`/feedback?code=${session.code}`);
                }}
                className="bg-black text-white font-label font-bold py-4 uppercase tracking-widest text-sm hover:bg-secondary transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 text-center cursor-pointer"
              >
                Give More Feedback ⚡
              </button>
              <button
                onClick={handleDismissThankYou}
                className="font-mono text-[10px] uppercase text-zinc-600 hover:text-black tracking-widest font-bold self-center py-2 cursor-pointer"
              >
                No thanks, I'm good
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Pop-up Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/80 z-[250] flex items-center justify-center p-6 backdrop-blur-xs animate-fade-in" role="dialog" aria-labelledby="feedback-popup-heading">
          <div className="bg-yellow-300 text-black border-4 border-black p-8 max-w-md w-full shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative flex flex-col gap-6" onClick={e => e.stopPropagation()}>
            {/* Close button X */}
            <button 
              onClick={handleCloseFeedback} 
              aria-label="Close modal"
              className="absolute top-4 right-4 text-black hover:text-secondary font-bold font-mono text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="font-mono text-[9px] tracking-[0.25em] text-yellow-300 bg-black px-2.5 py-1 uppercase font-bold inline-block self-start">
              ⚡ POWER USER STATUS
            </div>

            <h3 id="feedback-popup-heading" className="font-headline text-3xl font-black uppercase tracking-tight leading-none text-black">
              THANK YOU, OPERATOR.
            </h3>

            <p className="font-body text-sm leading-relaxed font-bold text-zinc-900">
              We noticed you’ve been using SyncClip quite a bit — thank you so much! Since you’re officially one of our active power users, we’d love your help deciding what features to build next.
            </p>

            <p className="font-body text-xs italic text-zinc-700">
              Could you spare 45 seconds to share your feedback?
            </p>

            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={handleFeedbackClick}
                className="bg-black text-white font-label font-bold py-4 uppercase tracking-widest text-sm hover:bg-secondary transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
              >
                Share Feedback ⚡
              </button>
              <button
                onClick={handleDismissFeedback}
                className="font-mono text-[10px] uppercase text-zinc-600 hover:text-black tracking-widest font-bold self-center py-2"
              >
                No thanks, dismiss
              </button>
            </div>
          </div>
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
                    { id: 'sync', label: 'force sync', icon: 'sync' },
                    { id: 'leave', label: 'leave room', icon: 'logout' }
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
                     if (cmd === 'leave') handleLeaveRoom();
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
                { id: 'sync', label: 'force sync', icon: 'sync' },
                { id: 'leave', label: 'leave room', icon: 'logout' }

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
                    if (cmd.id === 'pair') {
                      setShowQRModal(true);
                    }
                    if (cmd.id === 'burn') handleToggleBurn();
                    if (cmd.id === 'sync') handleForceSync();
                    if (cmd.id === 'leave') handleLeaveRoom();
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
              {['clear', 'copy', 'lock', 'pair', 'burn', 'sync', 'leave'].filter(cmd => cmd.includes(paletteQuery.toLowerCase())).length === 0 && (
                <div className="p-6 text-center text-zinc-400 italic text-xs tracking-widest">COMMAND NOT RECOGNIZED</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* QR Modal Overlay */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-6 backdrop-blur-sm" onClick={() => setShowQRModal(false)}>
          <div className="bg-white border-4 border-black p-8 sm:p-10 flex flex-col items-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-black hover:text-secondary material-symbols-outlined text-xl" onClick={() => setShowQRModal(false)}>close</button>
            <div className="font-mono text-[10px] tracking-[0.3em] text-secondary mb-2 uppercase font-bold">Optical Pairing</div>
            <h2 className="font-headline text-2xl font-black mb-6 uppercase text-center">Scan to Connect Node</h2>
            <div className="bg-white p-4 border-2 border-black inline-block mb-4 relative group cursor-pointer hover:border-secondary transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {qrUrl && (
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrUrl)}`} alt="Session QR Code" className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]" />
              )}
            </div>
            <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest text-center mb-6 leading-relaxed">
              Scan from any mobile device to directly access this clipboard cluster.
            </p>
            <button
              onClick={() => setShowQRModal(false)}
              className="w-full bg-secondary text-white font-label font-bold py-3.5 px-4 border-2 border-black hover:bg-black hover:text-white transition-colors uppercase tracking-[0.2em] text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Got It, Start Typing
            </button>
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
          <button
            aria-label="Leave room"
            className="text-orange-500 border-b border-transparent hover:text-orange-700 hover:border-orange-700 transition-colors cursor-pointer uppercase shrink-0 font-bold"
            onClick={handleLeaveRoom}
          >
            LEAVE
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="pt-10 flex-grow flex flex-col relative min-h-0">
        {/* Minimal Editorial Header */}
        <section className="flex flex-row justify-between items-center w-full px-6 py-4 border-b-2 border-black flex-shrink-0">
          <div className="font-mono text-xs tracking-[0.25em] text-black uppercase flex items-center gap-3">
            <span>INSTANT SYNC. ZERO FRICTION.</span>
            <span className="text-black inline-block px-2 border border-black text-[9px]">NODE_{session.code}</span>
          </div>
          <nav className="hidden sm:flex items-center font-label text-sm font-bold tracking-widest" aria-label="Main navigation">
            <span className="text-black border-b-4 border-black pb-1">
              CLIPBOARD
            </span>
          </nav>
        </section>

        {/* Editorial Interface Grid */}
        <div className="editorial-grid flex-grow min-h-0 h-full">
          {/* Left Column: Primary Interaction */}
          <div className="p-6 border-r border-black flex flex-col min-h-0 h-full">
            
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-baseline sm:items-center gap-2">
              <div className="font-mono text-xs font-bold tracking-[0.3em] text-secondary uppercase flex items-center gap-2 flex-wrap">
                <span className={`w-2 h-2 rounded-full ${isOnline ? "bg-secondary animate-pulse" : "bg-zinc-400"} block`}></span>
                {isOnline ? "LIVE UPLINK ACTIVE" : "UPLINK SIGNAL LOST"}
                {isLocked && !isOwner && (
                  canEdit ? (
                    <span className="text-secondary ml-2 font-black">(AUTHORIZED WRITER)</span>
                  ) : (
                    <span className="text-zinc-500 ml-2">(READ ONLY)</span>
                  )
                )}
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
            <div className="flex-grow flex flex-col relative group min-h-0">
              <div className="absolute -top-3 left-6 bg-white px-2 font-mono text-[10px] tracking-widest text-on-surface-variant z-10 select-none">
                INPUT_STREAM
              </div>
              <textarea
                aria-label="Clipboard Text Input"
                maxLength={100000}
                readOnly={!canEdit}
                className={`w-full h-0 min-h-[100px] flex-grow p-6 md:p-10 font-body text-xl md:text-2xl leading-relaxed border ${!canEdit ? 'border-zinc-300 bg-zinc-50 text-zinc-500 cursor-not-allowed' : 'border-black focus:border-secondary'} focus:outline-none focus:ring-0 transition-all resize-none placeholder:text-zinc-300`}
                placeholder={canEdit ? (copyBlock?.hook || "Awaiting your next masterpiece...") : "This node is locked. No entry for you."}
                value={text}
                onChange={handleChange}
              />
              <div className="mt-4 flex flex-wrap gap-4 justify-between items-center border-t border-black pt-4 flex-shrink-0">
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

            {/* Collaboration Prompt for Code Pastes */}
            {showCollabPrompt && (presence?.length || 0) <= 1 && (
              <div className="flex items-center justify-between gap-4 px-4 py-3 bg-blue-50 border border-blue-200 flex-shrink-0">
                <p className="font-mono text-[10px] tracking-wider text-blue-800 uppercase">
                  ⚡ Working with a teammate? <button onClick={handleCopyLink} className="underline font-bold hover:text-secondary cursor-pointer">Share your room link</button> so they can see this instantly.
                </p>
                <button
                  onClick={() => {
                    setShowCollabPrompt(false);
                    sessionStorage.setItem("syncclip_collab_prompt_dismissed", "true");
                    track("collab_prompt_dismissed", { timestamp: new Date().toISOString() });
                  }}
                  className="text-blue-400 hover:text-blue-800 font-mono text-xs font-bold cursor-pointer flex-shrink-0"
                  aria-label="Dismiss collaboration prompt"
                >
                  ✕
                </button>
              </div>
            )}

            {/* SecondDeviceCTA: Inline nudge to connect a second device (only rendered when needed) */}
            {isForceSecondDeviceEnabled && (presence?.length || 0) <= 1 && (
              <SecondDeviceCTA
                participantCount={presence?.length || 0}
                qrUrl={qrUrl}
                copyBlock={copyBlock || undefined}
              />
            )}
            {/* Interaction Layer: Action Buttons */}
            <div className="mt-6 flex-shrink-0">
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
                    track("text_copied", { text_length: text.length, timestamp: new Date().toISOString() });
                    incrementInteractions();
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
                  CONNECT
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
                        Connect Node
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
                    {/* Auto-Push (Hidden per user request) */}
                    {/* 
                    <div className="flex flex-col border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex justify-between items-center">
                        ...
                      </div>
                    </div> 
                    */}

                    {/* Auto-Read (Hidden per user request) */}
                    {/* 
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
                    */}

                    {/* Node Lock */}
                    {isOwner && (
                      <div className="flex flex-col border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:border-zinc-800">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 border-2 border-black bg-zinc-100 flex items-center justify-center font-bold text-sm shrink-0">
                              <span className="material-symbols-outlined text-base text-zinc-900">lock</span>
                            </div>
                            <span className="font-label font-bold uppercase tracking-widest text-xs">
                              Lock Node (Read-Only)
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setActiveInfo(activeInfo === 'lock' ? null : 'lock')}
                              className={`w-7 h-7 border-2 border-black flex items-center justify-center text-xs font-bold transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] ${
                                activeInfo === 'lock' ? 'bg-black text-white' : 'bg-white hover:bg-zinc-100 text-zinc-800'
                              }`}
                              title="Feature Information"
                            >
                              <span className="material-symbols-outlined text-sm">{activeInfo === 'lock' ? 'close' : 'help'}</span>
                            </button>
                            <button
                              onClick={handleToggleLock}
                              className={`w-12 h-6 border-2 border-black relative transition-colors shrink-0 ${isLocked ? 'bg-zinc-900' : 'bg-zinc-200'}`}
                            >
                              <div className={`absolute top-0.5 bottom-0.5 w-4 bg-white border border-black transition-all ${isLocked ? 'right-0.5' : 'left-0.5'}`}></div>
                            </button>
                          </div>
                        </div>
                        {activeInfo === 'lock' && (
                          <div className="mt-4 pt-3 border-t-2 border-dashed border-zinc-200 font-mono text-[11px] text-zinc-700 leading-relaxed bg-zinc-50 p-3.5 border border-zinc-200 shadow-sm">
                            <div className="flex items-center gap-1.5 font-bold uppercase text-zinc-900 mb-1.5 pb-1 border-b border-zinc-200">
                              <span className="material-symbols-outlined text-sm text-secondary">security</span>
                              Read-Only Lock Mode
                            </div>
                            <p className="mb-2 text-[10px] uppercase text-zinc-600">
                              Prevents visitors from modifying or overwriting your clipboard content. Only the origin node can unlock it.
                            </p>
                            <div className="bg-secondary/10 border border-secondary/30 p-2.5 text-[10px] text-secondary font-bold uppercase flex items-start gap-2">
                              <span className="material-symbols-outlined text-sm shrink-0">devices</span>
                              <span>
                                💡 <strong>Delegated Write Access:</strong> You can grant write access to specific connected devices by choosing them from the Active Nodes list in the sidebar.
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Burn Protocol */}
                    <div className={`flex flex-col border-2 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${session.isBurnMode ? 'bg-orange-50/80 border-orange-500 ring-2 ring-orange-500/20' : 'bg-white border-black'}`}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 border-2 border-black bg-orange-100 flex items-center justify-center font-bold text-sm shrink-0">
                            <span className="material-symbols-outlined text-base text-orange-600">local_fire_department</span>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-label font-bold uppercase tracking-widest text-xs ${session.isBurnMode ? 'text-orange-600' : 'text-black'}`}>
                              Burn Protocol
                            </span>
                            <span className="bg-orange-500/10 text-orange-600 text-[9px] font-mono font-bold px-1.5 py-0.5 border border-orange-500/30 uppercase tracking-tighter">
                              5s Self-Destruct
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveInfo(activeInfo === 'burn' ? null : 'burn')}
                            className={`w-7 h-7 border-2 border-black flex items-center justify-center text-xs font-bold transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] ${
                              activeInfo === 'burn' ? 'bg-orange-500 text-white' : 'bg-orange-100 hover:bg-orange-200 text-orange-800'
                            }`}
                            title="Feature Information"
                          >
                            <span className="material-symbols-outlined text-sm">{activeInfo === 'burn' ? 'close' : 'help'}</span>
                          </button>
                          <button
                            onClick={handleToggleBurn}
                            disabled={!isOwner}
                            className={`w-12 h-6 border-2 relative transition-colors shrink-0 ${!isOwner ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'} ${session.isBurnMode ? 'bg-orange-500 border-orange-600' : 'bg-zinc-200 border-black'}`}
                            title={isOwner ? "Toggle Burn Mode" : "Only origin node can change Burn Mode"}
                          >
                            <div className={`absolute top-0.5 bottom-0.5 w-4 bg-white border border-black transition-all ${session.isBurnMode ? 'right-0.5' : 'left-0.5'}`}></div>
                          </button>
                        </div>
                      </div>

                        {/* Detailed Burn Mode Info Card */}
                        {activeInfo === 'burn' && (
                          <div className="mt-4 pt-3 border-t-2 border-dashed border-orange-300 font-mono text-[11px] text-orange-950 leading-relaxed bg-orange-100/80 p-3.5 border border-orange-300 shadow-sm">
                            <div className="flex items-center justify-between font-bold uppercase text-orange-700 mb-2 pb-1 border-b border-orange-300/60">
                              <span className="flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm text-orange-600">timer</span>
                                5-Second Self-Destruct Protocol
                              </span>
                              <span className={`text-[9px] px-2 py-0.5 border font-bold uppercase ${session.isBurnMode ? 'bg-orange-500 text-white border-orange-600 animate-pulse' : 'bg-zinc-200 text-zinc-700 border-zinc-400'}`}>
                                {session.isBurnMode ? 'ARMED' : 'DISARMED'}
                              </span>
                            </div>
                            
                            <ul className="space-y-1.5 text-[10px] text-orange-900 uppercase">
                              <li className="flex items-start gap-1.5">
                                <span className="text-orange-600 font-bold">•</span>
                                <span><strong>5s Countdown:</strong> Automatically wipes text &amp; history 5 seconds after text is present.</span>
                              </li>
                              <li className="flex items-start gap-1.5">
                                <span className="text-orange-600 font-bold">•</span>
                                <span><strong>Persistent Arming:</strong> Burn Mode remains active for all clips until you manually toggle it off.</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                    {/* Exit Room */}
                    <div className="mt-8 pt-8 border-t-2 border-zinc-100 flex flex-col gap-3">
                      <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest text-center">Session Navigation</div>
                      <button
                        onClick={handleLeaveRoom}
                        className="w-full bg-black text-white font-label font-bold py-4 px-4 border-2 border-black hover:bg-secondary hover:text-white transition-colors uppercase tracking-[0.2em] text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                      >
                        Exit Room
                      </button>
                    </div>

                    {/* Status Info / Expiration Note (Updated to remove hidden features reference) */}
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
              <section className="p-6 border-b border-black" aria-label="Session Telemetry">
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
                    <li key={p._id} className="flex flex-col gap-1 border-b border-zinc-100 pb-2">
                      <div className="flex justify-between items-center w-full">
                        <span className={`${p.isMe ? "text-black font-bold" : "text-zinc-600"} truncate pr-2`}>
                          {p.name} {p.isMe && "(YOU)"}
                          {isLocked && p.isWriter && !p.isMe && (
                            <span className="ml-2 text-secondary text-[9px] font-bold font-mono uppercase bg-secondary/10 px-1 py-0.5 rounded">
                              [WRITER]
                            </span>
                          )}
                        </span>
                        <span className="text-secondary text-[8px] animate-pulse uppercase font-black shrink-0">active</span>
                      </div>
                      
                      {isLocked && isOwner && !p.isMe && p.nodeId && (
                        <div className="flex items-center justify-between w-full mt-1.5 pt-1.5 border-t border-dashed border-zinc-200">
                          <span className="font-mono text-[9px] text-zinc-500 uppercase">Delegated Write:</span>
                          <button
                            onClick={() => handleToggleWriteAccess(p.nodeId, !p.isWriter)}
                            className={`px-2 py-0.5 border text-[9px] font-bold font-mono tracking-wider transition-all uppercase ${
                              p.isWriter
                                ? "bg-black text-white border-black hover:bg-zinc-800"
                                : "bg-white text-zinc-600 border-zinc-300 hover:text-black hover:border-black"
                            }`}
                          >
                            {p.isWriter ? "ON" : "OFF"}
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                  {(!presence || presence.length === 0) && (
                    <li className="text-zinc-400 italic">No nodes detected</li>
                  )}
                  {isLocked && isOwner && session.allowedWriteNodeIds && session.allowedWriteNodeIds.length > 0 && (
                    <li className="pt-2">
                      <button
                        onClick={handleResetWriteAccess}
                        className="w-full text-center py-1.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors font-mono text-[9px] font-bold uppercase tracking-widest"
                      >
                        REVOKE ALL WRITE ACCESS
                      </button>
                    </li>
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

          {/* PWA Nudge (Part D) */}
          <PWAInstallPrompt />
        </div>
      </main>

      {/* Footer Ribbon */}
      <footer className="mt-auto border-t-2 border-black p-6 flex flex-col md:flex-row justify-between items-center bg-white" role="contentinfo">
        <div className="font-mono text-[9px] tracking-widest text-on-surface-variant mb-4 md:mb-0 uppercase text-center md:text-left">
          © 2026 SYNCCLIP PUBLISHING GROUP // DISTRIBUTED ARCHIVAL CLIPBOARD // V4.2
        </div>
        <Link 
          href="/" 
          className="font-mono text-[10px] font-black uppercase tracking-widest text-secondary hover:text-black transition-colors flex items-center gap-2 border-b-2 border-transparent hover:border-black"
        >
          <span>Create Your Own Node_</span>
          <span className="material-symbols-outlined text-[14px]">north_east</span>
        </Link>
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


