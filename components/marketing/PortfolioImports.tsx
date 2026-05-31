import { getTranslations } from "next-intl/server";

const PRIMARY_BROKERS = [
  "brokerXtb",
  "brokerIbkr",
  "brokerDegiro",
  "brokerT212",
  "brokerRevolut",
  "brokerCsv",
] as const;

const STEP_IDS = [1, 2, 3] as const;

export async function PortfolioImports() {
  const t = await getTranslations("Home");

  return (
    <section
      id="imports"
      className="-mx-4 mt-8 scroll-mt-24 border-y border-[var(--border)] bg-[var(--surface)]/60 sm:-mx-6 dark:bg-white/[0.02]"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-2xl font-semibold tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
            {t("importsTitle")}
          </h2>
          <p className="mx-auto mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {t("importsIntro")}
          </p>
        </header>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
          {PRIMARY_BROKERS.map((key) => (
            <span
              key={key}
              className="rounded-full border border-[var(--border)] px-3.5 py-2 text-xs font-semibold text-[var(--heading)] dark:bg-white/[0.05] sm:text-sm"
            >
              {t(key)}
            </span>
          ))}
        </div>

        <ol className="mx-auto mt-8 flex w-full max-w-sm flex-col items-center gap-0 p-0">
          {STEP_IDS.map((id, index) => (
            <li key={id} className="flex w-full flex-col items-center">
              <div className="w-full rounded-xl border border-[var(--border)] px-4 py-3 text-center dark:bg-white/[0.03]">
                <h3 className="text-sm font-semibold text-[var(--heading)]">
                  {t(`importsStep${id}Title`)}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
                  {t(`importsStep${id}Body`)}
                </p>
              </div>
              {index < STEP_IDS.length - 1 ? (
                <span className="my-0.5 text-base text-[var(--muted)]" aria-hidden>
                  ↓
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
