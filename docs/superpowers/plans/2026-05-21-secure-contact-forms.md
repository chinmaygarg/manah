# Secure Email-Sending Contact Forms — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the website's Contact, Partner, and Newsletter forms actually deliver — Contact/Partner send email via Resend, Newsletter adds a contact to a Resend Audience — behind spam, abuse, and injection protection.

**Architecture:** Three POST Route Handlers (`/api/contact`, `/api/partner`, `/api/newsletter`), each running an identical pipeline: rate-limit → honeypot → Zod validation → Cloudflare Turnstile verify → Resend call. Pure logic lives in small single-purpose modules under `src/lib/forms/`; client wiring lives in `src/components/forms/`. The three existing form components are rewired to `fetch` their endpoints.

**Tech Stack:** Next.js 16 (App Router, Route Handlers, Node runtime), React 19, TypeScript, Zod (validation), Resend (email + audiences), Cloudflare Turnstile (CAPTCHA), Vitest (unit/integration), Playwright (E2E).

**Spec:** `docs/superpowers/specs/2026-05-21-secure-contact-forms-design.md`

**Working directory:** All paths are relative to `/Users/chinmay/Desktop/Manah/website` unless stated otherwise. Run all commands from that directory.

**Conventions:**
- Path alias `@/*` → `./src/*`.
- Commit messages: Conventional Commits, no attribution footer (disabled globally).
- After each task, the build/lint should still pass. `console.error` is allowed for error handling; `console.log` is not.

---

## File Structure

**Created — library (`src/lib/forms/`):**
- `schemas.ts` — Zod schemas + inferred types for all three forms.
- `rate-limit.ts` — in-memory per-id sliding-window limiter factory.
- `turnstile.ts` — server-side Turnstile token verification.
- `client-id.ts` — extract client IP from request headers.
- `recipients.ts` — resolve destination mailbox from inquiry type / env.
- `email-templates.ts` — HTML-escaping + email body builders.
- `resend.ts` — Resend client + `sendEmail` / `addAudienceContact` helpers.
- `respond.ts` — JSON `Response` helpers (`jsonOk` / `jsonError`).

**Created — API routes:**
- `src/app/api/contact/route.ts`
- `src/app/api/partner/route.ts`
- `src/app/api/newsletter/route.ts`

**Created — client (`src/components/forms/`):**
- `HoneypotField.tsx` — visually-hidden honeypot input.
- `TurnstileWidget.tsx` — Turnstile widget wrapper.
- `useFormSubmit.ts` — shared submit hook (idle/submitting/success/error).

**Created — config/test:**
- `vitest.config.ts`, `playwright.config.ts`, `.env.example`
- `e2e/contact.spec.ts`, `e2e/partner.spec.ts`, `e2e/newsletter.spec.ts`

**Modified:**
- `package.json` — dependencies + test scripts.
- `next.config.ts` — CSP allowances for Turnstile.
- `src/app/contact/ContactContent.tsx` — real submit.
- `src/app/partner/PartnerContent.tsx` — real submit.
- `src/components/sections/NewsletterCTA.tsx` — real submit.
- `README.md` — document forms + env setup.

---

## Task 1: Project setup — dependencies, test config, env example

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `.env.example`

- [ ] **Step 1: Install runtime dependencies**

Run:
```bash
npm install --legacy-peer-deps zod@^3.25.0 resend@^4.0.0 @marsidev/react-turnstile@^1.1.0
```
Expected: packages added to `dependencies`, no errors. `--legacy-peer-deps` matches `vercel.json`'s install command.

- [ ] **Step 2: Install dev dependencies**

Run:
```bash
npm install --legacy-peer-deps -D vitest@^3.0.0 @vitejs/plugin-react@^4.3.0 happy-dom@^16.0.0 @testing-library/react@^16.1.0 @testing-library/dom@^10.4.0 @playwright/test@^1.49.0
```
Expected: packages added to `devDependencies`, no errors.

- [ ] **Step 3: Create `vitest.config.ts`**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.{ts,tsx}"],
    clearMocks: true,
    restoreMocks: true,
  },
});
```

Component/hook tests that need a DOM declare `// @vitest-environment happy-dom` at the top of the file.

- [ ] **Step 4: Add test scripts to `package.json`**

In the `"scripts"` block add:
```json
"test": "vitest run",
"test:watch": "vitest",
"test:e2e": "playwright test"
```

- [ ] **Step 5: Create `.env.example`**

```bash
# Resend — https://resend.com
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
RESEND_AUDIENCE_ID=00000000-0000-0000-0000-000000000000

# Sender — must be an address on a Resend-verified domain
MAIL_FROM="Manah Group <website@manah.com>"

# Destination mailboxes (server-side only)
MAIL_TO_GENERAL=info@manah.com
MAIL_TO_CAREERS=careers@manah.com
MAIL_TO_MEDIA=media@manah.com
MAIL_TO_PARTNERSHIPS=partnerships@manah.com

# Cloudflare Turnstile — https://dash.cloudflare.com/?to=/:account/turnstile
TURNSTILE_SECRET_KEY=0x0000000000000000000000000000000000000000
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

`.gitignore` already ignores `.env.*` while keeping `!.env.example`, so this file is committed and real `.env.local` is not.

- [ ] **Step 6: Run the test runner to confirm wiring**

Run: `npm test`
Expected: Vitest runs, reports "No test files found" (or 0 tests) and exits 0.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts .env.example
git commit -m "chore: add form/email deps and test tooling"
```

---

## Task 2: Validation schemas

**Files:**
- Create: `src/lib/forms/schemas.ts`
- Test: `src/lib/forms/schemas.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/forms/schemas.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { contactSchema, partnerSchema, newsletterSchema } from "./schemas";

const validContact = {
  name: "Asha Rao",
  email: "asha@example.com",
  phone: "+91 99999 99999",
  company: "Rao Infra",
  type: "General Inquiry",
  division: "dynamics",
  message: "We would like to discuss a project.",
  turnstileToken: "token-abc",
};

describe("contactSchema", () => {
  it("accepts a valid payload", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("rejects a bad email", () => {
    expect(
      contactSchema.safeParse({ ...validContact, email: "not-an-email" }).success,
    ).toBe(false);
  });

  it("rejects an unknown inquiry type", () => {
    expect(
      contactSchema.safeParse({ ...validContact, type: "Hacking" }).success,
    ).toBe(false);
  });

  it("rejects an over-long message", () => {
    expect(
      contactSchema.safeParse({ ...validContact, message: "x".repeat(5001) })
        .success,
    ).toBe(false);
  });

  it("rejects a missing turnstile token", () => {
    const { turnstileToken, ...rest } = validContact;
    void turnstileToken;
    expect(contactSchema.safeParse(rest).success).toBe(false);
  });

  it("allows optional phone, company and division to be absent", () => {
    expect(
      contactSchema.safeParse({
        name: "Asha Rao",
        email: "asha@example.com",
        type: "Careers",
        message: "Hello",
        turnstileToken: "t",
      }).success,
    ).toBe(true);
  });
});

describe("partnerSchema", () => {
  it("accepts a valid payload", () => {
    expect(
      partnerSchema.safeParse({
        organization: "Rao Infra",
        contactPerson: "Asha Rao",
        email: "asha@example.com",
        phone: "",
        partnershipType: "Joint Venture",
        areaOfInterest: "Infrastructure",
        message: "Proposal summary.",
        turnstileToken: "t",
      }).success,
    ).toBe(true);
  });

  it("rejects an unknown partnership type", () => {
    expect(
      partnerSchema.safeParse({
        organization: "Rao Infra",
        contactPerson: "Asha Rao",
        email: "asha@example.com",
        partnershipType: "Nonsense",
        areaOfInterest: "Infrastructure",
        message: "x",
        turnstileToken: "t",
      }).success,
    ).toBe(false);
  });
});

describe("newsletterSchema", () => {
  it("accepts a valid email", () => {
    expect(
      newsletterSchema.safeParse({
        email: "asha@example.com",
        turnstileToken: "t",
      }).success,
    ).toBe(true);
  });

  it("rejects a bad email", () => {
    expect(
      newsletterSchema.safeParse({ email: "nope", turnstileToken: "t" }).success,
    ).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/forms/schemas.test.ts`
