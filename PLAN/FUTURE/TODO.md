# Task: Implement Experiment Flags (Phase 1)

## Objectives
- [x] Create centralized experiment configuration
- [x] Implement Vercel Analytics event tracking
- [x] Add Redirect Nudge Bar to Homepage
    - [x] Added `localStorage` limit: Auto-redirect only happens once per day per user.
    - [x] **ESC Persistence**: Dismissing the bar via ESC now also triggers the 24h cooldown.
    - [x] **Deferred Rendering**: Bar only appears after client-side mount to prevent hydration flashes.
    - [x] **Production Grade**: Added resilience for malformed/tampered storage data.
- [x] Add Second Device CTA to Room View (Refined: Replaced with auto-popup QR)
- [x] Implement PWA Install Prompt
- [x] Add Rotating Headlines to Room View (Refined: Integrated into actual session text)
- [x] Refactor Headlines to Structured "Copy Blocks" (Hook, CTA, Brand Prompt)
- [x] Fix React Hook Violations in experiment components.
- [x] Stabilize useEffect dependencies to prevent "changed size" errors.
- [x] Force sync Convex validators for `initialText`.
- [x] **Custom Convex Analytics**: Completely removed PostHog. Built lightweight Convex-based event logging system.
- [x] **Documentation**: Added [ANALYTICS_DOC.md](./ANALYTICS_DOC.md) and detailed Experiment Map to `Claude.md`.

## Constraints
- Follow "High-Density Editorial Brutalism" design language.
- Zero impact on core logic (additive/modular).
- Maintain 100% type safety.
- No rounded corners, no shadows.

## Progress Log
- [2026-05-06] Initializing task and researching existing codebase.
- [2026-05-06] Completed implementation of all experiment flags.
- [2026-05-06] UI Refinement: Banner removed, auto-popup QR added, CONNECT buttons renamed.
- [2026-05-06] Fixed Headline Persistence: Integrated random headlines into room creation.
- [2026-05-06] Stability Fix: Resolved React Hook violations and Convex sync issues.
- [2026-05-06] Feature Polish: Limited auto-redirect to once per day using `localStorage`.
- [2026-05-06] Hardened storage logic: Added validation and try-catch for production resilience.
- [2026-05-06] Documentation: Detailed flag/event mapping completed in `Claude.md`.
- [2026-05-06] **Analytics Pivot**: PostHog removed due to complexity; custom Convex analytics system deployed.

---

# Task: SEO, AEO, and GEO Scaling Plan (Phase 2) - May 21, 2026

## Objectives
- [x] Investigate homepage bounce rate spike (59%) and confirm no rogue redirects
- [x] Fix titles and metas for 4 broken page snippets:
  - [x] `/clipboard-sync-guide`
  - [x] `/blog/go-online-tools-clipboard-alternative`
  - [x] `/blog/pushbullet-alternatives-2026`
  - [x] `/blog/how-to-copy-text-from-android-to-mac`
- [x] Add/update FAQPage JSON-LD schema on:
  - [x] Homepage (`app/page.tsx`)
  - [x] `/clipboard-sync-guide`
  - [x] `/blog/go-online-tools-clipboard-alternative`
  - [x] `/pushbullet-alternative`
- [x] Add 50-60 word "Quick Answer" box at the top of all blog posts
- [ ] Investigate Vercel Analytics referral source for Nepal traffic (29% CTR)
- [x] Write 2 new AI-intent blog posts:
  - [x] *"How to copy and paste online between two devices using a link"*
  - [x] *"What is the best online clipboard that syncs automatically in real time?"*
- [x] Update homepage hero pulse-badge and trust line to "Used in 50+ countries"
- [x] Implement event tracking (Flag F) using Vercel Analytics custom events

## Progress Log
- [2026-05-21] Analyzed May 21 trajectory, initialized Phase 2 plan, and synchronized memory files (`CLAUDE.md`, `Tasl.md`, `Claude.md`, `TODO.md`).
- [2026-05-21] Verified REDIRECT_NUDGE_ENABLED is false to fix bounce rate.
- [2026-05-21] Rewrote metadata/snippets for 4 underperforming pages.
- [2026-05-21] Injected robust FAQPage schemas into 4 key pages.
- [2026-05-21] Scripted and deployed Quick Answer AEO nodes to 8 existing blog posts.
- [2026-05-21] Published 2 new AI-intent blog posts focusing on link sharing and automatic sync.
- [2026-05-21] Updated homepage copy and integrated Vercel Analytics event tracking.
- [2026-05-21] Built project via `npm run build` and forced re-indexing via `indexnow.js`.
