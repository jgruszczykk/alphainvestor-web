import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  MarketingCard,
  MarketingSection,
  MarketingSectionHeader,
} from "@/components/marketing/MarketingSection";

const TRUST_BLOCKS = [
  { titleKey: "trustSecurityTitle", bodyKey: "trustSecurityBody" },
  { titleKey: "trustPrivacyTitle", bodyKey: "trustPrivacyBody" },
  { titleKey: "trustProcessingTitle", bodyKey: "trustProcessingBody" },
] as const;

export async function TrustLayer() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="trust" className="mt-12 sm:mt-16">
      <MarketingSectionHeader title={t("trustTitle")} intro={t("trustIntro")} />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {TRUST_BLOCKS.map(({ titleKey, bodyKey }) => (
          <MarketingCard key={titleKey}>
            <h3 className="text-sm font-semibold text-[var(--heading)]">{t(titleKey)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t(bodyKey)}</p>
          </MarketingCard>
        ))}
      </div>
      <p className="mt-6 text-center">
        <Link
          href="/privacy"
          className="text-sm font-semibold text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px]"
        >
          {t("trustPrivacyCta")}
        </Link>
      </p>
    </MarketingSection>
  );
}
