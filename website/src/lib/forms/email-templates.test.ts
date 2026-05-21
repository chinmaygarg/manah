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
