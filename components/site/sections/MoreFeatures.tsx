import type { getSiteContent } from "@/content/site";
import { Reveal, SectionHeading } from "./shared";

type Content = ReturnType<typeof getSiteContent>;

/** Apple-style dense "and there's more" grid — the long tail of smaller
 * features that don't earn a full flagship section but still add up to a
 * much more complete product than the flagship sections alone suggest. */
export function MoreFeatures({ more }: { more: Content["more"] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
      <SectionHeading eyebrow={more.eyebrow} title={more.title} />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
        {more.items.map((item, i) => (
          <Reveal key={item.title} delay={(i % 6) * 0.05}>
            <div className="glass h-full rounded-2xl p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-[var(--heading)]">{item.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
