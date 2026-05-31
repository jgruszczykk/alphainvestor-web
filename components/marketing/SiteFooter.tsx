import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function SiteFooter() {
  const t = await getTranslations("Home");
  const tFooter = await getTranslations("Footer");

  return (
    <footer
      className="anim-fade-rise relative z-10 mt-auto border-t border-[var(--border)] bg-[var(--surface)]/50 px-4 py-10 text-xs text-[var(--muted)] sm:px-6"
      style={{ animationDelay: "920ms" }}
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn heading={tFooter("legalHeading")}>
            <FooterLink href="/privacy">{tFooter("privacy")}</FooterLink>
            <FooterLink href="/terms">{tFooter("terms")}</FooterLink>
            <FooterLink href="/partners">{tFooter("partners")}</FooterLink>
          </FooterColumn>

          <FooterColumn heading={tFooter("navHeading")}>
            <FooterAnchor href="/#platform">{tFooter("platform")}</FooterAnchor>
            <FooterAnchor href="/#data">{tFooter("data")}</FooterAnchor>
            <FooterAnchor href="/#brokers">{tFooter("brokers")}</FooterAnchor>
            <FooterAnchor href="/#security">{tFooter("security")}</FooterAnchor>
            <FooterAnchor href="/#product-proof">{tFooter("product")}</FooterAnchor>
            <FooterAnchor href="/#pricing">{tFooter("pricing")}</FooterAnchor>
            <FooterAnchor href="/#faq">{tFooter("faq")}</FooterAnchor>
          </FooterColumn>

          <FooterColumn heading={tFooter("contactHeading")}>
            <li>
              <a
                href={`mailto:${tFooter("contactEmail")}`}
                className="rounded-md text-[var(--muted)] transition-colors duration-200 hover:text-[var(--heading)]"
              >
                {tFooter("contactEmail")}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${tFooter("partnersEmail")}`}
                className="rounded-md text-[var(--muted)] transition-colors duration-200 hover:text-[var(--heading)]"
              >
                {tFooter("partnersEmail")}
              </a>
            </li>
            <FooterAnchor href="/#waitlist">{tFooter("contactWaitlist")}</FooterAnchor>
          </FooterColumn>

          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-[11px] leading-relaxed text-[var(--muted)]">{tFooter("companyLine")}</p>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6 text-center">
          <p>
            © {new Date().getFullYear()} Alpha Investor. {tFooter("rights")}
          </p>
          <p className="mx-auto mt-2 max-w-xl">{t("disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--heading)]">
        {heading}
      </h2>
      <ul className="mt-3 flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: "/privacy" | "/terms" | "/partners";
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="rounded-md text-[var(--muted)] transition-colors duration-200 hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
      >
        {children}
      </Link>
    </li>
  );
}

function FooterAnchor({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        href={href}
        className="rounded-md text-[var(--muted)] transition-colors duration-200 hover:text-[var(--heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
      >
        {children}
      </a>
    </li>
  );
}
