import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pl"],
  defaultLocale: "en",
  /**
   * English (default) stays unprefixed (`/`, `/privacy`). Polish is `/pl`, `/pl/privacy`.
   * Enables clean `hreflang` alternates without duplicate canonicals.
   */
  localePrefix: "as-needed",
  /** Emits `Link: rel="alternate"` from middleware for crawlers (pairs with metadata `alternates`). */
  alternateLinks: true,
});
