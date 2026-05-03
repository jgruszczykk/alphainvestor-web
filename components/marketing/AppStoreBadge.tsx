/**
 * App Store CTA badge.
 *
 * - When `NEXT_PUBLIC_APP_STORE_URL` is set we render the badge as a real
 *   `<a>` linking to the live App Store listing.
 * - When the env var is unset (pre-launch) we fall back to the in-page
 *   waitlist anchor so the badge is never a dead link.
 *
 * The visual is an inline SVG that imitates Apple's "Download on the App
 * Store" badge layout (Apple glyph + two-line label). When the marketing
 * team wants the *official* badge artwork, drop the PNG into
 * `public/brand/app-store-badge.png` and swap the SVG for an `<Image>`.
 * Per Apple's brand guidelines we MUST not modify the official badge —
 * this homemade one is intentionally distinct so we don't infringe.
 */
type Props = {
  smallLabel: string;
  largeLabel: string;
  ariaLabel: string;
  className?: string;
};

const FALLBACK_HREF = "#waitlist";

export function AppStoreBadge({ smallLabel, largeLabel, ariaLabel, className }: Props) {
  const href = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim() || FALLBACK_HREF;
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={[
        "group inline-flex h-12 items-center gap-3 rounded-xl bg-black px-4 text-white",
        "shadow-[var(--shadow-elevated)] transition-[transform,background-color] duration-200",
        "hover:bg-neutral-800 active:scale-[0.98]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
        "sm:h-13",
        className ?? "",
      ].join(" ")}
    >
      <svg
        width="22"
        height="26"
        viewBox="0 0 22 26"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M16.27 13.66c-.02-2.13 1.74-3.16 1.82-3.21-1-1.45-2.55-1.65-3.1-1.67-1.32-.13-2.58.78-3.25.78-.68 0-1.71-.76-2.81-.74-1.45.02-2.79.84-3.53 2.13-1.5 2.6-.38 6.43 1.08 8.54.71 1.03 1.55 2.18 2.66 2.14 1.07-.04 1.47-.69 2.76-.69 1.29 0 1.65.69 2.78.66 1.15-.02 1.87-1.04 2.57-2.07.81-1.19 1.14-2.34 1.16-2.4-.02-.01-2.22-.85-2.24-3.37zm-2.13-6.18c.59-.71.99-1.7.88-2.68-.85.03-1.88.57-2.49 1.27-.55.62-1.03 1.62-.9 2.6.95.07 1.92-.48 2.51-1.19z" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-medium uppercase tracking-wider text-white/85">
          {smallLabel}
        </span>
        <span className="mt-1 text-base font-semibold tracking-tight text-white">
          {largeLabel}
        </span>
      </span>
    </a>
  );
}
