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

---

## [2026-05-22] Task: Phase 3 Aggressive SEO Snippet Fix & Content Expansion

### Research & Diagnostic Notes
- **CTR Weakness**: GoOnlineTools alternative page was ranking at position 2.19 but had 0% CTR due to soft titles.
- **Content Gaps**: 4 remaining high-ROI queries identified in GSC/Bing telemetry require dedicated coverage.

### Execution Steps
1. **Metadata Corrections**: Updated `/blog/go-online-tools-clipboard-alternative` title/description and `/clipboard-sync-guide` title to aggressive, high-CTR versions.
2. **New Content Creation**: Published 4 new blog posts targeting:
   - "How to Share Text Between Android and Windows Without WhatsApp or Cable"
   - "Online Clipboard Without Installing Anything or Using a Network App"
   - "Cross-Device Clipboard Sync for Developers — Copy Code Snippets Instantly"
   - "GoOnlineTools Clipboard Not Working? Here Are 3 Free Alternatives"
3. **Internal Indexing & Sitemap**: Added new blog details to sitemap (`app/sitemap.ts`) and main blog index page (`app/blog/page.tsx`).
4. **Verification & IndexNow Submission**: Verified project builds cleanly under Next.js 16/Turbopack, then successfully ran `indexnow.js` (200 OK) with 16 active pages.

---

## [2026-06-08] Task: Analytics Overhaul — Discord Webhooks & User Retention Tracking

### Research & Motivation
- Needed better user tracking without auth (returning users, multi-device rooms, weekly cohorts).
- Wanted real-time ops alerts for errors (lock violations, payload rejections, Convex failures).
- Wanted a daily ops digest in Discord with key metrics instead of checking dashboards.

### Execution Steps

1. **`node_profiles` Table**: Added to schema (`convex/schema.ts`) to cache `firstSeen`/`lastSeen` per nodeId. Upserts on every `logEvent` call so cohort queries are fast without scanning all events.

2. **New Analytics Queries** (`convex/analytics.ts`):
   - `getDailyDigest` — returns today's active nodes, returning rate, sessions, multi-device rooms, events breakdown, device split. Used by the daily cron.
   - `getRetention` — weekly cohort retention matrix. Groups nodeIds by week of first appearance, shows what percentage returned each subsequent week.
   - `logEvent` now also upserts `node_profiles` to maintain the firstSeen/lastSeen cache.

3. **Client-Side Discord Webhook** (`utils/discord.ts`):
   - `sendError()`, `sendWarn()`, `sendInfo()` — POST formatted Discord embeds to `NEXT_PUBLIC_DISCORD_WEBHOOK`.
   - Embeds include title, description, color-coded (red/orange/blue), fields for session/node IDs, IST timestamp footer.
   - Fire-and-forget — never blocks the UI.

4. **Error Handling on All Mutations** (`components/ClipboardEditor.tsx`, `app/page.tsx`):
   - Added `.catch()` or try/catch with `sendError()` to every mutation call:
     - `createSession` (page.tsx)
     - `updateText` (debounced sync + auto-read)
     - `updatePresence` (heartbeat)
     - `restoreHistory`
     - `toggleLock`
     - `toggleBurn` (+ sends `sendInfo` when burn is armed)
     - `burnSession` (execution)
     - `deleteSession`
   - Previously most mutations had `.finally()` but no `.catch()` — errors were silently swallowed.

5. **Server-Side Daily Digest** (`convex/discord.ts`):
   - `sendDailyDigest` action — queries `getDailyDigest` + `getRetention`, builds a rich Discord embed with fields for nodes, sessions, devices, events, and weekly retention cohorts.
   - `sendTest` action — sends a test embed to verify webhook config.
   - Webhook URL read from `DISCORD_DIGEST_WEBHOOK` (Convex env var).

6. **Cron Registration** (`convex/crons.ts`):
   - Added daily cron at 08:00 UTC (1:30 PM IST) to run `sendDailyDigest`.

7. **Env Config** (`.env.local`):
   - Documented `NEXT_PUBLIC_DISCORD_WEBHOOK` and `DISCORD_DIGEST_WEBHOOK`.

### Files Changed

| File | Change |
|---|---|
| `convex/schema.ts` | Added `node_profiles` table (nodeId, firstSeen, lastSeen) |
| `convex/analytics.ts` | `logEvent` now upserts node_profiles; added `getDailyDigest`, `getRetention` |
| `convex/discord.ts` | **New** — `sendDailyDigest` + `sendTest` actions |
| `convex/crons.ts` | Added daily digest cron at 08:00 UTC |
| `utils/discord.ts` | **New** — client-side error/event webhook sender |
| `components/ClipboardEditor.tsx` | Added try/catch + Discord error on all 8 mutation calls |
| `app/page.tsx` | Added Discord error on session creation failure |
| `.env.local` | Documented webhook env vars |

### Design Decisions

- **No polling, no extra infra**: Errors fire directly from client catch blocks via `fetch()`. No queues, no polling, no Convex actions needed for real-time alerts.
- **Two webhook channels**: Error/event alerts go to one Discord channel via `NEXT_PUBLIC_DISCORD_WEBHOOK`. Daily digest goes to a separate channel via `DISCORD_DIGEST_WEBHOOK` (server-side only).
- **Privacy**: Node profiles only store `nodeId`, `firstSeen`, `lastSeen`. No content, no IP, no PII. This enables cohort retention without auth.
- **Retention via nodeId**: Uses localStorage `syncclip_node_id` for returning user tracking. ~85% accurate without auth. Canvas fingerprint could be added later for fallback.
- **Daily digest is cheap**: One Convex action per day. Negligible cost.
