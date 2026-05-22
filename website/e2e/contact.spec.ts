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

    // The form error renders as <p role="alert">. Scope to the alert that
    // carries the message — Next.js also injects an empty route-announcer
    // div with role="alert", so an unscoped getByRole would be ambiguous.
    await expect(
      page.getByRole("alert").filter({ hasText: /something went wrong/i }),
    ).toBeVisible();
  });
});
