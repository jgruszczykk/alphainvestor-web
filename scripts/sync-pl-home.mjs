import fs from "fs";

const plHome = {
  skipToContent: "Przejdź do treści",
  eyebrow: "Platforma analizy portfela · iOS",
  headline:
    "Śledzenie i analiza portfela inwestycyjnego  -  dla poważnych inwestorów detalicznych.",
  subhead:
    "Importuj pozycje z wiodących brokerów, wzbogacaj je licencjonowanymi danymi rynkowymi i korzystaj z wyjaśnionej analityki portfela oraz AI na telefonie  -  bez udostępniania haseł do brokera.",
  heroTertiaryCta: "Zobacz platformę",
  heroPrimaryCta: "Wczesny dostęp",
  heroSecondaryCta: "Jak działają importy",
  heroImageAlt:
    "Ekran Alpha Investor z pięcioma ocenami: trend, wycena, ryzyko, wzrost, momentum.",
  heroDeckWalletAlt: "Widok portfela z alokacją i wynikiem.",
  heroDeckChartAlt: "Szczegóły instrumentu z wykresem i wynikiem.",
  trustItem1: "Import plików brokerskich",
  trustItem2: "Licencjonowane dane rynkowe",
  trustItem3: "Prywatność na pierwszym miejscu",
  trustItem4: "To nie porada inwestycyjna",
  trustBrokersLine:
    "XTB, Interactive Brokers, Degiro, Trading 212, Revolut, Robinhood, mBank eMakler oraz CSV/Excel.",
  platformTitle: "Jeden silnik analizy portfela",
  platformIntro:
    "Alpha Investor to nie aplikacja z listą obserwowanych. To infrastruktura, która zamienia rozproszone eksporty brokerskie w jedną księgę do analizy.",
  platformPillar1Title: "Połącz brokerów",
  platformPillar1Body:
    "Importuj otwarte pozycje i historię z eksportów. Bez logowania do brokera  -  pliki przetwarzane z naciskiem na prywatność.",
  platformPillar2Title: "Wzbogać danymi rynkowymi",
  platformPillar2Body:
    "Notowania po stronie serwera, pola referencyjne i walidacja symboli zasilają wykresy i analitykę każdej pozycji.",
  platformPillar3Title: "Zrozum dzięki wyjaśnieniom",
  platformPillar3Body:
    "Alokacja, wynik, soczewki ryzyka i AI oparte na Twoich wagach  -  każdy sygnał z uzasadnieniem.",
  platformCta: "Jak działają importy",
  dataTitle: "Zbudowane na infrastrukturze danych rynkowych",
  dataIntro:
    "Każdy portfel generuje stałe zużycie API: rozwiązywanie symboli, notowania na żywo i historyczne oraz dane referencyjne dla analityki i AI.",
  dataBullet1: "Zbiorcze zapytania o notowania i dane referencyjne przy synchronizacji portfela",
  dataBullet2:
    "Walidacja symboli na rynkach USA, Europy i innych (tickery z kodem giełdy)",
  dataBullet3: "Dane w stylu fundamentów pod oceny i soczewki wyceny",
  dataBullet4: "Projekt pod portfele detaliczne o wysokiej liczbie symboli i użytkowników",
  dataPartnerCta: "Partnerstwa danych i API",
  brokersTitle: "Łączność z brokerami bez haseł",
  brokersIntro:
    "Inwestorzy trzymają aktywa u wielu brokerów. Alpha Investor przyjmuje pliki eksportu  -  nie API z danymi logowania  -  aby scalić księgę.",
  brokersCallout:
    "Pliki są przetwarzane na urządzeniu, gdzie to możliwe; nigdy nie prosimy o login do brokera.",
  brokersMore: "Więcej przez CSV/Excel",
  brokerXtb: "XTB",
  brokerIbkr: "Interactive Brokers",
  brokerDegiro: "Degiro",
  brokerT212: "Trading 212",
  brokerRevolut: "Revolut",
  brokerRobinhood: "Robinhood",
  brokerMbank: "mBank eMakler",
  brokersCta: "Wczesny dostęp",
  engineTitle: "Analiza portfela, nie kolejna aplikacja z wykresami",
  engineIntro:
    "Analityka na poziomie portfela, spójne oceny pozycji i wyjaśnione AI  -  pod to, jak naprawdę inwestujesz.",
  engineFeature1: "Kondycja portfela, alokacja i wynik",
  engineFeature2:
    "Pięć soczewek (trend, wycena, ryzyko, wzrost, momentum) z uzasadnieniem po polsku/angielsku",
  engineFeature3: "Głęboki widok instrumentu: wykres, kontekst i sygnały w jednym przewijaniu",
  engineFeature4: "Narzędzia scenariuszowe przed zmianą alokacji",
  engineCta: "Zobacz produkt",
  aiProBadge: "Alpha Pro",
  aiExplain: "Widzisz, co się zmieniło, dlaczego to ważne i na czym się skupić.",
  aiProHook: "Bez czarnej skrzynki. Każdy sygnał jest wyjaśniony.",
  aiPillar1Title: "Co to jest?",
  aiPillar1Body: "Wyjaśniona analityka i AI na rzeczywistych wagach Twojego portfela.",
  aiPillar2Title: "Dlaczego to ważne?",
  aiPillar2Body: "Kontekst powiązany z Twoją księgą  -  nie odosobnione liczby ani lista obserwowanych.",
  aiPillar3Title: "Co dalej?",
  aiPillar3Body: "Każdy sygnał pomaga podjąć kolejny krok  -  decyzja należy do Ciebie.",
  benefitsTitle: "Dlaczego inwestorzy wybierają Alpha Investor",
  benefitsIntro: "Efekty, które mają znaczenie przy zarządzaniu pieniędzmi u wielu brokerów.",
  benefit1Title: "Całkowita ekspozycja między brokerami",
  benefit1Body: "Jeden widok alokacji i wyniku, gdy pozycje są w wielu rachunkach.",
  benefit2Title: "Koncentracja i dryf alokacji",
  benefit2Body: "Jasne sygnały o strukturze portfela  -  informują, nie straszą.",
  benefit3Title: "Spójny model porównań",
  benefit3Body: "Ta sama skala pięciu soczewek dla każdej spółki z uzasadnieniem.",
  benefit4Title: "Działaj na wyjaśnionych sygnałach",
  benefit4Body: "Każda ocena łączy się z czynnikami  -  bez czarnej skrzynki i hype'u.",
  benefit5Title: "Przegląd portfela na telefonie",
  benefit5Body: "Wykresy, kontekst i AI w jednym przepływie  -  bez sześciu kart w przeglądarce.",
  benefitsCtaWaitlist: "Wczesny dostęp",
  securityTitle: "Bezpieczeństwo i prywatność od podstaw",
  securityIntro:
    "Budujemy oprogramowanie portfelowe, któremu inwestorzy mogą powierzyć wrażliwe dane o pozycjach.",
  securityBullet1: "Bez zbierania danych logowania do brokera  -  tylko import z plików",
  securityBullet2:
    "Wnioski dla Twojego konta; nie trenujemy publicznych modeli na Twojej księdze",
  securityBullet3: "Oprogramowanie edukacyjne  -  nie porada inwestycyjna, podatkowa ani prawna",
  securityPrivacyCta: "Polityka prywatności",
  securityAppNote: "Bezpieczeństwo w aplikacji opisujemy w Alpha Investor na iOS.",
  scaleTitle: "Zbudowane pod skalę",
  scaleIntro:
    "Dziś jesteśmy małym zespołem, budując warstwę danych i importów, jakiej detaliczne oprogramowanie portfelowe będzie potrzebować przy milionach użytkowników.",
  scaleBullet1: "Tysiące portfeli → miliony zapytań o symbole",
  scaleBullet2: "Wielu brokerów, wiele walut",
  scaleBullet3: "Globalne akcje i ETF-y",
  scaleBullet4: "AI na deterministycznej matematyce portfela",
  scaleCta: "Dołącz do listy",
  featuresTitle: "Co możesz zrobić",
  featuresIntro: "Portfele, wykresy i wyjaśnione podsumowania w jednym przepływie.",
  feature1Title: "Kondycja i alokacja portfela",
  feature1Body: "Jasne sygnały o strukturze i koncentracji w całej księdze.",
  feature2Title: "Oceny pięciu soczewek",
  feature2Body: "Ta sama skala dla każdego tickera z uzasadnieniem  -  bez własnego arkusza czynników.",
  feature3Title: "Głęboki widok instrumentu",
  feature3Body: "Wykres, wynik, kontekst w stylu fundamentów i narracja w jednym przewijaniu.",
  feature4Title: "Portfele, prywatność, dane na żywo",
  feature4Body: "Wiele ksiąg, notowania z serwera i wnioski tylko dla Twojego konta.",
  stepsTitle: "Jak to działa",
  step1Title: "Importuj lub dodaj księgę",
  step1Body:
    "Importuj eksport brokera (XTB, IBKR, Degiro i inne) lub utwórz portfel ręcznie z pozycjami i walutą bazową.",
  step2Title: "Wzbogacamy każdą pozycję",
  step2Body:
    "Wykresy, notowania, pola referencyjne i walidacja symboli z licencjonowanych danych na serwerze.",
  step3Title: "Przejrzyj wyjaśnione wnioski",
  step3Body:
    "Podsumowania portfela i pozycji: co wygląda na rozciągnięte, co zbalansowane  -  decyzja po Twojej stronie.",
  pricingEyebrow: "Plany",
  pricingTitle: "Plany śledzenia portfela i analityki AI",
  pricingTagline: "10 USD/mies. za pełną warstwę wyjaśnionej inteligencji portfela.",
  pricingFreeName: "Free",
  pricingFreePrice: "$0",
  pricingFreeBullet1: "Portfele, notowania i wykresy  -  bez premium AI.",
  pricingFreeBullet2: "Ta sama prywatność  -  nie trenujemy publicznych modeli na Twojej księdze.",
  pricingFreeBullet3: "Upgrade w Ustawienia → Subskrypcja na iOS, gdy będziesz gotowy.",
  pricingProName: "Alpha Pro",
  pricingProBadge: "Pełne AI",
  pricingProPrice: "$10",
  pricingProPeriod: "/ miesiąc",
  pricingProBullet1: "Portfel + każda pozycja oparta na TWOICH wagach  -  nie lista obserwowanych.",
  pricingProBullet2: "Pięć soczewek z uzasadnieniem do szybkiego skanu.",
  pricingProBullet3: "Ekran instrumentu: wykres, kontekst i AI w jednym przewijaniu.",
  pricingProBullet4: "Nowe funkcje Pro najpierw tutaj.",
  pricingCtaWaitlist: "Wczesny dostęp",
  pricingCtaProduct: "Zobacz produkt",
  pricingDisclaimerLine:
    "Oprogramowanie edukacyjne  -  rynek pozostaje ryzykowny. Sprzedajemy jasność Twoich danych, nie obietnice zwrotu.",
  pricingFootnote:
    "Zakupy w aplikacji przez Apple IAP na iOS (cena może się różnić). Rozliczenia Google Play w planach. Anuluj w ustawieniach subskrypcji urządzenia.",
  screensTitle: "Analityka inwestycyjna w kieszeni",
  screensIntro: "Śledzenie portfela, wykresy i wyjaśnione sygnały  -  zaprojektowane na mobile.",
  galleryPortfolioInsightKicker: "Wyjaśnione sygnały",
  galleryWalletValueKicker: "Wynik",
  galleryWalletAllocationKicker: "Alokacja",
  galleryChartKicker: "Momentum",
  galleryFiveLensesKicker: "Porównanie",
  galleryFundamentalsKicker: "Wycena",
  galleryOptimizerKicker: "Scenariusz",
  galleryNewsKicker: "Wiadomości",
  galleryWalletValueTitle: "Zobacz, czy plan działa",
  galleryWalletValueBody: "Wartość portfela w czasie z prostymi zakresami dat.",
  galleryWalletAllocationTitle: "Zrozum, co posiadasz",
  galleryWalletAllocationBody: "Alokacja, ekspozycja i wynik w jednym miejscu.",
  galleryPortfolioInsightTitle: "Wyjaśniony wgląd w portfel",
  galleryPortfolioInsightBody: "Jasne sygnały z kontekstem  -  każda ocena z uzasadnieniem.",
  galleryChartTitle: "Rynek w prosty sposób",
  galleryChartBody: "Wykresy i sygnały bez zbędnego szumu.",
  galleryFiveLensesTitle: "Rozłóż na czynniki",
  galleryFiveLensesBody: "Trend, wycena, wzrost, ryzyko i momentum w jednym widoku.",
  galleryFundamentalsTitle: "Zobacz uzasadnienie",
  galleryFundamentalsBody: "Każdy sygnał łączy się z czynnikami.",
  galleryOptimizerTitle: "Zaplanuj kolejny ruch",
  galleryOptimizerBody: "Przetestuj zmiany przed działaniem na portfelu.",
  galleryNewsTitle: "To, co ma znaczenie",
  galleryNewsBody: "Kontekst rynkowy zamiast szumu informacyjnego.",
  faqTitle: "Najczęstsze pytania",
  faq1Q: "Czy to porada inwestycyjna?",
  faq1A:
    "Nie. Alpha Investor to oprogramowanie i kontekst edukacyjny. Nie jesteśmy powiernikiem i nie znamy Twojej pełnej sytuacji finansowej  -  decyzje o handlu i podatkach podejmujesz Ty.",
  faq2Q: "Jak działają importy z brokerów?",
  faq2A:
    "Wyeksportuj otwarte pozycje lub historię z brokera (CSV/Excel, gdzie obsługiwane) i zaimportuj w aplikacji. Nie łączymy się z brokerem Twoim loginem  -  tylko pliki.",
  faq3Q: "Którzy brokerzy są obsługiwani?",
  faq3A:
    "Szablony dla XTB, Interactive Brokers, Degiro, Trading 212, Revolut, Robinhood, mBank eMakler oraz ścieżka ogólna dla innych CSV/Excel. Zakres rozszerzamy.",
  faq4Q: "Skąd pochodzą dane rynkowe?",
  faq4A:
    "Licencjonowani dostawcy po stronie serwera  -  notowania, pola referencyjne i walidacja symboli. Nie używamy danych portfeli innych użytkowników jako źródła.",
  faq5Q: "Co dodaje AI?",
  faq5A:
    "Wyjaśnione podsumowania portfela i pozycji  -  co się zmieniło, dlaczego i jakie czynniki stoją za sygnałem. Alpha Pro dodaje pełną warstwę na całej księdze.",
  faq6Q: "Na jakich platformach działa aplikacja?",
  faq6A: "Dziś iOS. Android w planach  -  zapisz się na listę, by poznać termin.",
  faq7Q: "Jak działa cennik?",
  faq7A:
    "Free: portfele, notowania i wykresy bez premium AI. Alpha Pro: 10 USD/mies. za pełną warstwę  -  subskrypcja w aplikacji iOS przez App Store.",
  faq8Q: "Czy trenujecie publiczne modele na moim portfelu?",
  faq8A:
    "Nie. Wnioski generujemy dla Twojego konta z Twoich danych i licencjonowanych feedów zgodnie z polityką prywatności.",
  faq9Q: "Co po zapisie na listę?",
  faq9A: "Okazjonalny e-mail o wydaniach i Androidzie. Wypisz się w dowolnym momencie.",
  faq10Q: "Czy jesteście brokerem lub depozytariuszem?",
  faq10A:
    "Nie. Nie przechowujemy aktywów, nie składamy zleceń ani nie udzielamy spersonalizowanych porad inwestycyjnych.",
  faq11Q: "Jestem dostawcą danych/API  -  jak partnerować?",
  faq11A:
    "Napisz na partners@alphainvestor.app z produktami i przypadkami użycia. Zużywamy notowania, dane referencyjne i walidację symboli w skali portfela.",
  faq12Q: "Czy moje dane są bezpieczne?",
  faq12A:
    "Projektujemy import bez haseł do brokera, wnioski przypisane do konta i standardowe praktyki bezpieczeństwa. Szczegóły w polityce prywatności i w aplikacji.",
  ctaTitle: "Zacznij od prawdziwego portfela",
  ctaSub: "Pobierz na iOS lub dołącz do wczesnego dostępu na Androida i większe aktualizacje.",
  formConsent: "Zapisując się, zgadzasz się na e-mail o produkcie. Zobacz",
  formConsentLink: "Prywatność",
  disclaimer:
    "To nie porada inwestycyjna, podatkowa ani prawna. Tekst AI może być niepełny  -  sprawdź wszystko, co wpływa na Twoje pieniądze.",
  roadmapTitle: "Mapa produktu",
  roadmapIntro:
    "Fazy kierunkowe  -  bez dat. Kolejność może się zmienić; lista oczekujących o wydaniach.",
  roadmapFootnote: "Pozycje mapy to plany, nie zobowiązania.",
  roadmapPhase1Title: "Dostępne  -  fundament iOS",
  roadmapPhase1Badge: "Na żywo",
  roadmapPhase1Body:
    "Portfele, importy brokerskie, notowania, wykresy i pierwsze wyjaśnione AI na portfelu i pozycjach.",
  roadmapPhase2Title: "Teraz  -  głębsza inteligencja",
  roadmapPhase2Body: "Bogatsze modele soczewek, importy i widoki stresu portfela na mobile.",
  roadmapPhase3Title: "Następne  -  Android",
  roadmapPhase3Body: "To samo doświadczenie wielu brokerów na drugiej platformie.",
  roadmapPhase4Title: "Horyzont  -  skala i partnerstwa",
  roadmapPhase4Body:
    "Szersze klasy aktywów, partnerstwa danych i infrastruktura pod miliony portfeli detalicznych.",
  appStoreBadgeSmall: "Pobierz w",
  appStoreBadgeLarge: "App Store",
  appStoreBadgeAria: "Pobierz Alpha Investor z App Store",
};

