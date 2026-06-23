# QA Debugging & Fix Report — Broken Tests Audit

This report documents the root causes, programmatic fixes, and validation steps executed to resolve the three intentionally broken scripts within the test suite.

---

## 🛠️ Test 1: "login should redirect to inventory"

* **Root Cause:** The script utilized `getByPlaceholder("User Name")` containing an erroneous space character. The actual HTML placeholder attribute on the SauceDemo DOM is single-worded: `"Username"`. This discrepancy caused Playwright to time out after 30,000ms waiting for a non-existent element.
* **Fix:** Corrected the locator string to `getByPlaceholder("Username")` to establish alignment with the real application environment.
* **How I Verified:** Executed `npx playwright test tests/broken-tests.spec.ts --project="chromium"` and confirmed that the step located the input immediately and the test passed.

---

## 🛠️ Test 2: "error message on wrong password"

* **Root Cause:** Dual mechanical failures occurred here:
  1. The locator `getByTestId("error")` searched exclusively for a `data-testid` property, whereas SauceDemo utilizes a custom `data-test="error"` attribute layout.
  2. The string expectation used a strict exact-match method `.toHaveText()` with an incomplete text snippet, which would cause an automatic string mismatch failure.
* **Fix:** Refactored the selector to a standard attribute locator `page.locator('[data-test="error"]')` and updated the assertion to a loose string containment validation using `.toContainText("Username and password do not match")`.
* **How I Verified:** Executed `npx playwright test tests/broken-tests.spec.ts --project="chromium"` and watched the console terminal panel return a green passing checkmark.

---

## 🛠️ Test 3: "cart badge appears after adding product"

* **Root Cause:** The `click()` operation on the backpack inventory item element was missing its critical asynchronous execution keyword `await`. Consequently, JavaScript triggered the action in the background and instantly fired the assertion checkpoint before the physical browser click registered.
* **Fix:** Prepended the necessary asynchronous control flag to the step line: `await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();`.
* **How I Verified:** Executed `npx playwright test tests/broken-tests.spec.ts --project="chromium"` and verified that the test consistently passed without any race conditions.