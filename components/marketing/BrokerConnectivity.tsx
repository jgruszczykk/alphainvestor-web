import { getTranslations } from "next-intl/server";
import {
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const BROKER_KEYS = [
  "brokerXtb",
  "brokerIbkr",
  "brokerDegiro",
  "brokerT212",
  "brokerRevolut",
  "brokerRobinhood",
  "brokerMbank",
] as const;

export async function BrokerConnectivity() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="brokers" className="mt-20 lg:mt-24" animationDelay="420ms">
      <MarketingSectionHeader title={t("brokersTitle")} intro={t("brokersIntro")} />
      <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
        {BROKER_KEYS.map((key) => (
          <span
            key={key}
            className="rounded-full border border-[var(--border)] bg-transparent px-3.5 py-2 text-xs font-semibold text-[var(--heading)] dark:bg-white/[0.04] sm:text-sm"
          >
            {t(key)}
          </span>
        ))}
        <span className="rounded-full border border-dashed border-[var(--border)] px-3.5 py-2 text-xs font-medium text-[var(--muted)] sm:text-sm">
          {t("brokersMore")}
        </span>
      </div>
      <p className="mx-auto mt-8 max-w-2xl rounded-xl border border-[var(--brand)]/20 bg-[var(--brand-tint)]/50 px-5 py-4 text-center text-sm leading-relaxed text-[var(--foreground)]">
        {t("brokersCallout")}
      </p>
      <div className="mt-8 text-center">
        <a
          href="#waitlist"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--brand)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-[transform,background-color] duration-200 hover:bg-[var(--brand-hover)] active:scale-[0.98]"
        >
          {t("brokersCta")}
        </a>
      </div>
    </MarketingSection>
  );
}
