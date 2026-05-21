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

---

## [2026-05-21] Task: SEO, AEO, and GEO Scaling Plan (Phase 2)

### Research & Diagnostic Notes
- **Trajectory & Citations**: ChatGPT is actively sending referrals (16 visitors). Bing AI grounding queries are active with 224 citations.
- **Bounce Rate Spike**: Jumped to 59%. Auto-redirect Flag A is disabled to mitigate this.
- **Inner Page Snippet Optimization**: Titles/metas of 4 specific pages are misaligned with search intent and require rewrites.
- **AEO Optimization**: Blog posts need structured Quick Answer boxes to maximize citation extraction by LLM summarizers.

### Execution Steps
1. **Bounce Rate Fix**: Verified `REDIRECT_NUDGE_ENABLED` is set to `false` in `utils/experiments.ts` to prevent auto-redirects from spiking the bounce rate.
2. **Page Snippet Correction**: Rewrote metadata (Title & Description) for 4 underperforming pages (`/clipboard-sync-guide`, `/blog/go-online-tools-clipboard-alternative`, `/blog/pushbullet-alternatives-2026`, `/blog/how-to-copy-text-from-android-to-mac`).
3. **FAQ Schema Alignment**: Injected the universal, optimized `FAQPage` JSON-LD block into the homepage and 3 key subpages.
4. **Quick Answer Insertion**: Created a Node.js script to automatically inject 50-60 word "Quick Answer" AEO boxes to all 8 existing blog posts.
5. **New Blog Content**: Wrote and deployed 2 new AI-intent blog posts targeting exact link-sharing and auto-sync queries.
6. **Social Proof Update**: Updated homepage copy from "39+ countries" to "50+ countries".
7. **Event Tracking**: Implemented Vercel Analytics `va.track('room_created')` to monitor actual session generation.
8. **Deployment**: Built the project (`npm run build`) and successfully pushed the updated URL roster to Bing/Yandex using `indexnow.js`.
