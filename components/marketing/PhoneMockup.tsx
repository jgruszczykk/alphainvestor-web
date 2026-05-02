import Image, { type StaticImageData } from "next/image";

type Props = {
  src: string | StaticImageData;
  alt: string;
  /** Optional decorative handset behind (tilt, lighter). */
  ghost?: boolean;
  /** Merged onto the root wrapper (e.g. larger max-width for the hero). */
  wrapperClassName?: string;
};

/**
 * Marketing handset frame: bezel + inner screen clip. Image should already be
 * cropped to a vertical “hero” region of the app.
 */
export function PhoneMockup({
  src,
  alt,
  ghost = true,
  wrapperClassName = "",
}: Props) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[min(240px,78vw)] ${wrapperClassName}`.trim()}
    >
      {ghost ? (
        <div
          className="pointer-events-none absolute -right-1 top-2 z-0 w-[78%] origin-bottom-right rotate-[8deg] opacity-[0.38] contrast-125 saturate-75 dark:opacity-30"
          aria-hidden
        >
          <div className="rounded-[1.65rem] border border-[var(--border)] bg-[#0c0c0c] p-[8px] shadow-md shadow-black/25">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[1.25rem] bg-black">
              <div className="absolute inset-[7px] overflow-hidden rounded-[1.05rem]">
                <Image
                  src={src}
                  alt=""
                  fill
                  quality={90}
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 32vw, 320px"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-[88%]">
        <div className="rounded-[2.1rem] border border-[var(--border)] bg-gradient-to-b from-[#2a2a2c] to-[#0a0a0a] p-[11px] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.35)] dark:shadow-[0_22px_60px_-14px_rgba(0,0,0,0.65)]">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[1.55rem] bg-black ring-1 ring-white/[0.06]">
            <div className="absolute inset-[9px] overflow-hidden rounded-[1.2rem]">
              <Image
                src={src}
                alt={alt}
                fill
                quality={90}
                className="object-cover object-top"
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 40vw, 360px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
