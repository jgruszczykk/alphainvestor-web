import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getSiteContent } from "@/content/site";

export async function SiteFooter({ locale }: { locale: string }) {
  const c = getSiteContent(locale);
  const tNav = await getTranslations("Nav");
  const tFooter = await getTranslations("Footer");
  const year = new Date().getFullYear();

  const productLinks = [
    { label: c.nav.tour, href: "#tour" },
    { label: c.nav.features, href: "#features" },
    { label: c.nav.pricing, href: "#pricing" },
    { label: c.nav.faq, href: "#faq" },
  ];

  return (
    <footer className="relative mt-24 border-t border-[var(--border)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="col-span-2 md:col-span-2">
          <span className="relative block h-9 w-40">
            <Image src="/brand/wordmark-dark-mode.png" alt="Alpha Investor" fill sizes="160px" className="object-contain object-left" />
          </span>
          <p className="mt-4 max-w-xs text-sm text-[var(--muted)]">{c.footer.tagline}</p>
          <p className="mt-4 text-xs text-[var(--faint)]">{c.footer.company}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--faint)]">{c.footer.cols.product.heading}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {productLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[var(--muted)] transition-colors hover:text-white">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--faint)]">{c.footer.cols.legal.heading}</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/privacy" className="text-[var(--muted)] transition-colors hover:text-white">{tNav("privacy")}</Link></li>
            <li><Link href="/terms" className="text-[var(--muted)] transition-colors hover:text-white">{tNav("terms")}</Link></li>
            <li><a href={`mailto:${tFooter("contactEmail")}`} className="text-[var(--muted)] transition-colors hover:text-white">{tFooter("contactEmail")}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-[var(--faint)] sm:flex-row sm:px-6">
          <span>© {year} Alpha Investor. {c.footer.rights}</span>
          <span>{c.footer.notAdvice}</span>
        </div>
      </div>
    </footer>
  );
}