Expected: FAIL — `Failed to resolve import "./schemas"`.

- [ ] **Step 3: Write the implementation**

`src/lib/forms/schemas.ts`:
```typescript
import { z } from "zod";

const SHORT = 200;
const PHONE = 40;
const EMAIL = 320;
const MESSAGE = 5000;
const TOKEN = 4096;

const INQUIRY_TYPES = [
  "General Inquiry",
  "Project / EPC Inquiry",
  "Partnership Opportunity",
  "Careers",
  "Media / Press",
  "Investor Relations",
] as const;

const PARTNERSHIP_TYPES = [
  "Joint Venture",
  "Technology Partner",
  "Subcontractor",
  "Supplier",
  "Other",
] as const;

const INTEREST_AREAS = [
  "Power Transmission",
  "Renewable Energy",
  "Infrastructure",
  "Defence Electronics",
  "Aviation",
  "Green Hydrogen",
  "Manufacturing",
] as const;

const email = z.string().trim().min(1).max(EMAIL).email();
const turnstileToken = z.string().trim().min(1).max(TOKEN);
const optionalText = (max: number) => z.string().trim().max(max).optional();

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(SHORT),
  email,
  phone: optionalText(PHONE),
  company: optionalText(SHORT),
  type: z.enum(INQUIRY_TYPES),
  division: optionalText(50),
  message: z.string().trim().min(1).max(MESSAGE),
  turnstileToken,
});

export const partnerSchema = z.object({
  organization: z.string().trim().min(1).max(SHORT),
  contactPerson: z.string().trim().min(1).max(SHORT),
  email,
  phone: optionalText(PHONE),
  partnershipType: z.enum(PARTNERSHIP_TYPES),
  areaOfInterest: z.enum(INTEREST_AREAS),
  message: z.string().trim().min(1).max(MESSAGE),
  turnstileToken,
});

export const newsletterSchema = z.object({
  email,
  turnstileToken,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type PartnerInput = z.infer<typeof partnerSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/forms/schemas.test.ts`
Expected: PASS — all assertions green.

- [ ] **Step 5: Commit**

```bash
git add src/lib/forms/schemas.ts src/lib/forms/schemas.test.ts
git commit -m "feat: add Zod schemas for contact, partner and newsletter forms"
```

---

## Task 3: Rate limiter

**Files:**
- Create: `src/lib/forms/rate-limit.ts`
- Test: `src/lib/forms/rate-limit.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/forms/rate-limit.test.ts`:
```typescript
import { describe, it, expect, vi, afterEach } from "vitest";
import { createRateLimiter } from "./rate-limit";

afterEach(() => {
  vi.useRealTimers();
});

describe("createRateLimiter", () => {
  it("allows requests up to the limit", () => {
    const limiter = createRateLimiter({ limit: 3, windowMs: 1000 });
    expect(limiter.check("ip-1")).toBe(true);
    expect(limiter.check("ip-1")).toBe(true);
    expect(limiter.check("ip-1")).toBe(true);
  });

  it("blocks the request that exceeds the limit", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000 });
    limiter.check("ip-1");
    limiter.check("ip-1");
    expect(limiter.check("ip-1")).toBe(false);
  });

  it("tracks ids independently", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.check("ip-1")).toBe(true);
    expect(limiter.check("ip-2")).toBe(true);
    expect(limiter.check("ip-1")).toBe(false);
  });

  it("frees a slot once the window passes", () => {
    vi.useFakeTimers();
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(limiter.check("ip-1")).toBe(true);
    expect(limiter.check("ip-1")).toBe(false);
    vi.advanceTimersByTime(1001);
    expect(limiter.check("ip-1")).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/forms/rate-limit.test.ts`
Expected: FAIL — `Failed to resolve import "./rate-limit"`.

- [ ] **Step 3: Write the implementation**

`src/lib/forms/rate-limit.ts`:
```typescript
interface RateLimiterOptions {
  readonly limit: number;
  readonly windowMs: number;
}

export interface RateLimiter {
  /** Returns true if the request is allowed, false if rate-limited. */
  check(id: string): boolean;
}

/**
 * In-memory per-id sliding-window limiter. Best-effort only: serverless
 * instances do not share this Map and it resets on cold start. Turnstile
 * and the honeypot are the primary bot defence.
 */
export function createRateLimiter({
  limit,
  windowMs,
}: RateLimiterOptions): RateLimiter {
  const hits = new Map<string, readonly number[]>();

  return {
    check(id) {
      const now = Date.now();
      const recent = (hits.get(id) ?? []).filter(
        (timestamp) => now - timestamp < windowMs,
      );

      if (recent.length >= limit) {
        hits.set(id, recent);
        return false;
      }

      hits.set(id, [...recent, now]);
      return true;
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/forms/rate-limit.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/forms/rate-limit.ts src/lib/forms/rate-limit.test.ts
git commit -m "feat: add in-memory sliding-window rate limiter"
```

---

## Task 4: Turnstile verification

**Files:**
- Create: `src/lib/forms/turnstile.ts`
- Test: `src/lib/forms/turnstile.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/forms/turnstile.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { verifyTurnstile } from "./turnstile";

beforeEach(() => {
  vi.stubEnv("TURNSTILE_SECRET_KEY", "secret-key");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("verifyTurnstile", () => {
  it("returns true when Cloudflare reports success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );
    expect(await verifyTurnstile("token")).toBe(true);
  });

  it("returns false when Cloudflare reports failure", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ success: false }), { status: 200 }),
    );
    expect(await verifyTurnstile("token")).toBe(false);
  });

  it("returns false when the secret key is missing", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    expect(await verifyTurnstile("token")).toBe(false);
  });

  it("returns false when the request throws", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));
    expect(await verifyTurnstile("token")).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/forms/turnstile.test.ts`
Expected: FAIL — `Failed to resolve import "./turnstile"`.

- [ ] **Step 3: Write the implementation**

`src/lib/forms/turnstile.ts`:
```typescript
const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface SiteVerifyResponse {
  readonly success?: boolean;
}

/**
 * Verifies a Cloudflare Turnstile token server-side. Returns false on any
 * missing config, network failure, or unsuccessful verification — callers
 * treat false as "reject the submission".
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp && remoteIp !== "unknown") {
      body.set("remoteip", remoteIp);
    }

    const response = await fetch(VERIFY_URL, { method: "POST", body });
    const data = (await response.json()) as SiteVerifyResponse;
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return false;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/forms/turnstile.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/forms/turnstile.ts src/lib/forms/turnstile.test.ts
git commit -m "feat: add server-side Turnstile token verification"
```

---

## Task 5: Client ID extraction

