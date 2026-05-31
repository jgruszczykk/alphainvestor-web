import { getTranslations } from "next-intl/server";
import {
  MarketingCard,
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const PILLAR_IDS = [1, 2, 3] as const;

export async function PlatformPillars() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="platform" className="mt-16 lg:mt-20" animationDelay="320ms">
      <MarketingSectionHeader title={t("platformTitle")} intro={t("platformIntro")} />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {PILLAR_IDS.map((id) => (
          <MarketingCard key={id} className="flex flex-col">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--brand)]/25 bg-[var(--brand-tint)] text-sm font-semibold text-[var(--brand)]">
              {id}
            </div>
            <h3 className="text-lg font-semibold leading-snug tracking-[-0.015em] text-[var(--heading)]">
              {t(`platformPillar${id}Title`)}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
              {t(`platformPillar${id}Body`)}
            </p>
          </MarketingCard>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href="#imports"
          className="text-sm font-semibold text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] transition-colors hover:text-[var(--brand-hover)]"
        >
          {t("platformCta")}
        </a>
      </div>
    </MarketingSection>
  );
}
