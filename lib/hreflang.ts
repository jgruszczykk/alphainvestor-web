import type { Metadata } from "next";

import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/site-url";

type LocalizedPath = "/" | "/privacy" | "/terms";

/**
 * Builds `alternates.canonical` + `alternates.languages` for a route that
 * exists once per locale under `app/[locale]/…`.
 *
 * Requires `localePrefix: "as-needed"` in `i18n/routing.ts` so English URLs
 * stay unprefixed (`/privacy`) while Polish is `/pl/privacy`.
 */
export function buildHreflangAlternates(
  locale: string,
  path: LocalizedPath,
): NonNullable<Metadata["alternates"]> {
  const origin = getSiteUrl().origin;
  const locales = routing.locales;

  const pathFor = (l: string): string => {
    if (path === "/") {
      return l === routing.defaultLocale ? "/" : `/${l}`;
    }
    return l === routing.defaultLocale ? path : `/${l}${path}`;
  };

  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${origin}${pathFor(l)}`;
  }
  languages["x-default"] = `${origin}${pathFor(routing.defaultLocale)}`;

  const canonical = `${origin}${pathFor(locale)}`;

  return { canonical, languages };
}
