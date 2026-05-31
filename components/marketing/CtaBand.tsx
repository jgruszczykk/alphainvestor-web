import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { AppStoreBadge } from "@/components/marketing/AppStoreBadge";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";

export async function CtaBand() {
  const t = await getTranslations("Home");

  return (
    <section
      id="waitlist"
      className="mx-auto mt-12 flex w-full max-w-6xl scroll-mt-28 flex-col items-center gap-8 rounded-2xl border border-[var(--border)] bg-transparent px-5 py-10 sm:mt-16 sm:px-10 sm:py-12 dark:bg-white/[0.025]"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
          {t("ctaTitle")}
        </h2>
        <p className="mt-2 max-w-lg text-sm text-[var(--muted)] sm:text-base">
          {t("ctaSub")}
        </p>
      </div>

      <div className="flex w-full max-w-md flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:items-start sm:justify-center">
        <AppStoreBadge
          smallLabel={t("appStoreBadgeSmall")}
          largeLabel={t("appStoreBadgeLarge")}
          ariaLabel={t("appStoreBadgeAria")}
          className="w-full shrink-0 sm:w-auto"
        />
        <div className="w-full min-w-0 flex-1 sm:max-w-md">
          <EarlyAccessForm variant="embedded" />
        </div>
      </div>

      <p className="max-w-md text-center text-xs text-[var(--muted)]">
        {t("formConsent")}{" "}
        <Link
          href="/privacy"
          className="font-medium text-[var(--foreground)] underline decoration-[var(--underline)] underline-offset-[3px] transition-colors duration-200 hover:text-[var(--brand)] hover:decoration-[var(--brand)]/35"
        >
          {t("formConsentLink")}
        </Link>
        .
      </p>
    </section>
  );
}
