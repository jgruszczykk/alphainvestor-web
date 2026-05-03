import { NextResponse } from "next/server";

/**
 * Apple App Site Association file for Universal Links.
 *
 * Set `APPLE_APP_SITE_ASSOCIATION_APP_ID` in Vercel to:
 *   `<Apple Team ID>.<bundle id>`  e.g. `ABCD1234.com.jakub.gruszczyk.alpha-investor`
 *
 * @see https://developer.apple.com/documentation/xcode/supporting-associated-domains
 */
export async function GET() {
  const appId = process.env.APPLE_APP_SITE_ASSOCIATION_APP_ID?.trim();
  const body = {
    applinks: {
      apps: [] as string[],
      details: appId
        ? [
            {
              appID: appId,
              paths: ["/i/*", "/p/*"],
            },
          ]
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
