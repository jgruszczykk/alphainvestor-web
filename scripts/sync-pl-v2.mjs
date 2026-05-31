import fs from "fs";

const en = JSON.parse(fs.readFileSync("messages/en.json", "utf8"));
const pl = JSON.parse(fs.readFileSync("messages/pl.json", "utf8"));

pl.Metadata.homeTitle = "Alpha Investor | Śledzenie i analityka portfela";
pl.Metadata.homeDescription =
  "Śledzenie portfela akcji z importem brokerów, analityką portfela i investment intelligence. Alokacja, ryzyko i wyjaśnione wnioski na iOS.";

pl.Nav.imports = "Importy";
pl.Nav.intelligence = "Inteligencja";
pl.Nav.joinWaitlist = "Wczesny dostęp";
pl.Footer.imports = "Importy";
pl.Footer.intelligence = "Inteligencja";
pl.Footer.contactWaitlist = "Wczesny dostęp";

pl.Form.title = "Wczesny dostęp";
pl.Form.subtitle = "iOS jest dostępny. Dołącz po termin Androida i większe aktualizacje.";
pl.Form.submit = "Wyślij zgłoszenie";

/** Polish Home: start from EN structure, overlay translations */
pl.Home = {
  ...en.Home,
  eyebrow: "Portfolio intelligence · iOS",
  headline: "Śledzenie i analityka portfela dla poważnych inwestorów.",
  heroProof1: "Śledzenie portfela",
  heroProof2: "Analityka portfela",
  heroProof3: "Investment intelligence",
  subhead:
    "Importuj pozycje z brokerów, analizuj alokację i ryzyko oraz korzystaj z wyjaśnionych wniosków na telefonie—bez udostępniania haseł do brokera.",
  heroPrimaryCta: "Zacznij śledzić portfel",
  heroSecondaryCta: "Wczesny dostęp",
  heroTertiaryCta: "Zobacz stos danych",
  heroFootnote: "Operator: Jakub Gruszczyk QBKSHOP · Wczesny etap · iOS na żywo",
  trustBrokersLine: "Obsługujemy też Robinhood, mBank eMakler i inne CSV/Excel.",
  importsTitle: "Import portfela",
  importsIntro: "Importuj portfel z brokera i zacznij analizować inwestycje w kilka minut.",
  importsBody:
    "Bez logowania do brokera. Bez API. Wgraj plik eksportu—mapujemy pozycje, walidujemy symbole i budujemy księgę na licencjonowanych danych.",
  importsStep1Title: "Wgraj plik",
  importsStep1Body: "Wyeksportuj otwarte pozycje lub historię z brokera (CSV lub Excel).",
  importsStep2Title: "Automatyczne mapowanie",
  importsStep2Body: "Wykrywamy format brokera i mapujemy kolumny do jednego modelu portfela.",
  importsStep3Title: "Portfel utworzony",
  importsStep3Body: "Pozycje, waluty i partie w jednej mobilnej księdze.",
  importsStep4Title: "Analityka dostępna",
  importsStep4Body: "Alokacja, wynik, soczewki i wyjaśnione wnioski od razu po imporcie.",
  importsCta: "Zobacz, jak to działa",
  importsCtaSecondary: "Wczesny dostęp",
  brokerDegiro: "DEGIRO",
  brokerCsv: "Własny CSV",
  whyNowEyebrow: "Dlaczego teraz",
  whyNowTitle: "Więcej danych. Te same trudne decyzje.",
  whyNowIntro:
    "Inwestorzy detaliczni mają więcej informacji niż kiedykolwiek—i więcej brokerów, aplikacji i wykresów, niż da się pogodzić. Same dane nie poprawiają decyzji bez kontekstu Twojej księgi.",
  whyNowProblem1Title: "Nadmiar danych",
  whyNowProblem1Body: "Notowania, newsy i ekrany mnożą się. Prawda o portfelu jest rozproszona.",
  whyNowProblem2Title: "Rozdrobnieni brokerzy",
  whyNowProblem2Body: "Brak jednego miejsca na ekspozycję, koncentrację i wynik.",
  whyNowProblem3Title: "Brak kontekstu",
  whyNowProblem3Body: "Liczby bez wyjaśnienia nie mówią, na czym się skupić.",
  whyNowResolution:
    "Alpha Investor buduje warstwę portfolio intelligence: importy, dane rynkowe i wyjaśniona analityka, która zamienia dane w decyzje, które możesz obronić.",
  whyNowCta: "Poznaj platformę",
  platformTitle: "Jeden silnik śledzenia i analizy portfela",
  platformCta: "Zobacz importy",
  dataEyebrow: "Infrastruktura",
  dataTitle: "Infrastruktura danych rynkowych",
  dataIntro:
    "Alpha Investor opiera się na licencjonowanych API danych rynkowych. Każdy portfel generuje cykliczne zużycie notowań, fundamentów i rozwiązywania instrumentów.",
  dataStatLine: "Każda synchronizacja portfela uruchamia zapytania o notowania, referencje i walidację.",
  dataGrid1Title: "Ceny historyczne",
  dataGrid1Body: "Szeregi czasowe i kontekst wyniku dla pozycji i portfela.",
  dataGrid2Title: "Fundamenty spółek",
  dataGrid2Body: "Pola referencyjne pod soczewki wyceny i czynniki.",
  dataGrid3Title: "Metadane ETF i instrumentów",
  dataGrid3Body: "Identyfikatory i klasyfikacja dla akcji i funduszy.",
  dataGrid4Title: "Odkrywanie instrumentów",
  dataGrid4Body: "Wyszukiwanie i walidacja symboli na rynkach USA, Europy i innych.",
  dataGrid5Title: "Analityka portfela",
  dataGrid5Body: "Wzbogacanie po stronie serwera: alokacja, koncentracja ryzyka, ekspozycja.",
  dataGrid6Title: "Pokrycie rynkowe",
  dataGrid6Body: "Projekt pod portfele detaliczne o wysokiej liczbie symboli i użytkowników.",
  dataFooterLine:
    "Nie odsprzedajemy surowych danych. Korzystamy z licencjonowanych feedów, by dostarczać portfolio intelligence.",
  dataVendorsLink: "Dla dostawców danych",
  engineTitle: "Investment intelligence poza zwykłym trackerem",
  engineIntro:
    "Więcej niż stock portfolio tracker. Spójna warstwa analityki na Twoich wagach—not lista obserwowanych.",
  engineCap1Title: "Alokacja portfela",
  engineCap1Body: "Sektory, geografia i wagi pozycji z sygnałami dryfu.",
  engineCap2Title: "Koncentracja ryzyka",
  engineCap2Body: "Ekspozycja i koncentracja powiązane z Twoją księgą.",
  engineCap3Title: "Wycena",
  engineCap3Body: "Kontekst w stylu fundamentów i oceny wyceny.",
  engineCap4Title: "Jakość",
  engineCap4Body: "Czynniki jakości biznesu z uzasadnieniem.",
  engineCap5Title: "Wzrost",
  engineCap5Body: "Porównywalne oceny wzrostu dla każdej pozycji.",
  engineCap6Title: "Momentum",
  engineCap6Body: "Trend i momentum na wykresach i w ocenach.",
  engineAiTitle: "Wnioski generowane przez AI",
  engineAiBody:
    "Wyjaśnienia: co się zmieniło, dlaczego i jakie czynniki stoją za sygnałem—na wagach Twojego portfela.",
  engineCta: "Zobacz wnioski o portfelu",
  benefitsTitle: "Dlaczego inwestorzy wybierają naszą aplikację do analizy portfela",
  benefitsCta: "Zacznij śledzić portfel",
  trustTitle: "Zaufanie, bezpieczeństwo i dane",
  trustIntro: "Dane portfela są wrażliwe. Projektujemy import i analitykę tak, byś zachował kontrolę.",
  trustSecurityTitle: "Bezpieczeństwo",
  trustSecurityBody: "Bez danych logowania do brokera. Bez OAuth do handlu.",
  trustPrivacyTitle: "Prywatność",
  trustPrivacyBody: "Wnioski dla Twojego konta. Bez trenowania publicznych modeli na Twojej księdze.",
  trustProcessingTitle: "Przetwarzanie plików",
  trustProcessingBody: "Eksporty brokerskie z kontrolą prywatności; parsing na urządzeniu, gdzie to możliwe.",
  trustInfrastructureTitle: "Infrastruktura",
  trustInfrastructureBody: "Szyfrowanie, kontrola dostępu i due diligence dostawców danych.",
  trustComplianceTitle: "Zgodność",
  trustComplianceBody: "Oprogramowanie edukacyjne—nie porada inwestycyjna, podatkowa ani prawna.",
  trustPrivacyCta: "Polityka prywatności",
  scaleIntro:
    "Wczesny zespół budujący infrastrukturę pod jeden portfel i pod miliony. Każdy import dodaje symbole; każde odświeżenie—obciążenie danych; każdy wniosek—obliczenia na deterministycznej matematyce portfela.",
  scaleBullet1: "Ekosystem wielu brokerów, regionów i walut",
  scaleBullet2: "Globalne akcje i ETF-y w jednym modelu",
  scaleBullet3: "API portfolio intelligence w skali sesji i synchronizacji",
  scaleBullet4: "Narzędzia AI research na wyjaśnionej analityce",
  scaleBullet5: "Ekspansja międzynarodowa wraz z importami i partnerstwami",
  scaleCta: "Partnerstwa",
  scaleCtaSecondary: "Wczesny dostęp",
  stepsTitle: "Jak działa śledzenie portfela",
  stepsCta: "Pobierz na iOS",
  stepsCtaSecondary: "Wczesny dostęp",
  pricingTitle: "Plany śledzenia portfela i analityki",
  pricingCtaPrimary: "Zacznij od Free",
  pricingCtaSecondary: "Zobacz wnioski o portfelu",
  screensTitle: "Stock portfolio tracker — mobilna prezentacja produktu",
  screensCta: "Zobacz plany",
  screensCtaSecondary: "Wczesny dostęp",
  roadmapTitle: "Mapa platformy",
  roadmapIntro: "Kierunkowe możliwości—bez dat i zobowiązań.",
  roadmapFootnote: "Mapa opisuje kierunek, nie terminy ani obietnice.",
  roadmapPhase1Title: "Śledzenie portfela",
  roadmapPhase1Badge: "W toku",
  roadmapPhase1Body: "Zunifikowane księgi, notowania, wykresy i wynik. iOS jest dostępny dziś.",
  roadmapPhase2Title: "Łączność z brokerami",
  roadmapPhase2Body: "Szersze szablony importu, symbole i wiele rachunków.",
  roadmapPhase3Title: "Portfolio intelligence",
  roadmapPhase3Body: "Alokacja, ryzyko, soczewki i wyjaśniona analityka na całej księdze.",
  roadmapPhase4Title: "Warstwa AI research",
  roadmapPhase4Body: "Głębsze wnioski i workflow badawczy na prawdzie portfela.",
  roadmapPhase5Title: "Investment operating system",
  roadmapPhase5Body:
    "Platforma multi-broker i multi-asset do śledzenia, analizy i wsparcia decyzji w skali.",
  roadmapCta: "Wczesny dostęp",
};

fs.writeFileSync("messages/pl.json", JSON.stringify(pl, null, 2) + "\n");
console.log("pl Home keys:", Object.keys(pl.Home).length);
