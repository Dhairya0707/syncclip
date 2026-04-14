import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "cleanup old sessions",
  { hourUTC: 4, minuteUTC: 0 }, // Run once a day at 04:00 UTC
  api.sessions.cleanupSessions
);

export default crons;