**Files:**
- Create: `src/lib/forms/client-id.ts`
- Test: `src/lib/forms/client-id.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/forms/client-id.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { getClientId } from "./client-id";

function req(headers: Record<string, string>): Request {
  return new Request("http://localhost/api/contact", { headers });
}

describe("getClientId", () => {
  it("uses the first IP from x-forwarded-for", () => {
    expect(getClientId(req({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" }))).toBe(
      "1.1.1.1",
    );
  });

  it("falls back to x-real-ip", () => {
    expect(getClientId(req({ "x-real-ip": "3.3.3.3" }))).toBe("3.3.3.3");
  });

  it("returns 'unknown' when no IP header is present", () => {
    expect(getClientId(req({}))).toBe("unknown");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/forms/client-id.test.ts`
Expected: FAIL — `Failed to resolve import "./client-id"`.

- [ ] **Step 3: Write the implementation**

`src/lib/forms/client-id.ts`:
```typescript
/**
 * Extracts a best-effort client identifier (IP) from request headers.
 * Used only as a rate-limit key — never trusted for security decisions.
 */
export function getClientId(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/forms/client-id.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/forms/client-id.ts src/lib/forms/client-id.test.ts
git commit -m "feat: add client IP extraction helper"
```

---

## Task 6: Recipient resolution

**Files:**
- Create: `src/lib/forms/recipients.ts`
- Test: `src/lib/forms/recipients.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/forms/recipients.test.ts`:
```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { resolveRecipient, getPartnerRecipient } from "./recipients";

beforeEach(() => {
  vi.stubEnv("MAIL_TO_GENERAL", "info@manah.com");
  vi.stubEnv("MAIL_TO_CAREERS", "careers@manah.com");
  vi.stubEnv("MAIL_TO_MEDIA", "media@manah.com");
  vi.stubEnv("MAIL_TO_PARTNERSHIPS", "partnerships@manah.com");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("resolveRecipient", () => {
  it("routes Careers to the careers mailbox", () => {
    expect(resolveRecipient("Careers")).toBe("careers@manah.com");
  });

  it("routes Media / Press to the media mailbox", () => {
    expect(resolveRecipient("Media / Press")).toBe("media@manah.com");
  });

  it("routes Partnership Opportunity to the partnerships mailbox", () => {
    expect(resolveRecipient("Partnership Opportunity")).toBe(
      "partnerships@manah.com",
    );
  });

  it("routes everything else to the general mailbox", () => {
    expect(resolveRecipient("General Inquiry")).toBe("info@manah.com");
    expect(resolveRecipient("Project / EPC Inquiry")).toBe("info@manah.com");
  });

  it("falls back to general when a specific mailbox is unset", () => {
    vi.stubEnv("MAIL_TO_CAREERS", "");
    expect(resolveRecipient("Careers")).toBe("info@manah.com");
  });

  it("throws when no mailbox is configured at all", () => {
    vi.stubEnv("MAIL_TO_GENERAL", "");
    vi.stubEnv("MAIL_TO_CAREERS", "");
    expect(() => resolveRecipient("Careers")).toThrow();
  });
});

describe("getPartnerRecipient", () => {
  it("returns the partnerships mailbox", () => {
    expect(getPartnerRecipient()).toBe("partnerships@manah.com");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/forms/recipients.test.ts`
Expected: FAIL — `Failed to resolve import "./recipients"`.

- [ ] **Step 3: Write the implementation**

`src/lib/forms/recipients.ts`:
```typescript
/**
 * Maps a Contact-form inquiry type to the env var holding its mailbox.
 * Addresses themselves live in env vars, never in code.
 */
const ROUTING: Record<string, string> = {
  Careers: "MAIL_TO_CAREERS",
  "Media / Press": "MAIL_TO_MEDIA",
  "Partnership Opportunity": "MAIL_TO_PARTNERSHIPS",
};

function lookup(envKey: string): string {
  const address = process.env[envKey] || process.env.MAIL_TO_GENERAL;
  if (!address) {
    throw new Error(`No recipient configured (${envKey} / MAIL_TO_GENERAL)`);
  }
  return address;
}

/** Resolves the destination mailbox for a Contact-form submission. */
export function resolveRecipient(inquiryType: string): string {
  return lookup(ROUTING[inquiryType] ?? "MAIL_TO_GENERAL");
}

/** Resolves the destination mailbox for a Partner-form submission. */
export function getPartnerRecipient(): string {
  return lookup("MAIL_TO_PARTNERSHIPS");
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/forms/recipients.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/forms/recipients.ts src/lib/forms/recipients.test.ts
git commit -m "feat: add env-driven recipient resolution"
```

---

## Task 7: Email templates

**Files:**
- Create: `src/lib/forms/email-templates.ts`
- Test: `src/lib/forms/email-templates.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/forms/email-templates.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import {
  escapeHtml,
  renderContactEmail,
  renderPartnerEmail,
} from "./email-templates";
import type { ContactInput, PartnerInput } from "./schemas";

const contact: ContactInput = {
  name: "Asha Rao",
  email: "asha@example.com",
  phone: "+91 99999 99999",
  company: "Rao Infra",
  type: "General Inquiry",
  division: "dynamics",
  message: "Line one\nLine two",
  turnstileToken: "t",
};

const partner: PartnerInput = {
  organization: "Rao Infra",
  contactPerson: "Asha Rao",
  email: "asha@example.com",
  phone: "",
  partnershipType: "Joint Venture",
  areaOfInterest: "Infrastructure",
  message: "Proposal summary.",
  turnstileToken: "t",
};

describe("escapeHtml", () => {
  it("escapes HTML-significant characters", () => {
    expect(escapeHtml(`<script>"&'`)).toBe(
      "&lt;script&gt;&quot;&amp;&#39;",
    );
  });
});

describe("renderContactEmail", () => {
  it("includes submitted field values", () => {
    const html = renderContactEmail(contact);
    expect(html).toContain("Asha Rao");
    expect(html).toContain("asha@example.com");
    expect(html).toContain("General Inquiry");
  });

  it("escapes injected markup in the message", () => {
    const html = renderContactEmail({
      ...contact,
      message: "<img src=x onerror=alert(1)>",
    });
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;img");
  });

  it("converts newlines in the message to <br>", () => {
    expect(renderContactEmail(contact)).toContain("Line one<br>Line two");
  });

  it("never embeds the turnstile token", () => {
    expect(renderContactEmail(contact)).not.toContain("turnstileToken");
  });
});

