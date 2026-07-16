import { test, expect } from '@playwright/test';

test('Task 1 – full validation cycle', async ({ page }) => {
  await page.goto('/');

  // 1. Fill in authorization details
  const usernameField = page.getByPlaceholder('Username');
  const passwordField = page.getByPlaceholder('Password');
  const loginButton = page.locator('[data-test="login-button"]'); // Standard login button selector for SauceDemo

  await usernameField.fill('standard_user');
  await expect(usernameField).toHaveValue('standard_user');

  await passwordField.fill('secret_sauce'); // Enter password
  await loginButton.click(); // Click Login to enter the shop

  // 2. Locate inventory items (now they will exist!)
  const itemsList = page.locator('.inventory_item');
  const itemCount = await itemsList.count();
  console.log(`Total items found: ${itemCount}`);

  await itemsList.nth(1).locator('button').click();

  await itemsList
    .filter({ hasText: 'Sauce Labs Backpack' }) // Finds the specific card
    .locator('button')                         // Targets the button inside that card
    .click();
});