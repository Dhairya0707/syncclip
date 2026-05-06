# SyncClip Experiment Flags — Implementation Guide

**Status**: Ready to implement. Each flag is independent, can be toggled on/off without touching core logic.

**Execution order**: F → A → C → D → B

**Risk level**: Low. All changes are additive. Disabling a flag removes the feature instantly with zero fallback needed.

---

## Part 0: The Experiments Config File

**Create this file first. Everything else depends on it.**

**File path**: `config/experiments.ts` (or `lib/experiments.ts` — wherever your config files live)

```typescript
// config/experiments.ts
// Centralized feature flags for A/B tests and activation funnel experiments
// Toggle any flag to true/false — no code changes needed

export const EXPERIMENTS = {
  // Flag F: Event tracking (Vercel Analytics custom events)
  TRACKING_ENABLED: true,

  // Flag A: 5-second redirect nudge bar on homepage
  REDIRECT_NUDGE_ENABLED: true,

  // Flag C: Prominent second device CTA strip in room view
  FORCE_SECOND_DEVICE_ENABLED: true,

  // Flag D: PWA install prompt after first keystroke
  PWA_NUDGE_ENABLED: true,

  // Flag B: Rotating post-room-creation headlines
  ROTATING_HEADLINES_ENABLED: true,
};

// Helper function — use this everywhere instead of importing the whole object
export const isExperimentEnabled = (
  flagName: keyof typeof EXPERIMENTS,
): boolean => {
  return EXPERIMENTS[flagName];
};
```

**To disable any experiment**: change `true` to `false`. That's it. The feature will not load, no console errors, no broken fallbacks.

---

## Part F: Event Tracking (Do this first)

**Why first**: You need this data before running any other experiment. Otherwise you won't know if A, C, or D are actually moving the numbers.

**What you're adding**: 5 simple `va.track()` calls to track user activation flow.

**Risk**: Zero. This is read-only instrumentation. No UI changes, no backend changes.

---

### F.1: Import Vercel Analytics in your component files

**Location**: Wherever you have your main interactive components (ClipboardEditor, homepage, etc.)

At the top of each file, add:

```typescript
import { track } from "@vercel/analytics";
// OR if your import is different:
import { track as vaTrack } from "@vercel/analytics";
```

(You likely already have this imported somewhere — just verify.)

---

### F.2: Add the 5 tracking calls

**Event 1: `room_created`**

Location: Wherever you generate a new session code (likely in your session creation mutation handler or the component that calls `createSession`)

```typescript
// When a new room is successfully created:
track("room_created", {
  timestamp: new Date().toISOString(),
});
```

**Where to place it**: Right after the session code is generated and you have a valid room ID. If you use Convex mutations:

```typescript
const handleCreateRoom = async () => {
  const code = await createSession(); // your existing mutation

  // ADD THIS LINE:
  if (code) track("room_created", { timestamp: new Date().toISOString() });

  router.push(`/${code}`);
};
```

---

**Event 2: `first_keystroke`**

Location: ClipboardEditor component, on the textarea `onChange` handler

```typescript
// Add a ref to track if we've fired this event yet
const firstKeystrokeTracked = useRef(false);

const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const value = e.target.value;

  // Track first keystroke only once
  if (!firstKeystrokeTracked.current && value.length > 0) {
    track("first_keystroke", { timestamp: new Date().toISOString() });
    firstKeystrokeTracked.current = true;
  }

  // Your existing text update logic:
  setText(value);
  update({ id: session._id, text: value });
};
```

---

**Event 3: `qr_viewed`**

Location: Wherever the QR code modal or QR section becomes visible (likely a button click or modal open handler)

```typescript
const handleOpenQR = () => {
  track("qr_viewed", { timestamp: new Date().toISOString() });

  // Your existing modal/display logic:
  setQRModalOpen(true);
};
```

Or if the QR is always visible but hidden:

```typescript
useEffect(() => {
  // On mount, if QR is visible in the DOM:
  const qrElement = document.querySelector("[data-qr-code]");
  if (qrElement) {
    track("qr_viewed", { timestamp: new Date().toISOString() });
  }
}, []);
```

---

**Event 4: `second_device_joined`**

