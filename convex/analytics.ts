import { v } from "convex/values";
import { mutation } from "./_generated/server";

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
