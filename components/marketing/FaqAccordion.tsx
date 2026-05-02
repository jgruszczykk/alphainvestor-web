"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";

const FAQ_IDS = [1, 2, 3, 4, 5, 6, 7] as const;

export function FaqAccordion() {
  const t = useTranslations("Home");
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div className="w-full divide-y divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-transparent dark:bg-white/[0.025]">
      {FAQ_IDS.map((i) => {
        const q = t(`faq${i}Q`);
        const a = t(`faq${i}A`);
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={i} className="px-4 py-1 sm:px-5">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-semibold text-[var(--heading)] transition-colors duration-200 hover:text-[var(--foreground)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {q}
              <span
                className={`inline-flex min-h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-md border border-[var(--border)] bg-transparent text-center text-xs font-semibold text-[var(--muted)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              {...(!isOpen ? { inert: true } : {})}
              className={`faq-accordion-panel grid overflow-hidden transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0">
                <p className="pb-4 pr-1 text-sm leading-relaxed text-[var(--muted)]">
                  {a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
