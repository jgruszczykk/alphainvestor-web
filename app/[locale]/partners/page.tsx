import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PartnersPage } from "@/components/marketing/PartnersPage";
import { buildHreflangAlternates } from "@/lib/hreflang";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const alternates = buildHreflangAlternates(locale, "/partners");
  const canonical = alternates.canonical as string;

  return {
    title: t("partnersTitle"),
    description: t("partnersDescription"),
    alternates,
    openGraph: {
      title: t("partnersTitle"),
      description: t("partnersDescription"),
      url: canonical,
    },
  };
}

export default async function PartnersRoute({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PartnersPage />;
}
