import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  MarketingCard,
  MarketingSection,
} from "@/components/marketing/MarketingSection";

const GRID_IDS = [1, 2, 3, 4, 5] as const;
const PARTNERS_EMAIL = "partners@alphainvestor.app";

export async function DataInfrastructure() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="data" className="mt-12 sm:mt-16">
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
        {t("dataEyebrow")}
      </p>
      <h2 className="mx-auto mt-3 max-w-2xl text-center text-balance text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
        {t("dataTitle")}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-[var(--muted)]">
        {t("dataIntro")}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GRID_IDS.map((id) => (
          <MarketingCard key={id} className="p-4">
            <h3 className="text-sm font-semibold text-[var(--heading)]">
              {t(`dataGrid${id}Title`)}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
              {t(`dataGrid${id}Body`)}
            </p>
          </MarketingCard>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
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
