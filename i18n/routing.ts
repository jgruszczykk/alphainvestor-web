import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "pl"],
  defaultLocale: "en",
  /** Public URLs stay `/`, `/privacy`, etc.; locale from cookie + Accept-Language. */
  localePrefix: "never",
});
