import { getTranslations } from "next-intl/server";
import {
  MarketingCard,
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const CAP_IDS = [1, 2, 3, 4, 5, 6] as const;

export async function IntelligenceEngine() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="engine" className="mt-12 sm:mt-16">
      <MarketingSectionHeader title={t("engineTitle")} intro={t("engineIntro")} />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CAP_IDS.map((id) => (
          <MarketingCard key={id}>
            <h3 className="text-sm font-semibold text-[var(--heading)]">
              {t(`engineCap${id}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {t(`engineCap${id}Body`)}
            </p>
          </MarketingCard>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[var(--border)] px-5 py-6 text-center dark:bg-white/[0.02] sm:px-8">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--brand)]">
          {t("aiProBadge")}
        </span>
        <h3 className="mt-3 text-base font-semibold text-[var(--heading)]">{t("engineAiTitle")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t("engineAiBody")}</p>
      </div>
    </MarketingSection>
  );
}
