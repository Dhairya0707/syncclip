"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

import { useEffect } from "react";
import { track } from "../utils/analytics";

export const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const now = Date.now();
    const lastVisitStr = localStorage.getItem("syncclip_last_visit");
    
    if (lastVisitStr) {
      const lastVisit = parseInt(lastVisitStr, 10);
      const diffMs = now - lastVisit;
      const diffHours = diffMs / (1000 * 60 * 60);
      
      // If returned after 24 hours but within 7 days
      if (diffHours >= 24 && diffHours <= 168) {
        track("return_visit", {
          daysSinceLastVisit: Math.round(diffHours / 24),
          timestamp: new Date().toISOString()
        });
      }
    }
    
    localStorage.setItem("syncclip_last_visit", now.toString());
  }, []);

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