describe("renderPartnerEmail", () => {
  it("includes submitted field values", () => {
    const html = renderPartnerEmail(partner);
    expect(html).toContain("Rao Infra");
    expect(html).toContain("Joint Venture");
    expect(html).toContain("Infrastructure");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/forms/email-templates.test.ts`
Expected: FAIL — `Failed to resolve import "./email-templates"`.

- [ ] **Step 3: Write the implementation**

`src/lib/forms/email-templates.ts`:
```typescript
import type { ContactInput, PartnerInput } from "./schemas";

const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes HTML-significant characters so user input is inert in email bodies. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ESCAPE_MAP[char] ?? char);
}

function row(label: string, value: string | undefined): string {
  if (!value || value.trim() === "") return "";
  return (
    `<tr>` +
    `<td style="padding:6px 14px;font-weight:600;color:#0a1f44;` +
    `vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>` +
    `<td style="padding:6px 14px;color:#333;">${escapeHtml(value)}</td>` +
    `</tr>`
  );
}

function messageBlock(message: string): string {
  const safe = escapeHtml(message).replace(/\n/g, "<br>");
  return (
    `<p style="margin:16px 14px 0;font-weight:600;color:#0a1f44;">Message</p>` +
    `<p style="margin:4px 14px 0;color:#333;line-height:1.55;">${safe}</p>`
  );
}

function shell(title: string, rows: string, message: string): string {
  return (
    `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;">` +
    `<h2 style="color:#0a1f44;">${escapeHtml(title)}</h2>` +
    `<table style="border-collapse:collapse;width:100%;">${rows}</table>` +
    messageBlock(message) +
    `</div>`
  );
}

/** Builds the HTML body for a Contact-form notification email. */
export function renderContactEmail(data: ContactInput): string {
  const rows =
    row("Name", data.name) +
    row("Email", data.email) +
    row("Phone", data.phone) +
    row("Company", data.company) +
    row("Inquiry type", data.type) +
    row("Division of interest", data.division);
  return shell("New contact enquiry", rows, data.message);
}

/** Builds the HTML body for a Partner-form notification email. */
export function renderPartnerEmail(data: PartnerInput): string {
  const rows =
    row("Organization", data.organization) +
    row("Contact person", data.contactPerson) +
    row("Email", data.email) +
    row("Phone", data.phone) +
    row("Partnership type", data.partnershipType) +
    row("Area of interest", data.areaOfInterest);
  return shell("New partnership inquiry", rows, data.message);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/forms/email-templates.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/forms/email-templates.ts src/lib/forms/email-templates.test.ts
git commit -m "feat: add escaped HTML email templates"
```

---

## Task 8: JSON response helpers

**Files:**
- Create: `src/lib/forms/respond.ts`
- Test: `src/lib/forms/respond.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/forms/respond.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { jsonOk, jsonError } from "./respond";

describe("jsonOk", () => {
  it("returns a 200 with ok:true", async () => {
    const res = jsonOk();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});

describe("jsonError", () => {
  it("returns the given status with ok:false and the message", async () => {
    const res = jsonError(429, "Too many requests.");
    expect(res.status).toBe(429);
    expect(await res.json()).toEqual({
      ok: false,
      error: "Too many requests.",
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/forms/respond.test.ts`
Expected: FAIL — `Failed to resolve import "./respond"`.

- [ ] **Step 3: Write the implementation**

`src/lib/forms/respond.ts`:
```typescript
/** 200 JSON success response. */
export function jsonOk(): Response {
  return Response.json({ ok: true });
}

/** JSON error response with a client-safe, generic message. */
export function jsonError(status: number, message: string): Response {
  return Response.json({ ok: false, error: message }, { status });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/forms/respond.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/forms/respond.ts src/lib/forms/respond.test.ts
git commit -m "feat: add JSON response helpers"
```

---

## Task 9: Resend client wrapper

**Files:**
- Create: `src/lib/forms/resend.ts`
- Test: `src/lib/forms/resend.test.ts`

- [ ] **Step 1: Write the failing test**

`src/lib/forms/resend.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const sendMock = vi.fn();
const contactsCreateMock = vi.fn();

vi.mock("resend", () => ({
  Resend: vi.fn(() => ({
    emails: { send: sendMock },
    contacts: { create: contactsCreateMock },
  })),
}));

import { sendEmail, addAudienceContact } from "./resend";

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("MAIL_FROM", "Manah <website@manah.com>");
  vi.stubEnv("RESEND_AUDIENCE_ID", "aud-123");
  sendMock.mockResolvedValue({ data: { id: "1" }, error: null });
  contactsCreateMock.mockResolvedValue({ data: { id: "c1" }, error: null });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("sendEmail", () => {
  it("sends with the configured from address", async () => {
    await sendEmail({
      to: "info@manah.com",
      subject: "Hi",
      html: "<p>Hi</p>",
      replyTo: "asha@example.com",
    });
    expect(sendMock).toHaveBeenCalledWith({
      from: "Manah <website@manah.com>",
      to: "info@manah.com",
      subject: "Hi",
      html: "<p>Hi</p>",
      replyTo: "asha@example.com",
    });
  });

  it("throws when Resend returns an error", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "bad" } });
    await expect(
      sendEmail({ to: "x@y.com", subject: "s", html: "h" }),
    ).rejects.toThrow();
  });

  it("throws when MAIL_FROM is missing", async () => {
    vi.stubEnv("MAIL_FROM", "");
    await expect(
      sendEmail({ to: "x@y.com", subject: "s", html: "h" }),
    ).rejects.toThrow();
  });
});

describe("addAudienceContact", () => {
  it("creates a contact in the configured audience", async () => {
    await addAudienceContact("asha@example.com");
    expect(contactsCreateMock).toHaveBeenCalledWith({
      email: "asha@example.com",
      audienceId: "aud-123",
      unsubscribed: false,
    });
  });

  it("throws when the audience id is missing", async () => {
    vi.stubEnv("RESEND_AUDIENCE_ID", "");
    await expect(addAudienceContact("asha@example.com")).rejects.toThrow();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/lib/forms/resend.test.ts`
Expected: FAIL — `Failed to resolve import "./resend"`.

- [ ] **Step 3: Write the implementation**

`src/lib/forms/resend.ts`:
```typescript
import { Resend } from "resend";

let client: Resend | null = null;

function getClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (!client) {
    client = new Resend(apiKey);
  }
  return client;
}

interface SendEmailInput {
  readonly to: string;
  readonly subject: string;
  readonly html: string;
  readonly replyTo?: string;
}

/** Sends a transactional email via Resend. Throws on any failure. */
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailInput): Promise<void> {
  const from = process.env.MAIL_FROM;
  if (!from) {
    throw new Error("MAIL_FROM is not configured");
  }

  const { error } = await getClient().emails.send({
    from,
    to,
    subject,
    html,
    replyTo,
  });

  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }
}

/** Adds a contact to the configured Resend Audience. Throws on any failure. */
export async function addAudienceContact(email: string): Promise<void> {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    throw new Error("RESEND_AUDIENCE_ID is not configured");
  }

  const { error } = await getClient().contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  if (error) {
    throw new Error(`Resend contact create failed: ${error.message}`);
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/lib/forms/resend.test.ts`
Expected: PASS.

> **Note for route tests (Tasks 10-12):** the `replyTo` SDK property is camelCase. If a future Resend major version renames it, update both `sendEmail` and its test together.

- [ ] **Step 5: Commit**

```bash
git add src/lib/forms/resend.ts src/lib/forms/resend.test.ts
git commit -m "feat: add Resend email and audience helpers"
```

---

## Task 10: Contact API route

**Files:**
- Create: `src/app/api/contact/route.ts`
- Test: `src/app/api/contact/route.test.ts`

- [ ] **Step 1: Write the failing test**

`src/app/api/contact/route.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const sendEmail = vi.fn();
vi.mock("@/lib/forms/resend", () => ({ sendEmail }));

import { POST } from "./route";

const VALID = {
  name: "Asha Rao",
  email: "asha@example.com",
  type: "General Inquiry",
  message: "Hello there",
  turnstileToken: "token",
};

function post(body: unknown, ip = "9.9.9.9"): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

function mockTurnstile(success: boolean) {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ success }), { status: 200 }),
  );
}

beforeEach(() => {
  vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
  vi.stubEnv("MAIL_TO_GENERAL", "info@manah.com");
  sendEmail.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/contact", () => {
  it("sends the email and returns 200 for a valid submission", async () => {
    mockTurnstile(true);
    const res = await POST(post(VALID, "1.0.0.1"));
    expect(res.status).toBe(200);
    expect(sendEmail).toHaveBeenCalledOnce();
    expect(sendEmail.mock.calls[0][0].to).toBe("info@manah.com");
  });

  it("returns 400 for invalid input and sends nothing", async () => {
    mockTurnstile(true);
    const res = await POST(post({ ...VALID, email: "bad" }, "1.0.0.2"));
    expect(res.status).toBe(400);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("returns 400 when Turnstile verification fails", async () => {
    mockTurnstile(false);
    const res = await POST(post(VALID, "1.0.0.3"));
    expect(res.status).toBe(400);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("silently returns 200 and sends nothing when the honeypot is filled", async () => {
    mockTurnstile(true);
    const res = await POST(
      post({ ...VALID, company_website: "bot" }, "1.0.0.4"),
    );
    expect(res.status).toBe(200);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("returns 502 when the email send throws", async () => {
    mockTurnstile(true);
    sendEmail.mockRejectedValue(new Error("resend down"));
    const res = await POST(post(VALID, "1.0.0.5"));
    expect(res.status).toBe(502);
  });

  it("returns 429 once the per-IP rate limit is exceeded", async () => {
    mockTurnstile(true);
    const ip = "5.5.5.5";
    for (let i = 0; i < 5; i++) await POST(post(VALID, ip));
    const res = await POST(post(VALID, ip));
    expect(res.status).toBe(429);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/api/contact/route.test.ts`
Expected: FAIL — `Failed to resolve import "./route"`.

- [ ] **Step 3: Write the implementation**

`src/app/api/contact/route.ts`:
```typescript
import { contactSchema } from "@/lib/forms/schemas";
import { createRateLimiter } from "@/lib/forms/rate-limit";
import { getClientId } from "@/lib/forms/client-id";
import { verifyTurnstile } from "@/lib/forms/turnstile";
import { resolveRecipient } from "@/lib/forms/recipients";
import { renderContactEmail } from "@/lib/forms/email-templates";
import { sendEmail } from "@/lib/forms/resend";
import { jsonOk, jsonError } from "@/lib/forms/respond";

export const runtime = "nodejs";

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request): Promise<Response> {
  const clientId = getClientId(request);
  if (!limiter.check(clientId)) {
    return jsonError(429, "Too many requests. Please try again shortly.");
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonError(400, "Invalid request.");
  }

  // Honeypot: a real user never fills this. Return a silent success so the
  // bot is not told it was caught.
  if (
    typeof body.company_website === "string" &&
    body.company_website.trim() !== ""
  ) {
    return jsonOk();
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, "Please check the form and try again.");
  }
  const data = parsed.data;

  if (!(await verifyTurnstile(data.turnstileToken, clientId))) {
    return jsonError(400, "Verification failed. Please retry.");
  }

  try {
    // data.type is a Zod enum — one of 6 fixed, server-defined strings — so
    // interpolating it into the subject carries no injection risk.
    await sendEmail({
      to: resolveRecipient(data.type),
      replyTo: data.email,
      subject: `New contact enquiry: ${data.type}`,
      html: renderContactEmail(data),
    });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return jsonError(
      502,
      "Something went wrong. Please try again or email us directly.",
    );
  }

  return jsonOk();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/api/contact/route.test.ts`
Expected: PASS — 6 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/contact/route.ts src/app/api/contact/route.test.ts
git commit -m "feat: add secure contact form API route"
```

---

## Task 11: Partner API route

**Files:**
- Create: `src/app/api/partner/route.ts`
- Test: `src/app/api/partner/route.test.ts`

- [ ] **Step 1: Write the failing test**

`src/app/api/partner/route.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const sendEmail = vi.fn();
vi.mock("@/lib/forms/resend", () => ({ sendEmail }));

import { POST } from "./route";

const VALID = {
  organization: "Rao Infra",
  contactPerson: "Asha Rao",
  email: "asha@example.com",
  partnershipType: "Joint Venture",
  areaOfInterest: "Infrastructure",
  message: "Proposal summary",
  turnstileToken: "token",
};

function post(body: unknown, ip = "8.8.8.8"): Request {
  return new Request("http://localhost/api/partner", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

function mockTurnstile(success: boolean) {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ success }), { status: 200 }),
  );
}

beforeEach(() => {
  vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
  vi.stubEnv("MAIL_TO_GENERAL", "info@manah.com");
  vi.stubEnv("MAIL_TO_PARTNERSHIPS", "partnerships@manah.com");
  sendEmail.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/partner", () => {
  it("sends to the partnerships mailbox and returns 200", async () => {
    mockTurnstile(true);
    const res = await POST(post(VALID, "2.0.0.1"));
    expect(res.status).toBe(200);
    expect(sendEmail.mock.calls[0][0].to).toBe("partnerships@manah.com");
  });

  it("returns 400 for invalid input", async () => {
    mockTurnstile(true);
    const res = await POST(post({ ...VALID, email: "bad" }, "2.0.0.2"));
    expect(res.status).toBe(400);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("returns 400 when Turnstile fails", async () => {
    mockTurnstile(false);
    const res = await POST(post(VALID, "2.0.0.3"));
    expect(res.status).toBe(400);
  });

  it("silently returns 200 when the honeypot is filled", async () => {
    mockTurnstile(true);
    const res = await POST(
      post({ ...VALID, company_website: "bot" }, "2.0.0.4"),
    );
    expect(res.status).toBe(200);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("returns 502 when the send throws", async () => {
    mockTurnstile(true);
    sendEmail.mockRejectedValue(new Error("down"));
    const res = await POST(post(VALID, "2.0.0.5"));
    expect(res.status).toBe(502);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/api/partner/route.test.ts`
Expected: FAIL — `Failed to resolve import "./route"`.

- [ ] **Step 3: Write the implementation**

`src/app/api/partner/route.ts`:
```typescript
import { partnerSchema } from "@/lib/forms/schemas";
import { createRateLimiter } from "@/lib/forms/rate-limit";
import { getClientId } from "@/lib/forms/client-id";
import { verifyTurnstile } from "@/lib/forms/turnstile";
import { getPartnerRecipient } from "@/lib/forms/recipients";
import { renderPartnerEmail } from "@/lib/forms/email-templates";
import { sendEmail } from "@/lib/forms/resend";
import { jsonOk, jsonError } from "@/lib/forms/respond";

export const runtime = "nodejs";

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request): Promise<Response> {
  const clientId = getClientId(request);
  if (!limiter.check(clientId)) {
    return jsonError(429, "Too many requests. Please try again shortly.");
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonError(400, "Invalid request.");
  }

  if (
    typeof body.company_website === "string" &&
    body.company_website.trim() !== ""
  ) {
    return jsonOk();
  }

  const parsed = partnerSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, "Please check the form and try again.");
  }
  const data = parsed.data;

  if (!(await verifyTurnstile(data.turnstileToken, clientId))) {
    return jsonError(400, "Verification failed. Please retry.");
  }

  try {
    // Subject is a server-side constant — never interpolate user input into
    // it (header-injection safety). The organization name is in the body.
    await sendEmail({
      to: getPartnerRecipient(),
      replyTo: data.email,
      subject: "New partnership inquiry",
      html: renderPartnerEmail(data),
    });
  } catch (error) {
    console.error("Partner form send failed:", error);
    return jsonError(
      502,
      "Something went wrong. Please try again or email us directly.",
    );
  }

  return jsonOk();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/api/partner/route.test.ts`
Expected: PASS — 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/partner/route.ts src/app/api/partner/route.test.ts
git commit -m "feat: add secure partner form API route"
```

---

## Task 12: Newsletter API route

**Files:**
- Create: `src/app/api/newsletter/route.ts`
- Test: `src/app/api/newsletter/route.test.ts`

- [ ] **Step 1: Write the failing test**

`src/app/api/newsletter/route.test.ts`:
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const addAudienceContact = vi.fn();
vi.mock("@/lib/forms/resend", () => ({ addAudienceContact }));

import { POST } from "./route";

const VALID = { email: "asha@example.com", turnstileToken: "token" };

function post(body: unknown, ip = "7.7.7.7"): Request {
  return new Request("http://localhost/api/newsletter", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

function mockTurnstile(success: boolean) {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify({ success }), { status: 200 }),
  );
}

beforeEach(() => {
  vi.stubEnv("TURNSTILE_SECRET_KEY", "secret");
  addAudienceContact.mockResolvedValue(undefined);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/newsletter", () => {
  it("adds the contact and returns 200", async () => {
    mockTurnstile(true);
    const res = await POST(post(VALID, "3.0.0.1"));
    expect(res.status).toBe(200);
    expect(addAudienceContact).toHaveBeenCalledWith("asha@example.com");
  });

  it("returns 400 for an invalid email", async () => {
    mockTurnstile(true);
    const res = await POST(post({ ...VALID, email: "bad" }, "3.0.0.2"));
    expect(res.status).toBe(400);
    expect(addAudienceContact).not.toHaveBeenCalled();
  });

  it("returns 400 when Turnstile fails", async () => {
    mockTurnstile(false);
    const res = await POST(post(VALID, "3.0.0.3"));
    expect(res.status).toBe(400);
  });

  it("silently returns 200 when the honeypot is filled", async () => {
    mockTurnstile(true);
    const res = await POST(
      post({ ...VALID, company_website: "bot" }, "3.0.0.4"),
    );
    expect(res.status).toBe(200);
    expect(addAudienceContact).not.toHaveBeenCalled();
  });

  it("returns 502 when the audience add throws", async () => {
    mockTurnstile(true);
    addAudienceContact.mockRejectedValue(new Error("down"));
    const res = await POST(post(VALID, "3.0.0.5"));
    expect(res.status).toBe(502);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/api/newsletter/route.test.ts`
Expected: FAIL — `Failed to resolve import "./route"`.

- [ ] **Step 3: Write the implementation**

`src/app/api/newsletter/route.ts`:
```typescript
import { newsletterSchema } from "@/lib/forms/schemas";
import { createRateLimiter } from "@/lib/forms/rate-limit";
import { getClientId } from "@/lib/forms/client-id";
import { verifyTurnstile } from "@/lib/forms/turnstile";
import { addAudienceContact } from "@/lib/forms/resend";
import { jsonOk, jsonError } from "@/lib/forms/respond";

export const runtime = "nodejs";

const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

export async function POST(request: Request): Promise<Response> {
  const clientId = getClientId(request);
  if (!limiter.check(clientId)) {
    return jsonError(429, "Too many requests. Please try again shortly.");
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return jsonError(400, "Invalid request.");
  }

  if (
    typeof body.company_website === "string" &&
    body.company_website.trim() !== ""
  ) {
    return jsonOk();
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return jsonError(400, "Please enter a valid email address.");
  }
  const data = parsed.data;

  if (!(await verifyTurnstile(data.turnstileToken, clientId))) {
    return jsonError(400, "Verification failed. Please retry.");
  }

  try {
    await addAudienceContact(data.email);
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return jsonError(502, "Something went wrong. Please try again.");
  }

  return jsonOk();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/api/newsletter/route.test.ts`
Expected: PASS — 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/newsletter/route.ts src/app/api/newsletter/route.test.ts
git commit -m "feat: add secure newsletter signup API route"
```

---

## Task 13: Honeypot field component

**Files:**
- Create: `src/components/forms/HoneypotField.tsx`

This is a presentational component with no logic to test in isolation; it is exercised by the E2E tests in Task 20.

- [ ] **Step 1: Write the implementation**

`src/components/forms/HoneypotField.tsx`:
```tsx
interface HoneypotFieldProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * A visually-hidden field bots tend to auto-fill. Real users never see or
 * focus it; a non-empty value server-side flags the submission as a bot.
 * Kept out of the tab order and hidden from assistive tech.
 */
export default function HoneypotField({
  value,
  onChange,
}: HoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        whiteSpace: "nowrap",
      }}
    >
      <label htmlFor="company_website">
        Company website (leave this field empty)
      </label>
      <input
        type="text"
        id="company_website"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/forms/HoneypotField.tsx
git commit -m "feat: add honeypot field component"
```

---

## Task 14: Turnstile widget component

**Files:**
- Create: `src/components/forms/TurnstileWidget.tsx`

- [ ] **Step 1: Write the implementation**

`src/components/forms/TurnstileWidget.tsx`:
```tsx
"use client";

import { Turnstile } from "@marsidev/react-turnstile";

interface TurnstileWidgetProps {
  /** Called with a token when the challenge is solved. */
  readonly onVerify: (token: string) => void;
  /** Called when the token expires or errors, so callers can clear it. */
  readonly onReset: () => void;
}

/**
 * Cloudflare Turnstile widget. Reads the public site key from
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY; renders nothing if it is unset.
 */
export default function TurnstileWidget({
  onVerify,
  onReset,
}: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  if (!siteKey) {
    console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not configured");
    return null;
  }

  return (
    <Turnstile
      siteKey={siteKey}
      onSuccess={onVerify}
      onError={onReset}
      onExpire={onReset}
      options={{ theme: "light" }}
    />
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/forms/TurnstileWidget.tsx
git commit -m "feat: add Turnstile widget component"
```

---

## Task 15: Form submit hook

**Files:**
- Create: `src/components/forms/useFormSubmit.ts`
- Test: `src/components/forms/useFormSubmit.test.ts`

- [ ] **Step 1: Write the failing test**

`src/components/forms/useFormSubmit.test.ts`:
```typescript
// @vitest-environment happy-dom
import { describe, it, expect, vi, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useFormSubmit } from "./useFormSubmit";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useFormSubmit", () => {
  it("starts in the idle state", () => {
    const { result } = renderHook(() => useFormSubmit("/api/contact"));
    expect(result.current.status).toBe("idle");
    expect(result.current.error).toBeNull();
  });

  it("moves to success on a 200 response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    const { result } = renderHook(() => useFormSubmit("/api/contact"));
    let ok: boolean | undefined;
    await act(async () => {
      ok = await result.current.submit({ name: "Asha" });
    });
    expect(ok).toBe(true);
    expect(result.current.status).toBe("success");
  });

  it("moves to error and surfaces the server message on a non-200", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: "Too many requests." }), {
        status: 429,
      }),
    );
    const { result } = renderHook(() => useFormSubmit("/api/contact"));
    await act(async () => {
      await result.current.submit({});
    });
    expect(result.current.status).toBe("error");
    expect(result.current.error).toBe("Too many requests.");
  });

  it("moves to error on a network failure", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("offline"));
    const { result } = renderHook(() => useFormSubmit("/api/contact"));
    await act(async () => {
      await result.current.submit({});
    });
    expect(result.current.status).toBe("error");
    expect(result.current.error).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/forms/useFormSubmit.test.ts`
Expected: FAIL — `Failed to resolve import "./useFormSubmit"`.

- [ ] **Step 3: Write the implementation**

`src/components/forms/useFormSubmit.ts`:
```typescript
"use client";

import { useCallback, useState } from "react";

export type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface FormSubmit {
  readonly status: SubmitStatus;
  readonly error: string | null;
  /** POSTs the payload as JSON. Resolves true on success, false otherwise. */
  submit(payload: Record<string, unknown>): Promise<boolean>;
}

const GENERIC_ERROR = "Something went wrong. Please try again.";

/** Shared submit state machine for the contact, partner and newsletter forms. */
export function useFormSubmit(endpoint: string): FormSubmit {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: Record<string, unknown>): Promise<boolean> => {
      setStatus("submitting");
      setError(null);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = (await response
          .json()
          .catch(() => ({}))) as { error?: string };

        if (!response.ok) {
          setError(data.error ?? GENERIC_ERROR);
          setStatus("error");
          return false;
        }

        setStatus("success");
        return true;
      } catch {
        setError("Network error. Please check your connection and retry.");
        setStatus("error");
        return false;
      }
    },
    [endpoint],
  );

  return { status, error, submit };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/forms/useFormSubmit.test.ts`
Expected: PASS — 4 tests green.

- [ ] **Step 5: Commit**

```bash
git add src/components/forms/useFormSubmit.ts src/components/forms/useFormSubmit.test.ts
git commit -m "feat: add shared form submit hook"
```

---

## Task 16: Rewire the Contact form

**Files:**
- Modify: `src/app/contact/ContactContent.tsx`

The current component (`src/app/contact/ContactContent.tsx`) tracks `formData` and a `submitted` boolean, and `handleSubmit` only calls `setSubmitted(true)`. Replace the fake submit with a real one.

- [ ] **Step 1: Add imports**

At the top of the file, alongside the existing `import { useState } from "react";`, add:
```tsx
import { useState } from "react";
import TurnstileWidget from "@/components/forms/TurnstileWidget";
import HoneypotField from "@/components/forms/HoneypotField";
import { useFormSubmit } from "@/components/forms/useFormSubmit";
```

- [ ] **Step 2: Replace the state and submit handler**

Find this block (around lines 85-100):
```tsx
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "",
    division: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would call an API endpoint
    setSubmitted(true);
  };
```

Replace it with:
```tsx
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "",
    division: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const { status, error, submit } = useFormSubmit("/api/contact");
  const submitted = status === "success";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) return;
    await submit({
      ...formData,
      company_website: honeypot,
      turnstileToken,
    });
  };
```

- [ ] **Step 3: Add the honeypot, Turnstile widget, error message and submit state to the form**

Find the submit button near the end of the `<form>` (around lines 300-303):
```tsx
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
```

Replace it with:
```tsx
                  <HoneypotField value={honeypot} onChange={setHoneypot} />

                  <TurnstileWidget
                    onVerify={setTurnstileToken}
                    onReset={() => setTurnstileToken("")}
                  />

                  {status === "error" && error && (
                    <p
                      role="alert"
                      className="text-body-sm text-red-600"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || !turnstileToken}
                    className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {status === "submitting" ? "Sending…" : "Send Message"}
                  </button>
```

- [ ] **Step 4: Verify it builds and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no type errors; no new lint errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/contact/ContactContent.tsx
git commit -m "feat: wire contact form to the secure email API"
```

---

## Task 17: Rewire the Partner form

**Files:**
- Modify: `src/app/partner/PartnerContent.tsx`

The current component tracks `formData` (from `INITIAL_FORM_STATE`) and a `submitted` boolean; `handleSubmit` only calls `setSubmitted(true)`.

- [ ] **Step 1: Add imports**

At the top of the file, alongside the existing `import { useState } from "react";`, add:
```tsx
import { useState } from "react";
import TurnstileWidget from "@/components/forms/TurnstileWidget";
import HoneypotField from "@/components/forms/HoneypotField";
import { useFormSubmit } from "@/components/forms/useFormSubmit";
```

- [ ] **Step 2: Replace the state and submit handler**

Find this block (around lines 194-214):
```tsx
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
```

Replace it with:
```tsx
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const { status, error, submit } = useFormSubmit("/api/partner");
  const submitted = status === "success";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) return;
    await submit({
      ...formData,
      company_website: honeypot,
      turnstileToken,
    });
  };
```

- [ ] **Step 3: Add the honeypot, Turnstile widget, error message and submit state to the form**

Find the submit button near the end of the `<form>` (around lines 686-689):
```tsx
                  <button type="submit" className="btn-primary w-full">
                    <Send className="w-4 h-4" />
                    Submit Partnership Inquiry
                  </button>
```

Replace it with:
```tsx
                  <HoneypotField value={honeypot} onChange={setHoneypot} />

                  <TurnstileWidget
                    onVerify={setTurnstileToken}
                    onReset={() => setTurnstileToken("")}
                  />

                  {status === "error" && error && (
                    <p role="alert" className="text-body-sm text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || !turnstileToken}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {status === "submitting"
                      ? "Submitting…"
                      : "Submit Partnership Inquiry"}
                  </button>
```

- [ ] **Step 4: Verify it builds and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no type errors; no new lint errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/partner/PartnerContent.tsx
git commit -m "feat: wire partner form to the secure email API"
```

---

## Task 18: Rewire the Newsletter form

**Files:**
- Modify: `src/components/sections/NewsletterCTA.tsx`

The current component holds only `email` state and `onSubmit={(e) => e.preventDefault()}`.

- [ ] **Step 1: Replace the whole file**

`src/components/sections/NewsletterCTA.tsx`:
```tsx
"use client";

import { useState } from "react";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import MotionSection from "@/components/animations/MotionSection";
import TurnstileWidget from "@/components/forms/TurnstileWidget";
import HoneypotField from "@/components/forms/HoneypotField";
import { useFormSubmit } from "@/components/forms/useFormSubmit";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const { status, error, submit } = useFormSubmit("/api/newsletter");
  const subscribed = status === "success";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) return;
    await submit({ email, company_website: honeypot, turnstileToken });
  };

  return (
    <section className="section-padding bg-manah-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(200,169,110,0.08),transparent_70%)]" />
      <div className="section-container relative z-10">
        <MotionSection className="max-w-2xl mx-auto text-center">
          <span className="inline-block text-manah-gold-light font-semibold text-body-sm tracking-widest uppercase mb-4">
            Newsletter
          </span>
          <h2 className="font-display text-display-sm md:text-display-md font-bold mb-4">
            Stay Ahead of{" "}
            <span className="text-gradient-gold">Industry Trends</span>
          </h2>
          <p className="text-manah-gray-300 text-body-lg mb-8 max-w-lg mx-auto">
            Subscribe to The Manah Journal for curated insights on
            infrastructure, energy transitions, and technology breakthroughs
            delivered straight to your inbox.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center gap-3 text-manah-gold-light">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-body-md">
                You&apos;re subscribed. Watch your inbox.
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-3 max-w-md mx-auto mb-4"
            >
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-manah-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your work email"
                    className="w-full pl-11 pr-4 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-manah-gray-400 text-body-sm focus:outline-none focus:border-manah-gold/60 focus:ring-1 focus:ring-manah-gold/30 transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting" || !turnstileToken}
                  className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Subscribing…" : "Subscribe"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <HoneypotField value={honeypot} onChange={setHoneypot} />

              <TurnstileWidget
                onVerify={setTurnstileToken}
                onReset={() => setTurnstileToken("")}
              />

              {status === "error" && error && (
                <p role="alert" className="text-body-sm text-red-300">
                  {error}
                </p>
              )}
            </form>
          )}

          <p className="text-caption text-manah-gray-400">
            Monthly digest. No spam. Unsubscribe anytime.
          </p>
        </MotionSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it builds and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no type errors; no new lint errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/NewsletterCTA.tsx
git commit -m "feat: wire newsletter form to the Resend Audience API"
```

---

## Task 19: Allow Turnstile in the Content-Security-Policy

**Files:**
- Modify: `next.config.ts`

The current CSP in `next.config.ts` does not allow Cloudflare's domain. Turnstile loads a script from and renders an iframe on `https://challenges.cloudflare.com`; without these allowances the widget is blocked.

- [ ] **Step 1: Allow the Turnstile script**

Find the `scriptSrc` definition:
```typescript
const scriptSrc = [
  "script-src 'self' 'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  "https://www.googletagmanager.com",
].join(" ");
```

Replace it with:
```typescript
const scriptSrc = [
  "script-src 'self' 'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  "https://www.googletagmanager.com",
  "https://challenges.cloudflare.com",
].join(" ");
```

- [ ] **Step 2: Allow the Turnstile iframe**

Find the `CSP` array. Add a `frame-src` directive immediately after the `media-src` line:
```typescript
  "media-src 'self'",
  "frame-src 'self' https://challenges.cloudflare.com",
  "frame-ancestors 'none'",
```

(The `frame-ancestors 'none'` line already exists — insert the new `frame-src` line directly above it.)

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add next.config.ts
git commit -m "fix: allow Cloudflare Turnstile in the CSP"
```

---

## Task 20: End-to-end tests

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/contact.spec.ts`
- Create: `e2e/partner.spec.ts`
- Create: `e2e/newsletter.spec.ts`

These tests drive the real form components but stub the `/api/*` responses with `page.route`, so they verify client wiring (Turnstile render, honeypot, loading/success/error UI) without sending real email. The server routes are fully covered by Tasks 10-12. The dev server is started with Cloudflare's official Turnstile **test** site key (`1x00000000000000000000AA`), which always passes.

- [ ] **Step 1: Install the Playwright browser**

Run: `npx playwright install chromium`
Expected: Chromium downloaded.

- [ ] **Step 2: Create `playwright.config.ts`**

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
    },
  },
});
```

- [ ] **Step 3: Create `e2e/contact.spec.ts`**

```typescript
import { test, expect } from "@playwright/test";

