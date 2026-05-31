import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  MarketingCard,
  MarketingSection,
} from "@/components/marketing/MarketingSection";

const GRID_IDS = [1, 2, 3, 4, 5, 6] as const;
const PARTNERS_EMAIL = "partners@alphainvestor.app";

export async function DataInfrastructure() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="data" className="mt-20 lg:mt-24" animationDelay="0ms">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
        {t("dataEyebrow")}
      </p>
      <h2 className="mx-auto mt-3 max-w-2xl text-center text-balance text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
        {t("dataTitle")}
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        {t("dataIntro")}
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-center text-xs font-medium text-[var(--foreground)]">
        {t("dataStatLine")}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GRID_IDS.map((id) => (
          <MarketingCard key={id}>
            <h3 className="text-sm font-semibold tracking-[-0.01em] text-[var(--heading)]">
              {t(`dataGrid${id}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {t(`dataGrid${id}Body`)}
            </p>
          </MarketingCard>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-[var(--muted)]">
        {t("dataFooterLine")}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
        <a
          href={`mailto:${PARTNERS_EMAIL}`}
          className="text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] transition-colors hover:text-[var(--brand-hover)]"
        >
          {t("dataPartnerCta")}
        </a>
        <Link
          href="/partners"
          className="text-[var(--muted)] underline decoration-[var(--underline)] underline-offset-[3px] transition-colors hover:text-[var(--heading)]"
        >
          {t("dataVendorsLink")}
        </Link>
      </div>
    </MarketingSection>
  );
}
