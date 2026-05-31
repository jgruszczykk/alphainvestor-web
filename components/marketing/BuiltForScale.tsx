import { getTranslations } from "next-intl/server";
import {
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const BULLET_IDS = [1, 2, 3] as const;

export async function BuiltForScale() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="scale" className="mt-12 sm:mt-16">
      <div className="rounded-2xl border border-[var(--border)] bg-[linear-gradient(135deg,var(--brand-tint)_0%,transparent_55%)] px-6 py-8 sm:px-10 dark:bg-white/[0.02]">
        <MarketingSectionHeader title={t("scaleTitle")} intro={t("scaleIntro")} />
        <ul className="mx-auto mt-6 max-w-2xl space-y-2">
          {BULLET_IDS.map((id) => (
            <li
              key={id}
              className="text-sm font-medium leading-relaxed text-[var(--heading)] sm:text-base"
            >
              {t(`scaleBullet${id}`)}
            </li>
          ))}
        </ul>
      </div>
    </MarketingSection>
  );
}