test.describe("Contact form", () => {
  test("submits successfully and shows the confirmation", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      }),
    );

    await page.goto("/contact");
    await page.fill("#name", "Asha Rao");
    await page.fill("#email", "asha@example.com");
    await page.fill("#message", "We would like to discuss a project.");

    // Custom Select: open and pick the inquiry type.
    await page.click("#type");
    await page.getByRole("option", { name: "General Inquiry" }).click();

    const submit = page.getByRole("button", { name: /send message/i });
    await expect(submit).toBeEnabled({ timeout: 15_000 });
    await submit.click();

    await expect(page.getByText("Message Sent!")).toBeVisible();
  });

  test("shows an error message when the API fails", async ({ page }) => {
    await page.route("**/api/contact", (route) =>
      route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "Something went wrong." }),
      }),
    );

    await page.goto("/contact");
    await page.fill("#name", "Asha Rao");
    await page.fill("#email", "asha@example.com");
    await page.fill("#message", "Test message.");
    await page.click("#type");
    await page.getByRole("option", { name: "General Inquiry" }).click();

    const submit = page.getByRole("button", { name: /send message/i });
    await expect(submit).toBeEnabled({ timeout: 15_000 });
    await submit.click();

    await expect(page.getByRole("alert")).toContainText("Something went wrong");
  });
});
```

- [ ] **Step 4: Create `e2e/partner.spec.ts`**

```typescript
import { test, expect } from "@playwright/test";

