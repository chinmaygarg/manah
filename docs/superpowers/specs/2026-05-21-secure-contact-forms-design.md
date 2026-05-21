# Secure email-sending contact forms — design

**Date:** 2026-05-21
**Status:** Approved (pending spec review)

## Problem

The Manah Group website has three forms — Contact, Partner, Newsletter — and
none of them work. Each `handleSubmit` only flips a local `submitted` state;
no request is made and no email is sent. There are no API routes and no email
infrastructure.

Goal: make all three forms actually deliver, and make the public submission
endpoints resistant to spam, abuse, and injection.

## Decisions

| Concern | Decision |
|---|---|
| Email delivery | Resend |
| Spam/bot protection | Cloudflare Turnstile + honeypot + rate limit |
| Newsletter | Add subscriber as a contact in a Resend Audience |
| Rate limiting | In-memory per-IP, best-effort |
| Contact routing | By Inquiry Type, addresses from env vars |
| Endpoint style | POST Route Handlers (not Server Actions) |
| Test runner | Vitest |

Route Handlers were chosen over Server Actions because they are simpler to
rate-limit, unit/integration test, and return structured JSON to the client.

## Architecture

Three POST Route Handlers, one per form:

| Route | Form | Action |
|---|---|---|
| `/api/contact` | Contact | Send email to mailbox resolved from Inquiry Type |
| `/api/partner` | Partner | Send email to `MAIL_TO_PARTNERSHIPS` |
| `/api/newsletter` | Newsletter | Add contact to Resend Audience |

Every handler runs the same pipeline, failing fast at the first failure:

```
rate-limit (per IP)
  -> honeypot check
  -> Zod schema validate
  -> Turnstile token verify (server-side)
  -> Resend send / Resend Audience add
  -> JSON response
```

Node runtime (`export const runtime = "nodejs"`) — the Resend SDK is not
Edge-compatible.

### Contact routing

A code-side map keys the Inquiry Type select value to an env var name; the
env var holds the real address. Unmatched types fall back to `MAIL_TO_GENERAL`.

| Inquiry Type (select value) | Env var | Example address |
|---|---|---|
| `Careers` | `MAIL_TO_CAREERS` | careers@manah.com |
| `Media / Press` | `MAIL_TO_MEDIA` | media@manah.com |
| `Partnership Opportunity` | `MAIL_TO_PARTNERSHIPS` | partnerships@manah.com |
| `General Inquiry`, `Project / EPC Inquiry`, `Investor Relations` | `MAIL_TO_GENERAL` | info@manah.com |

The `division` select (Dynamics, Aerospace, Green Energy, Atomic, AI,
Investments) is **not** used for routing — it has no dedicated mailboxes. It is
included in the email body as context only.

## File structure

Many small, single-purpose files (per project coding style).

```
website/src/lib/forms/
  rate-limit.ts        # in-memory per-IP sliding-window limiter
  turnstile.ts         # server-side Turnstile token verification
  schemas.ts           # Zod schemas: contactSchema, partnerSchema, newsletterSchema
  resend.ts            # Resend client singleton + env guard
  recipients.ts        # inquiryType -> env-var mailbox resolver
  email-templates.ts   # HTML body builders (all values HTML-escaped)
  client-id.ts         # extract client IP from request headers
  respond.ts           # shared JSON response helpers (ok / error)

website/src/app/api/contact/route.ts
website/src/app/api/partner/route.ts
website/src/app/api/newsletter/route.ts

website/src/components/forms/
  TurnstileWidget.tsx  # client Turnstile widget wrapper
  useFormSubmit.ts     # shared submit hook: idle | submitting | success | error
  HoneypotField.tsx    # visually-hidden honeypot input
```

Existing form components are rewired (no behavioural rewrite beyond submit):

- `src/app/contact/ContactContent.tsx`
- `src/app/partner/PartnerContent.tsx`
- `src/components/sections/NewsletterCTA.tsx`

Each gets: real `fetch` to its endpoint, `useFormSubmit` for loading/error/
success state, a `TurnstileWidget`, and a `HoneypotField`. The existing
`submitted` success UI is reused; an error state is added.

## Data flow

1. User fills form. Turnstile widget renders and yields a token.
2. On submit, client POSTs JSON: form fields + `turnstileToken` + honeypot field.
3. Handler resolves client IP, checks rate limit.
4. Handler rejects if honeypot field is non-empty (silent generic success to
   avoid signalling the bot, or 400 — see Error Handling).
5. Zod parses the body; invalid input → 400 with field errors.
6. Turnstile token verified against `https://challenges.cloudflare.com/turnstile/v0/siteverify`.
7. Contact/Partner: build HTML body, `resend.emails.send`.
   Newsletter: `resend.contacts.create({ email, audienceId })`.
