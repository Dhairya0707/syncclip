# Codebase Architecture & Implementation Guide

This document provides a comprehensive blueprint of the SyncClip software architecture, database design, real-time networking, client mutations, custom analytics, and operations alerting systems.

---

## 1. Technical Stack Overview
* **Frontend Framework**: Next.js 16 (React 19) utilizing the App Router.
* **Backend Platform**: Convex 1.35 (Real-time cloud database and serverless functions).
* **Styling**: Vanilla CSS for layouts, implementing the High-Density Editorial Brutalist design language.
* **Hosting & Deployments**: Vercel (Frontend) and Convex Cloud (Backend).

---

## 2. Directory Structure

```text
syncclip/
├── app/                        # Next.js App Router
│   ├── [code]/                 # Room dynamic route
│   │   └── page.tsx            # Session controller page
│   ├── blog/                   # Blog index & SEO category hubs
│   ├── page.tsx                # Homepage (Landing + auto-redirects)
│   ├── layout.tsx              # Root HTML context & providers
│   ├── manifest.ts             # PWA app metadata
│   ├── robots.ts               # Search engine directives
│   └── sitemap.ts              # XML sitemap generator
├── components/                 # React UI Components
│   ├── ClipboardEditor.tsx     # The primary real-time workstation component
│   ├── PWAInstallPrompt.tsx    # App installation prompt toast
│   ├── RedirectNudgeBar.tsx    # Homepage countdown-to-redirect bar
│   └── SecondDeviceCTA.tsx     # QR popup/link sharing assistant
├── convex/                     # Convex Backend Functions & Types
│   ├── _generated/             # Compiled Convex client-facing APIs
│   ├── analytics.ts            # Telemetry queries and profiles tracking
│   ├── crons.ts                # Cleanup schedule and daily digest trigger
│   ├── discord.ts              # Server-side actions building Discord embeds
│   ├── schema.ts               # Strictly typed database schema
│   └── sessions.ts             # Session, presence, and history mutations
└── utils/                      # Client-side utility functions
    ├── analytics.ts            # Client-facing analytics event logger
    ├── debounce.ts             # Performance input throttling
    ├── discord.ts              # Webhook endpoint wrapper for client errors
    ├── experiments.ts          # Feature flags and client-side variations
    └── headlines.ts            # Rotating home/editor marketing copy blocks
```

---

## 3. Database Schema (`convex/schema.ts`)

