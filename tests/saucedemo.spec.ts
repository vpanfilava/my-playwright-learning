import { test, expect } from '@playwright/test';

// Global Wrapper for all SauceDemo tests
test.describe("SauceDemo", () => {

  // ==========================================
  // --- SUB-SUITE 1: UNAUTHENTICATED TESTS ---
  // ==========================================
  test.describe("Login Page Validations", () => {
    
    test.beforeEach(async ({ page }) => {
      // Every test in this block starts fresh on the home page landing view
      await page.goto('https://www.saucedemo.com');
    });

    // Task 1 — Happy Path Login (Manually executes login steps to verify the feature)
    test.only ('Task 1 - Should successfully log in and redirect to inventory', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(
        page, 
        'The application failed to redirect the user to the /inventory catalog page after submitting valid credentials'
      ).toHaveURL(/inventory/);
    });

    // Task 2 — Negative login
    test('Task 2 - Should display an error message with invalid credentials', async ({ page }) => {
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('wrong_password');
      await page.locator('[data-test="login-button"]').click();
      await expect(
        page.locator('[data-test="error"]'), 
        'The error notification container box failed to display on the landing page after a bad password submission'
      ).toBeVisible();
    });

    // Task 5 — Empty form validation
    test('Task 5 - Should display validation errors for empty or partial form submissions', async ({ page }) => {
      const usernameInput = page.locator('[data-test="username"]');
      const passwordInput = page.locator('[data-test="password"]');
      const loginButton = page.locator('[data-test="login-button"]');
      const errorBox = page.locator('[data-test="error"]');

      // Scenario A
      await loginButton.click();
      await expect(
        errorBox, 
        'Scenario A Failed: The error text did not explicitly state that the Username is required when submitting a completely blank form'
      ).toContainText('Epic sadface: Username is required');

      // Scenario B
      await page.reload();
      await usernameInput.fill('standard_user');
      await loginButton.click();
      await expect(
        errorBox, 
        'Scenario B Failed: The error text did not explicitly state that the Password is required when submitting only a username'
      ).toContainText('Epic sadface: Password is required');

      // Scenario C
      await page.reload();
      await passwordInput.fill('secret_sauce');
      await loginButton.click();
      await expect(
        errorBox, 
        'Scenario C Failed: The error text did not explicitly state that the Username is required when submitting only a password'
      ).toContainText('Epic sadface: Username is required');
    });
  });


  // ========================================
  // --- SUB-SUITE 2: AUTHENTICATED TESTS ---
  // ========================================
  test.describe("Authenticated Inventory Actions", () => {

    // EXTRACTED HOOK: Automatically logs in and handles the boilerplate before every test below
    test.beforeEach(async ({ page }) => {
      await page.goto('https://www.saucedemo.com');
      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();
      await expect(
        page, 
        'Global Authentication Block Blocked: The system failed to log in the standard_user and redirect to the inventory page during the pre-test setup phase'
      ).toHaveURL(/inventory/);
    });

    // Task 3 — Add product to cart
    test('Task 3 - Should update cart badge to 1 when product is added', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await expect(
        page.locator(".shopping_cart_badge"),
        'The shopping cart badge count failed to update to "1" after clicking the backpack "Add to cart" button'
      ).toHaveText("1");
    });

    // Task 4 — Remove product from cart
    test('Task 4 - Should hide cart badge when product is removed', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
      await expect(
        page.locator(".shopping_cart_badge"),
        'The shopping cart badge counter remained visible on the screen after the user removed all products from their cart'
      ).not.toBeVisible();
    });

    // Task 7 — Edge Case: Double click stress test
    test('Task 7 - Edge Case: Documenting behavior under rapid double-click stress testing', async ({ page }) => {
      const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
      await addToCartButton.dblclick();
      await expect(
        page.locator(".shopping_cart_badge"),
        'Edge Case Failure: Rapidly double-clicking the "Add to cart" button left a residual item inside the shopping cart counter instead of toggling it out cleanly'
      ).not.toBeVisible();
    });

    // Task 8 — Multiple products
    test('Task 8 - Should accurately increment and decrement badge counter for multiple items', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

      const cartBadge = page.locator(".shopping_cart_badge");
      await expect(
        cartBadge,
        'The shopping cart badge failed to aggregate properly and show a count of "3" after three items were selected'
      ).toHaveText("3");

      await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
      await expect(
        cartBadge,
        'The shopping cart badge failed to decrement cleanly to "2" after one of the three items was removed from the inventory list'
      ).toHaveText("2");
    });

    // Task 9 — Sorting
    test('Task 9 - Should dynamically reorder product list when sorting filter changes', async ({ page }) => {
      await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
      const firstProductTitle = page.locator('.inventory_item_name').first();
      await expect(
        firstProductTitle,
        'The catalog failed to reorder its contents alphabetically/monetarily; "Sauce Labs Onesie" was not the first product displayed after choosing Price (low to high)'
      ).toHaveText('Sauce Labs Onesie');
    });

    // Task 10 — State after refresh
    test('Task 10 - Should preserve shopping cart contents across a hard page reload', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      
      const cartBadge = page.locator(".shopping_cart_badge");
      await expect(
        cartBadge,
        'Pre-Refresh Failure: The shopping cart badge did not register the item immediately after clicking "Add to cart"'
      ).toHaveText("1");

      await page.reload();
      await expect(
        cartBadge,
        'The local browser storage session failed to persist; the item vanished from the shopping cart counter after the page was reloaded'
      ).toHaveText("1");
    });
  });

});