Location: Your presence/participant tracking logic. Fires when a second device joins the session.

```typescript
// In ClipboardEditor or wherever you track connected devices:
const session = useQuery(api.sessions.getSession, { code });
const presence = useQuery(api.sessions.getPresence, { code });

// Track when second device joins
useEffect(() => {
  if (presence && presence.length > 1) {
    // Only fire once
    if (!secondDeviceTracked.current) {
      track("second_device_joined", {
        deviceCount: presence.length,
        timestamp: new Date().toISOString(),
      });
      secondDeviceTracked.current = true;
    }
  }
}, [presence]);
```

(Create a `useRef` at the top of the component: `const secondDeviceTracked = useRef(false);`)

---

**Event 5: `pwa_prompted`**

Location: Where you'll add the PWA install prompt (Flag D, coming later). For now, just note where this goes.

Once you implement Flag D, the prompt component will look like:

```typescript
const handlePWAInstall = () => {
  track("pwa_prompted", {
    action: "accepted",
    timestamp: new Date().toISOString(),
  });
  // Your existing install logic
};

const handlePWADismiss = () => {
  track("pwa_prompted", {
    action: "dismissed",
    timestamp: new Date().toISOString(),
  });
  // Your dismiss logic
};
```

---

### F.3: Verify in Vercel Dashboard

Once deployed, go to Vercel → Your project → Analytics tab → look for custom events. You should see your 5 events firing. If you don't see them after 10 minutes, check browser console for errors.

---

## Part A: Redirect Nudge Bar (5-second countdown)

**What it does**: A dismissible top banner on the homepage that counts down 5 seconds, then redirects to room creation. Users can cancel and keep reading.

**When to use**: First-time visitors who seem ready to try it.

**How to toggle off**: Set `REDIRECT_NUDGE_ENABLED: false` in `config/experiments.ts`.

---

### A.1: Create the nudge bar component

**File**: Create a new file at `components/RedirectNudgeBar.tsx`

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isExperimentEnabled } from '@/config/experiments';

export default function RedirectNudgeBar() {
  const [countdown, setCountdown] = useState(5);
  const [dismissed, setDismissed] = useState(false);
  const router = useRouter();

  // Don't render if flag is off
  if (!isExperimentEnabled('REDIRECT_NUDGE_ENABLED')) {
    return null;
  }

  // Don't render if already dismissed this session
  if (dismissed) {
    return null;
  }

  useEffect(() => {
    if (countdown <= 0) {
      // Redirect to room creation
      router.push('/');
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  const handleDismiss = () => {
    setDismissed(true);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 20px',
      backgroundColor: '#057DBC', // SyncClip primary blue
      color: '#fff',
      fontSize: '14px',
      fontWeight: 500,
    }}>
      <span>
        Experience SyncClip live in <strong>{countdown}s</strong> →
      </span>
      <button
        onClick={handleDismiss}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '0 8px',
        }}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
```

---

### A.2: Add the bar to your homepage

In your homepage component (likely `app/page.tsx` or similar):

```typescript
import RedirectNudgeBar from '@/components/RedirectNudgeBar';

export default function HomePage() {
  return (
    <>
      <RedirectNudgeBar />

      {/* Your existing homepage content */}
      {/* ... rest of your page ... */}
    </>
  );
}
```

**That's it for A.**

When `REDIRECT_NUDGE_ENABLED` is `false`, the component returns `null` and nothing renders.

---

## Part C: Prominent Second Device CTA Strip

**What it does**: A full-width call-to-action strip above the textarea in the room view that says "This works best with 2 devices. Scan to connect your phone →" with the QR code inline. Hides automatically when a second device joins.

**Why this matters**: The product only becomes real when two devices sync. Users need to be aggressively reminded of this immediately after creating a room.

**How to toggle off**: Set `FORCE_SECOND_DEVICE_ENABLED: false` in `config/experiments.ts`.

---

### C.1: Create the second device CTA component

**File**: Create `components/SecondDeviceCTA.tsx`

```typescript
'use client';

import { useMemo } from 'react';
import { isExperimentEnabled } from '@/config/experiments';

interface SecondDeviceCTAProps {
  participantCount: number; // Pass from your presence data
  qrCodeUrl?: string; // URL or data URI to your QR code
  onClose?: () => void;
}

export default function SecondDeviceCTA({
  participantCount,
  qrCodeUrl,
  onClose
}: SecondDeviceCTAProps) {
  // Don't render if flag is off
  if (!isExperimentEnabled('FORCE_SECOND_DEVICE_ENABLED')) {
    return null;
  }

  // Hide if second device already joined
  if (participantCount > 1) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '16px 20px',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #ddd',
      marginBottom: '16px',
      borderRadius: '6px',
    }}>
      <div style={{ flex: 1 }}>
        <p style={{
          margin: '0 0 8px 0',
          fontSize: '14px',
          fontWeight: 500,
          color: '#000',
        }}>
          This works best with 2 devices
        </p>
        <p style={{
          margin: 0,
          fontSize: '13px',
          color: '#666',
        }}>
          Scan the QR code with your phone to connect and sync instantly
        </p>
      </div>

      {qrCodeUrl && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}>
          <img
            src={qrCodeUrl}
            alt="Room QR code"
            style={{
              width: '100px',
              height: '100px',
              border: '2px solid #057DBC',
              borderRadius: '6px',
            }}
          />
          <span style={{
            fontSize: '11px',
            color: '#666',
            textAlign: 'center',
          }}>
            Scan now
          </span>
        </div>
      )}

      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '18px',
            color: '#999',
            padding: '4px',
          }}
          aria-label="Dismiss second device prompt"
        >
          ✕
        </button>
      )}
    </div>
  );
}
```

---

### C.2: Add the strip to your room view

In your `ClipboardEditor.tsx` component (or wherever your room textarea is), add it **above** the textarea:

```typescript
import SecondDeviceCTA from '@/components/SecondDeviceCTA';

