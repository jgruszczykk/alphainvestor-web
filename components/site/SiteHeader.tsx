"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Link } from "@/i18n/navigation";

type NavCopy = {
  features: string;
  tour: string;
  lenses: string;
  pricing: string;
  faq: string;
  cta: string;
  menu: string;
};

const LINKS: { id: keyof NavCopy; href: string }[] = [
  { id: "tour", href: "#tour" },
  { id: "features", href: "#features" },
  { id: "lenses", href: "#lenses" },
  { id: "pricing", href: "#pricing" },
  { id: "faq", href: "#faq" },
];

export function SiteHeader({ nav }: { nav: NavCopy }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`anim-header-in fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Alpha Investor">
          <span className="relative block h-8 w-32 sm:h-9 sm:w-40">
            <Image src="/brand/wordmark-dark-mode.png" alt="Alpha Investor" fill priority sizes="160px" className="object-contain object-left" />
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--muted)] lg:flex">
          {LINKS.map((l) => (
            <a key={l.id} href={l.href} className="transition-colors duration-200 hover:text-white">
              {nav[l.id]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href="#waitlist"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 md:inline-flex"
            style={{ background: "linear-gradient(180deg,var(--brand-hover),var(--brand))", boxShadow: "0 8px 22px -10px rgba(10,132,255,0.6)" }}
          >
            {nav.cta}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={nav.menu}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--foreground)] hover:bg-white/5"
              >
                {nav[l.id]}
              </a>
            ))}
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-lg px-3 py-2.5 text-center text-sm font-semibold text-white"
              style={{ background: "linear-gradient(180deg,var(--brand-hover),var(--brand))" }}
            >
              {nav.cta}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
