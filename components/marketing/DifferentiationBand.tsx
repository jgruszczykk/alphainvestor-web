import { getTranslations } from "next-intl/server";
import { MarketingSection } from "@/components/marketing/MarketingSection";

const POINT_KEYS = ["diffPoint1", "diffPoint2", "diffPoint3"] as const;

export async function DifferentiationBand() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="differentiation" className="mt-12 sm:mt-16">
      <h2 className="text-center text-2xl font-semibold tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
        {t("diffTitle")}
      </h2>
      <ul className="mx-auto mt-8 max-w-md space-y-4 text-center">
        {POINT_KEYS.map((key) => (
          <li key={key} className="text-base font-medium text-[var(--foreground)] sm:text-lg">
            {t(key)}
          </li>
        ))}
      </ul>
    </MarketingSection>
  );
}
