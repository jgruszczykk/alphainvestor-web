"use client";

import { Analytics } from "@vercel/analytics/react";

/** Renders Vercel Web Analytics only when `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS=1`. */
export function VercelAnalyticsGate() {
  if (process.env.NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS !== "1") {
    return null;
  }
  return <Analytics />;
}
