import { getTranslations } from "next-intl/server";
import {
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const BULLET_IDS = [1, 2, 3, 4] as const;
const PARTNERS_EMAIL = "partners@alphainvestor.app";

export async function DataInfrastructure() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="data" className="mt-20 lg:mt-24" animationDelay="380ms">
      <MarketingSectionHeader title={t("dataTitle")} intro={t("dataIntro")} />
      <ul className="mx-auto mt-10 max-w-2xl space-y-4">
        {BULLET_IDS.map((id) => (
          <li
            key={id}
            className="flex gap-3 text-sm leading-relaxed text-[var(--foreground)] sm:text-[0.9375rem]"
          >
            <span
              className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[var(--brand)]/30 bg-[var(--brand)]/90 text-[10px] font-bold text-white"
              aria-hidden
            >
              ✓
            </span>
            <span>{t(`dataBullet${id}`)}</span>
          </li>
        ))}
      </ul>
      <div
        className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dashed border-[var(--border)] bg-[var(--brand-tint)]/40 px-5 py-4 text-center dark:bg-white/[0.03]"
        aria-hidden
      >
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          Broker file → Portfolio engine → Market data APIs → Analytics & AI
        </p>
      </div>
      <p className="mt-8 text-center">
        <a
          href={`mailto:${PARTNERS_EMAIL}`}
          className="text-sm font-semibold text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] transition-colors hover:text-[var(--brand-hover)]"
        >
          {t("dataPartnerCta")}
        </a>
      </p>
    </MarketingSection>
  );
}
