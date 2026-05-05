"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const GALLERY = [
  {
    src: "/marketing/screens/wallet-allocation.png",
    titleKey: "galleryWalletAllocationTitle" as const,
    kickerKey: "galleryWalletAllocationKicker" as const,
    tintClass: "[--card-tint:rgba(45,212,191,0.075)] [--glow-tint:rgba(45,212,191,0.18)]",
  },
  {
    src: "/marketing/screens/five-lenses.png",
    titleKey: "galleryFiveLensesTitle" as const,
    kickerKey: "galleryFiveLensesKicker" as const,
    tintClass: "[--card-tint:rgba(167,139,250,0.075)] [--glow-tint:rgba(167,139,250,0.18)]",
  },
  {
    src: "/marketing/screens/instrument-chart.png",
    titleKey: "galleryChartTitle" as const,
    kickerKey: "galleryChartKicker" as const,
    tintClass: "[--card-tint:rgba(59,130,246,0.08)] [--glow-tint:rgba(59,130,246,0.19)]",
  },
  {
    src: "/marketing/screens/fundamentals.png",
    titleKey: "galleryFundamentalsTitle" as const,
    kickerKey: "galleryFundamentalsKicker" as const,
    tintClass: "[--card-tint:rgba(148,163,184,0.07)] [--glow-tint:rgba(148,163,184,0.16)]",
  },
  {
    src: "/marketing/screens/portfolio-optimizer.png",
    titleKey: "galleryOptimizerTitle" as const,
    kickerKey: "galleryOptimizerKicker" as const,
    tintClass: "[--card-tint:rgba(45,212,191,0.08)] [--glow-tint:rgba(45,212,191,0.18)]",
  },
  {
    src: "/marketing/screens/wallet-value.png",
    titleKey: "galleryWalletValueTitle" as const,
    kickerKey: "galleryWalletValueKicker" as const,
    tintClass: "[--card-tint:rgba(125,211,252,0.08)] [--glow-tint:rgba(125,211,252,0.18)]",
  },
  {
    src: "/marketing/screens/portfolio-insight.png",
    titleKey: "galleryPortfolioInsightTitle" as const,
    kickerKey: "galleryPortfolioInsightKicker" as const,
    tintClass: "[--card-tint:rgba(96,165,250,0.085)] [--glow-tint:rgba(96,165,250,0.2)]",
  },
  {
    src: "/marketing/screens/news.png",
    titleKey: "galleryNewsTitle" as const,
    kickerKey: "galleryNewsKicker" as const,
    tintClass: "[--card-tint:rgba(96,165,250,0.07)] [--glow-tint:rgba(96,165,250,0.17)]",
  },
] as const;

