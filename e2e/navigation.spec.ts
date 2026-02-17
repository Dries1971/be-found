import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Be-Found/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("about page loads", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/About|Over/);
  });

  test("services page loads", async ({ page }) => {
    await page.goto("/services");
    // Services page uses hero headline as title
    await expect(page).toHaveTitle(/Be-Found/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("contact page loads", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("form")).toBeVisible();
  });

  test("pricing page loads", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page).toHaveTitle(/Be-Found/);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("faq page loads", async ({ page }) => {
    await page.goto("/faq");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("404 page shows for invalid routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.locator("text=404")).toBeVisible();
  });
});

test.describe("Locale routing", () => {
  test("Dutch locale works", async ({ page }) => {
    await page.goto("/nl");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("German locale works", async ({ page }) => {
    await page.goto("/de");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("French locale works", async ({ page }) => {
    await page.goto("/fr");
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("Responsive design", () => {
  test("mobile menu toggle exists on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    // Mobile menu button has aria-label for accessibility
    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible();
  });

  test("desktop nav is visible on large screens", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const mainNav = page.locator('nav[aria-label="Main navigation"]');
    await expect(mainNav).toBeVisible();
  });
});
