import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const BULLET_IDS = [1, 2, 3, 4, 5] as const;

export async function BuiltForScale() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="scale" className="mt-20 lg:mt-24" animationDelay="0ms">
      <div className="rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,var(--brand-tint)_0%,transparent_55%)] px-6 py-10 sm:px-10 dark:bg-white/[0.02]">
        <MarketingSectionHeader title={t("scaleTitle")} intro={t("scaleIntro")} />
        <ul className="mx-auto mt-10 max-w-2xl space-y-3">
          {BULLET_IDS.map((id) => (
            <li
              key={id}
              className="text-sm font-medium leading-relaxed text-[var(--heading)] sm:text-base"
            >
              {t(`scaleBullet${id}`)}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/partners"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--brand)] px-7 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-colors hover:bg-[var(--brand-hover)]"
          >
            {t("scaleCta")}
          </Link>
          <a
            href="#waitlist"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-[var(--border)] px-7 text-sm font-semibold text-[var(--heading)] transition-colors hover:bg-[var(--pill-bg)]"
          >
            {t("scaleCtaSecondary")}
          </a>
        </div>
      </div>
    </MarketingSection>
  );
}
