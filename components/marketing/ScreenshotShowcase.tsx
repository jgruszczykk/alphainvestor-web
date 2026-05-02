import { getTranslations } from "next-intl/server";

import { PhoneMockup } from "@/components/marketing/PhoneMockup";

const BULLET_IDS = [1, 2, 3] as const;

type ScreenDef = {
  src: string;
  titleKey:
    | "screenSpotlightCaption"
    | "screenWalletCaption"
    | "screenLensesCaption"
    | "screenInstrumentChartCaption"
    | "screenChartCaption";
  detailKey:
    | "screenSpotlightDetail"
    | "screenWalletDetail"
    | "screenLensesDetail"
    | "screenInstrumentChartDetail"
    | "screenChartDetail";
};

const ROW1: ScreenDef[] = [
  {
    src: "/marketing/screens/wallet-value.png",
    titleKey: "screenSpotlightCaption",
    detailKey: "screenSpotlightDetail",
  },
  {
    src: "/marketing/screens/wallet-overview.png",
    titleKey: "screenWalletCaption",
    detailKey: "screenWalletDetail",
  },
  {
    src: "/marketing/screens/five-lenses.png",
    titleKey: "screenLensesCaption",
    detailKey: "screenLensesDetail",
  },
];

const ROW2: ScreenDef[] = [
  {
    src: "/marketing/screens/instrument-chart.png",
    titleKey: "screenInstrumentChartCaption",
    detailKey: "screenInstrumentChartDetail",
  },
  {
    src: "/marketing/screens/instrument-insight.png",
    titleKey: "screenChartCaption",
    detailKey: "screenChartDetail",
  },
];

export async function ScreenshotShowcase() {
  const t = await getTranslations("Home");

  const cell = (item: ScreenDef, wrapClass: string) => {
    const title = t(item.titleKey);
    const detail = t(item.detailKey);
    return (
      <div
        key={item.src}
        className="flex flex-col items-center gap-5 text-center"
      >
        <PhoneMockup
          src={item.src}
          alt={`${title}: ${detail}`}
          ghost={false}
          wrapperClassName={wrapClass}
        />
        <div className="w-full max-w-[16.5rem] sm:max-w-[18rem]">
          <p className="text-sm font-semibold text-[var(--heading)]">
            {title}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
            {detail}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="screens"
      className="anim-fade-rise mx-auto mt-20 w-full max-w-6xl scroll-mt-24 lg:mt-24"
      style={{ animationDelay: "300ms" }}
    >
      <h2 className="text-center text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
        {t("screensTitle")}
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-[var(--muted)] sm:text-base">
        {t("screensIntro")}
      </p>
      <ul className="mx-auto mt-6 max-w-xl list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--foreground)] sm:pl-6">
        {BULLET_IDS.map((id) => (
          <li key={id}>{t(`screensBullet${id}`)}</li>
        ))}
      </ul>
      <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
        {t("screensReassure")}
      </p>

      <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
        {ROW1.slice(0, 2).map((item) =>
          cell(
            item,
            "w-full max-w-[min(252px,86vw)] sm:max-w-[min(240px,42vw)] lg:max-w-[min(248px,31vw)]",
          ),
        )}
        <div className="flex justify-center sm:col-span-2 lg:col-span-1 lg:block">
          {cell(
            ROW1[2],
            "w-full max-w-[min(252px,86vw)] sm:max-w-[min(240px,42vw)] lg:max-w-[min(248px,31vw)]",
          )}
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 lg:mt-16 lg:max-w-4xl lg:gap-x-14">
        {ROW2.map((item) =>
          cell(
            item,
            "w-full max-w-[min(288px,88vw)] sm:max-w-[min(300px,44vw)]",
          ),
        )}
      </div>
    </section>
  );
}
