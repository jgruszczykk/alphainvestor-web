import type { getSiteContent } from "@/content/site";
import { PrimaryCta } from "@/components/site/PrimaryCta";
import { Reveal, SectionHeading } from "./shared";

type Content = ReturnType<typeof getSiteContent>;

function Check({ ai = false }: { ai?: boolean }) {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{
        background: ai ? "color-mix(in srgb, var(--ai) 20%, transparent)" : "color-mix(in srgb, var(--brand) 18%, transparent)",
        color: ai ? "var(--ai-soft)" : "var(--brand-soft)",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

export function Pricing({ pricing, appStore }: { pricing: Content["pricing"]; appStore: Content["appStore"] }) {
  const { free, pro } = pricing;
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} sub={pricing.sub} />

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
        {/* Free */}
        <Reveal>
          <div className="glass flex h-full flex-col rounded-3xl p-7">
            <h3 className="text-lg font-semibold text-[var(--heading)]">{free.name}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-[var(--heading)]">{free.price}</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {free.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                  <Check /> {f}
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              className="mt-7 inline-flex h-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-white/[0.03] text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--brand)]/50 hover:text-white"
            >
              {free.cta}
            </a>
          </div>
        </Reveal>

        {/* Pro */}
        <Reveal delay={0.1}>
          <div
            className="glass-strong relative flex h-full flex-col overflow-hidden rounded-3xl p-7"
            style={{ borderColor: "color-mix(in srgb, var(--ai) 35%, transparent)" }}
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-50"
              style={{ background: "radial-gradient(circle, rgba(191,90,242,0.5), transparent 70%)", filter: "blur(30px)" }}
              aria-hidden
            />
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--heading)]">{pro.name}</h3>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: "color-mix(in srgb, var(--ai) 22%, transparent)", color: "var(--ai-soft)" }}
              >
                {pro.badge}
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-[var(--heading)]">{pro.price}</span>
              <span className="text-sm text-[var(--muted)]">{pro.period}</span>
            </div>
            <div className="mt-1 text-xs text-[var(--ai-soft)]">{pro.yearly}</div>
            <ul className="mt-6 flex-1 space-y-3">
              {pro.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                  <Check ai /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <PrimaryCta label={pro.cta} appStore={appStore} />
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <p className="mx-auto mt-8 max-w-md text-center text-xs text-[var(--faint)]">{pricing.footnote}</p>
      </Reveal>
    </section>
  );
}
