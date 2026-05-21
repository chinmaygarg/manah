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
