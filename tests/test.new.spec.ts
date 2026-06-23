import { test, expect } from '@playwright/test';

test('Task 1 - full validation cycle', async ({ page }) => {
  await page.goto('/');

  // Picked with VS Code Pick Locator, verified unique in DevTools console
  const usernameField = page.getByPlaceholder('Username');

  await usernameField.fill('standard_user');
  await expect(usernameField).toHaveValue('standard_user');
});
const itemsList = page.locator('.inventory_item');
const itemCount = await itemsList.count();
console.log(`Total items found: ${itemCount}`);
await itemsList.nth(1).locator('button').click();
await itemsList
  .filter({ hasText: 'Sauce Labs Backpack' }) // Finds the specific card
  .locator('button')                         // Targets the button inside that card
  .click();