# Alpha Investor — web (early access)

Next.js marketing site and early-access waitlist for **Alpha Investor**, deployed on **Vercel**.

## Related repo

The **mobile app** (Expo) and **Supabase** migrations/functions live in the sibling project:

`../alphainvestor` (repository name: **alphainvestor**)

This web repo stays independent: its own `package.json`, CI, and Vercel project.

## Early access (waitlist)

Signups are stored via **Resend Contacts** (server-side `POST` from `/api/early-access`). Configure Vercel environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key (`re_...`) |
| `RESEND_SEGMENT_ID` | No | Segment ID to tag waitlist contacts after create |

Copy [`.env.example`](./.env.example) to `.env.local` for local development.

### Other providers

To use Loops, Beehiiv, ConvertKit, etc., replace the implementation in [`app/api/early-access/route.ts`](app/api/early-access/route.ts) with their HTTP APIs; keep **server-only** secrets in Vercel, never `NEXT_PUBLIC_*`.

### Optional: mirror signups into Supabase

If you want emails in the same Postgres as the mobile app, add a migration in **alphainvestor** (e.g. `early_access_signups`) and call Supabase from this route with a **service role** key stored only on Vercel. That couples the two repos operationally—only do it if you need a single warehouse.

## Scripts

```bash
npm run dev        # local dev
npm run build      # production build
npm run start      # run production server locally
npm run lint
npm run typecheck
```

## Deploy (Vercel)

1. Import this Git repository into Vercel (root directory = repo root).
2. Set `RESEND_API_KEY` (and optionally `RESEND_SEGMENT_ID`) in **Project → Settings → Environment Variables**.
3. Deploy; the waitlist form calls `/api/early-access` on the same origin.

## Local development

```bash
npm install
cp .env.example .env.local
# fill RESEND_* then:
npm run dev
```

Without Resend env vars, `POST /api/early-access` returns **503** so you know configuration is missing.
