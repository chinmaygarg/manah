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

    await page.goto("/blog");
    const emailInput = page.getByPlaceholder("Your work email");
    await emailInput.scrollIntoViewIfNeeded();
    await emailInput.fill("asha@example.com");

    const submit = page.getByRole("button", { name: /subscribe/i });
    await expect(submit).toBeEnabled({ timeout: 15_000 });
    await submit.click();

    await expect(page.getByText(/you're subscribed/i)).toBeVisible();
  });
});
