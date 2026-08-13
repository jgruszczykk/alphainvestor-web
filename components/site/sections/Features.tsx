import type { ReactNode } from "react";
import type { getSiteContent } from "@/content/site";
import { Reveal, SectionHeading } from "./shared";

type Content = ReturnType<typeof getSiteContent>;

const ICONS: ReactNode[] = [
  <path key="a" d="M4 5h7v14H4zM13 5h7v9h-7z" fill="none" stroke="currentColor" strokeWidth="1.6" />,
  <><rect key="b1" x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" /><path key="b2" d="M8 12l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></>,
  <><circle key="c1" cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" /><path key="c2" d="M12 4a8 8 0 0 1 7 4l-7 4z" fill="currentColor" opacity="0.5" /></>,
  <path key="d" d="M4 16l4-5 4 3 4-7 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  <><circle key="e1" cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" /><path key="e2" d="m20 20-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></>,
  <><rect key="f1" x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" /><path key="f2" d="M7 9h7M7 12h10M7 15h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>,
  <><rect key="g1" x="4" y="4" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><rect key="g2" x="13" y="4" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" /><rect key="g3" x="4" y="13" width="7" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" /></>,
  <path key="h" d="M5 8h14M5 12h14M5 16h9M17.5 15l1.5 1.5L22 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
];

// Bento span pattern (lg): a couple of wide cards for rhythm.
const SPAN = ["lg:col-span-2", "", "", "lg:col-span-2", "lg:col-span-2", "", "", "lg:col-span-2"];

export function Features({ features }: { features: Content["features"] }) {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading eyebrow={features.eyebrow} title={features.title} sub={features.sub} />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.cards.map((card, i) => (
          <Reveal key={card.title} delay={(i % 4) * 0.06} className={SPAN[i]}>
            <div className="glass group h-full rounded-2xl p-5 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--brand)_45%,transparent)]">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--brand-soft)] transition-colors group-hover:text-white"
                style={{ background: "color-mix(in srgb, var(--brand) 14%, transparent)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>{ICONS[i]}</svg>
              </div>
              <h3 className="mt-4 text-base font-semibold text-[var(--heading)]">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{card.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
