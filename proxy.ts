import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleI18n(request);
}

export const config = {
  // Exclude static files (`.*\\..*`) and Apple / security well-known paths
  // from locale middleware so `/.well-known/*` stays on the exact URL iOS expects.
  matcher: ["/((?!api|_next|_vercel|\\.well-known|.*\\..*).*)"],
};
