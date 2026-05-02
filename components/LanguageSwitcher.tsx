"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-1 rounded-lg border border-[var(--border)] bg-transparent p-0.5 text-xs font-semibold dark:bg-white/[0.04]"
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        aria-pressed={locale === "en"}
        onClick={() => router.replace(pathname, { locale: "en" })}
        className={`rounded-md px-2 py-1 transition-[color,background-color,transform] duration-200 active:scale-95 ${
          locale === "en"
            ? "bg-[var(--brand)] text-white shadow-sm"
            : "text-[var(--muted)] hover:text-[var(--heading)]"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        aria-pressed={locale === "pl"}
        onClick={() => router.replace(pathname, { locale: "pl" })}
        className={`rounded-md px-2 py-1 transition-[color,background-color,transform] duration-200 active:scale-95 ${
          locale === "pl"
            ? "bg-[var(--brand)] text-white shadow-sm"
            : "text-[var(--muted)] hover:text-[var(--heading)]"
        }`}
      >
        PL
      </button>
    </div>
  );
}
