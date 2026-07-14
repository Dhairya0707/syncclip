import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sessions: defineTable({
    code: v.string(),
    text: v.string(),
    createdAt: v.number(),
    history: v.optional(
      v.array(v.object({ text: v.string(), timestamp: v.number() })),
    ),
    ownerNodeId: v.optional(v.string()),
    isLocked: v.optional(v.boolean()),
    isBurnMode: v.optional(v.boolean()),
    updateCount: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    allowedWriteNodeIds: v.optional(v.array(v.string())),
  })
    .index("by_code", ["code"])
    .index("by_createdAt", ["createdAt"])
    .index("by_updatedAt", ["updatedAt"]),
  presence: defineTable({
    sessionId: v.id("sessions"),
    name: v.string(),
    updatedAt: v.number(),
    nodeId: v.string(),
  })
    .index("by_sessionId_and_nodeId", ["sessionId", "nodeId"])
    .index("by_sessionId_and_updatedAt", ["sessionId", "updatedAt"])
    .index("by_updatedAt", ["updatedAt"]),
  logs: defineTable({
    type: v.string(), // e.g., "session_cleanup", "presence_cleanup"
    count: v.number(), // number of items deleted
    timestamp: v.number(),
    status: v.string(), // e.g., "success", "error"
  }).index("by_type", ["type"]),
  analytics_events: defineTable({
    type: v.string(),
    timestamp: v.number(),
    environment: v.string(),
    pathname: v.string(),
    device: v.string(),
    nodeId: v.optional(v.string()),
    sessionId: v.optional(v.string()),
    metadata: v.optional(v.any()),
  })
    .index("by_type", ["type"])
    .index("by_timestamp", ["timestamp"]),

  node_profiles: defineTable({
    nodeId: v.string(),
    firstSeen: v.number(),
    lastSeen: v.number(),
  })
    .index("by_nodeId", ["nodeId"])
    .index("by_firstSeen", ["firstSeen"]),
});