8. Success → 200 `{ ok: true }`. Failure → appropriate status, generic message.

## Validation & schemas (Zod)

All schemas enforce required fields, email format, and **length caps** on every
string field. Length caps bound payload size and remove any room for header
injection.

- **contactSchema** — `name`, `email`, `phone?`, `company?`, `type` (enum of the
  6 inquiry types), `division?` (enum of the 6 divisions), `message`,
  `turnstileToken`, honeypot field.
- **partnerSchema** — `organization`, `contactPerson`, `email`, `phone?`,
  `partnershipType`, `areaOfInterest`, `message`, `turnstileToken`, honeypot.
- **newsletterSchema** — `email`, `turnstileToken`, honeypot.

Indicative caps: short text ≤ 200 chars, message ≤ 5000 chars, email ≤ 320.

## Security

- **Server-side validation** — Zod on every field; client validation is UX only.
- **Honeypot** — a visually-hidden field real users never fill; non-empty =
  bot, request rejected.
- **Turnstile** — token verified server-side before any send. The secret key
  (`TURNSTILE_SECRET_KEY`) never reaches the client. Only the public site key
  (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`) is exposed.
- **Rate limiting** — per-IP sliding window, ~5 requests / 10 min, in-memory
  (best-effort; Turnstile + honeypot are the primary defence).
- **No injection surface** — recipient, subject, and `from` are server-side
  constants/env values, never user-controlled. User input appears only in the
  email *body*, HTML-escaped before interpolation.
- **Secrets** — `RESEND_API_KEY`, `TURNSTILE_SECRET_KEY` are server-only env
  vars. The Resend client module throws at startup if required vars are missing.
- **Generic errors** — the client never sees internal error detail. POST only;
  other methods → 405.
- **No logging of PII** beyond what is operationally necessary; no submission
  bodies written to logs.

## Error handling

| Condition | Status | Client message |
|---|---|---|
| Rate limit exceeded | 429 | "Too many requests. Please try again shortly." |
| Honeypot filled | 200 (silent) | Generic success (do not tip off the bot) |
| Zod validation fails | 400 | Field-level errors for legit UX |
| Turnstile verify fails | 400 | "Verification failed. Please retry." |
| Resend send fails | 502 | "Something went wrong. Please try again or email us directly." |
| Wrong method | 405 | — |

Server logs the real error; client gets the generic message.

## Environment variables

Stored in `website/.env.local` for dev and the Vercel dashboard for prod.
`.env.local` is gitignored; an `.env.example` (no real values) is committed.

| Var | Purpose | Public? |
|---|---|---|
| `RESEND_API_KEY` | Resend API auth | No |
| `RESEND_AUDIENCE_ID` | Newsletter audience | No |
| `MAIL_FROM` | Sender address on verified domain | No |
| `MAIL_TO_GENERAL` | Fallback / general inbox | No |
| `MAIL_TO_CAREERS` | Careers inquiries | No |
| `MAIL_TO_MEDIA` | Media / press inquiries | No |
| `MAIL_TO_PARTNERSHIPS` | Partnership inquiries + Partner form | No |
| `TURNSTILE_SECRET_KEY` | Turnstile server verification | No |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile widget render | Yes |

## New dependencies

- `zod` — input validation (mandated by project coding style)
- `resend` — email + audience SDK
- `@marsidev/react-turnstile` — small Turnstile React wrapper
- `vitest` (dev) + supporting test deps — no test runner currently exists

## Testing

Target 80%+ coverage.

- **Unit** — Zod schemas (valid/invalid), rate-limit window behaviour,
  Turnstile verify (mocked fetch: pass/fail), recipient resolver, HTML escaping.
- **Integration** — each Route Handler with Resend and Turnstile mocked:
  success, bad token, rate-limited, invalid input, honeypot filled, Resend
  failure.
- **E2E (Playwright)** — fill and submit each form; assert success UI. Use
  Cloudflare Turnstile's official test keys (always-pass) in the test env.

## Out of scope

- Persisting submissions to a database (email-only).
- Newsletter double opt-in / confirmation emails.
- Admin UI for viewing submissions.
- Durable (Redis-backed) rate limiting.
- File attachments / uploads on any form.

## External setup (manual, not code)

1. Create a Resend account; verify the `manah.com` domain (add SPF/DKIM DNS
   records).
2. Create a Resend Audience; copy its ID.
3. Create a Cloudflare Turnstile widget; copy the site key and secret key.
4. Populate `website/.env.local` (dev) and the Vercel project env vars (prod)
   with all variables in the table above.
