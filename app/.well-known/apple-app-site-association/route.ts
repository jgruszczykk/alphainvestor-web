import { NextResponse } from "next/server";

/**
 * Apple App Site Association file for Universal Links.
 *
 * `details` is empty until we add HTTPS path prefixes that should open the app.
 * When you add routes, set `APPLE_APP_SITE_ASSOCIATION_APP_ID` in Vercel to:
 *   `<Apple Team ID>.<bundle id>`  e.g. `ABCD1234.com.jakub.gruszczyk.alpha-investor`
 * and populate `hostedPaths` below.
 *
 * @see https://developer.apple.com/documentation/xcode/supporting-associated-domains
 */
export async function GET() {
  const appId = process.env.APPLE_APP_SITE_ASSOCIATION_APP_ID?.trim();
  const hostedPaths: string[] = [];
  const body = {
    applinks: {
      apps: [] as string[],
      details:
        appId && hostedPaths.length > 0
          ? [{ appID: appId, paths: hostedPaths }]
          : ([] as { appID: string; paths: string[] }[]),
    },
  };

  return NextResponse.json(body, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
