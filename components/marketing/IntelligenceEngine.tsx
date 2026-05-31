import { getTranslations } from "next-intl/server";
import {
  MarketingCard,
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const CAP_IDS = [1, 2, 3, 4, 5, 6] as const;
const PILLAR_IDS = [1, 2, 3] as const;

export async function IntelligenceEngine() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="engine" className="mt-20 lg:mt-24" animationDelay="0ms">
      <MarketingSectionHeader title={t("engineTitle")} intro={t("engineIntro")} />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008))] px-6 py-10 sm:px-10">
        <span className="inline-flex items-center rounded-full border border-[var(--brand)]/30 bg-[var(--brand-tint)] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
          {t("aiProBadge")}
        </span>
        <h3 className="mt-5 text-lg font-semibold text-[var(--heading)]">{t("engineAiTitle")}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          {t("engineAiBody")}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--foreground)]">
          {t("aiExplain")}
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          {t("aiProHook")}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {PILLAR_IDS.map((id) => (
            <MarketingCard key={id} className="text-left">
              <h4 className="text-sm font-semibold text-[var(--heading)]">
                {t(`aiPillar${id}Title`)}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {t(`aiPillar${id}Body`)}
              </p>
            </MarketingCard>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <a
          href="#product-proof"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-[var(--border)] px-7 text-sm font-semibold text-[var(--heading)] transition-colors hover:bg-[var(--pill-bg)]"
        >
          {t("engineCta")}
        </a>
      </div>
    </MarketingSection>
  );
}
