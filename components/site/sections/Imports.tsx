import type { getSiteContent } from "@/content/site";
import { Reveal, SectionHeading } from "./shared";

type Content = ReturnType<typeof getSiteContent>;

export function Imports({ imports }: { imports: Content["imports"] }) {
  const brokers = [...imports.brokers, ...imports.brokers];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading eyebrow={imports.eyebrow} title={imports.title} sub={imports.sub} />

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {imports.steps.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.1}>
            <div className="glass relative h-full rounded-2xl p-6">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{ background: "linear-gradient(180deg,var(--brand-hover),var(--brand))" }}
              >
                {i + 1}
              </div>
              {i < imports.steps.length - 1 && (
                <div className="pointer-events-none absolute right-0 top-11 hidden h-px w-8 translate-x-full bg-[var(--border-strong)] md:block" />
              )}
              <h3 className="mt-4 text-base font-semibold text-[var(--heading)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Broker marquee */}
      <Reveal delay={0.15}>
        <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="anim-marquee flex w-max gap-3">
            {brokers.map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="whitespace-nowrap rounded-full border border-[var(--border)] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-[var(--foreground)]"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
