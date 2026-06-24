import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
    await ctx.db.insert("analytics_events", {
      ...args,
      timestamp: Date.now(),
    });

    if (args.nodeId) {
      const existing = await ctx.db
        .query("node_profiles")
        .withIndex("by_nodeId", (q) => q.eq("nodeId", args.nodeId!))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, {
          lastSeen: Date.now(),
        });
      } else {
        await ctx.db.insert("node_profiles", {
          nodeId: args.nodeId,
          firstSeen: Date.now(),
          lastSeen: Date.now(),
        });
      }
    }
  },
});

export const getDailyDigest = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const todayStart = new Date();
    todayStart.setUTCHours(0, 0, 0, 0);
    const todayTs = todayStart.getTime();
    const yesterdayStart = todayTs - 86400000;
    const weekAgo = todayTs - 7 * 86400000;

    const todayEvents = await ctx.db
      .query("analytics_events")
      .withIndex("by_timestamp", (q) => q.gte("timestamp", todayTs))
      .collect();

    const yesterdayEvents = await ctx.db
      .query("analytics_events")
      .withIndex("by_timestamp", (q) => q.gte("timestamp", yesterdayStart).lt("timestamp", todayTs))
      .collect();

    const weekEvents = await ctx.db
      .query("analytics_events")
      .withIndex("by_timestamp", (q) => q.gte("timestamp", weekAgo))
      .collect();

    const todayNodes = new Set(todayEvents.flatMap(e => e.nodeId ? [e.nodeId] : []));
    const yesterdayNodes = new Set(yesterdayEvents.flatMap(e => e.nodeId ? [e.nodeId] : []));
    const returningNodes = Array.from(todayNodes).filter(n => yesterdayNodes.has(n)).length;

    const todaySessions = new Set(todayEvents.flatMap(e => e.sessionId ? [e.sessionId] : []));
    const yesterdaySessions = new Set(yesterdayEvents.flatMap(e => e.sessionId ? [e.sessionId] : []));

    const multiDeviceSessions = new Set<string>();
    const sessionNodeMap = new Map<string, Set<string>>();
    for (const event of weekEvents) {
      if (event.sessionId && event.nodeId) {
        const nodes = sessionNodeMap.get(event.sessionId) ?? new Set();
        nodes.add(event.nodeId);
        sessionNodeMap.set(event.sessionId, nodes);
      }
    }
    for (const [sessionId, nodes] of sessionNodeMap) {
      if (nodes.size >= 2) multiDeviceSessions.add(sessionId);
    }

    const countByType = (events: typeof todayEvents, type: string) =>
      events.filter(e => e.type === type).length;

    const topPaths = new Map<string, number>();
    for (const event of todayEvents) {
      const path = event.pathname || "/";
      topPaths.set(path, (topPaths.get(path) ?? 0) + 1);
    }
    const sortedPaths = Array.from(topPaths.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([path, count]) => ({ path, count }));

    const envSplit = { production: 0, development: 0 };
    for (const event of todayEvents) {
      if (event.environment === "production") envSplit.production++;
      else envSplit.development++;
    }

    return {
      date: todayStart.toISOString().split("T")[0],
      totalEvents: todayEvents.length,
      activeNodes: todayNodes.size,
      yesterdayNodes: yesterdayNodes.size,
      returningNodes,
      retentionRate: todayNodes.size > 0 ? Math.round((returningNodes / todayNodes.size) * 100) : 0,
      sessionsCreated: countByType(todayEvents, "room_created"),
      yesterdaySessions: countByType(yesterdayEvents, "room_created"),
      firstKeystrokes: countByType(todayEvents, "first_keystroke"),
      secondDeviceJoins: countByType(todayEvents, "second_device_joined"),
      multiDeviceSessions7d: multiDeviceSessions.size,
      burnTriggers: countByType(todayEvents, "burn_mode_toggled"),
      sessionDeletions: countByType(todayEvents, "session_deleted"),
      textCopied: countByType(todayEvents, "text_copied"),
      nodeCleared: countByType(todayEvents, "node_cleared"),
      qrViewed: countByType(todayEvents, "qr_viewed"),
      errors: todayEvents.filter(e => e.type.startsWith("error_")).length,
      byDevice: {
        mobile: todayEvents.filter(e => e.device === "mobile").length,
        desktop: todayEvents.filter(e => e.device === "desktop").length,
      },
      topPaths: sortedPaths,
      environment: envSplit,
    };
  },
});

export const getRetention = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const cohorts: { label: string; size: number; returned: number; rate: number }[] = [];

    for (let w = 0; w < 8; w++) {
      const weekStart = now - (w + 1) * 7 * 86400000;
      const weekEnd = now - w * 7 * 86400000;

      const cohortProfiles = await ctx.db
        .query("node_profiles")
        .withIndex("by_firstSeen", (q) =>
          q.gte("firstSeen", weekStart).lt("firstSeen", weekEnd)
        )
        .collect();

      if (cohortProfiles.length === 0) continue;

      const cohortNodeIds = new Set(cohortProfiles.map(p => p.nodeId));
      const thisWeekEvents = await ctx.db
        .query("analytics_events")
        .withIndex("by_timestamp", (q) => q.gte("timestamp", weekEnd))
        .collect();

      const activeThisWeek = new Set(thisWeekEvents.flatMap(e => e.nodeId ? [e.nodeId] : []));
      const returned = Array.from(cohortNodeIds).filter(n => activeThisWeek.has(n)).length;

      const label = new Date(weekStart).toISOString().split("T")[0];
      cohorts.push({
        label,
        size: cohortProfiles.length,
        returned,
        rate: Math.round((returned / cohortProfiles.length) * 100),
      });
    }

    return cohorts;
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

    const events = await ctx.db
      .query("analytics_events")
      .withIndex("by_timestamp", (q) => q.gte("timestamp", since))
      .collect();

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
    const heatmap = new Map<string, number>();
    for (const event of filtered) {
      const date = new Date(event.timestamp);

      const hour = new Date(event.timestamp);
      hour.setMinutes(0, 0, 0);
      const key = hour.toISOString();
      hours.set(key, (hours.get(key) ?? 0) + 1);

      const dayIndex = date.getDay();
      const hourIndex = date.getHours();
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

    const dailyActive = new Map<string, Set<string>>();
    for (const event of filtered) {
      if (event.nodeId) {
        const day = new Date(event.timestamp).toISOString().split("T")[0];
        const daySet = dailyActive.get(day) ?? new Set<string>();
        daySet.add(event.nodeId);
        dailyActive.set(day, daySet);
      }
    }

    const dauTrend = Array.from(dailyActive.entries())
      .map(([day, nodes]) => ({ day, count: nodes.size }))
      .sort((a, b) => a.day.localeCompare(b.day));

    return {
      generatedAt: now,
      rangeMs,
      activeNow,
      retention: uniqueNodes.size > 0 ? Math.round((returningNodes / uniqueNodes.size) * 100) : 0,
      totals: getTotals(filtered),
      prevTotals: getTotals(prevFiltered),
      dauTrend,
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
      recent: sorted.slice(0, 100).map((event) => ({
        _id: event._id,
        type: event.type,
        timestamp: event.timestamp,
        environment: event.environment,
        pathname: event.pathname,
        device: event.device,
        nodeId: event.nodeId,
        sessionId: event.sessionId,
        metadata: event.metadata,
      })),
    };
  },
});