const pl = JSON.parse(fs.readFileSync("messages/pl.json", "utf8"));
pl.Metadata.homeTitle = "Alpha Investor | Śledzenie i analiza portfela inwestycyjnego";
pl.Metadata.homeDescription =
  "Śledź i analizuj portfel akcji u wielu brokerów. Import pozycji, analityka portfela, dane na żywo i wyjaśnione AI na iOS.";
pl.Nav = {
  ...pl.Nav,
  platform: "Platforma",
  data: "Dane",
  brokers: "Brokerzy",
  security: "Bezpieczeństwo",
  product: "Produkt",
  joinWaitlist: "Wczesny dostęp",
  downloadApp: "Pobierz aplikację",
};
pl.Home = plHome;
pl.Form.title = "Wczesny dostęp";
pl.Form.subtitle = "iOS jest dostępny. Dołącz po termin Androida i większe aktualizacje.";
pl.Form.submit = "Wyślij zgłoszenie";
pl.Footer = {
  ...pl.Footer,
  contactHeading: "Kontakt",
  contactEmail: "privacy@alphainvestor.app",
  partnersEmail: "partners@alphainvestor.app",
  companyLine: "Operatorem jest Jakub Gruszczyk QBKSHOP (NIP 6423222018).",
  platform: "Platforma",
  data: "Dane",
  brokers: "Brokerzy",
  security: "Bezpieczeństwo",
  partners: "Partnerzy",
};
fs.writeFileSync("messages/pl.json", JSON.stringify(pl, null, 2) + "\n");
console.log("pl Home keys:", Object.keys(pl.Home).length);
