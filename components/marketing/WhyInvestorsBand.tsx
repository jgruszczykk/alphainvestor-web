import { getTranslations } from "next-intl/server";
import {
  MarketingCard,
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const BENEFIT_IDS = [1, 2, 3, 4, 5] as const;

export async function WhyInvestorsBand() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="benefits" className="mt-20 lg:mt-24" animationDelay="540ms">
      <MarketingSectionHeader title={t("benefitsTitle")} intro={t("benefitsIntro")} />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFIT_IDS.map((id) => (
          <MarketingCard key={id} className={id === 5 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <h3 className="text-base font-semibold leading-snug tracking-[-0.015em] text-[var(--heading)]">
              {t(`benefit${id}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {t(`benefit${id}Body`)}
            </p>
          </MarketingCard>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href="#imports"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-[var(--border)] bg-transparent px-7 text-sm font-semibold text-[var(--heading)] transition-[transform,background-color] duration-200 hover:bg-[var(--pill-bg)] active:scale-[0.98]"
        >
          {t("benefitsCta")}
        </a>
      </div>
    </MarketingSection>
  );
}
