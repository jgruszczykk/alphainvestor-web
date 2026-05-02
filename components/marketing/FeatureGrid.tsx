import { getTranslations } from "next-intl/server";

const FEATURE_IDS = [1, 2, 3, 4] as const;

export async function FeatureGrid() {
  const t = await getTranslations("Home");

  return (
    <section
      id="features"
      className="anim-fade-rise mx-auto mt-20 w-full max-w-6xl scroll-mt-24 lg:mt-28"
      style={{ animationDelay: "520ms" }}
    >
      <h2 className="text-center text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
        {t("featuresTitle")}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[var(--muted)] sm:text-base">
        {t("featuresIntro")}
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {FEATURE_IDS.map((id) => (
          <div
            key={id}
            className="rounded-2xl border border-[var(--border)] bg-transparent p-6 transition-colors duration-200 dark:bg-white/[0.025]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--brand)]/25 bg-[var(--brand-tint)] text-sm font-semibold text-[var(--brand)]">
              {id}
            </div>
            <h3 className="text-lg font-semibold leading-snug tracking-[-0.015em] text-[var(--heading)]">
              {t(`feature${id}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {t(`feature${id}Body`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
