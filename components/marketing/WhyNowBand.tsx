import { getTranslations } from "next-intl/server";
import { MarketingSection } from "@/components/marketing/MarketingSection";

const PROBLEM_IDS = [1, 2, 3] as const;

export async function WhyNowBand() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="why-now" className="mt-20 lg:mt-24" animationDelay="0ms">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
        {t("whyNowEyebrow")}
      </p>
      <h2 className="mt-3 max-w-2xl text-balance text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
        {t("whyNowTitle")}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--foreground)]">
        {t("whyNowIntro")}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {PROBLEM_IDS.map((id) => (
          <div
            key={id}
            className="rounded-2xl border border-[var(--border)] bg-transparent p-5 dark:bg-white/[0.02]"
          >
            <h3 className="text-sm font-semibold text-[var(--heading)]">
              {t(`whyNowProblem${id}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {t(`whyNowProblem${id}Body`)}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-base leading-relaxed text-[var(--foreground)]">
        {t("whyNowResolution")}
      </p>

      <p className="mt-6">
        <a
          href="#engine"
          className="text-sm font-semibold text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] transition-colors hover:text-[var(--brand-hover)]"
        >
          {t("whyNowCta")}
        </a>
      </p>
    </MarketingSection>
  );
}
