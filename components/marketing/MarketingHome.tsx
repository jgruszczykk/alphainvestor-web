import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/marketing/JsonLd";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { Hero } from "@/components/marketing/Hero";
import { AiHighlights } from "@/components/marketing/AiHighlights";
import { FeatureGrid } from "@/components/marketing/FeatureGrid";
import { PricingBand } from "@/components/marketing/PricingBand";
import { StepTimeline } from "@/components/marketing/StepTimeline";
import { RoadmapBand } from "@/components/marketing/RoadmapBand";
import { CtaBand } from "@/components/marketing/CtaBand";
import { SiteFooter } from "@/components/marketing/SiteFooter";

type Props = { locale: string };

export async function MarketingHome({ locale }: Props) {
  const t = await getTranslations("Home");

  return (
    <div className="relative flex min-h-full flex-1 flex-col">
      <JsonLd locale={locale} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--brand)] focus:px-3 focus:py-2 focus:text-white"
      >
        {t("skipToContent")}
      </a>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 min-h-[min(78vh,640px)]"
        aria-hidden
        style={{ background: "var(--hero-backdrop)" }}
      />

      <SiteHeader />

      <main
        id="main"
        className="relative z-10 flex flex-1 flex-col px-4 pb-24 pt-0 sm:px-6"
      >
        <Hero />
        <StepTimeline />
        <AiHighlights />
        <FeatureGrid />
        <PricingBand />

        <section
          id="faq"
          className="anim-fade-rise mx-auto mt-20 w-full max-w-6xl scroll-mt-24 lg:mt-28"
          style={{ animationDelay: "680ms" }}
        >
          <h2 className="text-center text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
            {t("faqTitle")}
          </h2>
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </section>

        <RoadmapBand />
        <CtaBand />
      </main>

      <SiteFooter />
    </div>
  );
}
