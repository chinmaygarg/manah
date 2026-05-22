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
