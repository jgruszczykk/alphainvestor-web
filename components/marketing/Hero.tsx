import { getTranslations } from "next-intl/server";

import { AppStoreBadge } from "@/components/marketing/AppStoreBadge";
import { HeroDeck } from "@/components/marketing/HeroDeck";

export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative -mx-4 px-4 pb-6 pt-14 sm:-mx-6 sm:px-6 sm:pb-8 sm:pt-16 lg:pb-10 lg:pt-20">
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(340px,1fr)] lg:gap-14 lg:items-center">
        <div className="flex min-w-0 flex-col items-start gap-6 text-left lg:gap-8 lg:py-4">
          <p
            className="anim-fade-rise text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] sm:text-[13px]"
            style={{ animationDelay: "0ms" }}
          >
            {t("eyebrow")}
          </p>
          <h1
            className="anim-fade-rise max-w-3xl text-balance text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.03em] text-[var(--heading)] sm:text-4xl lg:text-[2.35rem] xl:text-[2.55rem]"
            style={{ animationDelay: "70ms" }}
          >
            {t("headline")}
          </h1>
          <p
            className="anim-fade-rise max-w-2xl text-balance text-base leading-[1.7] text-[var(--foreground)] sm:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            {t("subhead")}
          </p>
          <div
            className="anim-fade-rise flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "210ms" }}
          >
            <AppStoreBadge
              smallLabel={t("appStoreBadgeSmall")}
              largeLabel={t("appStoreBadgeLarge")}
              ariaLabel={t("appStoreBadgeAria")}
              className="w-full sm:w-auto"
            />
            <a
              href="#waitlist"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-[var(--border)] bg-white/[0.01] px-4 text-sm font-semibold text-[var(--heading)] transition-[transform,background-color,border-color] duration-200 hover:bg-white/[0.04] active:scale-[0.98] sm:h-13 sm:min-w-[200px] sm:w-auto sm:px-7 sm:text-base"
            >
              {t("heroPrimaryCta")}
            </a>
          </div>
          <div
            className="anim-fade-rise flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
            style={{ animationDelay: "280ms" }}
          >
            <a
              href="#brokers"
              className="font-medium text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] transition-colors hover:text-[var(--brand-hover)]"
            >
              {t("heroSecondaryCta")}
            </a>
            <span className="text-[var(--border)]" aria-hidden>
              ·
            </span>
            <a
              href="#platform"
              className="font-medium text-[var(--muted)] underline decoration-[var(--underline)] underline-offset-[3px] transition-colors hover:text-[var(--heading)]"
            >
              {t("heroTertiaryCta")}
            </a>
          </div>
        </div>

        <div
          className="anim-fade-only flex min-h-[276px] min-w-0 justify-center sm:min-h-[336px] lg:min-h-[400px] xl:min-h-[424px]"
          style={{ animationDelay: "350ms" }}
        >
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
