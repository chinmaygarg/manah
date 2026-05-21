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
