import { getTranslations } from "next-intl/server";

import { HeroDeck } from "@/components/marketing/HeroDeck";

export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative -mx-4 px-4 pb-4 pt-10 sm:-mx-6 sm:px-6 sm:pb-4 sm:pt-12 lg:pt-14">
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-6 lg:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(300px,1fr)] lg:gap-10 lg:items-center">
        <div className="flex min-w-0 flex-col items-start gap-3 text-left lg:gap-4">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] sm:text-[13px]">
            {t("eyebrow")}
          </p>
          <h1 className="max-w-3xl text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--heading)] sm:text-4xl lg:text-[2.5rem]">
            {t("headline")}
          </h1>
          <p className="max-w-2xl text-balance text-base font-medium leading-snug text-[var(--heading)] sm:text-lg">
            {t("subheadCategory")}
          </p>
          <p className="max-w-2xl text-balance text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {t("subheadBenefit")}
          </p>
          <div className="mt-1">
            <a
              href="#waitlist"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[var(--brand)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-colors hover:bg-[var(--brand-hover)] sm:w-auto"
            >
              {t("ctaPrimary")}
            </a>
          </div>
          <a
            href="#product-proof"
            className="text-sm font-medium text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] hover:text-[var(--brand-hover)]"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        <div className="flex min-h-[180px] min-w-0 justify-center sm:min-h-[240px] lg:min-h-[300px]">
          <HeroDeck
            walletAlt={t("heroDeckWalletAlt")}
            chartAlt={t("heroDeckChartAlt")}
            frontAlt={t("heroImageAlt")}
          />
        </div>
      </div>
    </section>
  );
}
