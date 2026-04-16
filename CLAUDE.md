@[AGENTS.md]

## Updates

### 2026-04-16 - Feature Shelving & UI Focus
- **Deferred Sync Protocols**: Temporarily hidden the **'Upload to Cloud'** and **'Download to Device'** features from the Node Settings interface. This maintains a focused, minimal-complexity workflow for the current development phase while preserving the underlying logic for future protocol activation.
- **Enhanced Security Profile**: The 100-node cluster capacity limit and manual deletion protocols remain active as the primary security layer.

### 2026-04-16 - Security, UX Consolidation & Cluster Persistence
- **Exit & Delete Protocol**: Implemented a secure "self-destruct" function for session owners. A new `deleteSession` mutation allows origin operators to wipe nodes and their history instantly while redirecting to the landing page.
- **Cluster Capacity Security**: Enforced a strict **100-node limit** per session. The `updatePresence` mutation now prevents over-enrollment to protect against DoS attacks and resource exhaustion.
- **Natural Language Transition**: Finalized the refactor of all user-facing labels. Swapped technical jargon (e.g., "Thermal Burn", "Optical Pairing") for user-friendly terms (e.g., "Burn - Delete Everything", "Phone Pair") to improve immediate comprehension.
- **Protocol Settings Refactor**: Consolidated all secondary actions (Auto-Push, Auto-Read, Lock, Burn, Delete) into a unified, high-density **Node Settings** modal with clickable documentation tooltips.
- **Functional Stability**: Resolved a critical bug in the `Share Room` modal where the copy link action was failing due to improper event propagation.
- **Identity Refinement**: Enabled immediate **Node Signature** (user name) editing directly from the top navbar, ensuring operators can manage their presence without session interruption.

### 2026-04-16 - UI Simplification & Action Consolidation (Deprecated/Consolidated)
- See historical logs below for the transition from Protocol-centric to User-centric design.

### 2026-04-16 - Support System Integration & Email Templates
- **Contact Info Update**: Updated the primary support line to `support.dhairyadarji@gmail.com` and removed placeholder social media links to simplify the communication channel.
- **Live Contact Protocol**: Connected the `/support` form to the MailService API endpoint for real-time node diagnostics and inquiries.
- **Form State Engine**: Implemented React state management for all input fields, including a new "Operator Name" field for personalized archival logs.
- **Visual Feedback**: Added high-density "Transmitting..." loading states and a "Transmission Confirmed" success screen to maintain editorial flow.
- **Branded Communications**: Designed custom "Editorial Brutalist" email templates for both user confirmation (receipt) and internal support alerts (notification).

### 2026-04-14 - Final Polish & Product Hardening
- **Landing Page Redesign**: Shifted from a feature-list to a benefit-focused hero ("Copy Here, Paste Anywhere"). Added a status-aware UI mockup and a session history panel ("Recent Nodes").
- **Detailed Documentation**: Created a comprehensive `/about` page to house long-form feature explanations, technical architecture details, and keyboard shortcut guides, keeping the landing page clean.
- **Visual Depth Refinement**: Re-designed all primary dark buttons and containers to use `bg-zinc-900` instead of pure black. This provides essential visual separation from hard black shadows, enhancing the neobrutalist depth.
- **Protocol Solidification**: Ensured the "Burn After Reading" and "Origin Lock" features are prominently documented and intuitive.
- **Bug Fix**: Resolved a Next.js Server Component error on the Support page by correctly assigning the `"use client"` directive.

### 2026-04-14 - Final Polish & Product Hardening
- **Landing Page Redesign**: Shifted from a feature-list to a benefit-focused hero ("Copy Here, Paste Anywhere"). Added a status-aware UI mockup and a session history panel ("Recent Nodes").
- **Detailed Documentation**: Created a comprehensive `/about` page to house long-form feature explanations, technical architecture details, and keyboard shortcut guides.
- **Visual Depth Refinement**: Re-designed all primary dark buttons and containers to use `bg-zinc-900` instead of pure black. This provides essential visual separation from hard black shadows.
- **Bug Fix**: Resolved a Next.js Server Component error on the Support page by correctly assigning the `"use client"` directive.

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

### 2026-04-14 - Final Phase: Advanced Telemetry & Burning
- **Command Palette Interface**: Implemented a global `CMD+K` interceptor that spawns a spotlight-style command terminal, allowing complete keyboard control over operations (`clear`, `copy`, `lock`, `sync`, `burn`, `pair`).
- **Telemetry Module**: Appended an analytics section to the Node Drawer that observes logical state (`Mutations`), time alive (`Uptime`), and presence logic (`Node Density`).
- **Burn After Reading Mode**: Granted the origin node the ability to "ARM" the protocol. If armed, whenever a foreign node joins the session, the UI initiates a 5-second self-destruct sequence, completely wiping the node and the cloud history permanently.

### 2026-04-14 - Advanced Phase 2: Smart Tracking & Security
- **Smart Clipboard Detection (Auto-Read)**: Integrated bidirectional awareness. When authorized, returning focus to the browser window automatically evaluates the OS clipboard and syncs new payloads to the cloud seamlessly.
- **Payload Type Detection**: Added an intelligent regex pipeline that visibly categorizes text streams into `CODE`, `URL`, `JSON`, or `TEXT` inside the metadata row.
- **Node Ownership & Protocol Locks**: Shifted from pure anonymity to 'origin ownership'. The node creator can now lock the node to prevent rogue overwrites, casting viewing nodes into a strict "READ ONLY" mode.

### 2026-04-14 - Routing Polish & Advanced "Magical" Features
- **Landing Page Upgrade**: Replaced the minimal root page (`app/page.tsx`) with a complete marketing landing page showcasing protocol features and maintaining the editorial aesthetic.
- **Support System**: Added a high-density, broadsheet-style `/support` page for node diagnostics and contact.
- **404 Protocol Error**: Implemented a custom global `not-found.tsx` to preserve the offline aesthetic when users hit dead links.
- **Auto-Sync Protocol**: Integrated `navigator.clipboard.writeText` within `ClipboardEditor.tsx`. Remote updates now instantly push to the OS clipboard when the "Auto-Sync" toggle is engaged.
- **QR Optical Pairing**: Added a modal to generate dynamic QR codes (using `qrserver.com`) from the active session URL, enabling frictionless mobile device pairing.

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
- [x] Complete security audit of text input limits.
- [x] Handle edge cases for session expiration and local storage cleanup.
- [x] Optimize UI/UX for high-density editorial aesthetic.
- [x] Implement Join Session via Direct Code
    - [x] Create `/join` page with 6-character code input
    - [x] Add "Join Session" affordance to the Home page
    - [x] Implement validation and redirection logic
- [x] Implement Session Expiration Countdown
    - [x] Calculate remaining time based on `createdAt` (24h limit)
    - [x] Display countdown in the editor UI
- [/] UI/UX Improvements for Mobile
    - [ ] Consolidate buttons/menus for better use of space
    - [ ] Refine Hero CTA on landing page for mobile
- [x] Add comprehensive About/Support pages.
- [x] Custom Error/404 handling.
- [ ] Final production deployment audit.
- [ ] End-to-end performance test of the real-time sync engine.







- landing page 
-- contact support page etc basic needed page then custmized error page if route something is not proper so 

add contact page email and all
imporve ui for the mobile device and main page that show popup menu combine option better less btns and all...
make that join page where user can add there session code....

session expire countdown ? Session expires in: 23h



-- security things like in one room max 100 device just to prevent attacks 


-- change base url every where