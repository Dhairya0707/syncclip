import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sessions: defineTable({
    code: v.string(),
    text: v.string(),
    createdAt: v.number(),
    history: v.optional(v.array(v.object({ text: v.string(), timestamp: v.number() }))),
    ownerNodeId: v.optional(v.string()),
    isLocked: v.optional(v.boolean()),
    isBurnMode: v.optional(v.boolean()),
    updateCount: v.optional(v.number()),
  }),
  presence: defineTable({
    sessionId: v.id("sessions"),
    name: v.string(),
    updatedAt: v.number(),
    nodeId: v.string(),
  }).index("by_session", ["sessionId"]),
});