export default function ClipboardEditor({ session }) {
  // ... your existing code ...

  // Get participant count from your presence query
  const presence = useQuery(api.sessions.getPresence, { code: session.code });
  const participantCount = presence?.length || 1;

  // Get QR code URL (you already generate this somewhere)
  const qrCodeUrl = `https://qr.example.com/session/${session.code}`;

  return (
    <div className="p-10">
      {/* ADD THIS COMPONENT HERE */}
      <SecondDeviceCTA
        participantCount={participantCount}
        qrCodeUrl={qrCodeUrl}
      />

      {/* Your existing textarea and buttons */}
      <div className="flex gap-4 mb-4">
        <button onClick={copyText}>Copy</button>
        <button onClick={clearText}>Clear</button>
      </div>

      <textarea
        value={text}
        onChange={handleChange}
        className="w-full h-96 border p-4"
      />
    </div>
  );
}
```

**That's it for C.**

When the flag is off or `participantCount > 1`, the strip doesn't render.

---

## Part D: PWA Install Prompt After First Keystroke

**What it does**: After the user types their first character, wait 8 seconds, then show a bottom-of-screen toast: "Add SyncClip to your home screen — use it like a native app." with Install and Dismiss buttons.

**Why this matters**: This is your only retention hook. Without it, users forget the app exists tomorrow. With it, they have a home screen icon and will use it daily.

**How to toggle off**: Set `PWA_NUDGE_ENABLED: false` in `config/experiments.ts`.

---

### D.1: Create the PWA toast component

**File**: Create `components/PWAInstallPrompt.tsx`

```typescript
'use client';

