---
title: "How I Built a 100ms Real-Time Cross-Device Clipboard (Next.js + Convex)"
tags: nextjs, react, webdev, productivity
---

If you live entirely inside the Apple ecosystem, Universal Clipboard is basically magic. You copy text on your iPhone, and you paste it on your Mac. 

But the moment you step outside that walled garden—say, you have an Android phone and a MacBook, or a Windows PC and an iPad—that magic disappears. Suddenly, transferring a 12-digit 2FA code, a block of JSON, or a long URL feels like traveling back to 2005.

The standard workarounds are terrible:
1.  **Emailing yourself** (and cluttering your inbox).
2.  **Using a "Saved Messages" chat** on Slack or Telegram (mixing personal chat with transient clipboard data).
3.  **Installing heavy background apps** like Pushbullet (which often require accounts, logins, and paid subscriptions).

I got tired of this friction. I wanted a zero-login, instant, web-native bridge. So, I built [SyncClip.in](https://syncclip.in/clipboard), a free **online clipboard** that syncs across devices in under 100 milliseconds.

![SyncClip Cross-Device Workflow](https://syncclip.in/sync-workflow.png)

Here is a breakdown of how I built it, the architecture I chose, and why I opted for "Burn Mode" ephemeral storage over a traditional database.

---

### The Tech Stack

I needed something that could handle real-time state synchronization seamlessly without requiring me to manage WebSockets manually.

*   **Frontend**: Next.js 14 (App Router)
*   **Styling**: Tailwind CSS (Using a stark, "Editorial Brutalist" design system)
*   **Backend/Database**: Convex (Backend-as-a-Service)
*   **Hosting**: Vercel

### Why Convex for WebSockets?

When building real-time apps, the traditional route is setting up a Node.js server with `Socket.io`. This works, but managing server state, handling disconnects, and scaling socket connections can become a headache fast.

Convex abstracts all of this away. In Convex, your database *is* reactive. You write a standard query on the backend, and you use a `useQuery` hook on the frontend. If the underlying data changes, Convex pushes the update over WebSockets instantly. 

For a clipboard tool, this is perfect. 

### The Architecture: "Burn Mode" vs Permanent Storage

When I first designed the schema, the obvious choice was to create a `users` table and a `clips` table. You log in, you see your clips. 

But I realized that **clipboard data is inherently ephemeral**. A 2FA code or a temporary password has a lifespan of about 30 seconds. Forcing a user to create an account to transfer a 30-second string of text is extreme friction. Furthermore, storing users' copied data permanently is a massive privacy liability.

So, I built **Burn Mode**.

Instead of user accounts, the app uses **Temporary Sessions**. 

![Secure QR Code Pairing](https://syncclip.in/qr-pair-demo.png)

1. When you open the site on your laptop, it generates a random 6-character room code.
2. You open the site on your phone and enter the code (or scan a QR code).
3. The two devices are now subscribed to the same Convex document.
4. When you paste text on the phone, the laptop's UI updates in < 100ms.
5. **The Burn:** The moment the session is closed, or after a short expiry window, a Convex CRON job hard-purges the document. It leaves absolutely no trace on the server.

### The Code: Syncing State

Here is a simplified look at the Convex mutation that handles the text update. It's incredibly straightforward:

```typescript
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updateClip = mutation({
  args: { sessionId: v.id("sessions"), text: v.string() },
  handler: async (ctx, args) => {
    // Update the session document with the new clipboard text
    await ctx.db.patch(args.sessionId, {
      currentText: args.text,
      lastUpdated: Date.now(),
    });
  },
});
```

On the Next.js client, subscribing to this data is just one line:

```tsx
const sessionData = useQuery(api.sessions.get, { sessionId });
// The UI automatically re-renders whenever sessionData.currentText changes
```

### The Result

By treating the browser as the universal operating system, I completely bypassed the need for native apps. 

Whether you are on a Linux desktop, a Windows laptop, an iPhone, or an Android, you have a browser. That means you have an instant, secure, real-time bridge.

If you've ever felt the pain of emailing yourself a link just to get it on your computer, give the live app a try. It requires no login and no installation:

👉 **Live App**: [SyncClip — Online Clipboard](https://syncclip.in/clipboard)

Have you ever built anything using Convex? I'd love to hear your thoughts on reactive databases vs traditional REST/Socket setups in the comments!
