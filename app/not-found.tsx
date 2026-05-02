import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-lg font-semibold text-[var(--heading)]">404</p>
      <p className="max-w-sm text-sm text-[var(--muted)]">
        This page does not exist. Use the header language switcher (EN / PL)
        if you need another language - the URL stays the same.
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
