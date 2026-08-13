import type { getSiteContent } from "@/content/site";
import { Reveal, SectionHeading } from "./shared";

type Content = ReturnType<typeof getSiteContent>;

/**
 * Full-bleed product video (a designed animation rendered with Remotion — it
 * already contains its own phone scene + captions, so it is NOT nested in a
 * phone frame). Only mounted by SiteHome when the media file exists on disk.
 */
export function VideoSection({
  video,
  sources,
  poster,
}: {
  video: Content["video"];
  sources: { src: string; type: string }[];
  poster?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading eyebrow={video.eyebrow} title={video.title} sub={video.sub} />
      <Reveal delay={0.1} className="mt-12">
        <div className="relative mx-auto w-full max-w-[360px]">
          <div
            className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] opacity-70"
            style={{ background: "radial-gradient(60% 50% at 50% 30%, rgba(10,132,255,0.3), transparent 70%), radial-gradient(50% 40% at 60% 80%, rgba(191,90,242,0.24), transparent 70%)" }}
            aria-hidden
          />
          <div
            className="overflow-hidden rounded-[2rem] border border-[var(--border-strong)]"
            style={{ boxShadow: "0 40px 90px -30px rgba(0,0,0,0.85)" }}
          >
            <video
              className="block aspect-[9/16] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
            >
              {sources.map((s) => (
                <source key={s.src} src={s.src} type={s.type} />
              ))}
            </video>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