function PhoneFrame({
  src,
  alt,
  tintClass,
}: {
  src: string;
  alt: string;
  tintClass: string;
}) {
  return (
    <div className={["relative mx-auto w-full max-w-[190px] sm:max-w-[250px]", tintClass].join(" ")}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-8%] -z-10 rounded-4xl bg-[radial-gradient(circle_at_50%_42%,var(--glow-tint)_0%,transparent_70%)] opacity-50 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-[1.65rem] border border-white/20 bg-[#030712] shadow-[0_16px_30px_-22px_rgba(2,6,23,0.7)] ring-1 ring-white/12">
        <div className="relative aspect-[1179/2556] w-full">
          <Image
            src={src}
            alt={alt}
            fill
            quality={90}
            sizes="(max-width: 640px) 210px, 250px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

export function ScreenshotShowcase() {
  const t = useTranslations("Home");
  const firstCardRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef<number | null>(null);
  const lastStepTsRef = useRef(0);
  const [stride, setStride] = useState(380);
  const [index, setIndex] = useState(0);
  const [maxStepIndex, setMaxStepIndex] = useState(GALLERY.length - 1);
  const canPrev = index > 0;
  const canNext = index < maxStepIndex;

  useLayoutEffect(() => {
    const updateMaxStepIndex = () => {
      // Desktop: keep at least 3 cards visible at the end.
      const isDesktop = window.innerWidth >= 1024;
      const nextMax = isDesktop
        ? Math.max(0, GALLERY.length - 3)
        : GALLERY.length - 1;
      setMaxStepIndex(nextMax);
      setIndex((prev) => Math.min(prev, nextMax));
    };

    updateMaxStepIndex();
    window.addEventListener("resize", updateMaxStepIndex);
    return () => window.removeEventListener("resize", updateMaxStepIndex);
  }, []);

  useLayoutEffect(() => {
    const updateStride = () => {
      const card = firstCardRef.current;
      const track = trackRef.current;
      if (!card || !track) return;
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "16") || 16;
      setStride(card.getBoundingClientRect().width + gap);
    };

    updateStride();
    window.addEventListener("resize", updateStride);
    return () => window.removeEventListener("resize", updateStride);
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setIndex((prev) => Math.max(0, Math.min(maxStepIndex, prev + direction)));
    },
    [maxStepIndex],
  );

  const stepWithThrottle = useCallback(
    (direction: 1 | -1) => {
      const now = Date.now();
      if (now - lastStepTsRef.current < 320) return;
      lastStepTsRef.current = now;
      step(direction);
    },
    [step],
  );

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (event: WheelEvent) => {
      // Match Apple-style rails: only horizontal wheel/trackpad motion controls cards.
      if (Math.abs(event.deltaX) < 6) return;
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      stepWithThrottle(event.deltaX > 0 ? 1 : -1);
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [stepWithThrottle]);

  return (
    <section
      id="features"
      className="anim-fade-rise mt-10 w-full overflow-x-hidden scroll-mt-24 sm:mt-14"
      style={{ animationDelay: "300ms" }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-[var(--heading)] sm:text-4xl sm:leading-[1.12]">
            {t("screensTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            {t("screensIntro")}
          </p>
        </header>

        <div className="mt-10 sm:mt-12">
          <div className="mr-[calc(50%-50vw)] overflow-visible">
            <div
              ref={viewportRef}
              className="overflow-visible pb-4 pt-1 touch-pan-y select-none"
              onPointerDown={(event) => {
                dragStartXRef.current = event.clientX;
              }}
              onPointerUp={(event) => {
                if (dragStartXRef.current == null) return;
                const deltaX = event.clientX - dragStartXRef.current;
                dragStartXRef.current = null;
                if (Math.abs(deltaX) < 30) return;
                if (deltaX < 0) step(1);
                else step(-1);
              }}
              onPointerCancel={() => {
                dragStartXRef.current = null;
              }}
            >
              <div
                ref={trackRef}
                className="relative z-10 flex gap-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:gap-5"
                style={{ transform: `translateX(-${index * stride}px)` }}
              >
              {GALLERY.map((item, index) => {
                const title = t(item.titleKey);
                const kicker = t(item.kickerKey);
                const alt = title;

                return (
                  <article
                    key={item.src}
                    ref={index === 0 ? firstCardRef : undefined}
                    className={[
                      "anim-fade-rise w-[68vw] max-w-[272px] shrink-0 overflow-hidden rounded-3xl border border-white/12 p-4 text-white shadow-[0_8px_20px_-16px_rgba(2,6,23,0.55)]",
                      "bg-[linear-gradient(180deg,var(--card-tint)_0%,rgba(255,255,255,0.02)_44%,rgba(255,255,255,0.012)_100%)]",
                      "sm:w-[340px] sm:max-w-none sm:p-6 lg:w-[360px]",
                      item.tintClass,
                    ].join(" ")}
                    style={{ animationDelay: `${index * 70}ms` }}
                  >
                    <p className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-white/58">
                      {kicker}
                    </p>
                    <h3 className="mt-2 text-balance text-[1.25rem] font-semibold leading-[1.12] tracking-[-0.02em] text-white/96 sm:text-[1.5rem] sm:leading-[1.1]">
                      {title}
                    </h3>
                    <div className="mt-4 flex justify-center">
                      <PhoneFrame src={item.src} alt={alt} tintClass={item.tintClass} />
                    </div>
                  </article>
                );
              })}
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              aria-label="Previous screenshots"
              onClick={() => step(-1)}
              disabled={!canPrev}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-all duration-200 enabled:hover:border-white/25 enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next screenshots"
              onClick={() => step(1)}
              disabled={!canNext}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-all duration-200 enabled:hover:border-white/25 enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
