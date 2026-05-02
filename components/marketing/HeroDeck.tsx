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
        "h-[252px] sm:h-[308px] lg:h-[372px] xl:h-[396px] lg:rounded-3xl",
      ].join(" ")}
    >
      <div className="absolute inset-y-0 -left-1 -right-1 z-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          sizes="(max-width: 640px) 170px, (max-width: 1023px) 220px, 260px"
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
 * Fixed pixel heights per breakpoint (width from 532×1024 aspect): compact
 * on small screens, larger from `lg` up for desktop.
 */
export function HeroDeck({ walletAlt, chartAlt, frontAlt }: DeckProps) {
  return (
    <div className="relative isolate mx-auto w-full max-w-none select-none px-2 sm:px-0">
      <div className="mx-auto flex w-full max-w-6xl items-end justify-center gap-0">
        <div className="z-10 shrink-0 origin-bottom -rotate-[5deg]">
          <PhoneFace src={SRC.chart} alt={chartAlt} />
        </div>

        <div className="z-30 -mx-6 shrink-0 -translate-y-[2px] sm:-mx-10 lg:-mx-12 xl:-mx-14">
          <PhoneFace src={SRC.wallet} alt={walletAlt} priority />
        </div>

        <div className="z-20 shrink-0 origin-bottom rotate-[5deg]">
          <PhoneFace src={SRC.lenses} alt={frontAlt} />
        </div>
      </div>
    </div>
  );
}
