# Manah Group Website

Corporate marketing site for Manah Group — Next.js 16, React 19, Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run gen:blur` | Regenerate image blur placeholders |

## Images

Content photos use `<BlurImage>` (`src/components/ui/BlurImage.tsx`), which
shows a real blurred preview (LQIP) of the photo while the full image loads.
Previews are stored in the generated file `src/lib/blur-map.ts`.

**After adding or replacing any image in `public/images/`, run:**

```bash
npm run gen:blur
```

`npm run build` runs this automatically (via the `prebuild` script), but run
it manually during development so placeholders show up in `npm run dev`.
Commit the updated `src/lib/blur-map.ts`.

## Contact forms & email

The Contact, Partner, and Newsletter forms POST to Next.js Route Handlers
under `src/app/api/`:

| Route | Form | Action |
|---|---|---|
| `/api/contact` | Contact | Emails the mailbox matching the inquiry type |
| `/api/partner` | Partner | Emails the partnerships mailbox |
| `/api/newsletter` | Newsletter | Adds the subscriber to a Resend Audience |

Each request runs: rate-limit → honeypot → Zod validation → Cloudflare
Turnstile verification → Resend. Shared logic lives in `src/lib/forms/`.

### Required environment variables

Copy `.env.example` to `.env.local` for local development, and set the same
variables in the Vercel project for production.

| Var | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key |
| `RESEND_AUDIENCE_ID` | Resend Audience for newsletter subscribers |
| `MAIL_FROM` | Sender address on a Resend-verified domain |
| `MAIL_TO_GENERAL` | General / fallback inbox |
| `MAIL_TO_CAREERS` | Careers inquiries |
| `MAIL_TO_MEDIA` | Media / press inquiries |
| `MAIL_TO_PARTNERSHIPS` | Partnership inquiries (Contact + Partner forms) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile server key |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public site key |

### One-time external setup

1. Create a [Resend](https://resend.com) account and verify the `manah.com`
   domain (add the SPF/DKIM DNS records Resend provides).
2. Create a Resend Audience; copy its ID into `RESEND_AUDIENCE_ID`.
3. Create a [Cloudflare Turnstile](https://dash.cloudflare.com) widget; copy
   the site key and secret key.

### Testing

- `npm test` — unit + integration (Vitest)
- `npm run test:e2e` — end-to-end form flows (Playwright)
