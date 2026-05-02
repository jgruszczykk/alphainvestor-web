import { getTranslations } from "next-intl/server";

import { HeroDeck } from "@/components/marketing/HeroDeck";

export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative -mx-4 px-4 pb-8 pt-14 sm:-mx-6 sm:px-6 sm:pb-10 sm:pt-16 lg:pb-12 lg:pt-20">
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(280px,1fr)] lg:gap-16 lg:items-center">
        <div className="flex min-w-0 flex-col items-center gap-9 text-center lg:items-start lg:gap-11 lg:py-6 lg:text-left">
          <p
            className="anim-fade-rise text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] sm:text-[13px]"
            style={{ animationDelay: "0ms" }}
          >
            {t("eyebrow")}
          </p>
          <h1
            className="anim-fade-rise max-w-3xl text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--heading)] sm:text-5xl lg:text-6xl xl:text-[3.5rem] xl:leading-[1.05]"
            style={{ animationDelay: "70ms" }}
          >
            {t("headline")}
          </h1>
          <p
            className="anim-fade-rise max-w-2xl text-balance text-lg leading-[1.55] text-[var(--foreground)] sm:text-xl lg:text-[1.35rem] lg:leading-relaxed"
            style={{ animationDelay: "140ms" }}
          >
            {t("subhead")}
          </p>
          <div
            className="anim-fade-rise flex flex-col items-center gap-4 sm:flex-row sm:gap-5 lg:items-start"
            style={{ animationDelay: "210ms" }}
          >
            <a
              href="#waitlist"
              className="inline-flex h-13 min-w-[220px] items-center justify-center rounded-xl bg-[var(--brand)] px-7 text-base font-semibold text-white shadow-[var(--shadow-elevated)] transition-[transform,background-color,box-shadow] duration-200 hover:bg-[var(--brand-hover)] active:scale-[0.98] sm:h-14"
            >
              {t("heroPrimaryCta")}
            </a>
            <a
              href="#ai"
              className="inline-flex h-13 min-w-[220px] items-center justify-center rounded-xl border border-[var(--border)] bg-transparent px-7 text-base font-medium text-[var(--heading)] transition-[transform,background-color,border-color] duration-200 hover:bg-[var(--pill-bg)] active:scale-[0.98] sm:h-14"
            >
              {t("heroSecondaryCta")}
            </a>
          </div>
        </div>

        <div
          className="anim-fade-only flex min-h-[clamp(240px,min(48vmin,52dvh),420px)] min-w-0 justify-center sm:min-h-[clamp(260px,min(52vmin,56dvh),480px)] lg:min-h-[clamp(280px,min(56vmin,60dvh),560px)]"
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
