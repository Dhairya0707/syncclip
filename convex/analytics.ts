import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Passive event collection for SyncClip.
 * Tracks activation metrics without storing PII or content.
 */
export const logEvent = mutation({
  args: {
    type: v.string(),
    environment: v.string(),
    pathname: v.string(),
    device: v.string(),
    nodeId: v.optional(v.string()),
    sessionId: v.optional(v.string()),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    // Add event to the collection
    await ctx.db.insert("analytics_events", {
      ...args,
      timestamp: Date.now(),
    });
  },
});

export const getDashboard = query({
  args: {
    rangeMs: v.optional(v.number()),
    environment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const rangeMs = args.rangeMs ?? 7 * 24 * 60 * 60 * 1000;
    const since = Date.now() - rangeMs;

    const events = await ctx.db
      .query("analytics_events")
      .withIndex("by_timestamp", (q) => q.gte("timestamp", since))
      .collect();

    const filtered = args.environment
      ? events.filter((event) => event.environment === args.environment)
      : events;

    const sorted = filtered.sort((a, b) => b.timestamp - a.timestamp);
    const uniqueNodes = new Set(filtered.flatMap((event) => event.nodeId ? [event.nodeId] : []));
    const uniqueSessions = new Set(filtered.flatMap((event) => event.sessionId ? [event.sessionId] : []));

    const countBy = (selector: (event: typeof filtered[number]) => string | undefined) => {
      const counts = new Map<string, number>();
      for (const event of filtered) {
        const key = selector(event) || "unknown";
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
      return Array.from(counts.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
    };

    const hours = new Map<string, number>();
    for (const event of filtered) {
      const hour = new Date(event.timestamp);
      hour.setMinutes(0, 0, 0);
      const key = hour.toISOString();
      hours.set(key, (hours.get(key) ?? 0) + 1);
    }

    return {
      generatedAt: Date.now(),
      rangeMs,
      totals: {
        events: filtered.length,
        uniqueNodes: uniqueNodes.size,
        uniqueSessions: uniqueSessions.size,
        roomCreated: filtered.filter((event) => event.type === "room_created").length,
        firstKeystroke: filtered.filter((event) => event.type === "first_keystroke").length,
        secondDeviceJoined: filtered.filter((event) => event.type === "second_device_joined").length,
      },
      byType: countBy((event) => event.type),
      byDevice: countBy((event) => event.device),
      byEnvironment: countBy((event) => event.environment),
      topPaths: countBy((event) => event.pathname).slice(0, 8),
      hourly: Array.from(hours.entries())
        .map(([hour, count]) => ({ hour, count }))
        .sort((a, b) => a.hour.localeCompare(b.hour)),
      recent: sorted.slice(0, 25).map((event) => ({
        _id: event._id,
        type: event.type,
        timestamp: event.timestamp,
        environment: event.environment,
        pathname: event.pathname,
        device: event.device,
        sessionId: event.sessionId,
        metadata: event.metadata,
      })),
    };
  },
});
