/**
 * Single source of marketing copy for the rebuilt landing (EN + PL parity).
 * Consumed by components under `components/site/**` via `getSiteContent(locale)`.
 * The waitlist form, language switcher and legal pages keep using next-intl
 * message JSON — this module only backs the new marketing home.
 */

export type Locale = "en" | "pl";

const en = {
  nav: {
    features: "Features",
    tour: "Product",
    lenses: "Five Lenses",
    pricing: "Pricing",
    faq: "FAQ",
    cta: "Join Early Access",
    menu: "Menu",
  },
  hero: {
    eyebrow: "Portfolio tracking & analytics · iOS",
    titleA: "See your whole",
    titleB: "investing picture",
    titleC: "in one place.",
    sub: "Import from your broker, track every portfolio, and understand what changed — with market-backed data and AI insights built for learning, not hype.",
    ctaPrimary: "Join Early Access",
    ctaSecondary: "See how it works",
    note: "Free to start · iOS · English & Polish",
  },
  trust: {
    items: ["Broker file imports", "Licensed market data", "Privacy-first", "Not investment advice"],
  },
  tour: {
    eyebrow: "A guided tour",
    title: "Everything your portfolio needs, one clean screen at a time.",
    sub: "Scroll to walk through the app — from your unified wallet to explained AI insights.",
    steps: [
      {
        tag: "Wallet",
        title: "Your whole net worth, one dashboard",
        body: "Every portfolio in a single view: historical value, total P/L, and market value — no spreadsheets, no tab overload.",
      },
      {
        tag: "Allocation",
        title: "See how you're really split",
        body: "Allocation by portfolio and sector, a plain-language health score, and your largest holdings surfaced instantly.",
      },
      {
        tag: "Instrument",
        title: "Every price, chart, and indicator",
        body: "Full price history with RSI and MACD stacked right below the chart — the same read professionals use, explained in plain language.",
      },
    ],
  },
  features: {
    eyebrow: "Built for clarity",
    title: "The calm dashboard for serious portfolios",
    sub: "Track, understand, and learn from the money you actually hold — across brokers, currencies and asset types.",
    cards: [
      { title: "Multi-portfolio wallet", body: "Brokerage, crypto and metals books side by side, aggregated into one net-worth view." },
      { title: "Positions with real snapshots", body: "Add holdings with buy date, cost and fees — quotes prefill where data exists. Quote-aware P/L." },
      { title: "Allocation & health", body: "Break down by sector and instrument type, with a health score that flags concentration in plain words." },
      { title: "Historical value charts", body: "Portfolio value over 1W to 5Y, rebuilt from your ledger — cash and positions over time." },
      { title: "Watchlist & instruments", body: "Search by ticker or name, follow symbols, and open full instrument screens with charts and context." },
      { title: "Market news", body: "General headlines with source and time — tap through to read, without the doomscroll." },
      { title: "Customizable layout", body: "Choose which cards appear and in what order. Your layout syncs to your account." },
      { title: "English & Polish", body: "A fully localized interface, light or dark, tuned for how you actually read numbers." },
    ],
  },
  lenses: {
    eyebrow: "Portfolio Insight",
    title: "Your whole wallet, read in four dimensions",
    sub: "Tape, diversification, concentration and breadth — the same deterministic read behind every insight, scored on your real weights, not a single holding cherry-picked to look good.",
    items: [
      { name: "Tape", score: 4, tone: "gain", label: "Risk-on tape" },
      { name: "Diversification", score: 5, tone: "gain", label: "Well spread" },
      { name: "Concentration", score: 2, tone: "gain", label: "Lower concentration" },
      { name: "Breadth", score: 5, tone: "gain", label: "Many drivers" },
    ],
    footnote: "Educational scoring — not a recommendation to buy, sell, or hold.",
  },
  video: {
    eyebrow: "See it move",
    title: "A minute inside Alpha Investor",
    sub: "Real screen capture from the iOS app — import, wallet, allocation and insights in motion.",
  },
  gallery: {
    eyebrow: "Real screens",
    title: "The actual app, not a render",
    sub: "Straight from the iOS build — every number here is computed from a real imported portfolio.",
    shots: [
      { src: "/marketing/screens/wallet-value.png", caption: "Wallet — historical value & P/L" },
      { src: "/marketing/screens/wallet-allocation.png", caption: "Allocation & health score" },
      { src: "/marketing/screens/portfolio-insight.png", caption: "AI portfolio insight" },
      { src: "/marketing/screens/five-lenses.png", caption: "Five lenses, per holding" },
      { src: "/marketing/screens/instrument-chart.png", caption: "Instrument detail & charts" },
      { src: "/marketing/screens/news.png", caption: "Market news feed" },
    ],
  },
  imports: {
    eyebrow: "Import in minutes",
    title: "Start with the portfolio you already have",
    sub: "Export a file from your broker and we map the positions automatically — no trading passwords, ever.",
    steps: [
      { title: "Upload your broker file", body: "Export from your broker — we read positions and sell history." },
      { title: "Portfolio created", body: "Your holdings appear in one unified book, with cost basis and history." },
      { title: "Analytics turn on", body: "Allocation, performance, lenses and insights light up instantly." },
    ],
    brokers: ["XTB", "Interactive Brokers", "DEGIRO", "Trading 212", "Revolut", "Custom CSV"],
  },
  ai: {
    eyebrow: "Alpha Pro",
    title: "AI that explains, instead of shouting",
    sub: "Alpha Pro turns your real weights into plain-language context: what deserves attention, why it matters, and which factors drove it. Always framed as education — never a trade signal.",
    bullets: [
      "Portfolio insight on your actual concentration and diversification",
      "Per-holding lens rationale with the numbers behind each score",
      "Coaching hints on allocation, KPIs and optimizer scenarios",
      "New premium features first",
    ],
    disclaimer: "Educational software only — not investment, tax, or legal advice. No return promises.",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Free core tracking. Pro adds the intelligence.",
    sub: "The best free portfolio tracker on your phone — upgrade in-app when you want the full explained layer.",
    free: {
      name: "Free",
      price: "$0",
      period: "",
      badge: "",
      features: [
        "Unlimited portfolios, positions & imports",
        "Quotes, value charts & allocation",
        "Watchlist, news & instrument details",
        "Health score & a first full AI insight",
      ],
      cta: "Join Early Access",
    },
    pro: {
      name: "Alpha Pro",
      price: "$9.99",
      period: "/ month",
      yearly: "or $59.99 / year — save 50%",
      badge: "Full AI",
      features: [
        "Full portfolio & instrument AI insight",
        "All five lenses with rationale",
        "Coaching on allocation, KPIs & optimizer",
        "Market scanner, compare & morning brief",
      ],
      cta: "Join Early Access",
    },
    footnote: "7-day free trial. Subscribe in the iOS app; cancel anytime in device settings.",
    trialNote: "Free trial on both plans",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered",
    items: [
      { q: "Can I import portfolios from my broker?", a: "Yes. Export positions from your broker and import the file in the app. No broker login or trading passwords required." },
      { q: "Is this a broker? Can I trade?", a: "No. Alpha Investor never executes trades or holds custody of your assets. It helps you track, understand and learn." },
      { q: "Is the AI financial advice?", a: "No. AI outputs are educational and informational — context on your own holdings. Always do your own research or consult a professional." },
      { q: "How is my portfolio data handled?", a: "Imports are privacy-first and scoped to your account. We don't train public models on your holdings. See our Privacy policy for details." },
      { q: "Which markets are supported?", a: "Major US and European listings today, plus crypto and metals, with broader coverage as imports and symbol validation expand." },
      { q: "How does pricing work?", a: "Free covers portfolios, quotes and charts. Alpha Pro is $9.99/month (or $59.99/year) in the App Store for the full explained intelligence layer, with a 7-day trial." },
      { q: "Is Android coming?", a: "iOS is first. Android is on the roadmap — join early access for timing." },
    ],
  },
  finalCta: {
    title: "Start with your real portfolio",
    sub: "Join early access for launch timing, Android news, and major releases.",
    consent: "By joining, you agree we may email you about the product. See",
    consentLink: "Privacy",
    disclaimer: "Not investment, tax, or legal advice. Verify anything that would change your money.",
  },
  showcase: {
    news: {
      eyebrow: "Market news",
      title: "Headlines, without the doomscroll",
      body: "General market news with source and time, scrollable right in the app — tap through to read in your browser when a headline actually matters.",
      stat: "Live",
      statLabel: "feed, every session",
    },
    optimizer: {
      eyebrow: "Portfolio Optimizer",
      title: "See the trade-off before you make it",
      body: "Simulate rebalance scenarios — balanced, defensive, growth — and watch concentration and top-holding weight shift in real time. Simulation only; nothing executes.",
      bullets: [
        "Illustrative, step-by-step rebalance walkthroughs",
        "Top holding & top-3 concentration, before vs. after",
        "“Why this matters” context on every step",
      ],
    },
    scanner: {
      eyebrow: "Market Scanner · Alpha Pro",
      title: "Scan the market with your portfolio in mind",
      body: "500 ranked results, aware of what you already hold — not a generic screener. Save your own presets and revisit them anytime.",
      stat: "500",
      statLabel: "ranked results, portfolio-aware",
    },
    compare: {
      eyebrow: "Compare · Alpha Pro",
      title: "Four instruments. Every metric. One screen.",
      body: "Line up valuation, growth, margins and beta side by side, then check how correlated they really are before you add another position.",
      stat: "4-way",
      statLabel: "compare + correlation matrix",
    },
    alphaScore: {
      eyebrow: "Alpha Score · Alpha Pro",
      title: "One score, every pillar, fully explained",
      body: "Quality, distress, profitability and leverage rolled into one /100 number — with the full pillar breakdown behind it, citing the actual model (Piotroski F-Score, Altman Z) instead of a bare badge.",
      bullets: [
        "Full pillar breakdown, not just the headline number",
        "Real citations: Piotroski F-Score, Altman Z, ROE/ROA/margin, D/E/CR",
        "Same scale on every holding you own",
      ],
    },
    technicalLenses: {
      eyebrow: "Technical Lenses · Alpha Pro",
      title: "Trend, structure and levels — read for you",
      body: "The same technical read a chartist would do by hand: trend direction, moving-average structure, and support/resistance — with an honest “insufficient data” instead of a guess when inputs are missing.",
      bullets: [
        "Trend, Structure, Levels and Volume, per instrument",
        "Plain-language label plus the numbers behind every read",
        "Never fakes a score — shows “—” when data is missing",
      ],
    },
  },
  more: {
    eyebrow: "And there's more",
    title: "Everything else that comes standard",
    items: [
      { title: "Multi-asset", body: "Brokerage, crypto and metals — one wallet." },
      { title: "Morning brief", body: "A personal push digest before markets open." },
      { title: "Watchlist", body: "Track symbols, reorder, jump to detail fast." },
      { title: "App Lock", body: "Face ID / passcode gate on sensitive screens." },
      { title: "Data export", body: "Your data, exportable, on your terms." },
      { title: "Customizable layout", body: "Choose which cards show, and where." },
      { title: "Splits handled", body: "Ratios applied automatically, cost basis intact." },
      { title: "English & Polish", body: "A fully localized interface, not a translation layer." },
      { title: "Light & dark", body: "Tuned for how you actually read numbers." },
    ],
  },
  footer: {
    tagline: "Portfolio clarity for serious investors and curious beginners alike.",
    rights: "All rights reserved.",
    notAdvice: "Not financial advice.",
    company: "Operated by Jakub Gruszczyk QBKSHOP (NIP 6423222018).",
    cols: {
      product: { heading: "Product", links: [] as { label: string; href: string }[] },
      legal: { heading: "Legal" },
    },
  },
  appStore: { small: "Download on the", large: "App Store", aria: "Download Alpha Investor on the App Store" },
};

