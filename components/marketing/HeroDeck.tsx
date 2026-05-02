import Image from "next/image";

type DeckProps = {
  walletAlt: string;
  chartAlt: string;
  frontAlt: string;
};

const SRC = {
  chart: "/marketing/screens/instrument-chart.jpeg",
  wallet: "/marketing/screens/wallet-overview.jpeg",
  lenses: "/marketing/screens/five-lenses.jpeg",
} as const;

function PhoneFace({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div
      className={[
        "relative mx-auto aspect-[532/1024] w-auto overflow-hidden rounded-2xl border border-[var(--border)] bg-black",
        "shadow-[0_22px_52px_-12px_rgba(0,0,0,0.52)]",
        "ring-1 ring-black/15 dark:ring-white/[0.08]",
        "h-[clamp(168px,min(38vmin,40dvh),300px)]",
        "sm:h-[clamp(188px,min(42vmin,44dvh),360px)]",
        "lg:h-[clamp(220px,min(46vmin,52dvh),520px)] lg:rounded-3xl",
      ].join(" ")}
    >
      <div className="absolute inset-y-0 -left-1 -right-1 z-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          sizes="(max-width: 640px) 32vw, (max-width: 1023px) 28vw, min(36vw, 440px)"
          className="object-cover object-top"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-1 h-[12%] bg-linear-to-b from-black via-black/60 to-transparent lg:h-[11%]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-[12%] bg-linear-to-t from-black via-black/60 to-transparent lg:h-[11%]"
      />
    </div>
  );
}

/**
 * Three screenshots: chart (back) · wallet (front) · lenses (mid).
 * Height uses clamp + vmin + dvh so the deck scales smoothly; width follows 532×1024 aspect.
 */
export function HeroDeck({ walletAlt, chartAlt, frontAlt }: DeckProps) {
  return (
    <div className="relative isolate mx-auto w-full max-w-none select-none">
      <div className="mx-auto flex w-full max-w-6xl items-end justify-center gap-0">
        <div className="z-10 shrink-0 origin-bottom -rotate-[5deg]">
          <PhoneFace src={SRC.chart} alt={chartAlt} />
        </div>

        <div className="z-30 -mx-10 shrink-0 -translate-y-[2px] sm:-mx-12 lg:-mx-14">
          <PhoneFace src={SRC.wallet} alt={walletAlt} priority />
        </div>

        <div className="z-20 shrink-0 origin-bottom rotate-[5deg]">
          <PhoneFace src={SRC.lenses} alt={frontAlt} />
        </div>
      </div>
    </div>
  );
}
