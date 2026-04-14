import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

function generateCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export const createSession = mutation({
  handler: async (ctx) => {
    const code = generateCode();

    await ctx.db.insert("sessions", {
      code,
      text: "The concept of digital ephemerality is challenged by the persistence of the clipboard. In this interface, we treat every string of text as a primary document—an archival entry in the stream of consciousness that defines modern workflow. \n\nThe architecture here is rigid because the data it holds is fluid. By grounding the user in a broadsheet-inspired framework, we restore a sense of weight to the intangible.",
      createdAt: Date.now(),
    });

    return code;
  },
});

export const getSession = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .filter((q) => q.eq(q.field("code"), args.code))
      .first();
  },
});

export const updateText = mutation({
  args: {
    id: v.id("sessions"),
    text: v.string(),
    saveToHistory: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    // Security check: limit text length to 100,000 chars (~100KB)
    if (args.text.length > 100000) {
      throw new Error("Payload too large: Content exceeds maximum limit of 100,000 characters.");
    }

    const session = await ctx.db.get(args.id);
    if (!session) return;

    const patches: any = { text: args.text };

    if (args.saveToHistory && session.text !== args.text) {
      const history = session.history || [];
      // Keep only last 10 history items
      const newHistory = [{ text: session.text, timestamp: Date.now() }, ...history].slice(0, 10);
      patches.history = newHistory;
    }

    await ctx.db.patch(args.id, patches);
  },
});

export const cleanupSessions = mutation({
  args: {},
  handler: async (ctx) => {
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
    const oldSessions = await ctx.db
      .query("sessions")
      .filter((q) => q.lt(q.field("createdAt"), twentyFourHoursAgo))
      .collect();

    for (const session of oldSessions) {
      // Cleanup presence for this session
      const presence = await ctx.db
        .query("presence")
        .withIndex("by_session", (q) => q.eq("sessionId", session._id))
        .collect();
      for (const p of presence) {
        await ctx.db.delete(p._id);
      }
      // Delete session
      await ctx.db.delete(session._id);
    }
    return oldSessions.length;
  },
});

export const updatePresence = mutation({
  args: {
    sessionId: v.id("sessions"),
    name: v.string(),
    nodeId: v.string(),
  },
  handler: async (ctx, args) => {
    // Security check: limit name to 50 chars
    if (args.name.length > 50) {
      throw new Error("Payload too large: Signature exceeds 50 character limit.");
    }
    const existing = await ctx.db
      .query("presence")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .filter((q) => q.eq(q.field("nodeId"), args.nodeId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("presence", {
        sessionId: args.sessionId,
        name: args.name,
        nodeId: args.nodeId,
        updatedAt: Date.now(),
      });
    }

    // Cleanup old presence (older than 1 minute)
    const old = await ctx.db
      .query("presence")
      .filter((q) => q.lt(q.field("updatedAt"), Date.now() - 60000))
      .collect();
    for (const p of old) {
      await ctx.db.delete(p._id);
    }
  },
});

export const getPresence = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("presence")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .filter((q) => q.gt(q.field("updatedAt"), Date.now() - 30000)) // 30 sec timeout
      .collect();
  },
});

export const restoreHistory = mutation({
  args: {
    id: v.id("sessions"),
    index: v.number(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.id);
    if (!session || !session.history || !session.history[args.index]) return;

    const restoredText = session.history[args.index].text;
    await ctx.db.patch(args.id, {
      text: restoredText,
    });
  },
});
