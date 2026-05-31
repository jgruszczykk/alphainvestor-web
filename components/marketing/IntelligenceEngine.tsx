import { getTranslations } from "next-intl/server";
import {
  MarketingCard,
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const FEATURE_IDS = [1, 2, 3, 4] as const;
const PILLAR_IDS = [1, 2, 3] as const;

export async function IntelligenceEngine() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="engine" className="mt-20 lg:mt-24" animationDelay="460ms">
      <MarketingSectionHeader title={t("engineTitle")} intro={t("engineIntro")} />
      <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
        {FEATURE_IDS.map((id) => (
          <li
            key={id}
            className="flex gap-3 rounded-xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm leading-relaxed text-[var(--foreground)] dark:bg-white/[0.02]"
          >
            <span
              className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[var(--brand)]/30 bg-[var(--brand)]/90 text-[10px] font-bold text-white"
              aria-hidden
            >
              ✓
            </span>
            <span>{t(`engineFeature${id}`)}</span>
          </li>
        ))}
      </ul>

      <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.035),rgba(255,255,255,0.008))] px-6 py-10 sm:px-10">
        <span className="inline-flex items-center rounded-full border border-[var(--brand)]/30 bg-[var(--brand-tint)] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
          {t("aiProBadge")}
        </span>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--foreground)] sm:text-lg">
          {t("aiExplain")}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          {t("aiProHook")}
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {PILLAR_IDS.map((id) => (
            <MarketingCard key={id} className="text-left">
              <h3 className="text-sm font-semibold text-[var(--heading)]">
                {t(`aiPillar${id}Title`)}
              </h3>
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
          className="text-sm font-semibold text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] transition-colors hover:text-[var(--brand-hover)]"
        >
          {t("engineCta")}
        </a>
      </div>
    </MarketingSection>
  );
}
