"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { getSiteContent } from "@/content/site";
import { SectionHeading } from "./shared";

type Content = ReturnType<typeof getSiteContent>;

export function Faq({ faq }: { faq: Content["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />

      <div className="mt-10 space-y-3">
        {faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="glass overflow-hidden rounded-2xl">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-[var(--heading)] sm:text-base">{item.q}</span>
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--muted)] transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--muted)]">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
