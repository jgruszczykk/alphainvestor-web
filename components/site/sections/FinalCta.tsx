import { EarlyAccessForm } from "@/components/EarlyAccessForm";
import { AppStoreBadge } from "@/components/marketing/AppStoreBadge";
import { Link } from "@/i18n/navigation";
import type { getSiteContent } from "@/content/site";
import { Reveal } from "./shared";

type Content = ReturnType<typeof getSiteContent>;

export function FinalCta({ finalCta, appStore }: { finalCta: Content["finalCta"]; appStore: Content["appStore"] }) {
  // Post-launch the primary action is downloading the app; the email form
  // stays as a secondary "Android + updates" capture below it.
  const storeUrl = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim();
  return (
    <section id="waitlist" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--border-strong)] px-6 py-14 sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 -z-0"
            style={{ background: "radial-gradient(ellipse 70% 90% at 50% 0%, rgba(10,132,255,0.16), transparent 70%)" }}
            aria-hidden
          />
          <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-[var(--heading)] sm:text-3xl lg:text-4xl">
              {finalCta.title}
            </h2>
            <p className="mt-3 max-w-md text-base text-[var(--muted)]">{finalCta.sub}</p>

            {storeUrl ? (
              <div className="mt-8 flex justify-center">
                <AppStoreBadge smallLabel={appStore.small} largeLabel={appStore.large} ariaLabel={appStore.aria} />
              </div>
            ) : null}

            <div className="mt-8 w-full max-w-md">
              <EarlyAccessForm variant="embedded" />
            </div>

            <p className="mt-4 max-w-md text-xs text-[var(--faint)]">
              {finalCta.consent}{" "}
              <Link
                href="/privacy"
                className="font-medium text-[var(--foreground)] underline decoration-[var(--underline)] underline-offset-2 transition-colors hover:text-[var(--brand)]"
              >
                {finalCta.consentLink}
              </Link>
              .
            </p>
            <p className="mt-6 max-w-md text-xs leading-relaxed text-[var(--faint)]">{finalCta.disclaimer}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
