import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sessions: defineTable({
    code: v.string(),
    text: v.string(),
    createdAt: v.number(),
    history: v.optional(v.array(v.object({ text: v.string(), timestamp: v.number() }))),
  }),
  presence: defineTable({
    sessionId: v.id("sessions"),
    name: v.string(),
    updatedAt: v.number(),
    nodeId: v.string(),
  }).index("by_session", ["sessionId"]),
});
