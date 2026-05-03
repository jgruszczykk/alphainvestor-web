"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";

export type MobileNavDrawerLabels = {
  toggle: string;
  ai: string;
  features: string;
  pricing: string;
  howItWorks: string;
  faq: string;
  privacy: string;
  terms: string;
  joinWaitlist: string;
};

const sectionAnchors = [
  { id: "ai", labelKey: "ai" as const },
  { id: "features", labelKey: "features" as const },
  { id: "pricing", labelKey: "pricing" as const },
  { id: "how", labelKey: "howItWorks" as const },
  { id: "faq", labelKey: "faq" as const },
];

/**
 * Mobile nav drawer: visible on screens < md, sealed by an overlay, focus-trapped
 * via the close button. Holds section anchors AND legal links so users on phones
 * can reach Privacy / Terms (previously hidden behind `md:flex`).
 */
export function MobileNavDrawer({ labels }: { labels: MobileNavDrawerLabels }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/" || pathname === "";
  const panelId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while open and focus the close button.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={labels.toggle}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--heading)] transition-colors hover:bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label={labels.toggle}
          className="fixed inset-0 z-40"
        >
          <button
            type="button"
            aria-label={labels.toggle}
            tabIndex={-1}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 mt-[56px] border-b border-[var(--border)] bg-[var(--surface)] shadow-xl">
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-base font-medium text-[var(--heading)]">
              {sectionAnchors.map((s) => (
                <a
                  key={s.id}
                  href={sectionHref(s.id)}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 transition-colors hover:bg-[var(--brand)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                >
                  {labels[s.labelKey]}
                </a>
              ))}
              <div className="my-2 border-t border-[var(--border)]" />
              <Link
                href="/privacy"
                className="rounded-md px-3 py-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
              >
                {labels.privacy}
              </Link>
              <Link
                href="/terms"
                className="rounded-md px-3 py-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
              >
                {labels.terms}
              </Link>
              <a
                href={onHome ? "#waitlist" : "/#waitlist"}
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-[var(--brand)] px-4 text-sm font-semibold text-white shadow-[var(--shadow-elevated)] transition-colors hover:bg-[var(--brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
              >
                {labels.joinWaitlist}
              </a>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setOpen(false)}
                className="sr-only"
              >
                {labels.toggle}
              </button>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
