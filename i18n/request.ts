import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

function pickLocale(requested: string | undefined) {
  if (requested === "en" || requested === "pl") return requested;
  return routing.defaultLocale;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = pickLocale(await requestLocale);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