test.describe("Partner form", () => {
  test("submits successfully and shows the confirmation", async ({ page }) => {
    await page.route("**/api/partner", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      }),
    );

    await page.goto("/partner");
    await page.fill("#organization", "Rao Infra");
    await page.fill("#contactPerson", "Asha Rao");
    await page.fill("#email", "asha@example.com");
    await page.fill("#message", "Partnership proposal summary.");

    await page.click("#partnershipType");
    await page.getByRole("option", { name: "Joint Venture" }).click();
    await page.click("#areaOfInterest");
    await page.getByRole("option", { name: "Infrastructure" }).click();

    const submit = page.getByRole("button", {
      name: /submit partnership inquiry/i,
    });
    await expect(submit).toBeEnabled({ timeout: 15_000 });
    await submit.click();

    await expect(page.getByText(/thank you for your interest/i)).toBeVisible();
  });
});
```

- [ ] **Step 5: Create `e2e/newsletter.spec.ts`**

```typescript
import { test, expect } from "@playwright/test";

test.describe("Newsletter form", () => {
  test("subscribes successfully and shows the confirmation", async ({
    page,
  }) => {
    await page.route("**/api/newsletter", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      }),
    );

    await page.goto("/");
    const emailInput = page.getByPlaceholder("Your work email");
    await emailInput.scrollIntoViewIfNeeded();
    await emailInput.fill("asha@example.com");

    const submit = page.getByRole("button", { name: /subscribe/i });
    await expect(submit).toBeEnabled({ timeout: 15_000 });
    await submit.click();

    await expect(page.getByText(/you're subscribed/i)).toBeVisible();
  });
});
```

> **Note:** if the Newsletter section is not present on `/`, change `page.goto("/")` to a page that renders `<NewsletterCTA />`. Confirm by grepping for `NewsletterCTA` usage before running.

- [ ] **Step 6: Run the E2E suite**

Run: `npm run test:e2e`
Expected: all specs PASS. If a Select option click is flaky, the option is a `role="option"` element rendered after clicking the `#<id>` combobox button — keep the open-then-click sequence.

