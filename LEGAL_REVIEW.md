# Legal review checklist

Before public launch and any large-scale email collection, the Privacy and
Terms copy in [`messages/en.json`](./messages/en.json) and
[`messages/pl.json`](./messages/pl.json) must be reviewed and signed off by
qualified counsel. The current text is a comprehensive working draft, NOT a
substitute for legal review.

This file tracks the open items the lawyer needs to confirm or replace.

## Status

- [ ] EN privacy reviewed by counsel
- [ ] PL privacy reviewed by counsel (translation accuracy + jurisdictional fit)
- [ ] EN terms reviewed by counsel
- [ ] PL terms reviewed by counsel
- [ ] Operator legal entity name and address recorded below
- [ ] Privacy contact channel verified (mailbox actively monitored, GDPR SLA met)
- [ ] DPO appointed if required by Article 37 GDPR
- [ ] Cookie banner / consent UX reviewed (current site uses cookies for locale + bot mitigation only)
- [ ] App Store privacy questionnaire kept in sync with this policy

## Placeholders to replace

The Privacy and Terms copy refers generically to "the legal entity that
operates Alpha Investor". Before launch, replace those references with the
actual operator details below, in BOTH `en.json` and `pl.json` under the
`Privacy.intro`, `Privacy.sections[0]`, and `Terms.intro` keys.

```
Operator legal name:        TBD (e.g. "AlphaCo sp. z o.o.")
Registered address:         TBD
Registration number / NIP:  TBD
Privacy contact:            TBD (e.g. privacy@alphainvestor.app)
General contact:            TBD
Data Protection Officer:    TBD or "not appointed (Art. 37 GDPR not triggered)"
Governing law:              Currently states "Poland" — confirm operator entity matches
```

## Items the lawyer should specifically verify

1. **Section 5 (mobile data)**: confirms we do NOT use portfolio data to train
   public foundation models. If we ever change this, the policy needs an
   immediate update + user notice (Art. 13/14 GDPR transparency).
2. **Section 6 (legal bases)**: confirm the legal-basis mapping is accurate
   for the actual processing performed.
3. **Section 8 (sharing)**: list of processors must match the executed DPAs.
   Current draft names: hosting (Vercel), email (Resend), bot-mitigation
   (Cloudflare Turnstile), database (Neon, Supabase), authentication (Clerk),
   subscription/entitlement (RevenueCat), market data (FMP), AI inference
   (OpenAI). DPAs should be on file with each.
4. **Section 9 (international transfers)**: confirm SCCs / UK Addendum are
   in place for each non-EEA processor.
5. **Section 10 (retention)**: align with internal retention schedule
   (Postgres backups, Sentry log retention, FMP cache TTL, Resend audience).
6. **Section 13 (children)**: confirm 16 is the right minimum for our App
   Store age rating and target markets.
7. **Section 14 (automated decision-making)**: lawyer should confirm AI
   scores do not constitute "decisions producing legal or similarly
   significant effects" under Art. 22 GDPR.
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