type SiteContent = typeof en;

const pl: SiteContent = {
  nav: {
    features: "Funkcje",
    tour: "Produkt",
    lenses: "Pięć soczewek",
    pricing: "Cennik",
    faq: "FAQ",
    cta: "Dołącz do Early Access",
    menu: "Menu",
  },
  hero: {
    eyebrow: "Śledzenie i analityka portfela · iOS",
    titleA: "Zobacz cały swój",
    titleB: "obraz inwestycji",
    titleC: "w jednym miejscu.",
    sub: "Zaimportuj z brokera, śledź każdy portfel i rozumiej, co się zmieniło — z licencjonowanymi danymi rynkowymi i AI stworzonym do nauki, nie do szumu.",
    ctaPrimary: "Dołącz do Early Access",
    ctaSecondary: "Zobacz, jak działa",
    note: "Start za darmo · iOS · Polski i angielski",
  },
  trust: {
    items: ["Import plików z brokera", "Licencjonowane dane rynkowe", "Prywatność przede wszystkim", "To nie porada inwestycyjna"],
  },
  tour: {
    eyebrow: "Przewodnik",
    title: "Wszystko, czego potrzebuje portfel — jeden czysty ekran po drugim.",
    sub: "Przewiń, by przejść przez aplikację — od zunifikowanego portfela po wyjaśnione insighty AI.",
    steps: [
      {
        tag: "Portfel",
        title: "Cały majątek na jednym pulpicie",
        body: "Każdy portfel w jednym widoku: historia wartości, całkowite P/L i wartość rynkowa — bez arkuszy i chaosu zakładek.",
      },
      {
        tag: "Alokacja",
        title: "Zobacz, jak naprawdę jesteś podzielony",
        body: "Alokacja wg portfela i sektora, health score w prostych słowach oraz największe pozycje od razu na wierzchu.",
      },
      {
        tag: "Instrument",
        title: "Każda cena, wykres i wskaźnik",
        body: "Pełna historia ceny z RSI i MACD tuż pod wykresem — ten sam odczyt, którego używają profesjonaliści, wyjaśniony prostym językiem.",
      },
    ],
  },
  features: {
    eyebrow: "Zbudowane dla jasności",
    title: "Spokojny pulpit dla poważnych portfeli",
    sub: "Śledź, rozumiej i ucz się na pieniądzach, które faktycznie masz — między brokerami, walutami i klasami aktywów.",
    cards: [
      { title: "Portfel wielu portfeli", body: "Konta maklerskie, krypto i metale obok siebie, zsumowane w jeden widok majątku." },
      { title: "Pozycje z realnym snapshotem", body: "Dodawaj pozycje z datą zakupu, kosztem i opłatami — kursy podpowiadane, gdy są dane. P/L świadome notowań." },
      { title: "Alokacja i zdrowie", body: "Rozbicie wg sektora i typu instrumentu, z health score, który wskazuje koncentrację prostym językiem." },
      { title: "Wykresy historii wartości", body: "Wartość portfela od 1T do 5L, odtworzona z księgi — gotówka i pozycje w czasie." },
      { title: "Watchlista i instrumenty", body: "Szukaj po tickerze lub nazwie, obserwuj symbole i otwieraj pełne ekrany instrumentów z wykresami i kontekstem." },
      { title: "Wiadomości rynkowe", body: "Ogólne nagłówki ze źródłem i czasem — wejdź i przeczytaj, bez doomscrollingu." },
      { title: "Konfigurowalny układ", body: "Wybierz, które karty i w jakiej kolejności. Układ synchronizuje się z kontem." },
      { title: "Polski i angielski", body: "W pełni zlokalizowany interfejs, jasny lub ciemny, dopasowany do tego, jak czytasz liczby." },
    ],
  },
  lenses: {
    eyebrow: "Portfolio Insight",
    title: "Cały portfel, odczytany w czterech wymiarach",
    sub: "Tape, dywersyfikacja, koncentracja i szerokość — ten sam deterministyczny odczyt stojący za każdym insightem, liczony na Twoich realnych wagach, nie na jednej wybranej pozycji.",
    items: [
      { name: "Tape", score: 4, tone: "gain", label: "Rynek risk-on" },
      { name: "Dywersyfikacja", score: 5, tone: "gain", label: "Dobrze rozłożony" },
      { name: "Koncentracja", score: 2, tone: "gain", label: "Niższa koncentracja" },
      { name: "Szerokość", score: 5, tone: "gain", label: "Wiele czynników" },
    ],
    footnote: "Ocena edukacyjna — nie jest rekomendacją kupna, sprzedaży ani trzymania.",
  },
  video: {
    eyebrow: "Zobacz w ruchu",
    title: "Minuta wewnątrz Alpha Investor",
    sub: "Prawdziwe nagranie ekranu z aplikacji iOS — import, portfel, alokacja i insighty w ruchu.",
  },
  gallery: {
    eyebrow: "Prawdziwe ekrany",
    title: "Realna aplikacja, nie render",
    sub: "Prosto z builda iOS — każda liczba tutaj jest policzona z realnie zaimportowanego portfela.",
    shots: [
      { src: "/marketing/screens/wallet-value.png", caption: "Portfel — historia wartości i P/L" },
      { src: "/marketing/screens/wallet-allocation.png", caption: "Alokacja i health score" },
      { src: "/marketing/screens/portfolio-insight.png", caption: "Insight AI portfela" },
      { src: "/marketing/screens/five-lenses.png", caption: "Pięć soczewek, na pozycję" },
      { src: "/marketing/screens/instrument-chart.png", caption: "Szczegóły instrumentu i wykresy" },
      { src: "/marketing/screens/news.png", caption: "Wiadomości rynkowe" },
    ],
  },
  imports: {
    eyebrow: "Import w minuty",
    title: "Zacznij od portfela, który już masz",
    sub: "Wyeksportuj plik z brokera, a my zmapujemy pozycje automatycznie — nigdy bez haseł do handlu.",
    steps: [
      { title: "Wgraj plik z brokera", body: "Eksport z brokera — czytamy pozycje i historię sprzedaży." },
      { title: "Portfel utworzony", body: "Twoje pozycje trafiają do jednej księgi, z kosztem i historią." },
      { title: "Analityka włączona", body: "Alokacja, wyniki, soczewki i insighty zapalają się od razu." },
    ],
    brokers: ["XTB", "Interactive Brokers", "DEGIRO", "Trading 212", "Revolut", "Własny CSV"],
  },
  ai: {
    eyebrow: "Alpha Pro",
    title: "AI, które wyjaśnia, zamiast krzyczeć",
    sub: "Alpha Pro zamienia Twoje realne wagi w kontekst prostym językiem: co zasługuje na uwagę, dlaczego to ważne i które czynniki zadecydowały. Zawsze jako edukacja — nigdy jako sygnał transakcyjny.",
    bullets: [
      "Insight portfela o realnej koncentracji i dywersyfikacji",
      "Uzasadnienie soczewek na pozycję z liczbami w tle",
      "Wskazówki coachingowe do alokacji, KPI i optymalizatora",
      "Nowe funkcje premium jako pierwszy",
    ],
    disclaimer: "Oprogramowanie wyłącznie edukacyjne — nie porada inwestycyjna, podatkowa ani prawna. Bez obietnic zysku.",
  },
  pricing: {
    eyebrow: "Cennik",
    title: "Darmowy tracker. Pro dodaje inteligencję.",
    sub: "Najlepszy darmowy tracker portfela w telefonie — ulepsz w aplikacji, gdy zechcesz pełną warstwę wyjaśnień.",
    free: {
      name: "Darmowy",
      price: "0 zł",
      period: "",
      badge: "",
      features: [
        "Portfele, pozycje i importy bez limitu",
        "Notowania, wykresy wartości i alokacja",
        "Watchlista, wiadomości i szczegóły instrumentu",
        "Health score i pierwszy pełny insight AI",
      ],
      cta: "Dołącz do Early Access",
    },
    pro: {
      name: "Alpha Pro",
      price: "44,99 zł",
      period: "/ mies.",
      yearly: "lub 269,99 zł / rok — oszczędzasz 50%",
      badge: "Pełne AI",
      features: [
        "Pełny insight AI portfela i instrumentu",
        "Wszystkie pięć soczewek z uzasadnieniem",
        "Coaching alokacji, KPI i optymalizatora",
        "Skaner rynku, porównywarka i poranny brief",
      ],
      cta: "Dołącz do Early Access",
    },
    footnote: "7 dni za darmo. Subskrypcja w aplikacji iOS; anuluj kiedy chcesz w ustawieniach urządzenia.",
    trialNote: "Trial na obu planach",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Odpowiedzi na pytania",
    items: [
      { q: "Czy mogę zaimportować portfele z brokera?", a: "Tak. Wyeksportuj pozycje z brokera i zaimportuj plik w aplikacji. Bez logowania do brokera i haseł do handlu." },
      { q: "Czy to broker? Czy mogę handlować?", a: "Nie. Alpha Investor nie wykonuje transakcji ani nie przechowuje Twoich aktywów. Pomaga śledzić, rozumieć i uczyć się." },
      { q: "Czy AI to porada finansowa?", a: "Nie. Wyniki AI są edukacyjne i informacyjne — kontekst na Twoich własnych pozycjach. Zawsze rób własny research lub skonsultuj się z profesjonalistą." },
      { q: "Jak traktowane są dane mojego portfela?", a: "Importy są prywatne i przypisane do Twojego konta. Nie trenujemy publicznych modeli na Twoich pozycjach. Szczegóły w Polityce prywatności." },
      { q: "Jakie rynki są wspierane?", a: "Główne listingi z USA i Europy, a także krypto i metale, z szerszym pokryciem w miarę rozwoju importów i walidacji symboli." },
      { q: "Jak działa cennik?", a: "Darmowy obejmuje portfele, notowania i wykresy. Alpha Pro to 44,99 zł/mies. (lub 269,99 zł/rok) w App Store za pełną warstwę wyjaśnień, z 7-dniowym trialem." },
      { q: "Czy będzie Android?", a: "iOS jest pierwszy. Android jest w planach — dołącz do early access po termin." },
    ],
  },
  finalCta: {
    title: "Zacznij od swojego realnego portfela",
    sub: "Dołącz do early access po termin startu, wieści o Androidzie i najważniejsze wydania.",
    consent: "Dołączając, zgadzasz się, że możemy wysyłać Ci e-maile o produkcie. Zobacz",
    consentLink: "Prywatność",
    disclaimer: "To nie porada inwestycyjna, podatkowa ani prawna. Zweryfikuj wszystko, co wpłynęłoby na Twoje pieniądze.",
  },
  showcase: {
    news: {
      eyebrow: "Wiadomości rynkowe",
      title: "Nagłówki, bez doomscrollingu",
      body: "Ogólne wiadomości rynkowe ze źródłem i czasem, przewijalne wprost w aplikacji — otwórz w przeglądarce, gdy nagłówek naprawdę ma znaczenie.",
      stat: "Na żywo",
      statLabel: "feed, w każdej sesji",
    },
    optimizer: {
      eyebrow: "Portfolio Optimizer",
      title: "Zobacz kompromis, zanim go zrobisz",
      body: "Symuluj scenariusze rebalansu — zbalansowany, defensywny, wzrostowy — i obserwuj jak zmienia się koncentracja i waga największej pozycji w czasie rzeczywistym. Tylko symulacja; nic się nie wykonuje.",
      bullets: [
        "Ilustracyjne, krok po kroku scenariusze rebalansu",
        "Największa pozycja i top-3 koncentracja, przed i po",
        "Kontekst „dlaczego to ważne” przy każdym kroku",
      ],
    },
    scanner: {
      eyebrow: "Skaner rynku · Alpha Pro",
      title: "Skanuj rynek z Twoim portfelem w tle",
      body: "500 rankowanych wyników, świadomych tego, co już masz — nie generyczny screener. Zapisuj własne presety i wracaj do nich kiedy chcesz.",
      stat: "500",
      statLabel: "rankowanych wyników, portfolio-aware",
    },
    compare: {
      eyebrow: "Porównywarka · Alpha Pro",
      title: "Cztery instrumenty. Każda metryka. Jeden ekran.",
      body: "Zestaw wycenę, wzrost, marże i betę obok siebie, a potem sprawdź jak bardzo są skorelowane, zanim dodasz kolejną pozycję.",
      stat: "4×",
      statLabel: "porównanie + macierz korelacji",
    },
    alphaScore: {
      eyebrow: "Alpha Score · Alpha Pro",
      title: "Jeden wynik, każdy filar, w pełni wyjaśniony",
      body: "Jakość, zagrożenie upadłością, rentowność i dźwignia zwinięte w jedną liczbę /100 — z pełnym rozkładem filarów i realnymi cytowaniami modelu (Piotroski F-Score, Altman Z) zamiast gołej odznaki.",
      bullets: [
        "Pełny rozkład filarów, nie tylko główna liczba",
        "Realne cytowania: Piotroski F-Score, Altman Z, ROE/ROA/marża, D/E/CR",
        "Ta sama skala na każdej posiadanej pozycji",
      ],
    },
    technicalLenses: {
      eyebrow: "Technical Lenses · Alpha Pro",
      title: "Trend, struktura i poziomy — odczytane za Ciebie",
      body: "Ten sam odczyt techniczny, który chartista zrobiłby ręcznie: kierunek trendu, struktura średnich kroczących i wsparcie/opór — z uczciwym „brak danych” zamiast zgadywania, gdy dane wejściowe są niekompletne.",
      bullets: [
        "Trend, Struktura, Poziomy i Wolumen, na instrument",
        "Etykieta prostym językiem plus liczby w tle każdego odczytu",
        "Nigdy nie udaje wyniku — pokazuje „—”, gdy brakuje danych",
      ],
    },
  },
  more: {
    eyebrow: "I jeszcze więcej",
    title: "Wszystko inne w standardzie",
    items: [
      { title: "Wiele klas aktywów", body: "Maklerskie, krypto i metale — jeden portfel." },
      { title: "Poranny brief", body: "Osobisty digest push przed otwarciem rynków." },
      { title: "Watchlist", body: "Śledź symbole, zmieniaj kolejność, szybki dostęp." },
      { title: "App Lock", body: "Face ID / kod dostępu na wrażliwych ekranach." },
      { title: "Eksport danych", body: "Twoje dane, eksportowalne, na Twoich zasadach." },
      { title: "Konfigurowalny układ", body: "Wybierz, które karty i gdzie." },
      { title: "Splity obsłużone", body: "Współczynniki stosowane automatycznie, koszt zachowany." },
      { title: "Polski i angielski", body: "W pełni zlokalizowany interfejs, nie warstwa tłumaczenia." },
      { title: "Jasny i ciemny", body: "Dopasowany do tego, jak czytasz liczby." },
    ],
  },
  footer: {
    tagline: "Jasność portfela dla poważnych inwestorów i ciekawych początkujących.",
    rights: "Wszelkie prawa zastrzeżone.",
    notAdvice: "To nie porada finansowa.",
    company: "Prowadzone przez Jakub Gruszczyk QBKSHOP (NIP 6423222018).",
    cols: {
      product: { heading: "Produkt", links: [] },
      legal: { heading: "Prawne" },
    },
  },
  appStore: { small: "Pobierz z", large: "App Store", aria: "Pobierz Alpha Investor z App Store" },
};

const dict = { en, pl };

export function getSiteContent(locale: string): SiteContent {
  return locale === "pl" ? pl : dict.en;
}
