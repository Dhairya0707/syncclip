import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

const BLUE = 0x057dbc;
const GREEN = 0x2ecc71;
const ORANGE = 0xf5a623;
const RED = 0xe03e2f;

function fmt(num: number): string {
  return num.toLocaleString("en-IN");
}

function trend(current: number, previous: number): string {
  if (previous === 0) return "—";
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct > 0) return `+${pct}%`;
  if (pct < 0) return `${pct}%`;
  return "0%";
}

function trendArrow(current: number, previous: number): string {
  if (previous === 0) return "▬";
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct > 5) return "↑";
  if (pct < -5) return "↓";
  return "→";
}

function trendEmoji(current: number, previous: number): string {
  if (previous === 0) return "🆕";
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct > 20) return "🚀";
  if (pct > 5) return "📈";
  if (pct < -20) return "📉";
  if (pct < -5) return "📊";
  return "➡️";
}

function pctOf(part: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((part / total) * 100)}%`;
}

function toIst(date: Date): string {
  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
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

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const fields: { name: string; value: string; inline?: boolean }[] = [];

    fields.push({
      name: "👤 Traffic",
      value: [
        `**Active Nodes:** ${fmt(digest.activeNodes)} ${trendEmoji(digest.activeNodes, digest.yesterdayNodes)} *${trend(digest.activeNodes, digest.yesterdayNodes)} vs yesterday*`,
        `**Returning:** ${fmt(digest.returningNodes)} (${digest.retentionRate}% retention)`,
        `**Total Events:** ${fmt(digest.totalEvents)}`,
      ].join("\n"),
      inline: true,
    });

    fields.push({
      name: "📁 Sessions",
      value: [
        `**Created:** ${fmt(digest.sessionsCreated)} ${trendEmoji(digest.sessionsCreated, digest.yesterdaySessions)} *${trend(digest.sessionsCreated, digest.yesterdaySessions)} vs yesterday*`,
        `**Multi-Device Rooms:** ${fmt(digest.multiDeviceSessions7d)} *(last 7 days)*`,
      ].join("\n"),
      inline: true,
    });

    fields.push({
      name: "📱 Devices",
      value: [
        `**Mobile:** ${fmt(digest.byDevice.mobile)} (${pctOf(digest.byDevice.mobile, digest.byDevice.mobile + digest.byDevice.desktop)})`,
        `**Desktop:** ${fmt(digest.byDevice.desktop)} (${pctOf(digest.byDevice.desktop, digest.byDevice.mobile + digest.byDevice.desktop)})`,
      ].join("\n"),
      inline: true,
    });

    const funnelEngagement = [
      `📁 **${fmt(digest.sessionsCreated)}** sessions created`,
      `⌨️ **${fmt(digest.firstKeystrokes)}** first keystrokes ${digest.sessionsCreated > 0 ? `(${Math.round((digest.firstKeystrokes / digest.sessionsCreated) * 100)}% conversion)` : ""}`,
      `🔗 **${fmt(digest.secondDeviceJoins)}** second device joins`,
      `📋 **${fmt(digest.textCopied)}** text copies`,
    ];

    if (digest.qrViewed > 0 || digest.nodeCleared > 0 || digest.burnTriggers > 0 || digest.sessionDeletions > 0 || digest.errors > 0) {
      const extras: string[] = [];
      if (digest.qrViewed > 0) extras.push(`📱 QR scans: ${fmt(digest.qrViewed)}`);
      if (digest.nodeCleared > 0) extras.push(`🗑️ Clears: ${fmt(digest.nodeCleared)}`);
      if (digest.burnTriggers > 0) extras.push(`🔥 Burn toggles: ${fmt(digest.burnTriggers)}`);
      if (digest.sessionDeletions > 0) extras.push(`🚮 Deletions: ${fmt(digest.sessionDeletions)}`);
      if (digest.errors > 0) extras.push(`⚠️ Errors: ${fmt(digest.errors)}`);
      funnelEngagement.push(`└ ${extras.join(" · ")}`);
    }

    fields.push({
      name: "🔔 Engagement Funnel",
      value: funnelEngagement.join("\n"),
      inline: false,
    });

    if (digest.topPaths.length > 0) {
      const pathLines = digest.topPaths.map(
        (p, i) => `**${i + 1}.** \`${p.path}\` — ${fmt(p.count)} visits`,
      );
      fields.push({
        name: "🔝 Top Pages Today",
        value: pathLines.join("\n"),
        inline: false,
      });
    }

    if (retention.length > 0) {
      const cohortLines = retention.slice(0, 5).map(
        (c) => `**${c.rate}%** returned (${fmt(c.returned)}/${fmt(c.size)}) — Week of ${c.label}`,
      );
      fields.push({
        name: "📈 Weekly Retention (last 5 weeks)",
        value: cohortLines.join("\n"),
        inline: false,
      });
    }

    const insights: string[] = [];
    const mobilePct = Math.round(
      (digest.byDevice.mobile / Math.max(digest.byDevice.mobile + digest.byDevice.desktop, 1)) * 100,
    );
    if (mobilePct > 55) {
      insights.push(`📱 **Mobile dominant** (${mobilePct}%) — ensure mobile UX is polished`);
    }
    if (digest.sessionsCreated > 0 && digest.firstKeystrokes / digest.sessionsCreated < 0.4) {
      insights.push(`⌨️ **Low keystroke conversion** (${Math.round((digest.firstKeystrokes / digest.sessionsCreated) * 100)}%) — users create rooms but don't type`);
    }
    if (digest.secondDeviceJoins > 3) {
      insights.push(`🔗 **High pairing activity** (${fmt(digest.secondDeviceJoins)} pairs) — the viral loop is working`);
    }
    if (digest.retentionRate > 50) {
      insights.push(`🔄 **Strong retention** (${digest.retentionRate}%) — users are coming back`);
    } else if (digest.retentionRate < 20 && digest.activeNodes > 5) {
      insights.push(`🔄 **Low retention** (${digest.retentionRate}%) — returning users are low, consider re-engagement`);
    }
    if (digest.errors > 0) {
      insights.push(`⚠️ **${fmt(digest.errors)} error(s)** detected — check error logs`);
    }
    if (digest.environment.development > 0) {
      insights.push(`🔧 **${fmt(digest.environment.development)} events** from dev environment — filter noise`);
    }
    if (insights.length === 0) {
      insights.push("✅ No significant anomalies detected");
    }

    fields.push({
      name: "💡 Key Insights",
      value: insights.join("\n"),
      inline: false,
    });

    const payload = {
      username: "SyncClip Daily",
      avatar_url: "https://syncclip.in/favicon.ico",
      embeds: [
        {
          title: `📊 SyncClip Daily — ${formattedDate}`,
          color: digest.errors > 0 ? RED : digest.activeNodes > 10 ? GREEN : BLUE,
          fields,
          footer: {
            text: `Generated at ${toIst(now)} IST • Auto-report`,
          },
          timestamp: now.toISOString(),
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
        console.error(
          "Discord digest webhook failed:",
          response.status,
          await response.text(),
        );
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
          description:
            "This is a test message to verify the daily digest webhook is configured correctly.",
          color: GREEN,
          fields: [
            { name: "Channel", value: "`#daily-digest`", inline: true },
            { name: "Schedule", value: "Daily at 8:30 PM IST", inline: true },
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

export const postDiscordMessage = action({
  args: {
    level: v.string(), // "error" | "warn" | "info"
    title: v.string(),
    description: v.optional(v.string()),
    fields: v.optional(v.array(v.object({ name: v.string(), value: v.string(), inline: v.optional(v.boolean()) }))),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK || process.env.DISCORD_DIGEST_WEBHOOK;
    if (!webhookUrl) {
      console.warn("DISCORD_WEBHOOK or DISCORD_DIGEST_WEBHOOK not set");
      return;
    }

    const fields = args.fields ? [...args.fields] : [];

    if (args.metadata?.sessionId) {
      fields.unshift({
        name: "Session",
        value: `\`${args.metadata.sessionId}\``,
        inline: true,
      });
    }
    if (args.metadata?.nodeId) {
      fields.unshift({
        name: "Node",
        value: `\`${args.metadata.nodeId}\``,
        inline: true,
      });
    }

    const payload = {
      username: "SyncClip Ops",
      avatar_url: "https://syncclip.in/favicon.ico",
      embeds: [
        {
          title: `${args.level.toUpperCase()} - ${args.title}`,
          description: args.description,
          color: args.level === "error" ? 0xE03E2F : args.level === "warn" ? 0xF5A623 : 0x057DBC,
          fields: fields.length > 0 ? fields.slice(0, 25) : undefined,
          footer: { text: "SyncClip Server" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error("Convex Discord webhook failed:", e);
    }
  },
});

