import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { LegalDocument, type LegalSection } from "@/components/marketing/LegalDocument";
import { buildHreflangAlternates } from "@/lib/hreflang";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const alternates = buildHreflangAlternates(locale, "/terms");
  const canonical = alternates.canonical as string;

  return {
    title: t("termsTitle"),
    description: t("termsDescription"),
    alternates,
    openGraph: {
      title: t("termsTitle"),
      description: t("termsDescription"),
      url: canonical,
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Terms");
  const sections = t.raw("sections") as LegalSection[];

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <LegalDocument
        backHomeLabel={t("backHome")}
        title={t("title")}
        lastUpdated={t("lastUpdated")}
        intro={t("intro")}
        sections={sections}
        footerNote={t("localeNote")}
      />
    </div>
  );
}
