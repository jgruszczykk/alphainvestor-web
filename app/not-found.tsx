import Link from "next/link";

/**
 * Global, locale-agnostic 404 fallback.
 *
 * Most 404s are served by `app/[locale]/not-found.tsx` (translated, with
 * site chrome). This file only catches edge cases where the proxy didn't
 * resolve a locale (e.g. a request for a missing static asset), so we keep
 * it minimal and English-only — adding `getTranslations()` here would
 * require a locale, which by definition we don't have.
 */
export default function GlobalNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">404</p>
      <p className="text-lg font-semibold text-[var(--heading)]">Page not found</p>
      <p className="max-w-sm text-sm text-[var(--muted)]">
        This page does not exist.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white shadow-[var(--shadow-elevated)] transition-colors duration-200 hover:bg-[var(--brand-hover)]"
      >
        Home
      </Link>
    </div>
  );
}
