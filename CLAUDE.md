@[AGENTS.md]

## Updates

### 2026-04-14 - UI Polish & Cleanup (SYNCCLIP Clipboard)
- **TopAppBar**: Polished `SESSION` and `COPY LINK` hover states with the `secondary` brand color and transparent borders.
- **Main Nav**: Upgraded `CLIPBOARD`, `DEVICES`, and `HISTORY` links with `border-secondary` and `text-secondary` transitions. Added dynamic rotation animations to the `settings` and `sync` icons on hover context.
- **Action Buttons**: Renamed the primary 'Push to Cloud' button to **'Force Sync'** as requested.
- **Sidebar**: Completely removed the sliding/auto-hiding SideNavBar drawer.

### 2026-04-14 - Convex Backend Integration
- **Database Schema**: Established `convex/schema.ts` tracking `sessions` (code, text, createdAt).
- **Backend Logic**: Created `convex/sessions.ts` with real-time queries (`getSession`) and mutations (`createSession`, `updateText`).
- **Routing Engine**: Added `app/page.tsx` for generating random session codes and redirecting users to the dynamic route `app/[code]/page.tsx`.
- **Component Arch**: Shifted high-density editorial UI directly into `components/ClipboardEditor.tsx`.
- **Performance**: Integrated a strict debounce limit timer `utils/debounce.ts` binding the UI payload directly to Convex's real-time engine.

### 2026-04-14 - Mobile Responsiveness Fix
- **Mobile Protocol Logs**: Replaced the hidden sidebar on mobile with a functional, slide-out drawer triggered by a new `NODES (n)` header button.
- **Responsive Layout**: Optimized typography, textarea padding, and metadata visibility for small screens.
- **UX Polish**: Added an overlay backdrop and a close button for the mobile log drawer.

### 2026-04-14 - Session Maintenance & Local Persistence
- **Automated Cleanup**: implemented `convex/crons.ts` to purge sessions/presence older than 24 hours every hour.
- **Home Screen "Recent Nodes"**: Added a high-density list on the root page to track and revisit up to 10 locally stored session nodes.
- **Expiration Handling**: Added a dedicated "OFFLINE" error state with auto-cleanup for expired local storage entries.
- **History Limits**: Tied the clipboard history buffer strictly to the **last 10 snapshots**.
- **Identity UX**: Implemented broadsheet-style random name suggestions (`OPERATOR-ALFA`, `ARCHIVIST-01`, etc.) for the Node Signature gate.

### 2026-04-14 - Advanced Sync & UX Improvements
- **Presence System**: Implemented real-time node tracking with heartbeats and signature logins.
- **History Engine**: Added persistent clipboard history allowing users to restore previous states.
- **Node Signature**: Created a high-contrast editorial access gate for user identification.
- **Layout Overhaul**: Removed non-functional schematic imagery and expanded the textarea to 2xl broadsheet proportions.

### 2026-04-14 - UI Feature Refinement & Snackbar
- **Navigation Cleanup**: Removed non-functional top navigation links (`DEVICES`, `HISTORY`, settings, sync icons) to tighten the interface.
- **Node Context Cleanup**: Removed the hardcoded 'Connected Nodes' block from the right sidebar.
- **Action Buttons**: Removed the 'Export Arch.' button, updating the action grid to a clean tri-button layout.
- **Interactive Feedback**: Implemented a sleek, animated Snackbar UI component that triggers on 'Force Sync', 'Clear Node', and 'Share Link' actions.

<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->



TODO:
first check the all kind dof secuity issues like if textinput then limit on that which may not crash our server so like that all kind of security issues should be checked and fixed. and also check the all kind of edge cases and handle them properly. and also check the all kind of performance issues and fix them properly. and also check the all kind of ui issues and fix them properly. and also check the all kind of ux issues and fix them properly. and also check the all kind of accessibility issues and fix them properly. and also check the all kind of performance issues and fix them properly. and also check the all kind of performance issues and fix them properly.

-- landing page 
-- contact support page etc basic needed page then custmized error page if route something is not proper so 