import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { HeaderLogoLink } from "@/components/marketing/HeaderLogoLink";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className="anim-header-in sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/75 backdrop-blur-sm backdrop-saturate-100 dark:bg-[var(--surface)]/82">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2 sm:gap-4 sm:px-5 sm:py-2.5">
        <HeaderLogoLink>
          <span className="relative block h-9 w-36 shrink-0 sm:h-10 sm:w-44 md:h-11 md:w-52">
            <Image
              src="/brand/wordmark-dark-mode.png"
              alt="Alpha Investor"
              width={886}
              height={886}
              priority
              sizes="(max-width: 640px) 144px, (max-width: 768px) 176px, 208px"
              className="h-full w-full object-contain object-left"
            />
          </span>
        </HeaderLogoLink>

        <nav className="hidden items-center gap-6 text-sm font-medium text-[var(--muted)] md:flex">
          <a
            href="#ai"
            className="rounded-md transition-colors duration-200 hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            {t("ai")}
          </a>
          <a
            href="#features"
            className="rounded-md transition-colors duration-200 hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            {t("features")}
          </a>
          <a
            href="#pricing"
            className="rounded-md transition-colors duration-200 hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            {t("pricing")}
          </a>
          <a
            href="#how"
            className="rounded-md transition-colors duration-200 hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            {t("howItWorks")}
          </a>
          <a
            href="#faq"
            className="rounded-md transition-colors duration-200 hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            {t("faq")}
          </a>
          <Link
            href="/privacy"
            className="rounded-md transition-colors duration-200 hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            {t("privacy")}
          </Link>
          <Link
            href="/terms"
            className="rounded-md transition-colors duration-200 hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
          >
            {t("terms")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href="#waitlist"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-[var(--brand)] px-3 text-xs font-semibold text-white shadow-[var(--shadow-elevated)] transition-[transform,background-color,box-shadow] duration-200 hover:bg-[var(--brand-hover)] hover:shadow-md active:scale-[0.98] sm:px-4 sm:text-sm"
          >
            {t("joinWaitlist")}
          </a>
        </div>
      </div>
    </header>
  );
}
