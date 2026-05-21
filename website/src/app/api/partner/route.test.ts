import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const { sendEmail } = vi.hoisted(() => ({ sendEmail: vi.fn() }));
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
