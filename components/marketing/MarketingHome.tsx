import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/marketing/JsonLd";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { Hero } from "@/components/marketing/Hero";
import { TrustBar } from "@/components/marketing/TrustBar";
import { ScreenshotShowcase } from "@/components/marketing/ScreenshotShowcase";
import { PlatformPillars } from "@/components/marketing/PlatformPillars";
import { IntelligenceEngine } from "@/components/marketing/IntelligenceEngine";
import { PortfolioImports } from "@/components/marketing/PortfolioImports";
import { DataInfrastructure } from "@/components/marketing/DataInfrastructure";
import { WhyNowBand } from "@/components/marketing/WhyNowBand";
import { TrustLayer } from "@/components/marketing/TrustLayer";
import { BuiltForScale } from "@/components/marketing/BuiltForScale";
import { WhyInvestorsBand } from "@/components/marketing/WhyInvestorsBand";
import { RoadmapBand } from "@/components/marketing/RoadmapBand";
import { PricingBand } from "@/components/marketing/PricingBand";
import { CtaBand } from "@/components/marketing/CtaBand";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { HomeHashScroll } from "@/components/marketing/HomeHashScroll";

type Props = { locale: string };

export async function MarketingHome({ locale }: Props) {
  const t = await getTranslations("Home");

  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <HomeHashScroll />
      <JsonLd locale={locale} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--brand)] focus:px-3 focus:py-2 focus:text-white"
      >
        {t("skipToContent")}
      </a>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 min-h-[min(70vh,560px)]"
        aria-hidden
        style={{ background: "var(--hero-backdrop)" }}
      />

      <SiteHeader />

      <main id="main" className="relative z-10 flex flex-1 flex-col pb-24 pt-0">
        <div className="px-4 sm:px-6">
          <Hero />
          <TrustBar />
        </div>

        <ScreenshotShowcase />

        <div className="px-4 sm:px-6">
          <PlatformPillars />
          <IntelligenceEngine />
          <PortfolioImports />
          <DataInfrastructure />
          <WhyNowBand />
          <TrustLayer />
          <BuiltForScale />
          <WhyInvestorsBand />
          <RoadmapBand />
          <PricingBand />

          <section
            id="faq"
            className="mx-auto mt-10 w-full max-w-6xl scroll-mt-24 sm:mt-12"
          >
            <h2 className="text-center text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
              {t("faqTitle")}
            </h2>
            <div className="mt-6 sm:mt-8">
              <FaqAccordion />
            </div>
          </section>

          <CtaBand />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
