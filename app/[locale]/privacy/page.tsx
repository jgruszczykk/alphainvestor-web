import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { getSiteUrl } from "@/lib/site-url";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const base = getSiteUrl();

  return {
    title: t("privacyTitle"),
    description: t("privacyDescription"),
    alternates: {
      canonical: `${base.origin}/privacy`,
    },
    openGraph: {
      title: t("privacyTitle"),
      description: t("privacyDescription"),
      url: `${base.origin}/privacy`,
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-12 sm:px-6">
        <Link
          href="/"
          className="text-sm text-[var(--muted)] underline-offset-4 hover:text-[var(--heading)] hover:underline"
        >
          {t("backHome")}
        </Link>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--heading)]">
            {t("title")}
          </h1>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            {t("intro")}
          </p>
          <p className="text-sm leading-relaxed text-[var(--muted)]">
            {t("processing")}
          </p>
          <p className="text-xs text-[var(--muted)]">{t("localeNote")}</p>
        </div>
      </div>
    </div>
  );
}
