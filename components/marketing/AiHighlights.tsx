import { getTranslations } from "next-intl/server";

const PILLAR_IDS = [1, 2, 3] as const;

export async function AiHighlights() {
  const t = await getTranslations("Home");

  return (
    <section
      id="ai"
      className="anim-fade-rise relative mx-auto mt-24 w-full max-w-6xl scroll-mt-24 lg:mt-32"
      style={{ animationDelay: "440ms" }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,var(--brand-tint)_0%,rgba(250,250,249,0.72)_34%,transparent_56%,rgba(10,132,255,0.065)_100%)] shadow-[var(--shadow-elevated)] dark:bg-[linear-gradient(135deg,var(--brand-tint)_0%,rgba(255,255,255,0.055)_32%,transparent_54%,rgba(59,130,246,0.16)_100%)]">
        <div className="relative px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center rounded-full border border-[var(--brand)]/20 bg-[var(--brand-tint)] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">
              {t("aiProBadge")}
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              {t("aiEyebrow")}
            </p>
          </div>

          <h2 className="mx-auto mt-5 max-w-[18ch] text-center text-[2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--heading)] sm:max-w-[22ch] sm:text-4xl sm:leading-[1.04] lg:max-w-none lg:text-[2.75rem] lg:leading-[1.06]">
            {t("aiTitle")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-[1.65] text-[var(--foreground)] sm:text-lg sm:leading-relaxed">
            {t("aiIntro")}
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-[1.65] text-[var(--foreground)] sm:text-lg sm:leading-relaxed">
            {t("aiExplain")}
          </p>

          <p className="mx-auto mt-6 max-w-2xl border-l-2 border-[var(--brand)]/35 pl-4 text-left text-sm font-medium leading-relaxed text-[var(--heading)] sm:pl-5 sm:text-base">
            {t("aiProHook")}
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-14 lg:gap-6">
            {PILLAR_IDS.map((id, index) => (
              <article
                key={id}
                className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 shadow-[var(--shadow-elevated)] transition-[transform,box-shadow] duration-200 motion-safe:hover:-translate-y-0.5 dark:bg-[var(--surface)]/40"
              >
                <div className="mb-4">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--brand)]/20 bg-[var(--brand-tint)] text-xs font-bold tabular-nums text-[var(--brand)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)]">
                  {t(`aiPillar${id}Title`)}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-[var(--muted)] sm:text-[0.9375rem]">
                  {t(`aiPillar${id}Body`)}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-stretch gap-3 sm:mt-14 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <a
              href="#pricing"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--brand)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-[transform,background-color,box-shadow] duration-200 hover:bg-[var(--brand-hover)] active:scale-[0.98] sm:h-13 sm:min-w-[220px] sm:text-base"
            >
              {t("aiPricingCta")}
            </a>
            <a
              href="#waitlist"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-[var(--border)] bg-transparent px-7 text-sm font-medium text-[var(--heading)] transition-[transform,background-color,border-color] duration-200 hover:bg-[var(--pill-bg)] active:scale-[0.98] sm:h-13 sm:min-w-[200px] sm:text-base"
            >
              {t("aiWaitlistCta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
