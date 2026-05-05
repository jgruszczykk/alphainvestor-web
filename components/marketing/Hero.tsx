import { getTranslations } from "next-intl/server";

import { HeroDeck } from "@/components/marketing/HeroDeck";

export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative -mx-4 px-4 pb-10 pt-14 sm:-mx-6 sm:px-6 sm:pb-12 sm:pt-16 lg:pb-14 lg:pt-20">
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(340px,1fr)] lg:gap-14 lg:items-center">
        <div className="flex min-w-0 flex-col items-start gap-8 text-left lg:gap-10 lg:py-4">
          <p
            className="anim-fade-rise text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] sm:text-[13px]"
            style={{ animationDelay: "0ms" }}
          >
            {t("eyebrow")}
          </p>
          <h1
            className="anim-fade-rise max-w-3xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.03em] text-[var(--heading)] sm:text-5xl lg:text-[3.6rem] xl:text-[3.9rem]"
            style={{ animationDelay: "70ms" }}
          >
            {t("headline")}
          </h1>
          <p
            className="anim-fade-rise max-w-2xl text-balance text-base leading-[1.7] text-[var(--foreground)] sm:text-lg lg:text-[1.15rem]"
            style={{ animationDelay: "140ms" }}
          >
            {t("subhead")}
          </p>
          <div
            className="anim-fade-rise flex w-full flex-row items-start gap-3 sm:w-auto sm:gap-4"
            style={{ animationDelay: "210ms" }}
          >
            <a
              href="#waitlist"
              className="inline-flex h-12 min-w-0 flex-1 items-center justify-center rounded-xl bg-[var(--brand)] px-4 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-[transform,background-color,box-shadow] duration-200 hover:bg-[var(--brand-hover)] active:scale-[0.98] sm:h-13 sm:min-w-[210px] sm:flex-none sm:px-7 sm:text-base"
            >
              {t("heroPrimaryCta")}
            </a>
            <a
              href="#how"
              className="inline-flex h-12 min-w-0 flex-1 items-center justify-center rounded-xl border border-[var(--border)] bg-white/[0.01] px-4 text-sm font-medium text-[var(--heading)] transition-[transform,background-color,border-color] duration-200 hover:bg-white/[0.04] active:scale-[0.98] sm:h-13 sm:min-w-[210px] sm:flex-none sm:px-7 sm:text-base"
            >
              {t("heroSecondaryCta")}
            </a>
          </div>
        </div>

        <div
          className="anim-fade-only flex min-h-[276px] min-w-0 justify-center sm:min-h-[336px] lg:min-h-[400px] xl:min-h-[424px]"
          style={{ animationDelay: "280ms" }}
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
