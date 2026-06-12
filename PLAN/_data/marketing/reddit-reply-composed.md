# Reddit Reply — Composed for Manual Posting

## Target Thread
Any thread about:
- Phone Link clipboard sync not working (common issue)
- "How do I copy text between phone and PC?" 
- Pushbullet alternatives
- Emailing yourself snippets

## Reply Content

**Context:** This reply works on r/android, r/webdev, r/india, or r/androidapps when someone asks about syncing clipboard/text between devices.

---

**Title:** Phone Link kept breaking for me too — built a browser-only alternative

**Body:**

Had the exact same problem with Phone Link clipboard. It would work for a few days and then just stop syncing, even after re-pairing. Tried SwiftKey and KDE Connect but didn't want to switch keyboards or install desktop apps.

Ended up building a browser-only clipboard sync tool (syncclip.in) that works on any device with a browser — no app, no account, no install. Open the URL on both devices, share the 6-char code, and text syncs in under 100ms. Sessions auto-delete after 24 hours (no data permanently stored).

Built it with Next.js + Convex (WebSocket-based). If you just need to quickly move a URL or snippet between devices without the Phone Link overhead, it might help: https://syncclip.in

---

## Alternative: Post to a DEV.to Comment

If no Reddit thread is immediately available, the ClipFour DEV.to post (https://dev.to/khan_rja_41639e48e4777b0b/i-built-clipfour-a-zero-login-wireless-clipboard-to-share-text-between-devices-instantly-1fjb) is active and fresh (June 11, 2026). A comment with "Nice work! I built something similar (SyncClip) — here's how ours handles real-time sync with Convex WebSockets..." would be relevant but keep it supportive, not self-promotional.

## Most Relevant Blog Post to Link

For a Phone Link failure thread: link to `https://syncclip.in/blog/can-i-sync-clipboard-android-windows-free`
For a general clipboard question: link to `https://syncclip.in/blog/fastest-way-to-copy-text-without-app`
