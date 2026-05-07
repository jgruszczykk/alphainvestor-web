# Legal review checklist

The Privacy and Terms copy in [`messages/en.json`](./messages/en.json) and
[`messages/pl.json`](./messages/pl.json) should be reviewed and signed off by
qualified counsel. Current copy is aligned with the live website + waitlist
scope and real integrations, but this checklist is still not a substitute for
formal legal advice.

This file tracks the open items the lawyer needs to confirm or replace.

## Status

- [ ] EN privacy reviewed by counsel
- [ ] PL privacy reviewed by counsel (translation accuracy + jurisdictional fit)
- [ ] EN terms reviewed by counsel
- [ ] PL terms reviewed by counsel
- [x] Operator legal entity name and address recorded below
- [x] Privacy contact channel verified (privacy@alphainvestor.app)
- [ ] DPO appointed if required by Article 37 GDPR
- [ ] Cookie banner / consent UX reviewed (current site uses cookies for locale + bot mitigation only)
- [x] Policy scope limited to web + waitlist (no mobile-app section)

## Placeholders to replace

The Privacy and Terms copy refers generically to "the legal entity that
operates Alpha Investor". Before launch, replace those references with the
actual operator details below, in BOTH `en.json` and `pl.json` under the
`Privacy.intro`, `Privacy.sections[0]`, and `Terms.intro` keys.

```
Operator legal name:        Jakub Gruszczyk QBKSHOP
Registered address:         Not listed (owner requested no address in public legal copy)
Registration number / NIP:  6423222018
Privacy contact:            privacy@alphainvestor.app
General contact:            privacy@alphainvestor.app
Data Protection Officer:    Not appointed (owner confirmed)
Governing law:              Poland (confirmed)
```

## Items the lawyer should specifically verify

1. **Scope control**: policy currently covers website + waitlist only. If
   mobile app processing is added here later, policy requires immediate update.
2. **Section 6 (legal bases)**: confirm the legal-basis mapping is accurate
   for the actual processing performed.
3. **Section 8 (sharing)**: list of processors must match executed DPAs.
   Current live list: hosting/analytics (Vercel), email/waitlist (Resend),
   bot-mitigation (Cloudflare Turnstile), rate-limit DB (Neon/Postgres).
4. **Section 9 (international transfers)**: confirm SCCs / UK Addendum are
   in place for each non-EEA processor.
5. **Section 10 (retention)**: align with internal retention schedule
   (Postgres backups, Sentry log retention, FMP cache TTL, Resend audience).
6. **Section 13 (children)**: confirm 16 remains the intended minimum age for
   target markets.
7. **Section 14 (automated decision-making)**: website/waitlist currently do
   not make automated decisions with legal/similarly significant effects.
8. **Terms section 9-10 (disclaimers / liability cap)**: confirm enforceability
   under Polish + EU consumer law; the USD 50 floor may need adjustment.
9. **Terms section 14 (governing law)**: confirm Polish law / Polish courts
   matches the operator entity and that the consumer-rights carve-out is
   adequate.

## Sign-off

When complete, set the bullet list above to all-checked and link the signed
PDF / engagement letter here.

```
Counsel:        TBD
Engagement #:   TBD
Sign-off date:  TBD
Sign-off file:  TBD
```