import { useEffect, useState, useRef } from 'react';
import { isExperimentEnabled } from '@/config/experiments';
import { track } from '@vercel/analytics';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt({
  triggerOnFirstKeystroke = true
}: {
  triggerOnFirstKeystroke?: boolean;
}) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const firstKeystrokeRef = useRef(false);
  const dismissedRef = useRef(false);

  // Don't render if flag is off
  if (!isExperimentEnabled('PWA_NUDGE_ENABLED')) {
    return null;
  }

  // Capture the beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  // Listen for first keystroke event (from your textarea onChange or custom event)
  useEffect(() => {
    if (!triggerOnFirstKeystroke) return;

    const handleFirstKeystroke = () => {
      if (!firstKeystrokeRef.current && deferredPrompt && !dismissedRef.current) {
        firstKeystrokeRef.current = true;

        // Wait 8 seconds after first keystroke
        const timer = setTimeout(() => {
          setShowPrompt(true);
          track('pwa_prompted', { action: 'shown', timestamp: new Date().toISOString() });
        }, 8000);

        return () => clearTimeout(timer);
      }
    };

    // Listen for custom event dispatched from textarea
    window.addEventListener('first_keystroke', handleFirstKeystroke);
    return () => window.removeEventListener('first_keystroke', handleFirstKeystroke);
  }, [deferredPrompt]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    track('pwa_prompted', { action: 'accepted', timestamp: new Date().toISOString() });

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('PWA installed');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    dismissedRef.current = true;
    track('pwa_prompted', { action: 'dismissed', timestamp: new Date().toISOString() });
    setShowPrompt(false);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px 20px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxWidth: '320px',
      animation: 'slideUp 0.3s ease-out',
    }}>
      <p style={{
        margin: '0 0 12px 0',
        fontSize: '14px',
        fontWeight: 500,
        color: '#000',
      }}>
        Add SyncClip to your home screen
      </p>
      <p style={{
        margin: '0 0 16px 0',
        fontSize: '13px',
        color: '#666',
        lineHeight: 1.4,
      }}>
        Use it like a native app. Works offline.
      </p>

      <div style={{
        display: 'flex',
        gap: '10px',
      }}>
        <button
          onClick={handleInstall}
          style={{
            flex: 1,
            padding: '8px 16px',
            backgroundColor: '#057DBC',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          Install
        </button>
        <button
          onClick={handleDismiss}
          style={{
            flex: 1,
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#666',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
          }}
        >
          Not now
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
```

---

### D.2: Add the prompt to your room view

In `ClipboardEditor.tsx` or your room layout:

```typescript
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export default function ClipboardEditor({ session }) {
  const firstKeystrokeTracked = useRef(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Dispatch custom event on first keystroke
    if (!firstKeystrokeTracked.current && value.length > 0) {
      firstKeystrokeTracked.current = true;
      window.dispatchEvent(new Event('first_keystroke'));
    }

    // Your existing update logic
    setText(value);
    update({ id: session._id, text: value });
  };

  return (
    <div>
      {/* ADD THIS COMPONENT */}
      <PWAInstallPrompt triggerOnFirstKeystroke={true} />

      {/* Your existing room UI */}
      {/* ... */}
    </div>
  );
}
```

**That's it for D.**

When the flag is off, the component returns `null` and nothing renders.

---

## Part B: Rotating Post-Room-Creation Headlines

**What it does**: Instead of static "Session ready" text after a room is created, cycle through 5–6 brand lines. Purely a copy/UX change.

**How to toggle off**: Set `ROTATING_HEADLINES_ENABLED: false` in `config/experiments.ts`.

**Copy options** (we'll finalize these together in your next message):

1. "Your clipboard just got superpowers. Now grab your phone."
2. "No app. No account. No nonsense. Just paste."
3. "This room is yours for 24 hours. Make it count."
4. "The fastest way to move text between devices. Full stop."
5. "Open this on another device. Watch something click."
6. "Built for the moment you need to paste something, fast."

---

### B.1: Create the rotating headlines utility

**File**: Create `lib/headlines.ts`

```typescript
export const ROTATING_HEADLINES = [
  "Your clipboard just got superpowers. Now grab your phone.",
  "No app. No account. No nonsense. Just paste.",
  "This room is yours for 24 hours. Make it count.",
  "The fastest way to move text between devices. Full stop.",
  "Open this on another device. Watch something click.",
  "Built for the moment you need to paste something, fast.",
];

export const getRandomHeadline = (): string => {
  const randomIndex = Math.floor(Math.random() * ROTATING_HEADLINES.length);
  return ROTATING_HEADLINES[randomIndex];
};
```

---

### B.2: Use the headline in your room view

In `ClipboardEditor.tsx`, wherever you currently show "Session ready" or similar static text:

```typescript
import { getRandomHeadline } from '@/lib/headlines';
import { isExperimentEnabled } from '@/config/experiments';

export default function ClipboardEditor({ session }) {
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    if (isExperimentEnabled('ROTATING_HEADLINES_ENABLED')) {
      setHeadline(getRandomHeadline());
    } else {
      setHeadline('Session ready');
    }
  }, []);

  return (
    <div>
      {/* Replace your static text with: */}
      <h2>{headline}</h2>

      {/* Rest of your UI */}
      {/* ... */}
    </div>
  );
}
```

**That's it for B.**

---

## How to Deploy & Test

### Step 1: Add the files

Create the 5 new files in the locations specified:

- `config/experiments.ts`
- `components/RedirectNudgeBar.tsx`
- `components/SecondDeviceCTA.tsx`
- `components/PWAInstallPrompt.tsx`
- `lib/headlines.ts`

### Step 2: Add tracking to existing components

Drop the 5 `va.track()` calls into your existing components as specified in Part F.

### Step 3: Add the new components to your pages

Import and render the new components in your homepage and room view as specified in Parts A, C, and D.

### Step 4: Deploy to Vercel

```bash
git add .
git commit -m "Add experiment flags: A, C, D, B, F"
git push
```

### Step 5: Verify in Vercel Analytics

After 10–15 minutes, check your Vercel Analytics dashboard. You should see the 5 custom events appearing.

### Step 6: Test each flag

1. Load your homepage — you should see the 5-second countdown bar at the top (A)
2. Create a room — you should see the "This works best with 2 devices" strip above the textarea (C)
3. Type something — after 8 seconds, you should see the PWA install prompt at the bottom right (D)
4. Watch the headline after room creation rotate on page reloads (B)

### Step 7: Toggle flags on/off

Edit `config/experiments.ts` and change any flag from `true` to `false`. Re-deploy. The feature should vanish completely.

---

## Monitoring & Success Metrics

Once live, watch these in Vercel Analytics:

| Event                     | Current (baseline) | Target (60 days)      |
| ------------------------- | ------------------ | --------------------- |
| `room_created`            | ~4–5/day           | 25–30/day             |
| `first_keystroke`         | Unknown            | >60% of created rooms |
| `second_device_joined`    | Unknown            | >30% of created rooms |
| `pwa_prompted` → accepted | 0                  | 3–5/week              |
| Homepage bounce rate      | 43%                | <30%                  |

---

## Troubleshooting

**Issue**: Components don't render after deploying

- **Check**: Did you import the flag helper in each component?
- **Check**: Is `@vercel/analytics` properly installed? (`npm list @vercel/analytics`)

**Issue**: `va.track()` calls don't appear in Vercel Analytics

- **Check**: Did you deploy to Vercel? (Local dev won't show events)
- **Check**: Wait 15+ minutes after deploy for events to appear in dashboard

**Issue**: PWA prompt never shows

- **Check**: Are you testing on HTTPS? (PWA only works on HTTPS, not localhost)
- **Check**: Is the `beforeinstallprompt` event firing? (Browser console)

**Issue**: Second device CTA strip always shows

- **Check**: Are you passing the correct `participantCount` from presence?
- **Check**: Is `participantCount > 1` actually evaluating correctly?

---

## Final Checklist Before Going Live

- [x] Created `utils/experiments.ts` with all 5 flags
- [x] Added `track()` calls to existing components (using custom Convex system)
- [x] Created `RedirectNudgeBar` and added to homepage (Part A)
- [x] Created auto-popup QR modal and added to room view (Part C refined)
- [x] Created `PWAInstallPrompt` and added to room view (Part D)
- [x] Created `headlines.ts` and integrated into room view (Part B)
- [x] All flags default to `true`
- [x] Tested locally that features render when flags are `true`
- [x] Deployed and verified internal Convex analytics
- [x] Verified PostHog is completely removed
- [x] Confirmed flags can toggle features off

---

## Next Steps

1. **Implement in this order**: F → A → C → D → B
2. **Test each independently** before moving to the next
3. **Don't run all flags simultaneously** — you won't know which moved the numbers
4. **After 5–7 days**, check Vercel Analytics. If an experiment works, keep it. If not, toggle it off.
5. **Once an experiment is proven**, remove the flag and make it permanent code.

---

**Questions?** Let me know which part to build first.
