import { getSiteUrl } from "@/lib/site-url";

type Props = { locale: string };

export function JsonLd({ locale }: Props) {
  const base = getSiteUrl().origin;
  const isPl = locale === "pl";

  const description = isPl
    ? "Śledzenie portfela akcji z importem brokerów, analityką portfela i investment intelligence na iOS."
    : "Stock portfolio tracker with broker imports, portfolio analysis, and investment intelligence on iOS.";

  const featureList = isPl
    ? [
        "Śledzenie portfela inwestycyjnego",
        "Analityka portfela",
        "Investment intelligence",
        "Import z brokerów",
        "Zarządzanie portfelem inwestycyjnym",
      ]
    : [
        "Portfolio tracker",
        "Portfolio analytics",
        "Investment intelligence",
        "Investment portfolio management",
        "Portfolio analysis",
        "Multi-broker file imports",
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
      ? "Platforma portfolio intelligence i analityki inwestycyjnej."
      : "Portfolio intelligence and investment analytics platform.",
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
