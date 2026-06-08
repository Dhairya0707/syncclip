import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

const BLUE = 0x057DBC;
const GREEN = 0x2ECC71;
const ORANGE = 0xF5A623;

function fmt(num: number): string {
  return num.toLocaleString("en-IN");
}

function trend(current: number, previous: number): string {
  if (previous === 0) return "—";
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct > 0) return `(+${pct}%)`;
  if (pct < 0) return `(${pct}%)`;
  return "(0%)";
}

export const sendDailyDigest = action({
  args: {},
  handler: async (ctx) => {
    const webhookUrl = process.env.DISCORD_DIGEST_WEBHOOK;
    if (!webhookUrl) {
      console.warn("DISCORD_DIGEST_WEBHOOK not set, skipping daily digest");
      return;
    }

    const digest = await ctx.runQuery(api.analytics.getDailyDigest);
    const retention = await ctx.runQuery(api.analytics.getRetention);

    const fields = [
      {
        name: "👤 Active Nodes",
        value: [
          `**${fmt(digest.activeNodes)}** today ${trend(digest.activeNodes, digest.yesterdayNodes)}`,
          `🔄 **${fmt(digest.returningNodes)}** returning (${digest.retentionRate}%)`,
        ].join("\n"),
        inline: true,
      },
      {
        name: "📁 Sessions",
        value: [
          `**${fmt(digest.sessionsCreated)}** created ${trend(digest.sessionsCreated, digest.yesterdaySessions)}`,
          `👥 **${fmt(digest.multiDeviceSessions7d)}** rooms with 2+ devices (7d)`,
        ].join("\n"),
        inline: true,
      },
      {
        name: "📱 Devices",
        value: [
          `📱 **${fmt(digest.byDevice.mobile)}** mobile`,
          `💻 **${fmt(digest.byDevice.desktop)}** desktop`,
        ].join("\n"),
        inline: true,
      },
    ];

    const eventsField = {
      name: "🔔 Events",
      value: [
        `🔗 **${fmt(digest.secondDeviceJoins)}** device pairs`,
        `🔥 **${fmt(digest.burnTriggers)}** burn toggles`,
        `🗑️ **${fmt(digest.sessionDeletions)}** deletions`,
        ...(digest.errors > 0 ? [`⚠️ **${fmt(digest.errors)}** errors`] : []),
      ].join("\n"),
      inline: false,
    };
    fields.push(eventsField);

    if (retention.length > 0) {
      const cohortLines = retention.slice(0, 6).map((c) =>
        `Week of ${c.label}: **${c.rate}%** returned (${fmt(c.returned)}/${fmt(c.size)})`,
      );
      fields.push({
        name: "📈 Weekly Retention",
        value: cohortLines.join("\n"),
        inline: false,
      });
    }

    const payload = {
      username: "SyncClip Daily",
      avatar_url: "https://syncclip.in/favicon.ico",
      embeds: [
        {
          title: `📊 SyncClip Daily — ${digest.date}`,
          color: digest.errors > 0 ? ORANGE : BLUE,
          fields,
          footer: { text: "SyncClip • Auto-generated daily report" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        console.error("Discord digest webhook failed:", response.status, await response.text());
      }
    } catch (e) {
      console.error("Discord digest webhook error:", e);
    }
  },
});

export const sendTest = action({
  args: {},
  handler: async (ctx) => {
    const webhookUrl = process.env.DISCORD_DIGEST_WEBHOOK;
    if (!webhookUrl) {
      console.warn("DISCORD_DIGEST_WEBHOOK not set");
      return { sent: false, reason: "no webhook" };
    }

    const payload = {
      username: "SyncClip Daily",
      avatar_url: "https://syncclip.in/favicon.ico",
      embeds: [
        {
          title: "🧪 Test — SyncClip Daily Digest",
          description: "This is a test message to verify the daily digest webhook is configured correctly.",
          color: GREEN,
          fields: [
            { name: "Channel", value: "`#daily-ops`", inline: true },
            { name: "Schedule", value: "Every day at 08:00 UTC", inline: true },
          ],
          footer: { text: "SyncClip • Test message" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return { sent: response.ok, status: response.status };
    } catch (e) {
      return { sent: false, error: e instanceof Error ? e.message : String(e) };
    }
  },
});
