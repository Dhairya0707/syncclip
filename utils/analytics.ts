import { convex } from "../app/ConvexClientProvider";
import { api } from "../convex/_generated/api";
import { isExperimentEnabled } from "./experiments";
import { sendError, sendWarn } from "./discord";

/**
 * Lightweight, privacy-first analytics wrapper for SyncClip.
 * Replaces PostHog with a direct Convex mutation for event logging.
 */
export const track = (event: string, properties?: Record<string, any>) => {
  // Respect the global tracking toggle
  if (!isExperimentEnabled('TRACKING_ENABLED')) return;

  if (typeof window === 'undefined') return;

  try {
    const environment = process.env.NODE_ENV === 'development' ? 'development' : 'production';
    const device = window.innerWidth < 768 ? 'mobile' : 'desktop';
    const pathname = window.location.pathname;

    // Track in Umami if loaded
    if ((window as any).umami) {
      try {
        (window as any).umami.track(event, properties);
      } catch (err) {
        sendWarn("Umami tracking failed", err instanceof Error ? err.message : String(err), { event });
      }
    }

    // Fire-and-forget: we don't await this to keep UX snappy
    // convex.mutation(api.analytics.logEvent, {
    //   type: event,
    //   environment,
    //   pathname,
    //   device,
    //   nodeId: localStorage.getItem("syncclip_node_id") || undefined,
    //   sessionId: pathname.split('/')[1] || undefined, // Extract room code if present
    //   metadata: properties,
    // }).catch(e => {
    //   // Analytics failures must NEVER break UX.
    //   sendWarn('Convex analytics capture failed', e instanceof Error ? e.message : String(e), { event });
    // });
  } catch (e) {
    sendError('Analytics logic error', e instanceof Error ? e.message : String(e), { event });
  }
}
