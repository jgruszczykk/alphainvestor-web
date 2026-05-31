import { getTranslations } from "next-intl/server";

import { AppStoreBadge } from "@/components/marketing/AppStoreBadge";
import { HeroDeck } from "@/components/marketing/HeroDeck";

const PROOF_KEYS = ["heroProof1", "heroProof2", "heroProof3"] as const;

export async function Hero() {
  const t = await getTranslations("Home");

  return (
    <section className="relative -mx-4 px-4 pb-6 pt-14 sm:-mx-6 sm:px-6 sm:pb-8 sm:pt-16 lg:pb-10 lg:pt-20">
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(320px,1fr)] lg:gap-14 lg:items-center">
        <div className="flex min-w-0 flex-col items-start gap-5 text-left lg:gap-6 lg:py-4">
          <p
            className="anim-fade-rise text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] sm:text-[13px]"
            style={{ animationDelay: "0ms" }}
          >
            {t("eyebrow")}
          </p>
          <h1
            className="anim-fade-rise max-w-3xl text-balance text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--heading)] sm:text-4xl lg:text-[2.4rem]"
            style={{ animationDelay: "70ms" }}
          >
            {t("headline")}
          </h1>
          <ul
            className="anim-fade-rise -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:w-full sm:flex-wrap sm:overflow-visible sm:px-0"
            style={{ animationDelay: "120ms" }}
            aria-label="Product capabilities"
          >
            {PROOF_KEYS.map((key) => (
              <li
                key={key}
                className="shrink-0 rounded-full border border-[var(--border)] bg-transparent px-3 py-1.5 text-xs font-medium text-[var(--heading)] dark:bg-white/[0.04] sm:text-sm"
              >
                {t(key)}
              </li>
            ))}
          </ul>
          <p
            className="anim-fade-rise max-w-2xl text-balance text-base leading-[1.7] text-[var(--foreground)] sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {t("subhead")}
          </p>
          <div
            className="anim-fade-rise flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "220ms" }}
          >
            <a
              href="#imports"
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[var(--brand)] px-4 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-[transform,background-color] duration-200 hover:bg-[var(--brand-hover)] active:scale-[0.98] sm:h-13 sm:min-w-[220px] sm:w-auto sm:px-7 sm:text-base"
            >
              {t("heroPrimaryCta")}
            </a>
            <AppStoreBadge
              smallLabel={t("appStoreBadgeSmall")}
              largeLabel={t("appStoreBadgeLarge")}
              ariaLabel={t("appStoreBadgeAria")}
              className="w-full sm:w-auto"
            />
          </div>
          <div
            className="anim-fade-rise flex flex-wrap items-center gap-x-4 gap-y-2 text-sm"
            style={{ animationDelay: "280ms" }}
          >
            <a
              href="#waitlist"
              className="font-medium text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] transition-colors hover:text-[var(--brand-hover)]"
            >
              {t("heroSecondaryCta")}
            </a>
            <span className="text-[var(--border)]" aria-hidden>
              ·
            </span>
            <a
              href="#data"
              className="font-medium text-[var(--muted)] underline decoration-[var(--underline)] underline-offset-[3px] transition-colors hover:text-[var(--heading)]"
            >
              {t("heroTertiaryCta")}
            </a>
          </div>
          <p
            className="anim-fade-rise text-[11px] leading-relaxed text-[var(--muted)]"
            style={{ animationDelay: "320ms" }}
          >
            {t("heroFootnote")}
          </p>
        </div>

        <div
          className="anim-fade-only flex min-h-[240px] min-w-0 justify-center sm:min-h-[300px] lg:min-h-[380px]"
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
