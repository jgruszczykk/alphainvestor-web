import fs from "fs";

const enPath = new URL("../messages/en.json", import.meta.url).pathname;
const plPath = new URL("../messages/pl.json", import.meta.url).pathname;
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const pl = JSON.parse(fs.readFileSync(plPath, "utf8"));

pl.Metadata.homeTitle = "Alpha Investor | Śledzenie i analityka portfela";
pl.Metadata.homeDescription =
  "Śledź portfel, rozumiej zmiany i podejmuj lepsze decyzje inwestycyjne. Import brokerów, analityka i wnioski na iOS.";

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
  heroProof1: "Śledzenie portfela",
  heroProof2: "Analityka",
  heroProof3: "Wnioski",
  subhead:
    "Śledź portfel, rozumiej co się zmieniło i podejmuj lepsze decyzje inwestycyjne.",
  heroPrimaryCta: "Wczesny dostęp",
  heroSecondaryCta: "Dowiedz się więcej",
  importsTitle: "Zaimportuj portfel w kilka minut",
  importsIntro:
    "Wgraj eksport z brokera i od razu zacznij śledzić inwestycje.",
  importsStep1Title: "Wgraj plik",
  importsStep1Body: "Eksport z brokera—pozycje mapujemy automatycznie.",
  importsStep2Title: "Portfel utworzony",
  importsStep2Body: "Pozycje w jednej księdze.",
  importsStep3Title: "Analityka dostępna",
  importsStep3Body: "Alokacja, wynik i wnioski od razu po imporcie.",
  brokerCsv: "Import CSV",
  whyNowIntro:
    "Więcej aplikacji i notowań niż kiedykolwiek—prawda o portfelu bez kontekstu Twojej księgi.",
  whyNowProblem1Body: "Więcej ekranów. Księga nadal rozproszona między kontami.",
  whyNowProblem2Body: "Brak jednego widoku ekspozycji, koncentracji i wyniku.",
  whyNowProblem3Body: "Same liczby nie mówią, na czym się skupić.",
  whyNowResolution:
    "Alpha Investor łączy importy, dane rynkowe i wyjaśnioną analitykę na portfelu, który faktycznie masz.",
  platformTitle: "Śledzenie i analiza portfela",
  platformIntro: "Jedna księga z eksportów brokerów—not lista obserwowanych.",
  platformPillar1Body: "Import z plików. Bez haseł do brokera.",
  platformPillar2Body: "Notowania i dane referencyjne dla każdej pozycji.",
  platformPillar3Body: "Alokacja, ryzyko i sygnały na Twoich wagach.",
  dataIntro:
    "Licencjonowane API danych zasilają notowania, fundamenty i walidację symboli.",
  dataFooterLine:
    "Nie odsprzedajemy surowych danych. Licencjonowane feedy zasilają portfolio intelligence.",
  engineTitle: "Portfolio intelligence",
  engineIntro: "Analityka na realnych wagach—not lista obserwowanych.",
  engineAiTitle: "Wyjaśnione wnioski",
  engineAiBody: "Co się zmieniło, dlaczego i które czynniki to napędzały.",
  diffTitle: "Więcej niż tracker portfela",
  diffPoint1: "Śledź pozycje",
  diffPoint2: "Rozumiej jakość portfela",
  diffPoint3: "Odkrywaj, co zasługuje na uwagę",
  benefitsTitle: "Dla aktywnych inwestorów",
  benefitsIntro: "Gdy zarządzasz realnym kapitałem u wielu brokerów.",
  trustTitle: "Zaufanie i dane",
  trustIntro: "Wrażliwe dane portfela—projekt tak, byś zachował kontrolę.",
  trustSecurityBody: "Bez haseł do brokera i OAuth do handlu.",
  trustPrivacyBody: "Bez trenowania publicznych modeli na Twoim portfelu.",
  trustProcessingBody: "Import z myślą o prywatności; parsing na urządzeniu, gdzie możliwe.",
  trustPrivacyCta: "Polityka prywatności",
  scaleIntro:
    "Wczesny etap—infrastruktura pod rosnącą liczbę importów i obciążeń danych.",
  scaleBullet1: "Wielu brokerów i walut",
  scaleBullet2: "Globalne akcje i ETF-y",
  scaleBullet3: "Dane i analityka w skali synchronizacji",
  stepsTitle: "Jak to działa",
  step1Title: "Zaimportuj księgę",
  step1Body: "Eksport brokera lub pozycje ręcznie.",
  step2Title: "Wzbogacamy pozycje",
  step2Body: "Licencjonowane notowania i walidacja po stronie serwera.",
  step3Title: "Przejrzyj wnioski",
  step3Body: "Widok portfela i pozycji—decyzja należy do Ciebie.",
  pricingTitle: "Plany",
  pricingTagline: "10 USD/mies. za pełną warstwę AI na portfelu.",
  pricingCtaPrimary: "Wczesny dostęp",
  pricingCtaSecondary: "Dowiedz się więcej",
  screensTitle: "Zobacz portfel wyraźnie",
  screensIntro: "",
  galleryPortfolioInsightTitle: "Wniosek o portfelu",
  galleryWalletAllocationTitle: "Alokacja",
  galleryChartTitle: "Wykresy",
  galleryFiveLensesTitle: "Pięć soczewek",
  galleryFundamentalsTitle: "Fundamenty",
  faq1A: "Nie. Tylko oprogramowanie i edukacja—decyzje handlowe i podatkowe podejmujesz Ty.",
  faq2A: "Eksport z brokera i import w aplikacji. Bez logowania do brokera.",
  faq3A: "XTB, IBKR, DEGIRO, Trading 212, Revolut i CSV—więcej w czasie.",
  faq5A: "Wyjaśnione odczyty Twojej księgi. Alpha Pro dodaje pełną warstwę.",
  faq7A: "Free do podstawowego śledzenia. Alpha Pro to 10 USD/mies. w App Store.",
  faq8A: "Nie. Wnioski tylko dla Twojego konta.",
  faq9A: "Okazjonalny mail o produkcie. Wypisz się w każdej chwili.",
  faq10A: "Nie. Nie przechowujemy aktywów ani nie składamy zleceń.",
  faq12A: "Import z myślą o prywatności i wnioski w zakresie konta. Zobacz Politykę prywatności.",
  ctaTitle: "Zacznij od realnego portfela",
  ctaSub: "Pobierz na iOS lub dołącz do wczesnego dostępu po aktualizacje.",
  disclaimer:
    "To nie porada inwestycyjna, podatkowa ani prawna. Zweryfikuj wszystko, co zmieni Twoje decyzje.",
  roadmapIntro: "Dokąd zmierza platforma.",
  roadmapFootnote: "Tylko kierunek—bez zobowiązań ani dat.",
  roadmapPhase1Title: "Śledzenie portfela",
  roadmapPhase1Body: "Na iOS: zunifikowane księgi, notowania i wynik.",
  roadmapPhase2Title: "Łączność z brokerami",
  roadmapPhase2Body: "Więcej brokerów i płynniejsze importy między kontami.",
  roadmapPhase3Title: "Portfolio intelligence",
  roadmapPhase3Body: "Alokacja, ryzyko i wyjaśniona analityka na całej księdze.",
  roadmapPhase4Title: "Workflow badawczy",
  roadmapPhase4Body: "Głębszy research na Twoim portfelu—not generyczne ekrany.",
  roadmapPhase5Title: "Investment operating system",
  roadmapPhase5Body: "Śledzenie i analiza multi-broker zbudowane pod skalę.",
  appStoreBadgeSmall: "Pobierz w",
  appStoreBadgeLarge: "App Store",
  appStoreBadgeAria: "Pobierz Alpha Investor z App Store",
};

pl.Home = homePl;
fs.writeFileSync(plPath, `${JSON.stringify(pl, null, 2)}\n`);
console.log("pl Home keys:", Object.keys(pl.Home).length);
