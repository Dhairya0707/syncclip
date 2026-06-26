import { cronJobs } from "convex/server";
import { api, internal } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "cleanup old sessions",
  { hourUTC: 4, minuteUTC: 0 },
  api.sessions.cleanupSessions,
);

crons.interval(
  "cleanup old presence",
  { minutes: 5 },
  internal.sessions.cleanupOldPresence,
);


export default crons;
