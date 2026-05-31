import { getSiteUrl } from "@/lib/site-url";

type Props = { locale: string };

export function JsonLd({ locale }: Props) {
  const base = getSiteUrl().origin;
  const isPl = locale === "pl";

  const description = isPl
    ? "Śledzenie i analiza portfela akcji u wielu brokerów. Import pozycji, analityka portfela, dane na żywo i wyjaśnione AI na iOS."
    : "Track and analyze your stock portfolio across brokers. Import holdings, portfolio analytics, live market data, and explained AI insights on iOS.";

  const featureList = isPl
    ? [
        "Śledzenie portfela inwestycyjnego",
        "Import z brokerów",
        "Analityka portfela",
        "Dane rynkowe na żywo",
        "Wyjaśnione AI",
      ]
    : [
        "Investment portfolio tracking",
        "Multi-broker file imports",
        "Portfolio analysis and analytics",
        "Live market data",
        "Explained AI investment insights",
      ];

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Alpha Investor",
    applicationCategory: "FinanceApplication",
    operatingSystem: "iOS",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: isPl ? "Wczesny dostęp" : "Early access",
    },
    description,
    featureList,
    inLanguage: [isPl ? "pl" : "en"],
    url: `${base}/`,
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Alpha Investor",
    url: `${base}/`,
    email: "privacy@alphainvestor.app",
    description: isPl
      ? "Platforma analizy portfela dla inwestorów detalicznych."
      : "Portfolio intelligence platform for retail investors.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  );
}
