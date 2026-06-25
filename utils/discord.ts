import { convex } from "../app/ConvexClientProvider";
import { api } from "../convex/_generated/api";

type DiscordLevel = "error" | "warn" | "info";

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + "..." : str;
}


export async function sendDiscord(opts: {
  level: DiscordLevel;
  title: string;
  description?: string;
  fields?: { name: string; value: string; inline?: boolean }[];
  metadata?: Record<string, unknown>;
}) {
  try {
    const fields = opts.fields ? opts.fields.map(f => ({
      name: f.name,
      value: truncate(f.value, 1024),
      inline: f.inline
    })) : undefined;

    await convex.action(api.discord.postDiscordMessage, {
      level: opts.level,
      title: opts.title,
      description: opts.description ? truncate(opts.description, 2000) : undefined,
      fields,
      metadata: opts.metadata,
    });
  } catch (e) {
    console.warn("Convex Discord dispatch action failed:", e);
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
