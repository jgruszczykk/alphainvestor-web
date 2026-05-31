import { getTranslations } from "next-intl/server";
import { MarketingSectionHeader } from "@/components/marketing/MarketingSection";

const PRIMARY_BROKERS = [
  "brokerXtb",
  "brokerIbkr",
  "brokerDegiro",
  "brokerT212",
  "brokerRevolut",
  "brokerCsv",
] as const;

const SECONDARY_BROKERS = ["brokerRobinhood", "brokerMbank"] as const;

const STEP_IDS = [1, 2, 3, 4] as const;

export async function PortfolioImports() {
  const t = await getTranslations("Home");

  return (
    <section
      id="imports"
      className="anim-fade-rise -mx-4 mt-12 scroll-mt-24 border-y border-[var(--border)] bg-[var(--surface)]/60 sm:-mx-6 sm:mt-14 dark:bg-white/[0.02]"
      style={{ animationDelay: "0ms" }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <MarketingSectionHeader title={t("importsTitle")} intro={t("importsIntro")} />
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-[var(--muted)] sm:text-base">
          {t("importsBody")}
        </p>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2 sm:gap-3">
          {PRIMARY_BROKERS.map((key) => (
            <span
              key={key}
              className="rounded-full border border-[var(--border)] bg-transparent px-3.5 py-2 text-xs font-semibold text-[var(--heading)] dark:bg-white/[0.05] sm:text-sm"
            >
              {t(key)}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[11px] text-[var(--muted)]">
          {SECONDARY_BROKERS.map((key) => t(key)).join(" · ")}
        </p>

        <ol className="mx-auto mt-12 flex w-full max-w-md flex-col items-center gap-0 p-0 sm:max-w-lg">
          {STEP_IDS.map((id, index) => (
            <li key={id} className="flex w-full flex-col items-center">
              <div className="w-full rounded-2xl border border-[var(--border)] bg-transparent px-5 py-4 text-center dark:bg-white/[0.03]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--brand)]">
                  {id}
                </p>
                <h3 className="mt-1 text-base font-semibold text-[var(--heading)]">
                  {t(`importsStep${id}Title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {t(`importsStep${id}Body`)}
                </p>
              </div>
              {index < STEP_IDS.length - 1 ? (
                <span
                  className="my-1 flex h-8 items-center justify-center text-lg font-light text-[var(--muted)]"
                  aria-hidden
                >
                  ↓
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-10 flex max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
          <a
            href="#product-proof"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--brand)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-[transform,background-color] duration-200 hover:bg-[var(--brand-hover)] active:scale-[0.98]"
          >
            {t("importsCta")}
          </a>
          <a
            href="#waitlist"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[var(--border)] px-7 text-sm font-semibold text-[var(--heading)] transition-colors hover:bg-[var(--pill-bg)]"
          >
            {t("importsCtaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
