import { AppStoreBadge } from "@/components/marketing/AppStoreBadge";

/**
 * Launch-aware primary CTA.
 * - Pre-launch (`NEXT_PUBLIC_APP_STORE_URL` unset): a waitlist button → #waitlist.
 * - Post-launch (env set): the App Store badge linking to the live listing.
 */
export function PrimaryCta({
  label,
  appStore,
  size = "lg",
}: {
  label: string;
  appStore: { small: string; large: string; aria: string };
  size?: "lg" | "md";
}) {
  const storeUrl = process.env.NEXT_PUBLIC_APP_STORE_URL?.trim();

  if (storeUrl) {
    return <AppStoreBadge smallLabel={appStore.small} largeLabel={appStore.large} ariaLabel={appStore.aria} />;
  }

  const pad = size === "lg" ? "h-12 px-6 text-[15px] sm:h-13" : "h-11 px-5 text-sm";
  return (
    <a
      href="#waitlist"
      className={`group inline-flex ${pad} items-center justify-center gap-2 rounded-full font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0`}
      style={{
        background: "linear-gradient(180deg,var(--brand-hover),var(--brand))",
        boxShadow: "0 10px 30px -10px rgba(10,132,255,0.6)",
      }}
    >
      {label}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

export function SecondaryCta({ label, href = "#tour" }: { label: string; href?: string }) {
  return (
    <a
      href={href}
      className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/[0.03] px-6 text-[15px] font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--brand)]/50 hover:text-white sm:h-13"
    >
      {label}
    </a>
  );
}
