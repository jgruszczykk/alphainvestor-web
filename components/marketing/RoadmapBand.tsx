import { getTranslations } from "next-intl/server";

const PHASE_IDS = [1, 2, 3, 4] as const;

export async function RoadmapBand() {
  const t = await getTranslations("Home");
  const last = PHASE_IDS.length - 1;

  return (
    <section
      className="anim-fade-rise mx-auto mt-20 w-full max-w-6xl lg:mt-28"
      style={{ animationDelay: "760ms" }}
    >
      <div className="rounded-2xl border border-[var(--border)] bg-transparent px-5 py-8 sm:px-8 sm:py-10 dark:bg-white/[0.02]">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          {t("roadmapTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-[var(--muted)]">
          {t("roadmapIntro")}
        </p>

        <ol className="mx-auto mt-10 max-w-2xl list-none space-y-0 p-0">
          {PHASE_IDS.map((id, index) => (
            <li key={id} className="flex gap-5">
              <div className="flex w-6 shrink-0 flex-col items-center">
                {index > 0 ? (
                  <span
                    className="block h-5 w-px shrink-0 bg-[var(--border)]"
                    aria-hidden
                  />
                ) : (
                  <span className="block h-1 shrink-0" aria-hidden />
                )}
                <span
                  className={`z-10 h-3 w-3 shrink-0 rounded-full border-2 shadow-[0_0_0_4px_var(--surface)] ${
                    id === 1
                      ? "border-emerald-600/90 bg-emerald-500 dark:border-emerald-400/90 dark:bg-emerald-500"
                      : "border-[var(--brand)] bg-[var(--surface)]"
                  }`}
                  aria-hidden
                />
                {index < last ? (
                  <span
                    className="mt-0 block min-h-[2.75rem] w-px flex-1 bg-[var(--border)]"
                    aria-hidden
                  />
                ) : (
                  <span className="block h-1 shrink-0" aria-hidden />
                )}
              </div>
              <div className={`min-w-0 ${index < last ? "pb-8" : ""}`}>
                <h3 className="flex flex-wrap items-center gap-2 text-base font-semibold leading-snug tracking-[-0.015em] text-[var(--heading)]">
                  <span>{t(`roadmapPhase${id}Title`)}</span>
                  {id === 1 ? (
                    <span className="rounded-full border border-emerald-600/35 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-200">
                      {t("roadmapPhase1Badge")}
                    </span>
                  ) : null}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
                  {t(`roadmapPhase${id}Body`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
