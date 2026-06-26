# SyncClip Custom Analytics (Convex)

This document outlines the lightweight, internal analytics system used to track product activation and retention. It replaces external services like PostHog to maintain 100% privacy and zero external latency.

## 📊 Database Schema
Table: `analytics_events`

| Field | Type | Description |
| :--- | :--- | :--- |
| `type` | `string` | The event name (e.g., `room_created`, `qr_viewed`). |
| `timestamp` | `number` | Unix timestamp (ms) when the event was logged. |
| `environment` | `string` | `development` (localhost) or `production`. |
| `pathname` | `string` | The URL path where the event occurred. |
| `device` | `string` | `mobile` or `desktop` (based on window width). |
| `nodeId` | `string?` | Anonymous unique identifier for the device (from localStorage). |
| `sessionId` | `string?` | The 6-character room code, if applicable. |
| `metadata` | `object?` | Optional JSON properties (e.g., `{ action: "accepted" }`). |

## 🛠️ Usage (Frontend)
To track an event, use the centralized utility in `utils/analytics.ts`:

```typescript
import { track } from "@/utils/analytics";

track("event_name", { key: "value" });
```

### Event List
- `room_created`: Fired when a new session is initialized (manual or auto-redirect).
- `first_keystroke`: Fired once per session when the user starts typing.
- `qr_viewed`: Fired when the pairing QR modal is displayed.
- `second_device_joined`: Fired once when a second participant enters a room.
- `pwa_prompted`: Fired when the install toast appears (includes `action: shown/accepted/dismissed`).

## 🔒 Privacy & Performance
- **Zero Content Storage**: We never capture clipboard text, textarea contents, or QR payloads.
- **Fire-and-Forget**: Tracking calls are asynchronous and never block the main UI thread.
- **Master Toggle**: All tracking respects the `TRACKING_ENABLED` flag in `utils/experiments.ts`.
