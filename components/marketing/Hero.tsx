import { getTranslations } from "next-intl/server";

import { AppStoreBadge } from "@/components/marketing/AppStoreBadge";
import { HeroDeck } from "@/components/marketing/HeroDeck";

const PROOF_KEYS = ["heroProof1", "heroProof2", "heroProof3"] as const;

export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative -mx-4 px-4 pb-4 pt-12 sm:-mx-6 sm:px-6 sm:pb-5 sm:pt-14 lg:pt-16">
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(300px,1fr)] lg:gap-12 lg:items-center">
        <div className="flex min-w-0 flex-col items-start gap-4 text-left lg:gap-5">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] sm:text-[13px]">
            {t("eyebrow")}
          </p>
          <h1 className="max-w-3xl text-balance text-[2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--heading)] sm:text-4xl lg:text-[2.5rem]">
            {t("headline")}
          </h1>
          <ul
            className="-mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-0.5 sm:mx-0 sm:w-full sm:flex-wrap sm:overflow-visible sm:px-0"
            aria-label="Product capabilities"
          >
            {PROOF_KEYS.map((key) => (
              <li
                key={key}
                className="shrink-0 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--heading)] dark:bg-white/[0.04] sm:text-sm"
              >
                {t(key)}
              </li>
            ))}
          </ul>
          <p className="max-w-2xl text-balance text-base leading-relaxed text-[var(--foreground)] sm:text-lg">
            {t("subhead")}
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#waitlist"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[var(--brand)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-colors hover:bg-[var(--brand-hover)] sm:w-auto"
            >
              {t("ctaPrimary")}
            </a>
            <AppStoreBadge
              smallLabel={t("appStoreBadgeSmall")}
              largeLabel={t("appStoreBadgeLarge")}
              ariaLabel={t("appStoreBadgeAria")}
              className="w-full sm:w-auto"
            />
          </div>
          <a
            href="#product-proof"
            className="text-sm font-medium text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] hover:text-[var(--brand-hover)]"
          >
            {t("ctaSecondary")}
          </a>
        </div>

        <div className="flex min-h-[200px] min-w-0 justify-center sm:min-h-[260px] lg:min-h-[320px]">
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
