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
  { titleKey: "trustInfrastructureTitle", bodyKey: "trustInfrastructureBody" },
  { titleKey: "trustComplianceTitle", bodyKey: "trustComplianceBody" },
] as const;

export async function TrustLayer() {
  const t = await getTranslations("Home");

  return (
    <MarketingSection id="trust" className="mt-20 lg:mt-24" animationDelay="0ms">
      <MarketingSectionHeader title={t("trustTitle")} intro={t("trustIntro")} />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {TRUST_BLOCKS.map(({ titleKey, bodyKey }) => (
          <MarketingCard key={titleKey}>
            <h3 className="text-sm font-semibold text-[var(--heading)]">{t(titleKey)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{t(bodyKey)}</p>
          </MarketingCard>
        ))}
      </div>
      <p className="mt-8 text-center">
        <Link
          href="/privacy"
          className="text-sm font-semibold text-[var(--brand)] underline decoration-[var(--brand)]/30 underline-offset-[3px] transition-colors hover:text-[var(--brand-hover)]"
        >
          {t("trustPrivacyCta")}
        </Link>
      </p>
    </MarketingSection>
  );
}