- [ ] **Step 7: Commit**

```bash
git add playwright.config.ts e2e/
git commit -m "test: add E2E coverage for all three forms"
```

---

## Task 21: Update the README

**Files:**
- Modify: `README.md` (i.e. `/Users/chinmay/Desktop/Manah/website/README.md`)

- [ ] **Step 1: Add a "Contact forms & email" section**

Append the following section to `README.md`, after the existing "Scripts" table:

```markdown
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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: document contact forms and email setup"
```

---

## Task 22: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full unit + integration suite**

Run: `npm test`
Expected: all test files PASS (schemas, rate-limit, turnstile, client-id, recipients, email-templates, respond, resend, three route files, useFormSubmit).

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: build succeeds; the three `/api/*` routes appear in the route list.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: no new errors.

- [ ] **Step 4: Run the E2E suite**

Run: `npm run test:e2e`
Expected: all specs PASS.

- [ ] **Step 5: Final commit (if anything was left uncommitted)**

```bash
git status
```
Expected: clean working tree. If not, review and commit deliberately.

---

## Notes for the implementer

- **No real secrets in git.** `.env.example` holds placeholders only; real values go in `.env.local` (gitignored) and the Vercel dashboard.
- **Resend domain verification is a hard prerequisite for production.** Emails from an unverified domain will fail; `sendEmail` surfaces that as a 502 to the client. Local development can use the Resend test/sandbox key, which only delivers to the account owner's address.
- **The rate limiter is best-effort.** It is per-instance in-memory; Turnstile and the honeypot are the real bot defence. Do not invest in making it durable — that was explicitly scoped out.
- **Honeypot returns 200, not an error**, so bots are not told they were caught. This is intentional — see the spec.
- If `npx tsc` is run by a hook after edits, expect it to pass after each task's implementation step.
