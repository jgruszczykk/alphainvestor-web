"use client";

import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";

const navClass =
  "rounded-md transition-colors duration-200 hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]";

const ctaClass =
  "inline-flex h-9 items-center justify-center rounded-lg bg-[var(--brand)] px-3 text-xs font-semibold text-white shadow-[var(--shadow-elevated)] transition-[transform,background-color,box-shadow] duration-200 hover:bg-[var(--brand-hover)] hover:shadow-md active:scale-[0.98] sm:px-4 sm:text-sm";

function useOnHome(): boolean {
  const pathname = usePathname();
  return pathname === "/" || pathname === "";
}

function SectionNavItem({ id, children }: { id: string; children: ReactNode }) {
  const onHome = useOnHome();
  if (onHome) {
    return (
      <a href={`#${id}`} className={navClass}>
        {children}
      </a>
    );
  }
  return (
    <Link href={`/#${id}`} className={navClass}>
      {children}
    </Link>
  );
}

export type HeaderMarketingSectionLabels = {
  features: string;
  pricing: string;
  howItWorks: string;
  faq: string;
};

/** In-page #… on home, /#… from other routes so anchors resolve on the marketing page. */
export function HeaderMarketingSectionLinks(labels: HeaderMarketingSectionLabels) {
  return (
    <>
      <SectionNavItem id="features">{labels.features}</SectionNavItem>
      <SectionNavItem id="pricing">{labels.pricing}</SectionNavItem>
      <SectionNavItem id="how">{labels.howItWorks}</SectionNavItem>
      <SectionNavItem id="faq">{labels.faq}</SectionNavItem>
    </>
  );
}

export function HeaderMarketingWaitlistCta({ children }: { children: ReactNode }) {
  const onHome = useOnHome();
  if (onHome) {
    return (
      <a href="#waitlist" className={ctaClass}>
        {children}
      </a>
    );
  }
  return (
    <Link href="/#waitlist" className={ctaClass}>
      {children}
    </Link>
  );
}
