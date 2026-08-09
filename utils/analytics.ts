import { sendError, sendWarn } from "./discord";

/**
 * Lightweight, privacy-first analytics wrapper for SyncClip with Umami integration.
 * Automatically attaches page path, full URL, referrer, and device details to every event.
 */
export const track = (event: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  try {
    const device = window.innerWidth < 768 ? 'mobile' : 'desktop';
    const page_path = window.location.pathname;
    const page_url = window.location.href;
    const referrer = document.referrer || 'direct';

    const enrichedProperties = {
      page_path,
      page_url,
      referrer,
      device,
      ...properties,
    };

    // Track in Umami if script is loaded
    if ((window as any).umami) {
      try {
        (window as any).umami.track(event, enrichedProperties);
      } catch (err) {
        sendWarn("Umami tracking failed", err instanceof Error ? err.message : String(err), { event });
      }
    }
  } catch (e) {
    sendError('Analytics logic error', e instanceof Error ? e.message : String(e), { event });
  }
};
