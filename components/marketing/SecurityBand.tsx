import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const BULLET_IDS = [1, 2, 3] as const;

export async function SecurityBand() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="security" className="mt-20 lg:mt-24" animationDelay="580ms">
      <MarketingSectionHeader title={t("securityTitle")} intro={t("securityIntro")} />
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
            <span>{t(`securityBullet${id}`)}</span>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-[var(--muted)]">
        {t("securityAppNote")}
      </p>
      <p className="mt-6 text-center">
        <Link
          href="/privacy"
          className="text-sm font-semibold text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] transition-colors hover:text-[var(--brand-hover)]"
        >
          {t("securityPrivacyCta")}
        </Link>
      </p>
    </MarketingSection>
  );
}
