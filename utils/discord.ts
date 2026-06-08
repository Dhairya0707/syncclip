type DiscordLevel = "error" | "warn" | "info";

function getWebhookUrl(): string | null {
  if (typeof window === "undefined") return null;
  return process.env.NEXT_PUBLIC_DISCORD_WEBHOOK || null;
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "..." : str;
}

function levelColor(level: DiscordLevel): number {
  switch (level) {
    case "error": return 0xE03E2F;
    case "warn": return 0xF5A623;
    case "info": return 0x057DBC;
  }
}

function levelEmoji(level: DiscordLevel): string {
  switch (level) {
    case "error": return "❌";
    case "warn": return "⚠️";
    case "info": return "ℹ️";
  }
}

export async function sendDiscord(opts: {
  level: DiscordLevel;
  title: string;
  description?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  metadata?: Record<string, unknown>;
}) {
  const url = getWebhookUrl();
  if (!url) return;

  const fields = [...(opts.fields ?? [])];

  if (opts.metadata?.sessionId) {
    fields.unshift({
      name: "Session",
      value: `\`${opts.metadata.sessionId}\``,
      inline: true,
    });
  }
  if (opts.metadata?.nodeId) {
    fields.unshift({
      name: "Node",
      value: `\`${opts.metadata.nodeId}\``,
      inline: true,
    });
  }

  const payload = {
    username: "SyncClip Ops",
    avatar_url: "https://syncclip.in/favicon.ico",
    embeds: [
      {
        title: `${levelEmoji(opts.level)} ${opts.title}`,
        description: opts.description ? truncate(opts.description, 2000) : undefined,
        color: levelColor(opts.level),
        fields: fields.length > 0 ? fields.slice(0, 8) : undefined,
        footer: { text: `SyncClip • ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST` },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.warn("Discord webhook failed:", e);
  }
}

export async function sendError(title: string, description?: string, metadata?: Record<string, unknown>) {
  return sendDiscord({ level: "error", title, description, metadata });
}

export async function sendWarn(title: string, description?: string, metadata?: Record<string, unknown>) {
  return sendDiscord({ level: "warn", title, description, metadata });
}

export async function sendInfo(title: string, fields?: { name: string; value: string; inline?: boolean }[], metadata?: Record<string, unknown>) {
  return sendDiscord({ level: "info", title, fields, metadata });
}
