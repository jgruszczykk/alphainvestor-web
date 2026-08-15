import { JsonLd } from "@/components/marketing/JsonLd";
import { Aurora } from "@/components/site/Aurora";
import { Hero } from "@/components/site/Hero";
import {
  AlphaScoreScreen,
  NewsScreen,
  OptimizerScreen,
  ScannerScreen,
  WatchlistScreen,
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
import { VideoSection } from "@/components/site/sections/VideoSection";
import { getSiteContent } from "@/content/site";

const DEMO_VIDEO_SOURCES = [{ src: "/media/alphainvestor-ad-15s.mp4", type: "video/mp4" }];

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
        <VideoSection video={c.video} sources={DEMO_VIDEO_SOURCES} poster="/media/demo-poster.jpg" />

        {/* Free-tier deep dives */}
        <FeatureShowcase
          eyebrow={s.optimizer.eyebrow}
          title={s.optimizer.title}
          body={s.optimizer.body}
          bullets={s.optimizer.bullets}
          screen={<OptimizerScreen />}
        />
        <FeatureShowcase
          eyebrow={s.watchlist.eyebrow}
          title={s.watchlist.title}
          body={s.watchlist.body}
          stat={s.watchlist.stat}
          statLabel={s.watchlist.statLabel}
          reverse
          screen={<WatchlistScreen />}
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
