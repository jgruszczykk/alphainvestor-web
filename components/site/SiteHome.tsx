import { JsonLd } from "@/components/marketing/JsonLd";
import { Aurora } from "@/components/site/Aurora";
import { Hero } from "@/components/site/Hero";
import {
  AlphaScoreScreen,
  CompareScreen,
  NewsScreen,
  OptimizerScreen,
  ScannerScreen,
} from "@/components/site/phone/moreScreens";
import { TechnicalLensesScreen } from "@/components/site/phone/screens";
import { ProductTour } from "@/components/site/ProductTour";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { AlphaPro } from "@/components/site/sections/AlphaPro";
import { Faq } from "@/components/site/sections/Faq";
import { FeatureShowcase } from "@/components/site/sections/FeatureShowcase";
import { Features } from "@/components/site/sections/Features";
import { FinalCta } from "@/components/site/sections/FinalCta";
import { Imports } from "@/components/site/sections/Imports";
import { MoreFeatures } from "@/components/site/sections/MoreFeatures";
import { Pricing } from "@/components/site/sections/Pricing";
import { getSiteContent } from "@/content/site";

// VideoSection is deliberately not wired in: the rendered demo video
// (public/media/demo.mp4) predates the AppCard/font-size/layout fidelity
// fixes and its copy claims "real screen capture" when it's actually a
// Remotion recreation — both need to be true before this comes back.

export function SiteHome({ locale }: { locale: string }) {
  const c = getSiteContent(locale);
  const s = c.showcase;

  return (
    <div className="relative flex min-h-full flex-col">
      <JsonLd locale={locale} />
      <Aurora />
      <SiteHeader nav={c.nav} />

      <main id="main">
        <Hero hero={c.hero} trust={c.trust} appStore={c.appStore} />
        <ProductTour tour={c.tour} />
        <Features features={c.features} />

        {/* Free-tier deep dives */}
        <FeatureShowcase
          eyebrow={s.optimizer.eyebrow}
          title={s.optimizer.title}
          body={s.optimizer.body}
          bullets={s.optimizer.bullets}
          screen={<OptimizerScreen />}
        />
        <FeatureShowcase
          eyebrow={s.news.eyebrow}
          title={s.news.title}
          body={s.news.body}
          stat={s.news.stat}
          statLabel={s.news.statLabel}
          reverse
          screen={<NewsScreen />}
        />

        <Imports imports={c.imports} />

        {/* The Pro turn */}
        <AlphaPro ai={c.ai} lenses={c.lenses} />

        <FeatureShowcase
          eyebrow={s.scanner.eyebrow}
          eyebrowColor="var(--ai-soft)"
          title={s.scanner.title}
          body={s.scanner.body}
          stat={s.scanner.stat}
          statLabel={s.scanner.statLabel}
          screen={<ScannerScreen />}
        />
        <FeatureShowcase
          eyebrow={s.compare.eyebrow}
          eyebrowColor="var(--ai-soft)"
          title={s.compare.title}
          body={s.compare.body}
          stat={s.compare.stat}
          statLabel={s.compare.statLabel}
          reverse
          screen={<CompareScreen />}
        />
        <FeatureShowcase
          eyebrow={s.alphaScore.eyebrow}
          eyebrowColor="var(--ai-soft)"
          title={s.alphaScore.title}
          body={s.alphaScore.body}
          bullets={s.alphaScore.bullets}
          screen={<AlphaScoreScreen />}
        />
        <FeatureShowcase
          eyebrow={s.technicalLenses.eyebrow}
          eyebrowColor="var(--ai-soft)"
          title={s.technicalLenses.title}
          body={s.technicalLenses.body}
          bullets={s.technicalLenses.bullets}
          reverse
          screen={<TechnicalLensesScreen />}
        />

        <MoreFeatures more={c.more} />
        <Pricing pricing={c.pricing} appStore={c.appStore} />
        <Faq faq={c.faq} />
        <FinalCta finalCta={c.finalCta} />
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
