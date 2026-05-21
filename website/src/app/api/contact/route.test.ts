import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const { sendEmail } = vi.hoisted(() => ({ sendEmail: vi.fn() }));
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
