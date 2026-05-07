import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { HtmlLangSync } from "@/components/HtmlLangSync";
import { routing } from "@/i18n/routing";

function isAppLocale(x: string): x is "en" | "pl" {
  return x === "en" || x === "pl";
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isAppLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <HtmlLangSync />
      {children}
      <CookieConsentBanner />
    </NextIntlClientProvider>
  );
}
