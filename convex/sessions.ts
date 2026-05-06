import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Force sync: Updated createSession validator to include initialText
function generateCode() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0].toString(36).toUpperCase().slice(0, 6).padStart(6, '0');
}

export const createSession = mutation({
  args: {
    ownerNodeId: v.optional(v.string()),
    initialText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const code = generateCode();

    await ctx.db.insert("sessions", {
      code,
      text: args.initialText || "",
      createdAt: Date.now(),
      ownerNodeId: args.ownerNodeId,
      isLocked: false,
      isBurnMode: false,
      updateCount: 0,
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
    callerNodeId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Security check: limit text length to 100,000 chars (~100KB)
    if (args.text.length > 100000) {
      throw new Error("Payload too large: Content exceeds maximum limit of 100,000 characters.");
    }

    const session = await ctx.db.get(args.id);
    if (!session) return;
    
    // Lock guard
    if (session.isLocked && session.ownerNodeId !== args.callerNodeId) {
      throw new Error("Session is locked. Only the origin node may overwrite data.");
    }

    const patches: any = { 
      text: args.text,
      updateCount: (session.updateCount || 0) + 1
    };

    if (args.saveToHistory && session.text !== args.text) {
      const history = session.history || [];
      // Keep only last 10 history items
      const newHistory = [{ text: session.text, timestamp: Date.now() }, ...history].slice(0, 10);
      patches.history = newHistory;
    }

    await ctx.db.patch(args.id, patches);
  },
});

export const toggleLock = mutation({
  args: {
    id: v.id("sessions"),
    callerNodeId: v.string(),
    isLocked: v.boolean(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.id);
    if (!session) return;
    if (session.ownerNodeId !== args.callerNodeId) {
      throw new Error("Only the origin node may modify lock states.");
    }
    await ctx.db.patch(args.id, { isLocked: args.isLocked });
  }
});

export const toggleBurnMode = mutation({
  args: {
    id: v.id("sessions"),
    callerNodeId: v.string(),
    isBurnMode: v.boolean(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.id);
    if (!session) return;
    if (session.ownerNodeId !== args.callerNodeId) {
      throw new Error("Only the origin node may activate Burn Mode.");
    }
    await ctx.db.patch(args.id, { isBurnMode: args.isBurnMode });
  }
});

export const burnSession = mutation({
  args: {
    id: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.id);
    if (!session || !session.isBurnMode) return;
    
    // Complete overwrite & wipe history
    await ctx.db.patch(args.id, {
      text: "",
      history: [],
      isBurnMode: false, // Turn off after burn to prevent loops
    });
  }
});

export const deleteSession = mutation({
  args: {
    id: v.id("sessions"),
    callerNodeId: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.id);
    if (!session) return;
    
    if (session.ownerNodeId !== args.callerNodeId) {
      throw new Error("Only the origin operator can delete this cluster.");
    }

    // Cleanup presence for this session
    const presence = await ctx.db
      .query("presence")
      .withIndex("by_session", (q) => q.eq("sessionId", args.id))
      .collect();
    for (const p of presence) {
      await ctx.db.delete(p._id);
    }

    // Delete session
    await ctx.db.delete(args.id);
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

    // Log the cleanup activity
    await ctx.db.insert("logs", {
      type: "session_cleanup",
      count: oldSessions.length,
      timestamp: Date.now(),
      status: "success",
    });

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
      // Security check: limit to 100 active nodes per session
      const presenceCount = await ctx.db
        .query("presence")
        .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
        .collect();

      if (presenceCount.length >= 100) {
        throw new Error("Cluster Capacity Reached: This node is at maximum capacity (100 operators).");
      }

      await ctx.db.insert("presence", {
        sessionId: args.sessionId,
        name: args.name,
        nodeId: args.nodeId,
        updatedAt: Date.now(),
      });
    }
  },
});

export const cleanupOldPresence = internalMutation({
  args: {},
  handler: async (ctx) => {
    const old = await ctx.db
      .query("presence")
      .withIndex("by_updatedAt", (q) => q.lt("updatedAt", Date.now() - 60000))
      .collect();
    for (const p of old) {
      await ctx.db.delete(p._id);
    }

    // Log the cleanup activity
    if (old.length > 0) {
      await ctx.db.insert("logs", {
        type: "presence_cleanup",
        count: old.length,
        timestamp: Date.now(),
        status: "success",
      });
    }
  },
});

export const getPresence = query({
  args: { 
    sessionId: v.id("sessions"),
    nodeId: v.optional(v.string()) 
  },
  handler: async (ctx, args) => {
    const presenceList = await ctx.db
      .query("presence")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .filter((q) => q.gt(q.field("updatedAt"), Date.now() - 30000)) // 30 sec timeout
      .collect();
    
    // Privacy sanitize: never leak nodeId to nodes other than the owner
    return presenceList.map(p => ({
      _id: p._id,
      name: p.name,
      updatedAt: p.updatedAt,
      sessionId: p.sessionId,
      isMe: p.nodeId === args.nodeId
    }));
  },
});

export const restoreHistory = mutation({
  args: {
    id: v.id("sessions"),
    index: v.number(),
    callerNodeId: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.id);
    if (!session || !session.history || !session.history[args.index]) return;
    
    // Lock guard
    if (session.isLocked && session.ownerNodeId !== args.callerNodeId) {
      throw new Error("Session is locked. Only the origin node may restore history.");
    }

    const restoredText = session.history[args.index].text;
    await ctx.db.patch(args.id, {
      text: restoredText,
    });
  },
});
