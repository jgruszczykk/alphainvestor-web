import fs from "fs";

const enPath = new URL("../messages/en.json", import.meta.url).pathname;
const plPath = new URL("../messages/pl.json", import.meta.url).pathname;
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const pl = JSON.parse(fs.readFileSync(plPath, "utf8"));

pl.Metadata.homeTitle = "Alpha Investor | Śledzenie i analityka portfela";
pl.Metadata.homeDescription =
  "Śledzenie i analityka portfela dla długoterminowych inwestorów. Import brokerów, wnioski i iOS.";

pl.Nav.joinWaitlist = "Wczesny dostęp";
pl.Footer.contactWaitlist = "Wczesny dostęp";
pl.Form.title = "Wczesny dostęp";
pl.Form.submit = "Dołącz do wczesnego dostępu";

const homePl = {
  ...en.Home,
  ctaPrimary: "Wczesny dostęp",
  ctaSecondary: "Dowiedz się więcej",
  eyebrow: "Analityka portfela · iOS",
  headline: "Wiedz, co robić.",
  subheadCategory: "Śledzenie i analityka portfela dla długoterminowych inwestorów.",
  subheadBenefit:
    "Śledź portfel, rozumiej co się zmieniło i podejmuj lepsze decyzje inwestycyjne.",
  importsTitle: "Zaimportuj portfel w kilka minut",
  importsIntro:
    "Wgraj eksport z brokera i od razu zacznij śledzić inwestycje.",
  brokerCsv: "Własny CSV",
  dataIntro:
    "Licencjonowane API zasilają notowania, fundamenty i walidację dla każdego portfela.",
  dataGrid3Title: "Metadane ETF",
  dataGrid3Body: "Klasyfikacja pozycji akcji i funduszy.",
  benefitsTitle: "Dlaczego inwestorzy wybierają Alpha Investor",
  benefitsIntro:
    "Dla długoterminowych inwestorów zarządzających realnym kapitałem u wielu brokerów.",
  trustTitle: "Zaufanie i bezpieczeństwo",
  trustIntro: "",
  trustSecurityTitle: "Bez danych logowania do brokera",
  trustSecurityBody:
    "Import z plików eksportu—nigdy nie prosimy o hasła do handlu.",
  trustPrivacyTitle: "Architektura privacy-first",
  trustPrivacyBody: "Dane portfela pozostają w zakresie Twojego konta.",
  trustProcessingTitle: "Licencjonowane dane rynkowe",
  trustProcessingBody:
    "Notowania i dane referencyjne od licencjonowanych dostawców—not ze stron brokerów.",
  trustPrivacyCta: "Polityka prywatności",
  whyNowIntro: "Więcej aplikacji i notowań—księga bez kontekstu pozostaje rozproszona.",
  whyNowProblem1Body: "Więcej ekranów. Pozycje nadal rozproszone między kontami.",
  whyNowResolution:
    "Alpha Investor łączy importy, dane rynkowe i wyjaśnioną analitykę na Twojej księdze.",
  scaleIntro:
    "Infrastruktura pod rosnącą liczbę importów i obciążeń danych.",
  pricingTagline:
    "Free do podstaw. Alpha Pro dodaje pełną warstwę intelligence.",
  faq1Q: "Czy mogę importować portfele z brokerów?",
  faq1A:
    "Tak. Wyeksportuj pozycje z brokera i zaimportuj plik w aplikacji. Bez logowania do brokera i haseł do handlu.",
  faq2Q: "Jak przetwarzane są dane mojego portfela?",
  faq2A:
    "Importy są privacy-first i przypisane do konta. Nie trenujemy publicznych modeli na Twoich pozycjach. Szczegóły w Polityce prywatności.",
  faq3Q: "Jakie rynki są obsługiwane?",
  faq3A:
    "Dziś główne notowania USA i Europy, z szerszym pokryciem w miarę rozwoju importów i walidacji symboli.",
  faq4Q: "Czy będzie wersja na Androida?",
  faq4A:
    "iOS jest dostępny. Android jest w planach—dołącz do wczesnego dostępu po aktualizacje.",
  faq5Q: "Jak działa cennik?",
  faq5A:
    "Free obejmuje portfele, notowania i wykresy. Alpha Pro to 10 USD/mies. w App Store za pełną warstwę wyjaśnionych wniosków.",
  ctaSub: "Pobierz na iOS lub dołącz do wczesnego dostępu po aktualizacje.",
  roadmapPhase4Title: "Workflow badawczy",
  roadmapPhase4Body:
    "Głębszy research na Twoim portfelu—not generyczne ekrany.",
  appStoreBadgeSmall: "Pobierz w",
  appStoreBadgeLarge: "App Store",
  appStoreBadgeAria: "Pobierz Alpha Investor z App Store",
};

pl.Home = homePl;
fs.writeFileSync(plPath, `${JSON.stringify(pl, null, 2)}\n`);
console.log("pl Home keys:", Object.keys(pl.Home).length);
