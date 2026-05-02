"use client";

import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";

type Props = {
  children: ReactNode;
};

export function HeaderLogoLink({ children }: Props) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2 transition-opacity duration-200 hover:opacity-90"
      scroll
      onClick={(e) => {
        if (!isHome) return;
        e.preventDefault();
        const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" });
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }}
    >
      {children}
    </Link>
  );
}
