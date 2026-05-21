import { describe, it, expect } from "vitest";
import { isHoneypotFilled } from "./honeypot";

describe("isHoneypotFilled", () => {
  it("returns true when the honeypot field has non-empty text", () => {
    expect(isHoneypotFilled({ company_website: "spam" })).toBe(true);
  });

  it("returns false when the field is an empty string", () => {
    expect(isHoneypotFilled({ company_website: "" })).toBe(false);
  });

  it("returns false when the field is whitespace only", () => {
    expect(isHoneypotFilled({ company_website: "   " })).toBe(false);
  });

  it("returns false when the field is absent", () => {
    expect(isHoneypotFilled({})).toBe(false);
  });

  it("returns false when the field is not a string", () => {
    expect(isHoneypotFilled({ company_website: 123 })).toBe(false);
  });
});
