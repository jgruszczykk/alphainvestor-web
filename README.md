# Alpha Investor - web (marketing + early access)

Next.js marketing site with **English** and **Polish** (same split as the Expo app). **Public URLs have no locale prefix** (`/`, `/privacy`, `/terms`); language is chosen via **cookie** + `Accept-Language` and the **EN / PL** control in the header. Deploy on **Vercel**.

## Related repo

The **mobile app** (Expo) and **Supabase** live in the sibling project:

`../alphainvestor` (repository name: **alphainvestor**)

This repo stays independent: its own `package.json`, CI, and Vercel project.

## Locales and URLs

- **next-intl** with `localePrefix: 'never'` ([`i18n/routing.ts`](./i18n/routing.ts)): paths stay `/`, `/privacy`, `/terms` while the app still uses `app/[locale]/...` internally.
- [`proxy.ts`](./proxy.ts) negotiates locale (cookie, `Accept-Language`, default `en`).
- [`LanguageSwitcher`](./components/LanguageSwitcher.tsx) calls `router.replace(pathname, { locale })` so the **URL does not change** when switching language.
- Copy lives in [`messages/en.json`](./messages/en.json) and [`messages/pl.json`](./messages/pl.json).

**SEO note:** Google prefers distinct URLs per language; cookie-only locale means weaker `hreflang` coverage. If that becomes a priority, consider subdomains (`en.` / `pl.`) or prefix routing again.

## Brand assets

Icons and splash art live under [`public/brand/`](./public/brand/) (copied from the mobile repo `assets/images/` - `icon`, `splash-icon`, `adaptive-icon`, `favicon`). Re-copy when those files change.

## Marketing copy (English source)

English strings for the landing page are authored in [`content/landing.ts`](./content/landing.ts) as the copy deck. **`messages/en.json`** under `Home` (and related keys) should stay in sync: after editing `landing.ts`, mirror the same text into `messages/en.json`, then translate updates into **`messages/pl.json`**. There is no automated sync script yet; a quick diff between `landingHome` keys and JSON catches drift.

## Early access (Resend)

`POST /api/early-access` creates a **Resend Contact** and optionally adds a **Segment**. Optional **Turnstile** + **Postgres-backed rate limits** (Neon URL) when env vars are set (see [`.env.example`](./.env.example)).

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key (`re_...`) |
| `RESEND_SEGMENT_ID` | No | Segment ID to tag waitlist contacts |
| `NEXT_PUBLIC_SITE_URL` | Recommended in prod | Origin for canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph |
| `WAITLIST_RATE_LIMIT_DATABASE_URL` | No | Neon (or any Postgres) connection string; run [`sql/waitlist_rate_limits.sql`](./sql/waitlist_rate_limits.sql) once. Enables IP + email rate limits on the waitlist API |
| `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | No | If set, Turnstile is required on submit |
| `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS` | No | Set to `1` to enable [@vercel/analytics](https://vercel.com/docs/analytics) in production |

## Scripts

```bash
npm run dev        # http://localhost:3000
npm run build
npm run start
npm run lint
npm run typecheck
```

## Deploy (Vercel)

1. Import this repository (root = app root).
2. Set `RESEND_API_KEY`, optional `RESEND_SEGMENT_ID`, **`NEXT_PUBLIC_SITE_URL`**, (recommended) `WAITLIST_RATE_LIMIT_DATABASE_URL` (Neon) + Turnstile keys, and optional `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS=1` for Web Analytics.
3. Deploy.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Optional: Supabase mirror

To store signups in the same Postgres as the mobile app, add a migration in **alphainvestor** and extend the API route with a server-only Supabase service role key.

## QA checklist

- Open `/`, switch **EN / PL**, confirm **URL unchanged**; refresh keeps language (cookie).
- Visit `/privacy` and `/terms`; switch language there too.
- Submit the waitlist form (success, duplicate, 503 without Resend, 429 when rate-limited, Turnstile failure if keys set).
- Lighthouse on `/` after setting `NEXT_PUBLIC_SITE_URL`.
- Replace Privacy / Terms placeholders before large-scale email collection.
