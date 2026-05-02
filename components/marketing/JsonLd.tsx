import { getSiteUrl } from "@/lib/site-url";

type Props = { locale: string };

export function JsonLd({ locale }: Props) {
  const base = getSiteUrl().origin;
  const name = "Alpha Investor";
  const description =
    locale === "pl"
      ? "Alpha Investor na iOS: spokojniejszy widok portfela, krótkie podsumowania AI i pięć szybkich ocen na instrument."
      : "Alpha Investor on iOS: a calmer portfolio view, short AI summaries tied to your holdings, and five quick scores per name.";

  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "FinanceApplication",
    operatingSystem: "iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: locale === "pl" ? "Wczesny dostęp" : "Early access",
    },
    description,
    inLanguage: [locale === "pl" ? "pl" : "en"],
    url: `${base}/`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
