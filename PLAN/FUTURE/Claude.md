# Claude's Execution Log

## [2026-05-06] Task: Implement Experiment Flags

### Research Notes

- **Design System**: Editorial Brutalism (1px borders, no shadows, no radius, Serif/Mono font combo).
- **Core Files**:
  - `app/page.tsx` (Homepage)
  - `components/ClipboardEditor.tsx` (Room View)
  - `package.json` (Vercel Analytics confirmed)
- **Tech Stack**: Next.js 16, React 19, Convex 1.35.

### Execution Steps

1.  **Part 0**: Created `utils/experiments.ts` with feature flags.
2.  **Part F**: Integrated `track()` calls.
3.  **Part A**: Built `RedirectNudgeBar`.
    - **Refinement**: Added `localStorage` check to limit auto-redirect to once per day.
    - **ESC Persistence**: Clicking ESC now also sets the daily redirect flag to prevent repetitive nudging.
    - **UX Polish**: Implemented `isMounted` deferred rendering to ensure the bar only appears after full page hydration.
    - **Hardening**: Added regex validation for storage data and try-catch wrappers for production safety.
4.  **Part C**: Built `SecondDeviceCTA` (Later removed).
5.  **Part D**: Built `PWAInstallPrompt`.
6.  **Part B**: Built `Rotating Headlines` utility.
7.  **Refactor**: Upgraded `Part B` to use structured `CopyBlock`.
8.  **UI Refinement**: Banner removed, auto-popup QR added, CONNECT buttons renamed.
9.  **Headline Persistence Fix**: Updated `createSession` to allow `initialText`.
10. **Debugging & Stability**: Fixed React Hook violations and forced Convex sync.
11. **Analytics Pivot (Custom Convex)**:
    - **PostHog Removal**: Uninstalled `posthog-js`, deleted initialization files, and removed env vars.
    - **Convex Schema**: Added `analytics_events` table for lightweight behavioral tracking.
    - **Backend**: Created `convex/analytics.ts` with `logEvent` mutation.
    - **Frontend**: Updated `utils/analytics.ts` to use the `ConvexReactClient` for fire-and-forget event logging.

### Implementation & Tracking Map

| Flag Name                     | File(s)                                                                                                                | Trigger / Usage                                                    | Tracking Event                                                                      |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| `TRACKING_ENABLED`            | `app/page.tsx`, `components/ClipboardEditor.tsx`, `components/RedirectNudgeBar.tsx`, `components/PWAInstallPrompt.tsx` | Master toggle for custom Convex event calls.                       | N/A                                                                                 |
| `REDIRECT_NUDGE_ENABLED`      | `app/page.tsx`, `components/RedirectNudgeBar.tsx`                                                                      | 5s countdown bar on homepage for auto-room creation.               | `room_created` (platform: auto_redirect)                                            |
| `FORCE_SECOND_DEVICE_ENABLED` | `components/ClipboardEditor.tsx`                                                                                       | Auto-popup QR modal on first-time entry in a lone session.         | `qr_viewed` (when modal appears)                                                    |
| `PWA_NUDGE_ENABLED`           | `components/ClipboardEditor.tsx`, `components/PWAInstallPrompt.tsx`                                                    | Bottom-right toast appearing 8s after the first keystroke.         | `pwa_prompted` (actions: shown, accepted, dismissed)                                |
| `ROTATING_HEADLINES_ENABLED`  | `app/page.tsx`, `components/ClipboardEditor.tsx`, `components/RedirectNudgeBar.tsx`                                    | Replaces static text with dynamic "Copy Blocks" (Hook/CTA/Prompt). | `first_keystroke` (when typing begins), `second_device_joined` (on pairing success) |

### Design Decisions

- **Passive Collection**: The new analytics system is entirely additive and passive. It never blocks the UI and is completely decoupled from core session logic.
- **Privacy First**: We only store metadata (event type, device type, environment). We explicitly do not capture `session.text` or any clipboard data.
- **Fire-and-Forget**: By using the Convex client's `mutation` method directly in a utility, we achieve non-blocking event logging without needing React hooks in every component.
- **Tamper-Resilience**: Maintained regex validation for `localStorage` flags to ensure robust session management even with custom analytics.
