import { getTranslations } from "next-intl/server";
import {
  MarketingCard,
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const BENEFIT_IDS = [1, 2, 3] as const;

export async function WhyInvestorsBand() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="benefits" className="mt-12 sm:mt-16">
      <MarketingSectionHeader title={t("benefitsTitle")} intro={t("benefitsIntro")} />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {BENEFIT_IDS.map((id) => (
          <MarketingCard key={id}>
            <h3 className="text-base font-semibold text-[var(--heading)]">
              {t(`benefit${id}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {t(`benefit${id}Body`)}
            </p>
          </MarketingCard>
        ))}
      </div>
    </MarketingSection>
  );
}
