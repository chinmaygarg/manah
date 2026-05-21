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
