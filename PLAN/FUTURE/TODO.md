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
- [x] **Documentation**: Added detailed Experiment & Tracking Map to `Claude.md`.

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
