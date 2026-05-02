import { getTranslations } from "next-intl/server";

const STEP_IDS = [1, 2, 3] as const;

export async function StepTimeline() {
  const t = await getTranslations("Home");

  return (
    <section
      id="how"
      className="anim-fade-rise mx-auto mt-10 w-full max-w-6xl scroll-mt-24 sm:mt-12 lg:mt-14"
      style={{ animationDelay: "360ms" }}
    >
      <h2 className="text-center text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
        {t("stepsTitle")}
      </h2>
      <ol className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-3">
        {STEP_IDS.map((id) => (
          <li
            key={id}
            className="flex flex-col rounded-2xl border border-[var(--border)] bg-transparent p-6 transition-colors duration-200 dark:bg-white/[0.025]"
          >
            <div className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--brand)]/25 bg-[var(--brand-tint)] text-sm font-semibold text-[var(--brand)]">
              {id}
            </div>
            <h3 className="text-lg font-semibold leading-snug tracking-[-0.015em] text-[var(--heading)]">
              {t(`step${id}Title`)}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              {t(`step${id}Body`)}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
