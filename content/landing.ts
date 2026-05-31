/**
 * English marketing copy - source deck for product messaging.
 * Keep `messages/en.json` → `Home` (and related keys) aligned with this file;
 * Polish lives only in `messages/pl.json`.
 */
export const landingHome = {
  skipToContent: "Skip to content",
  eyebrow: "Portfolio intelligence platform · iOS",
  headline:
    "Investment portfolio tracking and analysis — built for serious retail investors.",
  subhead:
    "Import holdings from leading brokers, enrich every position with licensed market data, and get explained portfolio analytics and AI insights on mobile — without sharing broker passwords.",
  heroTertiaryCta: "See platform overview",
  heroPrimaryCta: "Request early access",
  heroSecondaryCta: "See how imports work",
  heroImageAlt:
    "Alpha Investor screen showing five lenses: trend, valuation, risk, growth, and momentum.",
  heroDeckWalletAlt: "Portfolio view with allocation and performance.",
  heroDeckChartAlt: "Instrument detail with chart and performance.",
  trustItem1: "Broker file imports",
  trustItem2: "Licensed market data",
  trustItem3: "Privacy-first",
  trustItem4: "Not investment advice",
  trustBrokersLine:
    "XTB, Interactive Brokers, Degiro, Trading 212, Revolut, Robinhood, mBank eMakler, and generic CSV/Excel.",
  platformTitle: "One portfolio intelligence engine",
  platformIntro:
    "Alpha Investor is not a watchlist app. It is infrastructure that turns fragmented broker exports into a single, analyzable book.",
  platformPillar1Title: "Connect your brokers",
  platformPillar1Body:
    "Import open positions and history from broker exports. No live broker credentials — your files are processed with privacy-first controls.",
  platformPillar2Title: "Enrich with market data",
  platformPillar2Body:
    "Server-side quotes, reference fields, and symbol validation power charts and analytics for every holding.",
  platformPillar3Title: "Understand with explained insights",
  platformPillar3Body:
    "Allocation, performance, risk lenses, and AI readouts weighted to your actual portfolio — every signal with reasoning.",
  platformCta: "See how imports work",
  dataTitle: "Built on market data infrastructure",
  dataIntro:
    "Every portfolio drives sustained API consumption: symbol resolution, live and historical pricing, and fundamentals-style reference data for analytics and AI context.",
  dataBullet1: "Batch quote and reference lookups per portfolio sync",
  dataBullet2:
    "Symbol validation across US, European, and other listed markets (via exchange-qualified tickers)",
  dataBullet3: "Fundamentals-style fields feeding valuation and lens scores",
  dataBullet4: "Designed for high-cardinality retail portfolios — many symbols, many users",
  dataPartnerCta: "Data & API partnerships",
  brokersTitle: "Broker connectivity without password sharing",
  brokersIntro:
    "Retail investors hold assets across multiple brokers. Alpha Investor ingests export files — not brokerage API credentials — to unify the book.",
  brokersCallout:
    "Files are processed on-device where possible; we never ask for your broker login.",
  brokersMore: "More via CSV/Excel",
  brokerXtb: "XTB",
  brokerIbkr: "Interactive Brokers",
  brokerDegiro: "Degiro",
  brokerT212: "Trading 212",
  brokerRevolut: "Revolut",
  brokerRobinhood: "Robinhood",
  brokerMbank: "mBank eMakler",
  brokersCta: "Request early access",
  engineTitle: "Portfolio intelligence, not another charting app",
  engineIntro:
    "Wallet-level analytics, consistent scoring across holdings, and explained AI readouts — built for how you actually invest.",
  engineFeature1: "Wallet-level health, allocation, and performance",
  engineFeature2:
    "Five-lens scores (trend, valuation, risk, growth, momentum) with plain-English rationale",
  engineFeature3: "Instrument deep dives: chart, context, and explained signals in one scroll",
  engineFeature4: "Scenario tools to test allocation changes before you act",
  engineCta: "See the product",
  aiProBadge: "Alpha Pro",
  aiExplain: "You see what changed, why it matters, and where to focus next.",
  aiProHook: "No black box. Every signal is explained so you can decide with confidence.",
  aiPillar1Title: "What is this?",
  aiPillar1Body: "Explained analytics and AI readouts on top of your real portfolio weights.",
  aiPillar2Title: "Why it matters",
  aiPillar2Body: "You get context tied to your book — not isolated numbers or generic watchlists.",
  aiPillar3Title: "What should I do?",
  aiPillar3Body: "Use each explained signal to choose your next step — you stay in control.",
  benefitsTitle: "Why investors use Alpha Investor",
  benefitsIntro: "Outcomes that matter when you manage real money across brokers.",
  benefit1Title: "See total exposure across brokers",
  benefit1Body: "One view of allocation and performance when holdings live in multiple accounts.",
  benefit2Title: "Know concentration and allocation drift",
  benefit2Body: "Plain-language signals on mix and concentration — meant to inform, not panic.",
  benefit3Title: "Compare holdings on a consistent model",
  benefit3Body: "The same five-lens scale on every ticker with rationale you can scan in seconds.",
  benefit4Title: "Act on explained signals",
  benefit4Body: "Every score links to factors behind it — no black-box predictions or hype.",
  benefit5Title: "Mobile-first portfolio review",
  benefit5Body: "Charts, fundamentals-style context, and AI in one flow — not six browser tabs.",
  benefitsCtaWaitlist: "Request early access",
  securityTitle: "Security & privacy by design",
  securityIntro:
    "We are building portfolio software retail investors can trust with sensitive holdings data.",
  securityBullet1: "No broker credential collection — import via export files only",
  securityBullet2:
    "Portfolio insights generated for your account; we do not train public models on your book",
  securityBullet3: "Educational software only — not investment, tax, or legal advice",
  securityPrivacyCta: "Read privacy policy",
  securityAppNote: "In-app security and data handling are described in the Alpha Investor iOS app.",
  scaleTitle: "Built for scale",
  scaleIntro:
    "We are a small team today, building the data and import layer retail portfolio software will need at millions of users.",
  scaleBullet1: "Thousands of portfolios → millions of symbol lookups",
  scaleBullet2: "Multi-broker, multi-currency books",
  scaleBullet3: "Global equities and ETFs",
  scaleBullet4: "AI analytics layered on deterministic portfolio math",
  scaleCta: "Join the waitlist",
  featuresTitle: "What you can do",
  featuresIntro: "Portfolios, charts, and explained readouts in one steady flow.",
  feature1Title: "Wallet health & allocation",
  feature1Body: "Plain-language heads-up on mix and concentration across your book.",
  feature2Title: "Five lens scores",
  feature2Body:
    "Same scale on every ticker with a line of rationale — compare quickly without building your own factor sheet.",
  feature3Title: "Instrument deep dive",
  feature3Body:
    "Chart, performance, fundamentals-style context, and narrative readouts in one scroll.",
  feature4Title: "Portfolios, privacy, live data",
  feature4Body:
    "Multiple books and lots, server-backed quotes, and insights for your account only.",
  stepsTitle: "How it works",
  step1Title: "Import or add your book",
  step1Body:
    "Import a broker export (XTB, IBKR, Degiro, and more) or create a portfolio manually with your positions and base currency.",
  step2Title: "We enrich every holding",
  step2Body:
    "Charts, quotes, reference fields, and symbol validation pull from licensed market data on the server.",
  step3Title: "Review explained insights",
  step3Body:
    "Use wallet and per-name readouts as a brief: what looks stretched, what looks balanced — then decide on your terms.",
  pricingEyebrow: "Pricing",
  pricingTitle: "Plans for portfolio tracking and AI analytics",
  pricingTagline: "$10/month for the full explained intelligence layer on your portfolio.",
  pricingFreeName: "Free",
  pricingFreePrice: "$0",
  pricingFreeBullet1: "Portfolios, live quotes, and charts — without premium AI readouts.",
  pricingFreeBullet2: "Same account privacy — nothing is trained on your book for public models.",
  pricingFreeBullet3: "Upgrade under Settings → Subscription on iOS when you are ready.",
  pricingProName: "Alpha Pro",
  pricingProBadge: "Full AI",
  pricingProPrice: "$10",
  pricingProPeriod: "/ month",
  pricingProBullet1: "Wallet + every holding narrated off YOUR weights — not a generic watchlist.",
  pricingProBullet2: "Five lenses on every ticker with plain-English rationale you can scan in seconds.",
  pricingProBullet3: "Instrument screen: chart, fundamentals-style context, and AI in one scroll.",
  pricingProBullet4: "Future Pro-only features ship here first.",
  pricingCtaWaitlist: "Request early access",
  pricingCtaProduct: "See the product",
  pricingDisclaimerLine:
    "Educational software only — markets stay risky. We sell clarity on your own data, not promises of returns.",
  pricingFootnote:
    "Purchases run inside the Alpha Investor app via Apple In-App Purchase on iOS (price may vary by region). Google Play billing is on the roadmap. Cancel from your device subscription settings.",
  screensTitle: "Investment analytics in your pocket",
  screensIntro: "Portfolio tracking, charts, and explained signals — designed for mobile.",
  galleryPortfolioInsightKicker: "Explained signals",
  galleryWalletValueKicker: "Performance",
  galleryWalletAllocationKicker: "Allocation",
  galleryChartKicker: "Momentum",
  galleryFiveLensesKicker: "Comparison",
  galleryFundamentalsKicker: "Valuation",
  galleryOptimizerKicker: "Scenario",
  galleryNewsKicker: "News",
  galleryWalletValueTitle: "See if your plan is working",
  galleryWalletValueBody:
    "Portfolio value over time with simple range controls — see the arc without jumping between tools.",
  galleryWalletAllocationTitle: "Understand what you own",
  galleryWalletAllocationBody: "See allocation, exposure, and performance in one place.",
  galleryPortfolioInsightTitle: "Explained portfolio insight",
  galleryPortfolioInsightBody: "Clear signals with context — every score with reasoning.",
  galleryChartTitle: "Read the market",
  galleryChartBody: "Charts and signals, simplified.",
  galleryFiveLensesTitle: "Break it down",
  galleryFiveLensesBody: "Trend, valuation, growth, risk, and momentum in one view.",
  galleryFundamentalsTitle: "See the reasoning",
  galleryFundamentalsBody: "Every signal links to the factors behind it.",
  galleryOptimizerTitle: "Plan your next move",
  galleryOptimizerBody: "Test changes before you act on your portfolio.",
  galleryNewsTitle: "Track what matters",
  galleryNewsBody: "Use market context to filter noise and focus on decisions.",
  faqTitle: "Frequently asked questions",
  faq1Q: "Is this financial advice?",
  faq1A:
    "No. Alpha Investor is software plus educational context. We are not a fiduciary and do not know your full finances — you stay in charge of trades and taxes.",
  faq2Q: "How do broker imports work?",
  faq2A:
    "Export open positions or history from your broker (CSV/Excel where supported), then import in the app. We do not connect to your broker with your login — file-based imports only.",
  faq3Q: "Which brokers are supported?",
  faq3A:
    "Import templates for XTB, Interactive Brokers, Degiro, Trading 212, Revolut, Robinhood, mBank eMakler, plus a generic path for other CSV/Excel exports. Coverage expands over time.",
  faq4Q: "Where does market data come from?",
  faq4A:
    "Licensed market data providers on our servers — quotes, reference fields, and symbol validation. We do not use other users' portfolio data as a data source.",
  faq5Q: "What does the AI add?",
  faq5A:
    "Explained readouts on your wallet and holdings — what changed, why it matters, and factors behind each signal. Alpha Pro adds the full layer across your book.",
  faq6Q: "Which platforms are supported?",
  faq6A: "iOS today. Android is on the roadmap — join the waitlist for timing.",
  faq7Q: "How does pricing work?",
  faq7A:
    "Free includes portfolios, quotes, and charts without premium AI. Alpha Pro is $10/month for full explained intelligence — subscribe in the iOS app via the App Store.",
  faq8Q: "Do you train public models on my portfolio?",
  faq8A:
    "No. Insights are generated for your account from your data and licensed feeds under our privacy terms.",
  faq9Q: "What happens after I join the waitlist?",
  faq9A: "Occasional email about releases and Android timing. Unsubscribe anytime.",
  faq10Q: "Are you a broker or custodian?",
  faq10A:
    "No. We do not hold assets, route orders, or provide personalized investment advice. You manage trades at your brokers.",
  faq11Q: "I'm a data or API provider — how do we partner?",
  faq11A:
    "Email partners@alphainvestor.app with your data products and use cases. We consume quotes, reference data, and symbol validation at portfolio scale.",
  faq12Q: "Is my data secure?",
  faq12A:
    "We design for privacy-first imports (no broker passwords), account-scoped insights, and standard security practices. See our Privacy policy and in-app notices for details.",
  ctaTitle: "Start with your real portfolio",
  ctaSub: "Download on iOS or join early access for Android and major releases.",
  formConsent: "By joining, you agree we may email you about the product. See",
  formConsentLink: "Privacy",
  disclaimer:
    "Not investment, tax, or legal advice. AI text can be incomplete or stale — double-check anything that would change your money.",
  roadmapTitle: "Product roadmap",
  roadmapIntro:
    "Directional phases — no dates. Order may change; join the waitlist for release notes when we ship.",
  roadmapFootnote: "Roadmap items are plans, not commitments.",
  roadmapPhase1Title: "Shipped — iOS foundation",
  roadmapPhase1Badge: "Live",
  roadmapPhase1Body:
    "Portfolios, broker imports, live quotes, charts, and first explained AI readouts on wallet and holdings.",
  roadmapPhase2Title: "Now — deeper intelligence",
  roadmapPhase2Body: "Richer lens models, import coverage, and portfolio stress views on mobile.",
  roadmapPhase3Title: "Next — Android parity",
  roadmapPhase3Body: "Same multi-broker experience on a second platform.",
  roadmapPhase4Title: "Horizon — scale & partnerships",
  roadmapPhase4Body:
    "Broader asset classes, institutional-grade data partnerships, and infrastructure for millions of retail portfolios.",
} as const;
