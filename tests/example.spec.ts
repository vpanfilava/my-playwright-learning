// Load test and expect from the Playwright library
import { test, expect } from '@playwright/test';
// Define one test case with a descriptive name
test('has title', async ({ page }) => {
  // Navigate to the login page before each test
   await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
// Define one test case with a descriptive name
test('get started link', async ({ page }) => {
  // Navigate to the login page before each test
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
