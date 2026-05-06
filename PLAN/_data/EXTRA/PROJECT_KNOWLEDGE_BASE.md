# SyncClip: Complete Project Knowledge Base & Context

This document serves as a comprehensive repository of all knowledge, architectural decisions, design philosophies, and strategic plans for SyncClip. It is designed to provide full context to an AI or developer for project transition.

---

## 1. Project Identity & Core Vision
**Product Name:** SyncClip  
**Live Link:** [https://syncclip.in](https://syncclip.in)  
**Tagline:** "The Instant Bridge for Your Clipboard" / "Copy Here, Paste Anywhere."

### The Problem
Traditional methods of moving text/links between devices (emailing oneself, messaging apps) are clunky, require accounts, and clutter history.

### The Solution
A premium, real-time "Digital Bridge" built for professionals.
*   **Zero Friction:** No accounts, no sign-ups. Use a 6-char code or QR.
*   **Privacy by Design:** Data is volatile (24h expiry) and supports "Burn After Reading."
*   **Power User Features:** Command Palette (CMD+K), Smart Type Detection, QR Pairing.
*   **Aesthetic:** "Editorial Brutalist" design — clean, high-contrast, professional.

---

## 2. Technical Architecture

### Tech Stack
*   **Framework:** Next.js 16 (App Router)
*   **Backend/Database:** Convex (Real-time synchronization engine)
*   **Styling:** Vanilla CSS & Tailwind CSS 4 (Custom design system)
*   **Analytics:** Vercel Analytics
*   **Infrastructure:** Vercel (Deployment), Cloudflare (Email Routing)

### Database Schema (Convex)
*   **`sessions` Table:**
    *   `code`: 6-character unique identifier.
    *   `text`: Current clipboard content (Max 100KB).
    *   `history`: Array of last 10 snapshots.
    *   `ownerNodeId`: ID of the session creator.
    *   `isLocked`: Boolean (Origin-only editing).
    *   `isBurnMode`: Boolean (Self-destruct after remote access).
*   **`presence` Table:** Real-time tracking of active nodes (heartbeats).
*   **`logs` Table:** Tracking system activities like cleanups.

### Security Implementation
*   **Cryptographic Randomness:** 6-char codes generated via `crypto.getRandomValues`.
*   **Content Security Policy (CSP):** Strict headers in `next.config.ts` to prevent XSS.
*   **Identity Privacy:** Sanitized presence queries to hide raw `nodeId` from other participants.
*   **Anti-DoS:** 100-node limit per session; heartbeat cleanup crons.

---

## 3. Design System: Editorial Brutalism

### Creative North Star: "The Digital Broadsheet"
Rejects soft SaaS trends for raw, mid-century editorial energy (WIRED-inspired).

### Design Rules
*   **Colors:** "Paper and Ink" (Pure White #FFFFFF, Pure Black #000000).
*   **Action Blue:** #057dbc (Used surgically for interactions).
*   **Shadows:** Strictly prohibited. Depth is achieved via 1px hairline rules and layering.
*   **Typography:**
    *   **Display:** Newsreader/Playfair Display (Serif)
    *   **Body:** Noto Serif/Lora
    *   **UI:** Space Grotesk/Inter (Sans-serif)
    *   **Technical:** JetBrains Mono (Monospace for kickers/metadata)
*   **Geometry:** Strict 0px border-radius (sharp corners everywhere).

---

## 4. Feature Specifications

### 1. Real-Time Sync
Powered by Convex subscriptions. Latency is <100ms. Updates push to all connected nodes instantly without manual refreshes.

### 2. Burn After Reading Mode
Once enabled by the owner, any remote access triggers a 5-second countdown after which the session data is wiped permanently.

### 3. Session Locking
The creator (origin node) can lock the session. In locked state, other nodes are in "Read Only" mode.

### 4. Smart Metadata Detection
A regex pipeline categorizes content into `CODE`, `URL`, `JSON`, or `TEXT` for better visual handling.

### 5. Command Palette (CMD+K)
Global interceptor for keyboard-first control: `clear`, `copy`, `lock`, `sync`, `burn`, `pair`.

### 6. QR Optical Pairing
Generates dynamic QR codes for frictionless mobile joining.

---

## 5. SEO & Marketing Strategy

### SEO Pivot (April 2026)
Shifted from Brand-first ("SyncClip") to Keyword-first ("Online Clipboard").
*   **Target Keywords:** "online clipboard", "copy paste between devices", "cross device clipboard", "Pushbullet alternative".
*   **Landing Page Suite:** Dedicated pages for high-intent keywords (e.g., `/clipboard`, `/online-clipboard`).
*   **Structured Data:** Comprehensive JSON-LD (`WebApplication`, `FAQPage`, `BreadcrumbList`).

### Marketing Hooks
*   "Copy here. Paste anywhere."
*   "Stop emailing yourself snippets."
*   "Ephemeral by design. Burn after reading."

### Distribution Channels
*   **Product Hunt:** Launching as a browser-native utility for "App Fatigue."
*   **Hacker News:** "Show HN" focusing on real-time Convex architecture.
*   **Reddit:** Niche subreddits (r/webdev, r/productivity, r/India).

---

## 6. Project Files Map
*   `app/[code]/page.tsx`: Dynamic session route.
*   `components/ClipboardEditor.tsx`: The heart of the application (UI + logic).
*   `convex/sessions.ts`: Backend mutations and queries.
*   `convex/crons.ts`: Automated data purging (24h TTL).
*   `_data/EXTRA/REDDIT_CAMPAIGN_PLAN.md`: Detailed marketing angles.
*   `DESIGN.md`: Detailed style guide and design tokens.
*   `CLAUDE.md`: Cumulative development logs and technical debt tracking.

---

## 7. Future Roadmap
1.  **Auto Clipboard Sync:** Automatic `navigator.clipboard.writeText` on updates (High Impact).
2.  **Multi-Block Support:** Support for multiple distinct text blocks in one session.
3.  **End-to-End Encryption:** For ultra-private sessions (Zero-knowledge architecture).
4.  **Native Integration:** Potential wrappers for Desktop/Mobile for background syncing.
