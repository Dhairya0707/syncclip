# Temporary Feature Override Logs

This file documents temporary features, hotfixes, or experimental overrides deployed in the SyncClip codebase that are slated for removal or cleanup.

---

## ⚡ targeted Thank You Modal & Discord Ping (User NODE-MTKQO)
* **Date Added**: June 27, 2026
* **Purpose**: Personalized acknowledgment for the first user feedback submission (scrolling layout issue) from node ID `NODE-MTKQO`. Appreciates their input, lets them know we fixed the bug, and alerts us on Discord when they return.
* **Cleanup Schedule**: Remove after 7-14 days.

### Code Locations to Remove

When you are ready to delete this temporary logic, remove the following blocks from [`components/ClipboardEditor.tsx`](file:///Users/dhairyadarji/Developer/experiments/syncclip/components/ClipboardEditor.tsx):

#### 1. State and Handlers (Lines ~69-125)
Remove the `showThankYouModal` state, `handleDismissThankYou` function, and the `nodeId` check `useEffect` hook:
```typescript
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  
  // ...
  
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
```

#### 2. Modal Markup (Lines ~607-655)
Remove the thank-you modal render block inside the return statement of `ClipboardEditor`:
```tsx
      {/* Personalized Thank You Modal for feedback submitter (NODE-MTKQO) */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black/80 z-[250] flex items-center justify-center p-6 backdrop-blur-xs animate-fade-in" role="dialog" aria-labelledby="thankyou-popup-heading">
          {/* Modal Content */}
          ...
        </div>
      )}
```

---
*Created by Antigravity AI.*
