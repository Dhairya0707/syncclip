<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into SyncClip (Next.js 16.2.3, App Router). The integration follows the Next.js 15.3+ recommended pattern using `instrumentation-client.ts` for initialization, a reverse proxy through `/ingest` for improved ad-blocker resilience, and targeted event capture across all key user actions.

**Files created or modified:**

- **`instrumentation-client.ts`** (new) — Canonical PostHog client-side initialization using `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` env vars. Enables exception capture and debug mode in development.
- **`utils/posthog.ts`** (updated) — Removed the duplicate `posthog.init()` call (now handled by `instrumentation-client.ts`). File now solely re-exports the posthog instance for use across the app.
- **`next.config.ts`** (updated) — Added `/ingest` reverse proxy rewrites (`/ingest/static/:path*`, `/ingest/array/:path*`, `/ingest/:path*`) pointing to `us-assets.i.posthog.com` and `us.i.posthog.com`. Added `skipTrailingSlashRedirect: true`.
- **`.env.local`** (updated) — Set `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`.
- **`app/join/page.tsx`** (updated) — Added `session_joined` event on both auto-redirect (6 chars entered) and manual form submit, with `method` and `platform` properties.
- **`components/ClipboardEditor.tsx`** (updated) — Added 7 new events across key handler functions (see table below).

## Event tracking summary

| Event | Description | File |
|-------|-------------|------|
| `room_created` | User creates a new clipboard session from the homepage (pre-existing) | `app/page.tsx`, `components/RedirectNudgeBar.tsx` |
| `session_joined` | User joins an existing session via the Join page | `app/join/page.tsx` |
| `first_keystroke` | User types their first character in a session (pre-existing) | `components/ClipboardEditor.tsx` |
| `second_device_joined` | A second device connects to the same session (pre-existing) | `components/ClipboardEditor.tsx` |
| `qr_viewed` | User opens the QR code pairing modal (pre-existing) | `components/ClipboardEditor.tsx` |
| `link_shared` | User copies the session link to their clipboard | `components/ClipboardEditor.tsx` |
| `text_copied` | User copies the current clipboard text via the Copy Text button | `components/ClipboardEditor.tsx` |
| `node_cleared` | User clears all text from the clipboard node | `components/ClipboardEditor.tsx` |
| `history_restored` | User restores a previous clipboard history snapshot | `components/ClipboardEditor.tsx` |
| `session_locked` | Session owner toggles the lock state (with `locked: boolean`) | `components/ClipboardEditor.tsx` |
| `burn_mode_toggled` | Session owner arms or disarms Burn After Reading (with `armed: boolean`) | `components/ClipboardEditor.tsx` |
| `session_deleted` | Session owner permanently deletes the session | `components/ClipboardEditor.tsx` |

## Next steps

We've built an "Analytics basics" dashboard and five insights to keep an eye on user behavior:

- **Dashboard:** https://us.posthog.com/project/411764/dashboard/1549990
- **Session Creation Trend** (daily line chart): https://us.posthog.com/project/411764/insights/CHvFrkTg
- **Session Creation → Multi-Device Adoption Funnel**: https://us.posthog.com/project/411764/insights/7mWkdPiV
- **Core Actions Breakdown** (bar chart of in-session actions): https://us.posthog.com/project/411764/insights/Ec7UdzjU
- **Engagement Funnel: Create → Type → Copy**: https://us.posthog.com/project/411764/insights/KHCCTSOg
- **Session Creation by Platform** (mobile vs desktop): https://us.posthog.com/project/411764/insights/qTqOwwWy

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
