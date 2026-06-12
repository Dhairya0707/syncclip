# Experiments & Funnel Optimization

This document outlines the user flow optimization experiments, feature flags, and Progressive Web App (PWA) configurations built into SyncClip.

---

## 1. Centralized Feature Flags (`utils/experiments.ts`)

To allow rapid testing of conversion flows, user onboarding, and retention funnels without altering core business mutations, SyncClip manages activation funnels via a centralized configuration object.

```typescript
export const EXPERIMENTS = {
  TRACKING_ENABLED: true,            // Toggle custom Convex-based behavioral logging.
  REDIRECT_NUDGE_ENABLED: false,     // Controls the 5s auto-redirect nudge bar on the homepage.
  FORCE_SECOND_DEVICE_ENABLED: false,// Auto-popups QR code pairings when session has 1 connected device.
  PWA_NUDGE_ENABLED: false,          // Controls PWA installation prompt toast after first keystroke.
  ROTATING_HEADLINES_ENABLED: true,  // Alternates post-room-creation copywriting hooks.
} as const;
```

---

## 2. Auto-Redirect Nudge Bar (`components/RedirectNudgeBar.tsx`)

Designed to decrease time-to-first-sync by offering immediate clipboard generation, avoiding homepage decision paralysis.

* **Behavior**:
  * Displays a 5-second countdown on the homepage header styled in high-contrast Action Blue (`#057dbc`).
  * Once the countdown completes, it creates a new room and pushes the user automatically (`router.push('/[code]')`).
* **Funnel Guard (Anti-Bounce)**:
  * To prevent recurring auto-redirect loops from inflating the bounce rate, the redirect sets a daily timestamp token (`syncclip_last_auto_redirect`) formatted as `YYYY-MM-DD` in `localStorage`.
  * If the client has already been auto-redirected today, the countdown bar returns `null` instantly.
  * Clicking **ESC** or dismissing the nudge writes the daily flag to local storage, preventing annoying re-nudge behaviors.
* **Hydration Safety**:
  * Utilizes `isMounted` checks to defer rendering until the page has hydrated on the client, avoiding server-client HTML mismatch errors.

---

## 3. Rotating Marketing Copy blocks (`utils/headlines.ts`)

If `ROTATING_HEADLINES_ENABLED` is set to `true`, SyncClip swaps standard interface copy blocks for dynamic hooks. These blocks guide the user through the initial entry experience.

* **Composition**: Contains arrays of hook blocks grouping:
  * **Lead Kicker**: Monospace subtitle (e.g., `SYSTEM: WAITING FOR TRANSMISSION`).
  * **Main Headline**: Serif prompt (e.g., `Copy Here. Paste Anywhere.`).
  * **CTA/Body Description**: Humanist serif description of how to complete the pairing.

---

## 4. Progressive Web App (PWA) & Prompting Funnel

SyncClip provides standalone application installation support to let users pin their clipboard to their home screens like a desktop utility.

### PWA Configuration (`app/manifest.ts`)
Declares standard PWA configuration matching the Brutalist design:
* **Display Mode**: `standalone`
* **Theme & Background Color**: `#000000` (Pure Black)
* **Icon Assets**: Direct link to the high-density favicon.

### PWA Install Toast (`components/PWAInstallPrompt.tsx`)
Presents an option to install the PWA, designed not to annoy users during their first sync:
* **Keystroke Trigger**: Wires a window listener to the custom `first_keystroke` event.
* **Keystroke Delay**: Waits exactly **8 seconds** after typing begins before firing the Brutalist installer prompt toast (fixed bottom-right).
* **Dismiss Logic**: When dismissed, writes `syncclip_pwa_dismissed = true` to `localStorage` to permanently disable further prompts on that browser.
* **Analytics Tracking**: Sends custom event records (`pwa_prompted`) tracking whether the prompt was shown, accepted, or dismissed.
