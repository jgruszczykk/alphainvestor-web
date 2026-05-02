import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { EarlyAccessForm } from "@/components/EarlyAccessForm";

export async function CtaBand() {
  const t = await getTranslations("Home");

  return (
    <section
      id="waitlist"
      className="anim-fade-rise mx-auto mt-20 flex w-full max-w-6xl scroll-mt-28 flex-col items-center gap-6 rounded-2xl border border-[var(--border)] bg-transparent px-5 py-10 sm:gap-8 sm:px-10 sm:py-12 lg:mt-28 dark:bg-white/[0.025]"
      style={{ animationDelay: "840ms" }}
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold leading-snug tracking-[-0.02em] text-[var(--heading)] sm:text-3xl">
          {t("ctaTitle")}
        </h2>
        <p className="mt-2 max-w-lg text-sm text-[var(--muted)] sm:text-base">
          {t("ctaSub")}
        </p>
      </div>
      <EarlyAccessForm variant="embedded" />
      <p className="max-w-md text-center text-xs text-[var(--muted)]">
        {t("formConsent")}{" "}
        <Link
          href="/privacy"
          className="font-medium text-[var(--foreground)] underline decoration-[var(--underline)] underline-offset-[3px] transition-colors duration-200 hover:text-[var(--brand)] hover:decoration-[var(--brand)]/35"
        >
          {t("formConsentLink")}
        </Link>
        .
      </p>
    </section>
  );
}
