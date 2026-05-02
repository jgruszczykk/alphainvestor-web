import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { MarketingHome } from "@/components/marketing/MarketingHome";
import { getSiteUrl } from "@/lib/site-url";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const base = getSiteUrl();

  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: `${base.origin}/`,
    },
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      type: "website",
      locale: locale === "pl" ? "pl_PL" : "en_US",
      url: `${base.origin}/`,
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDescription"),
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarketingHome locale={locale} />;
}
