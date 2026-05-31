import { getTranslations } from "next-intl/server";
import {
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const BULLET_IDS = [1, 2, 3, 4] as const;

export async function BuiltForScale() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="scale" className="mt-20 lg:mt-24" animationDelay="620ms">
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
        <div className="mt-8 text-center">
          <a
            href="#waitlist"
            className="text-sm font-semibold text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] transition-colors hover:text-[var(--brand-hover)]"
          >
            {t("scaleCta")}
          </a>
        </div>
      </div>
    </MarketingSection>
  );
}
