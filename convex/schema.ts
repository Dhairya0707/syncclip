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
  })
    .index("by_session", ["sessionId"])
    .index("by_updatedAt", ["updatedAt"]),
  logs: defineTable({
    type: v.string(), // e.g., "session_cleanup", "presence_cleanup"
    count: v.number(), // number of items deleted
    timestamp: v.number(),
    status: v.string(), // e.g., "success", "error"
  }).index("by_type", ["type"]),
  analytics_events: defineTable({
    type: v.string(),      // e.g., "room_created", "first_keystroke"
    timestamp: v.number(),
    environment: v.string(), // "development" or "production"
    pathname: v.string(),
    device: v.string(),    // "mobile" or "desktop"
    nodeId: v.optional(v.string()),
    sessionId: v.optional(v.string()), // room code
    metadata: v.optional(v.any()),
  }).index("by_type", ["type"])
    .index("by_timestamp", ["timestamp"]),
});
