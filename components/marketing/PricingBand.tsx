import { getTranslations } from "next-intl/server";

const FREE_IDS = [1, 2, 3] as const;
const PRO_IDS = [1, 2, 3, 4] as const;

export async function PricingBand() {
  const t = await getTranslations("Home");

  return (
    <section
      id="pricing"
      className="anim-fade-rise relative mx-auto mt-24 w-full max-w-6xl scroll-mt-24 lg:mt-28"
      style={{ animationDelay: "600ms" }}
    >
      <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
        {t("pricingEyebrow")}
      </p>
      <h2 className="mx-auto mt-3 max-w-xl text-center text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
        {t("pricingTitle")}
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-center text-sm text-[var(--muted)] sm:text-base">
        {t("pricingTagline")}
      </p>

      <div className="mt-10 grid gap-5 lg:grid-cols-2 lg:gap-8 lg:items-stretch">
        <div className="flex flex-col rounded-2xl border border-[var(--border)] bg-transparent p-6 transition-colors duration-200 sm:p-8 dark:bg-white/[0.025]">
          <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--heading)]">
            {t("pricingFreeName")}
          </h3>
          <p className="mt-5 text-3xl font-semibold tabular-nums tracking-[-0.02em] text-[var(--heading)]">
            {t("pricingFreePrice")}
          </p>
          <ul className="mt-8 flex flex-1 flex-col gap-3 p-0">
            {FREE_IDS.map((id) => (
              <li
                key={id}
                className="flex gap-3 text-sm font-medium leading-snug text-[var(--heading)] sm:text-[0.9375rem]"
              >
                <span
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[var(--brand)]/30 bg-[var(--brand)]/90 text-[10px] font-bold text-white"
                  aria-hidden
                >
                  ✓
                </span>
                <span className="text-[var(--foreground)]">{t(`pricingFreeBullet${id}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,var(--brand-tint)_0%,rgba(250,250,249,0.72)_34%,transparent_56%,rgba(10,132,255,0.065)_100%)] p-6 shadow-[var(--shadow-elevated)] sm:p-8 dark:border-[var(--brand)]/20 dark:bg-[linear-gradient(135deg,var(--brand-tint)_0%,rgba(255,255,255,0.055)_32%,transparent_54%,rgba(59,130,246,0.16)_100%)]">
          <div className="relative flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--heading)]">
              {t("pricingProName")}
            </h3>
            <span className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--muted)]">
              {t("pricingProBadge")}
            </span>
          </div>
          <div className="relative mt-5 flex flex-wrap items-end gap-2">
            <span className="text-4xl font-semibold tabular-nums tracking-[-0.03em] text-[var(--heading)] sm:text-5xl">
              {t("pricingProPrice")}
            </span>
            <span className="pb-1 text-base font-medium text-[var(--muted)]">{t("pricingProPeriod")}</span>
          </div>

          <ul className="relative mt-8 flex flex-1 flex-col gap-3 p-0">
            {PRO_IDS.map((id) => (
              <li
                key={id}
                className="flex gap-3 text-sm font-medium leading-snug text-[var(--heading)] sm:text-[0.9375rem]"
              >
                <span
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[var(--brand)]/30 bg-[var(--brand)]/90 text-[10px] font-bold text-white"
                  aria-hidden
                >
                  ✓
                </span>
                <span className="text-[var(--foreground)]">{t(`pricingProBullet${id}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
        <a
          href="#waitlist"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--brand)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-[transform,background-color] duration-200 hover:bg-[var(--brand-hover)] active:scale-[0.98] sm:h-13 sm:min-w-[200px] sm:text-base"
        >
          {t("pricingCtaWaitlist")}
        </a>
        <a
          href="#ai"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-[var(--border)] bg-transparent px-7 text-sm font-medium text-[var(--heading)] transition-[transform,background-color] duration-200 hover:bg-[var(--pill-bg)] active:scale-[0.98] sm:h-13 sm:min-w-[180px] sm:text-base"
        >
          {t("pricingCtaAi")}
        </a>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
        {t("pricingDisclaimerLine")}
      </p>
      <p className="mx-auto mt-3 max-w-2xl text-center text-[11px] leading-relaxed text-[var(--muted)] sm:text-xs">
        {t("pricingFootnote")}
      </p>
    </section>
  );
}
