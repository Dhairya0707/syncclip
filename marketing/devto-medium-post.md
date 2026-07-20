# Why We Built SyncClip: A 100ms Browser-Native WebSocket Clipboard for Developers

If you are a developer, designer, or power user, you probably move snippets of text, URLs, API keys, or JSON payloads between your devices multiple times a day.

And if you are like 90% of people, your current workflow looks like this:
* Sending a message to yourself on WhatsApp/Telegram
* Emailing yourself a quick note
* Slack-messaging yourself in your private sandbox channel
* Digging through cloud notes (Notion, Google Keep, Apple Notes) that take 5 seconds to load and sync

Every time you do this, you pay a **"Latency Tax"** — both in terms of network lag and the cognitive context-switching required to navigate these bloated apps.

That is why I built **[SyncClip](https://syncclip.in)**: a free, zero-signup, browser-native online clipboard designed to sync text across devices in under 100ms.

Here is how it works, how we built it, and why browser-native real-time syncing beats both legacy apps and permanent note storage.

---

## 🛠️ The Under-the-Hood Architecture

Most legacy online clipboards (like cl1p.net or GoOnlineTools) rely on traditional REST APIs and HTTP polling. You paste text, press "Save," and then manually refresh the page on your laptop. 

To make the sync feel like a unified native OS clipboard, we needed the latency to be imperceptible. We built SyncClip using:
1. **Next.js App Router** for a fast, server-side rendered frontend deployed on Vercel's edge network.
2. **Convex Real-Time Backend** for reactive data queries and transactional mutations.
3. **WebSocket Tunnels (WSS)** for instant bidirectional state synchronization.

```
[Mobile Device] <--- WSS Link ---> [ Convex Edge Database ] <--- WSS Link ---> [PC/Laptop Browser]
```

When you type or paste text into a SyncClip node, a debounced mutation triggers. Convex propagates the database change down to all active WebSocket subscriptions in **under 100 milliseconds**. 

---

## 🚀 Key Features for Developer Workflows

Since this tool was built to solve our own daily friction, we loaded it with features specifically for power users:

### 1. No Login, Zero Friction
No passwords, no OAuth, no Google/Facebook logins. You click "Start Syncing," get a secure 6-character room code, and you are ready to sync. It is as fast as opening a web page.

### 2. Native Clipboard Auto-Sync (Auto-Push & Auto-Read)
SyncClip uses the browser's native **Clipboard API**:
* **Auto-Push:** When enabled, any updates made on a remote device are automatically written straight to your local system clipboard. You copy on your phone, walk over to your laptop, and press `CMD+V` instantly.
* **Auto-Read:** When you return focus to your SyncClip tab (`CMD+Tab` back), it checks your local clipboard for changes and pushes them automatically to the session.

### 3. Ephemeral Security & Burn Mode
We do not want your data. We do not even want your email. 
* **24-Hour Auto-Purge:** A daily scheduled cron job permanently wipes expired sessions, presence registers, and history logs from our database.
* **Burn After Reading:** Engaging the Burn Protocol transforms the session into volatile state. The exact millisecond a secondary node accesses it, a 5-second countdown starts. After 5 seconds, the entry is completely destroyed.

### 4. Write Delegation ("Pass the Pen")
When sharing a clipboard session with a team or during pair-programming, you can lock the room. This restricts other nodes to read-only status. If you want a colleague to edit, you can proactively delegate write access to their specific device using the command palette.

### 5. Keyboard-First Command Palette (`CMD + K`)
Control everything without leaving your keyboard. Pressing `CMD+K` opens a spotlight terminal to Clear Node, Force Sync, Toggle Lock, Pair Device, or trigger Burn Mode instantly.

---

## 💡 The Takeaway: Stop Emailing Yourself

Using messaging networks or permanent database lockers for temporary clipboards is the wrong tool for the job. SyncClip replaces that friction with a clean, **ad-free, Brutalist-designed bridge** that does one thing: moves text fast and vanishes when you're done.

Try it out next time you need to paste an OTP, a URL, or an API key: **[syncclip.in](https://syncclip.in)**.
