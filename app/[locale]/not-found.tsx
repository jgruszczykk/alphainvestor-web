import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";

/**
 * Locale-aware 404 page. Lives under `[locale]/` so it can use translated
 * copy via `getTranslations()`. The root `app/not-found.tsx` is kept as a
 * minimal English fallback for cases where the locale segment never matches
 * (e.g. proxy didn't run on a static asset).
 */
export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-5 px-4 py-20 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          {t("code")}
        </p>
        <h1 className="text-balance text-3xl font-semibold leading-tight text-[var(--heading)] sm:text-4xl">
          {t("title")}
        </h1>
        <p className="max-w-md text-balance text-[var(--foreground)]">{t("body")}</p>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--brand)] px-6 text-base font-semibold text-white shadow-[var(--shadow-elevated)] transition-colors duration-200 hover:bg-[var(--brand-hover)]"
        >
          {t("homeCta")}
        </Link>
        <p className="mt-2 max-w-sm text-xs text-[var(--muted)]">{t("languageHint")}</p>
      </main>
      <SiteFooter />
    </div>
  );
}
