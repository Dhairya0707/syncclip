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
    const now = Date.now();
    const since = now - rangeMs;
    const prevSince = since - rangeMs;

    // Fetch current range events
    const events = await ctx.db
      .query("analytics_events")
      .withIndex("by_timestamp", (q) => q.gte("timestamp", since))
      .collect();

    // Fetch previous range events for comparison (only counts)
    const prevEvents = await ctx.db
      .query("analytics_events")
      .withIndex("by_timestamp", (q) => q.gte("timestamp", prevSince).lt("timestamp", since))
      .collect();

    const filtered = args.environment
      ? events.filter((event) => event.environment === args.environment)
      : events;

    const prevFiltered = args.environment
      ? prevEvents.filter((event) => event.environment === args.environment)
      : prevEvents;

    const sorted = filtered.sort((a, b) => b.timestamp - a.timestamp);
    const uniqueNodes = new Set(filtered.flatMap((event) => event.nodeId ? [event.nodeId] : []));
    const uniqueSessions = new Set(filtered.flatMap((event) => event.sessionId ? [event.sessionId] : []));
    
    const prevNodes = new Set(prevFiltered.flatMap((event) => event.nodeId ? [event.nodeId] : []));
    const returningNodes = Array.from(uniqueNodes).filter(nodeId => prevNodes.has(nodeId)).length;

    const activeNow = new Set(filtered
      .filter(e => e.timestamp > now - (15 * 60 * 1000))
      .flatMap(e => e.nodeId ? [e.nodeId] : [])
    ).size;

    const countBy = (data: typeof filtered, selector: (event: typeof filtered[number]) => string | undefined) => {
      const counts = new Map<string, number>();
      for (const event of data) {
        const key = selector(event) || "unknown";
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
      return Array.from(counts.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
    };

    const hours = new Map<string, number>();
    const heatmap = new Map<string, number>(); // "day-hour" -> count
    for (const event of filtered) {
      const date = new Date(event.timestamp);
      
      const hour = new Date(event.timestamp);
      hour.setMinutes(0, 0, 0);
      const key = hour.toISOString();
      hours.set(key, (hours.get(key) ?? 0) + 1);

      const dayIndex = date.getDay(); // 0-6
      const hourIndex = date.getHours(); // 0-23
      const heatKey = `${dayIndex}-${hourIndex}`;
      heatmap.set(heatKey, (heatmap.get(heatKey) ?? 0) + 1);
    }

    const getTotals = (data: typeof filtered) => ({
      events: data.length,
      uniqueNodes: new Set(data.flatMap((event) => event.nodeId ? [event.nodeId] : [])).size,
      uniqueSessions: new Set(data.flatMap((event) => event.sessionId ? [event.sessionId] : [])).size,
      roomCreated: data.filter((event) => event.type === "room_created").length,
      firstKeystroke: data.filter((event) => event.type === "first_keystroke").length,
      secondDeviceJoined: data.filter((event) => event.type === "second_device_joined").length,
    });

    return {
      generatedAt: now,
      rangeMs,
      activeNow,
      retention: uniqueNodes.size > 0 ? Math.round((returningNodes / uniqueNodes.size) * 100) : 0,
      totals: getTotals(filtered),
      prevTotals: getTotals(prevFiltered),
      byType: countBy(filtered, (event) => event.type),
      byDevice: countBy(filtered, (event) => event.device),
      byEnvironment: countBy(filtered, (event) => event.environment),
      topPaths: countBy(filtered, (event) => event.pathname).slice(0, 8),
      hourly: Array.from(hours.entries())
        .map(([hour, count]) => ({ hour, count }))
        .sort((a, b) => a.hour.localeCompare(b.hour)),
      heatmap: Array.from(heatmap.entries()).map(([key, count]) => {
        const [day, hour] = key.split("-").map(Number);
        return { day, hour, count };
      }),
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