SyncClip uses a fully-typed document database schema designed for speed and automated cleanup.

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Main clipboard session storage
  sessions: defineTable({
    code: v.string(),                         // Unique 6-character room identifier (e.g., "ABC12D")
    text: v.string(),                         // Current clipboard text content
    createdAt: v.number(),                    // Milliseconds since epoch
    history: v.optional(                      // Version history (last 10 edits)
      v.array(v.object({ text: v.string(), timestamp: v.number() }))
    ),
    ownerNodeId: v.optional(v.string()),      // Node ID that generated the session
    isLocked: v.optional(v.boolean()),        // Lock flag preventing writing by non-owners
    isBurnMode: v.optional(v.boolean()),      // Self-destruct flag
    updateCount: v.optional(v.number()),      // Incremental edit counter
  }),

  // Operator presence engine
  presence: defineTable({
    sessionId: v.id("sessions"),             // Reference to sessions
    name: v.string(),                         // Public screen name/signature
    updatedAt: v.number(),                    // Heartbeat timestamp (ms)
    nodeId: v.string(),                       // Secret browser-specific node identifier
  })
    .index("by_session", ["sessionId"])
    .index("by_updatedAt", ["updatedAt"]),

  // Operational logs for server jobs
  logs: defineTable({
    type: v.string(),                         // E.g., "session_cleanup", "presence_cleanup"
    count: v.number(),                        // Quantity of cleaned documents
    timestamp: v.number(),                    // Job execution time
    status: v.string(),                       // Job outcome status ("success" or "error")
  }).index("by_type", ["type"]),

  // Anonymized user telemetry
  analytics_events: defineTable({
    type: v.string(),                         // Event name (e.g. "room_created", "first_keystroke")
    timestamp: v.number(),
    environment: v.string(),                  // "production" or "development"
    pathname: v.string(),
    device: v.string(),                       // "desktop" or "mobile"
    nodeId: v.optional(v.string()),           // Anonymized visitor tracker
    sessionId: v.optional(v.string()),        // Event origin room
    metadata: v.optional(v.any()),            // Auxiliary metrics payload
  })
    .index("by_type", ["type"])
    .index("by_timestamp", ["timestamp"]),

  // Lightweight cohort and retention profiles
  node_profiles: defineTable({
    nodeId: v.string(),                       // Unique node identifier
    firstSeen: v.number(),                    // Timestamp of first event
    lastSeen: v.number(),                     // Timestamp of most recent event
  }).index("by_nodeId", ["nodeId"]),
});
```

---

## 4. Backend Operations & Business Logic (`convex/sessions.ts`)

### Code Generation (`generateCode`)
Codes are 6-character, alphanumeric, high-entropy, uppercase strings:
```typescript
const array = new Uint32Array(1);
crypto.getRandomValues(array);
return array[0].toString(36).toUpperCase().slice(0, 6).padStart(6, '0');
```
This yields $36^6 \approx 2.17 \text{ billion}$ possible combinations.

### Security Guards & Size Enforcements
* **Text Limit**: Maximum limit of **100,000 characters** (~100 KB) is enforced inside `updateText`. Any payload exceeding this size will throw a server-side error: `Payload too large: Content exceeds maximum limit of 100,000 characters.`
* **Signature Limit**: Maximum operator name size is **50 characters** inside `updatePresence` (throws if exceeded).
* **Presence Limit**: Maximum **100 active connections** are allowed per room at any one time to mitigate DDoS resource exhaustions.

### Safety Features
1. **Lock Mode (`toggleLock`)**: Protects the session. Only the browser node matching the session's `ownerNodeId` can modify the content. Non-owners receive validation rejections if they try to write.
2. **Burn-After-Reading (`toggleBurnMode` / `burnSession`)**: Self-destruction pipeline. Once enabled, the moment another reader loads or requests the data, the backend wipes the payload and historical versions clean, resetting the burn flag to prevent circular wiping.
3. **Automatic Cleanup (Crons & Mutations)**:
   * **Sessions**: A cron job runs daily at 04:00 UTC (9:30 AM IST) to delete sessions older than 24 hours (`cleanupSessions`), removing the associated presence markers as well.
   * **Presence**: Inactive presence markers (`updatedAt < 60s ago`) are wiped automatically every 5 minutes by `cleanupOldPresence` internal mutations.
   * **Daily Digest**: A cron job runs daily at 15:00 UTC (8:30 PM IST) to send the ops report to Discord (`sendDailyDigest`).

---

## 5. Real-Time Sync & UI Handling (`components/ClipboardEditor.tsx`)

### The Cursor-Jumping Prevention Pattern
A major issue in real-time document editors is that incoming remote database updates will overwrite the user's local input cursor position. SyncClip handles this by comparing local state to server state:

* In the React editor, the client maintains a local `text` state separate from the server's `session.text`.
* An effect tracks change in `session.text`. When the database pushes a state shift, the client updates the local state **only** if the local input is not currently focused or if the incoming changes differ from the local version.
* Debouncing is used via `utils/debounce.ts`. A delay of **200ms** is set for committing modifications to the server, preventing network spam while typing.

---

## 6. Custom Analytics & Retention Tracking (`convex/analytics.ts`)

SyncClip uses a lightweight, privacy-focused telemetry engine stored in Convex. No personal details, IP addresses, or clipboard contents are logged.

* **Unique Node IDs**: Browser visitors are assigned a UUID (`syncclip_node_id`) saved in `localStorage` (~85% cohort tracking accuracy without auth or cookies).
* **Node Profile Caching**: On every event, the mutation `logEvent` updates the node's `lastSeen` in the `node_profiles` table, or inserts a profile if it is a new visitor.
* **Weekly Retention Query (`getRetention`)**: Queries `node_profiles` in 7-day windows, analyzing cohorts to calculate what percentage of nodes return to write/sync in subsequent weeks.
* **Daily Digests**: Pulls active visitor counts, room creation volumes, device distribution splits, and retention metrics.

---

## 7. Operations Webhooks & Alerts (`utils/discord.ts`, `convex/discord.ts`)

SyncClip maintains real-time monitoring and reporting using Discord Webhooks.

### Client-Side Error Webhook
The client exposes `sendError()`, `sendWarn()`, and `sendInfo()` to capture failures in mutation callbacks (e.g. payload size violations, locked write rejections).
* **Endpoint**: `NEXT_PUBLIC_DISCORD_WEBHOOK`
* **Format**: Color-coded rich embeds displaying error source, dynamic IST/Kolkata timezone footers, and contextual session metadata.

### Server-Side Daily Ops Report
A server action (`convex/discord.ts::sendDailyDigest`) is executed by a Convex cron schedule at **15:00 UTC (8:30 PM IST)** daily.
* **Endpoint**: `DISCORD_DIGEST_WEBHOOK`
* **Contents**:
  * **👤 Traffic**: Active nodes count, returning visitors, total events, trend vs yesterday.
  * **📁 Sessions**: Sessions created with trend, multi-device rooms (7d).
  * **📱 Devices**: Mobile vs desktop event split with percentages.
  * **🔔 Engagement Funnel**: Sessions created → first keystrokes → second device joins → text copies, plus secondary actions (QR scans, clears, burn toggles, deletions, errors).
  * **🔝 Top Pages Today**: Top 5 most visited paths with visit counts.
  * **📈 Weekly Retention Cohort**: Last 5 weeks of cohort return rates.
  * **💡 Key Insights**: Auto-generated analysis — mobile dominance, keystroke conversion, pairing activity, retention health, error alerts, dev environment noise filter.
